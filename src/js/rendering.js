export let blogStartIndex = 1;

export function renderHero(heroArgs) {
    let heroHtml = "";
    let heroImageUrl = "";

    const { heroEl, key, blog } = heroArgs;

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
}

export function renderContent(contentArgs) {
    let contentHtml = "";

    let { contentEl, data, BLOGS_PER_PAGE } = contentArgs;

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
        return true;
    });
    return blogStartIndex;
}

export function renderSections(key, sections) {
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