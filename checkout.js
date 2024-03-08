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
        el.value = data[el.attributes["name"].value];
    }
}

window.addEventListener("message", e => {
    iframeEl.classList.remove("expanded");
    populateForm(e.data);
})