import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store, actions } from "../redux"
import { PAGES } from "../pages"
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
    /**
     * Render template without shadow DOM. Note that shadow DOM features like 
     * encapsulated CSS and slots are unavailable.
     */
    return this
  }

  constructor() {
    super()

    const queryParams = new URL(window.location.href).searchParams
    store.dispatch(actions.updateCoordinates(
      queryParams.get("lat"),
      queryParams.get("long")
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
