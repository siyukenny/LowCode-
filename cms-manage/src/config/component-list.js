/*
 * 页面可选组件列表
 */
const DEF_MAX_NUM = 50;
const componentlist = [
    {
        title: "基础组件",
        components: [
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
                name: "图片广告",
                iconClass: "cms-icon-ad",
                maxNumForAdd: DEF_MAX_NUM,
                data: {
                    component: "Carousel",
                    validTime: [],
                    layout: "swiper",
                    imageList: [
                        {
                            link: null,
                            imageUrl: "",
                            text: "导航1",
                        },
                    ],
                    imageMargin: 0,
                    isDefaultMargin: 0,
                    marginSize: [0, 0],
                    isBorderRadius: 0,
                    radius: 0,
                    backgroundColor: "",
                    piclist: [],
                    // imageRadius: 'square',
                    // imageStyle: 'normal',
                    // imageMargin: 0,
                    // pageMargin: 0
                },
            },
            {
                name: "图文导航",
                maxNumForAdd: DEF_MAX_NUM,
                iconClass: "cms-icon-nav",
                data: {
                    component: "ImageNav",
                    validTime: [],
                    layout: "pic",
                    text: "",
                    backgroundColor: "#FFFFFF",
                    textColor: "#323233",
                    columnPadding: 20,
                    rowPadding: 20,
                    lineNumber: 4,
                    borderRadius: 0,
                    imageList: [
                        {
                            link: null,
                            imageUrl: "",
                            text: "导航1",
                        },
                        {
                            link: null,
                            imageUrl: "",
                            text: "导航2",
                        },
                        {
                            link: null,
                            imageUrl: "",
                            text: "导航3",
                        },
                        {
                            link: null,
                            imageUrl: "",
                            text: "导航4",
                        },
                    ],
                },
            },

            {
                type: "AssistLine",
                iconClass: "cms-icon-line",
                maxNumForAdd: DEF_MAX_NUM,
                component: "AssistLine",
                name: "辅助线",
                data: {
                    component: "AssistLine",
                    validTime: [],
                    type: 1, // 1: 辅助线 ， 2： 空白
                    paddingVisible: false, // 是否显示边距
                    defBorderColor: "#666", // 默认线条颜色
                    borderColor: "#666", // 线条颜色
                    borderStyle: "solid", // 线条样式， 实线、虚线、点线
                    defBackgroundColor: "", // 默认背景颜色, 用来重置使用
                    backgroundColor: "",
                    height: 10,
                },
            },
            {
                name: "客服",
                iconClass: "cms-icon-online",
                maxNumForAdd: 1,
                data: {
                    component: "OnlineService",
                    validTime: [],
                    text: "客服", // 浮层标题名称
                    hideByPageScroll: true, // 是否在页面滚动时隐藏
                },
            },    {
              name: "视频",
              iconClass: "iconfont icon-shipin",
              maxNumForAdd: DEF_MAX_NUM,
              data: {
                  component: "Video",
                  validTime: [],
                  videoUrl: "",
                  isAutoPlay:0,
                  text: "视频", // 浮层标题名称
                  hideByPageScroll: false, // 是否在页面滚动时隐藏
              },
          },
        ],
    },
];

export default componentlist;
