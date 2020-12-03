class Tooltip extends HTMLElement {
    constructor () {
        super()
        this._tooltipContainter
        this._tooltipText = 'Default tooltip text'
        this.attachShadow({ mode: 'open' })
        // const template = document.getElementById('tooltip-template')
        // shadow DOM can be accessed even before the element has been rendered
        // this.shadowRoot.appendChild(template.content.cloneNode(true))

        // scoped styles
        // highlight css class also exists in main.css but there is no collision
        // ::slotted() can select the top most element of slot
        // host selector styles the whole host component
        // styles in light DOM will always override ::slotted() and :host styles
        this.shadowRoot.innerHTML = `
            <style>
                .fancy-tooltip {
                    position: relative;
                }

                .fancy-tooltip__content {
                    position: absolute;
                    background-color: #f5e3f5;
                    padding: 10px;
                    z-index: 10;
                }

                .highlight {
                    color: #801e80;
                }

                ::slotted(span) {
                    text-decoration: underline;
                }

                :host {
                    background: #ccc;
                }
            </style>
            <slot>Default slot</slot>
            <span class="highlight">:-*</span>`
    }

    connectedCallback () {
        if (this.hasAttribute('text'))
            this._tooltipText = this.getAttribute('text')

        const icon = this.shadowRoot.querySelector('span')
        icon.addEventListener('mouseenter', this._showTooltip.bind(this))
        icon.addEventListener('mouseleave', this._hideTooltip.bind(this))

        this.classList.add('fancy-tooltip')
    }

    _showTooltip () {
        this._tooltipContainter = document.createElement('div')
        this._tooltipContainter.textContent = this._tooltipText
        this._tooltipContainter.classList.add('fancy-tooltip__content')
        this.shadowRoot.appendChild(this._tooltipContainter)
    }

    _hideTooltip () {
        this.shadowRoot.removeChild(this._tooltipContainter)
    }
}

customElements.define('fancy-tooltip', Tooltip)

// LIFECYCLE
// constructor () - element created: basic initializations
// connectedCallback () - element attached to DOM: DOM initializations
// disconnectedCallback () - element detached from DOM: cleanup work
// attributeChangedCallback () - observed attribute updated: update data + DOM
