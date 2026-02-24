import { createClient } from "contentful";

const spaceId = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const accessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;


const client = createClient({
    space: spaceId,
    accessToken: accessToken
});
export const getProducts =()=>{
    const data =client.getEntries(
    {
        content_type: "product",
        "fields.section[in]":["women,unisex"]
     }
    ).then((response) => {   
        return response.items;
    }).catch((error) => console.log(error));

    return data;
}

export const getProductById =(id)=>{
    const data =client.getEntry(id).then((response) => {
        return response;
    }).catch((error) => console.log(error));

    return data;
}