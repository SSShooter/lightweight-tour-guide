# web-tour-guide

## 立即试用

打开百度，把 `tourGuide.js` 复制到控制台（不要复制 export），然后复制下面代码调用函数。

```javascript
    let config = [{
      target:'#s_lg_img_new',
      guide:'this is logo'
    },{
      target:'#su',
      guide:'click and search!'
    }]
    guideInit(config)
```

## 已知问题

- 当目标接近屏幕大小时，无法正常显示引导框
- 窗口大小变化时没有做响应式修改
- modal 或标签等需要页面重新渲染操作的情况未适应，建议方法是传入一个渲染完成的 promise 放在渲染引导函数前面
