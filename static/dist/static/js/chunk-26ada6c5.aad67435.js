(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26ada6c5"],{"01da":function(e,t,a){},"1cb9":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("el-drawer",{attrs:{title:"微信小程序-界面示例",visible:e.drawer},on:{"update:visible":function(t){e.drawer=t}}},[a("el-image",{attrs:{src:e.picUrl,fit:"contain","preview-src-list":new Array(e.picUrl)}})],1),a("div",{staticClass:"btn-wrapper"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-right",circle:""},on:{click:e.change}})],1)],1)},l=[],n={name:"PageExample",data:function(){return{picUrl:"https://mbsdoor.com:5000/static/image/wx/page-example.png",drawer:!1}},methods:{change:function(){this.drawer=!this.drawer}}},r=n,o=(a("ba40"),a("2877")),c=Object(o["a"])(r,i,l,!1,null,"2854a8e6",null);t["a"]=c.exports},"62c7":function(e,t,a){},"709b":function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return o}));var i=a("b775");function l(){return Object(i["a"])({url:"/vue-admin-template/activity/banner",method:"get"})}function n(e){return Object(i["a"])({url:"/vue-admin-template/activity/banner",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/vue-admin-template/activity/banner",method:"delete",params:{bannerID:e}})}function o(e){return Object(i["a"])({url:"/vue-admin-template/activity/banner",method:"put",data:e})}},ba40:function(e,t,a){"use strict";a("01da")},e37c:function(e,t,a){"use strict";a("62c7")},ed7e:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("page-example"),a("div",{staticClass:"lbt-wrapper"},[a("el-carousel",{attrs:{trigger:"click",autoplay:!1}},e._l(e.lbtURL,(function(e){return a("el-carousel-item",{key:e},[a("el-image",{staticClass:"lbt-img",attrs:{src:e,fit:"fill"}})],1)})),1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData.filter((function(t){return!e.search||t.description.toLowerCase().includes(e.search.toLowerCase())}))}},[a("el-table-column",{attrs:{label:"id",prop:"bannerID",width:"50px"}}),a("el-table-column",{attrs:{label:"类型",prop:"type",width:"100px"}}),a("el-table-column",{attrs:{label:"描述",prop:"description"}}),a("el-table-column",{attrs:{label:"生效",prop:"hidden",width:"50px"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",[e.row.hidden?a("span",[a("i",{staticClass:"el-icon-error",staticStyle:{color:"#909399"}})]):a("span",[a("i",{staticClass:"el-icon-success",staticStyle:{color:"#409eff"}})])])]}}])}),a("el-table-column",{attrs:{label:"图片连接",prop:"picURL"}}),a("el-table-column",{attrs:{label:"图片预览",prop:"picURL",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",[a("el-image",{staticClass:"img",attrs:{src:e.row.picURL,fit:"contain","preview-src-list":new Array(e.row.picURL)}})],1)]}}])}),a("el-table-column",{attrs:{align:"right",width:"150px"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-input",{attrs:{size:"mini",placeholder:"输入关键字搜索"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})]}},{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.goEditDialog(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.goDeleteDialog(t.row)}}},[e._v("删除")])]}}])})],1),a("el-dialog",{attrs:{title:e.formLableTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"id","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"","suffix-icon":"el-icon-date"},model:{value:e.form.bannerID,callback:function(t){e.$set(e.form,"bannerID",t)},expression:"form.bannerID"}})],1),a("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"描述","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"suffix-icon":"el-icon-date"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),a("el-form-item",{attrs:{label:"图片地址","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"suffix-icon":"el-icon-date"},model:{value:e.form.picURL,callback:function(t){e.$set(e.form,"picURL",t)},expression:"form.picURL"}})],1),a("el-form-item",{attrs:{label:"生效","label-width":e.formLabelWidth}},[a("el-radio",{attrs:{label:!0},model:{value:e.form.hidden,callback:function(t){e.$set(e.form,"hidden",t)},expression:"form.hidden"}},[e._v("false")]),a("el-radio",{attrs:{label:!1},model:{value:e.form.hidden,callback:function(t){e.$set(e.form,"hidden",t)},expression:"form.hidden"}},[e._v("true")])],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleUpdate()}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"删除提示",visible:e.dialogVisble,width:"30%",center:""},on:{"update:visible":function(t){e.dialogVisble=t}}},[a("span",[e._v("确认要删除轮播图？ id: "+e._s(this.deleteData.bannerID))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisble=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.hanldeDelete()}}},[e._v("确 定")])],1)])],1)},l=[],n=a("1da1"),r=a("5530"),o=(a("96cf"),a("d81d"),a("1cb9")),c=a("709b"),s={name:"ActivityBanner",components:{PageExample:o["a"]},data:function(){return{tableData:[],search:"",tableLoading:!0,dialogFormVisible:!1,form:{bannerID:"",type:"",description:"",picURL:"",hidden:!1},formLabelWidth:"120px",formLableTitle:"信息修改",options:[{value:"活动",lable:"活动"},{value:"广告",lable:"广告"},{value:"品牌",lable:"品牌"},{value:"热销",lable:"热销"}],dialogVisble:!1,deleteData:{bannerID:""},lbtURL:[]}},methods:{refreshTableData:function(){var e=this;this.tableLoading=!0,Object(c["c"])().then((function(t){e.tableData=t.data,e.tableLoading=!1,e.lbtURL=t.data.map((function(e){return e.picURL}))}))},goEditDialog:function(e){this.form=Object(r["a"])({},e),this.formLableTitle="信息修改",this.dialogFormVisible=!0},goDeleteDialog:function(e){this.dialogVisble=!0,this.deleteData=Object(r["a"])({},e)},hanldeDelete:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["b"])(e.deleteData.bannerID);case 2:e.$notify({title:"成功",message:"id：".concat(e.deleteData.bannerID,"  删除成功。"),type:"success"}),e.dialogVisble=!1,e.deleteData={},e.refreshTableData();case 6:case"end":return t.stop()}}),t)})))()},handleUpdate:function(){var e=this;Object(c["d"])(this.form).then((function(t){2e4===t.code&&(e.$notify({title:"成功",message:"id：".concat(e.form.bannerID,"  已编辑成功"),type:"success"}),e.dialogFormVisible=!1,e.refreshTableData())}))}},mounted:function(){this.refreshTableData()}},d=s,u=(a("e37c"),a("2877")),b=Object(u["a"])(d,i,l,!1,null,"7b38cba7",null);t["default"]=b.exports}}]);