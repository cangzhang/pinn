!function(t){var r={};function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(r){return t[r]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="/pinn/",e(e.s=2)}([function(t,r,e){t.exports=e(1)},function(t,r,e){var n=function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{c({},"")}catch(T){c=function(t,r,e){return t[r]=e}}function f(t,r,e,n){var o=r&&r.prototype instanceof v?r:v,a=Object.create(o.prototype),i=new P(n||[]);return a._invoke=function(t,r,e){var n=s;return function(o,a){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw a;return k()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var u=O(i,e);if(u){if(u===d)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===s)throw n=y,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=p;var c=l(t,r,e);if("normal"===c.type){if(n=e.done?y:h,c.arg===d)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(n=y,e.method="throw",e.arg=c.arg)}}}(t,e,i),a}function l(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(T){return{type:"throw",arg:T}}}t.wrap=f;var s="suspendedStart",h="suspendedYield",p="executing",y="completed",d={};function v(){}function m(){}function g(){}var b={};b[a]=function(){return this};var w=Object.getPrototypeOf,E=w&&w(w(A([])));E&&E!==e&&n.call(E,a)&&(b=E);var S=g.prototype=v.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(r){c(t,r,(function(t){return this._invoke(r,t)}))}))}function L(t,r){function e(o,a,i,u){var c=l(t[o],t,a);if("throw"!==c.type){var f=c.arg,s=f.value;return s&&"object"===typeof s&&n.call(s,"__await")?r.resolve(s.__await).then((function(t){e("next",t,i,u)}),(function(t){e("throw",t,i,u)})):r.resolve(s).then((function(t){f.value=t,i(f)}),(function(t){return e("throw",t,i,u)}))}u(c.arg)}var o;this._invoke=function(t,n){function a(){return new r((function(r,o){e(t,n,r,o)}))}return o=o?o.then(a,a):a()}}function O(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,d):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function j(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function _(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function A(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:r,done:!0}}return m.prototype=S.constructor=g,g.constructor=m,m.displayName=c(g,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"===typeof t&&t.constructor;return!!r&&(r===m||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,u,"GeneratorFunction")),t.prototype=Object.create(S),t},t.awrap=function(t){return{__await:t}},x(L.prototype),L.prototype[i]=function(){return this},t.AsyncIterator=L,t.async=function(r,e,n,o,a){void 0===a&&(a=Promise);var i=new L(f(r,e,n,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(S),c(S,u,"Generator"),S[a]=function(){return this},S.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=A,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return u.type="throw",u.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],u=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),f=n.call(i,"finallyLoc");if(c&&f){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),d},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),_(e),d}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;_(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:A(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),d}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},function(t,r,e){"use strict";function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function o(t,r){if(t){if("string"===typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}function a(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var e=[],n=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(n=(i=u.next()).done)&&(e.push(i.value),!r||e.length!==r);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return e}}(t,r)||o(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function u(t,r){return(u=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}function c(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function f(t,r,e){return(f=c()?Reflect.construct:function(t,r,e){var n=[null];n.push.apply(n,r);var o=new(Function.bind.apply(t,n));return e&&u(o,e.prototype),o}).apply(null,arguments)}function l(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||o(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.r(r),e.d(r,"drawOffscreenCanvas",(function(){return M})),e.d(r,"downloadImage",(function(){return N}));var s=Symbol("Comlink.proxy"),h=Symbol("Comlink.endpoint"),p=Symbol("Comlink.releaseProxy"),y=Symbol("Comlink.thrown"),d=function(t){return"object"===typeof t&&null!==t||"function"===typeof t},v=new Map([["proxy",{canHandle:function(t){return d(t)&&t[s]},serialize:function(t){var r=new MessageChannel,e=r.port1,n=r.port2;return m(t,e),[n,[n]]},deserialize:function(t){return t.start(),w(t,[],r);var r}}],["throw",{canHandle:function(t){return d(t)&&y in t},serialize:function(t){var r=t.value;return[r instanceof Error?{isError:!0,value:{message:r.message,name:r.name,stack:r.stack}}:{isError:!1,value:r},[]]},deserialize:function(t){if(t.isError)throw Object.assign(new Error(t.value.message),t.value);throw t.value}}]]);function m(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:self;r.addEventListener("message",(function e(n){if(n&&n.data){var o,u=Object.assign({path:[]},n.data),c=u.id,s=u.type,h=u.path,p=(n.data.argumentList||[]).map(j);try{var d=h.slice(0,-1).reduce((function(t,r){return t[r]}),t),v=h.reduce((function(t,r){return t[r]}),t);switch(s){case"GET":o=v;break;case"SET":d[h.slice(-1)[0]]=j(n.data.value),o=!0;break;case"APPLY":o=v.apply(d,p);break;case"CONSTRUCT":var b;o=L(f(v,l(p)));break;case"ENDPOINT":var w=new MessageChannel,E=w.port1,S=w.port2;m(t,S),o=x(E,[E]);break;case"RELEASE":o=void 0;break;default:return}}catch(b){o=i({value:b},y,0)}Promise.resolve(o).catch((function(t){return i({value:t},y,0)})).then((function(t){var n=a(O(t),2),o=n[0],i=n[1];r.postMessage(Object.assign(Object.assign({},o),{id:c}),i),"RELEASE"===s&&(r.removeEventListener("message",e),g(r))}))}})),r.start&&r.start()}function g(t){(function(t){return"MessagePort"===t.constructor.name})(t)&&t.close()}function b(t){if(t)throw new Error("Proxy has been released and is not useable")}function w(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},n=!1,o=new Proxy(e,{get:function(e,a){if(b(n),a===p)return function(){return _(t,{type:"RELEASE",path:r.map((function(t){return t.toString()}))}).then((function(){g(t),n=!0}))};if("then"===a){if(0===r.length)return{then:function(){return o}};var i=_(t,{type:"GET",path:r.map((function(t){return t.toString()}))}).then(j);return i.then.bind(i)}return w(t,[].concat(l(r),[a]))},set:function(e,o,i){b(n);var u=a(O(i),2),c=u[0],f=u[1];return _(t,{type:"SET",path:[].concat(l(r),[o]).map((function(t){return t.toString()})),value:c},f).then(j)},apply:function(e,o,i){b(n);var u=r[r.length-1];if(u===h)return _(t,{type:"ENDPOINT"}).then(j);if("bind"===u)return w(t,r.slice(0,-1));var c=a(E(i),2),f=c[0],l=c[1];return _(t,{type:"APPLY",path:r.map((function(t){return t.toString()})),argumentList:f},l).then(j)},construct:function(e,o){b(n);var i=a(E(o),2),u=i[0],c=i[1];return _(t,{type:"CONSTRUCT",path:r.map((function(t){return t.toString()})),argumentList:u},c).then(j)}});return o}function E(t){var r,e=t.map(O);return[e.map((function(t){return t[0]})),(r=e.map((function(t){return t[1]})),Array.prototype.concat.apply([],r))]}var S=new WeakMap;function x(t,r){return S.set(t,r),t}function L(t){return Object.assign(t,i({},s,!0))}function O(t){var r,e=function(t,r){var e;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=o(t))||r&&t&&"number"===typeof t.length){e&&(t=e);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return u=t.done,t},e:function(t){c=!0,i=t},f:function(){try{u||null==e.return||e.return()}finally{if(c)throw i}}}}(v);try{for(e.s();!(r=e.n()).done;){var n=a(r.value,2),i=n[0],u=n[1];if(u.canHandle(t)){var c=a(u.serialize(t),2);return[{type:"HANDLER",name:i,value:c[0]},c[1]]}}}catch(f){e.e(f)}finally{e.f()}return[{type:"RAW",value:t},S.get(t)||[]]}function j(t){switch(t.type){case"HANDLER":return v.get(t.name).deserialize(t.value);case"RAW":return t.value}}function _(t,r,e){return new Promise((function(n){var o=new Array(4).fill(0).map((function(){return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)})).join("-");t.addEventListener("message",(function r(e){e.data&&e.data.id&&e.data.id===o&&(t.removeEventListener("message",r),n(e.data))})),t.start&&t.start(),t.postMessage(Object.assign({id:o},r),e)}))}var P=e(0),A=e.n(P);function k(t,r,e,n,o,a,i){try{var u=t[a](i),c=u.value}catch(f){return void e(f)}u.done?r(c):Promise.resolve(c).then(n,o)}function T(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function i(t){k(a,n,o,i,u,"next",t)}function u(t){k(a,n,o,i,u,"throw",t)}i(void 0)}))}}var M=function(){var t=T(A.a.mark((function t(r){var e,n,o,i,u,c,f,l,s,h;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=r.data,n=r.bitmaps,o=r.dw,i=void 0===o?300:o,u=r.offscreen,c=e.reduce((function(t,r,e){var o=a(t,2),u=o[0],c=o[1],f=n[e].width,l=r.realSh/f*i;return[u=u.concat(l),c+=l+5]}),[[],0]),f=a(c,2),l=f[0],s=f[1],u.width=i,u.height=s,h=u.getContext("2d"),e.reduce((function(t,r,e){var o=n[e],a=l[e],u=o.width,c=r.realSy,f=r.realSh;return h.drawImage(o,0,c,u,f,0,t,i,a),t+a+5}),0);case 6:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}(),N=function(){var t=T(A.a.mark((function t(r){var e,n,o,a,i,u;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=r.data,n=r.bitmaps,o=Math.max.apply(Math,l(n.map((function(t){return t.width})))),a=e.reduce((function(t,r){return r.realSh+t}),0),i=new OffscreenCanvas(o,a),u=i.getContext("2d"),e.reduce((function(t,r,e){var a=n[e],i=a.width,c=r.realSy,f=r.realSh;return u.drawImage(a,0,c,i,f,0,t,o,f),t+f}),0),t.next=8,i.convertToBlob();case 8:return t.abrupt("return",t.sent);case 9:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}();m(Object.keys(r).reduce((function(t,e){return"__esModule"==e||(t[e]=r[e]),t}),{}))}]);
//# sourceMappingURL=c4638173e2d95ea8dcdc.worker.js.map