import { LitElement, html } from "lit-element"
import { connect } from "pwa-helpers"
import { store } from "../redux"
import "./distanceInformation"

class SearchingLayer extends connect(store)(LitElement) {
  static get properties() {
    return {
      distance: { type: Number }
    }
  }
  
  constructor() {
    super()
  }

  stateChanged(state) {
    this.distance = state.distance
  }
  
  render() {
    return html`${ this.distance 
      ? html`<animated-title content="Entfernung bis zum Ziel 🏁"></animated-title><distance-information content="${this.distance}"></distance-information>` 
      : html`<animated-title content="Das funktioniert nur mit aktivierter GPS-Verbindung 😏"></animated-title>` }
    `
  }

  createRenderRoot() {
    return this
  }
}

customElements.define("searching-layer", SearchingLayer)
