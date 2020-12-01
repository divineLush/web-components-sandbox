class Tooltip extends HTMLElement {
    constructor () {
        super()
        this._tooltipContainter
        this._tooltipText = 'Default tooltip text'
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback () {
        if (this.hasAttribute('text'))
            this._tooltipText = this.getAttribute('text')

        const icon = document.createElement('span')
        icon.textContent = ' :-*'
        icon.addEventListener('mouseenter', this._showTooltip.bind(this))
        icon.addEventListener('mouseleave', this._hideTooltip.bind(this))

        this.shadowRoot.appendChild(icon)
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
