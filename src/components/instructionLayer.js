import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store } from "../redux"
import { setClipboard, updateCurrentView } from "../redux/actionCreators"
import { PAGES } from "../pages"
import "./animatedTitle"
import anime from "animejs"

class InstructionLayer extends connect(store)(LitElement) {
  static get properties() {
    return {
      lat: { type: Number },
      long: { type: Number }
    }
  }

  stateChanged(state) {
    this.lat = state.coordinates.lat
    this.long = state.coordinates.long
  }

  firstUpdated() {
    super.firstUpdated()

    const cta = document.querySelector('.cta')

    anime({
      targets: cta,
      translateY: [40,0],
      translateX: ["50%", 0],
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 700,
      delay: 2000
    })
  }

  constructor() {
    super()
  }
  
  render() {
    return html`
      <animated-title>Gehe zur Position lat=${this.lat},&nbsp;long=${this.long}</animated-title>
      <button class="cta" @click="${this.handleClick}">Verstanden!</button>
    `
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like 
     * encapsulated CSS and slots are unavailable.
     */
    return this
  }

  async handleClick() {
    store.dispatch(updateCurrentView(PAGES.SEARCHING))
    await navigator.clipboard.writeText(`${this.lat}, ${this.long}`)
    store.dispatch(setClipboard())
  }
}

customElements.define('instruction-layer', InstructionLayer)
