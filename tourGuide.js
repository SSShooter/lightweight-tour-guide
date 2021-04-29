/**
 * usage:
 * guideInit([{target:'#t1',guide:'t1 guide...'},{target:'#t2',guide:'t2 guide...'}])
 */

let PREV = '上一步'
let NEXT = '下一步'
let COMPLETE = '完成'
let guideList = []
let maskLength = 0
let maskContainer = document.createElement('div')
document.body.appendChild(maskContainer)
let createButton = (content) => {
  let button = document.createElement('button')
  button.innerHTML = content
  button.style = 'background:none;border:none;color:#409EFF;cursor:pointer;'
  return button
}
let genGuide = (target, guide, i) => {
  let targetEl = document.querySelector(target)
  if (!targetEl) {
    throw new Error('missing target')
  }
  targetEl.scrollIntoViewIfNeeded()
  let wrapper = document.createElement('div')
  maskContainer.innerHTML = ''
  maskContainer.appendChild(wrapper)
  let rect = targetEl.getBoundingClientRect()
  let HLHeight = rect.height
  let HLWidth = rect.width
  let HLTop = rect.top
  let HLLeft = rect.left
  let HLBottom = rect.bottom

  let bodyHeight = document.body.clientHeight
  let bodyWidth = document.body.clientWidth
  let template = `
	<defs>
		<mask id="highlight">
			<rect x="0" y="0" width="${bodyWidth}" height="${bodyHeight}" fill="white"></rect>
			<rect  rx="5" ry="5"  x="${HLLeft}" y="${HLTop}" width="${HLWidth}" height="${HLHeight}" fill="black"></rect>
		</mask>
	</defs>
	<rect x="0" y="0" width="${bodyWidth}" height="${bodyHeight}" fill="rgba(0,0,0,0.5)" mask="url(#highlight)"></rect>`
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', bodyWidth)
  svg.setAttribute('height', bodyHeight)
  svg.innerHTML = template
  svg.style = 'position: absolute;top: 0;left: 0;z-index:99999;'
  wrapper.appendChild(svg)

  let tips = document.createElement('div')
  tips.innerHTML = `<div style="text-align:center;padding-bottom:8px;">${guide}</div>`
  wrapper.appendChild(tips)
  if (i !== 0) {
    let prev = createButton(PREV)
    prev.onclick = (e) => {
      guideList[i - 1]()
    }
    tips.appendChild(prev)
  }
  if (i < maskLength - 1) {
    let next = createButton(NEXT)
    next.onclick = (e) => {
      guideList[i + 1]()
    }
    tips.appendChild(next)
  }
  if (i === maskLength - 1) {
    let complete = createButton(COMPLETE)
    complete.onclick = (e) => {
      guideList = []
      maskContainer.remove()
    }
    tips.appendChild(complete)
  }
  tips.style = `background-color:#fff;
  padding:8px;
  border-radius:5px;
  position: absolute;
  z-index:100000;
  max-width:300px;`

  if (tips.clientHeight + HLBottom > bodyHeight) {
    tips.style.bottom = bodyHeight - HLTop + 16 + 'px'
  } else tips.style.top = HLBottom + 16 + 'px'

  let left = HLLeft + (HLWidth - tips.clientWidth) / 2
  if (left < 16) tips.style.left = '16px'
  else if (HLLeft + tips.clientWidth > bodyWidth) tips.style.right = '16px'
  else tips.style.left = HLLeft + (HLWidth - tips.clientWidth) / 2 + 'px'
}
let guideInit = function (config) {
  maskLength = config.length
  guideList = config.map((item, i) => {
    return genGuide.bind(null, item.target, item.guide, i)
  })
  guideList[0]()
}
export default guideInit
