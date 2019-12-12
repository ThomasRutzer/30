import { LitElement, html } from 'lit-element'

class ArScene extends LitElement {
  constructor() {
    super()
  }

  createRenderRoot() {
    return this
  }
  
  render() {
    return html`
      <a-scene inspector" 
        embedded  
        arjs="debugUIEnabled: false" 
        vr-mode-ui="enabled: false">
        <a-assets>
          <a-asset-item id="eiffel" material="color: #5d48a3;" src="assets/eiffel_tower.gltf">
        </a-assets>
        <a-marker type="pattern" url="assets/marker_30.patt">
          <a-gltf-model scale="0.005 0.005 0.005" src="#eiffel"></a-gltf-model>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      <note-component>Scan den Marker!</note-component>
    `
  }
}

customElements.define('ar-scene', ArScene)
