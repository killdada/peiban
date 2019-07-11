(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afb10c44"],{"1b87":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-lesson-list"},[a("header",[a("div"),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:t.gotoAdd}},[t._v("新增")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data}},[a("el-table-column",{attrs:{type:"index","label-class-name":"index-col","class-name":"index-col",label:"序号",width:"70"}}),a("el-table-column",{attrs:{width:"150",label:"轮播图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.img_media_url,width:"100",height:"100",alt:""}})]}}])}),a("el-table-column",{attrs:{prop:"course_name","min-width":"200",label:"所属课程"}}),a("el-table-column",{attrs:{prop:"category_name",label:"所属分类"}}),a("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.gotoEdit(e.row)}}},[t._v("编辑")]),a("el-button",{staticClass:"delete",attrs:{type:"text"},on:{click:function(a){return t.deleteLesson(e.row.id)}}},[t._v("删除")])]}}])})],1),a("page-pagination",{attrs:{total:t.total},on:{currentChange:t.handleCurrentChange}}),a("el-dialog",{attrs:{title:t.id?"编辑轮播":"新建轮播",width:"700px",visible:t.showDialog},on:{close:t.resetForm,"update:visible":function(e){t.showDialog=e}}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDetail,expression:"loadingDetail"}],staticClass:"lesson-form"},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"所属课程",prop:"course_id"}},[a("el-select",{attrs:{placeholder:"请选择课程分类"},model:{value:t.form.course_id,callback:function(e){t.$set(t.form,"course_id",e)},expression:"form.course_id"}},t._l(t.options,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),a("el-form-item",{attrs:{label:"轮播图",prop:"img_media_id"}},[a("img-loader",{attrs:{action:"",httpRequest:t.customUpload},model:{value:t.form.img_url,callback:function(e){t.$set(t.form,"img_url",e)},expression:"form.img_url"}})],1)],1),a("div",{staticClass:"submit-btn"},[a("el-button",{attrs:{type:"primary",loading:t.btnloading,size:"medium"},on:{click:t.save}},[t._v("保存")])],1)],1)])],1)},n=[],o=a("cebc"),s=a("2934"),r=a("a9bf");function l(t){return r["a"].get("/carouse",{params:t})}function c(t){return r["a"].get("/carouse/".concat(t))}function u(t){return r["a"].delete("/carouse/".concat(t))}function f(t){return r["a"].post("/carouse",t)}function d(t,e){return r["a"].put("/carouse/".concat(t),e)}var m=a("054f"),g={img_media_id:"",img_url:"",course_id:""},h={data:function(){return{data:[],loading:!1,total:0,key:"",showDialog:!1,imgData:{media_type:1},id:"",form:Object(o["a"])({},g),rules:{course_id:{message:"请至少选择一个课程分类",required:!0,trigger:["blur"]},img_media_id:{message:"轮播图片不能为空",required:!0,trigger:["blur","change"]}},options:[{categoryId:1,categoryName:""}],loadingDetail:!1,btnloading:!1,page:1,fileData:{}}},components:{},methods:{refreshData:function(){this.fetchData(),this.showDialog=!1},gotoAdd:function(){this.showDialog=!0,this.id="",this.resetForm()},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading||(this.loading=!0,l({page:t||this.page||1}).then(function(t){e.data=t.data,e.total=t.total}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loading=!1}))},deleteLesson:function(t){var e=this;this.$confirm("此操作将永久删除该轮播图片, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){u(t).then(function(){if(e.$message.success("删除轮播成功"),1===e.data.length){var t=e.page-1;e.page=t>=1?t:1}e.fetchData()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},gotoEdit:function(t){this.showDialog=!0,this.id=t.id,this.fetchDetail()},setImgurl:function(t){var e=this,a=new FileReader;a.readAsDataURL(t),a.onload=function(){e.form.img_url=a.result}},update:function(t,e){this.fileData=Object(o["a"])({},this.fileData,t),"completed"===t.status?(this.$message.success("上传图片成功"),this.setImgurl(e.file),this.form.img_media_id=this.fileData.key):"error"===t.status&&this.$message.error("图片上传失败")},customUpload:function(t){this.fileData={file:t.file},Object(m["b"])(this.fileData,this.update)},save:function(){var t=this;this.$refs.form.validate(function(e){if(e){if(t.btnloading)return;t.btnloading=!0,t.id?d(t.id,t.form).then(function(){t.$message.success("编辑成功"),t.fetchData(),t.showDialog=!1}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1}):f(Object(o["a"])({},t.form)).then(function(){t.$message.success("添加成功"),t.fetchData(),t.showDialog=!1}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1})}})},fetchDetail:function(){var t=this;this.loadingDetail||(this.loadingDetail=!0,c(this.id).then(function(e){t.form=Object(o["a"])({},e),t.$refs.form.clearValidate()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.loadingDetail=!1}))},resetForm:function(){this.$refs.form&&this.$refs.form.resetFields(),this.form=Object(o["a"])({},g)}},created:function(){var t=this;this.fetchData(),Object(s["a"])().then(function(e){t.options=e}).catch(function(e){t.$message.error(e.message)})}},p=h,b=(a("7e31"),a("2877")),v=Object(b["a"])(p,i,n,!1,null,"4c93e53a",null);e["default"]=v.exports},"7e31":function(t,e,a){"use strict";var i=a("f348"),n=a.n(i);n.a},f348:function(t,e,a){}}]);
//# sourceMappingURL=chunk-afb10c44.94dbee2d.js.map