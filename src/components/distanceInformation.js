import { LitElement, css,html } from 'lit-element'
import anime from "animejs"

class DistanceInformation extends LitElement {
  static get properties() {
    return {
      content: { type: String }
    }
  }

  static get styles() {
    return css`
      .element {
        font-size: 36px;
        margin-top: 0;
        color: var(--secondary);
      }
    `
  }

  constructor() {
    super()
  }
  
  render() {
    return html`<h2 class="element">${this.content}</h2>`
  }

  firstUpdated() {
    super.firstUpdated()

    const element = this.shadowRoot.querySelector('.element')

    anime({
      targets: element,
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: 1200
    })
  }
}

customElements.define('distance-information', DistanceInformation)
