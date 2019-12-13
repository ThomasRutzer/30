import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store, actions } from "../redux"
import { PAGES, COORDS } from "../config"
import "./arScene"
import "./introSteps"

class App extends connect(store)(LitElement) {
  static get properties() {
    return {
      currentView: { type: String }
    }
  }

  stateChanged(state) {
    this.currentView = state.currentView
  }

  createRenderRoot() {
    return this
  }

  constructor() {
    super()

    store.dispatch(actions.updateCoordinates(
      COORDS.LAT,
      COORDS.LONG
    ))
  }
  
  render() {
    return html`${this.defineView()}`
  }

  defineView() {
    return this.currentView == PAGES.ARRIVED ? html`<ar-scene />` : html`<intro-steps />`
  }
}

customElements.define('app-start', App)
