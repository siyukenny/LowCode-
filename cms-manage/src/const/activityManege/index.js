
export const tableOption = {
    columnBtn:false,
    refreshBtn:false,
    editBtn:false,
    border:true,
    searchShowBtn:false,
    menuWidth:280,
    stripe:true,
    searchSpan:6,
    addBtn:false,
    align:'center',
    searchMenuSpan:12,
    column:[
        {
            label:'页面ID',
            prop:'id',
            // dataType:'number'
        },
        {
            label:'页面标题',
            searchLabelWidth:110,
            searchSpan:6,
            prop:'name',
            // dataType:'string',
            search:true,
            searchRules: [{
                required: true,
                message: "请输入页面标题",
                trigger: "blur"
              }]
        },
        {
            label:'页面状态码',
            prop:'isAbled',
            hide:true,
        },
        {
            label:'页面状态',
            searchLabelWidth:110,
            searchSpan:6,
            prop:'status',
            type:"select",
            search:true,
            dicData:[
                {
                    label:"已上线",
                    value:1
                },
                {
                    label:"未上线",
                    value:0
                }
            ]
        },
        {
            label:'创建时间',
            prop:'create_time'
        },
        {
            label:'更新时间',
            prop:'update_time'
        },
    ]
}