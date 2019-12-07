import getDistance from "./getDistance"

let watchID = null

class Geolocation {
  static async intersect(lat, long, cb) {
    watchID = navigator.geolocation.watchPosition((position) => {
      const distance = getDistance(lat, long, position.coords.latitude, position.coords.longitude)
      cb(distance)
    })
  }

  static clear() {
    navigator.geolocation.clearWatch(watchID)
  }
}

export default Geolocation