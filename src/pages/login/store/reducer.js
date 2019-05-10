import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const defaultState = fromJS({
  login: false, // 用户是否登录
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN:
      return state.set('login', action.value)
    case actionTypes.LOGOUT:
      return state.set('login', action.value)
    default:
      return state
  }
}