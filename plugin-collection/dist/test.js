/** 封装父节点直接调用方法创建子节点
 * @param {String} tagName 节点名
 * @param {Object} config 节点属性配置  id: string | className: string | innerHtml: string | onclick: Function
 * @returns {HTMLElement} HTMLElement
 */
HTMLElement.prototype.createChild = function (tagName, config) {
  // 创建子元素节点
  let node = document.createElement(tagName)
  // 将配置属性与子元素属性合并
  Object.assign(node, config)
  // 将子节点添加到调用该方法的父节点中
  this.appendChild(node)
  // 返回该元素 以供调用创建子节点
  return node
}

// 获取文章所在div容器
let targetEl = document.getElementsByClassName('vuepress-markdown-body')[0]
// 建立标题级别映射
let header_level = ['H1', 'H2', 'H3', 'H4', 'H5']
let title_list = []
targetEl.childNodes.forEach((item, index) => {
  if (header_level.includes(item.nodeName)) {
    const id = "header-" + index
    item.setAttribute("id", id)
    title_list.push({
      id: id,
      title: item.innerHTML,
      level: +(item.nodeName.substring(1, 2)),
      nodeName: item.nodeName
    })
  }
})
// 定义选中标题的索引
var selectedIndex = ''
// -----------------------------------------------------
// -----------------------------------------------------
function outputHTML(node_info_array) {
  // 创建 div
  let catalog_menu = document.body.createChild('div', {
    style: `
      width: 240px;
      height: 60%;
      position: fixed;
      right: 40px;
      top: 20%;
      background-color: rgb(245,245,245);
    `
  })
  // 创建文本节点 '目录'
  catalog_menu.createChild('span', {
    innerText: '目录',
    style: `
      font-weight: bold;
      font-family: serif, Source Han Sans CN, cursive;
      font-size: 26px;
      display: block;
      padding: 10px 10px;
      text-align: center;
    `
  })
  // 创建 ui
  let ul = catalog_menu.createChild('ul', {
    id: 'ul',
    style: `
      list-style: none;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    `
  })
  // 向 ul 中添加 li
  for (let i = 0; i < node_info_array.length; i++) {
    const item = node_info_array[i]
    // 根据标题级别的不同 动态改变 fontSize 和 paddingLeft
    let fontSize = 23 - ((item.level - 1) * 3)
    let paddingLeft = 8 + ((item.level - 1) * 20)

    ul.createChild('li', {
      id: item.id,
      className: item.nodeName,
      innerHTML: `<a href=${'#' + item.id}>${item.title}</a>`,
      onclick: function (e) {
        // selectedIndex = this.id
        let li_list = document.getElementById('ul').childNodes
        for (let i = 0; i < li_list.length; i++) {
          const element = li_list[i]
          if (element.id === this.id) {
            element.style.backgroundColor = 'grey'
          } else {
            // 清除样式
            element.style.backgroundColor = ''
          }
        }
      },
      style: `
        height: 40px;
        font-size: ${fontSize}px;
        padding-left: ${paddingLeft}px;
        line-height: 40px;
      `,
    })
  }

  // 修改li中 a 标签的默认样式
  let aTagList = document.getElementsByTagName('a')
  for (let i = 0; i < aTagList.length; i++) {
    const aTag = aTagList[i]
    aTag.style = `
      text-decoration: none;
      color: black;
      cursor: default;
      display: block;
      font-size: inherit;
      font-family: serif, Source Han Sans CN, cursive;
    `
  }

  // 设置悬浮 li 伪类
  let style = document.createElement('style')
  document.head.appendChild(style)
  sheet = style.sheet
  sheet.addRule('li:hover','background-color: grey; color: #6cf;')
}
outputHTML(title_list)
