import Vue from "vue";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";

// 增加sentry日志
function sentryInit() {
  console.warn("sentryInit");
  Raven.config(
    // "http://9c8e69671a20487e9839550abbed8c82@sentry.yenmysoft.com.cn/4"
    "http://9c8e69671a20487e9839550abbed8c82@sentry.yenmysoft.com.cn/4"
    // "https://4f29835439354598afa07624215b6dc9@o92437.ingest.sentry.io/5374510"
  )
    .addPlugin(RavenVue, Vue)
    .install();
  Vue.config.errorHandler = function errorHandler(err) {
    console.log("err", err);
    Raven.captureException(err);
  };
}

export default sentryInit;
