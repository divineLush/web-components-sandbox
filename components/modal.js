class Modal extends HTMLElement {
    constructor () {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <style>
                .backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 1s;
                }

                .modal {
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: #e3f5e3;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 1s;
                }

                :host([opened]) .backdrop,
                :host([opened]) .modal {
                    opacity: 1;
                    pointer-events: all;
                }

                .header {
                    padding: 1rem;
                }

                ::slotted(h1) {
                    font-size: 1.25rem;
                }

                .main {
                    padding: 1rem;
                }

                .actions {
                    border-top: 1px solid #0f400f;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                .actions__button {
                    margin: 0 0.25rem;
                }
            </style>
            <div class="backdrop"></div>
            <div class="modal">
                <header class="header">
                    <slot name="header"></slot>
                </header>
                <section class="main">
                    <slot></slot>
                </section>
                <section class="actions">
                    <button class="actions__button actions__button--cancel">Cancel</button>
                    <button class="actions__button actions__button--confirm">Okay</button>
                </section>
            </div>
        `

        const slots = this.shadowRoot.querySelectorAll('slot')
        slots[1].addEventListener('slotchange', event => console.dir(slots[1].assignedNodes()))
    }

    connectedCallback () {
        const actionButtons = this.shadowRoot.querySelectorAll('.actions__button')
        actionButtons.forEach(btn => btn.addEventListener('click', this.close.bind(this)))

        const cancelButton = this.shadowRoot.querySelector('.actions__button--cancel')
        cancelButton.addEventListener('click', event => {
            // triggering event inside shadow DOM
            const cancelEvent = new Event('cancel', {
                bubbles: true, // allow event hoisting
                composed: true // allow event to leave shadow DOM
            })
            event.target.dispatchEvent(cancelEvent)
        })

        const confirmButton = this.shadowRoot.querySelector('.actions__button--confirm')
        confirmButton.addEventListener('click', event => {
            // triggering event on out element itself
            const confirmEvent = new Event('confirm')
            this.dispatchEvent(confirmEvent)
        })
    }

    open () {
        this.setAttribute('opened', '')
    }

    close () {
        this.removeAttribute('opened')
    }
}

customElements.define('fancy-modal', Modal)
