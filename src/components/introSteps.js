import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers'
import ConfettiGenerator from "confetti-js"
import { store } from "../redux"
import { PAGES } from "../pages"
import getCSSCustomProp from "./../utils/getCSSCustomProperties"
import hexToRGB from "./../utils/hexToRGB"
import "./instructionLayer"
import "./searchingLayer"
import "./noteComponent"

class IntroSteps extends connect(store)(LitElement) {
  static get properties() {
    return {
      currentView: { type: String },
      confetti: { type: Object },
      inClipboard: { type: Boolean }
    }
  }

  constructor() {
    super()
  }

  stateChanged(state) {
    this.currentView = state.currentView
    this.inClipboard = state.wroteToClipboard
  }

  firstUpdated() {
    super.firstUpdated()

    const primaryColor = getCSSCustomProp("--primary", document.body)
    const secondaryColor = getCSSCustomProp("--secondary", document.body)
    const infoColor = getCSSCustomProp("--info", document.body)

    this.confetti = new ConfettiGenerator({ 
      target: 'confettis', 
      clock: 15, 
      colors: [hexToRGB(primaryColor), hexToRGB(secondaryColor), hexToRGB(infoColor)]
    })
    this.confetti.render()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.confetti.clear()
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
    return this
  }
  
  render() {
    return html`
      <div class="view">
        <div class="content">
         ${this.defineView()}
        </div>
      </div>
      <canvas id="confettis"></canvas>
      ${ this.inClipboard ? html`<note-component>Koordinaten in der Zwischenablage!</note-component>` : null}
    `
  }
}

customElements.define('intro-steps', IntroSteps)
