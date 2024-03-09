const buttonEl = document.querySelector(".js-fill-with-addressly");
const iframeEl = document.querySelector(".js-addressly-frame");
const formEl = document.querySelector(".js-checkout-form");
const allInputs = formEl.querySelectorAll("input");

buttonEl.addEventListener("click", e => {
    e.preventDefault();
    iframeEl.classList.add("expanded");
});

const populateForm = (data) => {
    for (const el of allInputs) {
        const value = data[el.attributes["name"].value];
        if (value) {
            el.value = data[el.attributes["name"].value];
        } else {
            el.value = "";
        }
    }
};

const isLocalhost = document.location.host.indexOf("localhost") === 0;
const origin = isLocalhost ? `${document.location.protocol}//${document.location.host}` : "https://addressly.chronimo.com";

window.addEventListener("message", e => {
    if (e.origin !== origin && e.data.type === "fill-event") {
        // some other event
        return;
    }

    iframeEl.classList.remove("expanded");
    populateForm(e.data);
});

if (isLocalhost) {
    iframeEl.src = `addressly-frame.html`;
}
