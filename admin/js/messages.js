import { api } from "../../js/api.js";

const searchInput =
    document.getElementById("searchMessage");

const gmailsBox =
    document.getElementById("gmails");

const messagesBox =
    document.getElementById("messages");

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

export const loadGmails = async () => {

    try {
        document.querySelector(".loading-container").style.display = "flex";
        const gmails =
            await api.get(
                "/admin/messages/gmails"
            );

        document.querySelector(".loading-container").style.display = "none";
        gmailsBox.innerHTML = "";

        gmails.forEach(gmail => {

            const item =
                document.createElement("div");

            item.className =
                "gmail-item";

            item.textContent =
                gmail;

            item.addEventListener(
                "click",
                () => loadMessages(gmail)
            );

            gmailsBox.appendChild(item);

        });

    } catch (error) {
        document.querySelector(".loading-container").style.display = "none";
        showAlert(
            "error",
            error.message
        );

    }

};

const loadMessages = async (gmail) => {

    document.getElementById("activeUser").textContent = gmail;

    try {

        document.querySelector(".loading-container").style.display = "flex";
        const messages =
            await api.get(
                `/admin/messages/${gmail}`
            );

        document.querySelector(".loading-container").style.display = "none";
        renderMessages(messages);

    } catch (error) {

        document.querySelector(".loading-container").style.display = "none";
        showAlert(
            "error",
            error.message
        );

    }

};

const renderMessages = (messages) => {

    messagesBox.innerHTML = "";

    if (!messages.length) {

        messagesBox.innerHTML =
            "Mesaj tapılmadı";

        return;
    }

    messages.forEach(msg => {

        const card = document.createElement("div");
        card.className = "message-card";

        card.innerHTML = `
        <h3>${msg.subject}</h3>
        <p><b>Ad:</b> ${msg.name || "-"}</p>
        <p><b>Mesaj:</b> ${msg.message}</p>
        <small>${new Date(msg.createdAt).toLocaleString()}</small>
        <a href="mailto:${msg.gmail}" class="reply-btn">Gmaildə Cavab Yaz</a>
    `;

        messagesBox.appendChild(card);
    });

};

const searchMessages = async () => {

    try {

        const searchText =
            searchInput.value.trim();

        if (!searchText) {

            showAlert(
                "error",
                "Axtarış boşdur"
            );

            return;
        }

        const messages =
            await api.post(
                "/admin/messages/search",
                {
                    searchText
                }
            );

        renderMessages(messages);

    } catch (error) {

        showAlert(
            "error",
            error.message
        );

    }

};

searchInput.addEventListener(
    "input",
    (e) => {
        searchMessages();
    }
);

