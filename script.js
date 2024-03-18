const forClick = document.getElementsByClassName('for-click')[0];
const forClickMenu = document.getElementsByClassName('for-click-menu')[0];
forClick.addEventListener('click', () => {
    forClickMenu.classList.toggle('for-click-menu-add');
});


const arrayOfBlogs = [
    {
        nameOfBlogs: 'Cyber Talks',
        dateOfBlogs: '05/03/2023',
        linkOfBlogs: 'https://www.youtube.com/watch?v=cZxLJ1XYimc',
        coverOfBlogs: 'photos/blog1.jpg'
    },
    {
        nameOfBlogs: 'Article - Subdomain Takeover',
        dateOfBlogs: '30/11/2022',
        linkOfBlogs: 'https://medium.com/@orkhan_alibayli/subdomain-takeover-95646de1f436',
        coverOfBlogs: 'photos/blog-article1.PNG'
    },
    {
        nameOfBlogs: 'cyber security',
        dateOfBlogs: 'march 7',
        linkOfBlogs: 'https://www.youtube.com/watch?v=cZxLJ1XYimc',
        coverOfBlogs: 'photos/blog3.jpg'
    },
    {
        nameOfBlogs: 'cyber security',
        dateOfBlogs: 'march 8',
        linkOfBlogs: 'https://www.youtube.com/watch?v=cZxLJ1XYimc',
        coverOfBlogs: 'photos/blog1.jpg'
    },
    {
        nameOfBlogs: 'cyber security',
        dateOfBlogs: 'march 9',
        linkOfBlogs: 'https://www.youtube.com/watch?v=cZxLJ1XYimc',
        coverOfBlogs: 'photos/blog2.jpg'
    },
    {
        nameOfBlogs: 'cyber security',
        dateOfBlogs: 'march 10',
        linkOfBlogs: 'https://www.youtube.com/watch?v=cZxLJ1XYimc',
        coverOfBlogs: 'photos/blog3.jpg'
    },
    {
        nameOfBlogs: 'cyber security',
        dateOfBlogs: 'march 11',
        linkOfBlogs: 'https://www.youtube.com/watch?v=cZxLJ1XYimc',
        coverOfBlogs: 'photos/blog1.jpg'
    }
];

const everyThing = (widthOfBlogs, seenOfBlogs, piksel) => {
    const blogs = document.getElementsByClassName('blogs')[0];
    blogs.style.width = arrayOfBlogs.length * widthOfBlogs + piksel;
    arrayOfBlogs.forEach((e) => {
        const blogsElement = document.createElement('div');
        const blogsElementCoverBox = document.createElement('div');
        const blogsElementCover = document.createElement('img');
        blogsElementCover.setAttribute('src', e.coverOfBlogs);
        const blogsElementPlay = document.createElement('a');
        blogsElementPlay.setAttribute('href', e.linkOfBlogs);
        blogsElementPlay.setAttribute('target', '_blank');
        const blogsElementPlayIcon = document.createElement('i');
        blogsElementPlayIcon.className = "bx bx-play-circle";
        blogsElementPlay.append(blogsElementPlayIcon);

        blogsElementCoverBox.append(blogsElementCover, blogsElementPlay);

        const blogsElementDate = document.createElement('span');
        blogsElementDate.textContent = e.dateOfBlogs;
        const blogsElementName = document.createElement('h3');
        blogsElementName.textContent = e.nameOfBlogs;

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
}



if (innerWidth > 620) {
    everyThing(document.getElementsByClassName('primary-blogs')[0].offsetWidth / 2 - 20, 2, "px");
}

if (innerWidth <= 620) {
    everyThing(document.getElementsByClassName('primary-blogs')[0].offsetWidth, 1, "px");
}



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

const sendMessage = (e) => {
    e.preventDefault();
    const nameOfPerson = document.getElementsByClassName('nameOfPerson')[0],
        emailOfPerson = document.getElementsByClassName('emailOfPerson')[0],
        subjectOfPerson = document.getElementsByClassName('subjectOfPerson')[0],
        textOfPerson = document.getElementsByClassName('textOfPerson')[0];

    Email.send({
        SecureToken: "86ccc825-9428-46d4-bfed-83d534e7716a",
        To: 'vidadiali.tiva@gmail.com',
        Subject: subjectOfPerson.value,
        Body: textOfPerson.value
    }).then(
        message => alert(message)
    );
}

form.addEventListener('submit', sendMessage);
// if (scrollY > 0) {
//     document.getElementById('forUp').style.display = "flex";
// }