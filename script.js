document.querySelector('.categories').innerHTML = "Loading cheats...";
await fetch("https://raw.githubusercontent.com/Minesraft2/Blooket-Cheats/main/unobfuscated/Bookmarklets.html").then(async x => document.querySelector("#unobfuscated").contentDocument.write(await x.text().then(x => x.slice(0, x.indexOf("<style")))));
const unobfuscated = parseCheats(document.querySelector("#unobfuscated"));

document.querySelector('.categories').innerHTML = "";
const icons = parseIcons(document.querySelector("#unobfuscated"));

loadPage();

window.onpopstate = loadPage;
function loadPage() {
    document.querySelector('.categories').innerHTML = "";
    const hash = decodeURI(location.hash.replace("#", ""));
    document.querySelector('h1').innerHTML = `${hash || "Blooket"} Cheats${hash ? `<span style="font-size: 1rem; display: block">(Click a cheat to copy the script or drag into bookmarks bar)</span>` : ""}`;
    if (hash) {
        document.querySelector('.categories').innerHTML = `<a style="width: 170px;" href="#" class="category"><img style="width: 100%;" title="Back" alt="Back" src="${icons.Default}"><div class="cheatlabel" style="background-color: #24b6ff;">Back</div></a>`;
        for (const key in unobfuscated[hash]) {
            const category = unobfuscated[hash][key];
            const categoryElement = document.createElement("a");
            categoryElement.style.width = "170px"
            categoryElement.href = category;
            categoryElement.classList.add("category");
            categoryElement.onclick = () => navigator.clipboard.writeText(category);
            const img = document.createElement("img");
            img.title = img.alt = key;
            img.src = icons[hash];
            img.style.width = "100%";
            categoryElement.append(img);
            const label = document.createElement("div");
            label.classList.add("cheatlabel");
            label.innerText = key;
            categoryElement.append(label);
            document.querySelector(".categories").appendChild(categoryElement);
        }
    } else {
        for (const key in unobfuscated) {
            const categoryElement = document.createElement("a");
            categoryElement.style.width = "135px"
            categoryElement.href = `#${key}`;
            categoryElement.classList.add("category");
            const img = document.createElement("img");
            img.title = key;
            img.src = icons[key];
            img.style.width = "100%";
            categoryElement.append(img);
            const label = document.createElement("div");
            label.classList.add("label");
            label.innerText = key;
            categoryElement.append(label);
            document.querySelector(".categories").appendChild(categoryElement);
        }
    }
}

function parseCheats(iframe) {
    let obj = {};
    for (const child of iframe.contentDocument.querySelector('dl').children) {
        let category = obj[(child.querySelector("dl") || child).parentNode.querySelector(":scope > h3")?.innerHTML || "Default"] ||= {};
        for (const { innerHTML, href } of child.querySelectorAll("a")) category[innerHTML] = decodeURI(href);
    }
    return obj
}

function parseIcons(iframe) {
    let obj = {};
    for (const child of iframe.contentDocument.querySelector('dl').children)
        obj[(child.querySelector("dl") || child).parentNode.querySelector(":scope > h3")?.innerHTML || "Default"] = child.querySelector("a").getAttribute("icon");
    return obj
}