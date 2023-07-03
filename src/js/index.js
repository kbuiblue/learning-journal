import { renderHero, renderContent } from "./rendering";

const appSettings = {
    databaseURL:
        "https://learning-journal-e7115-default-rtdb.asia-southeast1.firebasedatabase.app",
};

firebase.initializeApp(appSettings);
const blogsInDB = firebase.database().ref("blogs-list");

const heroEl = document.querySelector(".hero");
const contentEl = document.querySelector(".blogs-container");

const BLOGS_PER_PAGE = 3;

let blogStartIndex;
let data;

blogsInDB.on("value", function (snapshot) {
    if (snapshot.exists()) {
        data = Object.entries(snapshot.val());

        if (data[0][0] === "blog1") {
            const heroArgs = {
                heroEl: heroEl,
                key: data[0][0],
                blog: data[0][1],
            };
            renderHero(heroArgs);
        }

        const contentArgs = {
            contentEl: contentEl,
            data: data.slice(1),
            BLOGS_PER_PAGE: BLOGS_PER_PAGE,
        };

        blogStartIndex = renderContent(contentArgs);
    } else {
        console.error("No data available");
    }
});

// for subsequent render after initial render
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("view-more")) {
        const partialData = data.slice(blogStartIndex);

        let contentArgs = {
            contentEl: contentEl,
            data: partialData,
            BLOGS_PER_PAGE: BLOGS_PER_PAGE,
        };

        if (partialData.length >= 1) {
            renderContent(contentArgs);
            blogStartIndex += BLOGS_PER_PAGE;
        }
    }
});
