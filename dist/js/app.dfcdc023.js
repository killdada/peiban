(function(e){function n(n){for(var r,a,u=n[0],i=n[1],s=n[2],l=0,f=[];l<u.length;l++)a=u[l],c[a]&&f.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(n);while(f.length)f.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var u=t[a];0!==c[u]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-37e8032d":"e77ec0ab","chunk-3f7bc161":"cd54f452","chunk-19074ea6":"5f4d055a","chunk-3ff5cc3e":"f45a1d74","chunk-5ed7c078":"fc4e814f","chunk-04dbe32a":"0f70f222","chunk-27aba920":"e80e8dc6","chunk-2e06d24e":"3e617a46","chunk-5a098414":"0ff1176a","chunk-6f00a145":"d79bc48e","chunk-660d03d3":"b1ba5aa5","chunk-a364cf78":"b0722eac"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-37e8032d":1,"chunk-19074ea6":1,"chunk-3ff5cc3e":1,"chunk-04dbe32a":1,"chunk-27aba920":1,"chunk-2e06d24e":1,"chunk-5a098414":1,"chunk-6f00a145":1,"chunk-660d03d3":1,"chunk-a364cf78":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise(function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-37e8032d":"772e47a4","chunk-3f7bc161":"31d6cfe0","chunk-19074ea6":"9c47a90b","chunk-3ff5cc3e":"4145c1e9","chunk-5ed7c078":"31d6cfe0","chunk-04dbe32a":"32b32f11","chunk-27aba920":"adbefbe8","chunk-2e06d24e":"b1e3446f","chunk-5a098414":"e9bb174a","chunk-6f00a145":"0b432183","chunk-660d03d3":"96d97e93","chunk-a364cf78":"c11df8f7"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return n()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===r||l===c)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],d.parentNode.removeChild(d),t(o)},d.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(d)}).then(function(){a[e]=0}));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(function(n,t){r=c[e]=[n,t]});n.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e),s=function(n){l.onerror=l.onload=null,clearTimeout(f);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src,o=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");o.type=r,o.request=a,t[1](o)}c[e]=void 0}};var f=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var f=0;f<s.length;f++)n(s[f]);var d=l;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"2f4d":function(e,n,t){},"52f9":function(e,n,t){"use strict";function r(){var e=!0,n="http://120.24.48.163:7050/api/v1/backend";if(!e)return n;var t=window.location.host;return-1===t.indexOf("7051")&&(n="/api/v1/backend"),n}t.d(n,"a",function(){return r})},5364:function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("7f7f"),t("cadf"),t("551c"),t("f751"),t("097d");var r=t("a026"),a=(t("8e6e"),t("ac6a"),t("456d"),t("bd86")),c=t("2f62"),o={state:{},mutations:{},actions:{},getters:{}},u=o;function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(t,!0).forEach(function(n){Object(a["a"])(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}r["default"].use(c["a"]);var l=new c["a"].Store(s({},u,{strict:!1,modules:{}})),f=l,d=t("a78e"),h=t.n(d),m=t("34b1"),p={install:function(e){}},b=(t("5364"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.isLogin?t("el-container",{staticClass:"header-center",attrs:{id:"app"}},[t("el-header",{attrs:{height:"70px"}},[t("ui-header")],1),t("el-main",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[t("router-view")],1)],1):t("div",{attrs:{id:"app"}},[t("router-view")],1)}),g=[],k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"page-header"},[t("router-link",{attrs:{to:{name:"lesson"}}},[t("div",{staticClass:"img"}),t("div",{staticClass:"page-header-name"},[t("span",{staticClass:"line"},[e._v("|")]),e._v("\n      管理后台\n    ")])]),t("ul",{staticClass:"header-left"}),t("ul",{staticClass:"header-right"},[t("dropdown-menu",{attrs:{placement:"bottom-end",trigger:"hover",hide:e.keepMenu},model:{value:e.menuStatus.top,callback:function(n){e.$set(e.menuStatus,"top",n)},expression:"menuStatus.top"}},[t("li",{staticStyle:{width:"auto","min-width":"120px"},attrs:{slot:"reference"},slot:"reference"},[t("span",[e._v("\n          "+e._s(e.account)+"\n          "),t("i",{staticClass:"el-icon-arrow-down el-icon--right"})])]),t("ul",{on:{mouseover:function(n){e.menuStatus.hover=!0},mouseleave:function(n){e.menuStatus.hover=!1}}},[t("li",{staticClass:"btn-danger",on:{click:e.logout}},[e._v("退出账号")])])])],1)],1)},v=[],y=t("7ded"),S={name:"Header",data:function(){return{menuStatus:{top:!1,hover:!1,role:!1},account:""}},created:function(){this.fetchData()},methods:{fetchData:function(){this.account=localStorage.getItem("username")||h.a.get("user_name")},keepMenu:function(){var e=this;this.menuStatus.top=this.menuStatus.top||this.menuStatus.role,this.menuStatus.role&&(this.menuStatus.role=!1,this.$nextTick(function(){e.menuStatus.role=!0}))},closeMenu:function(){var e=this;this.$nextTick(function(){e.menuStatus.hover||e.menuStatus.role||(e.menuStatus.top=!1)})},logout:function(){var e=this;this.$confirm("您是否确认退出？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(y["a"])().then(function(){h.a.remove("token"),location.reload()})}).catch(function(){e.$message.info("已取消")})}}},w=S,O=(t("fb5a"),t("2877")),j=Object(O["a"])(w,k,v,!1,null,null,null),P=j.exports,_={name:"faceVenueSignin",components:{UiHeader:P},data:function(){return{loading:!1}},computed:{isLogin:function(){return h.a.get("token")?1:0}}},x=_,C=Object(O["a"])(x,b,g,!1,null,null,null),L=C.exports,T=t("8c4f");r["default"].use(T["a"]);var E=[{path:"/",name:"root",redirect:"/lesson/list"},{name:"login",path:"/login",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-19074ea6")]).then(t.bind(null,"efcf"))}},{name:"lesson",path:"/lesson",component:function(){return t.e("chunk-a364cf78").then(t.bind(null,"9261"))},redirect:"/lesson/list",meta:{requireLogin:!0},children:[{name:"lesson-list",path:"list",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-5ed7c078"),t.e("chunk-2e06d24e")]).then(t.bind(null,"829e"))},meta:{hasSideBar:!0}},{name:"lesson-detail",path:"detail/:id?",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-5ed7c078"),t.e("chunk-6f00a145")]).then(t.bind(null,"4403"))},meta:{hasSideBar:!0}},{name:"lesson-catalog-bind-ppt",path:"catalog-bind-ppt/:id?",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-5ed7c078"),t.e("chunk-04dbe32a")]).then(t.bind(null,"bf7f"))}}]},{name:"banner",path:"/banner",component:function(){return t.e("chunk-a364cf78").then(t.bind(null,"9261"))},redirect:"/banner/list",meta:{requireLogin:!0},children:[{name:"banner-list",path:"list",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-5ed7c078"),t.e("chunk-5a098414")]).then(t.bind(null,"1b87"))},meta:{hasSideBar:!0}}]},{name:"category",path:"/category",component:function(){return t.e("chunk-a364cf78").then(t.bind(null,"9261"))},redirect:"/category/list",meta:{requireLogin:!0},children:[{name:"category-list",path:"list",component:function(){return t.e("chunk-37e8032d").then(t.bind(null,"4a58"))},meta:{hasSideBar:!0}}]},{name:"practice",path:"/practice",component:function(){return t.e("chunk-a364cf78").then(t.bind(null,"9261"))},redirect:"/practice/list",meta:{requireLogin:!0},children:[{name:"practice-list",path:"list",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-3ff5cc3e")]).then(t.bind(null,"e0c3"))},meta:{hasSideBar:!0}}]},{name:"member",path:"/member",component:function(){return t.e("chunk-a364cf78").then(t.bind(null,"9261"))},redirect:"/member/list",meta:{requireLogin:!0},children:[{name:"member-list",path:"list",component:function(){return t.e("chunk-660d03d3").then(t.bind(null,"4ad6"))},meta:{hasSideBar:!0}}]},{name:"material",path:"/material",component:function(){return t.e("chunk-a364cf78").then(t.bind(null,"9261"))},redirect:"/material/manage",meta:{requireLogin:!0},children:[{name:"material-manage",path:"manage",component:function(){return Promise.all([t.e("chunk-3f7bc161"),t.e("chunk-5ed7c078"),t.e("chunk-27aba920")]).then(t.bind(null,"9694"))},meta:{hasSideBar:!0}}]}],B=new T["a"]({routes:E}),q=B;r["default"].use(m["b"]),r["default"].use(p),r["default"].config.productionTip=!1,q.beforeEach(function(e,n,t){e.matched.some(function(e){return e.meta&&e.meta.requireLogin})?h.a.get("token")?t():t({path:"/login"}):"login"===e.name&&h.a.get("token")?t({name:"lesson-list"}):t()}),new r["default"]({el:"#app",router:q,store:f,components:{App:L},template:"<App/>"})},"7ded":function(e,n,t){"use strict";t.d(n,"b",function(){return a}),t.d(n,"a",function(){return c});var r=t("a9bf");function a(e){return r["a"].post("/login",e)}function c(){return r["a"].post("/logout")}},a9bf:function(e,n,t){"use strict";var r=t("bc3a"),a=t.n(r),c=t("a78e"),o=t.n(c),u=t("52f9"),i=t("34b1"),s=Object(u["a"])(),l={},f=a.a.create({baseURL:s});f.interceptors.request.use(function(e){"get"===e.method&&(l[e.url]&&e.cancel&&l[e.url].cancel(),l[e.url]=a.a.CancelToken.source(),e.cancelToken=l[e.url].token);var n=o.a.get("token")||"";return n&&(e.url="".concat(e.url).concat(-1!==e.url.indexOf("?")?"&":"?","token=").concat(n)),e}),f.interceptors.response.use(function(e){var n=e.config;"get"===n.method&&l[n.url]&&delete l[n.url];var t=e.data;return 1010===t.code&&(o.a.remove("token"),location.reload()),200===t.code||t.result?t.data:(i["a"].$emit(String(t.code)),Promise.reject({data:t.data,message:t.msg,code:t.code,toString:function(){return this.message}}))},function(e){return e.response?(400!==e.response.status&&401!==e.response.status||(o.a.remove("token"),location.reload()),i["a"].$emit(String(e.response.status)),Promise.reject(e)):Promise.reject({message:"网络连接失败",code:-1,toString:function(){return this.message}})}),n["a"]=f},aefc:function(e,n,t){e.exports=t.p+"img/sign_app_def.79cf1d45.png"},fb5a:function(e,n,t){"use strict";var r=t("2f4d"),a=t.n(r);a.a}});
//# sourceMappingURL=app.dfcdc023.js.map