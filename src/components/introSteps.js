import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers'
import ConfettiGenerator from "confetti-js"
import { store } from "../redux"
import { PAGES } from "../pages"
import "./instructionLayer"
import "./searchingLayer"

class IntroSteps extends connect(store)(LitElement) {
  static get properties() {
    return {
      currentView: { type: String }
    }
  }

  stateChanged(state) {
    this.currentView = state.currentView
  }

  constructor() {
    super()
  }

  firstUpdated() {
    super.firstUpdated()
    const confetti = new ConfettiGenerator({ target: 'confettis', clock: 15 })
    confetti.render()
  }
  
  render() {
    return html`
      <div class="view">
        <div class="content">
         ${this.defineView()}
        </div>
      </div>
      <canvas id="confettis"></canvas>
    `
  }

  defineView() {
    switch(this.currentView) {
      case PAGES.INSTRUCTIONS:
        return html`<instruction-layer />`

      case PAGES.SEARCHING:
        return html`<searching-layer />`

      default:
        return html`<p>Whaaat</p>`
    }
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like 
     * encapsulated CSS and slots are unavailable.
     */
    return this
  }
}

customElements.define('intro-steps', IntroSteps)
