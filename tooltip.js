class Tooltip extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback () {
        const icon = document.createElement('span')
        icon.textContent = ' :-*'
        this.appendChild(icon)
    }
}

customElements.define('fancy-tooltip', Tooltip)

// LIFECYCLE
// constructor () - element created: basic initializations
// connectedCallback () - element attached to DOM: DOM initializations
// disconnectedCallback () - element detached from DOM: cleanup work
// attributeChangedCallback () - observed attribute updated: update data + DOM
