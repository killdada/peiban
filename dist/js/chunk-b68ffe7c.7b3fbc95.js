(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b68ffe7c"],{2934:function(t,e,n){"use strict";n.d(e,"c",function(){return c}),n.d(e,"a",function(){return s}),n.d(e,"b",function(){return l});var a=n("a9bf"),i=n("c9c8"),o=n("52f9"),r=Object(o["a"])(),c=Object(i["a"])("".concat(r,"/college/upload"));function s(){return a["a"].get("/lesson/all")}function l(){return a["a"].get("/qiniu_token")}},"91dd":function(t,e,n){"use strict";function a(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,n,o){e=e||"&",n=n||"=";var r={};if("string"!==typeof t||0===t.length)return r;var c=/\+/g;t=t.split(e);var s=1e3;o&&"number"===typeof o.maxKeys&&(s=o.maxKeys);var l=t.length;s>0&&l>s&&(l=s);for(var u=0;u<l;++u){var p,f,d,g,h=t[u].replace(c,"%20"),m=h.indexOf(n);m>=0?(p=h.substr(0,m),f=h.substr(m+1)):(p=h,f=""),d=decodeURIComponent(p),g=decodeURIComponent(f),a(r,d)?i(r[d])?r[d].push(g):r[d]=[r[d],g]:r[d]=g}return r};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},a9ac:function(t,e,n){"use strict";var a=n("c510"),i=n.n(a);i.a},b383:function(t,e,n){"use strict";e.decode=e.parse=n("91dd"),e.encode=e.stringify=n("e099")},c510:function(t,e,n){},c9c8:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var a=n("b383"),i=n.n(a),o=n("a78e"),r=n.n(o);function c(t){var e=i.a.stringify({token:r.a.get("token")||""});return"".concat(t,"?").concat(e)}},e099:function(t,e,n){"use strict";var a=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,n,c){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"===typeof t?o(r(t),function(r){var c=encodeURIComponent(a(r))+n;return i(t[r])?o(t[r],function(t){return c+encodeURIComponent(a(t))}).join(e):c+encodeURIComponent(a(t[r]))}).join(e):c?encodeURIComponent(a(c))+n+encodeURIComponent(a(t)):""};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function o(t,e){if(t.map)return t.map(e);for(var n=[],a=0;a<t.length;a++)n.push(e(t[a],a));return n}var r=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}},e0c3:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-Practice-list"},[n("header",[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:t.gotoAdd}},[t._v("新增")])],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data}},[n("el-table-column",{attrs:{prop:"course_name","min-width":"200",label:"所属课程"}}),n("el-table-column",{attrs:{prop:"category_name",label:"所属分类"}}),n("el-table-column",{attrs:{prop:"publisher",label:"发起人"}}),n("el-table-column",{attrs:{prop:"topic",label:"练习主题"}}),n("el-table-column",{attrs:{prop:"practice_num",label:"练习回复数"}}),n("el-table-column",{attrs:{prop:"lastest_practice_reply","show-overflow-tooltip":"",label:"最新练习回复"}}),n("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gotoEdit(e.row)}}},[t._v("查看")]),n("el-button",{staticClass:"delete",attrs:{type:"text"},on:{click:function(n){return t.deletePractice(e.row)}}},[t._v("删除")])]}}])})],1),n("page-pagination",{attrs:{pageSize:10,total:t.total},on:{currentChange:t.handleCurrentChange}}),n("el-dialog",{attrs:{title:t.id?"练习详情":"新建练习",width:"700px",visible:t.showDialog},on:{close:t.resetForm,"update:visible":function(e){t.showDialog=e}}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDetail,expression:"loadingDetail"}],staticClass:"Practice-form"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"所属课程",prop:"course_id"}},[n("el-select",{attrs:{disabled:!!t.id,placeholder:"请选择课程分类"},model:{value:t.form.course_id,callback:function(e){t.$set(t.form,"course_id",e)},expression:"form.course_id"}},t._l(t.options,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),n("el-form-item",{attrs:{label:"练习主题",prop:"topic"}},[n("el-input",{attrs:{type:"textarea",placeholder:"请输入练习主题",autosize:{minRows:3,maxRows:6},maxlength:500,disabled:!!t.id},model:{value:t.form.topic,callback:function(e){t.$set(t.form,"topic","string"===typeof e?e.trim():e)},expression:"form.topic"}})],1),n("el-form-item",{attrs:{label:"发起人",prop:"publisher"}},[n("el-input",{attrs:{placeholder:"请输入发起人",disabled:!!t.id},model:{value:t.form.publisher,callback:function(e){t.$set(t.form,"publisher","string"===typeof e?e.trim():e)},expression:"form.publisher"}})],1),t.id?n("div",{staticClass:"reply-table"},[n("p",[t._v("练习回复列表")]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingPracticeList,expression:"loadingPracticeList"}],attrs:{data:t.replyList,height:"300px"}},[n("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"content",label:"练习回复"}}),n("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"delete",attrs:{type:"text"},on:{click:function(n){return t.deleteReply(e.row.id)}}},[t._v("删除")])]}}],null,!1,3455715908)})],1),n("page-pagination",{attrs:{pageSize:10,total:t.totalReply},on:{currentChange:t.handleCurrentChangeReply}})],1):t._e()],1),t.id?t._e():n("div",{staticClass:"submit-btn"},[n("el-button",{attrs:{size:"medium"},on:{click:function(e){t.showDialog=!1}}},[t._v("取消")]),n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.save}},[t._v("确定")])],1)],1)])],1)},i=[],o=n("cebc"),r=n("2934"),c=n("a9bf");function s(t){return c["a"].get("/practice",{params:t})}function l(t){return c["a"].get("/practice/".concat(t))}function u(t,e){return c["a"].delete("/practice/".concat(t,"/").concat(e))}function p(t){return c["a"].post("/practice/".concat(t.course_id),t)}function f(t,e){return c["a"].get("/practice/reply/".concat(t),{params:e})}function d(t,e){return c["a"].delete("/practice/reply/".concat(t,"/").concat(e))}var g={data:function(){return{action:r["c"],data:[],loading:!1,total:0,key:"",showDialog:!1,imgData:{media_type:1},id:"",form:{publisher:"",topic:"",course_id:""},rules:{topic:{message:"练习主题不能为空",required:!0,trigger:["blur"]},publisher:{message:"发起人不能为空",required:!0,trigger:["blur"]},course_id:{message:"请至少选择一个课程",required:!0,trigger:["blur"]}},options:[{categoryId:1,categoryName:""}],loadingDetail:!1,loadingPracticeList:!1,btnloading:!1,totalReply:0,replyList:[],pageReply:1,page:1}},components:{},methods:{refreshData:function(){this.fetchData(),this.showDialog=!1},resetForm:function(){this.$refs.form.resetFields()},gotoAdd:function(){this.showDialog=!0,this.id=""},handleCurrentChangeReply:function(t){this.pageReply=t,this.fetchReplys(t)},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},deleteReply:function(t){var e=this;this.$confirm("此操作将永久删除该练习回复, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d(e.id,t).then(function(){if(e.$message.success("删除练习回复成功"),1===e.replyList.length){var t=e.pageReply-1;e.pageReply=t>=1?t:1}e.fetchReplys()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},fetchData:function(t){var e=this;this.loading||(this.loading=!0,s({page:t||this.page||1}).then(function(t){e.data=t.data||[],e.total=t.total}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loading=!1}))},deletePractice:function(t){var e=this;this.$confirm("此操作将永久删除该练习, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){u(t.course_id,t.id).then(function(){if(e.$message.success("删除练习成功"),1===e.data.length){var t=e.page-1;e.page=t>=1?t:1}e.fetchData()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},gotoEdit:function(t){this.pageReply=1,this.showDialog=!0,this.id=t.id,this.fetchDetail()},save:function(){var t=this;this.$refs.form.validate(function(e){if(e){if(t.btnloading)return;t.btnloading=!0,p(t.form).then(function(){t.$message.success("添加练习成功"),t.fetchData(),t.showDialog=!1}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1})}})},fetchReplys:function(t){var e=this;this.loadingPracticeList||(this.loadingPracticeList=!0,f(this.id,{page:t||this.pageReply||1}).then(function(t){e.replyList=t.data||[],e.totalReply=t.total}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loadingPracticeList=!1}))},fetchDetail:function(){var t=this;this.loadingDetail||(this.loadingDetail=!0,l(this.id).then(function(e){t.form=Object(o["a"])({},e),t.$refs.form.clearValidate()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.loadingDetail=!1}),this.fetchReplys())},reset:function(){this.$refs.form&&this.$refs.form.resetFields()}},created:function(){var t=this;this.fetchData(),Object(r["a"])().then(function(e){t.options=e}).catch(function(e){t.$message.error(e.message)})}},h=g,m=(n("a9ac"),n("2877")),b=Object(m["a"])(h,a,i,!1,null,"2a114f8a",null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-b68ffe7c.7b3fbc95.js.map