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

  constructor() {
    super()
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

  createRenderRoot() {
    return this
  }

  async handleClick() {
    store.dispatch(updateCurrentView(PAGES.SEARCHING))
    await navigator.clipboard.writeText(`${this.lat}, ${this.long}`)
    store.dispatch(setClipboard())
  }
  
  render() {
    return html`
      <animated-title>Gehe zur Position lat=${this.lat},&nbsp;long=${this.long}</animated-title>
      <button class="cta" @click="${this.handleClick}">Los gehts!</button>
    `
  }
}

customElements.define('instruction-layer', InstructionLayer)
