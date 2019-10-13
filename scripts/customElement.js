const template = document.createElement('template');
template.innerHTML = `
<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
@import "/style/index.css
</style>`;
const units = ['tola', 'gram', 'milligram', 'kilo', 'pieces'];
class UnitSelecter extends HTMLElement {
    constructor(...args) {
        super(...args);
        console.log(args);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        shadowRoot.appendChild(createSelectElement(this));
    }
}
function createSelectElement(customElement) {
    let selectElement = document.createElement('select');
    selectElement.setAttribute('type', 'single');
    if (this.className) {
        selectElement.className = customElement.className;
    }
    else {
        selectElement.classList.add('form-control');
        selectElement.classList.add('weight-unit');
    }
    const defaultSelection = customElement.getAttribute("default");
    units.map(unit => toOption(defaultSelection, unit)).forEach(op => selectElement.appendChild(op));
    return selectElement;
}
function toOption(defaultSelection, unit) {
    const option = document.createElement('option');
    option.value = unit;
    option.innerText = unit;
    if (defaultSelection && defaultSelection == unit) {
        option.setAttribute('selected', 'selected');
    }
    return option;
}
class CalculatableInput extends HTMLElement {
    constructor(...args) {
        super(...args);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        let inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'number');
        if (this.className) {
            inputElement.className = this.className;
        }
        else {
            inputElement.classList.add('calculatable');
            inputElement.classList.add('form-control');
        }
        shadowRoot.appendChild(inputElement);
    }
}

class CalculatableDiv extends HTMLDivElement {
    constructor(...args) {
        super(...args);
        /*this.createdCallback = () => {
            if (classNames) {
                classNames.array.forEach(this.classList.add);
            }
            else {
                this.calculatableContainerClass = ['col-sm-6'];
                this.unitSelectorContainerClass = ['col-sm-6'];
            }
        }*/
    }
}
customElements.define('unit-selecter', UnitSelecter);
customElements.define('calculatable-input', CalculatableInput);
customElements.define('calculatable-div', CalculatableDiv, { extends: 'div' });