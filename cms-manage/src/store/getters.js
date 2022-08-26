const getters = {
  pageComponentTotalMap: (state) => {
    let map = {}
    let cList = state.pageData.componentList || []
    let cName
    cList.forEach((c) => {
      cName = c.data.component
      if (map[cName]) {
        map[cName] += 1
      } else {
        map[cName] = 1
      }
    })
    return map
  }
}

export default Object.assign({}, getters)
