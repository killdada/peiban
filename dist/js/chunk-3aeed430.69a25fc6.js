(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3aeed430"],{"12fb":function(t,e,a){"use strict";var n=a("d8ee"),o=a.n(n);o.a},"4a58":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-Category-list"},[a("header",[a("div",{staticClass:"tips"},[t._v("\n            排序设定会影响在app端的展示顺序。排序规则,大的排前面，如果排序值一样，时间距离当前最近的排前面\n        ")]),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:t.gotoAdd}},[t._v("新增")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data}},[a("el-table-column",{attrs:{type:"index","label-class-name":"index-col","class-name":"index-col",label:"序号",width:"70"}}),a("el-table-column",{attrs:{prop:"name","min-width":"200",label:"名称"}}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.statusMap[e.row.status]))]}}])}),a("el-table-column",{attrs:{prop:"sort_val",label:"排序"}}),a("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.gotoEdit(e.row)}}},[t._v("编辑")]),0===e.row.status||2===e.row.status?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.publish(e.row)}}},[t._v("发布")]):t._e(),1===e.row.status?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.down(e.row)}}},[t._v("下架")]):t._e(),a("el-button",{staticClass:"delete",attrs:{type:"text"},on:{click:function(a){return t.deleteCategory(e.row.id)}}},[t._v("删除")])]}}])})],1),a("page-pagination",{attrs:{pageSize:10,total:t.total},on:{currentChange:t.handleCurrentChange}}),a("el-dialog",{attrs:{title:t.id?"编辑分类":"新建分类",width:"700px",visible:t.showDialog},on:{close:t.reset,"update:visible":function(e){t.showDialog=e}}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDetail,expression:"loadingDetail"}],staticClass:"Category-form"},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入分类名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"===typeof e?e.trim():e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"排序",prop:"sort_val"}},[a("el-input-number",{attrs:{min:1,label:"请输入排序"},model:{value:t.form.sort_val,callback:function(e){t.$set(t.form,"sort_val",e)},expression:"form.sort_val"}})],1)],1),a("div",{staticClass:"submit-btn"},[a("el-button",{attrs:{type:"primary",loading:t.btnloading,size:"medium"},on:{click:t.save}},[t._v("保存")])],1)],1)])],1)},o=[],i=a("a9bf");function s(t){return i["a"].get("/category",{params:t})}function r(t){return i["a"].get("/category/".concat(t))}function l(t){return i["a"].delete("/category/".concat(t))}function c(t){return i["a"].post("/category",t)}function u(t,e){return i["a"].put("/category/".concat(t),e)}function f(t){return i["a"].put("/category/publish/".concat(t))}function d(t){return i["a"].put("/category/down/".concat(t))}var g={data:function(){return{data:[],loading:!1,total:0,key:"",showDialog:!1,id:"",form:{name:"",sort_val:""},rules:{name:{message:"分类名称不能为空",required:!0,trigger:["blur"]},sort_val:{message:"排序不能为空",required:!0,trigger:["blur"]}},loadingDetail:!1,btnloading:!1,page:1,statusMap:{0:"待发布",1:"已发布",2:"已下架"}}},components:{},methods:{publish:function(t){var e=this;this.$confirm("请确认该分类下是否已经编辑好课程?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){f(t.id).then(function(){e.$message.success("发布分类成功"),e.fetchData()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},down:function(t){var e=this;d(t.id).then(function(){e.$message.success("下架分类成功"),e.fetchData()}).catch(function(t){e.$message.error(t.message)})},refreshData:function(){this.fetchData(),this.showDialog=!1},gotoAdd:function(){this.showDialog=!0,this.id=""},handleCurrentChange:function(t){this.page=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading||(this.loading=!0,s({page:t||this.page||1}).then(function(t){e.data=t.data,e.total=t.total}).catch(function(t){e.$message.error(t.message)}).finally(function(){e.loading=!1}))},deleteCategory:function(t){var e=this;this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l(t).then(function(){if(e.$message.success("删除分类成功"),1===e.data.length){var t=e.page-1;e.page=t>=1?t:1}e.fetchData()}).catch(function(t){e.$message.error(t.message)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},gotoEdit:function(t){this.showDialog=!0,this.id=t.id,this.fetchDetail()},beforeUpload:function(){},onUploadSuccess:function(t){200===t.code?(this.form.imgUrl=t.data.media_real_url,this.form.img=t.data.media_id,this.$message.success("上传图片成功")):this.$message.error("图片上传失败：".concat(t.msg))},onUploadError:function(){this.$message.error("图片上传失败")},save:function(){var t=this;this.$refs.form.validate(function(e){if(e){if(t.btnloading)return;t.btnloading=!0,t.id?u(t.id,t.form).then(function(){t.$message.success("保存成功"),t.showDialog=!1,t.fetchData()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1}):c(t.form).then(function(){t.$message.success("添加成功"),t.showDialog=!1,t.fetchData()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.btnloading=!1})}})},fetchDetail:function(){var t=this;this.loadingDetail||(this.loadingDetail=!0,r(this.id).then(function(e){t.form=e,t.$refs.form.clearValidate()}).catch(function(e){t.$message.error(e.message)}).finally(function(){t.loadingDetail=!1}))},reset:function(){this.$refs.form&&this.$refs.form.resetFields()}},created:function(){this.fetchData()}},m=g,h=(a("12fb"),a("2877")),p=Object(h["a"])(m,n,o,!1,null,"642c2884",null);e["default"]=p.exports},d8ee:function(t,e,a){}}]);
//# sourceMappingURL=chunk-3aeed430.69a25fc6.js.map