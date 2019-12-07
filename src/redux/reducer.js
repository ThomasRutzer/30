import * as actionTypes from "./actionTypes"
import { PAGES} from "./../pages"

const initState = {
  arrived: false,
  started: false,
  currentView: PAGES.INSTRUCTIONS,
  coordinates: {},
  wroteToClipboard: false
}

const reducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_ARRIVED:
      return state.arrived = action.isArrived

    case actionTypes.SET_STARTED:
      return state.started = true

    case actionTypes.SET_COORDINATES:
      return state = {
        ...state,
        coordinates: {
          lat: action.lat,
          long: action.long 
        }
      }

    case actionTypes.SET_CURRENT_VIEW:
      return state = {
        ...state,
        currentView: action.view
      }

    case actionTypes.SET_CLIPBOARD:
      return {
        ...state,
        wroteToClipboard: true
      }

    default:
      return state
  }
}

export default reducer
