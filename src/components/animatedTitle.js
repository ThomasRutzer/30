import { LitElement, css,html } from 'lit-element'
import anime from "animejs"
import Splitting from 'splitting'

class AnimatedTitle extends LitElement {
  static get styles() {
    return css`
      h1 {
        font-size: 48px;
        margin-top: 0;
        color: var(--primary);
      }

      h1 .word {
        display: inline-block;
      }
    `
  }

  constructor() {
    super()
  }
  
  render() {
    return html`
      <h1>${this.textContent}</h1>
    `
  }

  firstUpdated() {
    super.firstUpdated()

    const textWrapper = this.shadowRoot.querySelector('h1')

    const splittedHeadline = Splitting({
      target: textWrapper,
      by: 'words'
    })

    anime({
      targets: splittedHeadline[0].words,
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    })
  }
}

customElements.define('animated-title', AnimatedTitle)
