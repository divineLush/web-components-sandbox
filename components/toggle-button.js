class ToggleButton extends HTMLElement {
    constructor () {
        super()
        this._visibility = false
        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = `
            <div class="fancy-toggle-button">
                <button class="fancy-toggle-button__btn">Toggle button</button>
                <div class="fancy-toggle-button__content-wrapper">
                    <slot></slot>
                </div>
            </div>
        `
    }

    connectedCallback () {
        if (this.hasAttribute('initialVisibility'))
            this._visibility = this.getAttribute('initialVisibility')

        this._updateButtonName()
        this._toggleContentVisibility()

        const button = this.shadowRoot.querySelector('button')
        button.addEventListener('click', this._handleClick.bind(this))
    }

    _handleClick () {
        console.log('Hello from toggle button!')
        this._toggleContentVisibility()
    }

    _toggleContentVisibility () {
        const wrapper = this.shadowRoot.querySelector('.fancy-toggle-button__content-wrapper')
        const visibility = this._visibility ? 'block' : 'none'
        wrapper.style.display = visibility

        this._visibility = !this._visibility
        this._updateButtonName()
    }

    _updateButtonName () {
        const name = this._visibility ? 'Show' : 'Hide'
        const button = this.shadowRoot.querySelector('button')
        button.textContent = name
    }
}

customElements.define('fancy-toggle-button', ToggleButton)
