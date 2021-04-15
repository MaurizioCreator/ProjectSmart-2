const files = ["singup.json",
    "singin.json",
    "interview.json",
    "colorsheme.json",
    "addpost.json",
];

const parse = async (file) => {
    const response = await fetch("Data/" + file);
    return response.json();
}

const createFieldOnPage = (fieldData) => {
    const fieldElem = document.createElement("div");

    let labelElem = null;
    if (fieldData.label !== undefined) {
        labelElem = document.createElement("label");
        labelElem.innerHTML = fieldData.label;

        fieldElem.append(labelElem);
    }

    let inputElem = null;
    if (fieldData.input.type === "select") {
        inputElem = document.createElement("select");

        const optionsElems = fieldData.input.options.map((option) => {
            const optionElem = document.createElement("option");
            optionElem.innerHTML = option;

            return optionElem;
        });

        optionsElems.forEach((optionElement) => {
            inputElem.append(optionElement);
        });
    } else {
        inputElem = document.createElement("input");
    }

    for (let prop in fieldData.input) {
        if (prop === "options" || fieldData.input[prop] === "select") {
            continue;
        }

        inputElem[prop] = fieldData.input[prop];
    }

    fieldElem.append(inputElem);

    return fieldElem;

}

const appRef = document.getElementById("app");

files.map(file => {
    const buttonElem = document.createElement("button");
    buttonElem.innerText = "Create " + file;

    buttonElem.onclick = async () => {
        const json = await parse(file);
        console.log(json);
        const formElement = document.createElement("div");

        json.fields.map(field => {
            const fieldElement = createFieldOnPage(field);

            formElement.append(fieldElement);
        });

        appRef.append(formElement);
    }
    appRef.append(buttonElem);
})















