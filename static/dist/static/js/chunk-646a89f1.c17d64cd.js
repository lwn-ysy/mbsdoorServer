(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-646a89f1"],{"01da":function(t,e,a){},"0409":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("page-example"),a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableData.filter((function(e){return!t.search||e.tagname.toLowerCase().includes(t.search.toLowerCase())}))}},[a("el-table-column",{attrs:{label:"ID",prop:"tagID"}}),a("el-table-column",{attrs:{label:"标签名字",prop:"tagname"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"success"}},[t._v(t._s(e.row.tagname))])]}}])}),a("el-table-column",{attrs:{align:"right","min-width":"250px"},scopedSlots:t._u([{key:"header",fn:function(e){return[a("el-input",{staticClass:"search",attrs:{size:"mini",placeholder:"输入关键字搜索"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("el-button",{staticClass:"mgl-10",attrs:{size:"mini",type:"success"},on:{click:function(e){return t.goEditDialog()}}},[t._v("添加")])]}},{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.goEditDialog(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.goDeleteDialog(e.row)}}},[t._v("删除")])]}}])})],1),a("el-dialog",{attrs:{title:t.formLableTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{attrs:{model:t.form}},[t.showIDInput?a("el-form-item",{attrs:{label:"ID","label-width":t.formLabelWidth}},[a("el-input",{attrs:{disabled:"","suffix-icon":"el-icon-date"},model:{value:t.form.tagID,callback:function(e){t.$set(t.form,"tagID",e)},expression:"form.tagID"}})],1):t._e(),a("el-form-item",{attrs:{label:"标签名称","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"suffix-icon":"el-icon-date"},model:{value:t.form.tagname,callback:function(e){t.$set(t.form,"tagname",e)},expression:"form.tagname"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleUpdate()}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"删除提示",visible:t.dialogVisble,width:"30%",center:""},on:{"update:visible":function(e){t.dialogVisble=e}}},[a("div",[t._v("确认要该标签吗？")]),a("div",{staticClass:"mgl-10 mgt-10"},[t._v("ID："+t._s(this.deleteData.tagID))]),a("div",{staticClass:"mgl-10"},[t._v(" 标签名称： "),a("el-tag",{staticClass:"role-tableItem",attrs:{type:"success"}},[t._v(t._s(this.deleteData.tagname))])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisble=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.hanldeDelete()}}},[t._v("确 定")])],1)])],1)},n=[],o=a("1da1"),l=a("5530"),r=(a("96cf"),a("99af"),a("1cb9")),s=a("d28d"),c={name:"ShopTag",components:{PageExample:r["a"]},data:function(){return{tableData:[{tagID:1,tagname:"上新"},{tagID:2,tagname:"热销"}],search:"",tableLoading:!0,dialogFormVisible:!1,form:{tagID:1,tagname:"上新"},formLabelWidth:"120px",showIDInput:!0,formLableTitle:"form表格",dialogVisble:!1,deleteData:{tagID:""}}},methods:{refreshTableData:function(){var t=this;this.tableLoading=!0,Object(s["c"])().then((function(e){t.tableData=e.data,t.tableLoading=!1}))},goEditDialog:function(t){t?(this.form=Object(l["a"])({},t),this.showIDInput=!0,this.formLableTitle="商品标签修改"):(this.form={tagname:""},this.formLableTitle="商品标签添加",this.showIDInput=!1),this.dialogFormVisible=!0},goDeleteDialog:function(t){this.dialogVisble=!0,this.deleteData=Object(l["a"])({},t)},hanldeDelete:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["b"])(t.deleteData.tagID);case 2:t.$notify({title:"成功",message:"id：".concat(t.deleteData.tagID," 标签名:").concat(t.deleteData.tagname," 删除成功。"),type:"success"}),t.dialogVisble=!1,t.deleteData={},t.refreshTableData();case 6:case"end":return e.stop()}}),e)})))()},handleUpdate:function(){var t=this;this.showIDInput?Object(s["d"])(this.form).then((function(e){2e4===e.code&&(t.$notify({title:"成功",message:"标签：".concat(t.form.tagname,"已编辑成功"),type:"success"}),t.dialogFormVisible=!1,t.form={},t.refreshTableData())})):Object(s["a"])(this.form).then((function(e){2e4===e.code&&(t.$notify({title:"成功",message:"标签：".concat(t.form.tagname,"已成功添加"),type:"success"}),t.dialogFormVisible=!1,t.form={},t.refreshTableData())}))}},mounted:function(){this.refreshTableData()}},u=c,d=(a("eb81"),a("2877")),f=Object(d["a"])(u,i,n,!1,null,"bfb9dc00",null);e["default"]=f.exports},"1cb9":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-drawer",{attrs:{title:"微信小程序-界面示例",visible:t.drawer},on:{"update:visible":function(e){t.drawer=e}}},[a("el-image",{attrs:{src:t.picUrl,fit:"contain","preview-src-list":new Array(t.picUrl)}})],1),a("div",{staticClass:"btn-wrapper"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-right",circle:""},on:{click:t.change}})],1)],1)},n=[],o={name:"PageExample",data:function(){return{picUrl:"https://mbsdoor.com:5000/static/image/wx/page-example.png",drawer:!1}},methods:{change:function(){this.drawer=!this.drawer}}},l=o,r=(a("ba40"),a("2877")),s=Object(r["a"])(l,i,n,!1,null,"2854a8e6",null);e["a"]=s.exports},"6a52":function(t,e,a){},ba40:function(t,e,a){"use strict";a("01da")},d28d:function(t,e,a){"use strict";a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return l})),a.d(e,"d",(function(){return r}));var i=a("b775");function n(){return Object(i["a"])({url:"/vue-admin-template/shop/tag",method:"get"})}function o(t){return Object(i["a"])({url:"/vue-admin-template/shop/tag",method:"post",data:t})}function l(t){return Object(i["a"])({url:"/vue-admin-template/shop/tag",method:"delete",params:{tagID:t}})}function r(t){return Object(i["a"])({url:"/vue-admin-template/shop/tag",method:"put",data:t})}},eb81:function(t,e,a){"use strict";a("6a52")}}]);