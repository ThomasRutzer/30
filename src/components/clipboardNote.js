import { LitElement, css,html } from 'lit-element'
import anime from "animejs"

class ClipboardNote extends LitElement {
  static get styles() {
    return css`
      .note {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 8px;
        background-color: var(--font);
        padding: 6px 12px 12px 12px;
        color: var(--white);
        min-width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  }

  constructor() {
    super()
  }
  
  render() {
    return html`<p class="note">Koordinaten in der Zwischenablage!</p>`
  }

  firstUpdated() {
    super.firstUpdated()

    const note = this.shadowRoot.querySelector('.note')

    anime({
      targets: note,
      translateY: [40,0],
      translateX: "-50%",
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    })
  }
}

customElements.define('clipboard-note', ClipboardNote)
