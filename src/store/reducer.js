import  { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as detailReducer } from '../pages/detail/store'
import { reducer as loginReducer } from '../pages/login/store'

// 把很多小的 reducer 合并成一个大的reducer 提高代码的可维护性
// 把 state 也变成一个 immutable 对象 在操作时 使用 get set 方法
export default combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer
})