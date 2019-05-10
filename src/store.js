import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

export default createStore(
    (state = defaultState, action = {}) => {
        switch (action.type) {
            case SAVE_USERINFO:
                return {
                    ...state,
                    userInfo: action.userInfo
                }
            case SAVE_ATTRINFO:
                return {
                    ...state,
                    ...{
                        [action.datatype]: action.value
                    }
                }
            case MODIFY_USERINFO:
                return {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        [action.datatype]: action.value
                    }
                }
            default:
                return state;
        }
    },
    applyMiddleware(thunk)
)

// 保存用户数据
const SAVE_USERINFO = 'SAVE_USERINFO'

// 保存用户信息
const SAVE_ATTRINFO = 'SAVE_ATTRINFO'

// 修改用信息
const MODIFY_USERINFO = 'MODIFY_USERINFO'

let defaultState = {
    addressList: [], // 地址列表
    addressName: '', // 选中的地址
    temMessage: '', //临时姓名
    hasAddressList: [], // 已有的地址
    operate: 'edit',
    userInfo: {},
    geohash: []
}

// 保存用户消息
export const saveUserInfo = (userInfo) => {
    return {
        type: SAVE_USERINFO,
        userInfo
    }
}

// 修改用户信息
export const saveAttrInfo = (datatype, value) => {
    return {
        type: SAVE_ATTRINFO,
        datatype,
        value,
    }
}

// 修改用户信息
export const modifyUserInfo = (key, value) => {
    return {
        type: MODIFY_USERINFO,
        key,
        value
    }
}
