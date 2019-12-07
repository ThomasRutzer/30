import { LitElement, html, css } from "lit-element"
import { connect } from "pwa-helpers"
import { store } from "../redux"
import { actions } from "../redux"
import { PAGES } from "../pages"
import { ARRIVED_THRESHOLD } from "../config"
import Geolocation from "../geolocation/geolocation"
import "./clipboardNote"

class SearchingLayer extends connect(store)(LitElement) {
  static get properties() {
    return {
      lat: { type: Number },
      long: { type: Number },
      distanceWatching: { type: Boolean },
      currentDistance: { type: Number },
      inClipboard: { type: Boolean }
    }
  }

  stateChanged(state) {
    this.lat = state.coordinates.lat
    this.long = state.coordinates.long
    this.inClipboard = state.wroteToClipboard

    if (!this.distanceWatching) {
      this.distanceWatching = true
      Geolocation.intersect(this.lat, this.long, this.handlePositionChange.bind(this))
    }
  }

  constructor() {
    super()
  }
  
  render() {
    return html`${ this.currentDistance 
      ? html`<animated-title>Das Ziel ist noch ${this.currentDistance}m entfernt‚</animated-title>` 
      : null 
    }
      ${this.inClipboard ? html`<clipboard-note></clipboard-note>` : null}
    `
  }



  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like 
     * encapsulated CSS and slots are unavailable.
     */
    return this
  }
  
  handlePositionChange(newDistance) {
    if (newDistance <= ARRIVED_THRESHOLD) {
      Geolocation.clear()
      this.distanceWatching = false
      store.dispatch(actions.updateCurrentView(PAGES.ARRIVED))
    } else {
      this.currentDistance = newDistance
    }
  }
}

customElements.define("searching-layer", SearchingLayer)
