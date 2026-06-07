import { api } from "./js/api.js";

const alertBoxInForm = document.querySelector('.alert-box');

const forClick = document.getElementsByClassName('for-click')[0];
const forClickMenu = document.getElementsByClassName('for-click-menu')[0];
forClick.addEventListener('click', () => {
    forClickMenu.classList.toggle('for-click-menu-add');
});


let arrayOfBlogs = [];

const getBlogs = async () => {
    try {

        const blogs = document.getElementsByClassName('blogs')[0];

        for (let i = 0; i < 3; i++) {

            const loading = document.createElement('div');
            loading.className = 'loading-blog';

            loading.innerHTML = `
            <div class="loading-cover">
                <div class="loading-play"></div>
            </div>

            <div class="loading-info">
                <div class="loading-date"></div>
                <div class="loading-title"></div>
            </div>
        `;

            blogs.appendChild(loading);
        }


        const res = await api.get('/getBlogs');
        arrayOfBlogs = res.data;
        if (innerWidth > 620) {
            everyThing(document.getElementsByClassName('primary-blogs')[0].offsetWidth / 2 - 20, 2, "px");
        }

        if (innerWidth <= 620) {
            everyThing(document.getElementsByClassName('primary-blogs')[0].offsetWidth, 1, "px");
        }
    } catch (error) {
        console.log(error)
    }

}

getBlogs();

const everyThing = (widthOfBlogs, seenOfBlogs, piksel) => {
    const blogs = document.getElementsByClassName('blogs')[0];
    blogs.innerHTML = "";
    blogs.style.width = arrayOfBlogs.length * widthOfBlogs + piksel;
    arrayOfBlogs.forEach((e) => {
        const blogsElement = document.createElement('div');
        const blogsElementCoverBox = document.createElement('div');
        const blogsElementCover = document.createElement('img');
        blogsElementCover.setAttribute('src', e.coverOfBlog);
        const blogsElementPlay = document.createElement('a');
        blogsElementPlay.setAttribute('href', e.linkOfBlog);
        blogsElementPlay.setAttribute('target', '_blank');
        const blogsElementPlayIcon = document.createElement('i');
        blogsElementPlayIcon.className = "bx bx-play-circle";
        blogsElementPlay.append(blogsElementPlayIcon);

        blogsElementCoverBox.append(blogsElementCover, blogsElementPlay);

        const blogsElementDate = document.createElement('span');
        blogsElementDate.textContent = e.date;
        const blogsElementName = document.createElement('h3');
        blogsElementName.textContent = e.nameOfBlog;

        blogsElement.append(blogsElementCoverBox, blogsElementDate, blogsElementName);
        blogs.append(blogsElement);
        blogsElement.style.width = document.getElementsByClassName('primary-blogs')[0].offsetWidth / 2 - 20 + "px";
        if (innerWidth <= 620) {
            blogsElement.style.width = document.getElementsByClassName('primary-blogs')[0].offsetWidth + "px";
        }

        const leftRight = document.getElementsByClassName('left-right')[0];
        let direction = 0;
        leftRight.addEventListener('click', (f) => {

            if (f.target.className === "bx bxs-chevron-right") {
                document.getElementsByClassName('bxs-chevron-left')[0].style.backgroundColor = "#333";
                document.getElementsByClassName('bxs-chevron-left')[0].style.color = "white";
                direction -= widthOfBlogs;
                blogsElement.style.left = direction + piksel;
                if (direction < - (arrayOfBlogs.length - seenOfBlogs) * widthOfBlogs) {
                    direction += widthOfBlogs;
                    blogsElement.style.left = direction + piksel;
                    f.target.style.backgroundColor = "#222";
                    f.target.style.color = "gray";
                }
            }
            else if (f.target.className === "bx bxs-chevron-left") {
                f.target.nextElementSibling.style.backgroundColor = "#333";
                f.target.nextElementSibling.style.color = "white";
                direction += widthOfBlogs;
                blogsElement.style.left = direction + piksel;
                if (direction >= widthOfBlogs) {
                    direction -= widthOfBlogs;
                    blogsElement.style.left = direction + piksel;
                    f.target.style.backgroundColor = "#222";
                    f.target.style.color = "gray";
                }
            }
        });
    });
};

const cursor = document.getElementsByClassName('cursor')[0];
document.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
});


const cursorTema = (tema) => {
    for (let i = 0; i < tema.length; i++) {
        tema[i].addEventListener('mouseover', () => {
            cursor.style.width = "50px";
            cursor.style.height = "50px";
            cursor.style.backgroundColor = "rgba(56, 25, 95, .4)";
        });
        tema[i].addEventListener('mouseout', () => {
            cursor.style.width = "13px";
            cursor.style.height = "13px";
            cursor.style.backgroundColor = "rgba(56, 25, 95, 1)";
        });
    }
}


const eventForI = document.getElementsByTagName('i'), label = document.getElementsByTagName('label');
cursorTema(eventForI);
cursorTema(label);

const form = document.getElementsByTagName('form')[0];

const sendMessage = async (e) => {
    e.preventDefault();
    const nameOfPerson = document.getElementsByClassName('nameOfPerson')[0],
        emailOfPerson = document.getElementsByClassName('emailOfPerson')[0],
        subjectOfPerson = document.getElementsByClassName('subjectOfPerson')[0],
        textOfPerson = document.getElementsByClassName('textOfPerson')[0];

    const payload = {
        name: nameOfPerson?.value.trim(),
        gmail: emailOfPerson?.value.trim(),
        subject: subjectOfPerson?.value.trim(),
        message: textOfPerson?.value.trim(),
        phone: null,
    }

    const keys = {
        name: 'Ad (Name)',
        gmail: 'Gmail (Gmail)',
        subject: 'Başlıq (Subject)',
        message: 'Mesaj (Text)'
    }

    for (const [key, value] of Object.entries(payload)) {
        if (value === '') {
            const alert = {
                type: 'error',
                message: `${keys[key]} xanası boş qala bilməz`
            };
            localStorage.setItem('alert', JSON.stringify(alert));
            effectAlert();
            alertBoxInForm.style.display = 'flex';
            return;
        }
    }

    try {
        await api.post('/postMessage', payload);

        const alert = {
            type: 'success',
            message: `Mesaj uğurla göndərildi`
        };
        localStorage.setItem('alert', JSON.stringify(alert));
        effectAlert();
        alertBoxInForm.style.display = 'flex';

        nameOfPerson.value = '';
        subjectOfPerson.value = '';
        emailOfPerson.value = '';
        textOfPerson.value = '';
    } catch (error) {
        const alert = {
            type: 'error',
            message: `${error?.response?.data?.message ||
                error?.message || "Unknown error"}`
        };
        localStorage.setItem('alert', JSON.stringify(alert));
        effectAlert();
        alertBoxInForm.style.display = 'flex';
    }
}

form.addEventListener('submit', sendMessage);