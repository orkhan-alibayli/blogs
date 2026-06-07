import { api } from "../../js/api.js";

const showAlert = (type, message) => {
    const alertBoxInForm = document.querySelector('.alert-box');
    const alert = {
        type,
        message
    };
    localStorage.setItem('alert', JSON.stringify(alert));
    effectAlert();
    alertBoxInForm.style.display = 'flex';
};

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


export const loadProfile = async () => {
    document.querySelector(".loading-container").style.display = "flex";
    try {

        const profile =
            await api.get("/admin/getMe");

        document.querySelector(".loading-container").style.display = "none";

        nameInput.value =
            profile.name || "";

        surnameInput.value =
            profile.surname || "";

        usernameInput.value =
            profile.username || "";

        gmailInput.value =
            profile.gmail || "";


    } catch (error) {
        document.querySelector(".loading-container").style.display = "none";
        showAlert(
            "error",
            error.message
        );
        return;
    }
};

const updateProfile = async () => {

    try {
        updateBtn.disabled = true;
        updateBtn.textContent = "Yadda saxlanılır...";
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

        updateBtn.disabled = false;
        updateBtn.textContent = "Yadda saxla";
        showAlert(
            "success",
            "Profil yeniləndi"
        );

        await loadProfile();

    } catch (error) {
        updateBtn.disabled = false;
        updateBtn.textContent = "Yadda saxla";
        showAlert(
            "error",
            error.message
        );
        return;
    }

};

updateBtn.addEventListener(
    "click",
    updateProfile
);