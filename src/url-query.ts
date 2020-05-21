interface IString {
  [propName: string]: string
}

const urlQuery = {
  get() {
    const tempObj: IString = {}
    const search = window.location.search
    if (search.length > 1) {
      const searchArr = window.location.search.substr(1).split('&')
      for (const item of searchArr) {
        const itemArr = item.split('=')
        tempObj[decodeURIComponent(itemArr[0])] =
          itemArr.length > 1
            ? decodeURIComponent(itemArr.slice(1).join('='))
            : ''
      }
    }
    return tempObj
  },
  set(obj: Object) {
    const query = Object.assign(this.get(), obj)
    const { origin, pathname } = window.location
    let queryString = ''
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryString += `${key}=${encodeURIComponent(query[key])}&`
      }
    }
    const href = `${origin}${pathname}?${queryString.slice(0, -1)}`
    window.history.replaceState(obj, '', href)
  }
}

export default urlQuery
