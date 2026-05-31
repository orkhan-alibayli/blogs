import { api } from "../../js/api.js";

const nameInput =
    document.getElementById("name");

const surnameInput =
    document.getElementById("surname");

const usernameInput =
    document.getElementById("username");

const gmailInput =
    document.getElementById("gmail");

const updateBtn =
    document.getElementById("updateProfile");

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

// 👉 profile load
export const loadProfile = async () => {

    try {

        const profile =
            await api.get("/admin/getMe");

        nameInput.value =
            profile.name || "";

        surnameInput.value =
            profile.surname || "";

        usernameInput.value =
            profile.username || "";

        gmailInput.value =
            profile.gmail || "";

    } catch (error) {

        showAlert(
            "error",
            error.message
        );

    }

};

// 👉 profile update
const updateProfile = async () => {

    try {

        const payload = {

            name: nameInput.value.trim(),

            surname: surnameInput.value.trim(),

            username: usernameInput.value.trim(),

            gmail: gmailInput.value.trim()

        };

        await api.patch(
            "/admin/updateMe",
            payload
        );

        showAlert(
            "success",
            "Profil yeniləndi"
        );

        await loadProfile();

    } catch (error) {

        showAlert(
            "error",
            error.message
        );

    }

};

// 👉 event
updateBtn.addEventListener(
    "click",
    updateProfile
);