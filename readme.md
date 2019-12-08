# WebAR exploration

An location based webAR exploration.

The user is provided with coordinates, which are passed as URL params `lat` and `long`, e.g.:

```
http://localhost:8080/?lat=40.7142700&long=-74.0059700
```

When the user arrives within the configurated threshold of this locaction, the WebGL scene is triggered.
Threshold can be defined in `config.js`

## Key technologies
- [A-Frame](https://aframe.io/)
- [AR.js](https://github.com/jeromeetienne/AR.js)
- [Polymer project](https://www.polymer-project.org/)


## Develop

```
npm i
npm run watch
```