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
          <a-asset-item id="eiffel-obj" src="assets/eiffel_tower.obj"></a-asset-item>
          <a-asset-item id="eiffel-mtl" src="assets/eiffel_tower.mtl"></a-asset-item>      
        </a-assets>
        <a-marker type="pattern" url="assets/marker_30.patt">
          <a-entity 
          scale="0.02 0.02 0.02" 
          material="src: assets/eiffel_texture.png" 
          obj-model="obj: #eiffel-obj"></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      <note-component>Scan den Marker!</note-component>
    `
  }
}

customElements.define('ar-scene', ArScene)
