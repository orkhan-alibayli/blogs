import { loadBlogs } from "./blogs.js";
import { loadProfile } from "./profile.js";
import { loadGmails } from "./messages.js";

const buttons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        buttons.forEach(x =>
            x.classList.remove("active")
        );

        pages.forEach(x =>
            x.classList.remove("active")
        );

        btn.classList.add("active");

        document
            .getElementById(
                `${btn.dataset.page}-page`
            )
            .classList
            .add("active");

    });

});

if (JSON.parse(localStorage.getItem('signed'))) {
    loadBlogs();
    loadProfile();
    loadGmails();
}
