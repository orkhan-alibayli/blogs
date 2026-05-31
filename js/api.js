const BASE_URL = "http://localhost:5000/api";

let isRefreshing = false;
let refreshPromise = null;

async function request(url, options = {}) {

    const res = await fetch(BASE_URL + url, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    // 🔥 ACCESS TOKEN EXPIRED HANDLER
    if (res.status === 401) {

        // refresh eyni anda 10 request gəlməsin deyə lock
        if (!isRefreshing) {
            isRefreshing = true;

            refreshPromise = fetch(BASE_URL + "/auth/refresh", {
                method: "POST",
                credentials: "include"
            })
                .finally(() => {
                    isRefreshing = false;
                });
        }

        const refreshRes = await refreshPromise;

        if (refreshRes.ok) {
            // refresh success → ORIGINAL REQUEST RETRY
            return request(url, options);
        } else {
            // refresh fail → logout
            window.location.href = "/login.html";
            return;
        }
    }

    if (!res.ok) {
        throw await res.json();
    }

    return res.json();
}

export const api = {

    get: (url) =>
        request(url, {
            method: "GET"
        }),

    post: (url, data) =>
        request(url, {
            method: "POST",
            body: JSON.stringify(data)
        }),

    put: (url, data) =>
        request(url, {
            method: "PUT",
            body: JSON.stringify(data)
        }),

    patch: (url, data) =>
        request(url, {
            method: "PATCH",
            body: JSON.stringify(data)
        }),

    delete: (url) =>
        request(url, {
            method: "DELETE"
        })
};