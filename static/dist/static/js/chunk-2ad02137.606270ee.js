(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ad02137"],{"01da":function(t,e,a){},"19f9":function(t,e,a){"use strict";a("9e64")},"1cb9":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-drawer",{attrs:{title:"微信小程序-界面示例",visible:t.drawer},on:{"update:visible":function(e){t.drawer=e}}},[a("el-image",{attrs:{src:t.picUrl,fit:"contain","preview-src-list":new Array(t.picUrl)}})],1),a("div",{staticClass:"btn-wrapper"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-right",circle:""},on:{click:t.change}})],1)],1)},r=[],o={name:"PageExample",data:function(){return{picUrl:"https://mbsdoor.com:5000/static/image/wx/page-example.png",drawer:!1}},methods:{change:function(){this.drawer=!this.drawer}}},i=o,l=(a("ba40"),a("2877")),s=Object(l["a"])(i,n,r,!1,null,"2854a8e6",null);e["a"]=s.exports},3100:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("page-example"),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.currentPage},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.handleChange}}),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableData.filter((function(e){return!t.search||e.title.toLowerCase().includes(t.search.toLowerCase())}))}},[a("el-table-column",{attrs:{label:"商品ID",prop:"shopID"}}),a("el-table-column",{attrs:{label:"名称",prop:"title"}}),a("el-table-column",{attrs:{label:"描述",prop:"des"}}),a("el-table-column",{attrs:{label:"品类",prop:"categoryname",width:"100px"}}),a("el-table-column",{attrs:{label:"标签",prop:"tagname"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",t._l(e.row.tagname,(function(e,n){return a("el-tag",{key:n,staticClass:"mgr-5"},[t._v(t._s(e))])})),1)]}}])}),a("el-table-column",{attrs:{label:"封面图片",prop:"coverPicUrl",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("div",[a("el-image",{staticClass:"img",attrs:{src:t.row.coverPicUrl,"preview-src-list":new Array(t.row.coverPicUrl),fit:"contain"}})],1)]}}])}),a("el-table-column",{attrs:{align:"right",width:"210px"},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-input",{staticClass:"search",attrs:{size:"mini",placeholder:"输入关键字搜索"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("el-button",{staticClass:"mgl-10",attrs:{size:"mini",type:"success"},on:{click:t.goAddShopPage}},[t._v("添加")])]}},{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.goUpdatePage(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.goDeleteDialog(e.row)}}},[t._v("删除")])]}}])})],1),a("el-dialog",{attrs:{title:"删除提示",visible:t.dialogVisble,width:"30%",center:""},on:{"update:visible":function(e){t.dialogVisble=e}}},[a("div",[t._v("确认要删除此条商品？")]),a("div",{staticClass:"mgl-10 mgt-10"},[t._v("shopID: "+t._s(this.deleteData.shopID))]),a("div",{staticClass:"mgl-10 mgt-10"},[t._v("商品名称: "+t._s(this.deleteData.title))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisble=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.hanldeDelete()}}},[t._v("确 定")])],1)])],1)},r=[],o=a("1da1"),i=a("5530"),l=(a("96cf"),a("99af"),a("1cb9")),s=a("e692"),c=a("b775");function u(){return Object(c["a"])({url:"/vue-admin-template/shop/count",method:"get"})}var d={name:"ShopPage",components:{PageExample:l["a"]},data:function(){return{tableData:[{shopID:"shop_100001",title:"DR-A001祥云瑞气",categoryname:"中式臻品",categoryID:10001,des:"中式臻品系列是设计师在追根溯源中逐渐恢复东方文化的自信",isFull:!1,coverPicUrl:"https://mbsdoor.com:5000/static/image/shop/shop-100001-2.jpg",tagname:["上新","热销"],tagID:[1,2]}],search:"",tableLoading:!0,dialogVisble:!1,deleteData:{shopID:""},total:86,currentPage:1}},methods:{refreshTableData:function(t){var e=this;this.tableLoading=!0,Object(s["d"])(t).then((function(t){e.tableData=t.data,e.tableLoading=!1})),u().then((function(t){return e.total=t.data[0].total}))},goDeleteDialog:function(t){this.dialogVisble=!0,this.deleteData=Object(i["a"])({},t)},hanldeDelete:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["c"])(t.deleteData.shopID);case 2:t.$notify({title:"成功",message:"shopID：".concat(t.deleteData.shopID," title:").concat(t.deleteData.title," 删除成功。"),type:"success"}),t.dialogVisble=!1,t.deleteData={},t.refreshTableData();case 6:case"end":return e.stop()}}),e)})))()},goAddShopPage:function(){this.$router.push("/shop/addshop")},goUpdatePage:function(t){this.$router.push({path:"/shop/updateshop",query:{shopID:t.shopID}})},handleChange:function(t){this.refreshTableData({currentPage:t})}},mounted:function(){this.refreshTableData()}},p=d,h=(a("19f9"),a("2877")),g=Object(h["a"])(p,n,r,!1,null,"1426eb38",null);e["default"]=g.exports},"9e64":function(t,e,a){},ba40:function(t,e,a){"use strict";a("01da")},e692:function(t,e,a){"use strict";a.d(e,"d",(function(){return r})),a.d(e,"a",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"e",(function(){return l})),a.d(e,"f",(function(){return s})),a.d(e,"b",(function(){return c}));var n=a("b775");function r(t){return Object(n["a"])({url:"/vue-admin-template/shop/page",method:"get",params:t})}function o(t){return Object(n["a"])({url:"/vue-admin-template/shop/page",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/vue-admin-template/shop/page",method:"delete",params:{shopID:t}})}function l(t){return Object(n["a"])({url:"/vue-admin-template/shop/page",method:"put",data:t})}function s(t){return Object(n["a"])({url:"/vue-admin-template/shop/noimage",method:"put",data:t})}function c(t){return Object(n["a"])({url:"/vue-admin-template/shop/galary",method:"delete",params:{servePath:t}})}}}]);