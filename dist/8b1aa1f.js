(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1:function(t,e,n){"use strict";n.d(e,"d",(function(){return w})),n.d(e,"l",(function(){return x})),n.d(e,"n",(function(){return O})),n.d(e,"m",(function(){return j})),n.d(e,"f",(function(){return _})),n.d(e,"b",(function(){return $})),n.d(e,"s",(function(){return P})),n.d(e,"h",(function(){return S})),n.d(e,"i",(function(){return k})),n.d(e,"e",(function(){return C})),n.d(e,"r",(function(){return E})),n.d(e,"k",(function(){return R})),n.d(e,"t",(function(){return T})),n.d(e,"o",(function(){return N})),n.d(e,"q",(function(){return I})),n.d(e,"g",(function(){return K})),n.d(e,"c",(function(){return U})),n.d(e,"j",(function(){return F})),n.d(e,"p",(function(){return J})),n.d(e,"a",(function(){return W})),n.d(e,"v",(function(){return Y})),n.d(e,"u",(function(){return G}));n(55),n(20),n(25),n(57),n(88),n(30),n(89);var r=n(34),o=n(4),c=n(35),f=n(17),l=(n(26),n(12),n(31),n(110),n(33),n(108),n(48),n(46),n(36),n(37),n(56),n(19),n(49),n(142),n(196),n(277),n(76),n(121),n(326),n(40),n(47),n(2)),h=n(18);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}function v(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,f=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){f=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(f)throw o}}}}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e;return void 0===t[n]&&(t[n]=0),t[n]++}}function x(t){l.a.config.errorHandler&&l.a.config.errorHandler(t)}function O(t){return t.then((function(t){return t.default||t}))}function j(t){return t.$options&&"function"==typeof t.$options.fetch&&!t.$options.fetch.length}function _(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=t.$children||[],o=v(r);try{for(o.s();!(e=o.n()).done;){var c=e.value;c.$fetch?n.push(c):c.$children&&_(c,n)}}catch(t){o.e(t)}finally{o.f()}return n}function $(t,e){if(e||!t.options.__hasNuxtData){var n=t.options._originDataFn||t.options.data||function(){return{}};t.options._originDataFn=n,t.options.data=function(){var data=n.call(this,this);return this.$ssrContext&&(e=this.$ssrContext.asyncData[t.cid]),m(m({},data),e)},t.options.__hasNuxtData=!0,t._Ctor&&t._Ctor.options&&(t._Ctor.options.data=t.options.data)}}function P(t){return t.options&&t._Ctor===t||(t.options?(t._Ctor=t,t.extendOptions=t.options):(t=l.a.extend(t))._Ctor=t,!t.options.name&&t.options.__file&&(t.options.name=t.options.__file)),t}function S(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"components";return Array.prototype.concat.apply([],t.matched.map((function(t,r){return Object.keys(t[n]).map((function(o){return e&&e.push(r),t[n][o]}))})))}function k(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return S(t,e,"instances")}function C(t,e){return Array.prototype.concat.apply([],t.matched.map((function(t,n){return Object.keys(t.components).reduce((function(r,o){return t.components[o]?r.push(e(t.components[o],t.instances[o],t,o,n)):delete t.components[o],r}),[])})))}function E(t,e){return Promise.all(C(t,function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(n,r,o,c){var f,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("function"!=typeof n||n.options){t.next=11;break}return t.prev=1,t.next=4,n();case 4:n=t.sent,t.next=11;break;case 7:throw t.prev=7,t.t0=t.catch(1),t.t0&&"ChunkLoadError"===t.t0.name&&"undefined"!=typeof window&&window.sessionStorage&&(f=Date.now(),(!(l=parseInt(window.sessionStorage.getItem("nuxt-reload")))||l+6e4<f)&&(window.sessionStorage.setItem("nuxt-reload",f),window.location.reload(!0))),t.t0;case 11:return o.components[c]=n=P(n),t.abrupt("return","function"==typeof e?e(n,r,o,c):n);case 13:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e,n,r,o){return t.apply(this,arguments)}}()))}function R(t){return D.apply(this,arguments)}function D(){return(D=Object(o.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,E(e);case 4:return t.abrupt("return",m(m({},e),{},{meta:S(e).map((function(t,n){return m(m({},t.options.meta),(e.matched[n]||{}).meta)}))}));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function T(t,e){return A.apply(this,arguments)}function A(){return(A=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,c,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.context||(e.context={isStatic:!0,isDev:!1,isHMR:!1,app:e,payload:n.payload,error:n.error,base:e.router.options.base,env:{}},n.ssrContext&&(e.context.ssrContext=n.ssrContext),e.context.redirect=function(t,path,n){if(t){e.context._redirected=!0;var o=Object(r.a)(path);if("number"==typeof t||"undefined"!==o&&"object"!==o||(n=path||{},path=t,o=Object(r.a)(path),t=302),"object"===o&&(path=e.router.resolve(path).route.fullPath),!/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path))throw path=Object(h.f)(path,n),window.location.replace(path),new Error("ERR_REDIRECT");e.context.next({path:path,query:n,status:t})}},e.context.nuxtState=window.__NUXT__),t.next=3,Promise.all([R(n.route),R(n.from)]);case 3:o=t.sent,c=Object(f.a)(o,2),l=c[0],d=c[1],n.route&&(e.context.route=l),n.from&&(e.context.from=d),e.context.next=n.next,e.context._redirected=!1,e.context._errored=!1,e.context.isHMR=!1,e.context.params=e.context.route.params||{},e.context.query=e.context.route.query||{};case 15:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function N(t,e){return!t.length||e._redirected||e._errored?Promise.resolve():I(t[0],e).then((function(){return N(t.slice(1),e)}))}function I(t,e){var n;return(n=2===t.length?new Promise((function(n){t(e,(function(t,data){t&&e.error(t),n(data=data||{})}))})):t(e))&&n instanceof Promise&&"function"==typeof n.then?n:Promise.resolve(n)}function K(base,t){if("hash"===t)return window.location.hash.replace(/^#\//,"");base=decodeURI(base).slice(0,-1);var path=decodeURI(window.location.pathname);base&&path.startsWith(base)&&(path=path.slice(base.length));var e=(path||"/")+window.location.search+window.location.hash;return Object(h.d)(e)}function U(t,e){return function(t,e){for(var n=new Array(t.length),i=0;i<t.length;i++)"object"===Object(r.a)(t[i])&&(n[i]=new RegExp("^(?:"+t[i].pattern+")$",z(e)));return function(e,r){for(var path="",data=e||{},o=(r||{}).pretty?H:encodeURIComponent,c=0;c<t.length;c++){var f=t[c];if("string"!=typeof f){var l=data[f.name||"pathMatch"],h=void 0;if(null==l){if(f.optional){f.partial&&(path+=f.prefix);continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(Array.isArray(l)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(h=o(l[d]),!n[c].test(h))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(h)+"`");path+=(0===d?f.prefix:f.delimiter)+h}}else{if(h=f.asterisk?L(l):o(l),!n[c].test(h))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+h+'"');path+=f.prefix+h}}else path+=f}return path}}(function(t,e){var n,r=[],o=0,c=0,path="",f=e&&e.delimiter||"/";for(;null!=(n=M.exec(t));){var l=n[0],h=n[1],d=n.index;if(path+=t.slice(c,d),c=d+l.length,h)path+=h[1];else{var m=t[c],v=n[2],y=n[3],w=n[4],x=n[5],O=n[6],j=n[7];path&&(r.push(path),path="");var _=null!=v&&null!=m&&m!==v,$="+"===O||"*"===O,P="?"===O||"*"===O,S=n[2]||f,pattern=w||x;r.push({name:y||o++,prefix:v||"",delimiter:S,optional:P,repeat:$,partial:_,asterisk:Boolean(j),pattern:pattern?B(pattern):j?".*":"[^"+X(S)+"]+?"})}}c<t.length&&(path+=t.substr(c));path&&r.push(path);return r}(t,e),e)}function F(t,e){var n={},r=m(m({},t),e);for(var o in r)String(t[o])!==String(e[o])&&(n[o]=!0);return n}function J(t){var e;if(t.message||"string"==typeof t)e=t.message||t;else try{e=JSON.stringify(t,null,2)}catch(n){e="[".concat(t.constructor.name,"]")}return m(m({},t),{},{message:e,statusCode:t.statusCode||t.status||t.response&&t.response.status||500})}window.onNuxtReadyCbs=[],window.onNuxtReady=function(t){window.onNuxtReadyCbs.push(t)};var M=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function H(t,e){var n=e?/[?#]/g:/[/?#]/g;return encodeURI(t).replace(n,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}function L(t){return H(t,!0)}function X(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function B(t){return t.replace(/([=!:$/()])/g,"\\$1")}function z(t){return t&&t.sensitive?"":"i"}function W(t,e,n){t.$options[e]||(t.$options[e]=[]),t.$options[e].includes(n)||t.$options[e].push(n)}var Y=h.c;h.h,h.b;function G(t){try{window.history.scrollRestoration=t}catch(t){}}},153:function(t,e,n){"use strict";e.a={}},259:function(t,e){},260:function(t,e,n){"use strict";var r=n(4),o=(n(26),n(33),n(12),n(87),n(2)),c=n(1),f=window.__NUXT__;function l(){if(!this._hydrated)return this.$fetch()}function h(){if((t=this).$vnode&&t.$vnode.elm&&t.$vnode.elm.dataset&&t.$vnode.elm.dataset.fetchKey){var t;this._hydrated=!0,this._fetchKey=this.$vnode.elm.dataset.fetchKey;var data=f.fetch[this._fetchKey];if(data&&data._error)this.$fetchState.error=data._error;else for(var e in data)o.a.set(this.$data,e,data[e])}else d.call(this)}function d(){var t=!1!==this.$options.fetchOnServer;if("function"==typeof this.$options.fetchOnServer&&(t=!1!==this.$options.fetchOnServer.call(this)),t&&!this.$nuxt.isPreview&&this.$nuxt._pagePayload){this._hydrated=!0;var e=this.$options._scopeId||this.$options.name||"",n=Object(c.d)(this.$nuxt._fetchCounters,e);if("function"==typeof this.$options.fetchKey)this._fetchKey=this.$options.fetchKey.call(this,n);else{var r="string"==typeof this.$options.fetchKey?this.$options.fetchKey:e;this._fetchKey=r?r+":"+n(r):String(n(r))}var data=this.$nuxt._pagePayload.fetch[this._fetchKey];if(data&&data._error)this.$fetchState.error=data._error;else if(data)for(var f in data)o.a.set(this.$data,f,data[f]);else this.$fetch()}}function m(){var t=this;return this._fetchPromise||(this._fetchPromise=v.call(this).then((function(){delete t._fetchPromise}))),this._fetchPromise}function v(){return y.apply(this,arguments)}function y(){return(y=Object(r.a)(regeneratorRuntime.mark((function t(){var e,n,r,o=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.$nuxt.nbFetching++,this.$fetchState.pending=!0,this.$fetchState.error=null,this._hydrated=!1,e=null,n=Date.now(),t.prev=6,t.next=9,this.$options.fetch.call(this);case 9:t.next=15;break;case 11:t.prev=11,t.t0=t.catch(6),e=Object(c.p)(t.t0);case 15:if(!((r=this._fetchDelay-(Date.now()-n))>0)){t.next=19;break}return t.next=19,new Promise((function(t){return setTimeout(t,r)}));case 19:this.$fetchState.error=e,this.$fetchState.pending=!1,this.$fetchState.timestamp=Date.now(),this.$nextTick((function(){return o.$nuxt.nbFetching--}));case 23:case"end":return t.stop()}}),t,this,[[6,11]])})))).apply(this,arguments)}e.a={beforeCreate:function(){Object(c.m)(this)&&(this._fetchDelay="number"==typeof this.$options.fetchDelay?this.$options.fetchDelay:200,o.a.util.defineReactive(this,"$fetchState",{pending:!1,error:null,timestamp:Date.now()}),this.$fetch=m.bind(this),Object(c.a)(this,"created",h),Object(c.a)(this,"beforeMount",l))}}},261:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));n(12),n(33),n(87);var r={},o={},c={};function f(t,e){if(r[t])return Promise.resolve(r[t]);if(c[t])return Promise.reject(c[t]);if(o[t])return o[t];var n,f,l=o[t]=new Promise((function(t,e){n=t,f=e}));delete r[t];var h,script=document.createElement("script");script.charset="utf-8",script.timeout=120,script.src=e;var d=new Error,m=script.onerror=script.onload=function(e){if(clearTimeout(h),delete o[t],script.onerror=script.onload=null,r[t])return n(r[t]);var l=e&&("load"===e.type?"missing":e.type),m=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+l+": "+m+")",d.name="ChunkLoadError",d.type=l,d.request=m,c[t]=d,f(d)};return h=setTimeout((function(){m({type:"timeout",target:script})}),12e4),document.head.appendChild(script),l}function l(){window.__NUXT_JSONP__=function(t,e){r[t]=e},window.__NUXT_JSONP_CACHE__=r,window.__NUXT_IMPORT__=f}},38:function(t,e,n){"use strict";n.d(e,"b",(function(){return J})),n.d(e,"a",(function(){return S.a}));n(46),n(20),n(31),n(88),n(30),n(89);var r=n(4),o=n(35),c=(n(26),n(33),n(48),n(12),n(19),n(49),n(2)),f=n(254),l=n(155),h=n.n(l),d=n(74),m=n.n(d),v=(n(36),n(37),n(156)),y=n(18),w=n(1);"scrollRestoration"in window.history&&(Object(w.u)("manual"),window.addEventListener("beforeunload",(function(){Object(w.u)("auto")})),window.addEventListener("load",(function(){Object(w.u)("manual")})));function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var j=function(){};c.a.use(v.a);var _={mode:"history",base:"/",linkActiveClass:"nuxt-link-active",linkExactActiveClass:"nuxt-link-exact-active",scrollBehavior:function(t,e,n){var r=!1,o=t!==e;n?r=n:o&&function(t){var e=Object(w.h)(t);if(1===e.length){var n=e[0].options;return!1!==(void 0===n?{}:n).scrollToTop}return e.some((function(t){var e=t.options;return e&&e.scrollToTop}))}(t)&&(r={x:0,y:0});var c=window.$nuxt;return(!o||t.path===e.path&&t.hash!==e.hash)&&c.$nextTick((function(){return c.$emit("triggerScroll")})),new Promise((function(e){c.$once("triggerScroll",(function(){if(t.hash){var n=t.hash;void 0!==window.CSS&&void 0!==window.CSS.escape&&(n="#"+window.CSS.escape(n.substr(1)));try{document.querySelector(n)&&(r={selector:n})}catch(t){console.warn("Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).")}}e(r)}))}))},routes:[{path:"/item/:item?",component:function(){return Object(w.n)(Promise.all([n.e(0),n.e(1),n.e(4)]).then(n.bind(null,442)))},name:"item-item"},{path:"/wiki/:item?",component:function(){return Object(w.n)(Promise.all([n.e(0),n.e(1)]).then(n.bind(null,443)))},name:"wiki-item"},{path:"/",component:function(){return Object(w.n)(Promise.all([n.e(0),n.e(1)]).then(n.bind(null,444)))},name:"index"}],fallback:!1};function $(t,e){var base=e._app&&e._app.basePath||_.base,n=new v.a(O(O({},_),{},{base:base})),r=n.push;n.push=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:j,n=arguments.length>2?arguments[2]:void 0;return r.call(this,t,e,n)};var o=n.resolve.bind(n);return n.resolve=function(t,e,n){return"string"==typeof t&&(t=Object(y.d)(t)),o(t,e,n)},n}var P=n(73),S=n(45),k=n(157),C=n(256),E=n(159),R=n(257),D=n(258),T=n.n(D),A=function(t){return t.default||t},N=function(t,e){Object(R.a)(t);var r=new T.a("default",{linkify:!0,breaks:!0});r.use(A(n(411))),r.use(A(n(412))),r.use(A(n(413))),e("md",r)},I=n(160);n(259);function K(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function U(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?K(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):K(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}c.a.component(h.a.name,h.a),c.a.component(m.a.name,U(U({},m.a),{},{render:function(t,e){return m.a._warned||(m.a._warned=!0,console.warn("<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead")),m.a.render(t,e)}})),c.a.component(P.a.name,P.a),c.a.component("NChild",P.a),c.a.component(k.a.name,k.a),Object.defineProperty(c.a.prototype,"$nuxt",{get:function(){var t=this.$root.$options.$nuxt;return t||"undefined"==typeof window?t:window.$nuxt},configurable:!0}),c.a.use(f.a,{keyName:"head",attribute:"data-n-head",ssrAttribute:"data-n-head-ssr",tagIDKeyName:"hid"});var F={name:"page",mode:"out-in",appear:!1,appearClass:"appear",appearActiveClass:"appear-active",appearToClass:"appear-to"};function J(t){return M.apply(this,arguments)}function M(){return M=Object(r.a)(regeneratorRuntime.mark((function t(e){var n,o,f,l,h,path,d,m=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d=function(t,e){if(!t)throw new Error("inject(key, value) has no key provided");if(void 0===e)throw new Error("inject('".concat(t,"', value) has no value provided"));f[t="$"+t]=e,f.context[t]||(f.context[t]=e);var n="__nuxt_"+t+"_installed__";c.a[n]||(c.a[n]=!0,c.a.use((function(){Object.prototype.hasOwnProperty.call(c.a.prototype,t)||Object.defineProperty(c.a.prototype,t,{get:function(){return this.$root.$options[t]}})})))},n=m.length>1&&void 0!==m[1]?m[1]:{},t.next=4,$(0,n);case 4:return o=t.sent,f=U({head:{title:"耳斯百科",htmlAttrs:{lang:"zh"},meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"description",name:"description",content:""},{name:"format-detection",content:"telephone=no"}],link:[{rel:"icon",type:"image/x-icon",href:"/64x64.png"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"}],style:[],script:[]},router:o,nuxt:{defaultTransition:F,transitions:[F],setTransitions:function(t){return Array.isArray(t)||(t=[t]),t=t.map((function(t){return t=t?"string"==typeof t?Object.assign({},F,{name:t}):Object.assign({},F,t):F})),this.$options.nuxt.transitions=t,t},err:null,dateErr:null,error:function(t){t=t||null,f.context._errored=Boolean(t),t=t?Object(w.p)(t):null;var n=f.nuxt;return this&&(n=this.nuxt||this.$options.nuxt),n.dateErr=Date.now(),n.err=t,e&&(e.nuxt.error=t),t}}},C.a),l=e?e.next:function(t){return f.router.push(t)},e?h=o.resolve(e.url).route:(path=Object(w.g)(o.options.base,o.options.mode),h=o.resolve(path).route),t.next=10,Object(w.t)(f,{route:h,next:l,error:f.nuxt.error.bind(f),payload:e?e.payload:void 0,req:e?e.req:void 0,res:e?e.res:void 0,beforeRenderFns:e?e.beforeRenderFns:void 0,ssrContext:e});case 10:if(d("config",n),f.context.enablePreview=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f.previewData=Object.assign({},t),d("preview",t)},"function"!=typeof E.default){t.next=15;break}return t.next=15,Object(E.default)(f.context,d);case 15:return t.next=18,N(f.context,d);case 18:if("function"!=typeof I.a){t.next=21;break}return t.next=21,Object(I.a)(f.context,d);case 21:t.next=24;break;case 24:return f.context.enablePreview=function(){console.warn("You cannot call enablePreview() outside a plugin.")},t.next=27,new Promise((function(t,e){if(!o.resolve(f.context.route.fullPath).route.matched.length)return t();o.replace(f.context.route.fullPath,t,(function(n){if(!n._isRouter)return e(n);if(2!==n.type)return t();var c=o.afterEach(function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,Object(w.k)(n);case 3:f.context.route=e.sent,f.context.params=n.params||{},f.context.query=n.query||{},c(),t();case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}))}));case 27:return t.abrupt("return",{app:f,router:o});case 28:case"end":return t.stop()}}),t)}))),M.apply(this,arguments)}}}]);