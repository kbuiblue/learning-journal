const appSettings = {
    databaseURL:
        "https://learning-journal-e7115-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = firebase.initializeApp(appSettings);
const database = firebase.database();
const blogsInDB = firebase.database().ref("blogs-list");

const heroEl = document.querySelector(".hero");
const contentEl = document.querySelector(".content");

blogsInDB.on("value", function (snapshot) {
    if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        renderHtml(data);
    } else {
        console.log("No data available");
    }
});

function renderHtml(data) {
    let heroHtml = "";
    let contentHtml = "";
    let heroImageUrl = "";

    data.forEach(function ([key, blog]) {
        let html = `
            <div class="blog" id="${key}">
                ${key === "blog1" ? '<div class="blog1-content">' : ""}
                <p class="blog-date">${blog.date}</p>
                <h2 class="blog-title">${blog.title}</h2>
                ${renderSections(key, blog.sections)}
                ${key === "blog1" ? '</div>' : ""}
            </div>
        `;

        const imageSection = blog.sections.find(
            (section) => section.type === "image"
        );

        if (key === "blog1") {
            heroHtml = html;

            if (imageSection) {
                heroImageUrl = imageSection.url;
            }
        } else {
            contentHtml += html;
        }

        heroEl.innerHTML = heroHtml;

        const blog1El = document.getElementById("blog1");
        if (blog1El) {
            blog1El.style.backgroundImage = `url(${heroImageUrl})`;
            blog1El.style.backgroundSize = "cover";
            blog1El.style.backgroundRepeat = "no-repeat";
            blog1El.style.backgroundPosition = "center";

            blog1El.classList.add = "blog-image";
        }

        contentEl.innerHTML = contentHtml;
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
