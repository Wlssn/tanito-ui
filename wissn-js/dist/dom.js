/**
 * 封装父节点直接调用方法创建子节点
 * @param {*} tagName 节点名
 * @param {*} config 节点属性配置  id: string | className: string | innerHtml: string | onclick: Function
 */
function createChild(tagName, config) {
  // 创建子元素节点
  let node = document.createElement(tagName)
  // 将配置属性与子元素属性合并
  Object.assign(node, config)
  // 将子节点添加到调用该方法的父节点中
  this.appendChild(node)
  // 返回该元素 以供调用创建子节点
  return node
}
