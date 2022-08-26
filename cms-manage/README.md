# cms-manage 项目结构
cms-manage
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ README.md
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  └─ svg2font
├─ src
│  ├─ App.vue
│  ├─ api
│  │  ├─ activity
│  │  │  └─ index.js
│  │  ├─ axios.js
│  │  ├─ index.js
│  │  └─ link
│  │     └─ index.js
│  ├─ assets
│  │  ├─ default-avatar.png
│  │  ├─ images
│  │  │  ├─ 401
│  │  │  │  ├─ 401.png
│  │  │  │  └─ 401_cloud.png
│  │  │  ├─ 404
│  │  │  │  ├─ 404.png
│  │  │  │  └─ 404_cloud.png
│  │  │  ├─ JV_login
│  │  │  │  └─ bg_login.jpg
│  │  │  └─ SAAS_login
│  │  │     └─ bg_login.jpg
│  │  ├─ img
│  │  │  ├─ layout
│  │  │  │  ├─ header_bg.png
│  │  │  │  ├─ logo.png
│  │  │  │  ├─ set-type-component.png
│  │  │  │  └─ set-type-page.png
│  │  │  └─ list_ico
│  │  │     ├─ assist_blank.png
│  │  │     ├─ magic_layout.png
│  │  │     ├─ navigation.png
│  │  │     ├─ notice.png
│  │  │     ├─ page_title.png
│  │  │     ├─ pin-tuan.png
│  │  │     ├─ product_list.png
│  │  │     ├─ product_search.png
│  │  │     ├─ spike.png
│  │  │     ├─ swiper.png
│  │  │     └─ time_limit_sale.png
│  │  └─ logo.png
│  ├─ components
│  │  ├─ AppMain
│  │  │  └─ index.vue
│  │  ├─ BasicConfig
│  │  │  ├─ ConfigLink
│  │  │  │  ├─ component
│  │  │  │  │  ├─ ComTable.vue
│  │  │  │  │  ├─ InnerUrl.vue
│  │  │  │  │  ├─ JsonForm.vue
│  │  │  │  │  ├─ OrderTable.vue
│  │  │  │  │  ├─ OuterUrl.vue
│  │  │  │  │  ├─ ProjectSelect.vue
│  │  │  │  │  └─ mixins.js
│  │  │  │  ├─ index.vue
│  │  │  │  └─ tabConfig.js
│  │  │  ├─ PicList.vue
│  │  │  └─ UpLoadImg.vue
│  │  ├─ BasicDialog
│  │  │  ├─ DialogCustomLink.vue
│  │  │  ├─ DialogProduct.vue
│  │  │  └─ DialogProductCategory.vue
│  │  ├─ BasicUi
│  │  │  ├─ ButtonAdd.vue
│  │  │  ├─ ComDivider.vue
│  │  │  ├─ ComGroup.vue
│  │  │  ├─ ComRadioGroup.vue
│  │  │  ├─ ComTitle.vue
│  │  │  ├─ ComValidTime.vue
│  │  │  ├─ LinkTag.vue
│  │  │  └─ UpLoadBox.vue
│  │  ├─ Breadcrumb
│  │  │  └─ index.vue
│  │  ├─ ComponentsConfig
│  │  │  ├─ AssistLine
│  │  │  │  └─ index.vue
│  │  │  ├─ Carousel
│  │  │  │  └─ index.vue
│  │  │  ├─ CubeSelection
│  │  │  │  └─ index.vue
│  │  │  ├─ Dialog
│  │  │  │  └─ index.vue
│  │  │  ├─ FloatLayer
│  │  │  │  └─ index.vue
│  │  │  ├─ ImageNav
│  │  │  │  └─ index.vue
│  │  │  ├─ Notice
│  │  │  │  └─ index.vue
│  │  │  ├─ OnlineService
│  │  │  │  └─ index.vue
│  │  │  ├─ Product
│  │  │  │  └─ index.vue
│  │  │  ├─ RichText
│  │  │  │  └─ index.vue
│  │  │  └─ Slider
│  │  │     └─ index.vue
│  │  ├─ EditPassword
│  │  │  └─ index.vue
│  │  ├─ Hamburger
│  │  │  └─ index.vue
│  │  ├─ Home
│  │  │  └─ index.vue
│  │  ├─ Login
│  │  │  ├─ Edit.vue
│  │  │  └─ index.vue
│  │  ├─ Navbar
│  │  │  └─ index.vue
│  │  ├─ Sidebar
│  │  │  ├─ FixiOSBug.js
│  │  │  ├─ Item.vue
│  │  │  ├─ Link.vue
│  │  │  ├─ Logo.vue
│  │  │  ├─ SidebarItem.vue
│  │  │  └─ index.vue
│  │  └─ index.js
│  ├─ config
│  │  ├─ activity.js
│  │  ├─ com-radio-group.js
│  │  ├─ component-list.js
│  │  ├─ coupon.js
│  │  └─ index.js
│  ├─ layout
│  │  ├─ index.vue
│  │  └─ router-view.vue
│  ├─ main.js
│  ├─ mixins
│  │  ├─ ResizeHandler.js
│  │  ├─ tableFlexHeight.js
│  │  └─ user.js
│  ├─ pages
│  │  ├─ activity
│  │  │  └─ index.vue
│  │  ├─ decorate
│  │  │  ├─ components
│  │  │  │  ├─ PageHead.vue
│  │  │  │  ├─ PageLeft.vue
│  │  │  │  ├─ PageRight.vue
│  │  │  │  ├─ PageView.vue
│  │  │  │  └─ components
│  │  │  │     ├─ ChangeSetType
│  │  │  │     │  └─ index.vue
│  │  │  │     ├─ NoSelect
│  │  │  │     │  ├─ index.vue
│  │  │  │     │  └─ no_select.png
│  │  │  │     └─ SetPageInfo
│  │  │  │        └─ index.vue
│  │  │  └─ index.vue
│  │  ├─ error-page
│  │  │  ├─ 401.vue
│  │  │  └─ 404.vue
│  │  ├─ home
│  │  │  └─ index.vue
│  │  └─ preview
│  │     └─ index.vue
│  ├─ router
│  │  ├─ index.js
│  │  └─ routerExtend.js
│  ├─ store
│  │  ├─ getters.js
│  │  ├─ index.js
│  │  └─ modules
│  │     └─ index.js
│  ├─ styles
│  │  ├─ _reset.less
│  │  ├─ _theme.less
│  │  ├─ app.less
│  │  ├─ icon.less
│  │  ├─ index.less
│  │  ├─ mixin.less
│  │  └─ transfrom.less
│  └─ utils
│     ├─ index.js
│     └─ request.js
└─ vue.config.js

```