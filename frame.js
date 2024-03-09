const storageKey = "data";

const formEl = document.querySelector(".js-addressly-form");
const allInputs = formEl.querySelectorAll("input");

const dataFromForm = () => {
    const data = {};
    for (const el of allInputs) {
        data[el.attributes["name"].value] = el.value;
    }
    return data;
}

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

formEl.addEventListener("submit", e => {
    e.preventDefault();
    const data = dataFromForm();
    window.localStorage.setItem(storageKey, JSON.stringify(data));
    window.parent.postMessage({type: "fill-event", ...data}, "*");
})

if (window.localStorage.getItem(storageKey) !== null) {
    // we already have data, pre-fill the form
    populateForm(JSON.parse(window.localStorage.getItem(storageKey)));
}
