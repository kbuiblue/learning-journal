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

    data.forEach(function ([key, blog]) {
        let html = `
            <div class="blog">
                <h2>${blog.title}</h2>
                <p>Date: ${blog.date}</p>
                ${renderSections(blog.sections)}
            </div>
        `;
        if (key === "blog1") {
            heroHtml = html;
        } else {
            contentHtml += html;
        }

        heroEl.innerHTML = heroHtml;
        contentEl.innerHTML = contentHtml;
    });
}

function renderSections(sections) {
    let html = "";
    sections.forEach(function (section) {
        switch (section.type) {
            case "paragraph":
                html += `<p>${section.text}</p>`;
                break;
            case "image":
                html += `<img src="${section.url}" alt="Blog image" />`;
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
