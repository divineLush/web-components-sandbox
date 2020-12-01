class ConfirmLink extends HTMLAnchorElement {
    connectedCallback () {
        this.addEventListener('click', this._handleClick.bind(this))
    }

    _handleClick (event) {
        if (!confirm('Do you really want to leave?'))
            event.preventDefault()
    }
}

customElements.define('fancy-confirm-link', ConfirmLink, { extends: 'a' })
