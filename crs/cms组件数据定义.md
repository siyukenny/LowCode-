[TOC]
# 基础组件

## 图文广告(Carousel)
```js
/* 
 * component 组件类型标识
 * validTime 组件生效时间 
 * layout 组件布局方式  ===>  一行一个single 或 轮播广告swiper
 * imageList 图片列表
 * imageMargin: 0 图片边距
 * isDefaultMargin 管理系统是否展示
 * marginSize 边距值 上下，左右边距 仅isDefaultMargin为true时有效
 * isBorderRadius 是否圆角
 * radius 圆角大小
 * backgroundColor 背景颜色
*/ 
{
  component: 'Carousel',
  validTime: [],
  layout: 'swiper',
  imageList: [
    {
      link: null,
      imageUrl: '',
      text: '导航1'
    }
  ],
  imageMargin: 0,
  isDefaultMargin: 0,
  // [marginTopBottom,marginLeftRight]
  marginSize: [0, 0],
  isBorderRadius: 0,
  radius: 0,
  backgroundColor: '',
  piclist: []
}
```

## 图文导航(ImageNav)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间 
* layout 组件布局方式
* text 浮层标题名称
* backgroundColor 背景颜色
* textColor 字体颜色
* columnPadding 上下边距
* rowPadding 左右边距
* lineNumber 单行个数
* borderRadius 圆角大小
* imageList 图片列表
*/ 
{
  component: 'ImageNav',
  validTime: [],
  layout: 'pic',
  text: '',
  backgroundColor: '#FFFFFF',
  textColor: '#323233',
  columnPadding: 20,
  rowPadding: 20,
  bradius: 0,
  redirection: '', // 方向
  lineNumber: 4,
  borderRadius: 0,
  imageList: [
    {
      link: null,
      imageUrl: '',
      text: '导航1'
    },
    {
      link: null,
      imageUrl: '',
      text: '导航2'
    },
    {
      link: null,
      imageUrl: '',
      text: '导航3'
    },
    {
      link: null,
      imageUrl: '',
      text: '导航4'
    }
  ]  
}

```
## 公告(Notice)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间 
* imageUrl 公告图标
* noticelist 公告内容
* backgroundColor 背景色
* textColor 字体颜色
*/
{
  component: 'Notice',
  validTime: [],
  imageUrl: '',
  noticelist: [
    {
      link: {},
      text: '请填写公告内容'
    }
  ],
  backgroundColor: '#FFF8E9',
  textColor: '#666666'
}
```
## 魔方(CubeSelection)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间 
* template 模版样式
* imageList 图片列表
* pageMargin 内边距
*/ 
{
  component: 'CubeSelection',
  validTime: [],
  template: 'oneLine2',
  imageList: [],
  pageMargin: 0
}
```
## 文本(RichText)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间 
* backgroundColor 背景色
* content 富文本内容
*/ 
{
  component: 'RichText',
  validTime: [],
  backgroundColor: '',
  content: ''
}
```
## 辅助线(AssistLine)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间 
* type 显示类型
* paddingVisible 是否显示边距
* defBorderColor 默认线条颜色
* borderColor 线条颜色
* borderStyle 线条样式， 实线、虚线、点线
* defBackgroundColor 默认背景颜色, 用来重置使用
* backgroundColor 背景色
* height 高度
*/ 
{
  component: 'AssistLine',
  validTime: [],
  type: 1, // 1: 辅助线 ， 2： 空白
  paddingVisible: false, // 是否显示边距
  defBorderColor: '#666', // 默认线条颜色
  borderColor: '#666', // 线条颜色
  borderStyle: 'solid', // 线条样式， 实线、虚线、点线
  defBackgroundColor: '', // 默认背景颜色, 用来重置使用
  backgroundColor: '',
  height: 10
}
```
## 浮标(FloatLayer)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间
* imageUrl 浮标图片
* link 跳转链接
* hideByPageScroll 是否在页面滚动时隐藏
* width 图片宽度
*/
{
  component: 'FloatLayer',
  validTime: [],
  imageUrl: '',
  link: null,
  hideByPageScroll: true, // 是否在页面滚动时隐藏
  width: 100
}
```
## 客服(OnlineService)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间
* text 浮层标题名称
* hideByPageScroll 是否在页面滚动时隐藏
*/ 
{
  component: 'OnlineService',
  validTime: [],
  text: '客服', // 浮层标题名称
  hideByPageScroll: true // 是否在页面滚动时隐藏
}
```
## 横向滑动(Slider)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间
* isDefaultMargin 管理系统是否展示
* padding 上下左右间距
* imageMargin 图片的外边距
* backgroundColor 背景颜色
* imageList 图片列表
*/ 
{
  component: 'Slider',
  validTime: [],
  isDefaultMargin: true,
  padding: [15, 15],
  imageMargin: 15,
  backgroundColor: '#FFF',
  imageList: [
    {
      link: null,
      imageUrl: '',
      text: '图片1'
    },
    {
      link: null,
      imageUrl: '',
      text: '图片2'
    },
    {
      link: null,
      imageUrl: '',
      text: '图片3'
    }
  ]
}
```
## 弹窗(Dialog)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间
* timing once 一次,every 每次，day 每天一次
* imageList 图片列表
*/ 
{
  component: 'Dialog',
  validTime: [],
  timing: 'every', // once 一次,every 每次，day 每天一次
  imageList: [
    {
      text: '',
      imageUrl: '',
      link: null // 跳转的链接
    }
  ]
}
```
## 商品(product)
```js
/* 
* component 组件类型标识
* validTime 组件生效时间
*/ 
{
  component: 'product',
  validTime: [],
  // link: {}, // 跳转链接
  // imageList: [], // 图片列表
  // imageUrl: '', // 图片地址
  // radius: 0, // 圆角
  // text: '', // 文本内容
  // textColor: '', // 文本颜色
  // backgroundColor: '', // 背景颜色
  // layout: '', // 组件布局方式
  marginTop: 0, // 外上边距（其他参考这个）
  exchangePriceColor: '#F5514B', // 兑换价颜色
  // exchangeButtonColor: '#F5514B', // 兑换按钮颜色
  productList: [], // 商品列表
  // sortType: 'customsort', // 排序方式  自定义排序 customsort 系统排序 stylesort
  // priceSortType: 'order', // 兑换积分价顺序  按兑换积分价顺序排序 order 按兑换积分价倒序排序 reverse
  listStyle: 'oneLineOne', // 列表样式 一行一个 oneLineOne 一行两个 oneLineTwo 一大两小 oneBigTwoSmall 详细列表 listDetail
  markingPrice: 0, // 是否显示划线价
  purchase: 0 // 是否显示购买图标
  // styleType: 'styleType1', // 显示样式  样式1 styleType1 样式2 styleType2.... 以此类推
  // showProduceName: 1, // 显示商品名称
  // lineShowType: 'onelineshow', // 商品名称显示一行还是两行 显示一行 onelineshow 显示两行 twolineshow
  // cornerMarker: 1, // 商品角标
  // originalPrice: 0, // 是否显示原价
  // purchaseButton: 1, // 是否显示购买按钮
  // purchaseButtonType: 'buttontype1', // 按钮样式 按钮样式1 buttontype1 按钮样式2 buttontype2
  // newTag: 1, // 是否显示新商品标签
  // outOfStock: 'show', // 商品缺货显示  显示 show 沉底显示  showBottom  隐藏  hidden
  // beOverdue: 0 // 非兑换日期内商品隐藏
}
```
# 页面数据结构
```js
{
  id: '',
  name: '页面标题',
  shareDesc: '', // 微信分享文案
  shareImage: '', // 微信分享图片
  backgroundColor: '', // 页面背景颜色
  backgroundImage: '', // 页面背景图片
  backgroundPosition: 'top', // 页面背景位置
  cover: '',// 封面图
  componentList: [] // 组件列表
}
```