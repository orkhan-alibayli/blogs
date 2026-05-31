import { api } from "../../js/api.js";

const searchInput =
    document.getElementById("searchMessage");

const gmailsBox =
    document.getElementById("gmails");

const messagesBox =
    document.getElementById("messages");

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

// 👉 Gmail-ləri gətir
export const loadGmails = async () => {

    try {

        const gmails =
            await api.get(
                "/admin/messages/gmails"
            );

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

        showAlert(
            "error",
            error.message
        );

    }

};

// 👉 Seçilmiş gmail mesajları
const loadMessages = async (gmail) => {

    document.getElementById("activeUser").textContent = gmail;

    try {

        const messages =
            await api.get(
                `/admin/messages/${gmail}`
            );

        renderMessages(messages);

    } catch (error) {

        showAlert(
            "error",
            error.message
        );

    }

};

// 👉 Render mesajlar
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
    `;

        messagesBox.appendChild(card);
    });

};

// 👉 Axtarış
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

// 👉 event
searchInput.addEventListener(
    "input",
    (e) => {
        searchMessages();
    }
);

