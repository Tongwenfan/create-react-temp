/**
 * 存储localStorage
 * @param name
 * @param content
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string')
        content = JSON.stringify(content)
    window.localStorage.setItem(name, content)
}

export const getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return
    window.localStorage.removeItem(name)
}

export const getUrlConcat = function (data) {
    let dataStr = ''
    let url = ''
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
    }
    return url
}

export const getImgPath = (path) => {
    if (!path)
        return '//elm.cangdu.org/img/default.jpg'

    let suffix =
        path.indexOf('jpeg') !== -1 ? '.jpeg' : '.png';

    let url =
        '/' + path.substr(0, 1)
        + '/' + path.substr(1, 2)
        + '/' + path.substr(3) + suffix

    return 'https://fuss10.elemecdn.com' + url
}
