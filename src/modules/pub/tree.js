/*eslint-disable */
// 获取选择的id数组
export function getIdArray(arr, id) {
  let idArr = []
  arr.map((item) => {
    let children = item.children || []
    if (item.id === Number(id)) {
      idArr.push(item.id)
    } else if (children && children.length) {
      idArr.push(item.id)
      let c = getIdArray(children, id)
      if (c && c.length) {
        c.map((item) => {
          idArr.push(item)
        })
      } else {
        idArr.pop()
      }
    }
  })
  return idArr;
}

// 插入子节点
export function insertChildren(arr = [], items = [], parentId) {
  let flag = false
  let newArr = arr.map((item) => {
    let children = item.children || []
    if (children.length && !flag) {
      item.children = insertChildren(item.children, items, parentId)
    } else if (item.id === parentId && !flag) {
      item.children = items
      flag = true
    }
    return item
  })
  return newArr
}

// 获取选中的标题
export function getTitleById(arr, id) {
  let result = {
    id: '',
    title: []
  }
  arr.map((item) => {
    let children = item.children || []
    if (item.id === id) {
      result.id = item.id
      result.title.push(item.title)
    } else if (children && children.length) {
      result.title.push(item.title)
      let c = getDepById(children, id)
      if (c.id) {
        result.id += c.id
        c.title.map((item) => {
          result.title.push(item)
        })
      } else {
        result.title.pop()
      }
    }
  })
  return result;
}

// 插入部门子节点
export function insertNode(arr = [], items = [], id = '') {
  let flag = false
  let newArr = arr.map((item) => {
    let children = item.children || []
    if (children.length && !flag) {
      item.children = insertNode(item.children, items, id)
    } else if (item.id === id && !flag) {
      item.children = items
      flag = true
    }
    return item
  })
  return newArr
}

// 获取部门信息
export function getDepById(arr, id) {
  let result = {
    id: '',
    title: []
  }
  arr.map((item) => {
    let children = item.children || []
    if (item.id === id) {
      result.id = item.id
      result.title.push(item.title)
    } else if (children && children.length) {
      result.title.push(item.title)
      let c = getDepById(children, id)
      if (c.id) {
        result.id += c.id
        c.title.map((item) => {
          result.title.push(item)
        })
      } else {
        result.title.pop()
      }
    }
  })
  return result;
}

// 获取部门信息
export function getCategoryById(arr, id) {
  let result = {
    id: '',
    name: []
  }
  arr.map((item) => {
    let children = item.children || []
    if (item.id === id) {
      result.id = item.id
      result.name.push(item.name)
    } else if (children && children.length) {
      result.name.push(item.name)
      let c = getCategoryById(children, id)
      if (c.id) {
        result.id += c.id
        c.name.map((item) => {
          result.name.push(item)
        })
      } else {
        result.name.pop()
      }
    }
  })
  return result;
}


// 获取选择部门所有信息
export function getAllNode(node = []) {
  let items = []
  node.map((item) => {
    if (item.node) {
      let subNode = item.node
      items.push({
        id: subNode.props.id,
        title: subNode.props.title
      })
    }
  })
  return items
}

// 根据选中id，返回完整树结构
export function getTreeData(arr,idArr){
  let newData = arr.filter(item => {
    delete item.children
    delete item.operTerm
    delete item.recommanded
    delete item.showArea
    delete item.title
    // delete item.areaName
    delete item.value
    delete item.promoPrice
    delete item.promoNum
    delete item.limitNum
    delete item.level
    delete item.price
    delete item.disabled
    item.selected = false
    if (item && idArr.includes(item.areaCode)) {
      item.selected = true
      delete item.subAreaList
      return true
    }else if(item&&item.subAreaList&&item.subAreaList.length>0){
      item.subAreaList = getTreeData(item.subAreaList,idArr)
      let check = item.subAreaList.filter(item => item.selected)
      if(check.length){
        return true
      }else{
        return false
      }
    }
    return false
  })
  return newData
}

/* eslint-enable */