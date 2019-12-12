import * as actionTypes from "./actionTypes"

export function updateCoordinates(lat, long) {
  return {
    type: actionTypes.SET_COORDINATES,
    lat,
    long
  }
}

export function updateArrived(isArrived) {
  return {
    type: actionTypes.SET_ARRIVED,
    isArrived
  }
}

export function updateCurrentView(view) {
  return {
    type: actionTypes.SET_CURRENT_VIEW,
    view
  }
}

export function setClipboard() {
  return {
    type: actionTypes.SET_CLIPBOARD
  }
}

export function setCurrentDistance(distance) {
  return {
    type: actionTypes.SET_CURRENT_DISTANCE,
    distance
  }
}