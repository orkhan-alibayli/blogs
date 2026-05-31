import { api } from "../../js/api.js";

let selectedBlogId = null;

const showAlert = (type, message) => {

    localStorage.setItem(
        "alert",
        JSON.stringify({
            type,
            message
        })
    );

    if (typeof effectAlert === "function") {
        effectAlert();
    }
};

const tbody = document.getElementById("blogsTable");

const nameInput =
    document.getElementById("nameOfBlog");

const linkInput =
    document.getElementById("linkOfBlog");

const coverInput =
    document.getElementById("coverOfBlog");

const dateInput =
    document.getElementById("dateOfBlog");

const paragraphInput =
    document.getElementById("paragrafOfBlog");

const createButton =
    document.getElementById("createBlog");

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

        const payload = {

            nameOfBlog:
                nameInput.value.trim(),

            linkOfBlog:
                linkInput.value.trim(),

            coverOfBlog:
                coverInput.value.trim(),

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

        clearForm();

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

        const result =
            await api.get("/getBlogs");

        const blog =
            result.data.find(
                x => x._id === id
            );

        if (!blog) return;

        selectedBlogId = id;

        nameInput.value =
            blog.nameOfBlog;

        linkInput.value =
            blog.linkOfBlog;

        coverInput.value =
            blog.coverOfBlog;

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