import { useState } from "react";
import "./uploadForm.css";

const CATEGORIES = ["clothing", "shoes", "accessories"];
const SECTIONS = ["women"];
const SUBCATEGORIES = ["tshirts", "hoodies", "sneakers","dresses","bags","jewelry","hats","pants","skirts","shorts"];
const COLOR_TAGS = [
  "black","white","gray","red","blue","green",
  "yellow","brown","pink","purple","beige","multicolor"
];

export default function ProductUpload() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    section: "",
    subCategory: "",
    sizesArray: [],        // array of sizes
    colorTags: [],         // selected colors
    colorDisplay: "",
    variants: {},          // { "S|red": 10, "M|blue": 5, ... }
    isOnSale: false,
    salePercentage: "",
    file: null,
    gallery: [],
    slug: "",
  });

  const update = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleVariantChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      variants: { ...prev.variants, [key]: Number(value) }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // JSON fields
    fd.append("sizes", JSON.stringify(form.sizesArray));
    fd.append("colorTags", JSON.stringify(form.colorTags));
    fd.append("variants", JSON.stringify(form.variants));

    // Scalars
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("section", form.section);
    fd.append("subCategory", form.subCategory);
    fd.append("slug", form.slug);
    fd.append("colorDisplay", form.colorDisplay || "");
    fd.append("isOnSale", form.isOnSale ? "true" : "false");
    fd.append("salePercentage", form.salePercentage || "");

    // Main image
    if (form.file) fd.append("file", form.file);

    // Gallery images
    form.gallery.forEach(file => fd.append("gallery", file));

    try {
      const res = await fetch("/api/products", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) alert("Uploaded! ID: " + data.id);
      else alert("Error: " + data.error);
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input placeholder="Name" onChange={e => update("name", e.target.value)} required />
      <textarea placeholder="Description" onChange={e => update("description", e.target.value)} required />
      <input type="number" placeholder="Price" onChange={e => update("price", e.target.value)} required />

      <select onChange={e => update("category", e.target.value)} required>
        <option value="">Category</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <select onChange={e => update("section", e.target.value)} required>
        <option value="">Section</option>
        {SECTIONS.map(s => <option key={s}>{s}</option>)}
      </select>

      <select onChange={e => update("subCategory", e.target.value)} required>
        <option value="">Subcategory</option>
        {SUBCATEGORIES.map(s => <option key={s}>{s}</option>)}
      </select>

      {/* Sizes input */}
      <input
        placeholder="Sizes (comma separated e.g. S,M,L)"
        onChange={e => update("sizesArray", e.target.value.split(",").map(s => s.trim()))}
      />

      {/* Colors */}
      <fieldset>
        <legend>Colors</legend>
        {COLOR_TAGS.map(c => (
          <label key={c}>
            <input
              type="checkbox"
              value={c}
              onChange={e =>
                update(
                  "colorTags",
                  e.target.checked
                    ? [...form.colorTags, c]
                    : form.colorTags.filter(x => x !== c)
                )
              }
            />
            {c}
          </label>
        ))}
        <input
          placeholder="Display color (optional)"
          onChange={e => update("colorDisplay", e.target.value)}
        />
      </fieldset>

      {/* Variants / Inventory */}
      {form.sizesArray.length && form.colorTags.length ? (
        <fieldset>
          <legend>Inventory (quantity per size/color)</legend>
          {form.sizesArray.map(size =>
            form.colorTags.map(color => {
              const key = `${size}|${color}`;
              return (
                <div key={key}>
                  <label>{key}: </label>
                  <input
                    type="number"
                    min="0"
                    onChange={e => handleVariantChange(key, e.target.value)}
                  />
                </div>
              );
            })
          )}
        </fieldset>
      ) : null}

      {/* Sale */}
      <label>
        <input
          type="checkbox"
          onChange={e => update("isOnSale", e.target.checked)}
        /> On Sale
      </label>
      {form.isOnSale && (
        <input
          type="number"
          placeholder="Sale %"
          onChange={e => update("salePercentage", e.target.value)}
        />
      )}

      {/* Images */}
      <input type="file" onChange={e => update("file", e.target.files[0])} />
      <input type="file" multiple onChange={e => update("gallery", [...e.target.files])} />

      <input placeholder="Slug" onChange={e => update("slug", e.target.value)} required />

      <button type="submit">Upload</button>
    </form>
  );
}