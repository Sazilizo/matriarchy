import { createClient, Asset, Environment } from "contentful-management";
import sharp from "sharp";
import fetch from "node-fetch";

/* ================= CONTENTFUL ================= */

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = "master";
const LOCALE = "en-US";

/* ================= TYPES ================= */

interface ProductFields {
  name: string;
  description: string;
  price: string;
  category: string;
  section: string;
  subCategory: string;
  slug?: string;

  sizes: string;
  colorTags: string;
  colorDisplay?: string;
  variants: string;

  isOnSale?: string;
  salePercentage?: string;

  file?: File;
  gallery?: File[];
  imageUrl?: string;
}

/* ================= CORS ================= */

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

/* ================= ASSET HELPERS ================= */

async function waitForAssetProcessing(
  env: Environment,
  assetId: string,
  locale = LOCALE
): Promise<Asset> {
  while (true) {
    const asset = await env.getAsset(assetId);
    if (asset.fields.file?.[locale]?.url) return asset;
    await new Promise((r) => setTimeout(r, 1000));
  }
}

async function uploadImage(
  env: Environment,
  buffer: Buffer,
  name: string
): Promise<string> {
  const optimized = await sharp(buffer)
    .resize({ height: 800 })
    .webp()
    .toBuffer();

  /* -------- Create Upload (TS-safe) -------- */
  const upload = await env.createUpload({
    file: optimized.buffer.slice(
      optimized.byteOffset,
      optimized.byteOffset + optimized.byteLength
    ) as ArrayBuffer, // ✅ FINAL FIX
  });

  /* -------- Create Asset -------- */
  const asset = await env.createAsset({
    fields: {
      title: { [LOCALE]: name },
      description: { [LOCALE]: name },
      file: {
        [LOCALE]: {
          contentType: "image/webp",
          fileName: `${name.replace(/\s+/g, "_")}.webp`,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  await asset.processForAllLocales();
  const processed = await waitForAssetProcessing(env, asset.sys.id);
  await processed.publish();

  return processed.sys.id;
}

/* ================= POST HANDLER ================= */

export async function POST(req: Request): Promise<Response> {
  try {
    const data = await req.formData();
    const form = Object.fromEntries(data.entries()) as unknown as ProductFields;

    const sizes = JSON.parse(form.sizes);
    const colorTags = JSON.parse(form.colorTags);
    const variants = JSON.parse(form.variants);

    if (!Array.isArray(sizes) || !Array.isArray(colorTags) || typeof variants !== "object") {
      throw new Error("Invalid sizes, colors, or variants format");
    }

    const slug =
      form.slug?.trim() ||
      form.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

    const space = await client.getSpace(SPACE_ID);
    const env = await space.getEnvironment(ENVIRONMENT);

    /* -------- Main Image -------- */
    let mainAssetId: string;

    if (form.file instanceof File) {
      const buffer = Buffer.from(await form.file.arrayBuffer());
      mainAssetId = await uploadImage(env, buffer, form.file.name);
    } else if (form.imageUrl) {
      const res = await fetch(form.imageUrl);
      if (!res.ok) throw new Error("Failed to fetch main image URL");
      const buffer = Buffer.from(await res.arrayBuffer());
      mainAssetId = await uploadImage(env, buffer, "main-image");
    } else {
      throw new Error("Main image required");
    }

    /* -------- Gallery -------- */
    const galleryFiles = (data.getAll("gallery") as File[]) || [];
    const galleryAssets: { sys: { type: "Link"; linkType: "Asset"; id: string } }[] = [];

    for (const img of galleryFiles) {
      const buffer = Buffer.from(await img.arrayBuffer());
      const id = await uploadImage(env, buffer, img.name);
      galleryAssets.push({
        sys: { type: "Link", linkType: "Asset", id },
      });
    }

    /* -------- Create Entry -------- */
    const entry = await env.createEntry("product", {
      fields: {
        name: { [LOCALE]: form.name },
        description: { [LOCALE]: form.description },
        price: { [LOCALE]: Number(form.price) },
        category: { [LOCALE]: form.category },
        section: { [LOCALE]: form.section },
        subCategory: { [LOCALE]: form.subCategory },
        slug: { [LOCALE]: slug },

        sizes: { [LOCALE]: sizes },
        colorTags: { [LOCALE]: colorTags },
        colorDisplay: { [LOCALE]: form.colorDisplay || null },
        variants: { [LOCALE]: variants },

        isOnSale: { [LOCALE]: form.isOnSale === "true" },
        salePercentage: {
          [LOCALE]: form.salePercentage ? Number(form.salePercentage) : null,
        },

        image: {
          [LOCALE]: {
            sys: { type: "Link", linkType: "Asset", id: mainAssetId },
          },
        },
        gallery: { [LOCALE]: galleryAssets },
      },
    });

    await entry.publish();

    return new Response(JSON.stringify({ success: true, id: entry.sys.id }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 400,
      headers: corsHeaders(),
    });
  }
}

/* ================= OPTIONS HANDLER ================= */

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders() });
}