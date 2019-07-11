(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3316566"],{"1ea2":function(t,e,n){"use strict";var a=n("ec70"),o=n.n(a);o.a},"323c":function(t,e,n){},"3df3":function(t,e,n){"use strict";var a=n("323c"),o=n.n(a);o.a},"829e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-lesson-list"},[n("header",[n("div"),n("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:t.gotoAdd}},[t._v("新建课程")])],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data}},[n("el-table-column",{attrs:{type:"index","label-class-name":"index-col","class-name":"index-col",label:"序号",width:"70"}}),n("el-table-column",{attrs:{prop:"img",width:"150",label:"课程图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{attrs:{src:t.row.img,width:"100",height:"100",alt:""}})]}}])}),n("el-table-column",{attrs:{prop:"name","min-width":"200",label:"课程名称"}}),n("el-table-column",{attrs:{prop:"cateory_name",label:"所属分类"}}),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(0===e.row.status?"待发布":"已发布"))]}}])}),n("el-table-column",{attrs:{label:"课程目录数",prop:"catalog_num",width:"320"}}),n("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gotoEdit(e.row)}}},[t._v("详情")]),0===e.row.status?n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.publish(e.row)}}},[t._v("发布")]):t._e()]}}])})],1),n("page-pagination",{attrs:{total:t.total},on:{currentChange:t.handleCurrentChange}}),n("el-dialog",{attrs:{title:"新建课程",width:"700px",visible:t.showDialog},on:{close:t.resetForm,"update:visible":function(e){t.showDialog=e}}},[n("lesson-form",{ref:"lessonForm",on:{onsuccess:t.refreshData}})],1)],1)},o=[],r=n("2934"),i=n("8897"),s=n("aa3c"),c={data:function(){return{action:r["c"],data:[],loading:!1,total:0,key:"",showDialog:!1,page:1}},components:{lessonForm:s["a"]},computed:{imgData:function(){return{media_type:1}}},methods:{publish:function(t){var e=this;Object(i["k"])(t.id).then(function(){e.$message.success("发布课程成功"),e.fetchData()}).catch(function(t){e.$message.error(t.message)})},refreshData:function(){this.fetchData(),this.showDialog=!1},resetForm:function(){this.$refs.lessonForm.reset()},gotoAdd:function(){this.showDialog=!0},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading||(this.loading=!0,Object(i["i"])({page:t||this.page||1}).then(function(t){e.data=t.data,e.total=t.total}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loading=!1}))},deleteLesson:function(t){var e=this;this.$confirm("此操作将永久删除该课程, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i["d"])(t).then(function(){if(e.$message.success("删除课程成功"),1===e.data.length){var t=e.page-1;e.page=t>=1?t:1}e.fetchData()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},gotoEdit:function(t){this.$router.push({name:"lesson-detail",params:{id:t.id}})}},created:function(){this.fetchData()}},l=c,u=(n("1ea2"),n("2877")),f=Object(u["a"])(l,a,o,!1,null,"02ed184d",null);e["default"]=f.exports},8897:function(t,e,n){"use strict";n.d(e,"k",function(){return o}),n.d(e,"i",function(){return r}),n.d(e,"h",function(){return i}),n.d(e,"g",function(){return s}),n.d(e,"d",function(){return c}),n.d(e,"b",function(){return l}),n.d(e,"m",function(){return u}),n.d(e,"f",function(){return f}),n.d(e,"e",function(){return m}),n.d(e,"a",function(){return d}),n.d(e,"l",function(){return g}),n.d(e,"c",function(){return h}),n.d(e,"j",function(){return p});var a=n("a9bf");function o(t){return a["a"].put("/lesson/list/pub/".concat(t))}function r(t){return a["a"].get("/lesson/list",{params:t})}function i(t){return a["a"].get("/lesson/list/".concat(t))}function s(){return a["a"].get("/lesson/category")}function c(t){return a["a"].delete("/lesson/list/".concat(t))}function l(t){return a["a"].post("/lesson/list",t)}function u(t,e){return a["a"].put("/lesson/list/".concat(t),e)}function f(t,e){return a["a"].get("/lesson/catalog/".concat(t),{params:e})}function m(t,e){return a["a"].get("/lesson/catalog/".concat(t,"/").concat(e))}function d(t,e){return a["a"].post("/lesson/catalog/".concat(t),e)}function g(t,e,n){return a["a"].put("/lesson/catalog/".concat(t,"/").concat(e),n)}function h(t,e){return a["a"].delete("/lesson/catalog/".concat(t,"/").concat(e))}function p(t){return a["a"].post("/pdf2png",t)}},aa3c:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDetail,expression:"loadingDetail"}],staticClass:"lesson-form"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"课程名称",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入课程名称",maxlength:"50"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"===typeof e?e.trim():e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"课程分类",prop:"category"}},[n("el-select",{attrs:{placeholder:"请选择课程分类"},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}},t._l(t.options,function(t){return n("el-option",{key:t.categoryId,attrs:{label:t.categoryName,value:t.categoryId}})}),1)],1),n("el-form-item",{attrs:{label:"讲师名称",prop:"lector"}},[n("el-input",{attrs:{placeholder:"请输入讲师名称",maxlength:"50"},model:{value:t.form.lector,callback:function(e){t.$set(t.form,"lector","string"===typeof e?e.trim():e)},expression:"form.lector"}})],1),n("el-form-item",{attrs:{label:"课程图片",prop:"img"}},[n("img-loader",{attrs:{httpRequest:t.customUpload,action:""},model:{value:t.form.imgUrl,callback:function(e){t.$set(t.form,"imgUrl",e)},expression:"form.imgUrl"}})],1),n("el-form-item",{attrs:{label:"课程简介",prop:"desc"}},[n("el-input",{attrs:{type:"textarea",placeholder:"请输入课程简介",autosize:{minRows:3,maxRows:6},maxlength:500},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc","string"===typeof e?e.trim():e)},expression:"form.desc"}})],1)],1),n("div",{staticClass:"submit-btn"},[n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.save}},[t._v("保存")])],1)],1)},o=[],r=n("cebc"),i=n("2934"),s=n("8897"),c=n("054f"),l={data:function(){return{action:i["c"],imgData:{media_type:1},form:{id:1,img:"",imgUrl:"",name:"",category:"",number:"",lector:"",desc:""},rules:{name:{message:"课程名称不能为空",required:!0,trigger:["blur"]},category:{message:"请至少选择一个课程分类",required:!0,trigger:["blur"]},lector:{message:"讲师名称不能为空",required:!0,trigger:["blur"]},img:{message:"课程图片不能为空",required:!0,trigger:["blur","change"]}},options:[{categoryId:1,categoryName:""}],loadingDetail:!1,btnloading:!1,fileData:{}}},methods:{setImgurl:function(t){var e=this,n=new FileReader;n.readAsDataURL(t),n.onload=function(){e.form.imgUrl=n.result}},update:function(t,e){this.fileData=Object(r["a"])({},this.fileData,t),"completed"===t.status?(this.$message.success("上传图片成功"),this.setImgurl(e.file),this.form.img=this.fileData.key):"error"===t.status&&this.$message.error("图片上传失败")},customUpload:function(t){this.fileData={file:t.file},Object(c["b"])(this.fileData,this.update)},save:function(){var t=this;this.$refs.form.validate(function(e){if(e){if(t.btnloading)return;t.btnloading=!0,t.$route.params.id?Object(s["m"])(t.$route.params.id,t.form).then(function(){t.$message.success("编辑成功"),t.$emit("onsuccess")}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1}):Object(s["b"])(t.form).then(function(){t.$message.success("添加成功"),t.$emit("onsuccess")}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1})}})},fetchDetail:function(){var t=this;this.loadingDetail||(this.loadingDetail=!0,Object(s["h"])(this.$route.params.id).then(function(e){t.form=Object(r["a"])({},e,{imgUrl:e.img,img:e.img_media_id}),t.$refs.form.clearValidate()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.loadingDetail=!1}))},reset:function(){this.$refs.form&&this.$refs.form.resetFields()}},created:function(){var t=this;this.$route.params.id&&this.fetchDetail(),Object(s["g"])().then(function(e){t.options=e}).catch(function(e){t.$message.error(e.message)})}},u=l,f=(n("3df3"),n("2877")),m=Object(f["a"])(u,a,o,!1,null,"b455e6fe",null);e["a"]=m.exports},ec70:function(t,e,n){}}]);
//# sourceMappingURL=chunk-c3316566.4ea0e236.js.map