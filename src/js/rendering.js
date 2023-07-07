export let blogStartIndex = 1;

export function renderHero(heroArgs) {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "index.html") {
        renderIndexHero(heroArgs);
    } else if (page === "hero-blog.html") {
        renderHeroBlogHero(heroArgs);
    }
}

function renderIndexHero(heroArgs) {
    const { heroEl, key, blog } = heroArgs;

    let heroHtml = `
        <a href="/src/html/hero-blog.html">
            <div class="blog" id="${key}">
                <div class="blog1-content">
                    <p class="blog-date">${blog.date}</p>
                    <h2 class="blog-title">${blog.title}</h2>
                    ${renderSections(key, blog.sections, "index.html")}
                </div>
            </div>
        </a>
    `;

    const imageSection = blog.sections.find(
        (section) => section.type === "image"
    );

    const heroImageUrl = imageSection.url;
    heroEl.innerHTML = heroHtml;

    const blog1El = document.getElementById("blog1");
    blog1El.style.backgroundImage = `url(${heroImageUrl})`;
    blog1El.style.backgroundSize = "cover";
    blog1El.style.backgroundRepeat = "no-repeat";
    blog1El.style.backgroundPosition = "center";

    blog1El.classList.add("blog-image");
}

function renderHeroBlogHero(heroArgs) {
    const { heroEl, key, blog } = heroArgs;

    let heroHtml = `
        <div class="blog" id="${key}">
            <div class="blog1-content">
                <p class="blog-date">${blog.date}</p>
                <h2 class="blog-title">${blog.title}</h2>
                ${renderSections(key, blog.sections, "hero-blog.html")}
            </div>
        </div>
    `;

    const imageSection = blog.sections.find(
        (section) => section.type === "image"
    );

    const heroImageUrl = imageSection.url;
    heroEl.innerHTML = heroHtml;
}

export function renderContent(contentArgs) {
    let { contentEl, data, BLOGS_PER_PAGE } = contentArgs;

    let renderedBlogsCount = 0;

    data.every(function ([key, blog]) {
        renderedBlogsCount++;

        let contentHtml = `
            <div class="blog" id="${key}">
                <p class="blog-date">${blog.date}</p>
                <h2 class="blog-title">${blog.title}</h2>
                ${renderSections(key, blog.sections)}
            </div>`;

        if (renderedBlogsCount % BLOGS_PER_PAGE === 0 || data.length === 1) {
            contentEl.insertAdjacentHTML("beforeend", contentHtml);
            return false;
        }

        contentEl.insertAdjacentHTML("beforeend", contentHtml);
        return true;
    });

    blogStartIndex += renderedBlogsCount;

    return blogStartIndex;
}

export function renderSections(key, sections, page) {
    let html = "";
    sections.forEach(function (section) {
        switch (section.type) {
            case "paragraph":
                html += `<p class="blog-content">${section.text}</p>`;
                break;
            case "image":
                if (key !== "blog1" || page !== "index.html") {
                    html += `<img class="blog-image" src="${section.url}" alt="Blog image" />`;
                }
                break;
            case "heading":
                html += `<h3>${section.content[0].text}</h3>`;
                html += renderSections(section.content);
                break;
            default:
                if (
                    page !== "index.html" &&
                    section.heading &&
                    Array.isArray(section.content)
                ) {
                    html += `<h3 class="blog-heading">${section.heading}</h3>`;
                    section.content.forEach((content) => {
                        if (content.type === "paragraph") {
                            html += `<p class="blog-content">${content.text}</p>`;
                        }
                    });
                }
                break;
        }
    });
    return html;
}
