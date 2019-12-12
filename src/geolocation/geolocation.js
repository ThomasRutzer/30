import getDistance from "./getDistance"

let watchID = null

class Geolocation {
  static intersect(lat, long, cb) {
    if (watchID) {
      this.clear()
    }

    watchID = navigator.geolocation.watchPosition((position) => {
      const distance = getDistance(lat, long, position.coords.latitude, position.coords.longitude)
      cb(distance)
    }, 
    err => console.log(err), 
    { enableHighAccuracy: true })
  }

  static clear() {
    navigator.geolocation.clearWatch(watchID)
  }
}

export default Geolocation