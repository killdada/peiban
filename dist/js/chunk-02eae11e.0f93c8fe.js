(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02eae11e"],{"0a49":function(e,t,a){var n=a("9b43"),i=a("626a"),r=a("4bf8"),o=a("9def"),s=a("cd1c");e.exports=function(e,t){var a=1==e,l=2==e,c=3==e,u=4==e,d=6==e,f=5==e||d,m=t||s;return function(t,s,p){for(var g,b,h=r(t),v=i(h),y=n(s,p,3),_=o(v.length),j=0,O=a?m(t,_):l?m(t,0):void 0;_>j;j++)if((f||j in v)&&(g=v[j],b=y(g,j,h),e))if(a)O[j]=b;else if(b)switch(e){case 3:return!0;case 5:return g;case 6:return j;case 2:O.push(g)}else if(u)return!1;return d?-1:c||u?u:O}}},1169:function(e,t,a){var n=a("2d95");e.exports=Array.isArray||function(e){return"Array"==n(e)}},1310:function(e,t){function a(e){return null!=e&&"object"==typeof e}e.exports=a},"1a8c":function(e,t){function a(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}e.exports=a},"323c":function(e,t,a){},"32ca":function(e,t,a){"use strict";var n=a("5f62"),i=a.n(n);i.a},3729:function(e,t){var a=Object.prototype,n=a.toString;function i(e){return n.call(e)}e.exports=i},"3df3":function(e,t,a){"use strict";var n=a("323c"),i=a.n(n);i.a},"404d":function(e,t,a){},4403:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"lesson-detail"},[a("x-card",{attrs:{title:"课程信息"}},[a("lesson-form",{ref:"lessonForm"})],1),a("x-card",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"catalog-info",attrs:{title:"目录信息"}},[e.lessonID?a("div",{attrs:{slot:"title"},slot:"title"},[a("el-button",{staticClass:"catalog-info-add",attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.openDialog(!1)}}},[e._v("添加目录")])],1):e._e(),a("el-table",{attrs:{data:e.data}},[a("el-table-column",{attrs:{type:"index","label-class-name":"index-col","class-name":"index-col",label:"序号",width:"70"}}),a("el-table-column",{attrs:{prop:"name",width:"150",label:"目录名称"}}),a("el-table-column",{attrs:{"min-width":"200",label:"目录素材截图"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:e.row.video_img_url,width:"100",height:"100",alt:""}})]}}])}),a("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(3===t.row.video_media_type?"视频":"音频")+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"desc","min-width":"200",label:"目录描述"}}),a("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.openDialog(t.row)}}},[e._v("编辑")]),3===t.row.video_media_type?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.gotoBindppt(t.row)}}},[e._v("绑定ppt")]):e._e(),a("el-button",{staticClass:"delete",attrs:{type:"text"},on:{click:function(a){return e.deleteCatalog(t.row.id)}}},[e._v("删除")])]}}])})],1),a("page-pagination",{attrs:{total:e.total},on:{currentChange:e.handleCurrentChange}})],1),a("catalog-dialog",{ref:"catalogDialog",on:{onsuccess:e.addsuccess}})],1)},i=[],r=a("cebc"),o=(a("7f7f"),a("2934")),s=a("8897"),l=a("fa31"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"catalog-dialog",attrs:{title:e.isEdit?"编辑目录":"新增目录",width:"1000px",visible:e.formVisible},on:{"update:visible":function(t){e.formVisible=t},close:e.resetForm}},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading&&e.isEdit,expression:"loading && isEdit"}],ref:"form",attrs:{model:e.form,"label-position":"left","label-width":"120px",rules:e.rules}},[a("el-form-item",{attrs:{label:"目录名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入目录名称",maxlength:"50"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name","string"===typeof t?t.trim():t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"目录别名",prop:"alias"}},[a("el-input",{attrs:{placeholder:"请输入目录别名",maxlength:"3"},model:{value:e.form.alias,callback:function(t){e.$set(e.form,"alias","string"===typeof t?t.trim():t)},expression:"form.alias"}})],1),a("el-form-item",{attrs:{label:"目录描述",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入目录描述",autosize:{minRows:3,maxRows:6},maxlength:500},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc","string"===typeof t?t.trim():t)},expression:"form.desc"}})],1),a("el-form-item",{attrs:{label:"目录素材",prop:"vedio"}},[a("el-radio-group",{on:{change:e.changeMethod},model:{value:e.form.upload_type,callback:function(t){e.$set(e.form,"upload_type",t)},expression:"form.upload_type"}},[a("el-radio",{attrs:{label:1}},[e._v("直接上传")]),a("el-radio",{attrs:{label:2}},[e._v("从素材库选择")])],1),1===e.form.upload_type?[a("div",{staticClass:"single  upload-vedio-container"},[a("div",{staticClass:"video-preview",attrs:{title:e.uploadlingVideo?"正在上传素材请稍候":"点击这个区域可以上传素材"}},[e.form.vedio||e.currentFileObj.name?a("div",{staticClass:"has-border",class:e.uploadlingVideo&&"disabled",on:{click:e.selectFile}},[a("span",[e._v("您选择的文件："+e._s(e.currentFileObj.name))]),e.currentFileObj.percent>0?a("strong",[e._v("已上传\n                                "+e._s(e.currentFileObj.percent)+"%")]):e._e(),a("el-button",{attrs:{size:"small",disabled:e.uploadlingVideo,type:"primary"}},[e._v("点击上传")])],1):a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.selectFile}},[e._v("点击上传")])],1),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"upload",accept:"video/*,audio/*"},on:{change:e.uploadfile}})])]:a("el-select",{staticStyle:{display:"block",width:"300px"},attrs:{filterable:"",placeholder:"请选择"},on:{change:e.changeSelectMaterial},model:{value:e.form.vediobind,callback:function(t){e.$set(e.form,"vediobind",t)},expression:"form.vediobind"}},e._l(e.materialList,function(e){return a("el-option",{key:e.media_id,attrs:{label:e.show_name,value:e.media_id}})}),1)],2),a("el-form-item",{attrs:{label:"目录素材时长",prop:"play_time"}},[a("el-time-picker",{attrs:{"value-format":"HH:mm:ss",placeholder:"选择时间范围"},model:{value:e.form.play_time,callback:function(t){e.$set(e.form,"play_time",t)},expression:"form.play_time"}})],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium"},on:{click:e.cancel}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",loading:e.btnloading,size:"medium"},on:{click:e.save}},[e._v("确认")])],1)],1)},u=[],d=(a("96cf"),a("3b8d")),f=(a("7514"),a("49de")),m=a("054f"),p={data:function(){var e=this,t=function(t,a,n){1===e.form.upload_type?a?n():n(new Error("目录视频、音频不能为空")):e.form.vediobind?n():n(new Error("目录视频、音频不能为空,请绑定一个"))};return{vedioData:{media_type:3},form:{name:"",alias:"",vedio:"",vediobind:"",vedio_url:"",desc:"",upload_type:1,play_time:""},formVisible:!1,rules:{name:{message:"目录名称不能为空",required:!0,trigger:["blur"]},alias:{message:"目录别名不能为空",required:!0,trigger:["blur"]},vedio:{validator:t,message:"",required:!0,trigger:["blur"]},play_time:{message:"目录素材时长不能为空",required:!0,trigger:["blur"]}},loading:!1,btnloading:!1,isEdit:!1,uploadlingVideo:!1,currentFileObj:{},materialList:[]}},methods:{changeSelectMaterial:function(e){var t=this.materialList.find(function(t){return t.media_id===e});t&&this.getMaterialTimes(t.media_url)},changeMethod:function(){this.$refs.form.clearValidate("vedio")},getMaterials:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(f["a"])();case 3:t=e.sent,this.materialList=t.data||[],e.next=9;break;case 7:e.prev=7,e.t0=e["catch"](0);case 9:case"end":return e.stop()}},e,this,[[0,7]])}));function t(){return e.apply(this,arguments)}return t}(),selectFile:function(){this.uploadlingVideo||document.getElementById("upload").click()},addzero:function(e){return e>=10?e:"0".concat(e)},forMatTime:function(e){var t=parseInt(e/3600%60,10),a=parseInt(e/60%60,10),n=parseInt(e%60,10);return"".concat(this.addzero(t),":").concat(this.addzero(a),":").concat(this.addzero(n))},getMaterialTimes:function(e){var t=this,a=e;if(!e){var n=document.getElementById("upload"),i=n.files[0];a=URL.createObjectURL(i)}var r,o=new Audio(a);o.addEventListener("loadedmetadata",function(){r=o.duration,t.$set(t.form,"play_time",t.forMatTime(r))})},updateFileObj:function(e,t){this.currentFileObj=Object(r["a"])({},this.currentFileObj,e),e.status&&("error"===e.status?this.$message.error("上传失败！"):"completed"===e.status&&(this.$message.success("素材上传成功"),this.form.vedio=t.name,this.getMaterialTimes()),this.uploadlingVideo=!1)},uploadfile:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(){var t,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=document.getElementById("upload").files[0],a={file:t,name:t.name,size:t.size,percent:0,status:null},this.currentFileObj=a,this.uploadlingVideo=!0,Object(m["b"])(this.currentFileObj,this.updateFileObj);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),open:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(t){var a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.formVisible=!0,this.isEdit=!!t,this.hasChange=!1,e.prev=3,e.next=6,this.getMaterials();case 6:e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](3);case 10:this.isEdit?(this.loading=!0,Object(s["e"])(this.$route.params.id,t.id).then(function(e){var t={media_type:e.media_type,play_time:e.play_time,id:e.id,name:e.name,alias:e.alias,vedio:"",vediobind:"",vedio_url:e.video_url,desc:e.remark,upload_type:e.upload_type};1===e.upload_type?(a.currentFileObj={name:e.video_media_id,key:e.video_media_id,media_type:e.media_type},t.vedio=e.video_media_id):(t.vediobind=e.video_media_id,a.currentFileObj={}),e.ppt&&e.ppt.length&&(t.ppt=e.ppt),a.form=t}).finally(function(){a.loading=!1})):(this.resetForm(),this.form={alias:"",name:"",vedio:"",vedio_url:"",vediobind:"",desc:"",upload_type:1,play_time:""},this.currentFileObj={}),this.uploadlingVideo=!1;case 12:case"end":return e.stop()}},e,this,[[3,8]])}));function t(t){return e.apply(this,arguments)}return t}(),close:function(){this.formVisible=!1},resetForm:function(){this.$refs.form&&this.$refs.form.resetFields()},cancel:function(){this.formVisible=!1},save:function(){var e=this;this.$refs.form.validate(function(t){if(t){if(e.btnloading)return;e.btnloading=!0;var a=Object(r["a"])({},e.form);if(2===a.upload_type){a.vedio=a.vediobind;var n=e.materialList.find(function(e){return e.media_id===a.vediobind});n&&(a.media_type=n.media_type)}else a.vedio=e.currentFileObj.key,a.media_type=e.currentFileObj.media_type;e.isEdit?Object(s["l"])(e.$route.params.id,a.id,a).then(function(){e.$message.success("编辑成功"),e.formVisible=!1,e.$emit("onsuccess")}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.btnloading=!1}):Object(s["a"])(e.$route.params.id,a).then(function(){e.$message.success("添加成功"),e.$emit("onsuccess"),e.formVisible=!1}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.btnloading=!1})}})}}},g=p,b=(a("d2dc"),a("2877")),h=Object(b["a"])(g,c,u,!1,null,null,null),v=h.exports,y=a("aa3c"),_={data:function(){return{action:o["c"],imgData:{media_type:1},data:[{id:1,name:"",vedio:"",desc:"",ppt:""}],total:0,loading:!1,page:1}},components:{catalogDialog:v,lessonForm:y["a"]},computed:{lessonID:function(){return this.$route.params.id}},methods:{gotoBindppt:function(e){var t=e.id,a=e.name,n=Object(l["a"])("peibanData",{});Object(l["b"])("peibanData",Object(r["a"])({},n,{lessonID:this.lessonID,courseName:this.$refs.lessonForm.form.name,catalogName:a})),this.$router.push({path:"/lesson/catalog-bind-ppt/".concat(t)})},addsuccess:function(){this.fetchData()},openDialog:function(e){this.$refs.catalogDialog.open(e)},deleteCatalog:function(e){var t=this;this.$confirm("此操作将永久删除该目录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s["c"])(t.lessonID,e).then(function(){if(t.$message.success("删除目录成功"),1===t.data.length){var e=t.page-1;t.page=e>=1?e:1}t.fetchData()}).catch(function(e){t.$message.error(e.message)})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleCurrentChange:function(e){this.page=e,this.fetchData(e)},fetchData:function(e){var t=this;this.loading||(this.loading=!0,Object(s["f"])(this.lessonID,{page:e||this.page||1}).then(function(e){t.data=e.data,t.total=e.total}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.loading=!1}))}},created:function(){this.fetchData()}},j=_,O=(a("32ca"),Object(b["a"])(j,n,i,!1,null,"1248f06a",null));t["default"]=O.exports},"49de":function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"a",function(){return o}),a.d(t,"c",function(){return s});var n=a("a9bf"),i=a("c9c8");function r(e){return n["a"].post(Object(i["a"])("/material"),e)}function o(e){return n["a"].get(Object(i["a"])("/material"),{params:e})}function s(e,t){return n["a"].put(Object(i["a"])("/material/".concat(e)),t)}},"5f62":function(e,t,a){},6747:function(e,t){var a=Array.isArray;e.exports=a},7514:function(e,t,a){"use strict";var n=a("5ca1"),i=a("0a49")(5),r="find",o=!0;r in[]&&Array(1)[r](function(){o=!1}),n(n.P+n.F*o,"Array",{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(r)},8897:function(e,t,a){"use strict";a.d(t,"k",function(){return r}),a.d(t,"i",function(){return o}),a.d(t,"h",function(){return s}),a.d(t,"g",function(){return l}),a.d(t,"d",function(){return c}),a.d(t,"b",function(){return u}),a.d(t,"m",function(){return d}),a.d(t,"f",function(){return f}),a.d(t,"e",function(){return m}),a.d(t,"a",function(){return p}),a.d(t,"l",function(){return g}),a.d(t,"c",function(){return b}),a.d(t,"j",function(){return h});var n=a("a9bf"),i=a("c9c8");function r(e){return n["a"].put(Object(i["a"])("/lesson/list/pub/".concat(e)))}function o(e){return n["a"].get(Object(i["a"])("/lesson/list"),{params:e})}function s(e){return n["a"].get(Object(i["a"])("/lesson/list/".concat(e)))}function l(){return n["a"].get(Object(i["a"])("/lesson/category"))}function c(e){return n["a"].delete(Object(i["a"])("/lesson/list/".concat(e)))}function u(e){return n["a"].post(Object(i["a"])("/lesson/list"),e)}function d(e,t){return n["a"].put(Object(i["a"])("/lesson/list/".concat(e)),t)}function f(e,t){return n["a"].get(Object(i["a"])("/lesson/catalog/".concat(e)),{params:t})}function m(e,t){return n["a"].get(Object(i["a"])("/lesson/catalog/".concat(e,"/").concat(t)))}function p(e,t){return n["a"].post(Object(i["a"])("/lesson/catalog/".concat(e)),t)}function g(e,t,a){return n["a"].put(Object(i["a"])("/lesson/catalog/".concat(e,"/").concat(t)),a)}function b(e,t){return n["a"].delete(Object(i["a"])("/lesson/catalog/".concat(e,"/").concat(t)))}function h(e){return n["a"].post(Object(i["a"])("/pdf2png"),e)}},aa3c:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingDetail,expression:"loadingDetail"}],staticClass:"lesson-form"},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"课程名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入课程名称",maxlength:"50"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name","string"===typeof t?t.trim():t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"课程分类",prop:"category"}},[a("el-select",{attrs:{placeholder:"请选择课程分类"},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}},e._l(e.options,function(e){return a("el-option",{key:e.categoryId,attrs:{label:e.categoryName,value:e.categoryId}})}),1)],1),a("el-form-item",{attrs:{label:"讲师名称",prop:"lector"}},[a("el-input",{attrs:{placeholder:"请输入讲师名称",maxlength:"50"},model:{value:e.form.lector,callback:function(t){e.$set(e.form,"lector","string"===typeof t?t.trim():t)},expression:"form.lector"}})],1),a("el-form-item",{attrs:{label:"课程图片",prop:"img"}},[a("img-loader",{attrs:{httpRequest:e.customUpload,action:""},model:{value:e.form.imgUrl,callback:function(t){e.$set(e.form,"imgUrl",t)},expression:"form.imgUrl"}})],1),a("el-form-item",{attrs:{label:"课程简介",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入课程简介",autosize:{minRows:3,maxRows:6},maxlength:500},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc","string"===typeof t?t.trim():t)},expression:"form.desc"}})],1)],1),a("div",{staticClass:"submit-btn"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.save}},[e._v("保存")])],1)],1)},i=[],r=a("cebc"),o=a("2934"),s=a("8897"),l=a("054f"),c={data:function(){return{action:o["c"],imgData:{media_type:1},form:{id:1,img:"",imgUrl:"",name:"",category:"",number:"",lector:"",desc:""},rules:{name:{message:"课程名称不能为空",required:!0,trigger:["blur"]},category:{message:"请至少选择一个课程分类",required:!0,trigger:["blur"]},lector:{message:"讲师名称不能为空",required:!0,trigger:["blur"]},img:{message:"课程图片不能为空",required:!0,trigger:["blur","change"]}},options:[{categoryId:1,categoryName:""}],loadingDetail:!1,btnloading:!1,fileData:{}}},methods:{setImgurl:function(e){var t=this,a=new FileReader;a.readAsDataURL(e),a.onload=function(){t.form.imgUrl=a.result}},update:function(e,t){this.fileData=Object(r["a"])({},this.fileData,e),"completed"===e.status?(this.$message.success("上传图片成功"),this.setImgurl(t.file),this.form.img=this.fileData.key):"error"===e.status&&this.$message.error("图片上传失败")},customUpload:function(e){this.fileData={file:e.file},Object(l["b"])(this.fileData,this.update)},save:function(){var e=this;this.$refs.form.validate(function(t){if(t){if(e.btnloading)return;e.btnloading=!0,e.$route.params.id?Object(s["m"])(e.$route.params.id,e.form).then(function(){e.$message.success("编辑成功"),e.$emit("onsuccess")}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.btnloading=!1}):Object(s["b"])(e.form).then(function(){e.$message.success("添加成功"),e.$emit("onsuccess")}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.btnloading=!1})}})},fetchDetail:function(){var e=this;this.loadingDetail||(this.loadingDetail=!0,Object(s["h"])(this.$route.params.id).then(function(t){e.form=Object(r["a"])({},t,{imgUrl:t.img,img:t.img_media_id}),e.$refs.form.clearValidate()}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loadingDetail=!1}))},reset:function(){this.$refs.form&&this.$refs.form.resetFields()}},created:function(){var e=this;this.$route.params.id&&this.fetchDetail(),Object(s["g"])().then(function(t){e.options=t}).catch(function(t){e.$message.error(t.message)})}},u=c,d=(a("3df3"),a("2877")),f=Object(d["a"])(u,n,i,!1,null,"b455e6fe",null);t["a"]=f.exports},cd1c:function(e,t,a){var n=a("e853");e.exports=function(e,t){return new(n(e))(t)}},d2dc:function(e,t,a){"use strict";var n=a("404d"),i=a.n(n);i.a},e2a0:function(e,t,a){var n=a("3729"),i=a("6747"),r=a("1310"),o="[object String]";function s(e){return"string"==typeof e||!i(e)&&r(e)&&n(e)==o}e.exports=s},e853:function(e,t,a){var n=a("d3f4"),i=a("1169"),r=a("2b4c")("species");e.exports=function(e){var t;return i(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!i(t.prototype)||(t=void 0),n(t)&&(t=t[r],null===t&&(t=void 0))),void 0===t?Array:t}},fa31:function(e,t,a){"use strict";a.d(t,"a",function(){return u}),a.d(t,"b",function(){return d});var n=a("1a8c"),i=a.n(n),r=a("e2a0"),o=a.n(r),s=window.localStorage;function l(e){var t=s.getItem(e);if(t&&o()(t))try{return JSON.parse(t)}catch(a){}return t}function c(e,t){t&&i()(t)&&(t=JSON.stringify(t)),s.setItem(e,t)}function u(e,t){return l(e)||t}function d(e,t){return c(e,t)}}}]);
//# sourceMappingURL=chunk-02eae11e.0f93c8fe.js.map