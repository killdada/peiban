(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0bd7161e"],{"15fd":function(t,e,i){"use strict";function a(t,e){if(null==t)return{};var i,a,n={},o=Object.keys(t);for(a=0;a<o.length;a++)i=o[a],e.indexOf(i)>=0||(n[i]=t[i]);return n}function n(t,e){if(null==t)return{};var i,n,o=a(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(o[i]=t[i])}return o}i.d(e,"a",(function(){return n}))},"1b87":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-lesson-list"},[i("header",[i("div"),i("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:t.gotoAdd}},[t._v("新增")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data}},[i("el-table-column",{attrs:{width:"150",label:"轮播图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{attrs:{src:t.row.img_media_url,width:"100",height:"100",alt:""}})]}}])}),i("el-table-column",{attrs:{prop:"course_name","min-width":"200",label:"所属课程"}}),i("el-table-column",{attrs:{prop:"category_name",label:"所属分类"}}),i("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.gotoEdit(e.row)}}},[t._v("编辑")]),i("el-button",{staticClass:"delete",attrs:{type:"text"},on:{click:function(i){return t.deleteLesson(e.row.id)}}},[t._v("删除")])]}}])})],1),i("el-dialog",{attrs:{title:t.id?"编辑轮播":"新建轮播",width:"700px",visible:t.showDialog},on:{close:t.resetForm,"update:visible":function(e){t.showDialog=e}}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDetail,expression:"loadingDetail"}],staticClass:"lesson-form"},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"所属课程",prop:"course_id"}},[i("el-select",{attrs:{placeholder:"请选择课程分类"},model:{value:t.form.course_id,callback:function(e){t.$set(t.form,"course_id",e)},expression:"form.course_id"}},t._l(t.options,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),i("el-form-item",{attrs:{label:"轮播图",prop:"img_media_id"}},[i("img-loader",{attrs:{action:"",httpRequest:t.customUpload},model:{value:t.form.img_url,callback:function(e){t.$set(t.form,"img_url",e)},expression:"form.img_url"}})],1)],1),i("div",{staticClass:"submit-btn"},[i("el-button",{attrs:{type:"primary",loading:t.btnloading,size:"medium"},on:{click:t.save}},[t._v("保存")])],1)],1)])],1)},n=[],o=(i("8e6e"),i("ac6a"),i("456d"),i("15fd")),r=i("ade3"),s=i("2934"),l=i("a9bf");function c(t){return l["a"].get("/carouse",{params:t})}function u(t){return l["a"].get("/carouse/".concat(t))}function f(t){return l["a"].delete("/carouse/".concat(t))}function d(t){return l["a"].post("/carouse",t)}function m(t,e){return l["a"].put("/carouse/".concat(t),e)}var g=i("054f"),h=["img_url"];function p(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function b(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?p(Object(i),!0).forEach((function(e){Object(r["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):p(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var v={img_media_id:"",img_url:"",course_id:""},y={data:function(){return{data:[],loading:!1,total:0,key:"",showDialog:!1,imgData:{media_type:1},id:"",form:b({},v),rules:{course_id:{message:"请至少选择一个课程分类",required:!0,trigger:["blur"]},img_media_id:{message:"轮播图片不能为空",required:!0,trigger:["blur","change"]}},options:[{categoryId:1,categoryName:""}],loadingDetail:!1,btnloading:!1,page:1,fileData:{}}},components:{},methods:{refreshData:function(){this.fetchData(),this.showDialog=!1},gotoAdd:function(){this.showDialog=!0,this.id="",this.resetForm()},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading||(this.loading=!0,c({page:t||this.page||1}).then((function(t){e.data=t})).catch((function(t){e.$message.error(t.message)})).finally((function(){e.loading=!1})))},deleteLesson:function(t){var e=this;this.$confirm("此操作将永久删除该轮播图片, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){f(t).then((function(){if(e.$message.success("删除轮播成功"),1===e.data.length){var t=e.page-1;e.page=t>=1?t:1}e.fetchData()})).catch((function(t){e.$message.error(t.message)}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},gotoEdit:function(t){this.showDialog=!0,this.id=t.id,this.fetchDetail()},setImgurl:function(t){var e=this,i=new FileReader;i.readAsDataURL(t),i.onload=function(){e.form.img_url=i.result}},update:function(t,e){this.fileData=b(b({},this.fileData),t),"completed"===t.status?(this.$message.success("上传图片成功"),this.setImgurl(e.file),this.form.img_media_id=this.fileData.key):"error"===t.status&&this.$message.error("图片上传失败")},customUpload:function(t){this.fileData={file:t.file},Object(g["b"])(this.fileData,this.update)},save:function(){var t=this;this.$refs.form.validate((function(e){if(e){if(t.btnloading)return;t.btnloading=!0;var i=t.form,a=(i.img_url,Object(o["a"])(i,h));t.id?m(t.id,a).then((function(){t.$message.success("编辑成功"),t.fetchData(),t.showDialog=!1})).catch((function(e){t.$message.error(e.message)})).finally((function(){t.btnloading=!1})):d(a).then((function(){t.$message.success("添加成功"),t.fetchData(),t.showDialog=!1})).catch((function(e){t.$message.error(e.message)})).finally((function(){t.btnloading=!1}))}}))},fetchDetail:function(){var t=this;this.loadingDetail||(this.loadingDetail=!0,u(this.id).then((function(e){t.form=b({},e),t.$refs.form.clearValidate()})).catch((function(e){t.$message.error(e.message)})).finally((function(){t.loadingDetail=!1})))},resetForm:function(){this.$refs.form&&this.$refs.form.resetFields(),this.form=b({},v)}},created:function(){var t=this;this.fetchData(),Object(s["a"])().then((function(e){t.options=e})).catch((function(e){t.$message.error(e.message)}))}},D=y,w=(i("f86e"),i("2877")),_=Object(w["a"])(D,a,n,!1,null,"33be8fd3",null);e["default"]=_.exports},c700:function(t,e,i){},f86e:function(t,e,i){"use strict";i("c700")}}]);
//# sourceMappingURL=chunk-0bd7161e.5806e501.js.map