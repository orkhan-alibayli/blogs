import { api } from "../../js/api.js";
import { uploadImage } from "./utilites.js";

let selectedBlogId = null;

const showAlert = (type, message) => {
    const alertBoxInForm = document.querySelector('.alert-box');
    const alert = {
        type,
        message
    };
    localStorage.setItem('alert', JSON.stringify(alert));
    effectAlert();
    alertBoxInForm.style.display = 'flex';
    return;
};

const tbody = document.getElementById("blogsTable");

const nameInput =
    document.getElementById("nameOfBlog");

const linkInput =
    document.getElementById("linkOfBlog");

let coverInput =
    document.getElementById("coverOfBlog");

const dateInput =
    document.getElementById("dateOfBlog");

const paragraphInput =
    document.getElementById("paragrafOfBlog");

const createButton =
    document.getElementById("createBlog");

let changeFile = false;
let blogCoverFromUpdate = null;

const clearForm = () => {

    selectedBlogId = null;

    nameInput.value = "";
    linkInput.value = "";
    coverInput.value = "";
    dateInput.value = "";
    paragraphInput.value = "";

    createButton.textContent = "Yarat";
};

const renderBlogs = (blogs) => {

    tbody.innerHTML = "";

    blogs.forEach(blog => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${blog.nameOfBlog}</td>
            <td>${blog.date}</td>
            <td>
                <button
                    class="edit-blog"
                    data-id="${blog._id}">
                    Edit
                </button>

                <button
                    class="delete-blog"
                    data-id="${blog._id}">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(tr);

    });

};

export const loadBlogs = async () => {

    try {

        const result =
            await api.get("/getBlogs");

        renderBlogs(result.data);

    } catch (error) {

        showAlert(
            "error",
            error.message || "Bloglar gətirilə bilmədi"
        );

    }

};

const createBlog = async () => {

    try {
        let imageUrl = "";
        if (selectedBlogId) {
            createButton.textContent = "Yenilənir...";
            if (changeFile) {
                const file = coverInput.files[0];
                imageUrl = await uploadImage(file);
            }
            else {
                imageUrl = blogCoverFromUpdate;
            }
        } else {
            createButton.textContent = "Yaradılır...";
            const file = coverInput.files[0];
            imageUrl = await uploadImage(file);
        }

        const payload = {

            nameOfBlog:
                nameInput.value.trim(),

            linkOfBlog:
                linkInput.value.trim(),

            coverOfBlog:
                imageUrl,

            paragrafOfBlog:
                paragraphInput.value.trim(),

            date:
                dateInput.value.trim()

        };

        if (selectedBlogId) {

            await api.patch(
                `/admin/updateBlog/${selectedBlogId}`,
                payload
            );

            showAlert(
                "success",
                "Blog yeniləndi"
            );

        } else {

            await api.post(
                "/admin/createBlog",
                payload
            );

            showAlert(
                "success",
                "Blog yaradıldı"
            );

        }

        if (selectedBlogId) {
            changeFile = false;
            document.querySelector(".box-cover")?.remove();
            blogCoverFromUpdate = null;
            selectedBlogId = null;
            const newCoverInput = document.createElement("input");
            newCoverInput.setAttribute("type", "file");
            newCoverInput.setAttribute("id", "coverOfBlog");
            coverInput = newCoverInput;
            document.querySelector(".card").insertBefore(coverInput, createButton);
        }

        clearForm();
        createButton.textContent = "Yarat";

        await loadBlogs();

    } catch (error) {

        showAlert(
            "error",
            error.message || "Əməliyyat uğursuz oldu"
        );

    }

};

const deleteBlog = async (id) => {

    try {

        const confirmDelete =
            confirm(
                "Blog silinsin?"
            );

        if (!confirmDelete) {
            return;
        }

        await api.delete(
            `/admin/deleteBlog/${id}`
        );

        showAlert(
            "success",
            "Blog silindi"
        );

        await loadBlogs();

    } catch (error) {

        showAlert(
            "error",
            error.message || "Blog silinə bilmədi"
        );

    }

};

const fillUpdateForm = async (id) => {

    try {

        document.querySelector(".loading-container").style.display = "flex";
        const result =
            await api.get("/getBlogs");

        document.querySelector(".loading-container").style.display = "none";
        const blog =
            result.data.find(
                x => x._id === id
            );

        if (!blog) return;

        selectedBlogId = id;

        coverInput.remove();
        const boxCover = document.createElement("div");
        boxCover.classList.add("box-cover");
        const imgCover = document.createElement("img");
        imgCover.setAttribute("src", blog.coverOfBlog);
        imgCover.setAttribute("alt", "Blog Cover");
        imgCover.setAttribute("id", "blogCoverFromUpdate");
        blogCoverFromUpdate = blog.coverOfBlog;

        const newCoverInput = document.createElement("input");
        newCoverInput.setAttribute("type", "file");
        newCoverInput.setAttribute("id", "coverOfBlog");

        boxCover.append(imgCover, newCoverInput);

        newCoverInput.addEventListener("change", () => {
            changeFile = true;
        });

        coverInput = newCoverInput;

        document.querySelector(".card").insertBefore(boxCover, createButton);

        nameInput.value =
            blog.nameOfBlog;

        linkInput.value =
            blog.linkOfBlog;

        paragraphInput.value =
            blog.paragrafOfBlog;

        dateInput.value =
            blog.date;

        createButton.textContent =
            "Yenilə";

    } catch (error) {

        showAlert(
            "error",
            error.message
        );

    }

};

createButton.addEventListener(
    "click",
    createBlog
);

tbody.addEventListener(
    "click",
    async (e) => {

        const id =
            e.target.dataset.id;

        if (!id) return;

        if (
            e.target.classList.contains(
                "delete-blog"
            )
        ) {

            await deleteBlog(id);

        }

        if (
            e.target.classList.contains(
                "edit-blog"
            )
        ) {

            await fillUpdateForm(id);

        }

    }
);