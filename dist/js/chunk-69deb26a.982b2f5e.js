(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69deb26a"],{"1ea2":function(t,e,a){"use strict";var n=a("ec70"),o=a.n(n);o.a},2582:function(t,e,a){},"829e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-lesson-list"},[a("header",[a("div"),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:t.gotoAdd}},[t._v("新建课程")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data}},[a("el-table-column",{attrs:{type:"index","label-class-name":"index-col","class-name":"index-col",label:"序号",width:"70"}}),a("el-table-column",{attrs:{prop:"img",width:"150",label:"课程图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.img,width:"100",height:"100",alt:""}})]}}])}),a("el-table-column",{attrs:{prop:"name","min-width":"200",label:"课程名称"}}),a("el-table-column",{attrs:{prop:"cateory_name",label:"所属分类"}}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(0===e.row.status?"待发布":"已发布"))]}}])}),a("el-table-column",{attrs:{label:"课程目录数",prop:"catalog_num",width:"320"}}),a("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.gotoEdit(e.row)}}},[t._v("详情")]),0===e.row.status?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.publish(e.row)}}},[t._v("发布")]):t._e()]}}])})],1),a("page-pagination",{attrs:{total:t.total},on:{currentChange:t.handleCurrentChange}}),a("el-dialog",{attrs:{title:"新建课程",width:"700px",visible:t.showDialog},on:{close:t.resetForm,"update:visible":function(e){t.showDialog=e}}},[a("lesson-form",{ref:"lessonForm",on:{onsuccess:t.refreshData}})],1)],1)},o=[],r=a("2934"),s=a("8897"),i=a("aa3c"),c={data:function(){return{action:r["c"],data:[],loading:!1,total:0,key:"",showDialog:!1,page:1}},components:{lessonForm:i["a"]},computed:{imgData:function(){return{media_type:1}}},methods:{publish:function(t){var e=this;Object(s["k"])(t.id).then(function(){e.$message.success("发布课程成功"),e.fetchData()}).catch(function(t){e.$message.error(t.message)})},refreshData:function(){this.fetchData(),this.showDialog=!1},resetForm:function(){this.$refs.lessonForm.reset()},gotoAdd:function(){this.showDialog=!0},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading||(this.loading=!0,Object(s["i"])({page:t||this.page||1}).then(function(t){e.data=t.data,e.total=t.total}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loading=!1}))},deleteLesson:function(t){var e=this;this.$confirm("此操作将永久删除该课程, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s["d"])(t).then(function(){if(e.$message.success("删除课程成功"),1===e.data.length){var t=e.page-1;e.page=t>=1?t:1}e.fetchData()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},gotoEdit:function(t){this.$router.push({name:"lesson-detail",params:{id:t.id}})}},created:function(){this.fetchData()}},l=c,u=(a("1ea2"),a("2877")),f=Object(u["a"])(l,n,o,!1,null,"02ed184d",null);e["default"]=f.exports},8897:function(t,e,a){"use strict";a.d(e,"k",function(){return o}),a.d(e,"i",function(){return r}),a.d(e,"h",function(){return s}),a.d(e,"g",function(){return i}),a.d(e,"d",function(){return c}),a.d(e,"b",function(){return l}),a.d(e,"m",function(){return u}),a.d(e,"f",function(){return f}),a.d(e,"e",function(){return m}),a.d(e,"a",function(){return d}),a.d(e,"l",function(){return g}),a.d(e,"c",function(){return h}),a.d(e,"j",function(){return p});var n=a("a9bf");function o(t){return n["a"].put("/lesson/list/pub/".concat(t))}function r(t){return n["a"].get("/lesson/list",{params:t})}function s(t){return n["a"].get("/lesson/list/".concat(t))}function i(){return n["a"].get("/lesson/category")}function c(t){return n["a"].delete("/lesson/list/".concat(t))}function l(t){return n["a"].post("/lesson/list",t)}function u(t,e){return n["a"].put("/lesson/list/".concat(t),e)}function f(t,e){return n["a"].get("/lesson/catalog/".concat(t),{params:e})}function m(t,e){return n["a"].get("/lesson/catalog/".concat(t,"/").concat(e))}function d(t,e){return n["a"].post("/lesson/catalog/".concat(t),e)}function g(t,e,a){return n["a"].put("/lesson/catalog/".concat(t,"/").concat(e),a)}function h(t,e){return n["a"].delete("/lesson/catalog/".concat(t,"/").concat(e))}function p(t){return n["a"].post("/pdf2png",t)}},a158:function(t,e,a){"use strict";var n=a("2582"),o=a.n(n);o.a},aa3c:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDetail,expression:"loadingDetail"}],staticClass:"lesson-form"},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"课程名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入课程名称",maxlength:"50"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"===typeof e?e.trim():e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"课程分类",prop:"category"}},[a("el-select",{attrs:{placeholder:"请选择课程分类"},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}},t._l(t.options,function(t){return a("el-option",{key:t.categoryId,attrs:{label:t.categoryName,value:t.categoryId}})}),1)],1),a("el-form-item",{attrs:{label:"讲师名称",prop:"lector"}},[a("el-input",{attrs:{placeholder:"请输入讲师名称",maxlength:"50"},model:{value:t.form.lector,callback:function(e){t.$set(t.form,"lector","string"===typeof e?e.trim():e)},expression:"form.lector"}})],1),a("el-form-item",{attrs:{label:"课程图片",prop:"img"}},[a("img-loader",{attrs:{httpRequest:t.customUpload,action:""},model:{value:t.form.imgUrl,callback:function(e){t.$set(t.form,"imgUrl",e)},expression:"form.imgUrl"}})],1),a("el-form-item",{attrs:{label:"课程简介",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入课程简介",autosize:{minRows:3,maxRows:6},maxlength:500},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc","string"===typeof e?e.trim():e)},expression:"form.desc"}})],1)],1),a("div",{staticClass:"submit-btn"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.save}},[t._v("保存")])],1)],1)},o=[],r=(a("96cf"),a("3b8d")),s=a("cebc"),i=a("2934"),c=a("8897"),l=a("054f"),u={data:function(){return{action:i["c"],imgData:{media_type:1},form:{id:1,img:"",imgUrl:"",name:"",category:"",number:"",lector:"",desc:""},rules:{name:{message:"课程名称不能为空",required:!0,trigger:["blur"]},category:{message:"请至少选择一个课程分类",required:!0,trigger:["blur"]},lector:{message:"讲师名称不能为空",required:!0,trigger:["blur"]},img:{message:"课程图片不能为空",required:!0,trigger:["blur","change"]}},options:[{categoryId:1,categoryName:""}],loadingDetail:!1,btnloading:!1,fileData:{}}},methods:{setImgurl:function(t){var e=this,a=new FileReader;a.readAsDataURL(t),a.onload=function(){e.form.imgUrl=a.result}},update:function(t,e){this.fileData=Object(s["a"])({},this.fileData,t),"completed"===t.status?(this.$message.success("上传图片成功"),this.setImgurl(e.file),this.form.img=this.fileData.key):"error"===t.status&&this.$message.error("图片上传失败")},customUpload:function(t){this.fileData={file:t.file},Object(l["b"])(this.fileData,this.update)},save:function(){var t=this;this.$refs.form.validate(function(e){if(e){if(t.btnloading)return;t.btnloading=!0,t.$route.params.id?Object(c["m"])(t.$route.params.id,t.form).then(function(){t.$message.success("编辑成功"),t.$emit("onsuccess")}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1}):Object(c["b"])(t.form).then(function(){t.$message.success("添加成功"),t.$emit("onsuccess")}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1})}})},fetchDetail:function(){var t=this;this.loadingDetail||(this.loadingDetail=!0,Object(c["h"])(this.$route.params.id).then(function(e){t.form=Object(s["a"])({},e,{imgUrl:e.img,img:e.img_media_id}),e.category_id&&t.$set(t.form,"category",e.category_id),t.$refs.form.clearValidate()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.loadingDetail=!1}))},reset:function(){this.$refs.form&&this.$refs.form.resetFields()}},created:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(c["g"])();case 3:e=t.sent,this.options=e,this.$route.params.id&&this.fetchDetail(),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),this.$message.error(t.t0.message);case 11:case"end":return t.stop()}},t,this,[[0,8]])}));function e(){return t.apply(this,arguments)}return e}()},f=u,m=(a("a158"),a("2877")),d=Object(m["a"])(f,n,o,!1,null,"0a0172ca",null);e["a"]=d.exports},ec70:function(t,e,a){}}]);
//# sourceMappingURL=chunk-69deb26a.982b2f5e.js.map