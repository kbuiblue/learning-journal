const appSettings = {
    databaseURL:
        "https://learning-journal-e7115-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = firebase.initializeApp(appSettings);
const blogsInDB = firebase.database().ref("blogs-list");

const heroEl = document.querySelector(".hero");
const contentEl = document.querySelector(".content");

const BLOGS_PER_PAGE = 3;

let blogStartIndex = 1;
let data;

blogsInDB.on("value", function (snapshot) {
    if (snapshot.exists()) {
        data = Object.entries(snapshot.val());

        if (data[0][0] === "blog1") {
            renderHero(data[0][0], data[0][1]);
        }

        renderContent(data.slice(1));
    } else {
        console.error("No data available");
    }
});

function renderHero(key, blog) {
    let heroHtml = "";
    let heroImageUrl = "";

    data.forEach(function () {
        heroHtml = `
            <a href="hero-blog.html">
                <div class="blog" id="${key}">
                    <div class="blog1-content">
                        <p class="blog-date">${blog.date}</p>
                        <h2 class="blog-title">${blog.title}</h2>
                        ${renderSections(key, blog.sections)}
                    </div>
                </div>
            </a>
        `;

        const imageSection = blog.sections.find(
            (section) => section.type === "image"
        );

        heroImageUrl = imageSection.url;
        heroEl.innerHTML = heroHtml;

        const blog1El = document.getElementById("blog1");

        blog1El.style.backgroundImage = `url(${heroImageUrl})`;
        blog1El.style.backgroundSize = "cover";
        blog1El.style.backgroundRepeat = "no-repeat";
        blog1El.style.backgroundPosition = "center";

        blog1El.classList.add = "blog-image";
    });
}

function renderContent(data) {
    let contentHtml = "";

    data.every(function ([key, blog]) {
        contentHtml += `
            <div class="blog" id="${key}">
                <p class="blog-date">${blog.date}</p>
                <h2 class="blog-title">${blog.title}</h2>
                ${renderSections(key, blog.sections)}
            </div>`;

        if (
            (blogStartIndex % BLOGS_PER_PAGE === 0 && blogStartIndex > 0) ||
            data.length === 1
        ) {
            contentEl.innerHTML += contentHtml;
            return false;
        }

        blogStartIndex++;
        console.log(blogStartIndex);
        return true;
    });
}

function renderSections(key, sections) {
    let html = "";
    sections.forEach(function (section) {
        switch (section.type) {
            case "paragraph":
                html += `<p class="blog-content">${section.text}</p>`;
                break;
            case "image":
                if (key !== "blog1") {
                    html += `<img class="blog-image" src="${section.url}" alt="Blog image" />`;
                }
                break;
            case "heading":
                html += `<h3>${section.content[0].text}</h3>`;
                html += renderSections(section.content);
                break;
            default:
                break;
        }
    });
    return html;
}

// for subsequent render after initial render
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("view-more")) {
        if (data.length > blogStartIndex) {
            blogStartIndex++;
        }

        const partialData = data.slice(blogStartIndex);

        if (partialData.length >= 1) {
            renderContent(partialData, false);
        }
    }
});
