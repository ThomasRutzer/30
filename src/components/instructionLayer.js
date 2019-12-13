import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers'
import { actions, store } from "../redux"
import { setClipboard, updateCurrentView, setCurrentDistance } from "../redux/actionCreators"
import { PAGES } from "../config"
import { ARRIVED_THRESHOLD } from "../config"
import "./animatedTitle"
import anime from "animejs"
import { Geolocation } from "../geolocation"

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

  createRenderRoot() {
    return this
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
      translateX: [40,0],
      translateY: [40,0],
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 700,
      delay: 2000
    })
  }

  async handleClick() {
    Geolocation.intersect(this.lat, this.long, this.handlePositionChange.bind(this))
    store.dispatch(updateCurrentView(PAGES.SEARCHING))
    await navigator.clipboard.writeText(`${this.lat}, ${this.long}`)
    store.dispatch(setClipboard())
  }

  handlePositionChange(distance) {
    store.dispatch(setCurrentDistance(distance))

    if (distance <= ARRIVED_THRESHOLD) {
      Geolocation.clear()
      store.dispatch(actions.updateCurrentView(PAGES.ARRIVED))
    }
  }
  
  render() {
    return html`
      <animated-title content="Gehe zur Position lat=${this.lat},&nbsp;long=${this.long} 🔎🗺️"></animated-title>
      <button class="cta" @click="${this.handleClick}">Los gehts!</button>
    `
  }
}

customElements.define('instruction-layer', InstructionLayer)
