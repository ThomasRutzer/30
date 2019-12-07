import { LitElement, html } from 'lit-element'

class ArScene extends LitElement {
  constructor() {
    super()
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like 
     * encapsulated CSS and slots are unavailable.
     */
    return this
  }

  
  render() {
    return html`
      <a-scene inspector" embedded  vr-mode-ui="enabled: false">
        <a-assets>
          <a-asset-item id="eiffel" src="assets/eiffel_tower.gltf">
        </a-assets>
        <a-marker preset="hiro">
          <a-gltf-model scale="0.005 0.005 0.005" src="#eiffel"></a-gltf-model>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    `
  }
}

customElements.define('ar-scene', ArScene)
