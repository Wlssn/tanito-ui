// class Counter {
//   constructor(element) {
//     // Remember a weak reference to the DOM element
//     this.ref = new WeakRef(element);
//     this.start();
//   }

//   start() {
//     if (this.timer) {
//       return;
//     }

//     this.count = 0;

//     const tick = () => {
//       // Get the element from the weak reference, if it still exists
//       const element = this.ref.deref();
//       if (element) {
//         element.textContent = ++this.count + 'xx';
//       } else {
//         // The element doesn't exist anymore
//         console.log("The element is gone.");
//         this.stop();
//         this.ref = null;
//       }
//     };

//     tick();
//     this.timer = setInterval(tick, 1000);
//   }

//   stop() {
//     if (this.timer) {
//       clearInterval(this.timer);
//       this.timer = 0;
//     }
//   }
// }

// const counter = new Counter(document.getElementById("counter"));
// counter.start();
// setTimeout(() => {
//   document.getElementById("counter").remove();
// }, 5000);
// const $$ = require("./wissn-js/lib/index.js")

// console.log($$.getDate())

/** 封装父节点直接调用方法创建子节点
 * @param {*} tagName 节点名
 * @param {*} config 节点属性配置  id: string | className: string | innerHtml: string | onclick: Function
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

let targetEl = document.getElementsByClassName('vuepress-markdown-body')[0]

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
console.log(title_list)
// -----------------------------------------------------
// -----------------------------------------------------
function outputHTML(data) {
  // let fragment = document.createDocumentFragment()
  let catalog_menu = document.body.createChild('div', {
    className: 'box'
  })
  
  let ul = catalog_menu.createChild('ul', {
    className: 'title_ul'
  })

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    ul.createChild('li', {
      className: 'lis',
      innerHTML: `<a href=${'#' + item.id}>${item.title}</a>`
    })
  }
}
outputHTML(title_list)
