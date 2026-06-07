export const uploadImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "products");

    const cloudName = "dtfwioxha";

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    if (!res.ok) {
        throw new Error("Şəkil yüklənə bilmədi");
    }

    const data = await res.json();

    return data.secure_url;
};