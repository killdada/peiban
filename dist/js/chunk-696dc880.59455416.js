(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-696dc880"],{"0a49":function(t,e,i){var n=i("9b43"),a=i("626a"),r=i("4bf8"),s=i("9def"),l=i("cd1c");t.exports=function(t,e){var i=1==t,o=2==t,c=3==t,u=4==t,f=6==t,d=5==t||f,p=e||l;return function(e,l,h){for(var m,g,v=r(e),b=a(v),y=n(l,h,3),w=s(b.length),k=0,_=i?p(e,w):o?p(e,0):void 0;w>k;k++)if((d||k in b)&&(m=b[k],g=y(m,k,v),t))if(i)_[k]=g;else if(g)switch(t){case 3:return!0;case 5:return m;case 6:return k;case 2:_.push(m)}else if(u)return!1;return f?-1:c||u?u:_}}},1169:function(t,e,i){var n=i("2d95");t.exports=Array.isArray||function(t){return"Array"==n(t)}},"20d6":function(t,e,i){"use strict";var n=i("5ca1"),a=i("0a49")(6),r="findIndex",s=!0;r in[]&&Array(1)[r]((function(){s=!1})),n(n.P+n.F*s,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")(r)},"49de":function(t,e,i){"use strict";i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return r})),i.d(e,"b",(function(){return s})),i.d(e,"d",(function(){return l}));var n=i("a9bf");function a(t){return n["a"].post("/material",t)}function r(t){return n["a"].get("/material",{params:t})}function s(t){return n["a"].get("/material_all",{params:t})}function l(t,e){return n["a"].put("/material/".concat(t),e)}},5899:function(t,e,i){},7514:function(t,e,i){"use strict";var n=i("5ca1"),a=i("0a49")(5),r="find",s=!0;r in[]&&Array(1)[r]((function(){s=!1})),n(n.P+n.F*s,"Array",{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")(r)},9694:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-material-manage"},[i("header",[i("el-input",{attrs:{placeholder:"请输入素材标题","suffix-icon":"el-icon-search",size:"medium"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.fetchData.apply(null,arguments)}},model:{value:t.key,callback:function(e){t.key="string"===typeof e?e.trim():e},expression:"key"}}),i("el-button",{staticClass:"page-material-manage__add",attrs:{type:"primary",size:"medium"},on:{click:t.openDialog}},[i("a",{staticStyle:{color:"#fff"}},[t._v("上传素材")])])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading.list,expression:"loading.list"}],attrs:{data:t.data}},[i("el-table-column",{attrs:{prop:"show_name","min-width":"200",label:"素材标题"}}),i("el-table-column",{attrs:{label:"素材类型"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[t._v(t._s(3===i.media_type?"视频":"音频"))]}}])}),i("el-table-column",{attrs:{"min-width":"200",label:"素材大小"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[t._v(t._s(Math.ceil(i.size/1024/1024))+" MB")]}}])}),i("el-table-column",{attrs:{prop:"created_at","min-width":"200",label:"创建时间"}}),i("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.openEdit(e.row)}}},[t._v("编辑")])]}}])})],1),i("page-pagination",{attrs:{pageSize:t.pageSize,total:t.total},on:{currentChange:t.handleCurrentChange}}),i("el-dialog",{staticClass:"upload-dialog",attrs:{title:"上传素材","close-on-click-modal":!1,width:"900px",visible:t.showDialog},on:{"update:visible":function(e){t.showDialog=e}}},[i("div",{staticClass:"upload-dialog__tips"},[t._v("单个素材最好不超过5G")]),i("div",{staticClass:"upload-dialog__content"},[i("div",{attrs:{id:"uploadvideo-container"}},[i("el-button",{attrs:{type:"primary",size:"medium",icon:"el-icon-plus"},on:{click:t.selectFile}},[t._v("选择文件")]),i("div",{staticClass:"file-input"},[i("input",{attrs:{type:"file",id:"uploadinput",multiple:"",accept:"video/*, audio/*"},on:{change:t.changefile}})])],1),i("el-table",{attrs:{data:t.fileList}},[i("el-table-column",{attrs:{prop:"name","min-width":"100",label:"文件名"}}),i("el-table-column",{attrs:{label:"文件大小"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[t._v(t._s(Math.ceil(i.size/1024/1024))+" M")]}}])}),i("el-table-column",{attrs:{label:"操作","min-width":"300"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[i("div",{staticClass:"file-action-wrapper"},[i("el-progress",{attrs:{"text-inside":!0,"stroke-width":20,percentage:n.percent}}),"completed"!==n.status?i("el-button",{attrs:{size:"small"},on:{click:function(e){return t.fileSingleAction(n)}}},[t._v(t._s(t.getBtnText(n.status)))]):i("el-button",{attrs:{size:"small"}},[t._v("已完成")]),i("el-button",{attrs:{size:"small"},on:{click:function(e){return t.deleteFileItem(n)}}},[t._v("删除")])],1)]}}])})],1),t.fileList.length?i("div",{staticClass:"batch-btn"},[i("div",[i("el-button",{attrs:{size:"small",title:"点击从上次的位置接着上传，再次点击相当于暂停全部"},on:{click:t.fileActionAll}},[t._v("全部开始上传")]),i("el-button",{attrs:{size:"small"},on:{click:function(e){return t.fileActionAll("pause")}}},[t._v("全部暂停上传")])],1),i("div",[i("el-button",{staticClass:"save-btn",attrs:{size:"medium",type:"primary",loading:t.loading.saveMaterial},on:{click:t.saveMaterial}},[t._v("保存")])],1)]):t._e()],1)]),i("el-dialog",{staticClass:"edit-dialog",attrs:{title:"素材编辑","close-on-click-modal":!1,width:"700px",visible:t.showEditDialog},on:{"update:visible":function(e){t.showEditDialog=e}}},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"small"}},[i("el-form-item",{attrs:{label:"素材标题"}},[i("el-input",{staticStyle:{width:"300px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)],1),i("div",{staticClass:"clearfix"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.saveEdit}},[t._v("保存")])],1)],1)],1)},a=[],r=(i("8e6e"),i("456d"),i("7514"),i("ade3")),s=(i("7f7f"),i("ac6a"),i("96cf"),i("1da1")),l=(i("20d6"),i("49de")),o=i("054f");function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){Object(r["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var f={data:function(){return{data:[],page:1,total:0,showDialog:!1,showEditDialog:!1,form:{},loading:{list:!1,editFormBtn:!1,addMaterialBtn:!1,saveMaterial:!1},fileList:[],key:"",pageSize:10}},components:{},methods:{deleteFileItem:function(t){var e=this.fileList.findIndex((function(e){return e.index===t.index}));-1!==e&&(this.pauseUpload(t),this.$delete(this.fileList,e))},saveMaterial:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.loading.saveMaterial){t.next=2;break}return t.abrupt("return");case 2:if(this.loading.saveMaterial=!0,t.prev=3,e=[],i=[],this.fileList.forEach((function(t){"completed"===t.status?e.push({media_type:t.media_type,show_name:t.name,media_id:t.key}):i.push(t)})),!e.length){t.next=16;break}return t.next=10,Object(l["c"])({list:e});case 10:this.$message.success("已经上传完成的视频保存成功"),this.fileList=i,this.fetchData(),this.fileList.length||(this.showDialog=!1),t.next=17;break;case 16:this.$message.info("没有一个素材上传成功，无法保存");case 17:t.next=21;break;case 19:t.prev=19,t.t0=t["catch"](3);case 21:this.loading.saveMaterial=!1;case 22:case"end":return t.stop()}}),t,this,[[3,19]])})));function e(){return t.apply(this,arguments)}return e}(),getBtnText:function(t){var e="开始上传";switch(t){case"paused":case"error":e="继续上传";break;case"start":e="暂停上传";break;default:break}return e},updateFileItem:function(t,e){var i=this.fileList.findIndex((function(t){return t.index===e.index}));-1!==i&&this.$set(this.fileList,i,u(u({},this.fileList[i]),t))},pauseUpload:function(t){Object(o["a"])(t,this.updateFileItem)},startUpload:function(t){Object(o["b"])(t,this.updateFileItem)},fileSingleAction:function(t,e){var i=t.status,n=void 0===i?null:i;"completed"!==n&&("start"===n||e?this.pauseUpload(t):(this.updateFileItem({status:"start"},t),this.startUpload(t)))},fileActionAll:function(t){var e=this;this.fileList.forEach((function(i){e.fileSingleAction(i,"pause"===t)}))},changefile:function(){for(var t=this,e=document.getElementById("uploadinput").files,i=[],n=function(n){var a=e[n];t.fileList.find((function(t){return t.name===a.name&&t.size===a.size}))||i.push({file:a,name:a.name,size:a.size,percent:0,status:null})},a=0;a<e.length;a++)n(a);this.fileList=this.fileList.concat(i).map((function(t,e){return u(u({},t),{},{index:e})}))},selectFile:function(){document.getElementById("uploadinput").click()},handleClick:function(){this.page=1,this.fileList=[],this.fetchData()},openDialog:function(){this.showDialog=!0},openEdit:function(t){this.form={name:t.show_name,id:t.id},this.showEditDialog=!0},saveEdit:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.form.name){t.next=2;break}return t.abrupt("return",this.$message.info("标题不能为空"));case 2:if(!this.loading.editFormBtn){t.next=4;break}return t.abrupt("return");case 4:return this.loading.editFormBtn=!0,t.prev=5,t.next=8,Object(l["d"])(this.form.id,{show_name:this.form.name});case 8:this.$message.success("修改素材标题成功"),this.showEditDialog=!1,this.fetchData(),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](5),this.$message.error(t.t0.msg||"修改素材标题失败");case 16:this.loading.editFormBtn=!1;case 17:case"end":return t.stop()}}),t,this,[[5,13]])})));function e(){return t.apply(this,arguments)}return e}(),deleteMaterial:function(){var t=this;this.$confirm("此操作将永久删除该素材, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading.list||(this.loading.list=!0,Object(l["a"])({page:t||this.page||1,media_type:"",show_name:this.key||""}).then((function(t){e.data=t.data,e.total=t.total,e.pageSize=t.per_page})).catch((function(t){e.$message.error(t.message)})).finally((function(){e.loading.list=!1})))}},created:function(){this.fetchData()}},d=f,p=(i("9d91"),i("2877")),h=Object(p["a"])(d,n,a,!1,null,"c6a2cc6a",null);e["default"]=h.exports},"9d91":function(t,e,i){"use strict";i("5899")},cd1c:function(t,e,i){var n=i("e853");t.exports=function(t,e){return new(n(t))(e)}},e853:function(t,e,i){var n=i("d3f4"),a=i("1169"),r=i("2b4c")("species");t.exports=function(t){var e;return a(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)||(e=void 0),n(e)&&(e=e[r],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=chunk-696dc880.59455416.js.map