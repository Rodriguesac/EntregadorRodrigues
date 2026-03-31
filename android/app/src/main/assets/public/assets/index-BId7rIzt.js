function oC(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function aC(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Jw={exports:{}},kc={},Zw={exports:{}},se={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qa=Symbol.for("react.element"),lC=Symbol.for("react.portal"),uC=Symbol.for("react.fragment"),cC=Symbol.for("react.strict_mode"),hC=Symbol.for("react.profiler"),dC=Symbol.for("react.provider"),fC=Symbol.for("react.context"),pC=Symbol.for("react.forward_ref"),mC=Symbol.for("react.suspense"),gC=Symbol.for("react.memo"),yC=Symbol.for("react.lazy"),Xy=Symbol.iterator;function vC(t){return t===null||typeof t!="object"?null:(t=Xy&&t[Xy]||t["@@iterator"],typeof t=="function"?t:null)}var eE={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},tE=Object.assign,nE={};function Xs(t,e,n){this.props=t,this.context=e,this.refs=nE,this.updater=n||eE}Xs.prototype.isReactComponent={};Xs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Xs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function rE(){}rE.prototype=Xs.prototype;function Lp(t,e,n){this.props=t,this.context=e,this.refs=nE,this.updater=n||eE}var Mp=Lp.prototype=new rE;Mp.constructor=Lp;tE(Mp,Xs.prototype);Mp.isPureReactComponent=!0;var Jy=Array.isArray,iE=Object.prototype.hasOwnProperty,Op={current:null},sE={key:!0,ref:!0,__self:!0,__source:!0};function oE(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)iE.call(e,r)&&!sE.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var u=Array(a),c=0;c<a;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:qa,type:t,key:s,ref:o,props:i,_owner:Op.current}}function _C(t,e){return{$$typeof:qa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Fp(t){return typeof t=="object"&&t!==null&&t.$$typeof===qa}function wC(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Zy=/\/+/g;function Mh(t,e){return typeof t=="object"&&t!==null&&t.key!=null?wC(""+t.key):e.toString(36)}function ou(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case qa:case lC:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Mh(o,0):r,Jy(i)?(n="",t!=null&&(n=t.replace(Zy,"$&/")+"/"),ou(i,e,n,"",function(c){return c})):i!=null&&(Fp(i)&&(i=_C(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Zy,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Jy(t))for(var a=0;a<t.length;a++){s=t[a];var u=r+Mh(s,a);o+=ou(s,e,n,u,i)}else if(u=vC(t),typeof u=="function")for(t=u.call(t),a=0;!(s=t.next()).done;)s=s.value,u=r+Mh(s,a++),o+=ou(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Nl(t,e,n){if(t==null)return t;var r=[],i=0;return ou(t,r,"","",function(s){return e.call(n,s,i++)}),r}function EC(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Mt={current:null},au={transition:null},TC={ReactCurrentDispatcher:Mt,ReactCurrentBatchConfig:au,ReactCurrentOwner:Op};function aE(){throw Error("act(...) is not supported in production builds of React.")}se.Children={map:Nl,forEach:function(t,e,n){Nl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Nl(t,function(){e++}),e},toArray:function(t){return Nl(t,function(e){return e})||[]},only:function(t){if(!Fp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};se.Component=Xs;se.Fragment=uC;se.Profiler=hC;se.PureComponent=Lp;se.StrictMode=cC;se.Suspense=mC;se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=TC;se.act=aE;se.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=tE({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Op.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(u in e)iE.call(e,u)&&!sE.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&a!==void 0?a[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){a=Array(u);for(var c=0;c<u;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:qa,type:t.type,key:i,ref:s,props:r,_owner:o}};se.createContext=function(t){return t={$$typeof:fC,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:dC,_context:t},t.Consumer=t};se.createElement=oE;se.createFactory=function(t){var e=oE.bind(null,t);return e.type=t,e};se.createRef=function(){return{current:null}};se.forwardRef=function(t){return{$$typeof:pC,render:t}};se.isValidElement=Fp;se.lazy=function(t){return{$$typeof:yC,_payload:{_status:-1,_result:t},_init:EC}};se.memo=function(t,e){return{$$typeof:gC,type:t,compare:e===void 0?null:e}};se.startTransition=function(t){var e=au.transition;au.transition={};try{t()}finally{au.transition=e}};se.unstable_act=aE;se.useCallback=function(t,e){return Mt.current.useCallback(t,e)};se.useContext=function(t){return Mt.current.useContext(t)};se.useDebugValue=function(){};se.useDeferredValue=function(t){return Mt.current.useDeferredValue(t)};se.useEffect=function(t,e){return Mt.current.useEffect(t,e)};se.useId=function(){return Mt.current.useId()};se.useImperativeHandle=function(t,e,n){return Mt.current.useImperativeHandle(t,e,n)};se.useInsertionEffect=function(t,e){return Mt.current.useInsertionEffect(t,e)};se.useLayoutEffect=function(t,e){return Mt.current.useLayoutEffect(t,e)};se.useMemo=function(t,e){return Mt.current.useMemo(t,e)};se.useReducer=function(t,e,n){return Mt.current.useReducer(t,e,n)};se.useRef=function(t){return Mt.current.useRef(t)};se.useState=function(t){return Mt.current.useState(t)};se.useSyncExternalStore=function(t,e,n){return Mt.current.useSyncExternalStore(t,e,n)};se.useTransition=function(){return Mt.current.useTransition()};se.version="18.3.1";Zw.exports=se;var D=Zw.exports;const lE=aC(D),xC=oC({__proto__:null,default:lE},[D]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var SC=D,IC=Symbol.for("react.element"),AC=Symbol.for("react.fragment"),CC=Object.prototype.hasOwnProperty,PC=SC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,RC={key:!0,ref:!0,__self:!0,__source:!0};function uE(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)CC.call(e,r)&&!RC.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:IC,type:t,key:s,ref:o,props:i,_owner:PC.current}}kc.Fragment=AC;kc.jsx=uE;kc.jsxs=uE;Jw.exports=kc;var P=Jw.exports,Ud={},cE={exports:{}},en={},hE={exports:{}},dE={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,G){var W=U.length;U.push(G);e:for(;0<W;){var J=W-1>>>1,X=U[J];if(0<i(X,G))U[J]=G,U[W]=X,W=J;else break e}}function n(U){return U.length===0?null:U[0]}function r(U){if(U.length===0)return null;var G=U[0],W=U.pop();if(W!==G){U[0]=W;e:for(var J=0,X=U.length,ue=X>>>1;J<ue;){var ze=2*(J+1)-1,Pe=U[ze],Je=ze+1,pt=U[Je];if(0>i(Pe,W))Je<X&&0>i(pt,Pe)?(U[J]=pt,U[Je]=W,J=Je):(U[J]=Pe,U[ze]=W,J=ze);else if(Je<X&&0>i(pt,W))U[J]=pt,U[Je]=W,J=Je;else break e}}return G}function i(U,G){var W=U.sortIndex-G.sortIndex;return W!==0?W:U.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var u=[],c=[],h=1,d=null,p=3,g=!1,E=!1,A=!1,C=typeof setTimeout=="function"?setTimeout:null,w=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(U){for(var G=n(c);G!==null;){if(G.callback===null)r(c);else if(G.startTime<=U)r(c),G.sortIndex=G.expirationTime,e(u,G);else break;G=n(c)}}function N(U){if(A=!1,T(U),!E)if(n(u)!==null)E=!0,ye(L);else{var G=n(c);G!==null&&ft(N,G.startTime-U)}}function L(U,G){E=!1,A&&(A=!1,w(y),y=-1),g=!0;var W=p;try{for(T(G),d=n(u);d!==null&&(!(d.expirationTime>G)||U&&!k());){var J=d.callback;if(typeof J=="function"){d.callback=null,p=d.priorityLevel;var X=J(d.expirationTime<=G);G=t.unstable_now(),typeof X=="function"?d.callback=X:d===n(u)&&r(u),T(G)}else r(u);d=n(u)}if(d!==null)var ue=!0;else{var ze=n(c);ze!==null&&ft(N,ze.startTime-G),ue=!1}return ue}finally{d=null,p=W,g=!1}}var O=!1,S=null,y=-1,I=5,x=-1;function k(){return!(t.unstable_now()-x<I)}function b(){if(S!==null){var U=t.unstable_now();x=U;var G=!0;try{G=S(!0,U)}finally{G?R():(O=!1,S=null)}}else O=!1}var R;if(typeof v=="function")R=function(){v(b)};else if(typeof MessageChannel<"u"){var me=new MessageChannel,re=me.port2;me.port1.onmessage=b,R=function(){re.postMessage(null)}}else R=function(){C(b,0)};function ye(U){S=U,O||(O=!0,R())}function ft(U,G){y=C(function(){U(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){E||g||(E=!0,ye(L))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(U){switch(p){case 1:case 2:case 3:var G=3;break;default:G=p}var W=p;p=G;try{return U()}finally{p=W}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,G){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var W=p;p=U;try{return G()}finally{p=W}},t.unstable_scheduleCallback=function(U,G,W){var J=t.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?J+W:J):W=J,U){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=W+X,U={id:h++,callback:G,priorityLevel:U,startTime:W,expirationTime:X,sortIndex:-1},W>J?(U.sortIndex=W,e(c,U),n(u)===null&&U===n(c)&&(A?(w(y),y=-1):A=!0,ft(N,W-J))):(U.sortIndex=X,e(u,U),E||g||(E=!0,ye(L))),U},t.unstable_shouldYield=k,t.unstable_wrapCallback=function(U){var G=p;return function(){var W=p;p=G;try{return U.apply(this,arguments)}finally{p=W}}}})(dE);hE.exports=dE;var kC=hE.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bC=D,Zt=kC;function z(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var fE=new Set,ha={};function Oi(t,e){bs(t,e),bs(t+"Capture",e)}function bs(t,e){for(ha[t]=e,t=0;t<e.length;t++)fE.add(e[t])}var Zn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bd=Object.prototype.hasOwnProperty,NC=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ev={},tv={};function DC(t){return Bd.call(tv,t)?!0:Bd.call(ev,t)?!1:NC.test(t)?tv[t]=!0:(ev[t]=!0,!1)}function VC(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function LC(t,e,n,r){if(e===null||typeof e>"u"||VC(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ot(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var ht={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){ht[t]=new Ot(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];ht[e]=new Ot(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){ht[t]=new Ot(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){ht[t]=new Ot(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){ht[t]=new Ot(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){ht[t]=new Ot(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){ht[t]=new Ot(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){ht[t]=new Ot(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){ht[t]=new Ot(t,5,!1,t.toLowerCase(),null,!1,!1)});var jp=/[\-:]([a-z])/g;function Up(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(jp,Up);ht[e]=new Ot(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(jp,Up);ht[e]=new Ot(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(jp,Up);ht[e]=new Ot(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){ht[t]=new Ot(t,1,!1,t.toLowerCase(),null,!1,!1)});ht.xlinkHref=new Ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){ht[t]=new Ot(t,1,!1,t.toLowerCase(),null,!0,!0)});function Bp(t,e,n,r){var i=ht.hasOwnProperty(e)?ht[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(LC(e,n,i,r)&&(n=null),r||i===null?DC(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var lr=bC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Dl=Symbol.for("react.element"),is=Symbol.for("react.portal"),ss=Symbol.for("react.fragment"),zp=Symbol.for("react.strict_mode"),zd=Symbol.for("react.profiler"),pE=Symbol.for("react.provider"),mE=Symbol.for("react.context"),$p=Symbol.for("react.forward_ref"),$d=Symbol.for("react.suspense"),Wd=Symbol.for("react.suspense_list"),Wp=Symbol.for("react.memo"),yr=Symbol.for("react.lazy"),gE=Symbol.for("react.offscreen"),nv=Symbol.iterator;function Ao(t){return t===null||typeof t!="object"?null:(t=nv&&t[nv]||t["@@iterator"],typeof t=="function"?t:null)}var Ne=Object.assign,Oh;function Mo(t){if(Oh===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Oh=e&&e[1]||""}return`
`+Oh+t}var Fh=!1;function jh(t,e){if(!t||Fh)return"";Fh=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=a);break}}}finally{Fh=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Mo(t):""}function MC(t){switch(t.tag){case 5:return Mo(t.type);case 16:return Mo("Lazy");case 13:return Mo("Suspense");case 19:return Mo("SuspenseList");case 0:case 2:case 15:return t=jh(t.type,!1),t;case 11:return t=jh(t.type.render,!1),t;case 1:return t=jh(t.type,!0),t;default:return""}}function Hd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ss:return"Fragment";case is:return"Portal";case zd:return"Profiler";case zp:return"StrictMode";case $d:return"Suspense";case Wd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case mE:return(t.displayName||"Context")+".Consumer";case pE:return(t._context.displayName||"Context")+".Provider";case $p:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Wp:return e=t.displayName||null,e!==null?e:Hd(t.type)||"Memo";case yr:e=t._payload,t=t._init;try{return Hd(t(e))}catch{}}return null}function OC(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Hd(e);case 8:return e===zp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Wr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function yE(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function FC(t){var e=yE(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Vl(t){t._valueTracker||(t._valueTracker=FC(t))}function vE(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=yE(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Lu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function qd(t,e){var n=e.checked;return Ne({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function rv(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Wr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function _E(t,e){e=e.checked,e!=null&&Bp(t,"checked",e,!1)}function Gd(t,e){_E(t,e);var n=Wr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Kd(t,e.type,n):e.hasOwnProperty("defaultValue")&&Kd(t,e.type,Wr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function iv(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Kd(t,e,n){(e!=="number"||Lu(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Oo=Array.isArray;function ws(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Wr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Qd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(z(91));return Ne({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function sv(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(z(92));if(Oo(n)){if(1<n.length)throw Error(z(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Wr(n)}}function wE(t,e){var n=Wr(e.value),r=Wr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function ov(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function EE(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Yd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?EE(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ll,TE=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ll=Ll||document.createElement("div"),Ll.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ll.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function da(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var qo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},jC=["Webkit","ms","Moz","O"];Object.keys(qo).forEach(function(t){jC.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),qo[e]=qo[t]})});function xE(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||qo.hasOwnProperty(t)&&qo[t]?(""+e).trim():e+"px"}function SE(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=xE(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var UC=Ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xd(t,e){if(e){if(UC[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(z(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(z(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(z(61))}if(e.style!=null&&typeof e.style!="object")throw Error(z(62))}}function Jd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zd=null;function Hp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ef=null,Es=null,Ts=null;function av(t){if(t=Qa(t)){if(typeof ef!="function")throw Error(z(280));var e=t.stateNode;e&&(e=Lc(e),ef(t.stateNode,t.type,e))}}function IE(t){Es?Ts?Ts.push(t):Ts=[t]:Es=t}function AE(){if(Es){var t=Es,e=Ts;if(Ts=Es=null,av(t),e)for(t=0;t<e.length;t++)av(e[t])}}function CE(t,e){return t(e)}function PE(){}var Uh=!1;function RE(t,e,n){if(Uh)return t(e,n);Uh=!0;try{return CE(t,e,n)}finally{Uh=!1,(Es!==null||Ts!==null)&&(PE(),AE())}}function fa(t,e){var n=t.stateNode;if(n===null)return null;var r=Lc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(z(231,e,typeof n));return n}var tf=!1;if(Zn)try{var Co={};Object.defineProperty(Co,"passive",{get:function(){tf=!0}}),window.addEventListener("test",Co,Co),window.removeEventListener("test",Co,Co)}catch{tf=!1}function BC(t,e,n,r,i,s,o,a,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var Go=!1,Mu=null,Ou=!1,nf=null,zC={onError:function(t){Go=!0,Mu=t}};function $C(t,e,n,r,i,s,o,a,u){Go=!1,Mu=null,BC.apply(zC,arguments)}function WC(t,e,n,r,i,s,o,a,u){if($C.apply(this,arguments),Go){if(Go){var c=Mu;Go=!1,Mu=null}else throw Error(z(198));Ou||(Ou=!0,nf=c)}}function Fi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function kE(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function lv(t){if(Fi(t)!==t)throw Error(z(188))}function HC(t){var e=t.alternate;if(!e){if(e=Fi(t),e===null)throw Error(z(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return lv(i),t;if(s===r)return lv(i),e;s=s.sibling}throw Error(z(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(z(189))}}if(n.alternate!==r)throw Error(z(190))}if(n.tag!==3)throw Error(z(188));return n.stateNode.current===n?t:e}function bE(t){return t=HC(t),t!==null?NE(t):null}function NE(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=NE(t);if(e!==null)return e;t=t.sibling}return null}var DE=Zt.unstable_scheduleCallback,uv=Zt.unstable_cancelCallback,qC=Zt.unstable_shouldYield,GC=Zt.unstable_requestPaint,Be=Zt.unstable_now,KC=Zt.unstable_getCurrentPriorityLevel,qp=Zt.unstable_ImmediatePriority,VE=Zt.unstable_UserBlockingPriority,Fu=Zt.unstable_NormalPriority,QC=Zt.unstable_LowPriority,LE=Zt.unstable_IdlePriority,bc=null,kn=null;function YC(t){if(kn&&typeof kn.onCommitFiberRoot=="function")try{kn.onCommitFiberRoot(bc,t,void 0,(t.current.flags&128)===128)}catch{}}var vn=Math.clz32?Math.clz32:ZC,XC=Math.log,JC=Math.LN2;function ZC(t){return t>>>=0,t===0?32:31-(XC(t)/JC|0)|0}var Ml=64,Ol=4194304;function Fo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ju(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=Fo(a):(s&=o,s!==0&&(r=Fo(s)))}else o=n&~i,o!==0?r=Fo(o):s!==0&&(r=Fo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-vn(e),i=1<<n,r|=t[n],e&=~i;return r}function eP(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tP(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-vn(s),a=1<<o,u=i[o];u===-1?(!(a&n)||a&r)&&(i[o]=eP(a,e)):u<=e&&(t.expiredLanes|=a),s&=~a}}function rf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ME(){var t=Ml;return Ml<<=1,!(Ml&4194240)&&(Ml=64),t}function Bh(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ga(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-vn(e),t[e]=n}function nP(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-vn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function Gp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-vn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var fe=0;function OE(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var FE,Kp,jE,UE,BE,sf=!1,Fl=[],br=null,Nr=null,Dr=null,pa=new Map,ma=new Map,_r=[],rP="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function cv(t,e){switch(t){case"focusin":case"focusout":br=null;break;case"dragenter":case"dragleave":Nr=null;break;case"mouseover":case"mouseout":Dr=null;break;case"pointerover":case"pointerout":pa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ma.delete(e.pointerId)}}function Po(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Qa(e),e!==null&&Kp(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function iP(t,e,n,r,i){switch(e){case"focusin":return br=Po(br,t,e,n,r,i),!0;case"dragenter":return Nr=Po(Nr,t,e,n,r,i),!0;case"mouseover":return Dr=Po(Dr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return pa.set(s,Po(pa.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,ma.set(s,Po(ma.get(s)||null,t,e,n,r,i)),!0}return!1}function zE(t){var e=pi(t.target);if(e!==null){var n=Fi(e);if(n!==null){if(e=n.tag,e===13){if(e=kE(n),e!==null){t.blockedOn=e,BE(t.priority,function(){jE(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function lu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=of(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Zd=r,n.target.dispatchEvent(r),Zd=null}else return e=Qa(n),e!==null&&Kp(e),t.blockedOn=n,!1;e.shift()}return!0}function hv(t,e,n){lu(t)&&n.delete(e)}function sP(){sf=!1,br!==null&&lu(br)&&(br=null),Nr!==null&&lu(Nr)&&(Nr=null),Dr!==null&&lu(Dr)&&(Dr=null),pa.forEach(hv),ma.forEach(hv)}function Ro(t,e){t.blockedOn===e&&(t.blockedOn=null,sf||(sf=!0,Zt.unstable_scheduleCallback(Zt.unstable_NormalPriority,sP)))}function ga(t){function e(i){return Ro(i,t)}if(0<Fl.length){Ro(Fl[0],t);for(var n=1;n<Fl.length;n++){var r=Fl[n];r.blockedOn===t&&(r.blockedOn=null)}}for(br!==null&&Ro(br,t),Nr!==null&&Ro(Nr,t),Dr!==null&&Ro(Dr,t),pa.forEach(e),ma.forEach(e),n=0;n<_r.length;n++)r=_r[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<_r.length&&(n=_r[0],n.blockedOn===null);)zE(n),n.blockedOn===null&&_r.shift()}var xs=lr.ReactCurrentBatchConfig,Uu=!0;function oP(t,e,n,r){var i=fe,s=xs.transition;xs.transition=null;try{fe=1,Qp(t,e,n,r)}finally{fe=i,xs.transition=s}}function aP(t,e,n,r){var i=fe,s=xs.transition;xs.transition=null;try{fe=4,Qp(t,e,n,r)}finally{fe=i,xs.transition=s}}function Qp(t,e,n,r){if(Uu){var i=of(t,e,n,r);if(i===null)Xh(t,e,r,Bu,n),cv(t,r);else if(iP(i,t,e,n,r))r.stopPropagation();else if(cv(t,r),e&4&&-1<rP.indexOf(t)){for(;i!==null;){var s=Qa(i);if(s!==null&&FE(s),s=of(t,e,n,r),s===null&&Xh(t,e,r,Bu,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Xh(t,e,r,null,n)}}var Bu=null;function of(t,e,n,r){if(Bu=null,t=Hp(r),t=pi(t),t!==null)if(e=Fi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=kE(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Bu=t,null}function $E(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(KC()){case qp:return 1;case VE:return 4;case Fu:case QC:return 16;case LE:return 536870912;default:return 16}default:return 16}}var Sr=null,Yp=null,uu=null;function WE(){if(uu)return uu;var t,e=Yp,n=e.length,r,i="value"in Sr?Sr.value:Sr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return uu=i.slice(t,1<r?1-r:void 0)}function cu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function jl(){return!0}function dv(){return!1}function tn(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?jl:dv,this.isPropagationStopped=dv,this}return Ne(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=jl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=jl)},persist:function(){},isPersistent:jl}),e}var Js={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xp=tn(Js),Ka=Ne({},Js,{view:0,detail:0}),lP=tn(Ka),zh,$h,ko,Nc=Ne({},Ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Jp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ko&&(ko&&t.type==="mousemove"?(zh=t.screenX-ko.screenX,$h=t.screenY-ko.screenY):$h=zh=0,ko=t),zh)},movementY:function(t){return"movementY"in t?t.movementY:$h}}),fv=tn(Nc),uP=Ne({},Nc,{dataTransfer:0}),cP=tn(uP),hP=Ne({},Ka,{relatedTarget:0}),Wh=tn(hP),dP=Ne({},Js,{animationName:0,elapsedTime:0,pseudoElement:0}),fP=tn(dP),pP=Ne({},Js,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),mP=tn(pP),gP=Ne({},Js,{data:0}),pv=tn(gP),yP={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vP={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_P={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wP(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=_P[t])?!!e[t]:!1}function Jp(){return wP}var EP=Ne({},Ka,{key:function(t){if(t.key){var e=yP[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=cu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?vP[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Jp,charCode:function(t){return t.type==="keypress"?cu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?cu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),TP=tn(EP),xP=Ne({},Nc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),mv=tn(xP),SP=Ne({},Ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Jp}),IP=tn(SP),AP=Ne({},Js,{propertyName:0,elapsedTime:0,pseudoElement:0}),CP=tn(AP),PP=Ne({},Nc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),RP=tn(PP),kP=[9,13,27,32],Zp=Zn&&"CompositionEvent"in window,Ko=null;Zn&&"documentMode"in document&&(Ko=document.documentMode);var bP=Zn&&"TextEvent"in window&&!Ko,HE=Zn&&(!Zp||Ko&&8<Ko&&11>=Ko),gv=" ",yv=!1;function qE(t,e){switch(t){case"keyup":return kP.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function GE(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var os=!1;function NP(t,e){switch(t){case"compositionend":return GE(e);case"keypress":return e.which!==32?null:(yv=!0,gv);case"textInput":return t=e.data,t===gv&&yv?null:t;default:return null}}function DP(t,e){if(os)return t==="compositionend"||!Zp&&qE(t,e)?(t=WE(),uu=Yp=Sr=null,os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return HE&&e.locale!=="ko"?null:e.data;default:return null}}var VP={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vv(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!VP[t.type]:e==="textarea"}function KE(t,e,n,r){IE(r),e=zu(e,"onChange"),0<e.length&&(n=new Xp("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Qo=null,ya=null;function LP(t){sT(t,0)}function Dc(t){var e=us(t);if(vE(e))return t}function MP(t,e){if(t==="change")return e}var QE=!1;if(Zn){var Hh;if(Zn){var qh="oninput"in document;if(!qh){var _v=document.createElement("div");_v.setAttribute("oninput","return;"),qh=typeof _v.oninput=="function"}Hh=qh}else Hh=!1;QE=Hh&&(!document.documentMode||9<document.documentMode)}function wv(){Qo&&(Qo.detachEvent("onpropertychange",YE),ya=Qo=null)}function YE(t){if(t.propertyName==="value"&&Dc(ya)){var e=[];KE(e,ya,t,Hp(t)),RE(LP,e)}}function OP(t,e,n){t==="focusin"?(wv(),Qo=e,ya=n,Qo.attachEvent("onpropertychange",YE)):t==="focusout"&&wv()}function FP(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Dc(ya)}function jP(t,e){if(t==="click")return Dc(e)}function UP(t,e){if(t==="input"||t==="change")return Dc(e)}function BP(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var En=typeof Object.is=="function"?Object.is:BP;function va(t,e){if(En(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Bd.call(e,i)||!En(t[i],e[i]))return!1}return!0}function Ev(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Tv(t,e){var n=Ev(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ev(n)}}function XE(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?XE(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function JE(){for(var t=window,e=Lu();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Lu(t.document)}return e}function em(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function zP(t){var e=JE(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&XE(n.ownerDocument.documentElement,n)){if(r!==null&&em(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Tv(n,s);var o=Tv(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var $P=Zn&&"documentMode"in document&&11>=document.documentMode,as=null,af=null,Yo=null,lf=!1;function xv(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;lf||as==null||as!==Lu(r)||(r=as,"selectionStart"in r&&em(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Yo&&va(Yo,r)||(Yo=r,r=zu(af,"onSelect"),0<r.length&&(e=new Xp("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=as)))}function Ul(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ls={animationend:Ul("Animation","AnimationEnd"),animationiteration:Ul("Animation","AnimationIteration"),animationstart:Ul("Animation","AnimationStart"),transitionend:Ul("Transition","TransitionEnd")},Gh={},ZE={};Zn&&(ZE=document.createElement("div").style,"AnimationEvent"in window||(delete ls.animationend.animation,delete ls.animationiteration.animation,delete ls.animationstart.animation),"TransitionEvent"in window||delete ls.transitionend.transition);function Vc(t){if(Gh[t])return Gh[t];if(!ls[t])return t;var e=ls[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ZE)return Gh[t]=e[n];return t}var eT=Vc("animationend"),tT=Vc("animationiteration"),nT=Vc("animationstart"),rT=Vc("transitionend"),iT=new Map,Sv="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Xr(t,e){iT.set(t,e),Oi(e,[t])}for(var Kh=0;Kh<Sv.length;Kh++){var Qh=Sv[Kh],WP=Qh.toLowerCase(),HP=Qh[0].toUpperCase()+Qh.slice(1);Xr(WP,"on"+HP)}Xr(eT,"onAnimationEnd");Xr(tT,"onAnimationIteration");Xr(nT,"onAnimationStart");Xr("dblclick","onDoubleClick");Xr("focusin","onFocus");Xr("focusout","onBlur");Xr(rT,"onTransitionEnd");bs("onMouseEnter",["mouseout","mouseover"]);bs("onMouseLeave",["mouseout","mouseover"]);bs("onPointerEnter",["pointerout","pointerover"]);bs("onPointerLeave",["pointerout","pointerover"]);Oi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Oi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Oi("onBeforeInput",["compositionend","keypress","textInput","paste"]);Oi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Oi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Oi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qP=new Set("cancel close invalid load scroll toggle".split(" ").concat(jo));function Iv(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,WC(r,e,void 0,t),t.currentTarget=null}function sT(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],u=a.instance,c=a.currentTarget;if(a=a.listener,u!==s&&i.isPropagationStopped())break e;Iv(i,a,c),s=u}else for(o=0;o<r.length;o++){if(a=r[o],u=a.instance,c=a.currentTarget,a=a.listener,u!==s&&i.isPropagationStopped())break e;Iv(i,a,c),s=u}}}if(Ou)throw t=nf,Ou=!1,nf=null,t}function Te(t,e){var n=e[ff];n===void 0&&(n=e[ff]=new Set);var r=t+"__bubble";n.has(r)||(oT(e,t,2,!1),n.add(r))}function Yh(t,e,n){var r=0;e&&(r|=4),oT(n,t,r,e)}var Bl="_reactListening"+Math.random().toString(36).slice(2);function _a(t){if(!t[Bl]){t[Bl]=!0,fE.forEach(function(n){n!=="selectionchange"&&(qP.has(n)||Yh(n,!1,t),Yh(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Bl]||(e[Bl]=!0,Yh("selectionchange",!1,e))}}function oT(t,e,n,r){switch($E(e)){case 1:var i=oP;break;case 4:i=aP;break;default:i=Qp}n=i.bind(null,e,n,t),i=void 0,!tf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Xh(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;a!==null;){if(o=pi(a),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}a=a.parentNode}}r=r.return}RE(function(){var c=s,h=Hp(n),d=[];e:{var p=iT.get(t);if(p!==void 0){var g=Xp,E=t;switch(t){case"keypress":if(cu(n)===0)break e;case"keydown":case"keyup":g=TP;break;case"focusin":E="focus",g=Wh;break;case"focusout":E="blur",g=Wh;break;case"beforeblur":case"afterblur":g=Wh;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=fv;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=cP;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=IP;break;case eT:case tT:case nT:g=fP;break;case rT:g=CP;break;case"scroll":g=lP;break;case"wheel":g=RP;break;case"copy":case"cut":case"paste":g=mP;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=mv}var A=(e&4)!==0,C=!A&&t==="scroll",w=A?p!==null?p+"Capture":null:p;A=[];for(var v=c,T;v!==null;){T=v;var N=T.stateNode;if(T.tag===5&&N!==null&&(T=N,w!==null&&(N=fa(v,w),N!=null&&A.push(wa(v,N,T)))),C)break;v=v.return}0<A.length&&(p=new g(p,E,null,n,h),d.push({event:p,listeners:A}))}}if(!(e&7)){e:{if(p=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",p&&n!==Zd&&(E=n.relatedTarget||n.fromElement)&&(pi(E)||E[er]))break e;if((g||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,g?(E=n.relatedTarget||n.toElement,g=c,E=E?pi(E):null,E!==null&&(C=Fi(E),E!==C||E.tag!==5&&E.tag!==6)&&(E=null)):(g=null,E=c),g!==E)){if(A=fv,N="onMouseLeave",w="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(A=mv,N="onPointerLeave",w="onPointerEnter",v="pointer"),C=g==null?p:us(g),T=E==null?p:us(E),p=new A(N,v+"leave",g,n,h),p.target=C,p.relatedTarget=T,N=null,pi(h)===c&&(A=new A(w,v+"enter",E,n,h),A.target=T,A.relatedTarget=C,N=A),C=N,g&&E)t:{for(A=g,w=E,v=0,T=A;T;T=Ji(T))v++;for(T=0,N=w;N;N=Ji(N))T++;for(;0<v-T;)A=Ji(A),v--;for(;0<T-v;)w=Ji(w),T--;for(;v--;){if(A===w||w!==null&&A===w.alternate)break t;A=Ji(A),w=Ji(w)}A=null}else A=null;g!==null&&Av(d,p,g,A,!1),E!==null&&C!==null&&Av(d,C,E,A,!0)}}e:{if(p=c?us(c):window,g=p.nodeName&&p.nodeName.toLowerCase(),g==="select"||g==="input"&&p.type==="file")var L=MP;else if(vv(p))if(QE)L=UP;else{L=FP;var O=OP}else(g=p.nodeName)&&g.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(L=jP);if(L&&(L=L(t,c))){KE(d,L,n,h);break e}O&&O(t,p,c),t==="focusout"&&(O=p._wrapperState)&&O.controlled&&p.type==="number"&&Kd(p,"number",p.value)}switch(O=c?us(c):window,t){case"focusin":(vv(O)||O.contentEditable==="true")&&(as=O,af=c,Yo=null);break;case"focusout":Yo=af=as=null;break;case"mousedown":lf=!0;break;case"contextmenu":case"mouseup":case"dragend":lf=!1,xv(d,n,h);break;case"selectionchange":if($P)break;case"keydown":case"keyup":xv(d,n,h)}var S;if(Zp)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else os?qE(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(HE&&n.locale!=="ko"&&(os||y!=="onCompositionStart"?y==="onCompositionEnd"&&os&&(S=WE()):(Sr=h,Yp="value"in Sr?Sr.value:Sr.textContent,os=!0)),O=zu(c,y),0<O.length&&(y=new pv(y,t,null,n,h),d.push({event:y,listeners:O}),S?y.data=S:(S=GE(n),S!==null&&(y.data=S)))),(S=bP?NP(t,n):DP(t,n))&&(c=zu(c,"onBeforeInput"),0<c.length&&(h=new pv("onBeforeInput","beforeinput",null,n,h),d.push({event:h,listeners:c}),h.data=S))}sT(d,e)})}function wa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function zu(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=fa(t,n),s!=null&&r.unshift(wa(t,s,i)),s=fa(t,e),s!=null&&r.push(wa(t,s,i))),t=t.return}return r}function Ji(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Av(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var a=n,u=a.alternate,c=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&c!==null&&(a=c,i?(u=fa(n,s),u!=null&&o.unshift(wa(n,u,a))):i||(u=fa(n,s),u!=null&&o.push(wa(n,u,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var GP=/\r\n?/g,KP=/\u0000|\uFFFD/g;function Cv(t){return(typeof t=="string"?t:""+t).replace(GP,`
`).replace(KP,"")}function zl(t,e,n){if(e=Cv(e),Cv(t)!==e&&n)throw Error(z(425))}function $u(){}var uf=null,cf=null;function hf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var df=typeof setTimeout=="function"?setTimeout:void 0,QP=typeof clearTimeout=="function"?clearTimeout:void 0,Pv=typeof Promise=="function"?Promise:void 0,YP=typeof queueMicrotask=="function"?queueMicrotask:typeof Pv<"u"?function(t){return Pv.resolve(null).then(t).catch(XP)}:df;function XP(t){setTimeout(function(){throw t})}function Jh(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ga(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ga(e)}function Vr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Rv(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Zs=Math.random().toString(36).slice(2),Rn="__reactFiber$"+Zs,Ea="__reactProps$"+Zs,er="__reactContainer$"+Zs,ff="__reactEvents$"+Zs,JP="__reactListeners$"+Zs,ZP="__reactHandles$"+Zs;function pi(t){var e=t[Rn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[er]||n[Rn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Rv(t);t!==null;){if(n=t[Rn])return n;t=Rv(t)}return e}t=n,n=t.parentNode}return null}function Qa(t){return t=t[Rn]||t[er],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function us(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(z(33))}function Lc(t){return t[Ea]||null}var pf=[],cs=-1;function Jr(t){return{current:t}}function Ie(t){0>cs||(t.current=pf[cs],pf[cs]=null,cs--)}function we(t,e){cs++,pf[cs]=t.current,t.current=e}var Hr={},At=Jr(Hr),zt=Jr(!1),Ci=Hr;function Ns(t,e){var n=t.type.contextTypes;if(!n)return Hr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function $t(t){return t=t.childContextTypes,t!=null}function Wu(){Ie(zt),Ie(At)}function kv(t,e,n){if(At.current!==Hr)throw Error(z(168));we(At,e),we(zt,n)}function aT(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(z(108,OC(t)||"Unknown",i));return Ne({},n,r)}function Hu(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Hr,Ci=At.current,we(At,t),we(zt,zt.current),!0}function bv(t,e,n){var r=t.stateNode;if(!r)throw Error(z(169));n?(t=aT(t,e,Ci),r.__reactInternalMemoizedMergedChildContext=t,Ie(zt),Ie(At),we(At,t)):Ie(zt),we(zt,n)}var Hn=null,Mc=!1,Zh=!1;function lT(t){Hn===null?Hn=[t]:Hn.push(t)}function eR(t){Mc=!0,lT(t)}function Zr(){if(!Zh&&Hn!==null){Zh=!0;var t=0,e=fe;try{var n=Hn;for(fe=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Hn=null,Mc=!1}catch(i){throw Hn!==null&&(Hn=Hn.slice(t+1)),DE(qp,Zr),i}finally{fe=e,Zh=!1}}return null}var hs=[],ds=0,qu=null,Gu=0,nn=[],rn=0,Pi=null,Gn=1,Kn="";function ci(t,e){hs[ds++]=Gu,hs[ds++]=qu,qu=t,Gu=e}function uT(t,e,n){nn[rn++]=Gn,nn[rn++]=Kn,nn[rn++]=Pi,Pi=t;var r=Gn;t=Kn;var i=32-vn(r)-1;r&=~(1<<i),n+=1;var s=32-vn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Gn=1<<32-vn(e)+i|n<<i|r,Kn=s+t}else Gn=1<<s|n<<i|r,Kn=t}function tm(t){t.return!==null&&(ci(t,1),uT(t,1,0))}function nm(t){for(;t===qu;)qu=hs[--ds],hs[ds]=null,Gu=hs[--ds],hs[ds]=null;for(;t===Pi;)Pi=nn[--rn],nn[rn]=null,Kn=nn[--rn],nn[rn]=null,Gn=nn[--rn],nn[rn]=null}var Xt=null,Qt=null,Ce=!1,yn=null;function cT(t,e){var n=sn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Nv(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Xt=t,Qt=Vr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Xt=t,Qt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Pi!==null?{id:Gn,overflow:Kn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=sn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Xt=t,Qt=null,!0):!1;default:return!1}}function mf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function gf(t){if(Ce){var e=Qt;if(e){var n=e;if(!Nv(t,e)){if(mf(t))throw Error(z(418));e=Vr(n.nextSibling);var r=Xt;e&&Nv(t,e)?cT(r,n):(t.flags=t.flags&-4097|2,Ce=!1,Xt=t)}}else{if(mf(t))throw Error(z(418));t.flags=t.flags&-4097|2,Ce=!1,Xt=t}}}function Dv(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Xt=t}function $l(t){if(t!==Xt)return!1;if(!Ce)return Dv(t),Ce=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!hf(t.type,t.memoizedProps)),e&&(e=Qt)){if(mf(t))throw hT(),Error(z(418));for(;e;)cT(t,e),e=Vr(e.nextSibling)}if(Dv(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(z(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Qt=Vr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Qt=null}}else Qt=Xt?Vr(t.stateNode.nextSibling):null;return!0}function hT(){for(var t=Qt;t;)t=Vr(t.nextSibling)}function Ds(){Qt=Xt=null,Ce=!1}function rm(t){yn===null?yn=[t]:yn.push(t)}var tR=lr.ReactCurrentBatchConfig;function bo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(z(309));var r=n.stateNode}if(!r)throw Error(z(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(z(284));if(!n._owner)throw Error(z(290,t))}return t}function Wl(t,e){throw t=Object.prototype.toString.call(e),Error(z(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Vv(t){var e=t._init;return e(t._payload)}function dT(t){function e(w,v){if(t){var T=w.deletions;T===null?(w.deletions=[v],w.flags|=16):T.push(v)}}function n(w,v){if(!t)return null;for(;v!==null;)e(w,v),v=v.sibling;return null}function r(w,v){for(w=new Map;v!==null;)v.key!==null?w.set(v.key,v):w.set(v.index,v),v=v.sibling;return w}function i(w,v){return w=Fr(w,v),w.index=0,w.sibling=null,w}function s(w,v,T){return w.index=T,t?(T=w.alternate,T!==null?(T=T.index,T<v?(w.flags|=2,v):T):(w.flags|=2,v)):(w.flags|=1048576,v)}function o(w){return t&&w.alternate===null&&(w.flags|=2),w}function a(w,v,T,N){return v===null||v.tag!==6?(v=od(T,w.mode,N),v.return=w,v):(v=i(v,T),v.return=w,v)}function u(w,v,T,N){var L=T.type;return L===ss?h(w,v,T.props.children,N,T.key):v!==null&&(v.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===yr&&Vv(L)===v.type)?(N=i(v,T.props),N.ref=bo(w,v,T),N.return=w,N):(N=yu(T.type,T.key,T.props,null,w.mode,N),N.ref=bo(w,v,T),N.return=w,N)}function c(w,v,T,N){return v===null||v.tag!==4||v.stateNode.containerInfo!==T.containerInfo||v.stateNode.implementation!==T.implementation?(v=ad(T,w.mode,N),v.return=w,v):(v=i(v,T.children||[]),v.return=w,v)}function h(w,v,T,N,L){return v===null||v.tag!==7?(v=Ei(T,w.mode,N,L),v.return=w,v):(v=i(v,T),v.return=w,v)}function d(w,v,T){if(typeof v=="string"&&v!==""||typeof v=="number")return v=od(""+v,w.mode,T),v.return=w,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Dl:return T=yu(v.type,v.key,v.props,null,w.mode,T),T.ref=bo(w,null,v),T.return=w,T;case is:return v=ad(v,w.mode,T),v.return=w,v;case yr:var N=v._init;return d(w,N(v._payload),T)}if(Oo(v)||Ao(v))return v=Ei(v,w.mode,T,null),v.return=w,v;Wl(w,v)}return null}function p(w,v,T,N){var L=v!==null?v.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return L!==null?null:a(w,v,""+T,N);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Dl:return T.key===L?u(w,v,T,N):null;case is:return T.key===L?c(w,v,T,N):null;case yr:return L=T._init,p(w,v,L(T._payload),N)}if(Oo(T)||Ao(T))return L!==null?null:h(w,v,T,N,null);Wl(w,T)}return null}function g(w,v,T,N,L){if(typeof N=="string"&&N!==""||typeof N=="number")return w=w.get(T)||null,a(v,w,""+N,L);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Dl:return w=w.get(N.key===null?T:N.key)||null,u(v,w,N,L);case is:return w=w.get(N.key===null?T:N.key)||null,c(v,w,N,L);case yr:var O=N._init;return g(w,v,T,O(N._payload),L)}if(Oo(N)||Ao(N))return w=w.get(T)||null,h(v,w,N,L,null);Wl(v,N)}return null}function E(w,v,T,N){for(var L=null,O=null,S=v,y=v=0,I=null;S!==null&&y<T.length;y++){S.index>y?(I=S,S=null):I=S.sibling;var x=p(w,S,T[y],N);if(x===null){S===null&&(S=I);break}t&&S&&x.alternate===null&&e(w,S),v=s(x,v,y),O===null?L=x:O.sibling=x,O=x,S=I}if(y===T.length)return n(w,S),Ce&&ci(w,y),L;if(S===null){for(;y<T.length;y++)S=d(w,T[y],N),S!==null&&(v=s(S,v,y),O===null?L=S:O.sibling=S,O=S);return Ce&&ci(w,y),L}for(S=r(w,S);y<T.length;y++)I=g(S,w,y,T[y],N),I!==null&&(t&&I.alternate!==null&&S.delete(I.key===null?y:I.key),v=s(I,v,y),O===null?L=I:O.sibling=I,O=I);return t&&S.forEach(function(k){return e(w,k)}),Ce&&ci(w,y),L}function A(w,v,T,N){var L=Ao(T);if(typeof L!="function")throw Error(z(150));if(T=L.call(T),T==null)throw Error(z(151));for(var O=L=null,S=v,y=v=0,I=null,x=T.next();S!==null&&!x.done;y++,x=T.next()){S.index>y?(I=S,S=null):I=S.sibling;var k=p(w,S,x.value,N);if(k===null){S===null&&(S=I);break}t&&S&&k.alternate===null&&e(w,S),v=s(k,v,y),O===null?L=k:O.sibling=k,O=k,S=I}if(x.done)return n(w,S),Ce&&ci(w,y),L;if(S===null){for(;!x.done;y++,x=T.next())x=d(w,x.value,N),x!==null&&(v=s(x,v,y),O===null?L=x:O.sibling=x,O=x);return Ce&&ci(w,y),L}for(S=r(w,S);!x.done;y++,x=T.next())x=g(S,w,y,x.value,N),x!==null&&(t&&x.alternate!==null&&S.delete(x.key===null?y:x.key),v=s(x,v,y),O===null?L=x:O.sibling=x,O=x);return t&&S.forEach(function(b){return e(w,b)}),Ce&&ci(w,y),L}function C(w,v,T,N){if(typeof T=="object"&&T!==null&&T.type===ss&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case Dl:e:{for(var L=T.key,O=v;O!==null;){if(O.key===L){if(L=T.type,L===ss){if(O.tag===7){n(w,O.sibling),v=i(O,T.props.children),v.return=w,w=v;break e}}else if(O.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===yr&&Vv(L)===O.type){n(w,O.sibling),v=i(O,T.props),v.ref=bo(w,O,T),v.return=w,w=v;break e}n(w,O);break}else e(w,O);O=O.sibling}T.type===ss?(v=Ei(T.props.children,w.mode,N,T.key),v.return=w,w=v):(N=yu(T.type,T.key,T.props,null,w.mode,N),N.ref=bo(w,v,T),N.return=w,w=N)}return o(w);case is:e:{for(O=T.key;v!==null;){if(v.key===O)if(v.tag===4&&v.stateNode.containerInfo===T.containerInfo&&v.stateNode.implementation===T.implementation){n(w,v.sibling),v=i(v,T.children||[]),v.return=w,w=v;break e}else{n(w,v);break}else e(w,v);v=v.sibling}v=ad(T,w.mode,N),v.return=w,w=v}return o(w);case yr:return O=T._init,C(w,v,O(T._payload),N)}if(Oo(T))return E(w,v,T,N);if(Ao(T))return A(w,v,T,N);Wl(w,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,v!==null&&v.tag===6?(n(w,v.sibling),v=i(v,T),v.return=w,w=v):(n(w,v),v=od(T,w.mode,N),v.return=w,w=v),o(w)):n(w,v)}return C}var Vs=dT(!0),fT=dT(!1),Ku=Jr(null),Qu=null,fs=null,im=null;function sm(){im=fs=Qu=null}function om(t){var e=Ku.current;Ie(Ku),t._currentValue=e}function yf(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Ss(t,e){Qu=t,im=fs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Bt=!0),t.firstContext=null)}function un(t){var e=t._currentValue;if(im!==t)if(t={context:t,memoizedValue:e,next:null},fs===null){if(Qu===null)throw Error(z(308));fs=t,Qu.dependencies={lanes:0,firstContext:t}}else fs=fs.next=t;return e}var mi=null;function am(t){mi===null?mi=[t]:mi.push(t)}function pT(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,am(e)):(n.next=i.next,i.next=n),e.interleaved=n,tr(t,r)}function tr(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var vr=!1;function lm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function mT(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Jn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Lr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ce&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,tr(t,n)}return i=r.interleaved,i===null?(e.next=e,am(r)):(e.next=i.next,i.next=e),r.interleaved=e,tr(t,n)}function hu(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Gp(t,n)}}function Lv(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Yu(t,e,n,r){var i=t.updateQueue;vr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var u=a,c=u.next;u.next=null,o===null?s=c:o.next=c,o=u;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=u))}if(s!==null){var d=i.baseState;o=0,h=c=u=null,a=s;do{var p=a.lane,g=a.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:g,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var E=t,A=a;switch(p=e,g=n,A.tag){case 1:if(E=A.payload,typeof E=="function"){d=E.call(g,d,p);break e}d=E;break e;case 3:E.flags=E.flags&-65537|128;case 0:if(E=A.payload,p=typeof E=="function"?E.call(g,d,p):E,p==null)break e;d=Ne({},d,p);break e;case 2:vr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else g={eventTime:g,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=g,u=d):h=h.next=g,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(h===null&&(u=d),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=h,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);ki|=o,t.lanes=o,t.memoizedState=d}}function Mv(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(z(191,i));i.call(r)}}}var Ya={},bn=Jr(Ya),Ta=Jr(Ya),xa=Jr(Ya);function gi(t){if(t===Ya)throw Error(z(174));return t}function um(t,e){switch(we(xa,e),we(Ta,t),we(bn,Ya),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Yd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Yd(e,t)}Ie(bn),we(bn,e)}function Ls(){Ie(bn),Ie(Ta),Ie(xa)}function gT(t){gi(xa.current);var e=gi(bn.current),n=Yd(e,t.type);e!==n&&(we(Ta,t),we(bn,n))}function cm(t){Ta.current===t&&(Ie(bn),Ie(Ta))}var ke=Jr(0);function Xu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ed=[];function hm(){for(var t=0;t<ed.length;t++)ed[t]._workInProgressVersionPrimary=null;ed.length=0}var du=lr.ReactCurrentDispatcher,td=lr.ReactCurrentBatchConfig,Ri=0,be=null,Qe=null,tt=null,Ju=!1,Xo=!1,Sa=0,nR=0;function vt(){throw Error(z(321))}function dm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!En(t[n],e[n]))return!1;return!0}function fm(t,e,n,r,i,s){if(Ri=s,be=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,du.current=t===null||t.memoizedState===null?oR:aR,t=n(r,i),Xo){s=0;do{if(Xo=!1,Sa=0,25<=s)throw Error(z(301));s+=1,tt=Qe=null,e.updateQueue=null,du.current=lR,t=n(r,i)}while(Xo)}if(du.current=Zu,e=Qe!==null&&Qe.next!==null,Ri=0,tt=Qe=be=null,Ju=!1,e)throw Error(z(300));return t}function pm(){var t=Sa!==0;return Sa=0,t}function In(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tt===null?be.memoizedState=tt=t:tt=tt.next=t,tt}function cn(){if(Qe===null){var t=be.alternate;t=t!==null?t.memoizedState:null}else t=Qe.next;var e=tt===null?be.memoizedState:tt.next;if(e!==null)tt=e,Qe=t;else{if(t===null)throw Error(z(310));Qe=t,t={memoizedState:Qe.memoizedState,baseState:Qe.baseState,baseQueue:Qe.baseQueue,queue:Qe.queue,next:null},tt===null?be.memoizedState=tt=t:tt=tt.next=t}return tt}function Ia(t,e){return typeof e=="function"?e(t):e}function nd(t){var e=cn(),n=e.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=t;var r=Qe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,u=null,c=s;do{var h=c.lane;if((Ri&h)===h)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(a=u=d,o=r):u=u.next=d,be.lanes|=h,ki|=h}c=c.next}while(c!==null&&c!==s);u===null?o=r:u.next=a,En(r,e.memoizedState)||(Bt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,be.lanes|=s,ki|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function rd(t){var e=cn(),n=e.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);En(s,e.memoizedState)||(Bt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function yT(){}function vT(t,e){var n=be,r=cn(),i=e(),s=!En(r.memoizedState,i);if(s&&(r.memoizedState=i,Bt=!0),r=r.queue,mm(ET.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||tt!==null&&tt.memoizedState.tag&1){if(n.flags|=2048,Aa(9,wT.bind(null,n,r,i,e),void 0,null),nt===null)throw Error(z(349));Ri&30||_T(n,e,i)}return i}function _T(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=be.updateQueue,e===null?(e={lastEffect:null,stores:null},be.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function wT(t,e,n,r){e.value=n,e.getSnapshot=r,TT(e)&&xT(t)}function ET(t,e,n){return n(function(){TT(e)&&xT(t)})}function TT(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!En(t,n)}catch{return!0}}function xT(t){var e=tr(t,1);e!==null&&_n(e,t,1,-1)}function Ov(t){var e=In();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ia,lastRenderedState:t},e.queue=t,t=t.dispatch=sR.bind(null,be,t),[e.memoizedState,t]}function Aa(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=be.updateQueue,e===null?(e={lastEffect:null,stores:null},be.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function ST(){return cn().memoizedState}function fu(t,e,n,r){var i=In();be.flags|=t,i.memoizedState=Aa(1|e,n,void 0,r===void 0?null:r)}function Oc(t,e,n,r){var i=cn();r=r===void 0?null:r;var s=void 0;if(Qe!==null){var o=Qe.memoizedState;if(s=o.destroy,r!==null&&dm(r,o.deps)){i.memoizedState=Aa(e,n,s,r);return}}be.flags|=t,i.memoizedState=Aa(1|e,n,s,r)}function Fv(t,e){return fu(8390656,8,t,e)}function mm(t,e){return Oc(2048,8,t,e)}function IT(t,e){return Oc(4,2,t,e)}function AT(t,e){return Oc(4,4,t,e)}function CT(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function PT(t,e,n){return n=n!=null?n.concat([t]):null,Oc(4,4,CT.bind(null,e,t),n)}function gm(){}function RT(t,e){var n=cn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&dm(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function kT(t,e){var n=cn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&dm(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function bT(t,e,n){return Ri&21?(En(n,e)||(n=ME(),be.lanes|=n,ki|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Bt=!0),t.memoizedState=n)}function rR(t,e){var n=fe;fe=n!==0&&4>n?n:4,t(!0);var r=td.transition;td.transition={};try{t(!1),e()}finally{fe=n,td.transition=r}}function NT(){return cn().memoizedState}function iR(t,e,n){var r=Or(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},DT(t))VT(e,n);else if(n=pT(t,e,n,r),n!==null){var i=Lt();_n(n,t,r,i),LT(n,e,r)}}function sR(t,e,n){var r=Or(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(DT(t))VT(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,En(a,o)){var u=e.interleaved;u===null?(i.next=i,am(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=pT(t,e,i,r),n!==null&&(i=Lt(),_n(n,t,r,i),LT(n,e,r))}}function DT(t){var e=t.alternate;return t===be||e!==null&&e===be}function VT(t,e){Xo=Ju=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function LT(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Gp(t,n)}}var Zu={readContext:un,useCallback:vt,useContext:vt,useEffect:vt,useImperativeHandle:vt,useInsertionEffect:vt,useLayoutEffect:vt,useMemo:vt,useReducer:vt,useRef:vt,useState:vt,useDebugValue:vt,useDeferredValue:vt,useTransition:vt,useMutableSource:vt,useSyncExternalStore:vt,useId:vt,unstable_isNewReconciler:!1},oR={readContext:un,useCallback:function(t,e){return In().memoizedState=[t,e===void 0?null:e],t},useContext:un,useEffect:Fv,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,fu(4194308,4,CT.bind(null,e,t),n)},useLayoutEffect:function(t,e){return fu(4194308,4,t,e)},useInsertionEffect:function(t,e){return fu(4,2,t,e)},useMemo:function(t,e){var n=In();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=In();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=iR.bind(null,be,t),[r.memoizedState,t]},useRef:function(t){var e=In();return t={current:t},e.memoizedState=t},useState:Ov,useDebugValue:gm,useDeferredValue:function(t){return In().memoizedState=t},useTransition:function(){var t=Ov(!1),e=t[0];return t=rR.bind(null,t[1]),In().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=be,i=In();if(Ce){if(n===void 0)throw Error(z(407));n=n()}else{if(n=e(),nt===null)throw Error(z(349));Ri&30||_T(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Fv(ET.bind(null,r,s,t),[t]),r.flags|=2048,Aa(9,wT.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=In(),e=nt.identifierPrefix;if(Ce){var n=Kn,r=Gn;n=(r&~(1<<32-vn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Sa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=nR++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},aR={readContext:un,useCallback:RT,useContext:un,useEffect:mm,useImperativeHandle:PT,useInsertionEffect:IT,useLayoutEffect:AT,useMemo:kT,useReducer:nd,useRef:ST,useState:function(){return nd(Ia)},useDebugValue:gm,useDeferredValue:function(t){var e=cn();return bT(e,Qe.memoizedState,t)},useTransition:function(){var t=nd(Ia)[0],e=cn().memoizedState;return[t,e]},useMutableSource:yT,useSyncExternalStore:vT,useId:NT,unstable_isNewReconciler:!1},lR={readContext:un,useCallback:RT,useContext:un,useEffect:mm,useImperativeHandle:PT,useInsertionEffect:IT,useLayoutEffect:AT,useMemo:kT,useReducer:rd,useRef:ST,useState:function(){return rd(Ia)},useDebugValue:gm,useDeferredValue:function(t){var e=cn();return Qe===null?e.memoizedState=t:bT(e,Qe.memoizedState,t)},useTransition:function(){var t=rd(Ia)[0],e=cn().memoizedState;return[t,e]},useMutableSource:yT,useSyncExternalStore:vT,useId:NT,unstable_isNewReconciler:!1};function mn(t,e){if(t&&t.defaultProps){e=Ne({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function vf(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ne({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fc={isMounted:function(t){return(t=t._reactInternals)?Fi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Lt(),i=Or(t),s=Jn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Lr(t,s,i),e!==null&&(_n(e,t,i,r),hu(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Lt(),i=Or(t),s=Jn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Lr(t,s,i),e!==null&&(_n(e,t,i,r),hu(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Lt(),r=Or(t),i=Jn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Lr(t,i,r),e!==null&&(_n(e,t,r,n),hu(e,t,r))}};function jv(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!va(n,r)||!va(i,s):!0}function MT(t,e,n){var r=!1,i=Hr,s=e.contextType;return typeof s=="object"&&s!==null?s=un(s):(i=$t(e)?Ci:At.current,r=e.contextTypes,s=(r=r!=null)?Ns(t,i):Hr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Uv(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Fc.enqueueReplaceState(e,e.state,null)}function _f(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},lm(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=un(s):(s=$t(e)?Ci:At.current,i.context=Ns(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(vf(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Fc.enqueueReplaceState(i,i.state,null),Yu(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Ms(t,e){try{var n="",r=e;do n+=MC(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function id(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function wf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var uR=typeof WeakMap=="function"?WeakMap:Map;function OT(t,e,n){n=Jn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){tc||(tc=!0,kf=r),wf(t,e)},n}function FT(t,e,n){n=Jn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){wf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){wf(t,e),typeof r!="function"&&(Mr===null?Mr=new Set([this]):Mr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Bv(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new uR;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=xR.bind(null,t,e,n),e.then(t,t))}function zv(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function $v(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Jn(-1,1),e.tag=2,Lr(n,e,1))),n.lanes|=1),t)}var cR=lr.ReactCurrentOwner,Bt=!1;function bt(t,e,n,r){e.child=t===null?fT(e,null,n,r):Vs(e,t.child,n,r)}function Wv(t,e,n,r,i){n=n.render;var s=e.ref;return Ss(e,i),r=fm(t,e,n,r,s,i),n=pm(),t!==null&&!Bt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,nr(t,e,i)):(Ce&&n&&tm(e),e.flags|=1,bt(t,e,r,i),e.child)}function Hv(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Sm(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,jT(t,e,s,r,i)):(t=yu(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:va,n(o,r)&&t.ref===e.ref)return nr(t,e,i)}return e.flags|=1,t=Fr(s,r),t.ref=e.ref,t.return=e,e.child=t}function jT(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(va(s,r)&&t.ref===e.ref)if(Bt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Bt=!0);else return e.lanes=t.lanes,nr(t,e,i)}return Ef(t,e,n,r,i)}function UT(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},we(ms,Kt),Kt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,we(ms,Kt),Kt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,we(ms,Kt),Kt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,we(ms,Kt),Kt|=r;return bt(t,e,i,n),e.child}function BT(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ef(t,e,n,r,i){var s=$t(n)?Ci:At.current;return s=Ns(e,s),Ss(e,i),n=fm(t,e,n,r,s,i),r=pm(),t!==null&&!Bt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,nr(t,e,i)):(Ce&&r&&tm(e),e.flags|=1,bt(t,e,n,i),e.child)}function qv(t,e,n,r,i){if($t(n)){var s=!0;Hu(e)}else s=!1;if(Ss(e,i),e.stateNode===null)pu(t,e),MT(e,n,r),_f(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=un(c):(c=$t(n)?Ci:At.current,c=Ns(e,c));var h=n.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||u!==c)&&Uv(e,o,r,c),vr=!1;var p=e.memoizedState;o.state=p,Yu(e,r,o,i),u=e.memoizedState,a!==r||p!==u||zt.current||vr?(typeof h=="function"&&(vf(e,n,h,r),u=e.memoizedState),(a=vr||jv(e,n,a,r,p,u,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,mT(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:mn(e.type,a),o.props=c,d=e.pendingProps,p=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=un(u):(u=$t(n)?Ci:At.current,u=Ns(e,u));var g=n.getDerivedStateFromProps;(h=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||p!==u)&&Uv(e,o,r,u),vr=!1,p=e.memoizedState,o.state=p,Yu(e,r,o,i);var E=e.memoizedState;a!==d||p!==E||zt.current||vr?(typeof g=="function"&&(vf(e,n,g,r),E=e.memoizedState),(c=vr||jv(e,n,c,r,p,E,u)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,E,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,E,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=E),o.props=r,o.state=E,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),r=!1)}return Tf(t,e,n,r,s,i)}function Tf(t,e,n,r,i,s){BT(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&bv(e,n,!1),nr(t,e,s);r=e.stateNode,cR.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Vs(e,t.child,null,s),e.child=Vs(e,null,a,s)):bt(t,e,a,s),e.memoizedState=r.state,i&&bv(e,n,!0),e.child}function zT(t){var e=t.stateNode;e.pendingContext?kv(t,e.pendingContext,e.pendingContext!==e.context):e.context&&kv(t,e.context,!1),um(t,e.containerInfo)}function Gv(t,e,n,r,i){return Ds(),rm(i),e.flags|=256,bt(t,e,n,r),e.child}var xf={dehydrated:null,treeContext:null,retryLane:0};function Sf(t){return{baseLanes:t,cachePool:null,transitions:null}}function $T(t,e,n){var r=e.pendingProps,i=ke.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(i&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),we(ke,i&1),t===null)return gf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Bc(o,r,0,null),t=Ei(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Sf(n),e.memoizedState=xf,t):ym(e,o));if(i=t.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return hR(t,e,o,r,a,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,a=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Fr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Fr(a,s):(s=Ei(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?Sf(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=xf,r}return s=t.child,t=s.sibling,r=Fr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function ym(t,e){return e=Bc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Hl(t,e,n,r){return r!==null&&rm(r),Vs(e,t.child,null,n),t=ym(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function hR(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=id(Error(z(422))),Hl(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Bc({mode:"visible",children:r.children},i,0,null),s=Ei(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Vs(e,t.child,null,o),e.child.memoizedState=Sf(o),e.memoizedState=xf,s);if(!(e.mode&1))return Hl(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(z(419)),r=id(s,r,void 0),Hl(t,e,o,r)}if(a=(o&t.childLanes)!==0,Bt||a){if(r=nt,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,tr(t,i),_n(r,t,i,-1))}return xm(),r=id(Error(z(421))),Hl(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=SR.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Qt=Vr(i.nextSibling),Xt=e,Ce=!0,yn=null,t!==null&&(nn[rn++]=Gn,nn[rn++]=Kn,nn[rn++]=Pi,Gn=t.id,Kn=t.overflow,Pi=e),e=ym(e,r.children),e.flags|=4096,e)}function Kv(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),yf(t.return,e,n)}function sd(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function WT(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(bt(t,e,r.children,n),r=ke.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Kv(t,n,e);else if(t.tag===19)Kv(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(we(ke,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Xu(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),sd(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Xu(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}sd(e,!0,n,null,s);break;case"together":sd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function pu(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function nr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ki|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(z(153));if(e.child!==null){for(t=e.child,n=Fr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Fr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function dR(t,e,n){switch(e.tag){case 3:zT(e),Ds();break;case 5:gT(e);break;case 1:$t(e.type)&&Hu(e);break;case 4:um(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;we(Ku,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(we(ke,ke.current&1),e.flags|=128,null):n&e.child.childLanes?$T(t,e,n):(we(ke,ke.current&1),t=nr(t,e,n),t!==null?t.sibling:null);we(ke,ke.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return WT(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),we(ke,ke.current),r)break;return null;case 22:case 23:return e.lanes=0,UT(t,e,n)}return nr(t,e,n)}var HT,If,qT,GT;HT=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};If=function(){};qT=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,gi(bn.current);var s=null;switch(n){case"input":i=qd(t,i),r=qd(t,r),s=[];break;case"select":i=Ne({},i,{value:void 0}),r=Ne({},r,{value:void 0}),s=[];break;case"textarea":i=Qd(t,i),r=Qd(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=$u)}Xd(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ha.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var u=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==a&&(u!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&a[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(s=s||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ha.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&Te("scroll",t),s||a===u||(s=[])):(s=s||[]).push(c,u))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};GT=function(t,e,n,r){n!==r&&(e.flags|=4)};function No(t,e){if(!Ce)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function _t(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function fR(t,e,n){var r=e.pendingProps;switch(nm(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _t(e),null;case 1:return $t(e.type)&&Wu(),_t(e),null;case 3:return r=e.stateNode,Ls(),Ie(zt),Ie(At),hm(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&($l(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,yn!==null&&(Df(yn),yn=null))),If(t,e),_t(e),null;case 5:cm(e);var i=gi(xa.current);if(n=e.type,t!==null&&e.stateNode!=null)qT(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(z(166));return _t(e),null}if(t=gi(bn.current),$l(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[Rn]=e,r[Ea]=s,t=(e.mode&1)!==0,n){case"dialog":Te("cancel",r),Te("close",r);break;case"iframe":case"object":case"embed":Te("load",r);break;case"video":case"audio":for(i=0;i<jo.length;i++)Te(jo[i],r);break;case"source":Te("error",r);break;case"img":case"image":case"link":Te("error",r),Te("load",r);break;case"details":Te("toggle",r);break;case"input":rv(r,s),Te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Te("invalid",r);break;case"textarea":sv(r,s),Te("invalid",r)}Xd(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&zl(r.textContent,a,t),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&zl(r.textContent,a,t),i=["children",""+a]):ha.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Te("scroll",r)}switch(n){case"input":Vl(r),iv(r,s,!0);break;case"textarea":Vl(r),ov(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=$u)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=EE(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[Rn]=e,t[Ea]=r,HT(t,e,!1,!1),e.stateNode=t;e:{switch(o=Jd(n,r),n){case"dialog":Te("cancel",t),Te("close",t),i=r;break;case"iframe":case"object":case"embed":Te("load",t),i=r;break;case"video":case"audio":for(i=0;i<jo.length;i++)Te(jo[i],t);i=r;break;case"source":Te("error",t),i=r;break;case"img":case"image":case"link":Te("error",t),Te("load",t),i=r;break;case"details":Te("toggle",t),i=r;break;case"input":rv(t,r),i=qd(t,r),Te("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ne({},r,{value:void 0}),Te("invalid",t);break;case"textarea":sv(t,r),i=Qd(t,r),Te("invalid",t);break;default:i=r}Xd(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var u=a[s];s==="style"?SE(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&TE(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&da(t,u):typeof u=="number"&&da(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ha.hasOwnProperty(s)?u!=null&&s==="onScroll"&&Te("scroll",t):u!=null&&Bp(t,s,u,o))}switch(n){case"input":Vl(t),iv(t,r,!1);break;case"textarea":Vl(t),ov(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Wr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?ws(t,!!r.multiple,s,!1):r.defaultValue!=null&&ws(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=$u)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return _t(e),null;case 6:if(t&&e.stateNode!=null)GT(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(z(166));if(n=gi(xa.current),gi(bn.current),$l(e)){if(r=e.stateNode,n=e.memoizedProps,r[Rn]=e,(s=r.nodeValue!==n)&&(t=Xt,t!==null))switch(t.tag){case 3:zl(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&zl(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Rn]=e,e.stateNode=r}return _t(e),null;case 13:if(Ie(ke),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ce&&Qt!==null&&e.mode&1&&!(e.flags&128))hT(),Ds(),e.flags|=98560,s=!1;else if(s=$l(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(z(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(z(317));s[Rn]=e}else Ds(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;_t(e),s=!1}else yn!==null&&(Df(yn),yn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ke.current&1?Ye===0&&(Ye=3):xm())),e.updateQueue!==null&&(e.flags|=4),_t(e),null);case 4:return Ls(),If(t,e),t===null&&_a(e.stateNode.containerInfo),_t(e),null;case 10:return om(e.type._context),_t(e),null;case 17:return $t(e.type)&&Wu(),_t(e),null;case 19:if(Ie(ke),s=e.memoizedState,s===null)return _t(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)No(s,!1);else{if(Ye!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Xu(t),o!==null){for(e.flags|=128,No(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return we(ke,ke.current&1|2),e.child}t=t.sibling}s.tail!==null&&Be()>Os&&(e.flags|=128,r=!0,No(s,!1),e.lanes=4194304)}else{if(!r)if(t=Xu(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),No(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ce)return _t(e),null}else 2*Be()-s.renderingStartTime>Os&&n!==1073741824&&(e.flags|=128,r=!0,No(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Be(),e.sibling=null,n=ke.current,we(ke,r?n&1|2:n&1),e):(_t(e),null);case 22:case 23:return Tm(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Kt&1073741824&&(_t(e),e.subtreeFlags&6&&(e.flags|=8192)):_t(e),null;case 24:return null;case 25:return null}throw Error(z(156,e.tag))}function pR(t,e){switch(nm(e),e.tag){case 1:return $t(e.type)&&Wu(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ls(),Ie(zt),Ie(At),hm(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return cm(e),null;case 13:if(Ie(ke),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(z(340));Ds()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ie(ke),null;case 4:return Ls(),null;case 10:return om(e.type._context),null;case 22:case 23:return Tm(),null;case 24:return null;default:return null}}var ql=!1,xt=!1,mR=typeof WeakSet=="function"?WeakSet:Set,q=null;function ps(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Fe(t,e,r)}else n.current=null}function Af(t,e,n){try{n()}catch(r){Fe(t,e,r)}}var Qv=!1;function gR(t,e){if(uf=Uu,t=JE(),em(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,u=-1,c=0,h=0,d=t,p=null;t:for(;;){for(var g;d!==n||i!==0&&d.nodeType!==3||(a=o+i),d!==s||r!==0&&d.nodeType!==3||(u=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(g=d.firstChild)!==null;)p=d,d=g;for(;;){if(d===t)break t;if(p===n&&++c===i&&(a=o),p===s&&++h===r&&(u=o),(g=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=g}n=a===-1||u===-1?null:{start:a,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(cf={focusedElem:t,selectionRange:n},Uu=!1,q=e;q!==null;)if(e=q,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,q=t;else for(;q!==null;){e=q;try{var E=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(E!==null){var A=E.memoizedProps,C=E.memoizedState,w=e.stateNode,v=w.getSnapshotBeforeUpdate(e.elementType===e.type?A:mn(e.type,A),C);w.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var T=e.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(N){Fe(e,e.return,N)}if(t=e.sibling,t!==null){t.return=e.return,q=t;break}q=e.return}return E=Qv,Qv=!1,E}function Jo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Af(e,n,s)}i=i.next}while(i!==r)}}function jc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Cf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function KT(t){var e=t.alternate;e!==null&&(t.alternate=null,KT(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Rn],delete e[Ea],delete e[ff],delete e[JP],delete e[ZP])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function QT(t){return t.tag===5||t.tag===3||t.tag===4}function Yv(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||QT(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Pf(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=$u));else if(r!==4&&(t=t.child,t!==null))for(Pf(t,e,n),t=t.sibling;t!==null;)Pf(t,e,n),t=t.sibling}function Rf(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Rf(t,e,n),t=t.sibling;t!==null;)Rf(t,e,n),t=t.sibling}var it=null,gn=!1;function fr(t,e,n){for(n=n.child;n!==null;)YT(t,e,n),n=n.sibling}function YT(t,e,n){if(kn&&typeof kn.onCommitFiberUnmount=="function")try{kn.onCommitFiberUnmount(bc,n)}catch{}switch(n.tag){case 5:xt||ps(n,e);case 6:var r=it,i=gn;it=null,fr(t,e,n),it=r,gn=i,it!==null&&(gn?(t=it,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):it.removeChild(n.stateNode));break;case 18:it!==null&&(gn?(t=it,n=n.stateNode,t.nodeType===8?Jh(t.parentNode,n):t.nodeType===1&&Jh(t,n),ga(t)):Jh(it,n.stateNode));break;case 4:r=it,i=gn,it=n.stateNode.containerInfo,gn=!0,fr(t,e,n),it=r,gn=i;break;case 0:case 11:case 14:case 15:if(!xt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Af(n,e,o),i=i.next}while(i!==r)}fr(t,e,n);break;case 1:if(!xt&&(ps(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Fe(n,e,a)}fr(t,e,n);break;case 21:fr(t,e,n);break;case 22:n.mode&1?(xt=(r=xt)||n.memoizedState!==null,fr(t,e,n),xt=r):fr(t,e,n);break;default:fr(t,e,n)}}function Xv(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new mR),e.forEach(function(r){var i=IR.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function dn(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:it=a.stateNode,gn=!1;break e;case 3:it=a.stateNode.containerInfo,gn=!0;break e;case 4:it=a.stateNode.containerInfo,gn=!0;break e}a=a.return}if(it===null)throw Error(z(160));YT(s,o,i),it=null,gn=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){Fe(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)XT(e,t),e=e.sibling}function XT(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(dn(e,t),Sn(t),r&4){try{Jo(3,t,t.return),jc(3,t)}catch(A){Fe(t,t.return,A)}try{Jo(5,t,t.return)}catch(A){Fe(t,t.return,A)}}break;case 1:dn(e,t),Sn(t),r&512&&n!==null&&ps(n,n.return);break;case 5:if(dn(e,t),Sn(t),r&512&&n!==null&&ps(n,n.return),t.flags&32){var i=t.stateNode;try{da(i,"")}catch(A){Fe(t,t.return,A)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&_E(i,s),Jd(a,o);var c=Jd(a,s);for(o=0;o<u.length;o+=2){var h=u[o],d=u[o+1];h==="style"?SE(i,d):h==="dangerouslySetInnerHTML"?TE(i,d):h==="children"?da(i,d):Bp(i,h,d,c)}switch(a){case"input":Gd(i,s);break;case"textarea":wE(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var g=s.value;g!=null?ws(i,!!s.multiple,g,!1):p!==!!s.multiple&&(s.defaultValue!=null?ws(i,!!s.multiple,s.defaultValue,!0):ws(i,!!s.multiple,s.multiple?[]:"",!1))}i[Ea]=s}catch(A){Fe(t,t.return,A)}}break;case 6:if(dn(e,t),Sn(t),r&4){if(t.stateNode===null)throw Error(z(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(A){Fe(t,t.return,A)}}break;case 3:if(dn(e,t),Sn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ga(e.containerInfo)}catch(A){Fe(t,t.return,A)}break;case 4:dn(e,t),Sn(t);break;case 13:dn(e,t),Sn(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(wm=Be())),r&4&&Xv(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(xt=(c=xt)||h,dn(e,t),xt=c):dn(e,t),Sn(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(q=t,h=t.child;h!==null;){for(d=q=h;q!==null;){switch(p=q,g=p.child,p.tag){case 0:case 11:case 14:case 15:Jo(4,p,p.return);break;case 1:ps(p,p.return);var E=p.stateNode;if(typeof E.componentWillUnmount=="function"){r=p,n=p.return;try{e=r,E.props=e.memoizedProps,E.state=e.memoizedState,E.componentWillUnmount()}catch(A){Fe(r,n,A)}}break;case 5:ps(p,p.return);break;case 22:if(p.memoizedState!==null){Zv(d);continue}}g!==null?(g.return=p,q=g):Zv(d)}h=h.sibling}e:for(h=null,d=t;;){if(d.tag===5){if(h===null){h=d;try{i=d.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,u=d.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=xE("display",o))}catch(A){Fe(t,t.return,A)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(A){Fe(t,t.return,A)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:dn(e,t),Sn(t),r&4&&Xv(t);break;case 21:break;default:dn(e,t),Sn(t)}}function Sn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(QT(n)){var r=n;break e}n=n.return}throw Error(z(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(da(i,""),r.flags&=-33);var s=Yv(t);Rf(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Yv(t);Pf(t,a,o);break;default:throw Error(z(161))}}catch(u){Fe(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function yR(t,e,n){q=t,JT(t)}function JT(t,e,n){for(var r=(t.mode&1)!==0;q!==null;){var i=q,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ql;if(!o){var a=i.alternate,u=a!==null&&a.memoizedState!==null||xt;a=ql;var c=xt;if(ql=o,(xt=u)&&!c)for(q=i;q!==null;)o=q,u=o.child,o.tag===22&&o.memoizedState!==null?e0(i):u!==null?(u.return=o,q=u):e0(i);for(;s!==null;)q=s,JT(s),s=s.sibling;q=i,ql=a,xt=c}Jv(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,q=s):Jv(t)}}function Jv(t){for(;q!==null;){var e=q;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:xt||jc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!xt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:mn(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Mv(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Mv(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&ga(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}xt||e.flags&512&&Cf(e)}catch(p){Fe(e,e.return,p)}}if(e===t){q=null;break}if(n=e.sibling,n!==null){n.return=e.return,q=n;break}q=e.return}}function Zv(t){for(;q!==null;){var e=q;if(e===t){q=null;break}var n=e.sibling;if(n!==null){n.return=e.return,q=n;break}q=e.return}}function e0(t){for(;q!==null;){var e=q;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{jc(4,e)}catch(u){Fe(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Fe(e,i,u)}}var s=e.return;try{Cf(e)}catch(u){Fe(e,s,u)}break;case 5:var o=e.return;try{Cf(e)}catch(u){Fe(e,o,u)}}}catch(u){Fe(e,e.return,u)}if(e===t){q=null;break}var a=e.sibling;if(a!==null){a.return=e.return,q=a;break}q=e.return}}var vR=Math.ceil,ec=lr.ReactCurrentDispatcher,vm=lr.ReactCurrentOwner,an=lr.ReactCurrentBatchConfig,ce=0,nt=null,He=null,ut=0,Kt=0,ms=Jr(0),Ye=0,Ca=null,ki=0,Uc=0,_m=0,Zo=null,jt=null,wm=0,Os=1/0,Wn=null,tc=!1,kf=null,Mr=null,Gl=!1,Ir=null,nc=0,ea=0,bf=null,mu=-1,gu=0;function Lt(){return ce&6?Be():mu!==-1?mu:mu=Be()}function Or(t){return t.mode&1?ce&2&&ut!==0?ut&-ut:tR.transition!==null?(gu===0&&(gu=ME()),gu):(t=fe,t!==0||(t=window.event,t=t===void 0?16:$E(t.type)),t):1}function _n(t,e,n,r){if(50<ea)throw ea=0,bf=null,Error(z(185));Ga(t,n,r),(!(ce&2)||t!==nt)&&(t===nt&&(!(ce&2)&&(Uc|=n),Ye===4&&wr(t,ut)),Wt(t,r),n===1&&ce===0&&!(e.mode&1)&&(Os=Be()+500,Mc&&Zr()))}function Wt(t,e){var n=t.callbackNode;tP(t,e);var r=ju(t,t===nt?ut:0);if(r===0)n!==null&&uv(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&uv(n),e===1)t.tag===0?eR(t0.bind(null,t)):lT(t0.bind(null,t)),YP(function(){!(ce&6)&&Zr()}),n=null;else{switch(OE(r)){case 1:n=qp;break;case 4:n=VE;break;case 16:n=Fu;break;case 536870912:n=LE;break;default:n=Fu}n=o1(n,ZT.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function ZT(t,e){if(mu=-1,gu=0,ce&6)throw Error(z(327));var n=t.callbackNode;if(Is()&&t.callbackNode!==n)return null;var r=ju(t,t===nt?ut:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=rc(t,r);else{e=r;var i=ce;ce|=2;var s=t1();(nt!==t||ut!==e)&&(Wn=null,Os=Be()+500,wi(t,e));do try{ER();break}catch(a){e1(t,a)}while(!0);sm(),ec.current=s,ce=i,He!==null?e=0:(nt=null,ut=0,e=Ye)}if(e!==0){if(e===2&&(i=rf(t),i!==0&&(r=i,e=Nf(t,i))),e===1)throw n=Ca,wi(t,0),wr(t,r),Wt(t,Be()),n;if(e===6)wr(t,r);else{if(i=t.current.alternate,!(r&30)&&!_R(i)&&(e=rc(t,r),e===2&&(s=rf(t),s!==0&&(r=s,e=Nf(t,s))),e===1))throw n=Ca,wi(t,0),wr(t,r),Wt(t,Be()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(z(345));case 2:hi(t,jt,Wn);break;case 3:if(wr(t,r),(r&130023424)===r&&(e=wm+500-Be(),10<e)){if(ju(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){Lt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=df(hi.bind(null,t,jt,Wn),e);break}hi(t,jt,Wn);break;case 4:if(wr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-vn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Be()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*vR(r/1960))-r,10<r){t.timeoutHandle=df(hi.bind(null,t,jt,Wn),r);break}hi(t,jt,Wn);break;case 5:hi(t,jt,Wn);break;default:throw Error(z(329))}}}return Wt(t,Be()),t.callbackNode===n?ZT.bind(null,t):null}function Nf(t,e){var n=Zo;return t.current.memoizedState.isDehydrated&&(wi(t,e).flags|=256),t=rc(t,e),t!==2&&(e=jt,jt=n,e!==null&&Df(e)),t}function Df(t){jt===null?jt=t:jt.push.apply(jt,t)}function _R(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!En(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wr(t,e){for(e&=~_m,e&=~Uc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-vn(e),r=1<<n;t[n]=-1,e&=~r}}function t0(t){if(ce&6)throw Error(z(327));Is();var e=ju(t,0);if(!(e&1))return Wt(t,Be()),null;var n=rc(t,e);if(t.tag!==0&&n===2){var r=rf(t);r!==0&&(e=r,n=Nf(t,r))}if(n===1)throw n=Ca,wi(t,0),wr(t,e),Wt(t,Be()),n;if(n===6)throw Error(z(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,hi(t,jt,Wn),Wt(t,Be()),null}function Em(t,e){var n=ce;ce|=1;try{return t(e)}finally{ce=n,ce===0&&(Os=Be()+500,Mc&&Zr())}}function bi(t){Ir!==null&&Ir.tag===0&&!(ce&6)&&Is();var e=ce;ce|=1;var n=an.transition,r=fe;try{if(an.transition=null,fe=1,t)return t()}finally{fe=r,an.transition=n,ce=e,!(ce&6)&&Zr()}}function Tm(){Kt=ms.current,Ie(ms)}function wi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,QP(n)),He!==null)for(n=He.return;n!==null;){var r=n;switch(nm(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Wu();break;case 3:Ls(),Ie(zt),Ie(At),hm();break;case 5:cm(r);break;case 4:Ls();break;case 13:Ie(ke);break;case 19:Ie(ke);break;case 10:om(r.type._context);break;case 22:case 23:Tm()}n=n.return}if(nt=t,He=t=Fr(t.current,null),ut=Kt=e,Ye=0,Ca=null,_m=Uc=ki=0,jt=Zo=null,mi!==null){for(e=0;e<mi.length;e++)if(n=mi[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}mi=null}return t}function e1(t,e){do{var n=He;try{if(sm(),du.current=Zu,Ju){for(var r=be.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Ju=!1}if(Ri=0,tt=Qe=be=null,Xo=!1,Sa=0,vm.current=null,n===null||n.return===null){Ye=1,Ca=e,He=null;break}e:{var s=t,o=n.return,a=n,u=e;if(e=ut,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var g=zv(o);if(g!==null){g.flags&=-257,$v(g,o,a,s,e),g.mode&1&&Bv(s,c,e),e=g,u=c;var E=e.updateQueue;if(E===null){var A=new Set;A.add(u),e.updateQueue=A}else E.add(u);break e}else{if(!(e&1)){Bv(s,c,e),xm();break e}u=Error(z(426))}}else if(Ce&&a.mode&1){var C=zv(o);if(C!==null){!(C.flags&65536)&&(C.flags|=256),$v(C,o,a,s,e),rm(Ms(u,a));break e}}s=u=Ms(u,a),Ye!==4&&(Ye=2),Zo===null?Zo=[s]:Zo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var w=OT(s,u,e);Lv(s,w);break e;case 1:a=u;var v=s.type,T=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(Mr===null||!Mr.has(T)))){s.flags|=65536,e&=-e,s.lanes|=e;var N=FT(s,a,e);Lv(s,N);break e}}s=s.return}while(s!==null)}r1(n)}catch(L){e=L,He===n&&n!==null&&(He=n=n.return);continue}break}while(!0)}function t1(){var t=ec.current;return ec.current=Zu,t===null?Zu:t}function xm(){(Ye===0||Ye===3||Ye===2)&&(Ye=4),nt===null||!(ki&268435455)&&!(Uc&268435455)||wr(nt,ut)}function rc(t,e){var n=ce;ce|=2;var r=t1();(nt!==t||ut!==e)&&(Wn=null,wi(t,e));do try{wR();break}catch(i){e1(t,i)}while(!0);if(sm(),ce=n,ec.current=r,He!==null)throw Error(z(261));return nt=null,ut=0,Ye}function wR(){for(;He!==null;)n1(He)}function ER(){for(;He!==null&&!qC();)n1(He)}function n1(t){var e=s1(t.alternate,t,Kt);t.memoizedProps=t.pendingProps,e===null?r1(t):He=e,vm.current=null}function r1(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=pR(n,e),n!==null){n.flags&=32767,He=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ye=6,He=null;return}}else if(n=fR(n,e,Kt),n!==null){He=n;return}if(e=e.sibling,e!==null){He=e;return}He=e=t}while(e!==null);Ye===0&&(Ye=5)}function hi(t,e,n){var r=fe,i=an.transition;try{an.transition=null,fe=1,TR(t,e,n,r)}finally{an.transition=i,fe=r}return null}function TR(t,e,n,r){do Is();while(Ir!==null);if(ce&6)throw Error(z(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(z(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(nP(t,s),t===nt&&(He=nt=null,ut=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Gl||(Gl=!0,o1(Fu,function(){return Is(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=an.transition,an.transition=null;var o=fe;fe=1;var a=ce;ce|=4,vm.current=null,gR(t,n),XT(n,t),zP(cf),Uu=!!uf,cf=uf=null,t.current=n,yR(n),GC(),ce=a,fe=o,an.transition=s}else t.current=n;if(Gl&&(Gl=!1,Ir=t,nc=i),s=t.pendingLanes,s===0&&(Mr=null),YC(n.stateNode),Wt(t,Be()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(tc)throw tc=!1,t=kf,kf=null,t;return nc&1&&t.tag!==0&&Is(),s=t.pendingLanes,s&1?t===bf?ea++:(ea=0,bf=t):ea=0,Zr(),null}function Is(){if(Ir!==null){var t=OE(nc),e=an.transition,n=fe;try{if(an.transition=null,fe=16>t?16:t,Ir===null)var r=!1;else{if(t=Ir,Ir=null,nc=0,ce&6)throw Error(z(331));var i=ce;for(ce|=4,q=t.current;q!==null;){var s=q,o=s.child;if(q.flags&16){var a=s.deletions;if(a!==null){for(var u=0;u<a.length;u++){var c=a[u];for(q=c;q!==null;){var h=q;switch(h.tag){case 0:case 11:case 15:Jo(8,h,s)}var d=h.child;if(d!==null)d.return=h,q=d;else for(;q!==null;){h=q;var p=h.sibling,g=h.return;if(KT(h),h===c){q=null;break}if(p!==null){p.return=g,q=p;break}q=g}}}var E=s.alternate;if(E!==null){var A=E.child;if(A!==null){E.child=null;do{var C=A.sibling;A.sibling=null,A=C}while(A!==null)}}q=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,q=o;else e:for(;q!==null;){if(s=q,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Jo(9,s,s.return)}var w=s.sibling;if(w!==null){w.return=s.return,q=w;break e}q=s.return}}var v=t.current;for(q=v;q!==null;){o=q;var T=o.child;if(o.subtreeFlags&2064&&T!==null)T.return=o,q=T;else e:for(o=v;q!==null;){if(a=q,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:jc(9,a)}}catch(L){Fe(a,a.return,L)}if(a===o){q=null;break e}var N=a.sibling;if(N!==null){N.return=a.return,q=N;break e}q=a.return}}if(ce=i,Zr(),kn&&typeof kn.onPostCommitFiberRoot=="function")try{kn.onPostCommitFiberRoot(bc,t)}catch{}r=!0}return r}finally{fe=n,an.transition=e}}return!1}function n0(t,e,n){e=Ms(n,e),e=OT(t,e,1),t=Lr(t,e,1),e=Lt(),t!==null&&(Ga(t,1,e),Wt(t,e))}function Fe(t,e,n){if(t.tag===3)n0(t,t,n);else for(;e!==null;){if(e.tag===3){n0(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Mr===null||!Mr.has(r))){t=Ms(n,t),t=FT(e,t,1),e=Lr(e,t,1),t=Lt(),e!==null&&(Ga(e,1,t),Wt(e,t));break}}e=e.return}}function xR(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Lt(),t.pingedLanes|=t.suspendedLanes&n,nt===t&&(ut&n)===n&&(Ye===4||Ye===3&&(ut&130023424)===ut&&500>Be()-wm?wi(t,0):_m|=n),Wt(t,e)}function i1(t,e){e===0&&(t.mode&1?(e=Ol,Ol<<=1,!(Ol&130023424)&&(Ol=4194304)):e=1);var n=Lt();t=tr(t,e),t!==null&&(Ga(t,e,n),Wt(t,n))}function SR(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),i1(t,n)}function IR(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(z(314))}r!==null&&r.delete(e),i1(t,n)}var s1;s1=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||zt.current)Bt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Bt=!1,dR(t,e,n);Bt=!!(t.flags&131072)}else Bt=!1,Ce&&e.flags&1048576&&uT(e,Gu,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;pu(t,e),t=e.pendingProps;var i=Ns(e,At.current);Ss(e,n),i=fm(null,e,r,t,i,n);var s=pm();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,$t(r)?(s=!0,Hu(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,lm(e),i.updater=Fc,e.stateNode=i,i._reactInternals=e,_f(e,r,t,n),e=Tf(null,e,r,!0,s,n)):(e.tag=0,Ce&&s&&tm(e),bt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(pu(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=CR(r),t=mn(r,t),i){case 0:e=Ef(null,e,r,t,n);break e;case 1:e=qv(null,e,r,t,n);break e;case 11:e=Wv(null,e,r,t,n);break e;case 14:e=Hv(null,e,r,mn(r.type,t),n);break e}throw Error(z(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:mn(r,i),Ef(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:mn(r,i),qv(t,e,r,i,n);case 3:e:{if(zT(e),t===null)throw Error(z(387));r=e.pendingProps,s=e.memoizedState,i=s.element,mT(t,e),Yu(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Ms(Error(z(423)),e),e=Gv(t,e,r,n,i);break e}else if(r!==i){i=Ms(Error(z(424)),e),e=Gv(t,e,r,n,i);break e}else for(Qt=Vr(e.stateNode.containerInfo.firstChild),Xt=e,Ce=!0,yn=null,n=fT(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ds(),r===i){e=nr(t,e,n);break e}bt(t,e,r,n)}e=e.child}return e;case 5:return gT(e),t===null&&gf(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,hf(r,i)?o=null:s!==null&&hf(r,s)&&(e.flags|=32),BT(t,e),bt(t,e,o,n),e.child;case 6:return t===null&&gf(e),null;case 13:return $T(t,e,n);case 4:return um(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Vs(e,null,r,n):bt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:mn(r,i),Wv(t,e,r,i,n);case 7:return bt(t,e,e.pendingProps,n),e.child;case 8:return bt(t,e,e.pendingProps.children,n),e.child;case 12:return bt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,we(Ku,r._currentValue),r._currentValue=o,s!==null)if(En(s.value,o)){if(s.children===i.children&&!zt.current){e=nr(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Jn(-1,n&-n),u.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?u.next=u:(u.next=h.next,h.next=u),c.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),yf(s.return,n,e),a.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(z(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),yf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}bt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Ss(e,n),i=un(i),r=r(i),e.flags|=1,bt(t,e,r,n),e.child;case 14:return r=e.type,i=mn(r,e.pendingProps),i=mn(r.type,i),Hv(t,e,r,i,n);case 15:return jT(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:mn(r,i),pu(t,e),e.tag=1,$t(r)?(t=!0,Hu(e)):t=!1,Ss(e,n),MT(e,r,i),_f(e,r,i,n),Tf(null,e,r,!0,t,n);case 19:return WT(t,e,n);case 22:return UT(t,e,n)}throw Error(z(156,e.tag))};function o1(t,e){return DE(t,e)}function AR(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function sn(t,e,n,r){return new AR(t,e,n,r)}function Sm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function CR(t){if(typeof t=="function")return Sm(t)?1:0;if(t!=null){if(t=t.$$typeof,t===$p)return 11;if(t===Wp)return 14}return 2}function Fr(t,e){var n=t.alternate;return n===null?(n=sn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function yu(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Sm(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ss:return Ei(n.children,i,s,e);case zp:o=8,i|=8;break;case zd:return t=sn(12,n,e,i|2),t.elementType=zd,t.lanes=s,t;case $d:return t=sn(13,n,e,i),t.elementType=$d,t.lanes=s,t;case Wd:return t=sn(19,n,e,i),t.elementType=Wd,t.lanes=s,t;case gE:return Bc(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case pE:o=10;break e;case mE:o=9;break e;case $p:o=11;break e;case Wp:o=14;break e;case yr:o=16,r=null;break e}throw Error(z(130,t==null?t:typeof t,""))}return e=sn(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Ei(t,e,n,r){return t=sn(7,t,r,e),t.lanes=n,t}function Bc(t,e,n,r){return t=sn(22,t,r,e),t.elementType=gE,t.lanes=n,t.stateNode={isHidden:!1},t}function od(t,e,n){return t=sn(6,t,null,e),t.lanes=n,t}function ad(t,e,n){return e=sn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function PR(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bh(0),this.expirationTimes=Bh(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bh(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Im(t,e,n,r,i,s,o,a,u){return t=new PR(t,e,n,a,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=sn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},lm(s),t}function RR(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:is,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function a1(t){if(!t)return Hr;t=t._reactInternals;e:{if(Fi(t)!==t||t.tag!==1)throw Error(z(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if($t(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(z(171))}if(t.tag===1){var n=t.type;if($t(n))return aT(t,n,e)}return e}function l1(t,e,n,r,i,s,o,a,u){return t=Im(n,r,!0,t,i,s,o,a,u),t.context=a1(null),n=t.current,r=Lt(),i=Or(n),s=Jn(r,i),s.callback=e??null,Lr(n,s,i),t.current.lanes=i,Ga(t,i,r),Wt(t,r),t}function zc(t,e,n,r){var i=e.current,s=Lt(),o=Or(i);return n=a1(n),e.context===null?e.context=n:e.pendingContext=n,e=Jn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Lr(i,e,o),t!==null&&(_n(t,i,o,s),hu(t,i,o)),o}function ic(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function r0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Am(t,e){r0(t,e),(t=t.alternate)&&r0(t,e)}function kR(){return null}var u1=typeof reportError=="function"?reportError:function(t){console.error(t)};function Cm(t){this._internalRoot=t}$c.prototype.render=Cm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(z(409));zc(t,e,null,null)};$c.prototype.unmount=Cm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;bi(function(){zc(null,t,null,null)}),e[er]=null}};function $c(t){this._internalRoot=t}$c.prototype.unstable_scheduleHydration=function(t){if(t){var e=UE();t={blockedOn:null,target:t,priority:e};for(var n=0;n<_r.length&&e!==0&&e<_r[n].priority;n++);_r.splice(n,0,t),n===0&&zE(t)}};function Pm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Wc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function i0(){}function bR(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=ic(o);s.call(c)}}var o=l1(e,r,t,0,null,!1,!1,"",i0);return t._reactRootContainer=o,t[er]=o.current,_a(t.nodeType===8?t.parentNode:t),bi(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=ic(u);a.call(c)}}var u=Im(t,0,!1,null,null,!1,!1,"",i0);return t._reactRootContainer=u,t[er]=u.current,_a(t.nodeType===8?t.parentNode:t),bi(function(){zc(e,u,n,r)}),u}function Hc(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var u=ic(o);a.call(u)}}zc(e,o,t,i)}else o=bR(n,e,t,i,r);return ic(o)}FE=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Fo(e.pendingLanes);n!==0&&(Gp(e,n|1),Wt(e,Be()),!(ce&6)&&(Os=Be()+500,Zr()))}break;case 13:bi(function(){var r=tr(t,1);if(r!==null){var i=Lt();_n(r,t,1,i)}}),Am(t,1)}};Kp=function(t){if(t.tag===13){var e=tr(t,134217728);if(e!==null){var n=Lt();_n(e,t,134217728,n)}Am(t,134217728)}};jE=function(t){if(t.tag===13){var e=Or(t),n=tr(t,e);if(n!==null){var r=Lt();_n(n,t,e,r)}Am(t,e)}};UE=function(){return fe};BE=function(t,e){var n=fe;try{return fe=t,e()}finally{fe=n}};ef=function(t,e,n){switch(e){case"input":if(Gd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Lc(r);if(!i)throw Error(z(90));vE(r),Gd(r,i)}}}break;case"textarea":wE(t,n);break;case"select":e=n.value,e!=null&&ws(t,!!n.multiple,e,!1)}};CE=Em;PE=bi;var NR={usingClientEntryPoint:!1,Events:[Qa,us,Lc,IE,AE,Em]},Do={findFiberByHostInstance:pi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},DR={bundleType:Do.bundleType,version:Do.version,rendererPackageName:Do.rendererPackageName,rendererConfig:Do.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=bE(t),t===null?null:t.stateNode},findFiberByHostInstance:Do.findFiberByHostInstance||kR,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Kl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Kl.isDisabled&&Kl.supportsFiber)try{bc=Kl.inject(DR),kn=Kl}catch{}}en.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=NR;en.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pm(e))throw Error(z(200));return RR(t,e,null,n)};en.createRoot=function(t,e){if(!Pm(t))throw Error(z(299));var n=!1,r="",i=u1;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Im(t,1,!1,null,null,n,!1,r,i),t[er]=e.current,_a(t.nodeType===8?t.parentNode:t),new Cm(e)};en.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(z(188)):(t=Object.keys(t).join(","),Error(z(268,t)));return t=bE(e),t=t===null?null:t.stateNode,t};en.flushSync=function(t){return bi(t)};en.hydrate=function(t,e,n){if(!Wc(e))throw Error(z(200));return Hc(null,t,e,!0,n)};en.hydrateRoot=function(t,e,n){if(!Pm(t))throw Error(z(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=u1;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=l1(e,null,t,1,n??null,i,!1,s,o),t[er]=e.current,_a(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new $c(e)};en.render=function(t,e,n){if(!Wc(e))throw Error(z(200));return Hc(null,t,e,!1,n)};en.unmountComponentAtNode=function(t){if(!Wc(t))throw Error(z(40));return t._reactRootContainer?(bi(function(){Hc(null,null,t,!1,function(){t._reactRootContainer=null,t[er]=null})}),!0):!1};en.unstable_batchedUpdates=Em;en.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Wc(n))throw Error(z(200));if(t==null||t._reactInternals===void 0)throw Error(z(38));return Hc(t,e,n,!1,r)};en.version="18.3.1-next-f1338f8080-20240426";function c1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c1)}catch(t){console.error(t)}}c1(),cE.exports=en;var VR=cE.exports,s0=VR;Ud.createRoot=s0.createRoot,Ud.hydrateRoot=s0.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Pa(){return Pa=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Pa.apply(this,arguments)}var Ar;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Ar||(Ar={}));const o0="popstate";function LR(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:a}=r.location;return Vf("",{pathname:s,search:o,hash:a},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:h1(i)}return OR(e,n,null,t)}function Ge(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Rm(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function MR(){return Math.random().toString(36).substr(2,8)}function a0(t,e){return{usr:t.state,key:t.key,idx:e}}function Vf(t,e,n,r){return n===void 0&&(n=null),Pa({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?eo(e):e,{state:n,key:e&&e.key||r||MR()})}function h1(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function eo(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function OR(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,a=Ar.Pop,u=null,c=h();c==null&&(c=0,o.replaceState(Pa({},o.state,{idx:c}),""));function h(){return(o.state||{idx:null}).idx}function d(){a=Ar.Pop;let C=h(),w=C==null?null:C-c;c=C,u&&u({action:a,location:A.location,delta:w})}function p(C,w){a=Ar.Push;let v=Vf(A.location,C,w);c=h()+1;let T=a0(v,c),N=A.createHref(v);try{o.pushState(T,"",N)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;i.location.assign(N)}s&&u&&u({action:a,location:A.location,delta:1})}function g(C,w){a=Ar.Replace;let v=Vf(A.location,C,w);c=h();let T=a0(v,c),N=A.createHref(v);o.replaceState(T,"",N),s&&u&&u({action:a,location:A.location,delta:0})}function E(C){let w=i.location.origin!=="null"?i.location.origin:i.location.href,v=typeof C=="string"?C:h1(C);return v=v.replace(/ $/,"%20"),Ge(w,"No window.location.(origin|href) available to create URL for href: "+v),new URL(v,w)}let A={get action(){return a},get location(){return t(i,o)},listen(C){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(o0,d),u=C,()=>{i.removeEventListener(o0,d),u=null}},createHref(C){return e(i,C)},createURL:E,encodeLocation(C){let w=E(C);return{pathname:w.pathname,search:w.search,hash:w.hash}},push:p,replace:g,go(C){return o.go(C)}};return A}var l0;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(l0||(l0={}));function FR(t,e,n){return n===void 0&&(n="/"),jR(t,e,n)}function jR(t,e,n,r){let i=typeof e=="string"?eo(e):e,s=p1(i.pathname||"/",n);if(s==null)return null;let o=d1(t);UR(o);let a=null;for(let u=0;a==null&&u<o.length;++u){let c=JR(s);a=QR(o[u],c)}return a}function d1(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,a)=>{let u={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};u.relativePath.startsWith("/")&&(Ge(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Ti([r,u.relativePath]),h=n.concat(u);s.children&&s.children.length>0&&(Ge(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),d1(s.children,e,h,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:GR(c,s.index),routesMeta:h})};return t.forEach((s,o)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))i(s,o);else for(let u of f1(s.path))i(s,o,u)}),e}function f1(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=f1(r.join("/")),a=[];return a.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&a.push(...o),a.map(u=>t.startsWith("/")&&u===""?"/":u)}function UR(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:KR(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const BR=/^:[\w-]+$/,zR=3,$R=2,WR=1,HR=10,qR=-2,u0=t=>t==="*";function GR(t,e){let n=t.split("/"),r=n.length;return n.some(u0)&&(r+=qR),e&&(r+=$R),n.filter(i=>!u0(i)).reduce((i,s)=>i+(BR.test(s)?zR:s===""?WR:HR),r)}function KR(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function QR(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let a=0;a<r.length;++a){let u=r[a],c=a===r.length-1,h=s==="/"?e:e.slice(s.length)||"/",d=YR({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},h),p=u.route;if(!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:Ti([s,d.pathname]),pathnameBase:rk(Ti([s,d.pathnameBase])),route:p}),d.pathnameBase!=="/"&&(s=Ti([s,d.pathnameBase]))}return o}function YR(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=XR(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),a=i.slice(1);return{params:r.reduce((c,h,d)=>{let{paramName:p,isOptional:g}=h;if(p==="*"){let A=a[d]||"";o=s.slice(0,s.length-A.length).replace(/(.)\/+$/,"$1")}const E=a[d];return g&&!E?c[p]=void 0:c[p]=(E||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function XR(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Rm(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,u)=>(r.push({paramName:a,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function JR(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Rm(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function p1(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const ZR=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ek=t=>ZR.test(t);function tk(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?eo(t):t,s;if(n)if(ek(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Rm(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=c0(n.substring(1),"/"):s=c0(n,e)}else s=e;return{pathname:s,search:ik(r),hash:sk(i)}}function c0(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function ld(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function nk(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function m1(t,e){let n=nk(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function g1(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=eo(t):(i=Pa({},t),Ge(!i.pathname||!i.pathname.includes("?"),ld("?","pathname","search",i)),Ge(!i.pathname||!i.pathname.includes("#"),ld("#","pathname","hash",i)),Ge(!i.search||!i.search.includes("#"),ld("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,a;if(o==null)a=n;else{let d=e.length-1;if(!r&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),d-=1;i.pathname=p.join("/")}a=d>=0?e[d]:"/"}let u=tk(i,a),c=o&&o!=="/"&&o.endsWith("/"),h=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||h)&&(u.pathname+="/"),u}const Ti=t=>t.join("/").replace(/\/\/+/g,"/"),rk=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),ik=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,sk=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function ok(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const y1=["post","put","patch","delete"];new Set(y1);const ak=["get",...y1];new Set(ak);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ra(){return Ra=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ra.apply(this,arguments)}const km=D.createContext(null),lk=D.createContext(null),Xa=D.createContext(null),qc=D.createContext(null),ji=D.createContext({outlet:null,matches:[],isDataRoute:!1}),v1=D.createContext(null);function Ja(){return D.useContext(qc)!=null}function bm(){return Ja()||Ge(!1),D.useContext(qc).location}function _1(t){D.useContext(Xa).static||D.useLayoutEffect(t)}function uk(){let{isDataRoute:t}=D.useContext(ji);return t?Tk():ck()}function ck(){Ja()||Ge(!1);let t=D.useContext(km),{basename:e,future:n,navigator:r}=D.useContext(Xa),{matches:i}=D.useContext(ji),{pathname:s}=bm(),o=JSON.stringify(m1(i,n.v7_relativeSplatPath)),a=D.useRef(!1);return _1(()=>{a.current=!0}),D.useCallback(function(c,h){if(h===void 0&&(h={}),!a.current)return;if(typeof c=="number"){r.go(c);return}let d=g1(c,JSON.parse(o),s,h.relative==="path");t==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:Ti([e,d.pathname])),(h.replace?r.replace:r.push)(d,h.state,h)},[e,r,o,s,t])}function hk(t,e){return dk(t,e)}function dk(t,e,n,r){Ja()||Ge(!1);let{navigator:i}=D.useContext(Xa),{matches:s}=D.useContext(ji),o=s[s.length-1],a=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let c=bm(),h;if(e){var d;let C=typeof e=="string"?eo(e):e;u==="/"||(d=C.pathname)!=null&&d.startsWith(u)||Ge(!1),h=C}else h=c;let p=h.pathname||"/",g=p;if(u!=="/"){let C=u.replace(/^\//,"").split("/");g="/"+p.replace(/^\//,"").split("/").slice(C.length).join("/")}let E=FR(t,{pathname:g}),A=yk(E&&E.map(C=>Object.assign({},C,{params:Object.assign({},a,C.params),pathname:Ti([u,i.encodeLocation?i.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?u:Ti([u,i.encodeLocation?i.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),s,n,r);return e&&A?D.createElement(qc.Provider,{value:{location:Ra({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:Ar.Pop}},A):A}function fk(){let t=Ek(),e=ok(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return D.createElement(D.Fragment,null,D.createElement("h2",null,"Unexpected Application Error!"),D.createElement("h3",{style:{fontStyle:"italic"}},e),n?D.createElement("pre",{style:i},n):null,null)}const pk=D.createElement(fk,null);class mk extends D.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?D.createElement(ji.Provider,{value:this.props.routeContext},D.createElement(v1.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function gk(t){let{routeContext:e,match:n,children:r}=t,i=D.useContext(km);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),D.createElement(ji.Provider,{value:e},r)}function yk(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(i=n)==null?void 0:i.errors;if(a!=null){let h=o.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);h>=0||Ge(!1),o=o.slice(0,Math.min(o.length,h+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let h=0;h<o.length;h++){let d=o[h];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=h),d.route.id){let{loaderData:p,errors:g}=n,E=d.route.loader&&p[d.route.id]===void 0&&(!g||g[d.route.id]===void 0);if(d.route.lazy||E){u=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((h,d,p)=>{let g,E=!1,A=null,C=null;n&&(g=a&&d.route.id?a[d.route.id]:void 0,A=d.route.errorElement||pk,u&&(c<0&&p===0?(xk("route-fallback"),E=!0,C=null):c===p&&(E=!0,C=d.route.hydrateFallbackElement||null)));let w=e.concat(o.slice(0,p+1)),v=()=>{let T;return g?T=A:E?T=C:d.route.Component?T=D.createElement(d.route.Component,null):d.route.element?T=d.route.element:T=h,D.createElement(gk,{match:d,routeContext:{outlet:h,matches:w,isDataRoute:n!=null},children:T})};return n&&(d.route.ErrorBoundary||d.route.errorElement||p===0)?D.createElement(mk,{location:n.location,revalidation:n.revalidation,component:A,error:g,children:v(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):v()},null)}var w1=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(w1||{}),E1=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(E1||{});function vk(t){let e=D.useContext(km);return e||Ge(!1),e}function _k(t){let e=D.useContext(lk);return e||Ge(!1),e}function wk(t){let e=D.useContext(ji);return e||Ge(!1),e}function T1(t){let e=wk(),n=e.matches[e.matches.length-1];return n.route.id||Ge(!1),n.route.id}function Ek(){var t;let e=D.useContext(v1),n=_k(),r=T1();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function Tk(){let{router:t}=vk(w1.UseNavigateStable),e=T1(E1.UseNavigateStable),n=D.useRef(!1);return _1(()=>{n.current=!0}),D.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,Ra({fromRouteId:e},s)))},[t,e])}const h0={};function xk(t,e,n){h0[t]||(h0[t]=!0)}function Sk(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function Ik(t){let{to:e,replace:n,state:r,relative:i}=t;Ja()||Ge(!1);let{future:s,static:o}=D.useContext(Xa),{matches:a}=D.useContext(ji),{pathname:u}=bm(),c=uk(),h=g1(e,m1(a,s.v7_relativeSplatPath),u,i==="path"),d=JSON.stringify(h);return D.useEffect(()=>c(JSON.parse(d),{replace:n,state:r,relative:i}),[c,d,i,n,r]),null}function Lf(t){Ge(!1)}function Ak(t){let{basename:e="/",children:n=null,location:r,navigationType:i=Ar.Pop,navigator:s,static:o=!1,future:a}=t;Ja()&&Ge(!1);let u=e.replace(/^\/*/,"/"),c=D.useMemo(()=>({basename:u,navigator:s,static:o,future:Ra({v7_relativeSplatPath:!1},a)}),[u,a,s,o]);typeof r=="string"&&(r=eo(r));let{pathname:h="/",search:d="",hash:p="",state:g=null,key:E="default"}=r,A=D.useMemo(()=>{let C=p1(h,u);return C==null?null:{location:{pathname:C,search:d,hash:p,state:g,key:E},navigationType:i}},[u,h,d,p,g,E,i]);return A==null?null:D.createElement(Xa.Provider,{value:c},D.createElement(qc.Provider,{children:n,value:A}))}function Ck(t){let{children:e,location:n}=t;return hk(Mf(e),n)}new Promise(()=>{});function Mf(t,e){e===void 0&&(e=[]);let n=[];return D.Children.forEach(t,(r,i)=>{if(!D.isValidElement(r))return;let s=[...e,i];if(r.type===D.Fragment){n.push.apply(n,Mf(r.props.children,s));return}r.type!==Lf&&Ge(!1),!r.props.index||!r.props.children||Ge(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Mf(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Pk="6";try{window.__reactRouterVersion=Pk}catch{}const Rk="startTransition",d0=xC[Rk];function kk(t){let{basename:e,children:n,future:r,window:i}=t,s=D.useRef();s.current==null&&(s.current=LR({window:i,v5Compat:!0}));let o=s.current,[a,u]=D.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},h=D.useCallback(d=>{c&&d0?d0(()=>u(d)):u(d)},[u,c]);return D.useLayoutEffect(()=>o.listen(h),[o,h]),D.useEffect(()=>Sk(r),[r]),D.createElement(Ak,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:r})}var f0;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(f0||(f0={}));var p0;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(p0||(p0={}));var m0={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x1=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},bk=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},S1={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,u=i+2<t.length,c=u?t[i+2]:0,h=s>>2,d=(s&3)<<4|a>>4;let p=(a&15)<<2|c>>6,g=c&63;u||(g=64,o||(p=64)),r.push(n[h],n[d],n[p],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(x1(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):bk(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const d=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||c==null||d==null)throw new Nk;const p=s<<2|a>>4;if(r.push(p),c!==64){const g=a<<4&240|c>>2;if(r.push(g),d!==64){const E=c<<6&192|d;r.push(E)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Nk extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Dk=function(t){const e=x1(t);return S1.encodeByteArray(e,!0)},sc=function(t){return Dk(t).replace(/\./g,"")},I1=function(t){try{return S1.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vk(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lk=()=>Vk().__FIREBASE_DEFAULTS__,Mk=()=>{if(typeof process>"u"||typeof m0>"u")return;const t=m0.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ok=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&I1(t[1]);return e&&JSON.parse(e)},Gc=()=>{try{return Lk()||Mk()||Ok()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},A1=t=>{var e,n;return(n=(e=Gc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Fk=t=>{const e=A1(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},C1=()=>{var t;return(t=Gc())===null||t===void 0?void 0:t.config},P1=t=>{var e;return(e=Gc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jk{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uk(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[sc(JSON.stringify(n)),sc(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Bk(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ct())}function zk(){var t;const e=(t=Gc())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $k(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Wk(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Hk(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qk(){const t=Ct();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Gk(){return!zk()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Kk(){try{return typeof indexedDB=="object"}catch{return!1}}function Qk(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yk="FirebaseError";class ur extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Yk,Object.setPrototypeOf(this,ur.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Za.prototype.create)}}class Za{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Xk(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new ur(i,a,r)}}function Xk(t,e){return t.replace(Jk,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Jk=/\{\$([^}]+)}/g;function Zk(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function oc(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(g0(s)&&g0(o)){if(!oc(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function g0(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function eb(t,e){const n=new tb(t,e);return n.subscribe.bind(n)}class tb{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");nb(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=ud),i.error===void 0&&(i.error=ud),i.complete===void 0&&(i.complete=ud);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function nb(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ud(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t){return t&&t._delegate?t._delegate:t}class Ni{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new jk;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(sb(e))try{this.getOrInitializeService({instanceIdentifier:di})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=di){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=di){return this.instances.has(e)}getOptions(e=di){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ib(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=di){return this.component?this.component.multipleInstances?e:di:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ib(t){return t===di?void 0:t}function sb(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new rb(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ae||(ae={}));const ab={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},lb=ae.INFO,ub={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},cb=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=ub[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Nm{constructor(e){this.name=e,this._logLevel=lb,this._logHandler=cb,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ab[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const hb=(t,e)=>e.some(n=>t instanceof n);let y0,v0;function db(){return y0||(y0=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fb(){return v0||(v0=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const R1=new WeakMap,Of=new WeakMap,k1=new WeakMap,cd=new WeakMap,Dm=new WeakMap;function pb(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(jr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&R1.set(n,t)}).catch(()=>{}),Dm.set(e,t),e}function mb(t){if(Of.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Of.set(t,e)}let Ff={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Of.get(t);if(e==="objectStoreNames")return t.objectStoreNames||k1.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return jr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function gb(t){Ff=t(Ff)}function yb(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(hd(this),e,...n);return k1.set(r,e.sort?e.sort():[e]),jr(r)}:fb().includes(t)?function(...e){return t.apply(hd(this),e),jr(R1.get(this))}:function(...e){return jr(t.apply(hd(this),e))}}function vb(t){return typeof t=="function"?yb(t):(t instanceof IDBTransaction&&mb(t),hb(t,db())?new Proxy(t,Ff):t)}function jr(t){if(t instanceof IDBRequest)return pb(t);if(cd.has(t))return cd.get(t);const e=vb(t);return e!==t&&(cd.set(t,e),Dm.set(e,t)),e}const hd=t=>Dm.get(t);function _b(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=jr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(jr(o.result),u.oldVersion,u.newVersion,jr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),a.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const wb=["get","getKey","getAll","getAllKeys","count"],Eb=["put","add","delete","clear"],dd=new Map;function _0(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dd.get(e))return dd.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Eb.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||wb.includes(n)))return;const s=async function(o,...a){const u=this.transaction(o,i?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&u.done]))[0]};return dd.set(e,s),s}gb(t=>({...t,get:(e,n,r)=>_0(e,n)||t.get(e,n,r),has:(e,n)=>!!_0(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(xb(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function xb(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const jf="@firebase/app",w0="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr=new Nm("@firebase/app"),Sb="@firebase/app-compat",Ib="@firebase/analytics-compat",Ab="@firebase/analytics",Cb="@firebase/app-check-compat",Pb="@firebase/app-check",Rb="@firebase/auth",kb="@firebase/auth-compat",bb="@firebase/database",Nb="@firebase/data-connect",Db="@firebase/database-compat",Vb="@firebase/functions",Lb="@firebase/functions-compat",Mb="@firebase/installations",Ob="@firebase/installations-compat",Fb="@firebase/messaging",jb="@firebase/messaging-compat",Ub="@firebase/performance",Bb="@firebase/performance-compat",zb="@firebase/remote-config",$b="@firebase/remote-config-compat",Wb="@firebase/storage",Hb="@firebase/storage-compat",qb="@firebase/firestore",Gb="@firebase/vertexai-preview",Kb="@firebase/firestore-compat",Qb="firebase",Yb="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uf="[DEFAULT]",Xb={[jf]:"fire-core",[Sb]:"fire-core-compat",[Ab]:"fire-analytics",[Ib]:"fire-analytics-compat",[Pb]:"fire-app-check",[Cb]:"fire-app-check-compat",[Rb]:"fire-auth",[kb]:"fire-auth-compat",[bb]:"fire-rtdb",[Nb]:"fire-data-connect",[Db]:"fire-rtdb-compat",[Vb]:"fire-fn",[Lb]:"fire-fn-compat",[Mb]:"fire-iid",[Ob]:"fire-iid-compat",[Fb]:"fire-fcm",[jb]:"fire-fcm-compat",[Ub]:"fire-perf",[Bb]:"fire-perf-compat",[zb]:"fire-rc",[$b]:"fire-rc-compat",[Wb]:"fire-gcs",[Hb]:"fire-gcs-compat",[qb]:"fire-fst",[Kb]:"fire-fst-compat",[Gb]:"fire-vertex","fire-js":"fire-js",[Qb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka=new Map,Jb=new Map,Bf=new Map;function E0(t,e){try{t.container.addComponent(e)}catch(n){rr.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Fs(t){const e=t.name;if(Bf.has(e))return rr.debug(`There were multiple attempts to register component ${e}.`),!1;Bf.set(e,t);for(const n of ka.values())E0(n,t);for(const n of Jb.values())E0(n,t);return!0}function Vm(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Cr(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ur=new Za("app","Firebase",Zb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ni("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ur.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to=Yb;function b1(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Uf,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Ur.create("bad-app-name",{appName:String(i)});if(n||(n=C1()),!n)throw Ur.create("no-options");const s=ka.get(i);if(s){if(oc(n,s.options)&&oc(r,s.config))return s;throw Ur.create("duplicate-app",{appName:i})}const o=new ob(i);for(const u of Bf.values())o.addComponent(u);const a=new e2(n,r,o);return ka.set(i,a),a}function Lm(t=Uf){const e=ka.get(t);if(!e&&t===Uf&&C1())return b1();if(!e)throw Ur.create("no-app",{appName:t});return e}function t2(){return Array.from(ka.values())}function Br(t,e,n){var r;let i=(r=Xb[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),rr.warn(a.join(" "));return}Fs(new Ni(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n2="firebase-heartbeat-database",r2=1,ba="firebase-heartbeat-store";let fd=null;function N1(){return fd||(fd=_b(n2,r2,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ba)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ur.create("idb-open",{originalErrorMessage:t.message})})),fd}async function i2(t){try{const n=(await N1()).transaction(ba),r=await n.objectStore(ba).get(D1(t));return await n.done,r}catch(e){if(e instanceof ur)rr.warn(e.message);else{const n=Ur.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});rr.warn(n.message)}}}async function T0(t,e){try{const r=(await N1()).transaction(ba,"readwrite");await r.objectStore(ba).put(e,D1(t)),await r.done}catch(n){if(n instanceof ur)rr.warn(n.message);else{const r=Ur.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});rr.warn(r.message)}}}function D1(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s2=1024,o2=30*24*60*60*1e3;class a2{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new u2(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=x0();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=o2}),this._storage.overwrite(this._heartbeatsCache))}catch(r){rr.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=x0(),{heartbeatsToSend:r,unsentEntries:i}=l2(this._heartbeatsCache.heartbeats),s=sc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return rr.warn(n),""}}}function x0(){return new Date().toISOString().substring(0,10)}function l2(t,e=s2){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),S0(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),S0(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class u2{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Kk()?Qk().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await i2(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return T0(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return T0(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function S0(t){return sc(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c2(t){Fs(new Ni("platform-logger",e=>new Tb(e),"PRIVATE")),Fs(new Ni("heartbeat",e=>new a2(e),"PRIVATE")),Br(jf,w0,t),Br(jf,w0,"esm2017"),Br("fire-js","")}c2("");var h2="firebase",d2="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Br(h2,d2,"app");function Mm(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function V1(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const f2=V1,L1=new Za("auth","Firebase",V1());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=new Nm("@firebase/auth");function p2(t,...e){ac.logLevel<=ae.WARN&&ac.warn(`Auth (${to}): ${t}`,...e)}function vu(t,...e){ac.logLevel<=ae.ERROR&&ac.error(`Auth (${to}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ir(t,...e){throw Om(t,...e)}function Nn(t,...e){return Om(t,...e)}function M1(t,e,n){const r=Object.assign(Object.assign({},f2()),{[e]:n});return new Za("auth","Firebase",r).create(e,{appName:t.name})}function xi(t){return M1(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Om(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return L1.create(t,...e)}function Z(t,e,...n){if(!t)throw Om(e,...n)}function Qn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw vu(e),new Error(e)}function sr(t,e){t||Qn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function m2(){return I0()==="http:"||I0()==="https:"}function I0(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g2(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(m2()||Wk()||"connection"in navigator)?navigator.onLine:!0}function y2(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,n){this.shortDelay=e,this.longDelay=n,sr(n>e,"Short delay should be less than long delay!"),this.isMobile=Bk()||Hk()}get(){return g2()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fm(t,e){sr(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O1{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Qn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Qn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Qn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v2={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _2=new tl(3e4,6e4);function jm(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function no(t,e,n,r,i={}){return F1(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=el(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:u},s);return $k()||(c.referrerPolicy="no-referrer"),O1.fetch()(j1(t,t.config.apiHost,n,a),c)})}async function F1(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},v2),e);try{const i=new E2(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ql(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[u,c]=a.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ql(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Ql(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Ql(t,"user-disabled",o);const h=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw M1(t,h,c);ir(t,h)}}catch(i){if(i instanceof ur)throw i;ir(t,"network-request-failed",{message:String(i)})}}async function w2(t,e,n,r,i={}){const s=await no(t,e,n,r,i);return"mfaPendingCredential"in s&&ir(t,"multi-factor-auth-required",{_serverResponse:s}),s}function j1(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Fm(t.config,i):`${t.config.apiScheme}://${i}`}class E2{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Nn(this.auth,"network-request-failed")),_2.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ql(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Nn(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T2(t,e){return no(t,"POST","/v1/accounts:delete",e)}async function U1(t,e){return no(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function x2(t,e=!1){const n=Pt(t),r=await n.getIdToken(e),i=Um(r);Z(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ta(pd(i.auth_time)),issuedAtTime:ta(pd(i.iat)),expirationTime:ta(pd(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function pd(t){return Number(t)*1e3}function Um(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return vu("JWT malformed, contained fewer than 3 sections"),null;try{const i=I1(n);return i?JSON.parse(i):(vu("Failed to decode base64 JWT payload"),null)}catch(i){return vu("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function A0(t){const e=Um(t);return Z(e,"internal-error"),Z(typeof e.exp<"u","internal-error"),Z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Na(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ur&&S2(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function S2({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I2{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ta(this.lastLoginAt),this.creationTime=ta(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lc(t){var e;const n=t.auth,r=await t.getIdToken(),i=await Na(t,U1(n,{idToken:r}));Z(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?B1(s.providerUserInfo):[],a=C2(t.providerData,o),u=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),h=u?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new $f(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function A2(t){const e=Pt(t);await lc(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function C2(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function B1(t){return t.map(e=>{var{providerId:n}=e,r=Mm(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P2(t,e){const n=await F1(t,{},async()=>{const r=el({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=j1(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",O1.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function R2(t,e){return no(t,"POST","/v2/accounts:revokeToken",jm(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Z(e.idToken,"internal-error"),Z(typeof e.idToken<"u","internal-error"),Z(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):A0(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Z(e.length!==0,"internal-error");const n=A0(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await P2(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new As;return r&&(Z(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Z(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Z(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new As,this.toJSON())}_performRefresh(){return Qn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(t,e){Z(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Yn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Mm(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new I2(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new $f(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Na(this,this.stsTokenManager.getToken(this.auth,e));return Z(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return x2(this,e)}reload(){return A2(this)}_assign(e){this!==e&&(Z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Yn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await lc(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Cr(this.auth.app))return Promise.reject(xi(this.auth));const e=await this.getIdToken();return await Na(this,T2(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,u,c,h;const d=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(i=n.email)!==null&&i!==void 0?i:void 0,g=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,E=(o=n.photoURL)!==null&&o!==void 0?o:void 0,A=(a=n.tenantId)!==null&&a!==void 0?a:void 0,C=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,w=(c=n.createdAt)!==null&&c!==void 0?c:void 0,v=(h=n.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:T,emailVerified:N,isAnonymous:L,providerData:O,stsTokenManager:S}=n;Z(T&&S,e,"internal-error");const y=As.fromJSON(this.name,S);Z(typeof T=="string",e,"internal-error"),pr(d,e.name),pr(p,e.name),Z(typeof N=="boolean",e,"internal-error"),Z(typeof L=="boolean",e,"internal-error"),pr(g,e.name),pr(E,e.name),pr(A,e.name),pr(C,e.name),pr(w,e.name),pr(v,e.name);const I=new Yn({uid:T,auth:e,email:p,emailVerified:N,displayName:d,isAnonymous:L,photoURL:E,phoneNumber:g,tenantId:A,stsTokenManager:y,createdAt:w,lastLoginAt:v});return O&&Array.isArray(O)&&(I.providerData=O.map(x=>Object.assign({},x))),C&&(I._redirectEventId=C),I}static async _fromIdTokenResponse(e,n,r=!1){const i=new As;i.updateFromServerResponse(n);const s=new Yn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await lc(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];Z(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?B1(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new As;a.updateFromIdToken(r);const u=new Yn({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new $f(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C0=new Map;function Xn(t){sr(t instanceof Function,"Expected a class definition");let e=C0.get(t);return e?(sr(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,C0.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z1{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}z1.type="NONE";const P0=z1;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(t,e,n){return`firebase:${t}:${e}:${n}`}class Cs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=_u(this.userKey,i.apiKey,s),this.fullPersistenceKey=_u("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Yn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Cs(Xn(P0),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||Xn(P0);const o=_u(r,e.config.apiKey,e.name);let a=null;for(const c of n)try{const h=await c._get(o);if(h){const d=Yn._fromJSON(e,h);c!==s&&(a=d),s=c;break}}catch{}const u=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Cs(s,e,r):(s=u[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new Cs(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R0(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(q1(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if($1(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(K1(e))return"Blackberry";if(Q1(e))return"Webos";if(W1(e))return"Safari";if((e.includes("chrome/")||H1(e))&&!e.includes("edge/"))return"Chrome";if(G1(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function $1(t=Ct()){return/firefox\//i.test(t)}function W1(t=Ct()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function H1(t=Ct()){return/crios\//i.test(t)}function q1(t=Ct()){return/iemobile/i.test(t)}function G1(t=Ct()){return/android/i.test(t)}function K1(t=Ct()){return/blackberry/i.test(t)}function Q1(t=Ct()){return/webos/i.test(t)}function Bm(t=Ct()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function k2(t=Ct()){var e;return Bm(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function b2(){return qk()&&document.documentMode===10}function Y1(t=Ct()){return Bm(t)||G1(t)||Q1(t)||K1(t)||/windows phone/i.test(t)||q1(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X1(t,e=[]){let n;switch(t){case"Browser":n=R0(Ct());break;case"Worker":n=`${R0(Ct())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${to}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N2{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const u=e(s);o(u)}catch(u){a(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D2(t,e={}){return no(t,"GET","/v2/passwordPolicy",jm(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V2=6;class L2{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:V2,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,a;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(a=u.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M2{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new k0(this),this.idTokenSubscription=new k0(this),this.beforeStateQueue=new N2(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=L1,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Xn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Cs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await U1(this,{idToken:e}),r=await Yn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Cr(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===a)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await lc(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=y2()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Cr(this.app))return Promise.reject(xi(this));const n=e?Pt(e):null;return n&&Z(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Cr(this.app)?Promise.reject(xi(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Cr(this.app)?Promise.reject(xi(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Xn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await D2(this),n=new L2(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Za("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await R2(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Xn(e)||this._popupRedirectResolver;Z(n,this,"argument-error"),this.redirectPersistenceManager=await Cs.create(this,[Xn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(Z(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=X1(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&p2(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function zm(t){return Pt(t)}class k0{constructor(e){this.auth=e,this.observer=null,this.addObserver=eb(n=>this.observer=n)}get next(){return Z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $m={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function O2(t){$m=t}function F2(t){return $m.loadJS(t)}function j2(){return $m.gapiScript}function U2(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B2(t,e){const n=Vm(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(oc(s,e??{}))return i;ir(i,"already-initialized")}return n.initialize({options:e})}function z2(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Xn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function $2(t,e,n){const r=zm(t);Z(r._canInitEmulator,r,"emulator-config-failed"),Z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=J1(e),{host:o,port:a}=W2(e),u=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),H2()}function J1(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function W2(t){const e=J1(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:b0(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:b0(o)}}}function b0(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function H2(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z1{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Qn("not implemented")}_getIdTokenResponse(e){return Qn("not implemented")}_linkToIdToken(e,n){return Qn("not implemented")}_getReauthenticationResolver(e){return Qn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ps(t,e){return w2(t,"POST","/v1/accounts:signInWithIdp",jm(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q2="http://localhost";class Di extends Z1{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Di(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ir("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Mm(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Di(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ps(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ps(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ps(e,n)}buildRequest(){const e={requestUri:q2,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=el(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl extends ex{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er extends nl{constructor(){super("facebook.com")}static credential(e){return Di._fromParams({providerId:Er.PROVIDER_ID,signInMethod:Er.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Er.credentialFromTaggedObject(e)}static credentialFromError(e){return Er.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Er.credential(e.oauthAccessToken)}catch{return null}}}Er.FACEBOOK_SIGN_IN_METHOD="facebook.com";Er.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends nl{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Di._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return qn.credential(n,r)}catch{return null}}}qn.GOOGLE_SIGN_IN_METHOD="google.com";qn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr extends nl{constructor(){super("github.com")}static credential(e){return Di._fromParams({providerId:Tr.PROVIDER_ID,signInMethod:Tr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tr.credentialFromTaggedObject(e)}static credentialFromError(e){return Tr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tr.credential(e.oauthAccessToken)}catch{return null}}}Tr.GITHUB_SIGN_IN_METHOD="github.com";Tr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr extends nl{constructor(){super("twitter.com")}static credential(e,n){return Di._fromParams({providerId:xr.PROVIDER_ID,signInMethod:xr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return xr.credentialFromTaggedObject(e)}static credentialFromError(e){return xr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return xr.credential(n,r)}catch{return null}}}xr.TWITTER_SIGN_IN_METHOD="twitter.com";xr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Yn._fromIdTokenResponse(e,r,i),o=N0(r);return new js({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=N0(r);return new js({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function N0(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc extends ur{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,uc.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new uc(e,n,r,i)}}function tx(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?uc._fromErrorAndOperation(t,s,e,r):s})}async function G2(t,e,n=!1){const r=await Na(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return js._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K2(t,e,n=!1){const{auth:r}=t;if(Cr(r.app))return Promise.reject(xi(r));const i="reauthenticate";try{const s=await Na(t,tx(r,i,e,t),n);Z(s.idToken,r,"internal-error");const o=Um(s.idToken);Z(o,r,"internal-error");const{sub:a}=o;return Z(t.uid===a,r,"user-mismatch"),js._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ir(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q2(t,e,n=!1){if(Cr(t.app))return Promise.reject(xi(t));const r="signIn",i=await tx(t,r,e),s=await js._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function Y2(t,e,n,r){return Pt(t).onIdTokenChanged(e,n,r)}function X2(t,e,n){return Pt(t).beforeAuthStateChanged(e,n)}const cc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(cc,"1"),this.storage.removeItem(cc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J2=1e3,Z2=10;class rx extends nx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Y1(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);b2()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Z2):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},J2)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}rx.type="LOCAL";const eN=rx;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ix extends nx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ix.type="SESSION";const sx=ix;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Kc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async c=>c(n.origin,s)),u=await tN(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Kc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,u)=>{const c=Wm("",20);i.port1.start();const h=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const p=d;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(p.data.response);break;default:clearTimeout(h),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(){return window}function rN(t){Dn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ox(){return typeof Dn().WorkerGlobalScope<"u"&&typeof Dn().importScripts=="function"}async function iN(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sN(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function oN(){return ox()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ax="firebaseLocalStorageDb",aN=1,hc="firebaseLocalStorage",lx="fbase_key";class rl{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Qc(t,e){return t.transaction([hc],e?"readwrite":"readonly").objectStore(hc)}function lN(){const t=indexedDB.deleteDatabase(ax);return new rl(t).toPromise()}function Wf(){const t=indexedDB.open(ax,aN);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(hc,{keyPath:lx})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(hc)?e(r):(r.close(),await lN(),e(await Wf()))})})}async function D0(t,e,n){const r=Qc(t,!0).put({[lx]:e,value:n});return new rl(r).toPromise()}async function uN(t,e){const n=Qc(t,!1).get(e),r=await new rl(n).toPromise();return r===void 0?null:r.value}function V0(t,e){const n=Qc(t,!0).delete(e);return new rl(n).toPromise()}const cN=800,hN=3;class ux{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Wf(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>hN)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ox()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Kc._getInstance(oN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await iN(),!this.activeServiceWorker)return;this.sender=new nN(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Wf();return await D0(e,cc,"1"),await V0(e,cc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>D0(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>uN(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>V0(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Qc(i,!1).getAll();return new rl(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ux.type="LOCAL";const dN=ux;new tl(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fN(t,e){return e?Xn(e):(Z(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm extends Z1{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ps(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ps(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ps(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function pN(t){return Q2(t.auth,new Hm(t),t.bypassAuthState)}function mN(t){const{auth:e,user:n}=t;return Z(n,e,"internal-error"),K2(n,new Hm(t),t.bypassAuthState)}async function gN(t){const{auth:e,user:n}=t;return Z(n,e,"internal-error"),G2(n,new Hm(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cx{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pN;case"linkViaPopup":case"linkViaRedirect":return gN;case"reauthViaPopup":case"reauthViaRedirect":return mN;default:ir(this.auth,"internal-error")}}resolve(e){sr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){sr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yN=new tl(2e3,1e4);class gs extends cx{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,gs.currentPopupAction&&gs.currentPopupAction.cancel(),gs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Z(e,this.auth,"internal-error"),e}async onExecution(){sr(this.filter.length===1,"Popup operations only handle one event");const e=Wm();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Nn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Nn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Nn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yN.get())};e()}}gs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vN="pendingRedirect",wu=new Map;class _N extends cx{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=wu.get(this.auth._key());if(!e){try{const r=await wN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}wu.set(this.auth._key(),e)}return this.bypassAuthState||wu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wN(t,e){const n=xN(e),r=TN(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function EN(t,e){wu.set(t._key(),e)}function TN(t){return Xn(t._redirectPersistence)}function xN(t){return _u(vN,t.config.apiKey,t.name)}async function SN(t,e,n=!1){if(Cr(t.app))return Promise.reject(xi(t));const r=zm(t),i=fN(r,e),o=await new _N(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IN=10*60*1e3;class AN{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!CN(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!hx(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Nn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=IN&&this.cachedEventUids.clear(),this.cachedEventUids.has(L0(e))}saveEventToCache(e){this.cachedEventUids.add(L0(e)),this.lastProcessedEventTime=Date.now()}}function L0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function hx({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function CN(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hx(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PN(t,e={}){return no(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kN=/^https?/;async function bN(t){if(t.config.emulator)return;const{authorizedDomains:e}=await PN(t);for(const n of e)try{if(NN(n))return}catch{}ir(t,"unauthorized-domain")}function NN(t){const e=zf(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!kN.test(n))return!1;if(RN.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DN=new tl(3e4,6e4);function M0(){const t=Dn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function VN(t){return new Promise((e,n)=>{var r,i,s;function o(){M0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{M0(),n(Nn(t,"network-request-failed"))},timeout:DN.get()})}if(!((i=(r=Dn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Dn().gapi)===null||s===void 0)&&s.load)o();else{const a=U2("iframefcb");return Dn()[a]=()=>{gapi.load?o():n(Nn(t,"network-request-failed"))},F2(`${j2()}?onload=${a}`).catch(u=>n(u))}}).catch(e=>{throw Eu=null,e})}let Eu=null;function LN(t){return Eu=Eu||VN(t),Eu}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MN=new tl(5e3,15e3),ON="__/auth/iframe",FN="emulator/auth/iframe",jN={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},UN=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function BN(t){const e=t.config;Z(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Fm(e,FN):`https://${t.config.authDomain}/${ON}`,r={apiKey:e.apiKey,appName:t.name,v:to},i=UN.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${el(r).slice(1)}`}async function zN(t){const e=await LN(t),n=Dn().gapi;return Z(n,t,"internal-error"),e.open({where:document.body,url:BN(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jN,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Nn(t,"network-request-failed"),a=Dn().setTimeout(()=>{s(o)},MN.get());function u(){Dn().clearTimeout(a),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $N={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},WN=500,HN=600,qN="_blank",GN="http://localhost";class O0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function KN(t,e,n,r=WN,i=HN){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const u=Object.assign(Object.assign({},$N),{width:r.toString(),height:i.toString(),top:s,left:o}),c=Ct().toLowerCase();n&&(a=H1(c)?qN:n),$1(c)&&(e=e||GN,u.scrollbars="yes");const h=Object.entries(u).reduce((p,[g,E])=>`${p}${g}=${E},`,"");if(k2(c)&&a!=="_self")return QN(e||"",a),new O0(null);const d=window.open(e||"",a,h);Z(d,t,"popup-blocked");try{d.focus()}catch{}return new O0(d)}function QN(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YN="__/auth/handler",XN="emulator/auth/handler",JN=encodeURIComponent("fac");async function F0(t,e,n,r,i,s){Z(t.config.authDomain,t,"auth-domain-config-required"),Z(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:to,eventId:i};if(e instanceof ex){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Zk(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof nl){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const u=await t._getAppCheckToken(),c=u?`#${JN}=${encodeURIComponent(u)}`:"";return`${ZN(t)}?${el(a).slice(1)}${c}`}function ZN({config:t}){return t.emulator?Fm(t,XN):`https://${t.authDomain}/${YN}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md="webStorageSupport";class eD{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sx,this._completeRedirectFn=SN,this._overrideRedirectResult=EN}async _openPopup(e,n,r,i){var s;sr((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await F0(e,n,r,zf(),i);return KN(e,o,Wm())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await F0(e,n,r,zf(),i);return rN(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(sr(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await zN(e),r=new AN(e);return n.register("authEvent",i=>(Z(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(md,{type:md},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[md];o!==void 0&&n(!!o),ir(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=bN(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Y1()||W1()||Bm()}}const tD=eD;var j0="@firebase/auth",U0="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rD(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function iD(t){Fs(new Ni("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;Z(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:X1(t)},c=new M2(r,i,s,u);return z2(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Fs(new Ni("auth-internal",e=>{const n=zm(e.getProvider("auth").getImmediate());return(r=>new nD(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Br(j0,U0,rD(t)),Br(j0,U0,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sD=5*60,oD=P1("authIdTokenMaxAge")||sD;let B0=null;const aD=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>oD)return;const i=n==null?void 0:n.token;B0!==i&&(B0=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function lD(t=Lm()){const e=Vm(t,"auth");if(e.isInitialized())return e.getImmediate();const n=B2(t,{popupRedirectResolver:tD,persistence:[dN,eN,sx]}),r=P1("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=aD(s.toString());X2(n,o,()=>o(n.currentUser)),Y2(n,a=>o(a))}}const i=A1("auth");return i&&$2(n,`http://${i}`),n}function uD(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}O2({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Nn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",uD().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});iD("Browser");var z0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Si,dx;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,y){function I(){}I.prototype=y.prototype,S.D=y.prototype,S.prototype=new I,S.prototype.constructor=S,S.C=function(x,k,b){for(var R=Array(arguments.length-2),me=2;me<arguments.length;me++)R[me-2]=arguments[me];return y.prototype[k].apply(x,R)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(S,y,I){I||(I=0);var x=Array(16);if(typeof y=="string")for(var k=0;16>k;++k)x[k]=y.charCodeAt(I++)|y.charCodeAt(I++)<<8|y.charCodeAt(I++)<<16|y.charCodeAt(I++)<<24;else for(k=0;16>k;++k)x[k]=y[I++]|y[I++]<<8|y[I++]<<16|y[I++]<<24;y=S.g[0],I=S.g[1],k=S.g[2];var b=S.g[3],R=y+(b^I&(k^b))+x[0]+3614090360&4294967295;y=I+(R<<7&4294967295|R>>>25),R=b+(k^y&(I^k))+x[1]+3905402710&4294967295,b=y+(R<<12&4294967295|R>>>20),R=k+(I^b&(y^I))+x[2]+606105819&4294967295,k=b+(R<<17&4294967295|R>>>15),R=I+(y^k&(b^y))+x[3]+3250441966&4294967295,I=k+(R<<22&4294967295|R>>>10),R=y+(b^I&(k^b))+x[4]+4118548399&4294967295,y=I+(R<<7&4294967295|R>>>25),R=b+(k^y&(I^k))+x[5]+1200080426&4294967295,b=y+(R<<12&4294967295|R>>>20),R=k+(I^b&(y^I))+x[6]+2821735955&4294967295,k=b+(R<<17&4294967295|R>>>15),R=I+(y^k&(b^y))+x[7]+4249261313&4294967295,I=k+(R<<22&4294967295|R>>>10),R=y+(b^I&(k^b))+x[8]+1770035416&4294967295,y=I+(R<<7&4294967295|R>>>25),R=b+(k^y&(I^k))+x[9]+2336552879&4294967295,b=y+(R<<12&4294967295|R>>>20),R=k+(I^b&(y^I))+x[10]+4294925233&4294967295,k=b+(R<<17&4294967295|R>>>15),R=I+(y^k&(b^y))+x[11]+2304563134&4294967295,I=k+(R<<22&4294967295|R>>>10),R=y+(b^I&(k^b))+x[12]+1804603682&4294967295,y=I+(R<<7&4294967295|R>>>25),R=b+(k^y&(I^k))+x[13]+4254626195&4294967295,b=y+(R<<12&4294967295|R>>>20),R=k+(I^b&(y^I))+x[14]+2792965006&4294967295,k=b+(R<<17&4294967295|R>>>15),R=I+(y^k&(b^y))+x[15]+1236535329&4294967295,I=k+(R<<22&4294967295|R>>>10),R=y+(k^b&(I^k))+x[1]+4129170786&4294967295,y=I+(R<<5&4294967295|R>>>27),R=b+(I^k&(y^I))+x[6]+3225465664&4294967295,b=y+(R<<9&4294967295|R>>>23),R=k+(y^I&(b^y))+x[11]+643717713&4294967295,k=b+(R<<14&4294967295|R>>>18),R=I+(b^y&(k^b))+x[0]+3921069994&4294967295,I=k+(R<<20&4294967295|R>>>12),R=y+(k^b&(I^k))+x[5]+3593408605&4294967295,y=I+(R<<5&4294967295|R>>>27),R=b+(I^k&(y^I))+x[10]+38016083&4294967295,b=y+(R<<9&4294967295|R>>>23),R=k+(y^I&(b^y))+x[15]+3634488961&4294967295,k=b+(R<<14&4294967295|R>>>18),R=I+(b^y&(k^b))+x[4]+3889429448&4294967295,I=k+(R<<20&4294967295|R>>>12),R=y+(k^b&(I^k))+x[9]+568446438&4294967295,y=I+(R<<5&4294967295|R>>>27),R=b+(I^k&(y^I))+x[14]+3275163606&4294967295,b=y+(R<<9&4294967295|R>>>23),R=k+(y^I&(b^y))+x[3]+4107603335&4294967295,k=b+(R<<14&4294967295|R>>>18),R=I+(b^y&(k^b))+x[8]+1163531501&4294967295,I=k+(R<<20&4294967295|R>>>12),R=y+(k^b&(I^k))+x[13]+2850285829&4294967295,y=I+(R<<5&4294967295|R>>>27),R=b+(I^k&(y^I))+x[2]+4243563512&4294967295,b=y+(R<<9&4294967295|R>>>23),R=k+(y^I&(b^y))+x[7]+1735328473&4294967295,k=b+(R<<14&4294967295|R>>>18),R=I+(b^y&(k^b))+x[12]+2368359562&4294967295,I=k+(R<<20&4294967295|R>>>12),R=y+(I^k^b)+x[5]+4294588738&4294967295,y=I+(R<<4&4294967295|R>>>28),R=b+(y^I^k)+x[8]+2272392833&4294967295,b=y+(R<<11&4294967295|R>>>21),R=k+(b^y^I)+x[11]+1839030562&4294967295,k=b+(R<<16&4294967295|R>>>16),R=I+(k^b^y)+x[14]+4259657740&4294967295,I=k+(R<<23&4294967295|R>>>9),R=y+(I^k^b)+x[1]+2763975236&4294967295,y=I+(R<<4&4294967295|R>>>28),R=b+(y^I^k)+x[4]+1272893353&4294967295,b=y+(R<<11&4294967295|R>>>21),R=k+(b^y^I)+x[7]+4139469664&4294967295,k=b+(R<<16&4294967295|R>>>16),R=I+(k^b^y)+x[10]+3200236656&4294967295,I=k+(R<<23&4294967295|R>>>9),R=y+(I^k^b)+x[13]+681279174&4294967295,y=I+(R<<4&4294967295|R>>>28),R=b+(y^I^k)+x[0]+3936430074&4294967295,b=y+(R<<11&4294967295|R>>>21),R=k+(b^y^I)+x[3]+3572445317&4294967295,k=b+(R<<16&4294967295|R>>>16),R=I+(k^b^y)+x[6]+76029189&4294967295,I=k+(R<<23&4294967295|R>>>9),R=y+(I^k^b)+x[9]+3654602809&4294967295,y=I+(R<<4&4294967295|R>>>28),R=b+(y^I^k)+x[12]+3873151461&4294967295,b=y+(R<<11&4294967295|R>>>21),R=k+(b^y^I)+x[15]+530742520&4294967295,k=b+(R<<16&4294967295|R>>>16),R=I+(k^b^y)+x[2]+3299628645&4294967295,I=k+(R<<23&4294967295|R>>>9),R=y+(k^(I|~b))+x[0]+4096336452&4294967295,y=I+(R<<6&4294967295|R>>>26),R=b+(I^(y|~k))+x[7]+1126891415&4294967295,b=y+(R<<10&4294967295|R>>>22),R=k+(y^(b|~I))+x[14]+2878612391&4294967295,k=b+(R<<15&4294967295|R>>>17),R=I+(b^(k|~y))+x[5]+4237533241&4294967295,I=k+(R<<21&4294967295|R>>>11),R=y+(k^(I|~b))+x[12]+1700485571&4294967295,y=I+(R<<6&4294967295|R>>>26),R=b+(I^(y|~k))+x[3]+2399980690&4294967295,b=y+(R<<10&4294967295|R>>>22),R=k+(y^(b|~I))+x[10]+4293915773&4294967295,k=b+(R<<15&4294967295|R>>>17),R=I+(b^(k|~y))+x[1]+2240044497&4294967295,I=k+(R<<21&4294967295|R>>>11),R=y+(k^(I|~b))+x[8]+1873313359&4294967295,y=I+(R<<6&4294967295|R>>>26),R=b+(I^(y|~k))+x[15]+4264355552&4294967295,b=y+(R<<10&4294967295|R>>>22),R=k+(y^(b|~I))+x[6]+2734768916&4294967295,k=b+(R<<15&4294967295|R>>>17),R=I+(b^(k|~y))+x[13]+1309151649&4294967295,I=k+(R<<21&4294967295|R>>>11),R=y+(k^(I|~b))+x[4]+4149444226&4294967295,y=I+(R<<6&4294967295|R>>>26),R=b+(I^(y|~k))+x[11]+3174756917&4294967295,b=y+(R<<10&4294967295|R>>>22),R=k+(y^(b|~I))+x[2]+718787259&4294967295,k=b+(R<<15&4294967295|R>>>17),R=I+(b^(k|~y))+x[9]+3951481745&4294967295,S.g[0]=S.g[0]+y&4294967295,S.g[1]=S.g[1]+(k+(R<<21&4294967295|R>>>11))&4294967295,S.g[2]=S.g[2]+k&4294967295,S.g[3]=S.g[3]+b&4294967295}r.prototype.u=function(S,y){y===void 0&&(y=S.length);for(var I=y-this.blockSize,x=this.B,k=this.h,b=0;b<y;){if(k==0)for(;b<=I;)i(this,S,b),b+=this.blockSize;if(typeof S=="string"){for(;b<y;)if(x[k++]=S.charCodeAt(b++),k==this.blockSize){i(this,x),k=0;break}}else for(;b<y;)if(x[k++]=S[b++],k==this.blockSize){i(this,x),k=0;break}}this.h=k,this.o+=y},r.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var y=1;y<S.length-8;++y)S[y]=0;var I=8*this.o;for(y=S.length-8;y<S.length;++y)S[y]=I&255,I/=256;for(this.u(S),S=Array(16),y=I=0;4>y;++y)for(var x=0;32>x;x+=8)S[I++]=this.g[y]>>>x&255;return S};function s(S,y){var I=a;return Object.prototype.hasOwnProperty.call(I,S)?I[S]:I[S]=y(S)}function o(S,y){this.h=y;for(var I=[],x=!0,k=S.length-1;0<=k;k--){var b=S[k]|0;x&&b==y||(I[k]=b,x=!1)}this.g=I}var a={};function u(S){return-128<=S&&128>S?s(S,function(y){return new o([y|0],0>y?-1:0)}):new o([S|0],0>S?-1:0)}function c(S){if(isNaN(S)||!isFinite(S))return d;if(0>S)return C(c(-S));for(var y=[],I=1,x=0;S>=I;x++)y[x]=S/I|0,I*=4294967296;return new o(y,0)}function h(S,y){if(S.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(S.charAt(0)=="-")return C(h(S.substring(1),y));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=c(Math.pow(y,8)),x=d,k=0;k<S.length;k+=8){var b=Math.min(8,S.length-k),R=parseInt(S.substring(k,k+b),y);8>b?(b=c(Math.pow(y,b)),x=x.j(b).add(c(R))):(x=x.j(I),x=x.add(c(R)))}return x}var d=u(0),p=u(1),g=u(16777216);t=o.prototype,t.m=function(){if(A(this))return-C(this).m();for(var S=0,y=1,I=0;I<this.g.length;I++){var x=this.i(I);S+=(0<=x?x:4294967296+x)*y,y*=4294967296}return S},t.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(E(this))return"0";if(A(this))return"-"+C(this).toString(S);for(var y=c(Math.pow(S,6)),I=this,x="";;){var k=N(I,y).g;I=w(I,k.j(y));var b=((0<I.g.length?I.g[0]:I.h)>>>0).toString(S);if(I=k,E(I))return b+x;for(;6>b.length;)b="0"+b;x=b+x}},t.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function E(S){if(S.h!=0)return!1;for(var y=0;y<S.g.length;y++)if(S.g[y]!=0)return!1;return!0}function A(S){return S.h==-1}t.l=function(S){return S=w(this,S),A(S)?-1:E(S)?0:1};function C(S){for(var y=S.g.length,I=[],x=0;x<y;x++)I[x]=~S.g[x];return new o(I,~S.h).add(p)}t.abs=function(){return A(this)?C(this):this},t.add=function(S){for(var y=Math.max(this.g.length,S.g.length),I=[],x=0,k=0;k<=y;k++){var b=x+(this.i(k)&65535)+(S.i(k)&65535),R=(b>>>16)+(this.i(k)>>>16)+(S.i(k)>>>16);x=R>>>16,b&=65535,R&=65535,I[k]=R<<16|b}return new o(I,I[I.length-1]&-2147483648?-1:0)};function w(S,y){return S.add(C(y))}t.j=function(S){if(E(this)||E(S))return d;if(A(this))return A(S)?C(this).j(C(S)):C(C(this).j(S));if(A(S))return C(this.j(C(S)));if(0>this.l(g)&&0>S.l(g))return c(this.m()*S.m());for(var y=this.g.length+S.g.length,I=[],x=0;x<2*y;x++)I[x]=0;for(x=0;x<this.g.length;x++)for(var k=0;k<S.g.length;k++){var b=this.i(x)>>>16,R=this.i(x)&65535,me=S.i(k)>>>16,re=S.i(k)&65535;I[2*x+2*k]+=R*re,v(I,2*x+2*k),I[2*x+2*k+1]+=b*re,v(I,2*x+2*k+1),I[2*x+2*k+1]+=R*me,v(I,2*x+2*k+1),I[2*x+2*k+2]+=b*me,v(I,2*x+2*k+2)}for(x=0;x<y;x++)I[x]=I[2*x+1]<<16|I[2*x];for(x=y;x<2*y;x++)I[x]=0;return new o(I,0)};function v(S,y){for(;(S[y]&65535)!=S[y];)S[y+1]+=S[y]>>>16,S[y]&=65535,y++}function T(S,y){this.g=S,this.h=y}function N(S,y){if(E(y))throw Error("division by zero");if(E(S))return new T(d,d);if(A(S))return y=N(C(S),y),new T(C(y.g),C(y.h));if(A(y))return y=N(S,C(y)),new T(C(y.g),y.h);if(30<S.g.length){if(A(S)||A(y))throw Error("slowDivide_ only works with positive integers.");for(var I=p,x=y;0>=x.l(S);)I=L(I),x=L(x);var k=O(I,1),b=O(x,1);for(x=O(x,2),I=O(I,2);!E(x);){var R=b.add(x);0>=R.l(S)&&(k=k.add(I),b=R),x=O(x,1),I=O(I,1)}return y=w(S,k.j(y)),new T(k,y)}for(k=d;0<=S.l(y);){for(I=Math.max(1,Math.floor(S.m()/y.m())),x=Math.ceil(Math.log(I)/Math.LN2),x=48>=x?1:Math.pow(2,x-48),b=c(I),R=b.j(y);A(R)||0<R.l(S);)I-=x,b=c(I),R=b.j(y);E(b)&&(b=p),k=k.add(b),S=w(S,R)}return new T(k,S)}t.A=function(S){return N(this,S).h},t.and=function(S){for(var y=Math.max(this.g.length,S.g.length),I=[],x=0;x<y;x++)I[x]=this.i(x)&S.i(x);return new o(I,this.h&S.h)},t.or=function(S){for(var y=Math.max(this.g.length,S.g.length),I=[],x=0;x<y;x++)I[x]=this.i(x)|S.i(x);return new o(I,this.h|S.h)},t.xor=function(S){for(var y=Math.max(this.g.length,S.g.length),I=[],x=0;x<y;x++)I[x]=this.i(x)^S.i(x);return new o(I,this.h^S.h)};function L(S){for(var y=S.g.length+1,I=[],x=0;x<y;x++)I[x]=S.i(x)<<1|S.i(x-1)>>>31;return new o(I,S.h)}function O(S,y){var I=y>>5;y%=32;for(var x=S.g.length-I,k=[],b=0;b<x;b++)k[b]=0<y?S.i(b+I)>>>y|S.i(b+I+1)<<32-y:S.i(b+I);return new o(k,S.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,dx=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=h,Si=o}).apply(typeof z0<"u"?z0:typeof self<"u"?self:typeof window<"u"?window:{});var Yl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fx,Uo,px,Tu,Hf,mx,gx,yx;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,f,m){return l==Array.prototype||l==Object.prototype||(l[f]=m.value),l};function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yl=="object"&&Yl];for(var f=0;f<l.length;++f){var m=l[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=n(this);function i(l,f){if(f)e:{var m=r;l=l.split(".");for(var _=0;_<l.length-1;_++){var V=l[_];if(!(V in m))break e;m=m[V]}l=l[l.length-1],_=m[l],f=f(_),f!=_&&f!=null&&e(m,l,{configurable:!0,writable:!0,value:f})}}function s(l,f){l instanceof String&&(l+="");var m=0,_=!1,V={next:function(){if(!_&&m<l.length){var M=m++;return{value:f(M,l[M]),done:!1}}return _=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}i("Array.prototype.values",function(l){return l||function(){return s(this,function(f,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function u(l){var f=typeof l;return f=f!="object"?f:l?Array.isArray(l)?"array":f:"null",f=="array"||f=="object"&&typeof l.length=="number"}function c(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function h(l,f,m){return l.call.apply(l.bind,arguments)}function d(l,f,m){if(!l)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,_),l.apply(f,V)}}return function(){return l.apply(f,arguments)}}function p(l,f,m){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:d,p.apply(null,arguments)}function g(l,f){var m=Array.prototype.slice.call(arguments,1);return function(){var _=m.slice();return _.push.apply(_,arguments),l.apply(this,_)}}function E(l,f){function m(){}m.prototype=f.prototype,l.aa=f.prototype,l.prototype=new m,l.prototype.constructor=l,l.Qb=function(_,V,M){for(var $=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)$[ve-2]=arguments[ve];return f.prototype[V].apply(_,$)}}function A(l){const f=l.length;if(0<f){const m=Array(f);for(let _=0;_<f;_++)m[_]=l[_];return m}return[]}function C(l,f){for(let m=1;m<arguments.length;m++){const _=arguments[m];if(u(_)){const V=l.length||0,M=_.length||0;l.length=V+M;for(let $=0;$<M;$++)l[V+$]=_[$]}else l.push(_)}}class w{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function v(l){return/^[\s\xa0]*$/.test(l)}function T(){var l=a.navigator;return l&&(l=l.userAgent)?l:""}function N(l){return N[" "](l),l}N[" "]=function(){};var L=T().indexOf("Gecko")!=-1&&!(T().toLowerCase().indexOf("webkit")!=-1&&T().indexOf("Edge")==-1)&&!(T().indexOf("Trident")!=-1||T().indexOf("MSIE")!=-1)&&T().indexOf("Edge")==-1;function O(l,f,m){for(const _ in l)f.call(m,l[_],_,l)}function S(l,f){for(const m in l)f.call(void 0,l[m],m,l)}function y(l){const f={};for(const m in l)f[m]=l[m];return f}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function x(l,f){let m,_;for(let V=1;V<arguments.length;V++){_=arguments[V];for(m in _)l[m]=_[m];for(let M=0;M<I.length;M++)m=I[M],Object.prototype.hasOwnProperty.call(_,m)&&(l[m]=_[m])}}function k(l){var f=1;l=l.split(":");const m=[];for(;0<f&&l.length;)m.push(l.shift()),f--;return l.length&&m.push(l.join(":")),m}function b(l){a.setTimeout(()=>{throw l},0)}function R(){var l=G;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class me{constructor(){this.h=this.g=null}add(f,m){const _=re.get();_.set(f,m),this.h?this.h.next=_:this.g=_,this.h=_}}var re=new w(()=>new ye,l=>l.reset());class ye{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let ft,U=!1,G=new me,W=()=>{const l=a.Promise.resolve(void 0);ft=()=>{l.then(J)}};var J=()=>{for(var l;l=R();){try{l.h.call(l.g)}catch(m){b(m)}var f=re;f.j(l),100>f.h&&(f.h++,l.next=f.g,f.g=l)}U=!1};function X(){this.s=this.s,this.C=this.C}X.prototype.s=!1,X.prototype.ma=function(){this.s||(this.s=!0,this.N())},X.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ue(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}ue.prototype.h=function(){this.defaultPrevented=!0};var ze=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const m=()=>{};a.addEventListener("test",m,f),a.removeEventListener("test",m,f)}catch{}return l}();function Pe(l,f){if(ue.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var m=this.type=l.type,_=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget){if(L){e:{try{N(f.nodeName);var V=!0;break e}catch{}V=!1}V||(f=null)}}else m=="mouseover"?f=l.fromElement:m=="mouseout"&&(f=l.toElement);this.relatedTarget=f,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:Je[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&Pe.aa.h.call(this)}}E(Pe,ue);var Je={2:"touch",3:"pen",4:"mouse"};Pe.prototype.h=function(){Pe.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var pt="closure_listenable_"+(1e6*Math.random()|0),vh=0;function _h(l,f,m,_,V){this.listener=l,this.proxy=null,this.src=f,this.type=m,this.capture=!!_,this.ha=V,this.key=++vh,this.da=this.fa=!1}function $i(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function Wi(l){this.src=l,this.g={},this.h=0}Wi.prototype.add=function(l,f,m,_,V){var M=l.toString();l=this.g[M],l||(l=this.g[M]=[],this.h++);var $=Hi(l,f,_,V);return-1<$?(f=l[$],m||(f.fa=!1)):(f=new _h(f,this.src,M,!!_,V),f.fa=m,l.push(f)),f};function co(l,f){var m=f.type;if(m in l.g){var _=l.g[m],V=Array.prototype.indexOf.call(_,f,void 0),M;(M=0<=V)&&Array.prototype.splice.call(_,V,1),M&&($i(f),l.g[m].length==0&&(delete l.g[m],l.h--))}}function Hi(l,f,m,_){for(var V=0;V<l.length;++V){var M=l[V];if(!M.da&&M.listener==f&&M.capture==!!m&&M.ha==_)return V}return-1}var qi="closure_lm_"+(1e6*Math.random()|0),Gi={};function ho(l,f,m,_,V){if(Array.isArray(f)){for(var M=0;M<f.length;M++)ho(l,f[M],m,_,V);return null}return m=Bn(m),l&&l[pt]?l.K(f,m,c(_)?!!_.capture:!1,V):B(l,f,m,!1,_,V)}function B(l,f,m,_,V,M){if(!f)throw Error("Invalid event type");var $=c(V)?!!V.capture:!!V,ve=mt(l);if(ve||(l[qi]=ve=new Wi(l)),m=ve.add(f,m,_,$,M),m.proxy)return m;if(_=ie(),m.proxy=_,_.src=l,_.listener=m,l.addEventListener)ze||(V=$),V===void 0&&(V=!1),l.addEventListener(f.toString(),_,V);else if(l.attachEvent)l.attachEvent(je(f.toString()),_);else if(l.addListener&&l.removeListener)l.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return m}function ie(){function l(m){return f.call(l.src,l.listener,m)}const f=Ft;return l}function ge(l,f,m,_,V){if(Array.isArray(f))for(var M=0;M<f.length;M++)ge(l,f[M],m,_,V);else _=c(_)?!!_.capture:!!_,m=Bn(m),l&&l[pt]?(l=l.i,f=String(f).toString(),f in l.g&&(M=l.g[f],m=Hi(M,m,_,V),-1<m&&($i(M[m]),Array.prototype.splice.call(M,m,1),M.length==0&&(delete l.g[f],l.h--)))):l&&(l=mt(l))&&(f=l.g[f.toString()],l=-1,f&&(l=Hi(f,m,_,V)),(m=-1<l?f[l]:null)&&Ae(m))}function Ae(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[pt])co(f.i,l);else{var m=l.type,_=l.proxy;f.removeEventListener?f.removeEventListener(m,_,l.capture):f.detachEvent?f.detachEvent(je(m),_):f.addListener&&f.removeListener&&f.removeListener(_),(m=mt(f))?(co(m,l),m.h==0&&(m.src=null,f[qi]=null)):$i(l)}}}function je(l){return l in Gi?Gi[l]:Gi[l]="on"+l}function Ft(l,f){if(l.da)l=!0;else{f=new Pe(f,this);var m=l.listener,_=l.ha||l.src;l.fa&&Ae(l),l=m.call(_,f)}return l}function mt(l){return l=l[qi],l instanceof Wi?l:null}var Ht="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bn(l){return typeof l=="function"?l:(l[Ht]||(l[Ht]=function(f){return l.handleEvent(f)}),l[Ht])}function Re(){X.call(this),this.i=new Wi(this),this.M=this,this.F=null}E(Re,X),Re.prototype[pt]=!0,Re.prototype.removeEventListener=function(l,f,m,_){ge(this,l,f,m,_)};function Le(l,f){var m,_=l.F;if(_)for(m=[];_;_=_.F)m.push(_);if(l=l.M,_=f.type||f,typeof f=="string")f=new ue(f,l);else if(f instanceof ue)f.target=f.target||l;else{var V=f;f=new ue(_,l),x(f,V)}if(V=!0,m)for(var M=m.length-1;0<=M;M--){var $=f.g=m[M];V=xn($,_,!0,f)&&V}if($=f.g=l,V=xn($,_,!0,f)&&V,V=xn($,_,!1,f)&&V,m)for(M=0;M<m.length;M++)$=f.g=m[M],V=xn($,_,!1,f)&&V}Re.prototype.N=function(){if(Re.aa.N.call(this),this.i){var l=this.i,f;for(f in l.g){for(var m=l.g[f],_=0;_<m.length;_++)$i(m[_]);delete l.g[f],l.h--}}this.F=null},Re.prototype.K=function(l,f,m,_){return this.i.add(String(l),f,!1,m,_)},Re.prototype.L=function(l,f,m,_){return this.i.add(String(l),f,!0,m,_)};function xn(l,f,m,_){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();for(var V=!0,M=0;M<f.length;++M){var $=f[M];if($&&!$.da&&$.capture==m){var ve=$.listener,rt=$.ha||$.src;$.fa&&co(l.i,$),V=ve.call(rt,_)!==!1&&V}}return V&&!_.defaultPrevented}function ri(l,f,m){if(typeof l=="function")m&&(l=p(l,m));else if(l&&typeof l.handleEvent=="function")l=p(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:a.setTimeout(l,f||0)}function gl(l){l.g=ri(()=>{l.g=null,l.i&&(l.i=!1,gl(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class VA extends X{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:gl(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fo(l){X.call(this),this.h=l,this.g={}}E(fo,X);var iy=[];function sy(l){O(l.g,function(f,m){this.g.hasOwnProperty(m)&&Ae(f)},l),l.g={}}fo.prototype.N=function(){fo.aa.N.call(this),sy(this)},fo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wh=a.JSON.stringify,LA=a.JSON.parse,MA=class{stringify(l){return a.JSON.stringify(l,void 0)}parse(l){return a.JSON.parse(l,void 0)}};function Eh(){}Eh.prototype.h=null;function oy(l){return l.h||(l.h=l.i())}function ay(){}var po={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Th(){ue.call(this,"d")}E(Th,ue);function xh(){ue.call(this,"c")}E(xh,ue);var ii={},ly=null;function yl(){return ly=ly||new Re}ii.La="serverreachability";function uy(l){ue.call(this,ii.La,l)}E(uy,ue);function mo(l){const f=yl();Le(f,new uy(f))}ii.STAT_EVENT="statevent";function cy(l,f){ue.call(this,ii.STAT_EVENT,l),this.stat=f}E(cy,ue);function Rt(l){const f=yl();Le(f,new cy(f,l))}ii.Ma="timingevent";function hy(l,f){ue.call(this,ii.Ma,l),this.size=f}E(hy,ue);function go(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){l()},f)}function yo(){this.g=!0}yo.prototype.xa=function(){this.g=!1};function OA(l,f,m,_,V,M){l.info(function(){if(l.g)if(M)for(var $="",ve=M.split("&"),rt=0;rt<ve.length;rt++){var he=ve[rt].split("=");if(1<he.length){var gt=he[0];he=he[1];var yt=gt.split("_");$=2<=yt.length&&yt[1]=="type"?$+(gt+"="+he+"&"):$+(gt+"=redacted&")}}else $=null;else $=M;return"XMLHTTP REQ ("+_+") [attempt "+V+"]: "+f+`
`+m+`
`+$})}function FA(l,f,m,_,V,M,$){l.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+V+"]: "+f+`
`+m+`
`+M+" "+$})}function Ki(l,f,m,_){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+UA(l,m)+(_?" "+_:"")})}function jA(l,f){l.info(function(){return"TIMEOUT: "+f})}yo.prototype.info=function(){};function UA(l,f){if(!l.g)return f;if(!f)return null;try{var m=JSON.parse(f);if(m){for(l=0;l<m.length;l++)if(Array.isArray(m[l])){var _=m[l];if(!(2>_.length)){var V=_[1];if(Array.isArray(V)&&!(1>V.length)){var M=V[0];if(M!="noop"&&M!="stop"&&M!="close")for(var $=1;$<V.length;$++)V[$]=""}}}}return wh(m)}catch{return f}}var vl={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},dy={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Sh;function _l(){}E(_l,Eh),_l.prototype.g=function(){return new XMLHttpRequest},_l.prototype.i=function(){return{}},Sh=new _l;function cr(l,f,m,_){this.j=l,this.i=f,this.l=m,this.R=_||1,this.U=new fo(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new fy}function fy(){this.i=null,this.g="",this.h=!1}var py={},Ih={};function Ah(l,f,m){l.L=1,l.v=xl(zn(f)),l.m=m,l.P=!0,my(l,null)}function my(l,f){l.F=Date.now(),wl(l),l.A=zn(l.v);var m=l.A,_=l.R;Array.isArray(_)||(_=[String(_)]),Ry(m.i,"t",_),l.C=0,m=l.j.J,l.h=new fy,l.g=Gy(l.j,m?f:null,!l.m),0<l.O&&(l.M=new VA(p(l.Y,l,l.g),l.O)),f=l.U,m=l.g,_=l.ca;var V="readystatechange";Array.isArray(V)||(V&&(iy[0]=V.toString()),V=iy);for(var M=0;M<V.length;M++){var $=ho(m,V[M],_||f.handleEvent,!1,f.h||f);if(!$)break;f.g[$.key]=$}f=l.H?y(l.H):{},l.m?(l.u||(l.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,f)):(l.u="GET",l.g.ea(l.A,l.u,null,f)),mo(),OA(l.i,l.u,l.A,l.l,l.R,l.m)}cr.prototype.ca=function(l){l=l.target;const f=this.M;f&&$n(l)==3?f.j():this.Y(l)},cr.prototype.Y=function(l){try{if(l==this.g)e:{const yt=$n(this.g);var f=this.g.Ba();const Xi=this.g.Z();if(!(3>yt)&&(yt!=3||this.g&&(this.h.h||this.g.oa()||My(this.g)))){this.J||yt!=4||f==7||(f==8||0>=Xi?mo(3):mo(2)),Ch(this);var m=this.g.Z();this.X=m;t:if(gy(this)){var _=My(this.g);l="";var V=_.length,M=$n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){si(this),vo(this);var $="";break t}this.h.i=new a.TextDecoder}for(f=0;f<V;f++)this.h.h=!0,l+=this.h.i.decode(_[f],{stream:!(M&&f==V-1)});_.length=0,this.h.g+=l,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=m==200,FA(this.i,this.u,this.A,this.l,this.R,yt,m),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,rt=this.g;if((ve=rt.g?rt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(ve)){var he=ve;break t}}he=null}if(m=he)Ki(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ph(this,m);else{this.o=!1,this.s=3,Rt(12),si(this),vo(this);break e}}if(this.P){m=!0;let hn;for(;!this.J&&this.C<$.length;)if(hn=BA(this,$),hn==Ih){yt==4&&(this.s=4,Rt(14),m=!1),Ki(this.i,this.l,null,"[Incomplete Response]");break}else if(hn==py){this.s=4,Rt(15),Ki(this.i,this.l,$,"[Invalid Chunk]"),m=!1;break}else Ki(this.i,this.l,hn,null),Ph(this,hn);if(gy(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),yt!=4||$.length!=0||this.h.h||(this.s=1,Rt(16),m=!1),this.o=this.o&&m,!m)Ki(this.i,this.l,$,"[Invalid Chunked Response]"),si(this),vo(this);else if(0<$.length&&!this.W){this.W=!0;var gt=this.j;gt.g==this&&gt.ba&&!gt.M&&(gt.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),Vh(gt),gt.M=!0,Rt(11))}}else Ki(this.i,this.l,$,null),Ph(this,$);yt==4&&si(this),this.o&&!this.J&&(yt==4?$y(this.j,this):(this.o=!1,wl(this)))}else iC(this.g),m==400&&0<$.indexOf("Unknown SID")?(this.s=3,Rt(12)):(this.s=0,Rt(13)),si(this),vo(this)}}}catch{}finally{}};function gy(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function BA(l,f){var m=l.C,_=f.indexOf(`
`,m);return _==-1?Ih:(m=Number(f.substring(m,_)),isNaN(m)?py:(_+=1,_+m>f.length?Ih:(f=f.slice(_,_+m),l.C=_+m,f)))}cr.prototype.cancel=function(){this.J=!0,si(this)};function wl(l){l.S=Date.now()+l.I,yy(l,l.I)}function yy(l,f){if(l.B!=null)throw Error("WatchDog timer not null");l.B=go(p(l.ba,l),f)}function Ch(l){l.B&&(a.clearTimeout(l.B),l.B=null)}cr.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(jA(this.i,this.A),this.L!=2&&(mo(),Rt(17)),si(this),this.s=2,vo(this)):yy(this,this.S-l)};function vo(l){l.j.G==0||l.J||$y(l.j,l)}function si(l){Ch(l);var f=l.M;f&&typeof f.ma=="function"&&f.ma(),l.M=null,sy(l.U),l.g&&(f=l.g,l.g=null,f.abort(),f.ma())}function Ph(l,f){try{var m=l.j;if(m.G!=0&&(m.g==l||Rh(m.h,l))){if(!l.K&&Rh(m.h,l)&&m.G==3){try{var _=m.Da.g.parse(f)}catch{_=null}if(Array.isArray(_)&&_.length==3){var V=_;if(V[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<l.F)Rl(m),Cl(m);else break e;Dh(m),Rt(18)}}else m.za=V[1],0<m.za-m.T&&37500>V[2]&&m.F&&m.v==0&&!m.C&&(m.C=go(p(m.Za,m),6e3));if(1>=wy(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else ai(m,11)}else if((l.K||m.g==l)&&Rl(m),!v(f))for(V=m.Da.g.parse(f),f=0;f<V.length;f++){let he=V[f];if(m.T=he[0],he=he[1],m.G==2)if(he[0]=="c"){m.K=he[1],m.ia=he[2];const gt=he[3];gt!=null&&(m.la=gt,m.j.info("VER="+m.la));const yt=he[4];yt!=null&&(m.Aa=yt,m.j.info("SVER="+m.Aa));const Xi=he[5];Xi!=null&&typeof Xi=="number"&&0<Xi&&(_=1.5*Xi,m.L=_,m.j.info("backChannelRequestTimeoutMs_="+_)),_=m;const hn=l.g;if(hn){const bl=hn.g?hn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(bl){var M=_.h;M.g||bl.indexOf("spdy")==-1&&bl.indexOf("quic")==-1&&bl.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(kh(M,M.h),M.h=null))}if(_.D){const Lh=hn.g?hn.g.getResponseHeader("X-HTTP-Session-Id"):null;Lh&&(_.ya=Lh,Ee(_.I,_.D,Lh))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-l.F,m.j.info("Handshake RTT: "+m.R+"ms")),_=m;var $=l;if(_.qa=qy(_,_.J?_.ia:null,_.W),$.K){Ey(_.h,$);var ve=$,rt=_.L;rt&&(ve.I=rt),ve.B&&(Ch(ve),wl(ve)),_.g=$}else By(_);0<m.i.length&&Pl(m)}else he[0]!="stop"&&he[0]!="close"||ai(m,7);else m.G==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?ai(m,7):Nh(m):he[0]!="noop"&&m.l&&m.l.ta(he),m.v=0)}}mo(4)}catch{}}var zA=class{constructor(l,f){this.g=l,this.map=f}};function vy(l){this.l=l||10,a.PerformanceNavigationTiming?(l=a.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function _y(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function wy(l){return l.h?1:l.g?l.g.size:0}function Rh(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function kh(l,f){l.g?l.g.add(f):l.h=f}function Ey(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}vy.prototype.cancel=function(){if(this.i=Ty(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function Ty(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const m of l.g.values())f=f.concat(m.D);return f}return A(l.i)}function $A(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(u(l)){for(var f=[],m=l.length,_=0;_<m;_++)f.push(l[_]);return f}f=[],m=0;for(_ in l)f[m++]=l[_];return f}function WA(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(u(l)||typeof l=="string"){var f=[];l=l.length;for(var m=0;m<l;m++)f.push(m);return f}f=[],m=0;for(const _ in l)f[m++]=_;return f}}}function xy(l,f){if(l.forEach&&typeof l.forEach=="function")l.forEach(f,void 0);else if(u(l)||typeof l=="string")Array.prototype.forEach.call(l,f,void 0);else for(var m=WA(l),_=$A(l),V=_.length,M=0;M<V;M++)f.call(void 0,_[M],m&&m[M],l)}var Sy=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function HA(l,f){if(l){l=l.split("&");for(var m=0;m<l.length;m++){var _=l[m].indexOf("="),V=null;if(0<=_){var M=l[m].substring(0,_);V=l[m].substring(_+1)}else M=l[m];f(M,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function oi(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof oi){this.h=l.h,El(this,l.j),this.o=l.o,this.g=l.g,Tl(this,l.s),this.l=l.l;var f=l.i,m=new Eo;m.i=f.i,f.g&&(m.g=new Map(f.g),m.h=f.h),Iy(this,m),this.m=l.m}else l&&(f=String(l).match(Sy))?(this.h=!1,El(this,f[1]||"",!0),this.o=_o(f[2]||""),this.g=_o(f[3]||"",!0),Tl(this,f[4]),this.l=_o(f[5]||"",!0),Iy(this,f[6]||"",!0),this.m=_o(f[7]||"")):(this.h=!1,this.i=new Eo(null,this.h))}oi.prototype.toString=function(){var l=[],f=this.j;f&&l.push(wo(f,Ay,!0),":");var m=this.g;return(m||f=="file")&&(l.push("//"),(f=this.o)&&l.push(wo(f,Ay,!0),"@"),l.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&l.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&l.push("/"),l.push(wo(m,m.charAt(0)=="/"?KA:GA,!0))),(m=this.i.toString())&&l.push("?",m),(m=this.m)&&l.push("#",wo(m,YA)),l.join("")};function zn(l){return new oi(l)}function El(l,f,m){l.j=m?_o(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function Tl(l,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);l.s=f}else l.s=null}function Iy(l,f,m){f instanceof Eo?(l.i=f,XA(l.i,l.h)):(m||(f=wo(f,QA)),l.i=new Eo(f,l.h))}function Ee(l,f,m){l.i.set(f,m)}function xl(l){return Ee(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function _o(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function wo(l,f,m){return typeof l=="string"?(l=encodeURI(l).replace(f,qA),m&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function qA(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var Ay=/[#\/\?@]/g,GA=/[#\?:]/g,KA=/[#\?]/g,QA=/[#\?@]/g,YA=/#/g;function Eo(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function hr(l){l.g||(l.g=new Map,l.h=0,l.i&&HA(l.i,function(f,m){l.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}t=Eo.prototype,t.add=function(l,f){hr(this),this.i=null,l=Qi(this,l);var m=this.g.get(l);return m||this.g.set(l,m=[]),m.push(f),this.h+=1,this};function Cy(l,f){hr(l),f=Qi(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function Py(l,f){return hr(l),f=Qi(l,f),l.g.has(f)}t.forEach=function(l,f){hr(this),this.g.forEach(function(m,_){m.forEach(function(V){l.call(f,V,_,this)},this)},this)},t.na=function(){hr(this);const l=Array.from(this.g.values()),f=Array.from(this.g.keys()),m=[];for(let _=0;_<f.length;_++){const V=l[_];for(let M=0;M<V.length;M++)m.push(f[_])}return m},t.V=function(l){hr(this);let f=[];if(typeof l=="string")Py(this,l)&&(f=f.concat(this.g.get(Qi(this,l))));else{l=Array.from(this.g.values());for(let m=0;m<l.length;m++)f=f.concat(l[m])}return f},t.set=function(l,f){return hr(this),this.i=null,l=Qi(this,l),Py(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},t.get=function(l,f){return l?(l=this.V(l),0<l.length?String(l[0]):f):f};function Ry(l,f,m){Cy(l,f),0<m.length&&(l.i=null,l.g.set(Qi(l,f),A(m)),l.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(var m=0;m<f.length;m++){var _=f[m];const M=encodeURIComponent(String(_)),$=this.V(_);for(_=0;_<$.length;_++){var V=M;$[_]!==""&&(V+="="+encodeURIComponent(String($[_]))),l.push(V)}}return this.i=l.join("&")};function Qi(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function XA(l,f){f&&!l.j&&(hr(l),l.i=null,l.g.forEach(function(m,_){var V=_.toLowerCase();_!=V&&(Cy(this,_),Ry(this,V,m))},l)),l.j=f}function JA(l,f){const m=new yo;if(a.Image){const _=new Image;_.onload=g(dr,m,"TestLoadImage: loaded",!0,f,_),_.onerror=g(dr,m,"TestLoadImage: error",!1,f,_),_.onabort=g(dr,m,"TestLoadImage: abort",!1,f,_),_.ontimeout=g(dr,m,"TestLoadImage: timeout",!1,f,_),a.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=l}else f(!1)}function ZA(l,f){const m=new yo,_=new AbortController,V=setTimeout(()=>{_.abort(),dr(m,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:_.signal}).then(M=>{clearTimeout(V),M.ok?dr(m,"TestPingServer: ok",!0,f):dr(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(V),dr(m,"TestPingServer: error",!1,f)})}function dr(l,f,m,_,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),_(m)}catch{}}function eC(){this.g=new MA}function tC(l,f,m){const _=m||"";try{xy(l,function(V,M){let $=V;c(V)&&($=wh(V)),f.push(_+M+"="+encodeURIComponent($))})}catch(V){throw f.push(_+"type="+encodeURIComponent("_badmap")),V}}function Sl(l){this.l=l.Ub||null,this.j=l.eb||!1}E(Sl,Eh),Sl.prototype.g=function(){return new Il(this.l,this.j)},Sl.prototype.i=function(l){return function(){return l}}({});function Il(l,f){Re.call(this),this.D=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}E(Il,Re),t=Il.prototype,t.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=f,this.readyState=1,xo(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(f.body=l),(this.D||a).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,To(this)),this.readyState=0},t.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,xo(this)),this.g&&(this.readyState=3,xo(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ky(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function ky(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}t.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?To(this):xo(this),this.readyState==3&&ky(this)}},t.Ra=function(l){this.g&&(this.response=this.responseText=l,To(this))},t.Qa=function(l){this.g&&(this.response=l,To(this))},t.ga=function(){this.g&&To(this)};function To(l){l.readyState=4,l.l=null,l.j=null,l.v=null,xo(l)}t.setRequestHeader=function(l,f){this.u.append(l,f)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,l.push(m[0]+": "+m[1]),m=f.next();return l.join(`\r
`)};function xo(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Il.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function by(l){let f="";return O(l,function(m,_){f+=_,f+=":",f+=m,f+=`\r
`}),f}function bh(l,f,m){e:{for(_ in m){var _=!1;break e}_=!0}_||(m=by(m),typeof l=="string"?m!=null&&encodeURIComponent(String(m)):Ee(l,f,m))}function Me(l){Re.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}E(Me,Re);var nC=/^https?$/i,rC=["POST","PUT"];t=Me.prototype,t.Ha=function(l){this.J=l},t.ea=function(l,f,m,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Sh.g(),this.v=this.o?oy(this.o):oy(Sh),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(M){Ny(this,M);return}if(l=m||"",m=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var V in _)m.set(V,_[V]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const M of _.keys())m.set(M,_.get(M));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(m.keys()).find(M=>M.toLowerCase()=="content-type"),V=a.FormData&&l instanceof a.FormData,!(0<=Array.prototype.indexOf.call(rC,f,void 0))||_||V||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,$]of m)this.g.setRequestHeader(M,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ly(this),this.u=!0,this.g.send(l),this.u=!1}catch(M){Ny(this,M)}};function Ny(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.m=5,Dy(l),Al(l)}function Dy(l){l.A||(l.A=!0,Le(l,"complete"),Le(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,Le(this,"complete"),Le(this,"abort"),Al(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Al(this,!0)),Me.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Vy(this):this.bb())},t.bb=function(){Vy(this)};function Vy(l){if(l.h&&typeof o<"u"&&(!l.v[1]||$n(l)!=4||l.Z()!=2)){if(l.u&&$n(l)==4)ri(l.Ea,0,l);else if(Le(l,"readystatechange"),$n(l)==4){l.h=!1;try{const $=l.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var _;if(_=$===0){var V=String(l.D).match(Sy)[1]||null;!V&&a.self&&a.self.location&&(V=a.self.location.protocol.slice(0,-1)),_=!nC.test(V?V.toLowerCase():"")}m=_}if(m)Le(l,"complete"),Le(l,"success");else{l.m=6;try{var M=2<$n(l)?l.g.statusText:""}catch{M=""}l.l=M+" ["+l.Z()+"]",Dy(l)}}finally{Al(l)}}}}function Al(l,f){if(l.g){Ly(l);const m=l.g,_=l.v[0]?()=>{}:null;l.g=null,l.v=null,f||Le(l,"ready");try{m.onreadystatechange=_}catch{}}}function Ly(l){l.I&&(a.clearTimeout(l.I),l.I=null)}t.isActive=function(){return!!this.g};function $n(l){return l.g?l.g.readyState:0}t.Z=function(){try{return 2<$n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),LA(f)}};function My(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function iC(l){const f={};l=(l.g&&2<=$n(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<l.length;_++){if(v(l[_]))continue;var m=k(l[_]);const V=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const M=f[V]||[];f[V]=M,M.push(m)}S(f,function(_){return _.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function So(l,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[l]||f}function Oy(l){this.Aa=0,this.i=[],this.j=new yo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=So("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=So("baseRetryDelayMs",5e3,l),this.cb=So("retryDelaySeedMs",1e4,l),this.Wa=So("forwardChannelMaxRetries",2,l),this.wa=So("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new vy(l&&l.concurrentRequestLimit),this.Da=new eC,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Oy.prototype,t.la=8,t.G=1,t.connect=function(l,f,m,_){Rt(0),this.W=l,this.H=f||{},m&&_!==void 0&&(this.H.OSID=m,this.H.OAID=_),this.F=this.X,this.I=qy(this,null,this.W),Pl(this)};function Nh(l){if(Fy(l),l.G==3){var f=l.U++,m=zn(l.I);if(Ee(m,"SID",l.K),Ee(m,"RID",f),Ee(m,"TYPE","terminate"),Io(l,m),f=new cr(l,l.j,f),f.L=2,f.v=xl(zn(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(f.v.toString(),"")}catch{}!m&&a.Image&&(new Image().src=f.v,m=!0),m||(f.g=Gy(f.j,null),f.g.ea(f.v)),f.F=Date.now(),wl(f)}Hy(l)}function Cl(l){l.g&&(Vh(l),l.g.cancel(),l.g=null)}function Fy(l){Cl(l),l.u&&(a.clearTimeout(l.u),l.u=null),Rl(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&a.clearTimeout(l.s),l.s=null)}function Pl(l){if(!_y(l.h)&&!l.s){l.s=!0;var f=l.Ga;ft||W(),U||(ft(),U=!0),G.add(f,l),l.B=0}}function sC(l,f){return wy(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=f.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=go(p(l.Ga,l,f),Wy(l,l.B)),l.B++,!0)}t.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const V=new cr(this,this.j,l);let M=this.o;if(this.S&&(M?(M=y(M),x(M,this.S)):M=this.S),this.m!==null||this.O||(V.H=M,M=null),this.P)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var _=this.i[m];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(f+=_,4096<f){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=Uy(this,V,f),m=zn(this.I),Ee(m,"RID",l),Ee(m,"CVER",22),this.D&&Ee(m,"X-HTTP-Session-Id",this.D),Io(this,m),M&&(this.O?f="headers="+encodeURIComponent(String(by(M)))+"&"+f:this.m&&bh(m,this.m,M)),kh(this.h,V),this.Ua&&Ee(m,"TYPE","init"),this.P?(Ee(m,"$req",f),Ee(m,"SID","null"),V.T=!0,Ah(V,m,null)):Ah(V,m,f),this.G=2}}else this.G==3&&(l?jy(this,l):this.i.length==0||_y(this.h)||jy(this))};function jy(l,f){var m;f?m=f.l:m=l.U++;const _=zn(l.I);Ee(_,"SID",l.K),Ee(_,"RID",m),Ee(_,"AID",l.T),Io(l,_),l.m&&l.o&&bh(_,l.m,l.o),m=new cr(l,l.j,m,l.B+1),l.m===null&&(m.H=l.o),f&&(l.i=f.D.concat(l.i)),f=Uy(l,m,1e3),m.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),kh(l.h,m),Ah(m,_,f)}function Io(l,f){l.H&&O(l.H,function(m,_){Ee(f,_,m)}),l.l&&xy({},function(m,_){Ee(f,_,m)})}function Uy(l,f,m){m=Math.min(l.i.length,m);var _=l.l?p(l.l.Na,l.l,l):null;e:{var V=l.i;let M=-1;for(;;){const $=["count="+m];M==-1?0<m?(M=V[0].g,$.push("ofs="+M)):M=0:$.push("ofs="+M);let ve=!0;for(let rt=0;rt<m;rt++){let he=V[rt].g;const gt=V[rt].map;if(he-=M,0>he)M=Math.max(0,V[rt].g-100),ve=!1;else try{tC(gt,$,"req"+he+"_")}catch{_&&_(gt)}}if(ve){_=$.join("&");break e}}}return l=l.i.splice(0,m),f.D=l,_}function By(l){if(!l.g&&!l.u){l.Y=1;var f=l.Fa;ft||W(),U||(ft(),U=!0),G.add(f,l),l.v=0}}function Dh(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=go(p(l.Fa,l),Wy(l,l.v)),l.v++,!0)}t.Fa=function(){if(this.u=null,zy(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=go(p(this.ab,this),l)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Rt(10),Cl(this),zy(this))};function Vh(l){l.A!=null&&(a.clearTimeout(l.A),l.A=null)}function zy(l){l.g=new cr(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var f=zn(l.qa);Ee(f,"RID","rpc"),Ee(f,"SID",l.K),Ee(f,"AID",l.T),Ee(f,"CI",l.F?"0":"1"),!l.F&&l.ja&&Ee(f,"TO",l.ja),Ee(f,"TYPE","xmlhttp"),Io(l,f),l.m&&l.o&&bh(f,l.m,l.o),l.L&&(l.g.I=l.L);var m=l.g;l=l.ia,m.L=1,m.v=xl(zn(f)),m.m=null,m.P=!0,my(m,l)}t.Za=function(){this.C!=null&&(this.C=null,Cl(this),Dh(this),Rt(19))};function Rl(l){l.C!=null&&(a.clearTimeout(l.C),l.C=null)}function $y(l,f){var m=null;if(l.g==f){Rl(l),Vh(l),l.g=null;var _=2}else if(Rh(l.h,f))m=f.D,Ey(l.h,f),_=1;else return;if(l.G!=0){if(f.o)if(_==1){m=f.m?f.m.length:0,f=Date.now()-f.F;var V=l.B;_=yl(),Le(_,new hy(_,m)),Pl(l)}else By(l);else if(V=f.s,V==3||V==0&&0<f.X||!(_==1&&sC(l,f)||_==2&&Dh(l)))switch(m&&0<m.length&&(f=l.h,f.i=f.i.concat(m)),V){case 1:ai(l,5);break;case 4:ai(l,10);break;case 3:ai(l,6);break;default:ai(l,2)}}}function Wy(l,f){let m=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(m*=2),m*f}function ai(l,f){if(l.j.info("Error code "+f),f==2){var m=p(l.fb,l),_=l.Xa;const V=!_;_=new oi(_||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||El(_,"https"),xl(_),V?JA(_.toString(),m):ZA(_.toString(),m)}else Rt(2);l.G=0,l.l&&l.l.sa(f),Hy(l),Fy(l)}t.fb=function(l){l?(this.j.info("Successfully pinged google.com"),Rt(2)):(this.j.info("Failed to ping google.com"),Rt(1))};function Hy(l){if(l.G=0,l.ka=[],l.l){const f=Ty(l.h);(f.length!=0||l.i.length!=0)&&(C(l.ka,f),C(l.ka,l.i),l.h.i.length=0,A(l.i),l.i.length=0),l.l.ra()}}function qy(l,f,m){var _=m instanceof oi?zn(m):new oi(m);if(_.g!="")f&&(_.g=f+"."+_.g),Tl(_,_.s);else{var V=a.location;_=V.protocol,f=f?f+"."+V.hostname:V.hostname,V=+V.port;var M=new oi(null);_&&El(M,_),f&&(M.g=f),V&&Tl(M,V),m&&(M.l=m),_=M}return m=l.D,f=l.ya,m&&f&&Ee(_,m,f),Ee(_,"VER",l.la),Io(l,_),_}function Gy(l,f,m){if(f&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Ca&&!l.pa?new Me(new Sl({eb:m})):new Me(l.pa),f.Ha(l.J),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ky(){}t=Ky.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function kl(){}kl.prototype.g=function(l,f){return new qt(l,f)};function qt(l,f){Re.call(this),this.g=new Oy(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(l?l["X-WebChannel-Client-Profile"]=f.va:l={"X-WebChannel-Client-Profile":f.va}),this.g.S=l,(l=f&&f.Sb)&&!v(l)&&(this.g.m=l),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!v(f)&&(this.g.D=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new Yi(this)}E(qt,Re),qt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},qt.prototype.close=function(){Nh(this.g)},qt.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var m={};m.__data__=l,l=m}else this.u&&(m={},m.__data__=wh(l),l=m);f.i.push(new zA(f.Ya++,l)),f.G==3&&Pl(f)},qt.prototype.N=function(){this.g.l=null,delete this.j,Nh(this.g),delete this.g,qt.aa.N.call(this)};function Qy(l){Th.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const m in f){l=m;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}E(Qy,Th);function Yy(){xh.call(this),this.status=1}E(Yy,xh);function Yi(l){this.g=l}E(Yi,Ky),Yi.prototype.ua=function(){Le(this.g,"a")},Yi.prototype.ta=function(l){Le(this.g,new Qy(l))},Yi.prototype.sa=function(l){Le(this.g,new Yy)},Yi.prototype.ra=function(){Le(this.g,"b")},kl.prototype.createWebChannel=kl.prototype.g,qt.prototype.send=qt.prototype.o,qt.prototype.open=qt.prototype.m,qt.prototype.close=qt.prototype.close,yx=function(){return new kl},gx=function(){return yl()},mx=ii,Hf={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},vl.NO_ERROR=0,vl.TIMEOUT=8,vl.HTTP_ERROR=6,Tu=vl,dy.COMPLETE="complete",px=dy,ay.EventType=po,po.OPEN="a",po.CLOSE="b",po.ERROR="c",po.MESSAGE="d",Re.prototype.listen=Re.prototype.K,Uo=ay,Me.prototype.listenOnce=Me.prototype.L,Me.prototype.getLastError=Me.prototype.Ka,Me.prototype.getLastErrorCode=Me.prototype.Ba,Me.prototype.getStatus=Me.prototype.Z,Me.prototype.getResponseJson=Me.prototype.Oa,Me.prototype.getResponseText=Me.prototype.oa,Me.prototype.send=Me.prototype.ea,Me.prototype.setWithCredentials=Me.prototype.Ha,fx=Me}).apply(typeof Yl<"u"?Yl:typeof self<"u"?self:typeof window<"u"?window:{});const $0="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Et=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Et.UNAUTHENTICATED=new Et(null),Et.GOOGLE_CREDENTIALS=new Et("google-credentials-uid"),Et.FIRST_PARTY=new Et("first-party-uid"),Et.MOCK_USER=new Et("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ro="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi=new Nm("@firebase/firestore");function Vo(){return Vi.logLevel}function Q(t,...e){if(Vi.logLevel<=ae.DEBUG){const n=e.map(qm);Vi.debug(`Firestore (${ro}): ${t}`,...n)}}function or(t,...e){if(Vi.logLevel<=ae.ERROR){const n=e.map(qm);Vi.error(`Firestore (${ro}): ${t}`,...n)}}function Us(t,...e){if(Vi.logLevel<=ae.WARN){const n=e.map(qm);Vi.warn(`Firestore (${ro}): ${t}`,...n)}}function qm(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(t="Unexpected state"){const e=`FIRESTORE (${ro}) INTERNAL ASSERTION FAILED: `+t;throw or(e),new Error(e)}function pe(t,e){t||ee()}function ne(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends ur{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vx{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class cD{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Et.UNAUTHENTICATED))}shutdown(){}}class hD{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class dD{constructor(e){this.t=e,this.currentUser=Et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){pe(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new zr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new zr,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},a=u=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>a(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?a(u):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new zr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(pe(typeof r.accessToken=="string"),new vx(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return pe(e===null||typeof e=="string"),new Et(e)}}class fD{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Et.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class pD{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new fD(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Et.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class mD{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gD{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){pe(this.o===void 0);const r=s=>{s.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,Q("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(pe(typeof n.token=="string"),this.R=n.token,new mD(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yD(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _x{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=yD(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function de(t,e){return t<e?-1:t>e?1:0}function Bs(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new H(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Xe.fromMillis(Date.now())}static fromDate(e){return Xe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Xe(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?de(this.nanoseconds,e.nanoseconds):de(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.timestamp=e}static fromTimestamp(e){return new te(e)}static min(){return new te(new Xe(0,0))}static max(){return new te(new Xe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,n,r){n===void 0?n=0:n>e.length&&ee(),r===void 0?r=e.length-n:r>e.length-n&&ee(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Da.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Da?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class xe extends Da{construct(e,n,r){return new xe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new H(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new xe(n)}static emptyPath(){return new xe([])}}const vD=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends Da{construct(e,n,r){return new at(e,n,r)}static isValidIdentifier(e){return vD.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new at(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new H(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new H(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new H(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new H(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new at(n)}static emptyPath(){return new at([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(xe.fromString(e))}static fromName(e){return new Y(xe.fromString(e).popFirst(5))}static empty(){return new Y(xe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&xe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return xe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new xe(e.slice()))}}function _D(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=te.fromTimestamp(r===1e9?new Xe(n+1,0):new Xe(n,r));return new qr(i,Y.empty(),e)}function wD(t){return new qr(t.readTime,t.key,-1)}class qr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new qr(te.min(),Y.empty(),-1)}static max(){return new qr(te.max(),Y.empty(),-1)}}function ED(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Y.comparator(t.documentKey,e.documentKey),n!==0?n:de(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TD="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class xD{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function il(t){if(t.code!==F.FAILED_PRECONDITION||t.message!==TD)throw t;Q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new j((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof j?n:j.resolve(n)}catch(n){return j.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):j.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):j.reject(n)}static resolve(e){return new j((n,r)=>{n(e)})}static reject(e){return new j((n,r)=>{r(e)})}static waitFor(e){return new j((n,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=j.resolve(!1);for(const r of e)n=n.next(i=>i?j.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new j((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(h=>{o[c]=h,++a,a===s&&r(o)},h=>i(h))}})}static doWhile(e,n){return new j((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function SD(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function sl(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Gm.oe=-1;function Yc(t){return t==null}function dc(t){return t===0&&1/t==-1/0}function ID(t){return typeof t=="number"&&Number.isInteger(t)&&!dc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W0(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Ui(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function wx(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,n){this.comparator=e,this.root=n||ot.EMPTY}insert(e,n){return new De(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ot.BLACK,null,null))}remove(e){return new De(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ot.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xl(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xl(this.root,e,this.comparator,!0)}}class Xl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ot{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??ot.RED,this.left=i??ot.EMPTY,this.right=s??ot.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new ot(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ot.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return ot.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ot.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ot.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}ot.EMPTY=null,ot.RED=!0,ot.BLACK=!1;ot.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,n,r,i,s){return this}insert(e,n,r){return new ot(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.comparator=e,this.data=new De(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new H0(this.data.getIterator())}getIteratorFrom(e){return new H0(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ct)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ct(this.comparator);return n.data=e,n}}class H0{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this.fields=e,e.sort(at.comparator)}static empty(){return new Yt([])}unionWith(e){let n=new ct(at.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Yt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Bs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ex extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ex("Invalid base64 string: "+s):s}}(e);return new dt(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new dt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return de(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const AD=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Gr(t){if(pe(!!t),typeof t=="string"){let e=0;const n=AD.exec(t);if(pe(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ue(t.seconds),nanos:Ue(t.nanos)}}function Ue(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Li(t){return typeof t=="string"?dt.fromBase64String(t):dt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Qm(t){const e=t.mapValue.fields.__previous_value__;return Km(e)?Qm(e):e}function Va(t){const e=Gr(t.mapValue.fields.__local_write_time__.timestampValue);return new Xe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CD{constructor(e,n,r,i,s,o,a,u,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=u,this.useFetchStreams=c}}class La{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new La("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof La&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl={mapValue:{}};function Mi(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Km(t)?4:RD(t)?9007199254740991:PD(t)?10:11:ee()}function jn(t,e){if(t===e)return!0;const n=Mi(t);if(n!==Mi(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Va(t).isEqual(Va(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Gr(i.timestampValue),a=Gr(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Li(i.bytesValue).isEqual(Li(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Ue(i.geoPointValue.latitude)===Ue(s.geoPointValue.latitude)&&Ue(i.geoPointValue.longitude)===Ue(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Ue(i.integerValue)===Ue(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Ue(i.doubleValue),a=Ue(s.doubleValue);return o===a?dc(o)===dc(a):isNaN(o)&&isNaN(a)}return!1}(t,e);case 9:return Bs(t.arrayValue.values||[],e.arrayValue.values||[],jn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(W0(o)!==W0(a))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(a[u]===void 0||!jn(o[u],a[u])))return!1;return!0}(t,e);default:return ee()}}function Ma(t,e){return(t.values||[]).find(n=>jn(n,e))!==void 0}function zs(t,e){if(t===e)return 0;const n=Mi(t),r=Mi(e);if(n!==r)return de(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return de(t.booleanValue,e.booleanValue);case 2:return function(s,o){const a=Ue(s.integerValue||s.doubleValue),u=Ue(o.integerValue||o.doubleValue);return a<u?-1:a>u?1:a===u?0:isNaN(a)?isNaN(u)?0:-1:1}(t,e);case 3:return q0(t.timestampValue,e.timestampValue);case 4:return q0(Va(t),Va(e));case 5:return de(t.stringValue,e.stringValue);case 6:return function(s,o){const a=Li(s),u=Li(o);return a.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const a=s.split("/"),u=o.split("/");for(let c=0;c<a.length&&c<u.length;c++){const h=de(a[c],u[c]);if(h!==0)return h}return de(a.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const a=de(Ue(s.latitude),Ue(o.latitude));return a!==0?a:de(Ue(s.longitude),Ue(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return G0(t.arrayValue,e.arrayValue);case 10:return function(s,o){var a,u,c,h;const d=s.fields||{},p=o.fields||{},g=(a=d.value)===null||a===void 0?void 0:a.arrayValue,E=(u=p.value)===null||u===void 0?void 0:u.arrayValue,A=de(((c=g==null?void 0:g.values)===null||c===void 0?void 0:c.length)||0,((h=E==null?void 0:E.values)===null||h===void 0?void 0:h.length)||0);return A!==0?A:G0(g,E)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===Jl.mapValue&&o===Jl.mapValue)return 0;if(s===Jl.mapValue)return 1;if(o===Jl.mapValue)return-1;const a=s.fields||{},u=Object.keys(a),c=o.fields||{},h=Object.keys(c);u.sort(),h.sort();for(let d=0;d<u.length&&d<h.length;++d){const p=de(u[d],h[d]);if(p!==0)return p;const g=zs(a[u[d]],c[h[d]]);if(g!==0)return g}return de(u.length,h.length)}(t.mapValue,e.mapValue);default:throw ee()}}function q0(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return de(t,e);const n=Gr(t),r=Gr(e),i=de(n.seconds,r.seconds);return i!==0?i:de(n.nanos,r.nanos)}function G0(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=zs(n[i],r[i]);if(s)return s}return de(n.length,r.length)}function $s(t){return qf(t)}function qf(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Gr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Li(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Y.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=qf(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${qf(n.fields[o])}`;return i+"}"}(t.mapValue):ee()}function K0(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Gf(t){return!!t&&"integerValue"in t}function Ym(t){return!!t&&"arrayValue"in t}function Q0(t){return!!t&&"nullValue"in t}function Y0(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function xu(t){return!!t&&"mapValue"in t}function PD(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function na(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Ui(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=na(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=na(t.arrayValue.values[n]);return e}return Object.assign({},t)}function RD(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this.value=e}static empty(){return new Ut({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!xu(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=na(n)}setAll(e){let n=at.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=a.popLast()}o?r[a.lastSegment()]=na(o):i.push(a.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());xu(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return jn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];xu(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Ui(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Ut(na(this.value))}}function Tx(t){const e=[];return Ui(t.fields,(n,r)=>{const i=new at([n]);if(xu(r)){const s=Tx(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Yt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,n,r,i,s,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new St(e,0,te.min(),te.min(),te.min(),Ut.empty(),0)}static newFoundDocument(e,n,r,i){return new St(e,1,n,te.min(),r,i,0)}static newNoDocument(e,n){return new St(e,2,n,te.min(),te.min(),Ut.empty(),0)}static newUnknownDocument(e,n){return new St(e,3,n,te.min(),te.min(),Ut.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ut.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof St&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new St(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,n){this.position=e,this.inclusive=n}}function X0(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=Y.comparator(Y.fromName(o.referenceValue),n.key):r=zs(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function J0(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!jn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,n="asc"){this.field=e,this.dir=n}}function kD(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xx{}class qe extends xx{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new ND(e,n,r):n==="array-contains"?new LD(e,r):n==="in"?new MD(e,r):n==="not-in"?new OD(e,r):n==="array-contains-any"?new FD(e,r):new qe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new DD(e,r):new VD(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(zs(n,this.value)):n!==null&&Mi(this.value)===Mi(n)&&this.matchesComparison(zs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Tn extends xx{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new Tn(e,n)}matches(e){return Sx(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Sx(t){return t.op==="and"}function Ix(t){return bD(t)&&Sx(t)}function bD(t){for(const e of t.filters)if(e instanceof Tn)return!1;return!0}function Kf(t){if(t instanceof qe)return t.field.canonicalString()+t.op.toString()+$s(t.value);if(Ix(t))return t.filters.map(e=>Kf(e)).join(",");{const e=t.filters.map(n=>Kf(n)).join(",");return`${t.op}(${e})`}}function Ax(t,e){return t instanceof qe?function(r,i){return i instanceof qe&&r.op===i.op&&r.field.isEqual(i.field)&&jn(r.value,i.value)}(t,e):t instanceof Tn?function(r,i){return i instanceof Tn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&Ax(o,i.filters[a]),!0):!1}(t,e):void ee()}function Cx(t){return t instanceof qe?function(n){return`${n.field.canonicalString()} ${n.op} ${$s(n.value)}`}(t):t instanceof Tn?function(n){return n.op.toString()+" {"+n.getFilters().map(Cx).join(" ,")+"}"}(t):"Filter"}class ND extends qe{constructor(e,n,r){super(e,n,r),this.key=Y.fromName(r.referenceValue)}matches(e){const n=Y.comparator(e.key,this.key);return this.matchesComparison(n)}}class DD extends qe{constructor(e,n){super(e,"in",n),this.keys=Px("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class VD extends qe{constructor(e,n){super(e,"not-in",n),this.keys=Px("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Px(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Y.fromName(r.referenceValue))}class LD extends qe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ym(n)&&Ma(n.arrayValue,this.value)}}class MD extends qe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ma(this.value.arrayValue,n)}}class OD extends qe{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ma(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ma(this.value.arrayValue,n)}}class FD extends qe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ym(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ma(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jD{constructor(e,n=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function Z0(t,e=null,n=[],r=[],i=null,s=null,o=null){return new jD(t,e,n,r,i,s,o)}function Xm(t){const e=ne(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Kf(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Yc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>$s(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>$s(r)).join(",")),e.ue=n}return e.ue}function Jm(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!kD(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Ax(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!J0(t.startAt,e.startAt)&&J0(t.endAt,e.endAt)}function Qf(t){return Y.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e,n=null,r=[],i=[],s=null,o="F",a=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function UD(t,e,n,r,i,s,o,a){return new io(t,e,n,r,i,s,o,a)}function Xc(t){return new io(t)}function e_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Rx(t){return t.collectionGroup!==null}function ra(t){const e=ne(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new ct(at.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(a=a.add(c.field))})}),a})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Oa(s,r))}),n.has(at.keyField().canonicalString())||e.ce.push(new Oa(at.keyField(),r))}return e.ce}function Vn(t){const e=ne(t);return e.le||(e.le=BD(e,ra(t))),e.le}function BD(t,e){if(t.limitType==="F")return Z0(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Oa(i.field,s)});const n=t.endAt?new fc(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new fc(t.startAt.position,t.startAt.inclusive):null;return Z0(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Yf(t,e){const n=t.filters.concat([e]);return new io(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function pc(t,e,n){return new io(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Jc(t,e){return Jm(Vn(t),Vn(e))&&t.limitType===e.limitType}function kx(t){return`${Xm(Vn(t))}|lt:${t.limitType}`}function es(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>Cx(i)).join(", ")}]`),Yc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>$s(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>$s(i)).join(",")),`Target(${r})`}(Vn(t))}; limitType=${t.limitType})`}function Zc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Y.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of ra(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,a,u){const c=X0(o,a,u);return o.inclusive?c<=0:c<0}(r.startAt,ra(r),i)||r.endAt&&!function(o,a,u){const c=X0(o,a,u);return o.inclusive?c>=0:c>0}(r.endAt,ra(r),i))}(t,e)}function zD(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function bx(t){return(e,n)=>{let r=!1;for(const i of ra(t)){const s=$D(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function $D(t,e,n){const r=t.field.isKeyField()?Y.comparator(e.key,n.key):function(s,o,a){const u=o.data.field(s),c=a.data.field(s);return u!==null&&c!==null?zs(u,c):ee()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ui(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return wx(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WD=new De(Y.comparator);function ar(){return WD}const Nx=new De(Y.comparator);function Bo(...t){let e=Nx;for(const n of t)e=e.insert(n.key,n);return e}function Dx(t){let e=Nx;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function yi(){return ia()}function Vx(){return ia()}function ia(){return new so(t=>t.toString(),(t,e)=>t.isEqual(e))}const HD=new De(Y.comparator),qD=new ct(Y.comparator);function oe(...t){let e=qD;for(const n of t)e=e.add(n);return e}const GD=new ct(de);function KD(){return GD}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:dc(e)?"-0":e}}function Lx(t){return{integerValue:""+t}}function Mx(t,e){return ID(e)?Lx(e):Zm(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this._=void 0}}function QD(t,e,n){return t instanceof Fa?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Km(s)&&(s=Qm(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof ja?Fx(t,e):t instanceof Ua?jx(t,e):function(i,s){const o=Ox(i,s),a=t_(o)+t_(i.Pe);return Gf(o)&&Gf(i.Pe)?Lx(a):Zm(i.serializer,a)}(t,e)}function YD(t,e,n){return t instanceof ja?Fx(t,e):t instanceof Ua?jx(t,e):n}function Ox(t,e){return t instanceof Ba?function(r){return Gf(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Fa extends eh{}class ja extends eh{constructor(e){super(),this.elements=e}}function Fx(t,e){const n=Ux(e);for(const r of t.elements)n.some(i=>jn(i,r))||n.push(r);return{arrayValue:{values:n}}}class Ua extends eh{constructor(e){super(),this.elements=e}}function jx(t,e){let n=Ux(e);for(const r of t.elements)n=n.filter(i=>!jn(i,r));return{arrayValue:{values:n}}}class Ba extends eh{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function t_(t){return Ue(t.integerValue||t.doubleValue)}function Ux(t){return Ym(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bx{constructor(e,n){this.field=e,this.transform=n}}function XD(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof ja&&i instanceof ja||r instanceof Ua&&i instanceof Ua?Bs(r.elements,i.elements,jn):r instanceof Ba&&i instanceof Ba?jn(r.Pe,i.Pe):r instanceof Fa&&i instanceof Fa}(t.transform,e.transform)}class JD{constructor(e,n){this.version=e,this.transformResults=n}}class Ln{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ln}static exists(e){return new Ln(void 0,e)}static updateTime(e){return new Ln(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Su(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class th{}function zx(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Wx(t.key,Ln.none()):new ol(t.key,t.data,Ln.none());{const n=t.data,r=Ut.empty();let i=new ct(at.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new ei(t.key,r,new Yt(i.toArray()),Ln.none())}}function ZD(t,e,n){t instanceof ol?function(i,s,o){const a=i.value.clone(),u=r_(i.fieldTransforms,s,o.transformResults);a.setAll(u),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(t,e,n):t instanceof ei?function(i,s,o){if(!Su(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=r_(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll($x(i)),u.setAll(a),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function sa(t,e,n,r){return t instanceof ol?function(s,o,a,u){if(!Su(s.precondition,o))return a;const c=s.value.clone(),h=i_(s.fieldTransforms,u,o);return c.setAll(h),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof ei?function(s,o,a,u){if(!Su(s.precondition,o))return a;const c=i_(s.fieldTransforms,u,o),h=o.data;return h.setAll($x(s)),h.setAll(c),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(d=>d.field))}(t,e,n,r):function(s,o,a){return Su(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(t,e,n)}function eV(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=Ox(r.transform,i||null);s!=null&&(n===null&&(n=Ut.empty()),n.set(r.field,s))}return n||null}function n_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Bs(r,i,(s,o)=>XD(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class ol extends th{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ei extends th{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function $x(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function r_(t,e,n){const r=new Map;pe(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,YD(o,a,n[i]))}return r}function i_(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,QD(s,o,e))}return r}class Wx extends th{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class tV extends th{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&ZD(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=sa(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=sa(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Vx();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=n.has(i.key)?null:a;const u=zx(o,a);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(te.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),oe())}isEqual(e){return this.batchId===e.batchId&&Bs(this.mutations,e.mutations,(n,r)=>n_(n,r))&&Bs(this.baseMutations,e.baseMutations,(n,r)=>n_(n,r))}}class eg{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){pe(e.mutations.length===r.length);let i=function(){return HD}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new eg(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rV{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iV{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $e,le;function sV(t){switch(t){default:return ee();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0}}function Hx(t){if(t===void 0)return or("GRPC error has no .code"),F.UNKNOWN;switch(t){case $e.OK:return F.OK;case $e.CANCELLED:return F.CANCELLED;case $e.UNKNOWN:return F.UNKNOWN;case $e.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case $e.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case $e.INTERNAL:return F.INTERNAL;case $e.UNAVAILABLE:return F.UNAVAILABLE;case $e.UNAUTHENTICATED:return F.UNAUTHENTICATED;case $e.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case $e.NOT_FOUND:return F.NOT_FOUND;case $e.ALREADY_EXISTS:return F.ALREADY_EXISTS;case $e.PERMISSION_DENIED:return F.PERMISSION_DENIED;case $e.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case $e.ABORTED:return F.ABORTED;case $e.OUT_OF_RANGE:return F.OUT_OF_RANGE;case $e.UNIMPLEMENTED:return F.UNIMPLEMENTED;case $e.DATA_LOSS:return F.DATA_LOSS;default:return ee()}}(le=$e||($e={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oV(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aV=new Si([4294967295,4294967295],0);function s_(t){const e=oV().encode(t),n=new dx;return n.update(e),new Uint8Array(n.digest())}function o_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Si([n,r],0),new Si([i,s],0)]}class tg{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new zo(`Invalid padding: ${n}`);if(r<0)throw new zo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new zo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new zo(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Si.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(Si.fromNumber(r)));return i.compare(aV)===1&&(i=new Si([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=s_(e),[r,i]=o_(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new tg(s,i,n);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ie===0)return;const n=s_(e),[r,i]=o_(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class zo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,al.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new nh(te.min(),i,new De(de),ar(),oe())}}class al{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new al(r,n,oe(),oe(),oe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class qx{constructor(e,n){this.targetId=e,this.me=n}}class Gx{constructor(e,n,r=dt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class a_{constructor(){this.fe=0,this.ge=u_(),this.pe=dt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=oe(),n=oe(),r=oe();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:ee()}}),new al(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=u_()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,pe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class lV{constructor(e){this.Le=e,this.Be=new Map,this.ke=ar(),this.qe=l_(),this.Qe=new De(de)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:ee()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(Qf(s))if(r===0){const o=new Y(s.path);this.Ue(n,o,St.newNoDocument(o,te.min()))}else pe(r===1);else{const o=this.Ye(n);if(o!==r){const a=this.Ze(e),u=a?this.Xe(a,e,o):1;if(u!==0){this.je(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,c)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,a;try{o=Li(r).toUint8Array()}catch(u){if(u instanceof Ex)return Us("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{a=new tg(o,i,s)}catch(u){return Us(u instanceof zo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return a.Ie===0?null:a}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Qf(a.target)){const u=new Y(a.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,St.newNoDocument(u,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=oe();this.qe.forEach((s,o)=>{let a=!0;o.forEachWhile(u=>{const c=this.Je(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new nh(e,n,this.Qe,this.ke,r);return this.ke=ar(),this.qe=l_(),this.Qe=new De(de),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new a_,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ct(de),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||Q("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new a_),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function l_(){return new De(Y.comparator)}function u_(){return new De(Y.comparator)}const uV={asc:"ASCENDING",desc:"DESCENDING"},cV={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},hV={and:"AND",or:"OR"};class dV{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Xf(t,e){return t.useProto3Json||Yc(e)?e:{value:e}}function mc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Kx(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function fV(t,e){return mc(t,e.toTimestamp())}function Mn(t){return pe(!!t),te.fromTimestamp(function(n){const r=Gr(n);return new Xe(r.seconds,r.nanos)}(t))}function ng(t,e){return Jf(t,e).canonicalString()}function Jf(t,e){const n=function(i){return new xe(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Qx(t){const e=xe.fromString(t);return pe(eS(e)),e}function Zf(t,e){return ng(t.databaseId,e.path)}function gd(t,e){const n=Qx(e);if(n.get(1)!==t.databaseId.projectId)throw new H(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Y(Xx(n))}function Yx(t,e){return ng(t.databaseId,e)}function pV(t){const e=Qx(t);return e.length===4?xe.emptyPath():Xx(e)}function ep(t){return new xe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Xx(t){return pe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function c_(t,e,n){return{name:Zf(t,e),fields:n.value.mapValue.fields}}function mV(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,h){return c.useProto3Json?(pe(h===void 0||typeof h=="string"),dt.fromBase64String(h||"")):(pe(h===void 0||h instanceof Buffer||h instanceof Uint8Array),dt.fromUint8Array(h||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const h=c.code===void 0?F.UNKNOWN:Hx(c.code);return new H(h,c.message||"")}(o);n=new Gx(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=gd(t,r.document.name),s=Mn(r.document.updateTime),o=r.document.createTime?Mn(r.document.createTime):te.min(),a=new Ut({mapValue:{fields:r.document.fields}}),u=St.newFoundDocument(i,s,o,a),c=r.targetIds||[],h=r.removedTargetIds||[];n=new Iu(c,h,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=gd(t,r.document),s=r.readTime?Mn(r.readTime):te.min(),o=St.newNoDocument(i,s),a=r.removedTargetIds||[];n=new Iu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=gd(t,r.document),s=r.removedTargetIds||[];n=new Iu([],s,i,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new iV(i,s),a=r.targetId;n=new qx(a,o)}}return n}function gV(t,e){let n;if(e instanceof ol)n={update:c_(t,e.key,e.value)};else if(e instanceof Wx)n={delete:Zf(t,e.key)};else if(e instanceof ei)n={update:c_(t,e.key,e.data),updateMask:IV(e.fieldMask)};else{if(!(e instanceof tV))return ee();n={verify:Zf(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const a=o.transform;if(a instanceof Fa)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof ja)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Ua)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ba)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw ee()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:fV(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:ee()}(t,e.precondition)),n}function yV(t,e){return t&&t.length>0?(pe(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?Mn(i.updateTime):Mn(s);return o.isEqual(te.min())&&(o=Mn(s)),new JD(o,i.transformResults||[])}(n,e))):[]}function vV(t,e){return{documents:[Yx(t,e.path)]}}function _V(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Yx(t,i);const s=function(c){if(c.length!==0)return Zx(Tn.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(h=>function(p){return{field:ts(p.field),direction:TV(p.dir)}}(h))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Xf(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:n,parent:i}}function wV(t){let e=pV(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){pe(r===1);const h=n.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];n.where&&(s=function(d){const p=Jx(d);return p instanceof Tn&&Ix(p)?p.getFilters():[p]}(n.where));let o=[];n.orderBy&&(o=function(d){return d.map(p=>function(E){return new Oa(ns(E.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(E.direction))}(p))}(n.orderBy));let a=null;n.limit&&(a=function(d){let p;return p=typeof d=="object"?d.value:d,Yc(p)?null:p}(n.limit));let u=null;n.startAt&&(u=function(d){const p=!!d.before,g=d.values||[];return new fc(g,p)}(n.startAt));let c=null;return n.endAt&&(c=function(d){const p=!d.before,g=d.values||[];return new fc(g,p)}(n.endAt)),UD(e,i,o,s,a,"F",u,c)}function EV(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Jx(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ns(n.unaryFilter.field);return qe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ns(n.unaryFilter.field);return qe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ns(n.unaryFilter.field);return qe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ns(n.unaryFilter.field);return qe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(t):t.fieldFilter!==void 0?function(n){return qe.create(ns(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Tn.create(n.compositeFilter.filters.map(r=>Jx(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return ee()}}(n.compositeFilter.op))}(t):ee()}function TV(t){return uV[t]}function xV(t){return cV[t]}function SV(t){return hV[t]}function ts(t){return{fieldPath:t.canonicalString()}}function ns(t){return at.fromServerFormat(t.fieldPath)}function Zx(t){return t instanceof qe?function(n){if(n.op==="=="){if(Y0(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NAN"}};if(Q0(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Y0(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NOT_NAN"}};if(Q0(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ts(n.field),op:xV(n.op),value:n.value}}}(t):t instanceof Tn?function(n){const r=n.getFilters().map(i=>Zx(i));return r.length===1?r[0]:{compositeFilter:{op:SV(n.op),filters:r}}}(t):ee()}function IV(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function eS(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,n,r,i,s=te.min(),o=te.min(),a=dt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=u}withSequenceNumber(e){return new Pr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Pr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Pr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Pr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AV{constructor(e){this.ct=e}}function CV(t){const e=wV({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?pc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PV{constructor(){this.un=new RV}addToCollectionParentIndex(e,n){return this.un.add(n),j.resolve()}getCollectionParents(e,n){return j.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return j.resolve()}deleteFieldIndex(e,n){return j.resolve()}deleteAllFieldIndexes(e){return j.resolve()}createTargetIndexes(e,n){return j.resolve()}getDocumentsMatchingTarget(e,n){return j.resolve(null)}getIndexType(e,n){return j.resolve(0)}getFieldIndexes(e,n){return j.resolve([])}getNextCollectionGroupToUpdate(e){return j.resolve(null)}getMinOffset(e,n){return j.resolve(qr.min())}getMinOffsetFromCollectionGroup(e,n){return j.resolve(qr.min())}updateCollectionGroup(e,n,r){return j.resolve()}updateIndexEntries(e,n){return j.resolve()}}class RV{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new ct(xe.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ct(xe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ws(0)}static kn(){return new Ws(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kV{constructor(){this.changes=new so(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,St.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?j.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bV{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NV{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&sa(r.mutation,i,Yt.empty(),Xe.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,oe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=oe()){const i=yi();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=Bo();return s.forEach((a,u)=>{o=o.insert(a,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=yi();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,oe()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,i){let s=ar();const o=ia(),a=function(){return ia()}();return n.forEach((u,c)=>{const h=r.get(c.key);i.has(c.key)&&(h===void 0||h.mutation instanceof ei)?s=s.insert(c.key,c):h!==void 0?(o.set(c.key,h.mutation.getFieldMask()),sa(h.mutation,c,h.mutation.getFieldMask(),Xe.now())):o.set(c.key,Yt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,h)=>o.set(c,h)),n.forEach((c,h)=>{var d;return a.set(c,new bV(h,(d=o.get(c))!==null&&d!==void 0?d:null))}),a))}recalculateAndSaveOverlays(e,n){const r=ia();let i=new De((o,a)=>o-a),s=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let h=r.get(u)||Yt.empty();h=a.applyToLocalView(c,h),r.set(u,h);const d=(i.get(a.batchId)||oe()).add(u);i=i.insert(a.batchId,d)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const u=a.getNext(),c=u.key,h=u.value,d=Vx();h.forEach(p=>{if(!s.has(p)){const g=zx(n.get(p),r.get(p));g!==null&&d.set(p,g),s=s.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,d))}return j.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return Y.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Rx(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):j.resolve(yi());let a=-1,u=s;return o.next(c=>j.forEach(c,(h,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),s.get(h)?j.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{u=u.insert(h,p)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,oe())).next(h=>({batchId:a,changes:Dx(h)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Y(n)).next(r=>{let i=Bo();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=Bo();return this.indexManager.getCollectionParents(e,s).next(a=>j.forEach(a,u=>{const c=function(d,p){return new io(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(h=>{h.forEach((d,p)=>{o=o.insert(d,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,c)=>{const h=c.getKey();o.get(h)===null&&(o=o.insert(h,St.newInvalidDocument(h)))});let a=Bo();return o.forEach((u,c)=>{const h=s.get(u);h!==void 0&&sa(h.mutation,c,Yt.empty(),Xe.now()),Zc(n,c)&&(a=a.insert(u,c))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DV{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return j.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:Mn(i.createTime)}}(n)),j.resolve()}getNamedQuery(e,n){return j.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:CV(i.bundledQuery),readTime:Mn(i.readTime)}}(n)),j.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VV{constructor(){this.overlays=new De(Y.comparator),this.Ir=new Map}getOverlay(e,n){return j.resolve(this.overlays.get(n))}getOverlays(e,n){const r=yi();return j.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),j.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),j.resolve()}getOverlaysForCollection(e,n,r){const i=yi(),s=n.length+1,o=new Y(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const u=a.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return j.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new De((c,h)=>c-h);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let h=s.get(c.largestBatchId);h===null&&(h=yi(),s=s.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const a=yi(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,h)=>a.set(c,h)),!(a.size()>=i)););return j.resolve(a)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new rV(n,r));let s=this.Ir.get(n);s===void 0&&(s=oe(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LV{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(e){return j.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,j.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(){this.Tr=new ct(et.Er),this.dr=new ct(et.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new et(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new et(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new Y(new xe([])),r=new et(n,e),i=new et(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new Y(new xe([])),r=new et(n,e),i=new et(n,e+1);let s=oe();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new et(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class et{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return Y.comparator(e.key,n.key)||de(e.wr,n.wr)}static Ar(e,n){return de(e.wr,n.wr)||Y.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MV{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ct(et.Er)}checkEmpty(e){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new nV(s,n,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new et(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return j.resolve(o)}lookupMutationBatch(e,n){return j.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return j.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new et(n,0),i=new et(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const a=this.Dr(o.wr);s.push(a)}),j.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ct(de);return n.forEach(i=>{const s=new et(i,0),o=new et(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],a=>{r=r.add(a.wr)})}),j.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;Y.isDocumentKey(s)||(s=s.child(""));const o=new et(new Y(s),0);let a=new ct(de);return this.br.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(a=a.add(u.wr)),!0)},o),j.resolve(this.Cr(a))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){pe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return j.forEach(n.mutations,i=>{const s=new et(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new et(n,0),i=this.br.firstAfterOrEqual(r);return j.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,j.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OV{constructor(e){this.Mr=e,this.docs=function(){return new De(Y.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return j.resolve(r?r.document.mutableCopy():St.newInvalidDocument(n))}getEntries(e,n){let r=ar();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():St.newInvalidDocument(i))}),j.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=ar();const o=n.path,a=new Y(o.child("")),u=this.docs.getIteratorFrom(a);for(;u.hasNext();){const{key:c,value:{document:h}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||ED(wD(h),r)<=0||(i.has(h.key)||Zc(n,h))&&(s=s.insert(h.key,h.mutableCopy()))}return j.resolve(s)}getAllFromCollectionGroup(e,n,r,i){ee()}Or(e,n){return j.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new FV(this)}getSize(e){return j.resolve(this.size)}}class FV extends kV{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),j.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jV{constructor(e){this.persistence=e,this.Nr=new so(n=>Xm(n),Jm),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.Lr=0,this.Br=new rg,this.targetCount=0,this.kr=Ws.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),j.resolve()}getLastRemoteSnapshotVersion(e){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return j.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),j.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Ws(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,j.resolve()}updateTargetData(e,n){return this.Kn(n),j.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,j.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),j.waitFor(s).next(()=>i)}getTargetCount(e){return j.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return j.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),j.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),j.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),j.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return j.resolve(r)}containsKey(e,n){return j.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UV{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Gm(0),this.Kr=!1,this.Kr=!0,this.$r=new LV,this.referenceDelegate=e(this),this.Ur=new jV(this),this.indexManager=new PV,this.remoteDocumentCache=function(i){return new OV(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new AV(n),this.Gr=new DV(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new VV,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new MV(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){Q("MemoryPersistence","Starting transaction:",e);const i=new BV(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return j.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class BV extends xD{constructor(e){super(),this.currentSequenceNumber=e}}class ig{constructor(e){this.persistence=e,this.Jr=new rg,this.Yr=null}static Zr(e){return new ig(e)}get Xr(){if(this.Yr)return this.Yr;throw ee()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),j.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),j.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),j.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.Xr,r=>{const i=Y.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,te.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return j.or([()=>j.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=oe(),i=oe();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new sg(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zV{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $V{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Gk()?8:SD(Ct())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new zV;return this.Xi(e,n,o).next(a=>{if(s.result=a,this.zi)return this.es(e,n,o,a.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(Vo()<=ae.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",es(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),j.resolve()):(Vo()<=ae.DEBUG&&Q("QueryEngine","Query:",es(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Vo()<=ae.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",es(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Vn(n))):j.resolve())}Yi(e,n){if(e_(n))return j.resolve(null);let r=Vn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=pc(n,null,"F"),r=Vn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=oe(...s);return this.Ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.ts(n,a);return this.ns(n,c,o,u.readTime)?this.Yi(e,pc(n,null,"F")):this.rs(e,c,n,u)}))})))}Zi(e,n,r,i){return e_(n)||i.isEqual(te.min())?j.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?j.resolve(null):(Vo()<=ae.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),es(n)),this.rs(e,o,n,_D(i,-1)).next(a=>a))})}ts(e,n){let r=new ct(bx(e));return n.forEach((i,s)=>{Zc(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return Vo()<=ae.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",es(n)),this.Ji.getDocumentsMatchingQuery(e,n,qr.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WV{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new De(de),this._s=new so(s=>Xm(s),Jm),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new NV(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function HV(t,e,n,r){return new WV(t,e,n,r)}async function tS(t,e){const n=ne(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let u=oe();for(const c of i){o.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}for(const c of s){a.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}return n.localDocuments.getDocuments(r,u).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:a}))})})}function qV(t,e){const n=ne(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(a,u,c,h){const d=c.batch,p=d.keys();let g=j.resolve();return p.forEach(E=>{g=g.next(()=>h.getEntry(u,E)).next(A=>{const C=c.docVersions.get(E);pe(C!==null),A.version.compareTo(C)<0&&(d.applyToRemoteDocument(A,c),A.isValidDocument()&&(A.setReadTime(c.commitVersion),h.addEntry(A)))})}),g.next(()=>a.mutationQueue.removeMutationBatch(u,d))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let u=oe();for(let c=0;c<a.mutationResults.length;++c)a.mutationResults[c].transformResults.length>0&&(u=u.add(a.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function nS(t){const e=ne(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function GV(t,e){const n=ne(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const a=[];e.targetChanges.forEach((h,d)=>{const p=i.get(d);if(!p)return;a.push(n.Ur.removeMatchingKeys(s,h.removedDocuments,d).next(()=>n.Ur.addMatchingKeys(s,h.addedDocuments,d)));let g=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(d)!==null?g=g.withResumeToken(dt.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,r)),i=i.insert(d,g),function(A,C,w){return A.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-A.snapshotVersion.toMicroseconds()>=3e8?!0:w.addedDocuments.size+w.modifiedDocuments.size+w.removedDocuments.size>0}(p,g,h)&&a.push(n.Ur.updateTargetData(s,g))});let u=ar(),c=oe();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(s,h))}),a.push(KV(s,o,e.documentUpdates).next(h=>{u=h.Ps,c=h.Is})),!r.isEqual(te.min())){const h=n.Ur.getLastRemoteSnapshotVersion(s).next(d=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(h)}return j.waitFor(a).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.os=i,s))}function KV(t,e,n){let r=oe(),i=oe();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=ar();return n.forEach((a,u)=>{const c=s.get(a);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(a)),u.isNoDocument()&&u.version.isEqual(te.min())?(e.removeEntry(a,u.readTime),o=o.insert(a,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(a,u)):Q("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function QV(t,e){const n=ne(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function YV(t,e){const n=ne(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,j.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new Pr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function tp(t,e,n){const r=ne(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!sl(o))throw o;Q("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function h_(t,e,n){const r=ne(t);let i=te.min(),s=oe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,h){const d=ne(u),p=d._s.get(h);return p!==void 0?j.resolve(d.os.get(p)):d.Ur.getTargetData(c,h)}(r,o,Vn(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:te.min(),n?s:oe())).next(a=>(XV(r,zD(e),a),{documents:a,Ts:s})))}function XV(t,e,n){let r=t.us.get(e)||te.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class d_{constructor(){this.activeTargetIds=KD()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class JV{constructor(){this.so=new d_,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new d_,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZV{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){Q("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){Q("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zl=null;function yd(){return Zl===null?Zl=function(){return 268435456+Math.round(2147483648*Math.random())}():Zl++,"0x"+Zl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eL={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tL{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt="WebChannelConnection";class nL extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const a=yd(),u=this.xo(n,r.toUriEncodedString());Q("RestConnection",`Sending RPC '${n}' ${a}:`,u,i);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,s,o),this.No(n,u,c,i).then(h=>(Q("RestConnection",`Received RPC '${n}' ${a}: `,h),h),h=>{throw Us("RestConnection",`RPC '${n}' ${a} failed with error: `,h,"url: ",u,"request:",i),h})}Lo(n,r,i,s,o,a){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ro}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=eL[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=yd();return new Promise((o,a)=>{const u=new fx;u.setWithCredentials(!0),u.listenOnce(px.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Tu.NO_ERROR:const h=u.getResponseJson();Q(wt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case Tu.TIMEOUT:Q(wt,`RPC '${e}' ${s} timed out`),a(new H(F.DEADLINE_EXCEEDED,"Request time out"));break;case Tu.HTTP_ERROR:const d=u.getStatus();if(Q(wt,`RPC '${e}' ${s} failed with status:`,d,"response text:",u.getResponseText()),d>0){let p=u.getResponseJson();Array.isArray(p)&&(p=p[0]);const g=p==null?void 0:p.error;if(g&&g.status&&g.message){const E=function(C){const w=C.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(w)>=0?w:F.UNKNOWN}(g.status);a(new H(E,g.message))}else a(new H(F.UNKNOWN,"Server responded with status "+u.getStatus()))}else a(new H(F.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{Q(wt,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(i);Q(wt,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",c,r,15)})}Bo(e,n,r){const i=yd(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=yx(),a=gx(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const h=s.join("");Q(wt,`Creating RPC '${e}' stream ${i}: ${h}`,u);const d=o.createWebChannel(h,u);let p=!1,g=!1;const E=new tL({Io:C=>{g?Q(wt,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(p||(Q(wt,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),Q(wt,`RPC '${e}' stream ${i} sending:`,C),d.send(C))},To:()=>d.close()}),A=(C,w,v)=>{C.listen(w,T=>{try{v(T)}catch(N){setTimeout(()=>{throw N},0)}})};return A(d,Uo.EventType.OPEN,()=>{g||(Q(wt,`RPC '${e}' stream ${i} transport opened.`),E.yo())}),A(d,Uo.EventType.CLOSE,()=>{g||(g=!0,Q(wt,`RPC '${e}' stream ${i} transport closed`),E.So())}),A(d,Uo.EventType.ERROR,C=>{g||(g=!0,Us(wt,`RPC '${e}' stream ${i} transport errored:`,C),E.So(new H(F.UNAVAILABLE,"The operation could not be completed")))}),A(d,Uo.EventType.MESSAGE,C=>{var w;if(!g){const v=C.data[0];pe(!!v);const T=v,N=T.error||((w=T[0])===null||w===void 0?void 0:w.error);if(N){Q(wt,`RPC '${e}' stream ${i} received error:`,N);const L=N.status;let O=function(I){const x=$e[I];if(x!==void 0)return Hx(x)}(L),S=N.message;O===void 0&&(O=F.INTERNAL,S="Unknown error status: "+L+" with message "+N.message),g=!0,E.So(new H(O,S)),d.close()}else Q(wt,`RPC '${e}' stream ${i} received:`,v),E.bo(v)}}),A(a,mx.STAT_EVENT,C=>{C.stat===Hf.PROXY?Q(wt,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===Hf.NOPROXY&&Q(wt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{E.wo()},0),E}}function vd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(t){return new dV(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&Q("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iS{constructor(e,n,r,i,s,o,a,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new rS(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===F.RESOURCE_EXHAUSTED?(or(n.toString()),or("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new H(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return Q("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(Q("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class rL extends iS{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=mV(this.serializer,e),r=function(s){if(!("targetChange"in s))return te.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?te.min():o.readTime?Mn(o.readTime):te.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=ep(this.serializer),n.addTarget=function(s,o){let a;const u=o.target;if(a=Qf(u)?{documents:vV(s,u)}:{query:_V(s,u)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=Kx(s,o.resumeToken);const c=Xf(s,o.expectedCount);c!==null&&(a.expectedCount=c)}else if(o.snapshotVersion.compareTo(te.min())>0){a.readTime=mc(s,o.snapshotVersion.toTimestamp());const c=Xf(s,o.expectedCount);c!==null&&(a.expectedCount=c)}return a}(this.serializer,e);const r=EV(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=ep(this.serializer),n.removeTarget=e,this.a_(n)}}class iL extends iS{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return pe(!!e.streamToken),this.lastStreamToken=e.streamToken,pe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){pe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=yV(e.writeResults,e.commitTime),r=Mn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=ep(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>gV(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sL extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new H(F.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,Jf(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new H(F.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Lo(e,Jf(n,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new H(F.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class oL{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(or(n),this.D_=!1):Q("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aL{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{Bi(this)&&(Q("RemoteStore","Restarting streams for network reachability change."),await async function(u){const c=ne(u);c.L_.add(4),await ll(c),c.q_.set("Unknown"),c.L_.delete(4),await ih(c)}(this))})}),this.q_=new oL(r,i)}}async function ih(t){if(Bi(t))for(const e of t.B_)await e(!0)}async function ll(t){for(const e of t.B_)await e(!1)}function sS(t,e){const n=ne(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),ug(n)?lg(n):oo(n).r_()&&ag(n,e))}function og(t,e){const n=ne(t),r=oo(n);n.N_.delete(e),r.r_()&&oS(n,e),n.N_.size===0&&(r.r_()?r.o_():Bi(n)&&n.q_.set("Unknown"))}function ag(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}oo(t).A_(e)}function oS(t,e){t.Q_.xe(e),oo(t).R_(e)}function lg(t){t.Q_=new lV({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),oo(t).start(),t.q_.v_()}function ug(t){return Bi(t)&&!oo(t).n_()&&t.N_.size>0}function Bi(t){return ne(t).L_.size===0}function aS(t){t.Q_=void 0}async function lL(t){t.q_.set("Online")}async function uL(t){t.N_.forEach((e,n)=>{ag(t,e)})}async function cL(t,e){aS(t),ug(t)?(t.q_.M_(e),lg(t)):t.q_.set("Unknown")}async function hL(t,e,n){if(t.q_.set("Online"),e instanceof Gx&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))}(t,e)}catch(r){Q("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await gc(t,r)}else if(e instanceof Iu?t.Q_.Ke(e):e instanceof qx?t.Q_.He(e):t.Q_.We(e),!n.isEqual(te.min()))try{const r=await nS(t.localStore);n.compareTo(r)>=0&&await function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const h=s.N_.get(c);h&&s.N_.set(c,h.withResumeToken(u.resumeToken,o))}}),a.targetMismatches.forEach((u,c)=>{const h=s.N_.get(u);if(!h)return;s.N_.set(u,h.withResumeToken(dt.EMPTY_BYTE_STRING,h.snapshotVersion)),oS(s,u);const d=new Pr(h.target,u,c,h.sequenceNumber);ag(s,d)}),s.remoteSyncer.applyRemoteEvent(a)}(t,n)}catch(r){Q("RemoteStore","Failed to raise snapshot:",r),await gc(t,r)}}async function gc(t,e,n){if(!sl(e))throw e;t.L_.add(1),await ll(t),t.q_.set("Offline"),n||(n=()=>nS(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{Q("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await ih(t)})}function lS(t,e){return e().catch(n=>gc(t,n,e))}async function sh(t){const e=ne(t),n=Kr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;dL(e);)try{const i=await QV(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,fL(e,i)}catch(i){await gc(e,i)}uS(e)&&cS(e)}function dL(t){return Bi(t)&&t.O_.length<10}function fL(t,e){t.O_.push(e);const n=Kr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function uS(t){return Bi(t)&&!Kr(t).n_()&&t.O_.length>0}function cS(t){Kr(t).start()}async function pL(t){Kr(t).p_()}async function mL(t){const e=Kr(t);for(const n of t.O_)e.m_(n.mutations)}async function gL(t,e,n){const r=t.O_.shift(),i=eg.from(r,e,n);await lS(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await sh(t)}async function yL(t,e){e&&Kr(t).V_&&await async function(r,i){if(function(o){return sV(o)&&o!==F.ABORTED}(i.code)){const s=r.O_.shift();Kr(r).s_(),await lS(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await sh(r)}}(t,e),uS(t)&&cS(t)}async function p_(t,e){const n=ne(t);n.asyncQueue.verifyOperationInProgress(),Q("RemoteStore","RemoteStore received new credentials");const r=Bi(n);n.L_.add(3),await ll(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await ih(n)}async function vL(t,e){const n=ne(t);e?(n.L_.delete(2),await ih(n)):e||(n.L_.add(2),await ll(n),n.q_.set("Unknown"))}function oo(t){return t.K_||(t.K_=function(n,r,i){const s=ne(n);return s.w_(),new rL(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:lL.bind(null,t),Ro:uL.bind(null,t),mo:cL.bind(null,t),d_:hL.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),ug(t)?lg(t):t.q_.set("Unknown")):(await t.K_.stop(),aS(t))})),t.K_}function Kr(t){return t.U_||(t.U_=function(n,r,i){const s=ne(n);return s.w_(),new iL(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:pL.bind(null,t),mo:yL.bind(null,t),f_:mL.bind(null,t),g_:gL.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await sh(t)):(await t.U_.stop(),t.O_.length>0&&(Q("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new zr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,a=new cg(e,n,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hg(t,e){if(or("AsyncQueue",`${e}: ${t}`),sl(t))return new H(F.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e){this.comparator=e?(n,r)=>e(n,r)||Y.comparator(n.key,r.key):(n,r)=>Y.comparator(n.key,r.key),this.keyedMap=Bo(),this.sortedSet=new De(this.comparator)}static emptySet(e){return new Rs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Rs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Rs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(){this.W_=new De(Y.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ee():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Hs{constructor(e,n,r,i,s,o,a,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Hs(e,n,Rs.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Jc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _L{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class wL{constructor(){this.queries=g_(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=ne(n),s=i.queries;i.queries=g_(),s.forEach((o,a)=>{for(const u of a.j_)u.onError(r)})})(this,new H(F.ABORTED,"Firestore shutting down"))}}function g_(){return new so(t=>kx(t),Jc)}async function hS(t,e){const n=ne(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new _L,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const a=hg(o,`Initialization of query '${es(e.query)}' failed`);return void e.onError(a)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&dg(n)}async function dS(t,e){const n=ne(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function EL(t,e){const n=ne(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&dg(n)}function TL(t,e,n){const r=ne(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function dg(t){t.Y_.forEach(e=>{e.next()})}var np,y_;(y_=np||(np={})).ea="default",y_.Cache="cache";class fS{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Hs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=Hs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==np.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pS{constructor(e){this.key=e}}class mS{constructor(e){this.key=e}}class xL{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=oe(),this.mutatedKeys=oe(),this.Aa=bx(e),this.Ra=new Rs(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new m_,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,a=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((h,d)=>{const p=i.get(h),g=Zc(this.query,d)?d:null,E=!!p&&this.mutatedKeys.has(p.key),A=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let C=!1;p&&g?p.data.isEqual(g.data)?E!==A&&(r.track({type:3,doc:g}),C=!0):this.ga(p,g)||(r.track({type:2,doc:g}),C=!0,(u&&this.Aa(g,u)>0||c&&this.Aa(g,c)<0)&&(a=!0)):!p&&g?(r.track({type:0,doc:g}),C=!0):p&&!g&&(r.track({type:1,doc:p}),C=!0,(u||c)&&(a=!0)),C&&(g?(o=o.add(g),s=A?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((h,d)=>function(g,E){const A=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return A(g)-A(E)}(h.type,d.type)||this.Aa(h.doc,d.doc)),this.pa(r),i=i!=null&&i;const a=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,c=u!==this.Ea;return this.Ea=u,o.length!==0||c?{snapshot:new Hs(this.query,e.Ra,s,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new m_,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=oe(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new mS(r))}),this.da.forEach(r=>{e.has(r)||n.push(new pS(r))}),n}ba(e){this.Ta=e.Ts,this.da=oe();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return Hs.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class SL{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class IL{constructor(e){this.key=e,this.va=!1}}class AL{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new so(a=>kx(a),Jc),this.Ma=new Map,this.xa=new Set,this.Oa=new De(Y.comparator),this.Na=new Map,this.La=new rg,this.Ba={},this.ka=new Map,this.qa=Ws.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function CL(t,e,n=!0){const r=ES(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await gS(r,e,n,!0),i}async function PL(t,e){const n=ES(t);await gS(n,e,!0,!1)}async function gS(t,e,n,r){const i=await YV(t.localStore,Vn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await RL(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&sS(t.remoteStore,i),a}async function RL(t,e,n,r,i){t.Ka=(d,p,g)=>async function(A,C,w,v){let T=C.view.ma(w);T.ns&&(T=await h_(A.localStore,C.query,!1).then(({documents:S})=>C.view.ma(S,T)));const N=v&&v.targetChanges.get(C.targetId),L=v&&v.targetMismatches.get(C.targetId)!=null,O=C.view.applyChanges(T,A.isPrimaryClient,N,L);return __(A,C.targetId,O.wa),O.snapshot}(t,d,p,g);const s=await h_(t.localStore,e,!0),o=new xL(e,s.Ts),a=o.ma(s.documents),u=al.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),c=o.applyChanges(a,t.isPrimaryClient,u);__(t,n,c.wa);const h=new SL(e,n,o);return t.Fa.set(e,h),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),c.snapshot}async function kL(t,e,n){const r=ne(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Jc(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await tp(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&og(r.remoteStore,i.targetId),rp(r,i.targetId)}).catch(il)):(rp(r,i.targetId),await tp(r.localStore,i.targetId,!0))}async function bL(t,e){const n=ne(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),og(n.remoteStore,r.targetId))}async function NL(t,e,n){const r=jL(t);try{const i=await function(o,a){const u=ne(o),c=Xe.now(),h=a.reduce((g,E)=>g.add(E.key),oe());let d,p;return u.persistence.runTransaction("Locally write mutations","readwrite",g=>{let E=ar(),A=oe();return u.cs.getEntries(g,h).next(C=>{E=C,E.forEach((w,v)=>{v.isValidDocument()||(A=A.add(w))})}).next(()=>u.localDocuments.getOverlayedDocuments(g,E)).next(C=>{d=C;const w=[];for(const v of a){const T=eV(v,d.get(v.key).overlayedDocument);T!=null&&w.push(new ei(v.key,T,Tx(T.value.mapValue),Ln.exists(!0)))}return u.mutationQueue.addMutationBatch(g,c,w,a)}).next(C=>{p=C;const w=C.applyToLocalDocumentSet(d,A);return u.documentOverlayCache.saveOverlays(g,C.batchId,w)})}).then(()=>({batchId:p.batchId,changes:Dx(d)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,u){let c=o.Ba[o.currentUser.toKey()];c||(c=new De(de)),c=c.insert(a,u),o.Ba[o.currentUser.toKey()]=c}(r,i.batchId,n),await ul(r,i.changes),await sh(r.remoteStore)}catch(i){const s=hg(i,"Failed to persist write");n.reject(s)}}async function yS(t,e){const n=ne(t);try{const r=await GV(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(pe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?pe(o.va):i.removedDocuments.size>0&&(pe(o.va),o.va=!1))}),await ul(n,r,e)}catch(r){await il(r)}}function v_(t,e,n){const r=ne(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){const u=ne(o);u.onlineState=a;let c=!1;u.queries.forEach((h,d)=>{for(const p of d.j_)p.Z_(a)&&(c=!0)}),c&&dg(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function DL(t,e,n){const r=ne(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new De(Y.comparator);o=o.insert(s,St.newNoDocument(s,te.min()));const a=oe().add(s),u=new nh(te.min(),new Map,new De(de),o,a);await yS(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),fg(r)}else await tp(r.localStore,e,!1).then(()=>rp(r,e,n)).catch(il)}async function VL(t,e){const n=ne(t),r=e.batch.batchId;try{const i=await qV(n.localStore,e);_S(n,r,null),vS(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await ul(n,i)}catch(i){await il(i)}}async function LL(t,e,n){const r=ne(t);try{const i=await function(o,a){const u=ne(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return u.mutationQueue.lookupMutationBatch(c,a).next(d=>(pe(d!==null),h=d.keys(),u.mutationQueue.removeMutationBatch(c,d))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,h,a)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>u.localDocuments.getDocuments(c,h))})}(r.localStore,e);_S(r,e,n),vS(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await ul(r,i)}catch(i){await il(i)}}function vS(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function _S(t,e,n){const r=ne(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function rp(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||wS(t,r)})}function wS(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(og(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),fg(t))}function __(t,e,n){for(const r of n)r instanceof pS?(t.La.addReference(r.key,e),ML(t,r)):r instanceof mS?(Q("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||wS(t,r.key)):ee()}function ML(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(Q("SyncEngine","New document in limbo: "+n),t.xa.add(r),fg(t))}function fg(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new Y(xe.fromString(e)),r=t.qa.next();t.Na.set(r,new IL(n)),t.Oa=t.Oa.insert(n,r),sS(t.remoteStore,new Pr(Vn(Xc(n.path)),r,"TargetPurposeLimboResolution",Gm.oe))}}async function ul(t,e,n){const r=ne(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((a,u)=>{o.push(r.Ka(u,e,n).then(c=>{var h;if((c||n)&&r.isPrimaryClient){const d=c?!c.fromCache:(h=n==null?void 0:n.targetChanges.get(u.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(u.targetId,d?"current":"not-current")}if(c){i.push(c);const d=sg.Wi(u.targetId,c);s.push(d)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(u,c){const h=ne(u);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>j.forEach(c,p=>j.forEach(p.$i,g=>h.persistence.referenceDelegate.addReference(d,p.targetId,g)).next(()=>j.forEach(p.Ui,g=>h.persistence.referenceDelegate.removeReference(d,p.targetId,g)))))}catch(d){if(!sl(d))throw d;Q("LocalStore","Failed to update sequence numbers: "+d)}for(const d of c){const p=d.targetId;if(!d.fromCache){const g=h.os.get(p),E=g.snapshotVersion,A=g.withLastLimboFreeSnapshotVersion(E);h.os=h.os.insert(p,A)}}}(r.localStore,s))}async function OL(t,e){const n=ne(t);if(!n.currentUser.isEqual(e)){Q("SyncEngine","User change. New user:",e.toKey());const r=await tS(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(a=>{a.forEach(u=>{u.reject(new H(F.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ul(n,r.hs)}}function FL(t,e){const n=ne(t),r=n.Na.get(e);if(r&&r.va)return oe().add(r.key);{let i=oe();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const a=n.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}function ES(t){const e=ne(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=yS.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=FL.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=DL.bind(null,e),e.Ca.d_=EL.bind(null,e.eventManager),e.Ca.$a=TL.bind(null,e.eventManager),e}function jL(t){const e=ne(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=VL.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=LL.bind(null,e),e}class yc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=rh(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return HV(this.persistence,new $V,e.initialUser,this.serializer)}Ga(e){return new UV(ig.Zr,this.serializer)}Wa(e){return new JV}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yc.provider={build:()=>new yc};class ip{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>v_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=OL.bind(null,this.syncEngine),await vL(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new wL}()}createDatastore(e){const n=rh(e.databaseInfo.databaseId),r=function(s){return new nL(s)}(e.databaseInfo);return function(s,o,a,u){return new sL(s,o,a,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,a){return new aL(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,n=>v_(this.syncEngine,n,0),function(){return f_.D()?new f_:new ZV}())}createSyncEngine(e,n){return function(i,s,o,a,u,c,h){const d=new AL(i,s,o,a,u,c);return h&&(d.Qa=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=ne(i);Q("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await ll(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}ip.provider={build:()=>new ip};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):or("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UL{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=Et.UNAUTHENTICATED,this.clientId=_x.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{Q("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(Q("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new zr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=hg(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _d(t,e){t.asyncQueue.verifyOperationInProgress(),Q("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await tS(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function w_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await BL(t);Q("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>p_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>p_(e.remoteStore,i)),t._onlineComponents=e}async function BL(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Q("FirestoreClient","Using user provided OfflineComponentProvider");try{await _d(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===F.FAILED_PRECONDITION||i.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Us("Error using user provided cache. Falling back to memory cache: "+n),await _d(t,new yc)}}else Q("FirestoreClient","Using default OfflineComponentProvider"),await _d(t,new yc);return t._offlineComponents}async function xS(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(Q("FirestoreClient","Using user provided OnlineComponentProvider"),await w_(t,t._uninitializedComponentsProvider._online)):(Q("FirestoreClient","Using default OnlineComponentProvider"),await w_(t,new ip))),t._onlineComponents}function zL(t){return xS(t).then(e=>e.syncEngine)}async function sp(t){const e=await xS(t),n=e.eventManager;return n.onListen=CL.bind(null,e.syncEngine),n.onUnlisten=kL.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=PL.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=bL.bind(null,e.syncEngine),n}function $L(t,e,n={}){const r=new zr;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,a,u,c){const h=new TS({next:p=>{h.Za(),o.enqueueAndForget(()=>dS(s,d));const g=p.docs.has(a);!g&&p.fromCache?c.reject(new H(F.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&p.fromCache&&u&&u.source==="server"?c.reject(new H(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new fS(Xc(a.path),h,{includeMetadataChanges:!0,_a:!0});return hS(s,d)}(await sp(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SS(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IS(t,e,n){if(!n)throw new H(F.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function WL(t,e,n,r){if(e===!0&&r===!0)throw new H(F.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function T_(t){if(!Y.isDocumentKey(t))throw new H(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function x_(t){if(Y.isDocumentKey(t))throw new H(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function oh(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ee()}function On(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=oh(t);throw new H(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new H(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new H(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}WL("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=SS((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new H(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new H(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new H(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ah{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new S_({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new S_(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new cD;switch(r.type){case"firstParty":return new pD(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new H(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=E_.get(n);r&&(Q("ComponentProvider","Removing Datastore"),E_.delete(n),r.terminate())}(this),Promise.resolve()}}function HL(t,e,n,r={}){var i;const s=(t=On(t,ah))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Us("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,u;if(typeof r.mockUserToken=="string")a=r.mockUserToken,u=Et.MOCK_USER;else{a=Uk(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new H(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Et(c)}t._authCredentials=new hD(new vx(a,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ti(this.firestore,e,this._query)}}class It{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $r(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new It(this.firestore,e,this._key)}}class $r extends ti{constructor(e,n,r){super(e,n,Xc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new It(this.firestore,null,new Y(e))}withConverter(e){return new $r(this.firestore,e,this._path)}}function wd(t,e,...n){if(t=Pt(t),IS("collection","path",e),t instanceof ah){const r=xe.fromString(e,...n);return x_(r),new $r(t,null,r)}{if(!(t instanceof It||t instanceof $r))throw new H(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(xe.fromString(e,...n));return x_(r),new $r(t.firestore,null,r)}}function kt(t,e,...n){if(t=Pt(t),arguments.length===1&&(e=_x.newId()),IS("doc","path",e),t instanceof ah){const r=xe.fromString(e,...n);return T_(r),new It(t,null,new Y(r))}{if(!(t instanceof It||t instanceof $r))throw new H(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(xe.fromString(e,...n));return T_(r),new It(t.firestore,t instanceof $r?t.converter:null,new Y(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new rS(this,"async_queue_retry"),this.Vu=()=>{const r=vd();r&&Q("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=vd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=vd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new zr;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!sl(e))throw e;Q("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw or("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=cg.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&ee()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function A_(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class qs extends ah{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new I_,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new I_(e),this._firestoreClient=void 0,await e}}}function qL(t,e){const n=typeof t=="object"?t:Lm(),r=typeof t=="string"?t:"(default)",i=Vm(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Fk("firestore");s&&HL(i,...s)}return i}function pg(t){if(t._terminated)throw new H(F.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||GL(t),t._firestoreClient}function GL(t){var e,n,r;const i=t._freezeSettings(),s=function(a,u,c,h){return new CD(a,u,c,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,SS(h.experimentalLongPollingOptions),h.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new UL(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(a){const u=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Gs(dt.fromBase64String(e))}catch(n){throw new H(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Gs(dt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return de(this._lat,e._lat)||de(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gg{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KL=/^__.*__$/;class QL{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new ei(e,this.data,this.fieldMask,n,this.fieldTransforms):new ol(e,this.data,n,this.fieldTransforms)}}class AS{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new ei(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function CS(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class yg{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new yg(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return vc(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(CS(this.Cu)&&KL.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class YL{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||rh(e)}Qu(e,n,r,i=!1){return new yg({Cu:e,methodName:n,qu:r,path:at.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vg(t){const e=t._freezeSettings(),n=rh(t._databaseId);return new YL(t._databaseId,!!e.ignoreUndefinedProperties,n)}function XL(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);Eg("Data must be an object, but it was:",o,r);const a=PS(r,o);let u,c;if(s.merge)u=new Yt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const d of s.mergeFields){const p=op(e,d,n);if(!o.contains(p))throw new H(F.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);kS(h,p)||h.push(p)}u=new Yt(h),c=o.fieldTransforms.filter(d=>u.covers(d.field))}else u=null,c=o.fieldTransforms;return new QL(new Ut(a),u,c)}class uh extends cl{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof uh}}class _g extends cl{_toFieldTransform(e){return new Bx(e.path,new Fa)}isEqual(e){return e instanceof _g}}class wg extends cl{constructor(e,n){super(e),this.$u=n}_toFieldTransform(e){const n=new Ba(e.serializer,Mx(e.serializer,this.$u));return new Bx(e.path,n)}isEqual(e){return e instanceof wg&&this.$u===e.$u}}function JL(t,e,n,r){const i=t.Qu(1,e,n);Eg("Data must be an object, but it was:",i,r);const s=[],o=Ut.empty();Ui(r,(u,c)=>{const h=Tg(e,u,n);c=Pt(c);const d=i.Nu(h);if(c instanceof uh)s.push(h);else{const p=hl(c,d);p!=null&&(s.push(h),o.set(h,p))}});const a=new Yt(s);return new AS(o,a,i.fieldTransforms)}function ZL(t,e,n,r,i,s){const o=t.Qu(1,e,n),a=[op(e,r,n)],u=[i];if(s.length%2!=0)throw new H(F.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)a.push(op(e,s[p])),u.push(s[p+1]);const c=[],h=Ut.empty();for(let p=a.length-1;p>=0;--p)if(!kS(c,a[p])){const g=a[p];let E=u[p];E=Pt(E);const A=o.Nu(g);if(E instanceof uh)c.push(g);else{const C=hl(E,A);C!=null&&(c.push(g),h.set(g,C))}}const d=new Yt(c);return new AS(h,d,o.fieldTransforms)}function eM(t,e,n,r=!1){return hl(n,t.Qu(r?4:3,e))}function hl(t,e){if(RS(t=Pt(t)))return Eg("Unsupported field value:",e,t),PS(t,e);if(t instanceof cl)return function(r,i){if(!CS(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const a of r){let u=hl(a,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Pt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Mx(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Xe.fromDate(r);return{timestampValue:mc(i.serializer,s)}}if(r instanceof Xe){const s=new Xe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:mc(i.serializer,s)}}if(r instanceof mg)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Gs)return{bytesValue:Kx(i.serializer,r._byteString)};if(r instanceof It){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:ng(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof gg)return function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw a.Bu("VectorValues must only contain numeric values.");return Zm(a.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${oh(r)}`)}(t,e)}function PS(t,e){const n={};return wx(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ui(t,(r,i)=>{const s=hl(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function RS(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Xe||t instanceof mg||t instanceof Gs||t instanceof It||t instanceof cl||t instanceof gg)}function Eg(t,e,n){if(!RS(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=oh(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function op(t,e,n){if((e=Pt(e))instanceof lh)return e._internalPath;if(typeof e=="string")return Tg(t,e);throw vc("Field path arguments must be of type string or ",t,!1,void 0,n)}const tM=new RegExp("[~\\*/\\[\\]]");function Tg(t,e,n){if(e.search(tM)>=0)throw vc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new lh(...e.split("."))._internalPath}catch{throw vc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function vc(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new H(F.INVALID_ARGUMENT,a+t+u)}function kS(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new It(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new nM(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(ch("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class nM extends bS{data(){return super.data()}}function ch(t,e){return typeof e=="string"?Tg(t,e):e instanceof lh?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rM(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xg{}class Sg extends xg{}function Ed(t,e,...n){let r=[];e instanceof xg&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof Ig).length,a=s.filter(u=>u instanceof hh).length;if(o>1||o>0&&a>0)throw new H(F.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class hh extends Sg{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new hh(e,n,r)}_apply(e){const n=this._parse(e);return NS(e._query,n),new ti(e.firestore,e.converter,Yf(e._query,n))}_parse(e){const n=vg(e.firestore);return function(s,o,a,u,c,h,d){let p;if(c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new H(F.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){P_(d,h);const g=[];for(const E of d)g.push(C_(u,s,E));p={arrayValue:{values:g}}}else p=C_(u,s,d)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||P_(d,h),p=eM(a,o,d,h==="in"||h==="not-in");return qe.create(c,h,p)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function Zi(t,e,n){const r=e,i=ch("where",t);return hh._create(i,r,n)}class Ig extends xg{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Ig(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Tn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const a=s.getFlattenedFilters();for(const u of a)NS(o,u),o=Yf(o,u)}(e._query,n),new ti(e.firestore,e.converter,Yf(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ag extends Sg{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Ag(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new H(F.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new H(F.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Oa(s,o)}(e._query,this._field,this._direction);return new ti(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new io(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function iM(t,e="asc"){const n=e,r=ch("orderBy",t);return Ag._create(r,n)}class Cg extends Sg{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Cg(e,n,r)}_apply(e){return new ti(e.firestore,e.converter,pc(e._query,this._limit,this._limitType))}}function sM(t){return Cg._create("limit",t,"F")}function C_(t,e,n){if(typeof(n=Pt(n))=="string"){if(n==="")throw new H(F.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Rx(e)&&n.indexOf("/")!==-1)throw new H(F.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(xe.fromString(n));if(!Y.isDocumentKey(r))throw new H(F.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return K0(t,new Y(r))}if(n instanceof It)return K0(t,n._key);throw new H(F.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${oh(n)}.`)}function P_(t,e){if(!Array.isArray(t)||t.length===0)throw new H(F.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function NS(t,e){const n=function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new H(F.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new H(F.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class oM{convertValue(e,n="none"){switch(Mi(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Li(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Ui(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Ue(o.doubleValue));return new gg(s)}convertGeoPoint(e){return new mg(Ue(e.latitude),Ue(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Qm(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Va(e));default:return null}}convertTimestamp(e){const n=Gr(e);return new Xe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=xe.fromString(e);pe(eS(r));const i=new La(r.get(1),r.get(3)),s=new Y(r.popFirst(5));return i.isEqual(n)||or(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aM(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class DS extends bS{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Au(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(ch("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Au extends DS{data(e={}){return super.data(e)}}class lM{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new $o(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Au(this._firestore,this._userDataWriter,r.key,r,new $o(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{const u=new Au(i._firestore,i._userDataWriter,a.doc.key,a.doc,new $o(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{const u=new Au(i._firestore,i._userDataWriter,a.doc.key,a.doc,new $o(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,h=-1;return a.type!==0&&(c=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:uM(a.type),doc:u,oldIndex:c,newIndex:h}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function uM(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cM(t){t=On(t,It);const e=On(t.firestore,qs);return $L(pg(e),t._key).then(n=>MS(e,t,n))}class VS extends oM{constructor(e){super(),this.firestore=e}convertBytes(e){return new Gs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new It(this.firestore,null,n)}}function hM(t,e,n){t=On(t,It);const r=On(t.firestore,qs),i=aM(t.converter,e);return LS(r,[XL(vg(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Ln.none())])}function Gt(t,e,n,...r){t=On(t,It);const i=On(t.firestore,qs),s=vg(i);let o;return o=typeof(e=Pt(e))=="string"||e instanceof lh?ZL(s,"updateDoc",t._key,e,n,r):JL(s,"updateDoc",t._key,e),LS(i,[o.toMutation(t._key,Ln.exists(!0))])}function Td(t,...e){var n,r,i;t=Pt(t);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||A_(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(A_(e[o])){const d=e[o];e[o]=(n=d.next)===null||n===void 0?void 0:n.bind(d),e[o+1]=(r=d.error)===null||r===void 0?void 0:r.bind(d),e[o+2]=(i=d.complete)===null||i===void 0?void 0:i.bind(d)}let u,c,h;if(t instanceof It)c=On(t.firestore,qs),h=Xc(t._key.path),u={next:d=>{e[o]&&e[o](MS(c,t,d))},error:e[o+1],complete:e[o+2]};else{const d=On(t,ti);c=On(d.firestore,qs),h=d._query;const p=new VS(c);u={next:g=>{e[o]&&e[o](new lM(c,p,d,g))},error:e[o+1],complete:e[o+2]},rM(t._query)}return function(p,g,E,A){const C=new TS(A),w=new fS(g,C,E);return p.asyncQueue.enqueueAndForget(async()=>hS(await sp(p),w)),()=>{C.Za(),p.asyncQueue.enqueueAndForget(async()=>dS(await sp(p),w))}}(pg(c),h,a,u)}function LS(t,e){return function(r,i){const s=new zr;return r.asyncQueue.enqueueAndForget(async()=>NL(await zL(r),i,s)),s.promise}(pg(t),e)}function MS(t,e,n){const r=n.docs.get(e._key),i=new VS(t);return new DS(t,i,e._key,r,new $o(n.hasPendingWrites,n.fromCache),e.converter)}function Wo(){return new _g("serverTimestamp")}function dM(t){return new wg("increment",t)}(function(e,n=!0){(function(i){ro=i})(to),Fs(new Ni("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new qs(new dD(r.getProvider("auth-internal")),new gD(r.getProvider("app-check-internal")),function(c,h){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new H(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new La(c.options.projectId,h)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),Br($0,"4.7.3",e),Br($0,"4.7.3","esm2017")})();const fM={apiKey:"AIzaSyDs8qrwvopw8pShCYvOepgA3yjFHfMWBrM",authDomain:"rodrigues-d6566.firebaseapp.com",projectId:"rodrigues-d6566",storageBucket:"rodrigues-d6566.firebasestorage.app",messagingSenderId:"1010835711502",appId:"1:1010835711502:web:794d59b10eb64f67d6be5f"},OS=t2().length?Lm():b1(fM);lD(OS);const Ze=qL(OS);new qn;/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FS=(...t)=>t.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pM=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mM=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,r)=>r?r.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R_=t=>{const e=mM(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var xd={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gM=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},yM=D.createContext({}),vM=()=>D.useContext(yM),_M=D.forwardRef(({color:t,size:e,strokeWidth:n,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...a},u)=>{const{size:c=24,strokeWidth:h=2,absoluteStrokeWidth:d=!1,color:p="currentColor",className:g=""}=vM()??{},E=r??d?Number(n??h)*24/Number(e??c):n??h;return D.createElement("svg",{ref:u,...xd,width:e??c??xd.width,height:e??c??xd.height,stroke:t??p,strokeWidth:E,className:FS("lucide",g,i),...!s&&!gM(a)&&{"aria-hidden":"true"},...a},[...o.map(([A,C])=>D.createElement(A,C)),...Array.isArray(s)?s:[s]])});/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=(t,e)=>{const n=D.forwardRef(({className:r,...i},s)=>D.createElement(_M,{ref:s,iconNode:e,className:FS(`lucide-${pM(R_(t))}`,`lucide-${t}`,r),...i}));return n.displayName=R_(t),n};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wM=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],jS=Ve("arrow-left",wM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EM=[["circle",{cx:"18.5",cy:"17.5",r:"3.5",key:"15x4ox"}],["circle",{cx:"5.5",cy:"17.5",r:"3.5",key:"1noe27"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["path",{d:"M12 17.5V14l-3-3 4-3 2 3h2",key:"1npguv"}]],TM=Ve("bike",EM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xM=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],SM=Ve("car",xM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],AM=Ve("circle-alert",IM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CM=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],PM=Ve("circle-check-big",CM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],kM=Ve("clock",RM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bM=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],NM=Ve("credit-card",bM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DM=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],VM=Ve("history",DM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],MM=Ve("info",LM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OM=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],FM=Ve("log-out",OM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jM=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],k_=Ve("map-pin",jM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UM=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],BM=Ve("menu",UM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zM=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],$M=Ve("message-circle",zM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WM=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],HM=Ve("moon",WM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qM=[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",key:"nt11vn"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",key:"15qc1e"}],["path",{d:"m2.3 2.3 7.286 7.286",key:"1wuzzi"}],["circle",{cx:"11",cy:"11",r:"2",key:"xmgehs"}]],GM=Ve("pen-tool",qM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KM=[["path",{d:"M13 2a9 9 0 0 1 9 9",key:"1itnx2"}],["path",{d:"M13 6a5 5 0 0 1 5 5",key:"11nki7"}],["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],QM=Ve("phone-call",KM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YM=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],XM=Ve("power",YM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JM=[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34",key:"z3du51"}],["path",{d:"M4 6h.01",key:"oypzma"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35",key:"qzzz0"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67",key:"1yjesh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67",key:"1u2y91"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"m13.41 10.59 5.66-5.66",key:"mhq4k0"}]],ZM=Ve("radar",JM);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eO=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],tO=Ve("settings",eO);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nO=[["path",{d:"M7 18v-6a5 5 0 1 1 10 0v6",key:"pcx96s"}],["path",{d:"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",key:"1b4s83"}],["path",{d:"M21 12h1",key:"jtio3y"}],["path",{d:"M18.5 4.5 18 5",key:"g5sp9y"}],["path",{d:"M2 12h1",key:"1uaihz"}],["path",{d:"M12 2v1",key:"11qlp1"}],["path",{d:"m4.929 4.929.707.707",key:"1i51kw"}],["path",{d:"M12 12v6",key:"3ahymv"}]],US=Ve("siren",nO);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rO=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],iO=Ve("user",rO);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sO=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],oO=Ve("wallet",sO);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aO=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],lO=Ve("x",aO),Pg=D.createContext({});function Rg(t){const e=D.useRef(null);return e.current===null&&(e.current=t()),e.current}const uO=typeof window<"u",BS=uO?D.useLayoutEffect:D.useEffect,dh=D.createContext(null);function kg(t,e){t.indexOf(e)===-1&&t.push(e)}function _c(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const Un=(t,e,n)=>n>e?e:n<t?t:n;let bg=()=>{};const Qr={},zS=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);function $S(t){return typeof t=="object"&&t!==null}const WS=t=>/^0[^.\s]+$/u.test(t);function HS(t){let e;return()=>(e===void 0&&(e=t()),e)}const ln=t=>t,cO=(t,e)=>n=>e(t(n)),dl=(...t)=>t.reduce(cO),za=(t,e,n)=>{const r=e-t;return r===0?1:(n-t)/r};class Ng{constructor(){this.subscriptions=[]}add(e){return kg(this.subscriptions,e),()=>_c(this.subscriptions,e)}notify(e,n,r){const i=this.subscriptions.length;if(i)if(i===1)this.subscriptions[0](e,n,r);else for(let s=0;s<i;s++){const o=this.subscriptions[s];o&&o(e,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Jt=t=>t*1e3,on=t=>t/1e3;function qS(t,e){return e?t*(1e3/e):0}const GS=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,hO=1e-7,dO=12;function fO(t,e,n,r,i){let s,o,a=0;do o=e+(n-e)/2,s=GS(o,r,i)-t,s>0?n=o:e=o;while(Math.abs(s)>hO&&++a<dO);return o}function fl(t,e,n,r){if(t===e&&n===r)return ln;const i=s=>fO(s,0,1,t,n);return s=>s===0||s===1?s:GS(i(s),e,r)}const KS=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,QS=t=>e=>1-t(1-e),YS=fl(.33,1.53,.69,.99),Dg=QS(YS),XS=KS(Dg),JS=t=>t>=1?1:(t*=2)<1?.5*Dg(t):.5*(2-Math.pow(2,-10*(t-1))),Vg=t=>1-Math.sin(Math.acos(t)),ZS=QS(Vg),eI=KS(Vg),pO=fl(.42,0,1,1),mO=fl(0,0,.58,1),tI=fl(.42,0,.58,1),gO=t=>Array.isArray(t)&&typeof t[0]!="number",nI=t=>Array.isArray(t)&&typeof t[0]=="number",yO={linear:ln,easeIn:pO,easeInOut:tI,easeOut:mO,circIn:Vg,circInOut:eI,circOut:ZS,backIn:Dg,backInOut:XS,backOut:YS,anticipate:JS},vO=t=>typeof t=="string",b_=t=>{if(nI(t)){bg(t.length===4);const[e,n,r,i]=t;return fl(e,n,r,i)}else if(vO(t))return yO[t];return t},eu=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function _O(t,e){let n=new Set,r=new Set,i=!1,s=!1;const o=new WeakSet;let a={delta:0,timestamp:0,isProcessing:!1};function u(h){o.has(h)&&(c.schedule(h),t()),h(a)}const c={schedule:(h,d=!1,p=!1)=>{const E=p&&i?n:r;return d&&o.add(h),E.add(h),h},cancel:h=>{r.delete(h),o.delete(h)},process:h=>{if(a=h,i){s=!0;return}i=!0;const d=n;n=r,r=d,n.forEach(u),n.clear(),i=!1,s&&(s=!1,c.process(h))}};return c}const wO=40;function rI(t,e){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},s=()=>n=!0,o=eu.reduce((T,N)=>(T[N]=_O(s),T),{}),{setup:a,read:u,resolveKeyframes:c,preUpdate:h,update:d,preRender:p,render:g,postRender:E}=o,A=()=>{const T=Qr.useManualTiming,N=T?i.timestamp:performance.now();n=!1,T||(i.delta=r?1e3/60:Math.max(Math.min(N-i.timestamp,wO),1)),i.timestamp=N,i.isProcessing=!0,a.process(i),u.process(i),c.process(i),h.process(i),d.process(i),p.process(i),g.process(i),E.process(i),i.isProcessing=!1,n&&e&&(r=!1,t(A))},C=()=>{n=!0,r=!0,i.isProcessing||t(A)};return{schedule:eu.reduce((T,N)=>{const L=o[N];return T[N]=(O,S=!1,y=!1)=>(n||C(),L.schedule(O,S,y)),T},{}),cancel:T=>{for(let N=0;N<eu.length;N++)o[eu[N]].cancel(T)},state:i,steps:o}}const{schedule:_e,cancel:Yr,state:st,steps:Sd}=rI(typeof requestAnimationFrame<"u"?requestAnimationFrame:ln,!0);let Cu;function EO(){Cu=void 0}const Dt={now:()=>(Cu===void 0&&Dt.set(st.isProcessing||Qr.useManualTiming?st.timestamp:performance.now()),Cu),set:t=>{Cu=t,queueMicrotask(EO)}},iI=t=>e=>typeof e=="string"&&e.startsWith(t),sI=iI("--"),TO=iI("var(--"),Lg=t=>TO(t)?xO.test(t.split("/*")[0].trim()):!1,xO=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function N_(t){return typeof t!="string"?!1:t.split("/*")[0].includes("var(--")}const ao={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},$a={...ao,transform:t=>Un(0,1,t)},tu={...ao,default:1},oa=t=>Math.round(t*1e5)/1e5,Mg=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function SO(t){return t==null}const IO=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Og=(t,e)=>n=>!!(typeof n=="string"&&IO.test(n)&&n.startsWith(t)||e&&!SO(n)&&Object.prototype.hasOwnProperty.call(n,e)),oI=(t,e,n)=>r=>{if(typeof r!="string")return r;const[i,s,o,a]=r.match(Mg);return{[t]:parseFloat(i),[e]:parseFloat(s),[n]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}},AO=t=>Un(0,255,t),Id={...ao,transform:t=>Math.round(AO(t))},vi={test:Og("rgb","red"),parse:oI("red","green","blue"),transform:({red:t,green:e,blue:n,alpha:r=1})=>"rgba("+Id.transform(t)+", "+Id.transform(e)+", "+Id.transform(n)+", "+oa($a.transform(r))+")"};function CO(t){let e="",n="",r="",i="";return t.length>5?(e=t.substring(1,3),n=t.substring(3,5),r=t.substring(5,7),i=t.substring(7,9)):(e=t.substring(1,2),n=t.substring(2,3),r=t.substring(3,4),i=t.substring(4,5),e+=e,n+=n,r+=r,i+=i),{red:parseInt(e,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}const ap={test:Og("#"),parse:CO,transform:vi.transform},pl=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),mr=pl("deg"),Fn=pl("%"),K=pl("px"),PO=pl("vh"),RO=pl("vw"),D_={...Fn,parse:t=>Fn.parse(t)/100,transform:t=>Fn.transform(t*100)},ys={test:Og("hsl","hue"),parse:oI("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:n,alpha:r=1})=>"hsla("+Math.round(t)+", "+Fn.transform(oa(e))+", "+Fn.transform(oa(n))+", "+oa($a.transform(r))+")"},We={test:t=>vi.test(t)||ap.test(t)||ys.test(t),parse:t=>vi.test(t)?vi.parse(t):ys.test(t)?ys.parse(t):ap.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?vi.transform(t):ys.transform(t),getAnimatableNone:t=>{const e=We.parse(t);return e.alpha=0,We.transform(e)}},kO=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function bO(t){var e,n;return isNaN(t)&&typeof t=="string"&&(((e=t.match(Mg))==null?void 0:e.length)||0)+(((n=t.match(kO))==null?void 0:n.length)||0)>0}const aI="number",lI="color",NO="var",DO="var(",V_="${}",VO=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ks(t){const e=t.toString(),n=[],r={color:[],number:[],var:[]},i=[];let s=0;const a=e.replace(VO,u=>(We.test(u)?(r.color.push(s),i.push(lI),n.push(We.parse(u))):u.startsWith(DO)?(r.var.push(s),i.push(NO),n.push(u)):(r.number.push(s),i.push(aI),n.push(parseFloat(u))),++s,V_)).split(V_);return{values:n,split:a,indexes:r,types:i}}function LO(t){return Ks(t).values}function uI({split:t,types:e}){const n=t.length;return r=>{let i="";for(let s=0;s<n;s++)if(i+=t[s],r[s]!==void 0){const o=e[s];o===aI?i+=oa(r[s]):o===lI?i+=We.transform(r[s]):i+=r[s]}return i}}function MO(t){return uI(Ks(t))}const OO=t=>typeof t=="number"?0:We.test(t)?We.getAnimatableNone(t):t,FO=(t,e)=>typeof t=="number"?e!=null&&e.trim().endsWith("/")?t:0:OO(t);function jO(t){const e=Ks(t);return uI(e)(e.values.map((r,i)=>FO(r,e.split[i])))}const wn={test:bO,parse:LO,createTransformer:MO,getAnimatableNone:jO};function Ad(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function UO({hue:t,saturation:e,lightness:n,alpha:r}){t/=360,e/=100,n/=100;let i=0,s=0,o=0;if(!e)i=s=o=n;else{const a=n<.5?n*(1+e):n+e-n*e,u=2*n-a;i=Ad(u,a,t+1/3),s=Ad(u,a,t),o=Ad(u,a,t-1/3)}return{red:Math.round(i*255),green:Math.round(s*255),blue:Math.round(o*255),alpha:r}}function wc(t,e){return n=>n>0?e:t}const Se=(t,e,n)=>t+(e-t)*n,Cd=(t,e,n)=>{const r=t*t,i=n*(e*e-r)+r;return i<0?0:Math.sqrt(i)},BO=[ap,vi,ys],zO=t=>BO.find(e=>e.test(t));function L_(t){const e=zO(t);if(!e)return!1;let n=e.parse(t);return e===ys&&(n=UO(n)),n}const M_=(t,e)=>{const n=L_(t),r=L_(e);if(!n||!r)return wc(t,e);const i={...n};return s=>(i.red=Cd(n.red,r.red,s),i.green=Cd(n.green,r.green,s),i.blue=Cd(n.blue,r.blue,s),i.alpha=Se(n.alpha,r.alpha,s),vi.transform(i))},lp=new Set(["none","hidden"]);function $O(t,e){return lp.has(t)?n=>n<=0?t:e:n=>n>=1?e:t}function WO(t,e){return n=>Se(t,e,n)}function Fg(t){return typeof t=="number"?WO:typeof t=="string"?Lg(t)?wc:We.test(t)?M_:GO:Array.isArray(t)?cI:typeof t=="object"?We.test(t)?M_:HO:wc}function cI(t,e){const n=[...t],r=n.length,i=t.map((s,o)=>Fg(s)(s,e[o]));return s=>{for(let o=0;o<r;o++)n[o]=i[o](s);return n}}function HO(t,e){const n={...t,...e},r={};for(const i in n)t[i]!==void 0&&e[i]!==void 0&&(r[i]=Fg(t[i])(t[i],e[i]));return i=>{for(const s in r)n[s]=r[s](i);return n}}function qO(t,e){const n=[],r={color:0,var:0,number:0};for(let i=0;i<e.values.length;i++){const s=e.types[i],o=t.indexes[s][r[s]],a=t.values[o]??0;n[i]=a,r[s]++}return n}const GO=(t,e)=>{const n=wn.createTransformer(e),r=Ks(t),i=Ks(e);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?lp.has(t)&&!i.values.length||lp.has(e)&&!r.values.length?$O(t,e):dl(cI(qO(r,i),i.values),n):wc(t,e)};function hI(t,e,n){return typeof t=="number"&&typeof e=="number"&&typeof n=="number"?Se(t,e,n):Fg(t)(t,e)}const KO=t=>{const e=({timestamp:n})=>t(n);return{start:(n=!0)=>_e.update(e,n),stop:()=>Yr(e),now:()=>st.isProcessing?st.timestamp:Dt.now()}},dI=(t,e,n=10)=>{let r="";const i=Math.max(Math.round(e/n),2);for(let s=0;s<i;s++)r+=Math.round(t(s/(i-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},Ec=2e4;function jg(t){let e=0;const n=50;let r=t.next(e);for(;!r.done&&e<Ec;)e+=n,r=t.next(e);return e>=Ec?1/0:e}function QO(t,e=100,n){const r=n({...t,keyframes:[0,e]}),i=Math.min(jg(r),Ec);return{type:"keyframes",ease:s=>r.next(i*s).value/e,duration:on(i)}}const Oe={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function up(t,e){return t*Math.sqrt(1-e*e)}const YO=12;function XO(t,e,n){let r=n;for(let i=1;i<YO;i++)r=r-t(r)/e(r);return r}const Pd=.001;function JO({duration:t=Oe.duration,bounce:e=Oe.bounce,velocity:n=Oe.velocity,mass:r=Oe.mass}){let i,s,o=1-e;o=Un(Oe.minDamping,Oe.maxDamping,o),t=Un(Oe.minDuration,Oe.maxDuration,on(t)),o<1?(i=c=>{const h=c*o,d=h*t,p=h-n,g=up(c,o),E=Math.exp(-d);return Pd-p/g*E},s=c=>{const d=c*o*t,p=d*n+n,g=Math.pow(o,2)*Math.pow(c,2)*t,E=Math.exp(-d),A=up(Math.pow(c,2),o);return(-i(c)+Pd>0?-1:1)*((p-g)*E)/A}):(i=c=>{const h=Math.exp(-c*t),d=(c-n)*t+1;return-Pd+h*d},s=c=>{const h=Math.exp(-c*t),d=(n-c)*(t*t);return h*d});const a=5/t,u=XO(i,s,a);if(t=Jt(t),isNaN(u))return{stiffness:Oe.stiffness,damping:Oe.damping,duration:t};{const c=Math.pow(u,2)*r;return{stiffness:c,damping:o*2*Math.sqrt(r*c),duration:t}}}const ZO=["duration","bounce"],e4=["stiffness","damping","mass"];function O_(t,e){return e.some(n=>t[n]!==void 0)}function t4(t){let e={velocity:Oe.velocity,stiffness:Oe.stiffness,damping:Oe.damping,mass:Oe.mass,isResolvedFromDuration:!1,...t};if(!O_(t,e4)&&O_(t,ZO))if(e.velocity=0,t.visualDuration){const n=t.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,s=2*Un(.05,1,1-(t.bounce||0))*Math.sqrt(i);e={...e,mass:Oe.mass,stiffness:i,damping:s}}else{const n=JO({...t,velocity:0});e={...e,...n,mass:Oe.mass},e.isResolvedFromDuration=!0}return e}function Tc(t=Oe.visualDuration,e=Oe.bounce){const n=typeof t!="object"?{visualDuration:t,keyframes:[0,1],bounce:e}:t;let{restSpeed:r,restDelta:i}=n;const s=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],a={done:!1,value:s},{stiffness:u,damping:c,mass:h,duration:d,velocity:p,isResolvedFromDuration:g}=t4({...n,velocity:-on(n.velocity||0)}),E=p||0,A=c/(2*Math.sqrt(u*h)),C=o-s,w=on(Math.sqrt(u/h)),v=Math.abs(C)<5;r||(r=v?Oe.restSpeed.granular:Oe.restSpeed.default),i||(i=v?Oe.restDelta.granular:Oe.restDelta.default);let T,N,L,O,S,y;if(A<1)L=up(w,A),O=(E+A*w*C)/L,T=x=>{const k=Math.exp(-A*w*x);return o-k*(O*Math.sin(L*x)+C*Math.cos(L*x))},S=A*w*O+C*L,y=A*w*C-O*L,N=x=>Math.exp(-A*w*x)*(S*Math.sin(L*x)+y*Math.cos(L*x));else if(A===1){T=k=>o-Math.exp(-w*k)*(C+(E+w*C)*k);const x=E+w*C;N=k=>Math.exp(-w*k)*(w*x*k-E)}else{const x=w*Math.sqrt(A*A-1);T=me=>{const re=Math.exp(-A*w*me),ye=Math.min(x*me,300);return o-re*((E+A*w*C)*Math.sinh(ye)+x*C*Math.cosh(ye))/x};const k=(E+A*w*C)/x,b=A*w*k-C*x,R=A*w*C-k*x;N=me=>{const re=Math.exp(-A*w*me),ye=Math.min(x*me,300);return re*(b*Math.sinh(ye)+R*Math.cosh(ye))}}const I={calculatedDuration:g&&d||null,velocity:x=>Jt(N(x)),next:x=>{if(!g&&A<1){const b=Math.exp(-A*w*x),R=Math.sin(L*x),me=Math.cos(L*x),re=o-b*(O*R+C*me),ye=Jt(b*(S*R+y*me));return a.done=Math.abs(ye)<=r&&Math.abs(o-re)<=i,a.value=a.done?o:re,a}const k=T(x);if(g)a.done=x>=d;else{const b=Jt(N(x));a.done=Math.abs(b)<=r&&Math.abs(o-k)<=i}return a.value=a.done?o:k,a},toString:()=>{const x=Math.min(jg(I),Ec),k=dI(b=>I.next(x*b).value,x,30);return x+"ms "+k},toTransition:()=>{}};return I}Tc.applyToOptions=t=>{const e=QO(t,100,Tc);return t.ease=e.ease,t.duration=Jt(e.duration),t.type="keyframes",t};const n4=5;function fI(t,e,n){const r=Math.max(e-n4,0);return qS(n-t(r),e-r)}function cp({keyframes:t,velocity:e=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:s=500,modifyTarget:o,min:a,max:u,restDelta:c=.5,restSpeed:h}){const d=t[0],p={done:!1,value:d},g=y=>a!==void 0&&y<a||u!==void 0&&y>u,E=y=>a===void 0?u:u===void 0||Math.abs(a-y)<Math.abs(u-y)?a:u;let A=n*e;const C=d+A,w=o===void 0?C:o(C);w!==C&&(A=w-d);const v=y=>-A*Math.exp(-y/r),T=y=>w+v(y),N=y=>{const I=v(y),x=T(y);p.done=Math.abs(I)<=c,p.value=p.done?w:x};let L,O;const S=y=>{g(p.value)&&(L=y,O=Tc({keyframes:[p.value,E(p.value)],velocity:fI(T,y,p.value),damping:i,stiffness:s,restDelta:c,restSpeed:h}))};return S(0),{calculatedDuration:null,next:y=>{let I=!1;return!O&&L===void 0&&(I=!0,N(y),S(y)),L!==void 0&&y>=L?O.next(y-L):(!I&&N(y),p)}}}function r4(t,e,n){const r=[],i=n||Qr.mix||hI,s=t.length-1;for(let o=0;o<s;o++){let a=i(t[o],t[o+1]);if(e){const u=Array.isArray(e)?e[o]||ln:e;a=dl(u,a)}r.push(a)}return r}function i4(t,e,{clamp:n=!0,ease:r,mixer:i}={}){const s=t.length;if(bg(s===e.length),s===1)return()=>e[0];if(s===2&&e[0]===e[1])return()=>e[1];const o=t[0]===t[1];t[0]>t[s-1]&&(t=[...t].reverse(),e=[...e].reverse());const a=r4(e,r,i),u=a.length,c=h=>{if(o&&h<t[0])return e[0];let d=0;if(u>1)for(;d<t.length-2&&!(h<t[d+1]);d++);const p=za(t[d],t[d+1],h);return a[d](p)};return n?h=>c(Un(t[0],t[s-1],h)):c}function s4(t,e){const n=t[t.length-1];for(let r=1;r<=e;r++){const i=za(0,e,r);t.push(Se(n,1,i))}}function o4(t){const e=[0];return s4(e,t.length-1),e}function a4(t,e){return t.map(n=>n*e)}function l4(t,e){return t.map(()=>e||tI).splice(0,t.length-1)}function aa({duration:t=300,keyframes:e,times:n,ease:r="easeInOut"}){const i=gO(r)?r.map(b_):b_(r),s={done:!1,value:e[0]},o=a4(n&&n.length===e.length?n:o4(e),t),a=i4(o,e,{ease:Array.isArray(i)?i:l4(e,i)});return{calculatedDuration:t,next:u=>(s.value=a(u),s.done=u>=t,s)}}const u4=t=>t!==null;function fh(t,{repeat:e,repeatType:n="loop"},r,i=1){const s=t.filter(u4),a=i<0||e&&n!=="loop"&&e%2===1?0:s.length-1;return!a||r===void 0?s[a]:r}const c4={decay:cp,inertia:cp,tween:aa,keyframes:aa,spring:Tc};function pI(t){typeof t.type=="string"&&(t.type=c4[t.type])}class Ug{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,n){return this.finished.then(e,n)}}const h4=t=>t/100;class xc extends Ug{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var r,i;const{motionValue:n}=this.options;n&&n.updatedAt!==Dt.now()&&this.tick(Dt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(i=(r=this.options).onStop)==null||i.call(r))},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){const{options:e}=this;pI(e);const{type:n=aa,repeat:r=0,repeatDelay:i=0,repeatType:s,velocity:o=0}=e;let{keyframes:a}=e;const u=n||aa;u!==aa&&typeof a[0]!="number"&&(this.mixKeyframes=dl(h4,hI(a[0],a[1])),a=[0,100]);const c=u({...e,keyframes:a});s==="mirror"&&(this.mirroredGenerator=u({...e,keyframes:[...a].reverse(),velocity:-o})),c.calculatedDuration===null&&(c.calculatedDuration=jg(c));const{calculatedDuration:h}=c;this.calculatedDuration=h,this.resolvedDuration=h+i,this.totalDuration=this.resolvedDuration*(r+1)-i,this.generator=c}updateTime(e){const n=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=n}tick(e,n=!1){const{generator:r,totalDuration:i,mixKeyframes:s,mirroredGenerator:o,resolvedDuration:a,calculatedDuration:u}=this;if(this.startTime===null)return r.next(0);const{delay:c=0,keyframes:h,repeat:d,repeatType:p,repeatDelay:g,type:E,onUpdate:A,finalKeyframe:C}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-i/this.speed,this.startTime)),n?this.currentTime=e:this.updateTime(e);const w=this.currentTime-c*(this.playbackSpeed>=0?1:-1),v=this.playbackSpeed>=0?w<0:w>i;this.currentTime=Math.max(w,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=i);let T=this.currentTime,N=r;if(d){const y=Math.min(this.currentTime,i)/a;let I=Math.floor(y),x=y%1;!x&&y>=1&&(x=1),x===1&&I--,I=Math.min(I,d+1),!!(I%2)&&(p==="reverse"?(x=1-x,g&&(x-=g/a)):p==="mirror"&&(N=o)),T=Un(0,1,x)*a}let L;v?(this.delayState.value=h[0],L=this.delayState):L=N.next(T),s&&!v&&(L.value=s(L.value));let{done:O}=L;!v&&u!==null&&(O=this.playbackSpeed>=0?this.currentTime>=i:this.currentTime<=0);const S=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&O);return S&&E!==cp&&(L.value=fh(h,this.options,C,this.speed)),A&&A(L.value),S&&this.finish(),L}then(e,n){return this.finished.then(e,n)}get duration(){return on(this.calculatedDuration)}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+on(e)}get time(){return on(this.currentTime)}set time(e){e=Jt(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){const e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);const n=this.generator.next(e).value;return fI(r=>this.generator.next(r).value,e,n)}get speed(){return this.playbackSpeed}set speed(e){const n=this.playbackSpeed!==e;n&&this.driver&&this.updateTime(Dt.now()),this.playbackSpeed=e,n&&this.driver&&(this.time=on(this.currentTime))}play(){var i,s;if(this.isStopped)return;const{driver:e=KO,startTime:n}=this.options;this.driver||(this.driver=e(o=>this.tick(o))),(s=(i=this.options).onPlay)==null||s.call(i);const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=n??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(Dt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var e,n;this.notifyFinished(),this.teardown(),this.state="finished",(n=(e=this.options).onComplete)==null||n.call(e)}cancel(){var e,n;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(n=(e=this.options).onCancel)==null||n.call(e)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){var n;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(n=this.driver)==null||n.stop(),e.observe(this)}}function d4(t){for(let e=1;e<t.length;e++)t[e]??(t[e]=t[e-1])}const _i=t=>t*180/Math.PI,hp=t=>{const e=_i(Math.atan2(t[1],t[0]));return dp(e)},f4={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:t=>(Math.abs(t[0])+Math.abs(t[3]))/2,rotate:hp,rotateZ:hp,skewX:t=>_i(Math.atan(t[1])),skewY:t=>_i(Math.atan(t[2])),skew:t=>(Math.abs(t[1])+Math.abs(t[2]))/2},dp=t=>(t=t%360,t<0&&(t+=360),t),F_=hp,j_=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),U_=t=>Math.sqrt(t[4]*t[4]+t[5]*t[5]),p4={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:j_,scaleY:U_,scale:t=>(j_(t)+U_(t))/2,rotateX:t=>dp(_i(Math.atan2(t[6],t[5]))),rotateY:t=>dp(_i(Math.atan2(-t[2],t[0]))),rotateZ:F_,rotate:F_,skewX:t=>_i(Math.atan(t[4])),skewY:t=>_i(Math.atan(t[1])),skew:t=>(Math.abs(t[1])+Math.abs(t[4]))/2};function fp(t){return t.includes("scale")?1:0}function pp(t,e){if(!t||t==="none")return fp(e);const n=t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,i;if(n)r=p4,i=n;else{const a=t.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=f4,i=a}if(!i)return fp(e);const s=r[e],o=i[1].split(",").map(g4);return typeof s=="function"?s(o):o[s]}const m4=(t,e)=>{const{transform:n="none"}=getComputedStyle(t);return pp(n,e)};function g4(t){return parseFloat(t.trim())}const lo=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],uo=new Set(lo),B_=t=>t===ao||t===K,y4=new Set(["x","y","z"]),v4=lo.filter(t=>!y4.has(t));function _4(t){const e=[];return v4.forEach(n=>{const r=t.getValue(n);r!==void 0&&(e.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),e}const Rr={width:({x:t},{paddingLeft:e="0",paddingRight:n="0",boxSizing:r})=>{const i=t.max-t.min;return r==="border-box"?i:i-parseFloat(e)-parseFloat(n)},height:({y:t},{paddingTop:e="0",paddingBottom:n="0",boxSizing:r})=>{const i=t.max-t.min;return r==="border-box"?i:i-parseFloat(e)-parseFloat(n)},top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:(t,{transform:e})=>pp(e,"x"),y:(t,{transform:e})=>pp(e,"y")};Rr.translateX=Rr.x;Rr.translateY=Rr.y;const Ii=new Set;let mp=!1,gp=!1,yp=!1;function mI(){if(gp){const t=Array.from(Ii).filter(r=>r.needsMeasurement),e=new Set(t.map(r=>r.element)),n=new Map;e.forEach(r=>{const i=_4(r);i.length&&(n.set(r,i),r.render())}),t.forEach(r=>r.measureInitialState()),e.forEach(r=>{r.render();const i=n.get(r);i&&i.forEach(([s,o])=>{var a;(a=r.getValue(s))==null||a.set(o)})}),t.forEach(r=>r.measureEndState()),t.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}gp=!1,mp=!1,Ii.forEach(t=>t.complete(yp)),Ii.clear()}function gI(){Ii.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(gp=!0)})}function w4(){yp=!0,gI(),mI(),yp=!1}class Bg{constructor(e,n,r,i,s,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=n,this.name=r,this.motionValue=i,this.element=s,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(Ii.add(this),mp||(mp=!0,_e.read(gI),_e.resolveKeyframes(mI))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:e,name:n,element:r,motionValue:i}=this;if(e[0]===null){const s=i==null?void 0:i.get(),o=e[e.length-1];if(s!==void 0)e[0]=s;else if(r&&n){const a=r.readValue(n,o);a!=null&&(e[0]=a)}e[0]===void 0&&(e[0]=o),i&&s===void 0&&i.set(e[0])}d4(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),Ii.delete(this)}cancel(){this.state==="scheduled"&&(Ii.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const E4=t=>t.startsWith("--");function yI(t,e,n){E4(e)?t.style.setProperty(e,n):t.style[e]=n}const T4={};function vI(t,e){const n=HS(t);return()=>T4[e]??n()}const x4=vI(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),_I=vI(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Ho=([t,e,n,r])=>`cubic-bezier(${t}, ${e}, ${n}, ${r})`,z_={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Ho([0,.65,.55,1]),circOut:Ho([.55,0,1,.45]),backIn:Ho([.31,.01,.66,-.59]),backOut:Ho([.33,1.53,.69,.99])};function wI(t,e){if(t)return typeof t=="function"?_I()?dI(t,e):"ease-out":nI(t)?Ho(t):Array.isArray(t)?t.map(n=>wI(n,e)||z_.easeOut):z_[t]}function S4(t,e,n,{delay:r=0,duration:i=300,repeat:s=0,repeatType:o="loop",ease:a="easeOut",times:u}={},c=void 0){const h={[e]:n};u&&(h.offset=u);const d=wI(a,i);Array.isArray(d)&&(h.easing=d);const p={delay:r,duration:i,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:s+1,direction:o==="reverse"?"alternate":"normal"};return c&&(p.pseudoElement=c),t.animate(h,p)}function EI(t){return typeof t=="function"&&"applyToOptions"in t}function I4({type:t,...e}){return EI(t)&&_I()?t.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}class TI extends Ug{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;const{element:n,name:r,keyframes:i,pseudoElement:s,allowFlatten:o=!1,finalKeyframe:a,onComplete:u}=e;this.isPseudoElement=!!s,this.allowFlatten=o,this.options=e,bg(typeof e.type!="string");const c=I4(e);this.animation=S4(n,r,i,c,s),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!s){const h=fh(i,this.options,a,this.speed);this.updateMotionValue&&this.updateMotionValue(h),yI(n,r,h),this.animation.cancel()}u==null||u(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var e,n;(n=(e=this.animation).finish)==null||n.call(e)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:e}=this;e==="idle"||e==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var n,r,i;const e=(n=this.options)==null?void 0:n.element;!this.isPseudoElement&&(e!=null&&e.isConnected)&&((i=(r=this.animation).commitStyles)==null||i.call(r))}get duration(){var n,r;const e=((r=(n=this.animation.effect)==null?void 0:n.getComputedTiming)==null?void 0:r.call(n).duration)||0;return on(Number(e))}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+on(e)}get time(){return on(Number(this.animation.currentTime)||0)}set time(e){const n=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Jt(e),n&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:n,rangeEnd:r,observe:i}){var s;return this.allowFlatten&&((s=this.animation.effect)==null||s.updateTiming({easing:"linear"})),this.animation.onfinish=null,e&&x4()?(this.animation.timeline=e,n&&(this.animation.rangeStart=n),r&&(this.animation.rangeEnd=r),ln):i(this)}}const xI={anticipate:JS,backInOut:XS,circInOut:eI};function A4(t){return t in xI}function C4(t){typeof t.ease=="string"&&A4(t.ease)&&(t.ease=xI[t.ease])}const Rd=10;class P4 extends TI{constructor(e){C4(e),pI(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){const{motionValue:n,onUpdate:r,onComplete:i,element:s,...o}=this.options;if(!n)return;if(e!==void 0){n.set(e);return}const a=new xc({...o,autoplay:!1}),u=Math.max(Rd,Dt.now()-this.startTime),c=Un(0,Rd,u-Rd),h=a.sample(u).value,{name:d}=this.options;s&&d&&yI(s,d,h),n.setWithVelocity(a.sample(Math.max(0,u-c)).value,h,c),a.stop()}}const $_=(t,e)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(wn.test(t)||t==="0")&&!t.startsWith("url("));function R4(t){const e=t[0];if(t.length===1)return!0;for(let n=0;n<t.length;n++)if(t[n]!==e)return!0}function k4(t,e,n,r){const i=t[0];if(i===null)return!1;if(e==="display"||e==="visibility")return!0;const s=t[t.length-1],o=$_(i,e),a=$_(s,e);return!o||!a?!1:R4(t)||(n==="spring"||EI(n))&&r}function vp(t){t.duration=0,t.type="keyframes"}const SI=new Set(["opacity","clipPath","filter","transform"]),b4=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function N4(t){for(let e=0;e<t.length;e++)if(typeof t[e]=="string"&&b4.test(t[e]))return!0;return!1}const D4=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),V4=HS(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function L4(t){var d;const{motionValue:e,name:n,repeatDelay:r,repeatType:i,damping:s,type:o,keyframes:a}=t;if(!(((d=e==null?void 0:e.owner)==null?void 0:d.current)instanceof HTMLElement))return!1;const{onUpdate:c,transformTemplate:h}=e.owner.getProps();return V4()&&n&&(SI.has(n)||D4.has(n)&&N4(a))&&(n!=="transform"||!h)&&!c&&!r&&i!=="mirror"&&s!==0&&o!=="inertia"}const M4=40;class O4 extends Ug{constructor({autoplay:e=!0,delay:n=0,type:r="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:o="loop",keyframes:a,name:u,motionValue:c,element:h,...d}){var E;super(),this.stop=()=>{var A,C;this._animation&&(this._animation.stop(),(A=this.stopTimeline)==null||A.call(this)),(C=this.keyframeResolver)==null||C.cancel()},this.createdAt=Dt.now();const p={autoplay:e,delay:n,type:r,repeat:i,repeatDelay:s,repeatType:o,name:u,motionValue:c,element:h,...d},g=(h==null?void 0:h.KeyframeResolver)||Bg;this.keyframeResolver=new g(a,(A,C,w)=>this.onKeyframesResolved(A,C,p,!w),u,c,h),(E=this.keyframeResolver)==null||E.scheduleResolve()}onKeyframesResolved(e,n,r,i){var w,v;this.keyframeResolver=void 0;const{name:s,type:o,velocity:a,delay:u,isHandoff:c,onUpdate:h}=r;this.resolvedAt=Dt.now();let d=!0;k4(e,s,o,a)||(d=!1,(Qr.instantAnimations||!u)&&(h==null||h(fh(e,r,n))),e[0]=e[e.length-1],vp(r),r.repeat=0);const g={startTime:i?this.resolvedAt?this.resolvedAt-this.createdAt>M4?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:n,...r,keyframes:e},E=d&&!c&&L4(g),A=(v=(w=g.motionValue)==null?void 0:w.owner)==null?void 0:v.current;let C;if(E)try{C=new P4({...g,element:A})}catch{C=new xc(g)}else C=new xc(g);C.finished.then(()=>{this.notifyFinished()}).catch(ln),this.pendingTimeline&&(this.stopTimeline=C.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=C}get finished(){return this._animation?this.animation.finished:this._finished}then(e,n){return this.finished.finally(e).then(()=>{})}get animation(){var e;return this._animation||((e=this.keyframeResolver)==null||e.resume(),w4()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var e;this._animation&&this.animation.cancel(),(e=this.keyframeResolver)==null||e.cancel()}}function II(t,e,n,r=0,i=1){const s=Array.from(t).sort((c,h)=>c.sortNodePosition(h)).indexOf(e),o=t.size,a=(o-1)*r;return typeof n=="function"?n(s,o):i===1?s*r:a-s*r}const F4=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function j4(t){const e=F4.exec(t);if(!e)return[,];const[,n,r,i]=e;return[`--${n??r}`,i]}function AI(t,e,n=1){const[r,i]=j4(t);if(!r)return;const s=window.getComputedStyle(e).getPropertyValue(r);if(s){const o=s.trim();return zS(o)?parseFloat(o):o}return Lg(i)?AI(i,e,n+1):i}const U4={type:"spring",stiffness:500,damping:25,restSpeed:10},B4=t=>({type:"spring",stiffness:550,damping:t===0?2*Math.sqrt(550):30,restSpeed:10}),z4={type:"keyframes",duration:.8},$4={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},W4=(t,{keyframes:e})=>e.length>2?z4:uo.has(t)?t.startsWith("scale")?B4(e[1]):U4:$4;function CI(t,e){if(t!=null&&t.inherit&&e){const{inherit:n,...r}=t;return{...e,...r}}return t}function zg(t,e){const n=(t==null?void 0:t[e])??(t==null?void 0:t.default)??t;return n!==t?CI(n,t):n}const H4=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function q4(t){for(const e in t)if(!H4.has(e))return!0;return!1}const $g=(t,e,n,r={},i,s)=>o=>{const a=zg(r,t)||{},u=a.delay||r.delay||0;let{elapsed:c=0}=r;c=c-Jt(u);const h={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:e.getVelocity(),...a,delay:-c,onUpdate:p=>{e.set(p),a.onUpdate&&a.onUpdate(p)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:t,motionValue:e,element:s?void 0:i};q4(a)||Object.assign(h,W4(t,h)),h.duration&&(h.duration=Jt(h.duration)),h.repeatDelay&&(h.repeatDelay=Jt(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let d=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(vp(h),h.delay===0&&(d=!0)),(Qr.instantAnimations||Qr.skipAnimations||i!=null&&i.shouldSkipAnimations)&&(d=!0,vp(h),h.delay=0),h.allowFlatten=!a.type&&!a.ease,d&&!s&&e.get()!==void 0){const p=fh(h.keyframes,a);if(p!==void 0){_e.update(()=>{h.onUpdate(p),h.onComplete()});return}}return a.isSync?new xc(h):new O4(h)};function W_(t){const e=[{},{}];return t==null||t.values.forEach((n,r)=>{e[0][r]=n.get(),e[1][r]=n.getVelocity()}),e}function Wg(t,e,n,r){if(typeof e=="function"){const[i,s]=W_(r);e=e(n!==void 0?n:t.custom,i,s)}if(typeof e=="string"&&(e=t.variants&&t.variants[e]),typeof e=="function"){const[i,s]=W_(r);e=e(n!==void 0?n:t.custom,i,s)}return e}function Ai(t,e,n){const r=t.getProps();return Wg(r,e,n!==void 0?n:r.custom,t)}const PI=new Set(["width","height","top","left","right","bottom",...lo]),H_=30,G4=t=>!isNaN(parseFloat(t));class K4{constructor(e,n={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{var s;const i=Dt.now();if(this.updatedAt!==i&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&((s=this.events.change)==null||s.notify(this.current),this.dependents))for(const o of this.dependents)o.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=n.owner}setCurrent(e){this.current=e,this.updatedAt=Dt.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=G4(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,n){this.events[e]||(this.events[e]=new Ng);const r=this.events[e].add(n);return e==="change"?()=>{r(),_e.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,n){this.passiveEffect=e,this.stopPassiveEffect=n}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,n,r){this.set(n),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-r}jump(e,n=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var e;(e=this.events.change)==null||e.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=Dt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>H_)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,H_);return qS(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(e){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=e(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var e,n;(e=this.dependents)==null||e.clear(),(n=this.events.destroy)==null||n.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Qs(t,e){return new K4(t,e)}const _p=t=>Array.isArray(t);function Q4(t,e,n){t.hasValue(e)?t.getValue(e).set(n):t.addValue(e,Qs(n))}function Y4(t){return _p(t)?t[t.length-1]||0:t}function X4(t,e){const n=Ai(t,e);let{transitionEnd:r={},transition:i={},...s}=n||{};s={...s,...r};for(const o in s){const a=Y4(s[o]);Q4(t,o,a)}}const lt=t=>!!(t&&t.getVelocity);function J4(t){return!!(lt(t)&&t.add)}function wp(t,e){const n=t.getValue("willChange");if(J4(n))return n.add(e);if(!n&&Qr.WillChange){const r=new Qr.WillChange("auto");t.addValue("willChange",r),r.add(e)}}function Hg(t){return t.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}const Z4="framerAppearId",RI="data-"+Hg(Z4);function kI(t){return t.props[RI]}function eF({protectedKeys:t,needsAnimating:e},n){const r=t.hasOwnProperty(n)&&e[n]!==!0;return e[n]=!1,r}function bI(t,e,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:s,transitionEnd:o,...a}=e;const u=t.getDefaultTransition();s=s?CI(s,u):u;const c=s==null?void 0:s.reduceMotion;r&&(s=r);const h=[],d=i&&t.animationState&&t.animationState.getState()[i];for(const p in a){const g=t.getValue(p,t.latestValues[p]??null),E=a[p];if(E===void 0||d&&eF(d,p))continue;const A={delay:n,...zg(s||{},p)},C=g.get();if(C!==void 0&&!g.isAnimating()&&!Array.isArray(E)&&E===C&&!A.velocity){_e.update(()=>g.set(E));continue}let w=!1;if(window.MotionHandoffAnimation){const N=kI(t);if(N){const L=window.MotionHandoffAnimation(N,p,_e);L!==null&&(A.startTime=L,w=!0)}}wp(t,p);const v=c??t.shouldReduceMotion;g.start($g(p,g,E,v&&PI.has(p)?{type:!1}:A,t,w));const T=g.animation;T&&h.push(T)}if(o){const p=()=>_e.update(()=>{o&&X4(t,o)});h.length?Promise.all(h).then(p):p()}return h}function Ep(t,e,n={}){var u;const r=Ai(t,e,n.type==="exit"?(u=t.presenceContext)==null?void 0:u.custom:void 0);let{transition:i=t.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);const s=r?()=>Promise.all(bI(t,r,n)):()=>Promise.resolve(),o=t.variantChildren&&t.variantChildren.size?(c=0)=>{const{delayChildren:h=0,staggerChildren:d,staggerDirection:p}=i;return tF(t,e,c,h,d,p,n)}:()=>Promise.resolve(),{when:a}=i;if(a){const[c,h]=a==="beforeChildren"?[s,o]:[o,s];return c().then(()=>h())}else return Promise.all([s(),o(n.delay)])}function tF(t,e,n=0,r=0,i=0,s=1,o){const a=[];for(const u of t.variantChildren)u.notify("AnimationStart",e),a.push(Ep(u,e,{...o,delay:n+(typeof r=="function"?0:r)+II(t.variantChildren,u,r,i,s)}).then(()=>u.notify("AnimationComplete",e)));return Promise.all(a)}function nF(t,e,n={}){t.notify("AnimationStart",e);let r;if(Array.isArray(e)){const i=e.map(s=>Ep(t,s,n));r=Promise.all(i)}else if(typeof e=="string")r=Ep(t,e,n);else{const i=typeof e=="function"?Ai(t,e,n.custom):e;r=Promise.all(bI(t,i,n))}return r.then(()=>{t.notify("AnimationComplete",e)})}const rF={test:t=>t==="auto",parse:t=>t},NI=t=>e=>e.test(t),DI=[ao,K,Fn,mr,RO,PO,rF],q_=t=>DI.find(NI(t));function iF(t){return typeof t=="number"?t===0:t!==null?t==="none"||t==="0"||WS(t):!0}const sF=new Set(["brightness","contrast","saturate","opacity"]);function oF(t){const[e,n]=t.slice(0,-1).split("(");if(e==="drop-shadow")return t;const[r]=n.match(Mg)||[];if(!r)return t;const i=n.replace(r,"");let s=sF.has(e)?1:0;return r!==n&&(s*=100),e+"("+s+i+")"}const aF=/\b([a-z-]*)\(.*?\)/gu,Tp={...wn,getAnimatableNone:t=>{const e=t.match(aF);return e?e.map(oF).join(" "):t}},xp={...wn,getAnimatableNone:t=>{const e=wn.parse(t);return wn.createTransformer(t)(e.map(r=>typeof r=="number"?0:typeof r=="object"?{...r,alpha:1}:r))}},G_={...ao,transform:Math.round},lF={rotate:mr,rotateX:mr,rotateY:mr,rotateZ:mr,scale:tu,scaleX:tu,scaleY:tu,scaleZ:tu,skew:mr,skewX:mr,skewY:mr,distance:K,translateX:K,translateY:K,translateZ:K,x:K,y:K,z:K,perspective:K,transformPerspective:K,opacity:$a,originX:D_,originY:D_,originZ:K},qg={borderWidth:K,borderTopWidth:K,borderRightWidth:K,borderBottomWidth:K,borderLeftWidth:K,borderRadius:K,borderTopLeftRadius:K,borderTopRightRadius:K,borderBottomRightRadius:K,borderBottomLeftRadius:K,width:K,maxWidth:K,height:K,maxHeight:K,top:K,right:K,bottom:K,left:K,inset:K,insetBlock:K,insetBlockStart:K,insetBlockEnd:K,insetInline:K,insetInlineStart:K,insetInlineEnd:K,padding:K,paddingTop:K,paddingRight:K,paddingBottom:K,paddingLeft:K,paddingBlock:K,paddingBlockStart:K,paddingBlockEnd:K,paddingInline:K,paddingInlineStart:K,paddingInlineEnd:K,margin:K,marginTop:K,marginRight:K,marginBottom:K,marginLeft:K,marginBlock:K,marginBlockStart:K,marginBlockEnd:K,marginInline:K,marginInlineStart:K,marginInlineEnd:K,fontSize:K,backgroundPositionX:K,backgroundPositionY:K,...lF,zIndex:G_,fillOpacity:$a,strokeOpacity:$a,numOctaves:G_},uF={...qg,color:We,backgroundColor:We,outlineColor:We,fill:We,stroke:We,borderColor:We,borderTopColor:We,borderRightColor:We,borderBottomColor:We,borderLeftColor:We,filter:Tp,WebkitFilter:Tp,mask:xp,WebkitMask:xp},VI=t=>uF[t],cF=new Set([Tp,xp]);function LI(t,e){let n=VI(t);return cF.has(n)||(n=wn),n.getAnimatableNone?n.getAnimatableNone(e):void 0}const hF=new Set(["auto","none","0"]);function dF(t,e,n){let r=0,i;for(;r<t.length&&!i;){const s=t[r];typeof s=="string"&&!hF.has(s)&&Ks(s).values.length&&(i=t[r]),r++}if(i&&n)for(const s of e)t[s]=LI(n,i)}class fF extends Bg{constructor(e,n,r,i,s){super(e,n,r,i,s,!0)}readKeyframes(){const{unresolvedKeyframes:e,element:n,name:r}=this;if(!n||!n.current)return;super.readKeyframes();for(let h=0;h<e.length;h++){let d=e[h];if(typeof d=="string"&&(d=d.trim(),Lg(d))){const p=AI(d,n.current);p!==void 0&&(e[h]=p),h===e.length-1&&(this.finalKeyframe=d)}}if(this.resolveNoneKeyframes(),!PI.has(r)||e.length!==2)return;const[i,s]=e,o=q_(i),a=q_(s),u=N_(i),c=N_(s);if(u!==c&&Rr[r]){this.needsMeasurement=!0;return}if(o!==a)if(B_(o)&&B_(a))for(let h=0;h<e.length;h++){const d=e[h];typeof d=="string"&&(e[h]=parseFloat(d))}else Rr[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:e,name:n}=this,r=[];for(let i=0;i<e.length;i++)(e[i]===null||iF(e[i]))&&r.push(i);r.length&&dF(e,r,n)}measureInitialState(){const{element:e,unresolvedKeyframes:n,name:r}=this;if(!e||!e.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Rr[r](e.measureViewportBox(),window.getComputedStyle(e.current)),n[0]=this.measuredOrigin;const i=n[n.length-1];i!==void 0&&e.getValue(r,i).jump(i,!1)}measureEndState(){var a;const{element:e,name:n,unresolvedKeyframes:r}=this;if(!e||!e.current)return;const i=e.getValue(n);i&&i.jump(this.measuredOrigin,!1);const s=r.length-1,o=r[s];r[s]=Rr[n](e.measureViewportBox(),window.getComputedStyle(e.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),(a=this.removedTransforms)!=null&&a.length&&this.removedTransforms.forEach(([u,c])=>{e.getValue(u).set(c)}),this.resolveNoneKeyframes()}}function MI(t,e,n){if(t==null)return[];if(t instanceof EventTarget)return[t];if(typeof t=="string"){let r=document;const i=(n==null?void 0:n[t])??r.querySelectorAll(t);return i?Array.from(i):[]}return Array.from(t).filter(r=>r!=null)}const OI=(t,e)=>e&&typeof t=="number"?e.transform(t):t;function Pu(t){return $S(t)&&"offsetHeight"in t&&!("ownerSVGElement"in t)}const{schedule:Gg}=rI(queueMicrotask,!1),pn={x:!1,y:!1};function FI(){return pn.x||pn.y}function pF(t){return t==="x"||t==="y"?pn[t]?null:(pn[t]=!0,()=>{pn[t]=!1}):pn.x||pn.y?null:(pn.x=pn.y=!0,()=>{pn.x=pn.y=!1})}function jI(t,e){const n=MI(t),r=new AbortController,i={passive:!0,...e,signal:r.signal};return[n,i,()=>r.abort()]}function mF(t){return!(t.pointerType==="touch"||FI())}function gF(t,e,n={}){const[r,i,s]=jI(t,n);return r.forEach(o=>{let a=!1,u=!1,c;const h=()=>{o.removeEventListener("pointerleave",E)},d=C=>{c&&(c(C),c=void 0),h()},p=C=>{a=!1,window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p),u&&(u=!1,d(C))},g=()=>{a=!0,window.addEventListener("pointerup",p,i),window.addEventListener("pointercancel",p,i)},E=C=>{if(C.pointerType!=="touch"){if(a){u=!0;return}d(C)}},A=C=>{if(!mF(C))return;u=!1;const w=e(o,C);typeof w=="function"&&(c=w,o.addEventListener("pointerleave",E,i))};o.addEventListener("pointerenter",A,i),o.addEventListener("pointerdown",g,i)}),s}const UI=(t,e)=>e?t===e?!0:UI(t,e.parentElement):!1,Kg=t=>t.pointerType==="mouse"?typeof t.button!="number"||t.button<=0:t.isPrimary!==!1,yF=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function vF(t){return yF.has(t.tagName)||t.isContentEditable===!0}const _F=new Set(["INPUT","SELECT","TEXTAREA"]);function wF(t){return _F.has(t.tagName)||t.isContentEditable===!0}const Ru=new WeakSet;function K_(t){return e=>{e.key==="Enter"&&t(e)}}function kd(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const EF=(t,e)=>{const n=t.currentTarget;if(!n)return;const r=K_(()=>{if(Ru.has(n))return;kd(n,"down");const i=K_(()=>{kd(n,"up")}),s=()=>kd(n,"cancel");n.addEventListener("keyup",i,e),n.addEventListener("blur",s,e)});n.addEventListener("keydown",r,e),n.addEventListener("blur",()=>n.removeEventListener("keydown",r),e)};function Q_(t){return Kg(t)&&!FI()}const Y_=new WeakSet;function TF(t,e,n={}){const[r,i,s]=jI(t,n),o=a=>{const u=a.currentTarget;if(!Q_(a)||Y_.has(a))return;Ru.add(u),n.stopPropagation&&Y_.add(a);const c=e(u,a),h=(g,E)=>{window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",p),Ru.has(u)&&Ru.delete(u),Q_(g)&&typeof c=="function"&&c(g,{success:E})},d=g=>{h(g,u===window||u===document||n.useGlobalTarget||UI(u,g.target))},p=g=>{h(g,!1)};window.addEventListener("pointerup",d,i),window.addEventListener("pointercancel",p,i)};return r.forEach(a=>{(n.useGlobalTarget?window:a).addEventListener("pointerdown",o,i),Pu(a)&&(a.addEventListener("focus",c=>EF(c,i)),!vF(a)&&!a.hasAttribute("tabindex")&&(a.tabIndex=0))}),s}function Qg(t){return $S(t)&&"ownerSVGElement"in t}const ku=new WeakMap;let gr;const BI=(t,e,n)=>(r,i)=>i&&i[0]?i[0][t+"Size"]:Qg(r)&&"getBBox"in r?r.getBBox()[e]:r[n],xF=BI("inline","width","offsetWidth"),SF=BI("block","height","offsetHeight");function IF({target:t,borderBoxSize:e}){var n;(n=ku.get(t))==null||n.forEach(r=>{r(t,{get width(){return xF(t,e)},get height(){return SF(t,e)}})})}function AF(t){t.forEach(IF)}function CF(){typeof ResizeObserver>"u"||(gr=new ResizeObserver(AF))}function PF(t,e){gr||CF();const n=MI(t);return n.forEach(r=>{let i=ku.get(r);i||(i=new Set,ku.set(r,i)),i.add(e),gr==null||gr.observe(r)}),()=>{n.forEach(r=>{const i=ku.get(r);i==null||i.delete(e),i!=null&&i.size||gr==null||gr.unobserve(r)})}}const bu=new Set;let vs;function RF(){vs=()=>{const t={get width(){return window.innerWidth},get height(){return window.innerHeight}};bu.forEach(e=>e(t))},window.addEventListener("resize",vs)}function kF(t){return bu.add(t),vs||RF(),()=>{bu.delete(t),!bu.size&&typeof vs=="function"&&(window.removeEventListener("resize",vs),vs=void 0)}}function X_(t,e){return typeof t=="function"?kF(t):PF(t,e)}function bF(t){return Qg(t)&&t.tagName==="svg"}const NF=[...DI,We,wn],DF=t=>NF.find(NI(t)),J_=()=>({translate:0,scale:1,origin:0,originPoint:0}),_s=()=>({x:J_(),y:J_()}),Z_=()=>({min:0,max:0}),Ke=()=>({x:Z_(),y:Z_()}),VF=new WeakMap;function ph(t){return t!==null&&typeof t=="object"&&typeof t.start=="function"}function Wa(t){return typeof t=="string"||Array.isArray(t)}const Yg=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Xg=["initial",...Yg];function mh(t){return ph(t.animate)||Xg.some(e=>Wa(t[e]))}function zI(t){return!!(mh(t)||t.variants)}function LF(t,e,n){for(const r in e){const i=e[r],s=n[r];if(lt(i))t.addValue(r,i);else if(lt(s))t.addValue(r,Qs(i,{owner:t}));else if(s!==i)if(t.hasValue(r)){const o=t.getValue(r);o.liveStyle===!0?o.jump(i):o.hasAnimated||o.set(i)}else{const o=t.getStaticValue(r);t.addValue(r,Qs(o!==void 0?o:i,{owner:t}))}}for(const r in n)e[r]===void 0&&t.removeValue(r);return e}const Sp={current:null},$I={current:!1},MF=typeof window<"u";function OF(){if($I.current=!0,!!MF)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>Sp.current=t.matches;t.addEventListener("change",e),e()}else Sp.current=!1}const ew=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let Sc={};function WI(t){Sc=t}function FF(){return Sc}class jF{scrapeMotionValuesFromProps(e,n,r){return{}}constructor({parent:e,props:n,presenceContext:r,reducedMotionConfig:i,skipAnimations:s,blockInitialAnimation:o,visualState:a},u={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Bg,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const g=Dt.now();this.renderScheduledAt<g&&(this.renderScheduledAt=g,_e.render(this.render,!1,!0))};const{latestValues:c,renderState:h}=a;this.latestValues=c,this.baseTarget={...c},this.initialValues=n.initial?{...c}:{},this.renderState=h,this.parent=e,this.props=n,this.presenceContext=r,this.depth=e?e.depth+1:0,this.reducedMotionConfig=i,this.skipAnimationsConfig=s,this.options=u,this.blockInitialAnimation=!!o,this.isControllingVariants=mh(n),this.isVariantNode=zI(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:d,...p}=this.scrapeMotionValuesFromProps(n,{},this);for(const g in p){const E=p[g];c[g]!==void 0&&lt(E)&&E.set(c[g])}}mount(e){var n,r;if(this.hasBeenMounted)for(const i in this.initialValues)(n=this.values.get(i))==null||n.jump(this.initialValues[i]),this.latestValues[i]=this.initialValues[i];this.current=e,VF.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((i,s)=>this.bindToMotionValue(s,i)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:($I.current||OF(),this.shouldReduceMotion=Sp.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(r=this.parent)==null||r.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var e;this.projection&&this.projection.unmount(),Yr(this.notifyUpdate),Yr(this.render),this.valueSubscriptions.forEach(n=>n()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(e=this.parent)==null||e.removeChild(this);for(const n in this.events)this.events[n].clear();for(const n in this.features){const r=this.features[n];r&&(r.unmount(),r.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,n){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),n.accelerate&&SI.has(e)&&this.current instanceof HTMLElement){const{factory:o,keyframes:a,times:u,ease:c,duration:h}=n.accelerate,d=new TI({element:this.current,name:e,keyframes:a,times:u,ease:c,duration:Jt(h)}),p=o(d);this.valueSubscriptions.set(e,()=>{p(),d.cancel()});return}const r=uo.has(e);r&&this.onBindTransform&&this.onBindTransform();const i=n.on("change",o=>{this.latestValues[e]=o,this.props.onUpdate&&_e.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let s;typeof window<"u"&&window.MotionCheckAppearSync&&(s=window.MotionCheckAppearSync(this,e,n)),this.valueSubscriptions.set(e,()=>{i(),s&&s(),n.owner&&n.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in Sc){const n=Sc[e];if(!n)continue;const{isEnabled:r,Feature:i}=n;if(!this.features[e]&&i&&r(this.props)&&(this.features[e]=new i(this)),this.features[e]){const s=this.features[e];s.isMounted?s.update():(s.mount(),s.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Ke()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,n){this.latestValues[e]=n}update(e,n){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<ew.length;r++){const i=ew[r];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const s="on"+i,o=e[s];o&&(this.propEventSubscriptions[i]=this.on(i,o))}this.prevMotionValues=LF(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(e),()=>n.variantChildren.delete(e)}addValue(e,n){const r=this.values.get(e);n!==r&&(r&&this.removeValue(e),this.bindToMotionValue(e,n),this.values.set(e,n),this.latestValues[e]=n.get())}removeValue(e){this.values.delete(e);const n=this.valueSubscriptions.get(e);n&&(n(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,n){if(this.props.values&&this.props.values[e])return this.props.values[e];let r=this.values.get(e);return r===void 0&&n!==void 0&&(r=Qs(n===null?void 0:n,{owner:this}),this.addValue(e,r)),r}readValue(e,n){let r=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return r!=null&&(typeof r=="string"&&(zS(r)||WS(r))?r=parseFloat(r):!DF(r)&&wn.test(n)&&(r=LI(e,n)),this.setBaseTarget(e,lt(r)?r.get():r)),lt(r)?r.get():r}setBaseTarget(e,n){this.baseTarget[e]=n}getBaseTarget(e){var s;const{initial:n}=this.props;let r;if(typeof n=="string"||typeof n=="object"){const o=Wg(this.props,n,(s=this.presenceContext)==null?void 0:s.custom);o&&(r=o[e])}if(n&&r!==void 0)return r;const i=this.getBaseTargetFromProps(this.props,e);return i!==void 0&&!lt(i)?i:this.initialValues[e]!==void 0&&r===void 0?void 0:this.baseTarget[e]}on(e,n){return this.events[e]||(this.events[e]=new Ng),this.events[e].add(n)}notify(e,...n){this.events[e]&&this.events[e].notify(...n)}scheduleRenderMicrotask(){Gg.render(this.render)}}class HI extends jF{constructor(){super(...arguments),this.KeyframeResolver=fF}sortInstanceNodePosition(e,n){return e.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(e,n){const r=e.style;return r?r[n]:void 0}removeValueFromRenderState(e,{vars:n,style:r}){delete n[e],delete r[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;lt(e)&&(this.childSubscription=e.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}class ni{constructor(e){this.isMounted=!1,this.node=e}update(){}}function qI({top:t,left:e,right:n,bottom:r}){return{x:{min:e,max:n},y:{min:t,max:r}}}function UF({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}function BF(t,e){if(!e)return t;const n=e({x:t.left,y:t.top}),r=e({x:t.right,y:t.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function bd(t){return t===void 0||t===1}function Ip({scale:t,scaleX:e,scaleY:n}){return!bd(t)||!bd(e)||!bd(n)}function fi(t){return Ip(t)||GI(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function GI(t){return tw(t.x)||tw(t.y)}function tw(t){return t&&t!=="0%"}function Ic(t,e,n){const r=t-n,i=e*r;return n+i}function nw(t,e,n,r,i){return i!==void 0&&(t=Ic(t,i,r)),Ic(t,n,r)+e}function Ap(t,e=0,n=1,r,i){t.min=nw(t.min,e,n,r,i),t.max=nw(t.max,e,n,r,i)}function KI(t,{x:e,y:n}){Ap(t.x,e.translate,e.scale,e.originPoint),Ap(t.y,n.translate,n.scale,n.originPoint)}const rw=.999999999999,iw=1.0000000000001;function zF(t,e,n,r=!1){var a;const i=n.length;if(!i)return;e.x=e.y=1;let s,o;for(let u=0;u<i;u++){s=n[u],o=s.projectionDelta;const{visualElement:c}=s.options;c&&c.props.style&&c.props.style.display==="contents"||(r&&s.options.layoutScroll&&s.scroll&&s!==s.root&&(Pn(t.x,-s.scroll.offset.x),Pn(t.y,-s.scroll.offset.y)),o&&(e.x*=o.x.scale,e.y*=o.y.scale,KI(t,o)),r&&fi(s.latestValues)&&Nu(t,s.latestValues,(a=s.layout)==null?void 0:a.layoutBox))}e.x<iw&&e.x>rw&&(e.x=1),e.y<iw&&e.y>rw&&(e.y=1)}function Pn(t,e){t.min+=e,t.max+=e}function sw(t,e,n,r,i=.5){const s=Se(t.min,t.max,i);Ap(t,e,n,s,r)}function ow(t,e){return typeof t=="string"?parseFloat(t)/100*(e.max-e.min):t}function Nu(t,e,n){const r=n??t;sw(t.x,ow(e.x,r.x),e.scaleX,e.scale,e.originX),sw(t.y,ow(e.y,r.y),e.scaleY,e.scale,e.originY)}function QI(t,e){return qI(BF(t.getBoundingClientRect(),e))}function $F(t,e,n){const r=QI(t,n),{scroll:i}=e;return i&&(Pn(r.x,i.offset.x),Pn(r.y,i.offset.y)),r}const WF={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},HF=lo.length;function qF(t,e,n){let r="",i=!0;for(let s=0;s<HF;s++){const o=lo[s],a=t[o];if(a===void 0)continue;let u=!0;if(typeof a=="number")u=a===(o.startsWith("scale")?1:0);else{const c=parseFloat(a);u=o.startsWith("scale")?c===1:c===0}if(!u||n){const c=OI(a,qg[o]);if(!u){i=!1;const h=WF[o]||o;r+=`${h}(${c}) `}n&&(e[o]=c)}}return r=r.trim(),n?r=n(e,i?"":r):i&&(r="none"),r}function Jg(t,e,n){const{style:r,vars:i,transformOrigin:s}=t;let o=!1,a=!1;for(const u in e){const c=e[u];if(uo.has(u)){o=!0;continue}else if(sI(u)){i[u]=c;continue}else{const h=OI(c,qg[u]);u.startsWith("origin")?(a=!0,s[u]=h):r[u]=h}}if(e.transform||(o||n?r.transform=qF(e,t.transform,n):r.transform&&(r.transform="none")),a){const{originX:u="50%",originY:c="50%",originZ:h=0}=s;r.transformOrigin=`${u} ${c} ${h}`}}function YI(t,{style:e,vars:n},r,i){const s=t.style;let o;for(o in e)s[o]=e[o];i==null||i.applyProjectionStyles(s,r);for(o in n)s.setProperty(o,n[o])}function aw(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}const Lo={correct:(t,e)=>{if(!e.target)return t;if(typeof t=="string")if(K.test(t))t=parseFloat(t);else return t;const n=aw(t,e.target.x),r=aw(t,e.target.y);return`${n}% ${r}%`}},GF={correct:(t,{treeScale:e,projectionDelta:n})=>{const r=t,i=wn.parse(t);if(i.length>5)return r;const s=wn.createTransformer(t),o=typeof i[0]!="number"?1:0,a=n.x.scale*e.x,u=n.y.scale*e.y;i[0+o]/=a,i[1+o]/=u;const c=Se(a,u,.5);return typeof i[2+o]=="number"&&(i[2+o]/=c),typeof i[3+o]=="number"&&(i[3+o]/=c),s(i)}},Cp={borderRadius:{...Lo,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Lo,borderTopRightRadius:Lo,borderBottomLeftRadius:Lo,borderBottomRightRadius:Lo,boxShadow:GF};function XI(t,{layout:e,layoutId:n}){return uo.has(t)||t.startsWith("origin")||(e||n!==void 0)&&(!!Cp[t]||t==="opacity")}function Zg(t,e,n){var o;const r=t.style,i=e==null?void 0:e.style,s={};if(!r)return s;for(const a in r)(lt(r[a])||i&&lt(i[a])||XI(a,t)||((o=n==null?void 0:n.getValue(a))==null?void 0:o.liveStyle)!==void 0)&&(s[a]=r[a]);return s}function KF(t){return window.getComputedStyle(t)}class QF extends HI{constructor(){super(...arguments),this.type="html",this.renderInstance=YI}readValueFromInstance(e,n){var r;if(uo.has(n))return(r=this.projection)!=null&&r.isProjecting?fp(n):m4(e,n);{const i=KF(e),s=(sI(n)?i.getPropertyValue(n):i[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:n}){return QI(e,n)}build(e,n,r){Jg(e,n,r.transformTemplate)}scrapeMotionValuesFromProps(e,n,r){return Zg(e,n,r)}}const YF={offset:"stroke-dashoffset",array:"stroke-dasharray"},XF={offset:"strokeDashoffset",array:"strokeDasharray"};function JF(t,e,n=1,r=0,i=!0){t.pathLength=1;const s=i?YF:XF;t[s.offset]=`${-r}`,t[s.array]=`${e} ${n}`}const ZF=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function JI(t,{attrX:e,attrY:n,attrScale:r,pathLength:i,pathSpacing:s=1,pathOffset:o=0,...a},u,c,h){if(Jg(t,a,c),u){t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox);return}t.attrs=t.style,t.style={};const{attrs:d,style:p}=t;d.transform&&(p.transform=d.transform,delete d.transform),(p.transform||d.transformOrigin)&&(p.transformOrigin=d.transformOrigin??"50% 50%",delete d.transformOrigin),p.transform&&(p.transformBox=(h==null?void 0:h.transformBox)??"fill-box",delete d.transformBox);for(const g of ZF)d[g]!==void 0&&(p[g]=d[g],delete d[g]);e!==void 0&&(d.x=e),n!==void 0&&(d.y=n),r!==void 0&&(d.scale=r),i!==void 0&&JF(d,i,s,o,!1)}const ZI=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),eA=t=>typeof t=="string"&&t.toLowerCase()==="svg";function ej(t,e,n,r){YI(t,e,void 0,r);for(const i in e.attrs)t.setAttribute(ZI.has(i)?i:Hg(i),e.attrs[i])}function tA(t,e,n){const r=Zg(t,e,n);for(const i in t)if(lt(t[i])||lt(e[i])){const s=lo.indexOf(i)!==-1?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i;r[s]=t[i]}return r}class tj extends HI{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Ke}getBaseTargetFromProps(e,n){return e[n]}readValueFromInstance(e,n){if(uo.has(n)){const r=VI(n);return r&&r.default||0}return n=ZI.has(n)?n:Hg(n),e.getAttribute(n)}scrapeMotionValuesFromProps(e,n,r){return tA(e,n,r)}build(e,n,r){JI(e,n,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(e,n,r,i){ej(e,n,r,i)}mount(e){this.isSVGTag=eA(e.tagName),super.mount(e)}}const nj=Xg.length;function nA(t){if(!t)return;if(!t.isControllingVariants){const n=t.parent?nA(t.parent)||{}:{};return t.props.initial!==void 0&&(n.initial=t.props.initial),n}const e={};for(let n=0;n<nj;n++){const r=Xg[n],i=t.props[r];(Wa(i)||i===!1)&&(e[r]=i)}return e}function rA(t,e){if(!Array.isArray(e))return!1;const n=e.length;if(n!==t.length)return!1;for(let r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}const rj=[...Yg].reverse(),ij=Yg.length;function sj(t){return e=>Promise.all(e.map(({animation:n,options:r})=>nF(t,n,r)))}function oj(t){let e=sj(t),n=lw(),r=!0,i=!1;const s=c=>(h,d)=>{var g;const p=Ai(t,d,c==="exit"?(g=t.presenceContext)==null?void 0:g.custom:void 0);if(p){const{transition:E,transitionEnd:A,...C}=p;h={...h,...C,...A}}return h};function o(c){e=c(t)}function a(c){const{props:h}=t,d=nA(t.parent)||{},p=[],g=new Set;let E={},A=1/0;for(let w=0;w<ij;w++){const v=rj[w],T=n[v],N=h[v]!==void 0?h[v]:d[v],L=Wa(N),O=v===c?T.isActive:null;O===!1&&(A=w);let S=N===d[v]&&N!==h[v]&&L;if(S&&(r||i)&&t.manuallyAnimateOnMount&&(S=!1),T.protectedKeys={...E},!T.isActive&&O===null||!N&&!T.prevProp||ph(N)||typeof N=="boolean")continue;if(v==="exit"&&T.isActive&&O!==!0){T.prevResolvedValues&&(E={...E,...T.prevResolvedValues});continue}const y=aj(T.prevProp,N);let I=y||v===c&&T.isActive&&!S&&L||w>A&&L,x=!1;const k=Array.isArray(N)?N:[N];let b=k.reduce(s(v),{});O===!1&&(b={});const{prevResolvedValues:R={}}=T,me={...R,...b},re=U=>{I=!0,g.has(U)&&(x=!0,g.delete(U)),T.needsAnimating[U]=!0;const G=t.getValue(U);G&&(G.liveStyle=!1)};for(const U in me){const G=b[U],W=R[U];if(E.hasOwnProperty(U))continue;let J=!1;_p(G)&&_p(W)?J=!rA(G,W):J=G!==W,J?G!=null?re(U):g.add(U):G!==void 0&&g.has(U)?re(U):T.protectedKeys[U]=!0}T.prevProp=N,T.prevResolvedValues=b,T.isActive&&(E={...E,...b}),(r||i)&&t.blockInitialAnimation&&(I=!1);const ye=S&&y;I&&(!ye||x)&&p.push(...k.map(U=>{const G={type:v};if(typeof U=="string"&&(r||i)&&!ye&&t.manuallyAnimateOnMount&&t.parent){const{parent:W}=t,J=Ai(W,U);if(W.enteringChildren&&J){const{delayChildren:X}=J.transition||{};G.delay=II(W.enteringChildren,t,X)}}return{animation:U,options:G}}))}if(g.size){const w={};if(typeof h.initial!="boolean"){const v=Ai(t,Array.isArray(h.initial)?h.initial[0]:h.initial);v&&v.transition&&(w.transition=v.transition)}g.forEach(v=>{const T=t.getBaseTarget(v),N=t.getValue(v);N&&(N.liveStyle=!0),w[v]=T??null}),p.push({animation:w})}let C=!!p.length;return r&&(h.initial===!1||h.initial===h.animate)&&!t.manuallyAnimateOnMount&&(C=!1),r=!1,i=!1,C?e(p):Promise.resolve()}function u(c,h){var p;if(n[c].isActive===h)return Promise.resolve();(p=t.variantChildren)==null||p.forEach(g=>{var E;return(E=g.animationState)==null?void 0:E.setActive(c,h)}),n[c].isActive=h;const d=a(c);for(const g in n)n[g].protectedKeys={};return d}return{animateChanges:a,setActive:u,setAnimateFunction:o,getState:()=>n,reset:()=>{n=lw(),i=!0}}}function aj(t,e){return typeof e=="string"?e!==t:Array.isArray(e)?!rA(e,t):!1}function li(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function lw(){return{animate:li(!0),whileInView:li(),whileHover:li(),whileTap:li(),whileDrag:li(),whileFocus:li(),exit:li()}}function Pp(t,e){t.min=e.min,t.max=e.max}function fn(t,e){Pp(t.x,e.x),Pp(t.y,e.y)}function uw(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}const iA=1e-4,lj=1-iA,uj=1+iA,sA=.01,cj=0-sA,hj=0+sA;function Vt(t){return t.max-t.min}function dj(t,e,n){return Math.abs(t-e)<=n}function cw(t,e,n,r=.5){t.origin=r,t.originPoint=Se(e.min,e.max,t.origin),t.scale=Vt(n)/Vt(e),t.translate=Se(n.min,n.max,t.origin)-t.originPoint,(t.scale>=lj&&t.scale<=uj||isNaN(t.scale))&&(t.scale=1),(t.translate>=cj&&t.translate<=hj||isNaN(t.translate))&&(t.translate=0)}function la(t,e,n,r){cw(t.x,e.x,n.x,r?r.originX:void 0),cw(t.y,e.y,n.y,r?r.originY:void 0)}function hw(t,e,n,r=0){const i=r?Se(n.min,n.max,r):n.min;t.min=i+e.min,t.max=t.min+Vt(e)}function fj(t,e,n,r){hw(t.x,e.x,n.x,r==null?void 0:r.x),hw(t.y,e.y,n.y,r==null?void 0:r.y)}function dw(t,e,n,r=0){const i=r?Se(n.min,n.max,r):n.min;t.min=e.min-i,t.max=t.min+Vt(e)}function Ac(t,e,n,r){dw(t.x,e.x,n.x,r==null?void 0:r.x),dw(t.y,e.y,n.y,r==null?void 0:r.y)}function fw(t,e,n,r,i){return t-=e,t=Ic(t,1/n,r),i!==void 0&&(t=Ic(t,1/i,r)),t}function pj(t,e=0,n=1,r=.5,i,s=t,o=t){if(Fn.test(e)&&(e=parseFloat(e),e=Se(o.min,o.max,e/100)-o.min),typeof e!="number")return;let a=Se(s.min,s.max,r);t===s&&(a-=e),t.min=fw(t.min,e,n,a,i),t.max=fw(t.max,e,n,a,i)}function pw(t,e,[n,r,i],s,o){pj(t,e[n],e[r],e[i],e.scale,s,o)}const mj=["x","scaleX","originX"],gj=["y","scaleY","originY"];function mw(t,e,n,r){pw(t.x,e,mj,n?n.x:void 0,r?r.x:void 0),pw(t.y,e,gj,n?n.y:void 0,r?r.y:void 0)}function gw(t){return t.translate===0&&t.scale===1}function oA(t){return gw(t.x)&&gw(t.y)}function yw(t,e){return t.min===e.min&&t.max===e.max}function yj(t,e){return yw(t.x,e.x)&&yw(t.y,e.y)}function vw(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function aA(t,e){return vw(t.x,e.x)&&vw(t.y,e.y)}function _w(t){return Vt(t.x)/Vt(t.y)}function ww(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}function An(t){return[t("x"),t("y")]}function vj(t,e,n){let r="";const i=t.x.translate/e.x,s=t.y.translate/e.y,o=(n==null?void 0:n.z)||0;if((i||s||o)&&(r=`translate3d(${i}px, ${s}px, ${o}px) `),(e.x!==1||e.y!==1)&&(r+=`scale(${1/e.x}, ${1/e.y}) `),n){const{transformPerspective:c,rotate:h,rotateX:d,rotateY:p,skewX:g,skewY:E}=n;c&&(r=`perspective(${c}px) ${r}`),h&&(r+=`rotate(${h}deg) `),d&&(r+=`rotateX(${d}deg) `),p&&(r+=`rotateY(${p}deg) `),g&&(r+=`skewX(${g}deg) `),E&&(r+=`skewY(${E}deg) `)}const a=t.x.scale*e.x,u=t.y.scale*e.y;return(a!==1||u!==1)&&(r+=`scale(${a}, ${u})`),r||"none"}const lA=["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"],_j=lA.length,Ew=t=>typeof t=="string"?parseFloat(t):t,Tw=t=>typeof t=="number"||K.test(t);function wj(t,e,n,r,i,s){i?(t.opacity=Se(0,n.opacity??1,Ej(r)),t.opacityExit=Se(e.opacity??1,0,Tj(r))):s&&(t.opacity=Se(e.opacity??1,n.opacity??1,r));for(let o=0;o<_j;o++){const a=lA[o];let u=xw(e,a),c=xw(n,a);if(u===void 0&&c===void 0)continue;u||(u=0),c||(c=0),u===0||c===0||Tw(u)===Tw(c)?(t[a]=Math.max(Se(Ew(u),Ew(c),r),0),(Fn.test(c)||Fn.test(u))&&(t[a]+="%")):t[a]=c}(e.rotate||n.rotate)&&(t.rotate=Se(e.rotate||0,n.rotate||0,r))}function xw(t,e){return t[e]!==void 0?t[e]:t.borderRadius}const Ej=uA(0,.5,ZS),Tj=uA(.5,.95,ln);function uA(t,e,n){return r=>r<t?0:r>e?1:n(za(t,e,r))}function xj(t,e,n){const r=lt(t)?t:Qs(t);return r.start($g("",r,e,n)),r.animation}function Ha(t,e,n,r={passive:!0}){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n)}const Sj=(t,e)=>t.depth-e.depth;class Ij{constructor(){this.children=[],this.isDirty=!1}add(e){kg(this.children,e),this.isDirty=!0}remove(e){_c(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(Sj),this.isDirty=!1,this.children.forEach(e)}}function Aj(t,e){const n=Dt.now(),r=({timestamp:i})=>{const s=i-n;s>=e&&(Yr(r),t(s-e))};return _e.setup(r,!0),()=>Yr(r)}function Du(t){return lt(t)?t.get():t}class Cj{constructor(){this.members=[]}add(e){kg(this.members,e);for(let n=this.members.length-1;n>=0;n--){const r=this.members[n];if(r===e||r===this.lead||r===this.prevLead)continue;const i=r.instance;(!i||i.isConnected===!1)&&!r.snapshot&&(_c(this.members,r),r.unmount())}e.scheduleRender()}remove(e){if(_c(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(e){var n;for(let r=this.members.indexOf(e)-1;r>=0;r--){const i=this.members[r];if(i.isPresent!==!1&&((n=i.instance)==null?void 0:n.isConnected)!==!1)return this.promote(i),!0}return!1}promote(e,n){var i;const r=this.lead;if(e!==r&&(this.prevLead=r,this.lead=e,e.show(),r)){r.updateSnapshot(),e.scheduleRender();const{layoutDependency:s}=r.options,{layoutDependency:o}=e.options;(s===void 0||s!==o)&&(e.resumeFrom=r,n&&(r.preserveOpacity=!0),r.snapshot&&(e.snapshot=r.snapshot,e.snapshot.latestValues=r.animationValues||r.latestValues),(i=e.root)!=null&&i.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(e=>{var n,r,i,s,o;(r=(n=e.options).onExitComplete)==null||r.call(n),(o=(i=e.resumingFrom)==null?void 0:(s=i.options).onExitComplete)==null||o.call(s)})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){var e;(e=this.lead)!=null&&e.snapshot&&(this.lead.snapshot=void 0)}}const Vu={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Nd=["","X","Y","Z"],Pj=1e3;let Rj=0;function Dd(t,e,n,r){const{latestValues:i}=e;i[t]&&(n[t]=i[t],e.setStaticValue(t,0),r&&(r[t]=0))}function cA(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;const{visualElement:e}=t.options;if(!e)return;const n=kI(e);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:i,layoutId:s}=t.options;window.MotionCancelOptimisedAnimation(n,"transform",_e,!(i||s))}const{parent:r}=t;r&&!r.hasCheckedOptimisedAppear&&cA(r)}function hA({attachResizeListener:t,defaultParent:e,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(o={},a=e==null?void 0:e()){this.id=Rj++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(Nj),this.nodes.forEach(Fj),this.nodes.forEach(jj),this.nodes.forEach(Dj)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=a?a.root||a:this,this.path=a?[...a.path,a]:[],this.parent=a,this.depth=a?a.depth+1:0;for(let u=0;u<this.path.length;u++)this.path[u].shouldResetTransform=!0;this.root===this&&(this.nodes=new Ij)}addEventListener(o,a){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new Ng),this.eventHandlers.get(o).add(a)}notifyListeners(o,...a){const u=this.eventHandlers.get(o);u&&u.notify(...a)}hasListeners(o){return this.eventHandlers.has(o)}mount(o){if(this.instance)return;this.isSVG=Qg(o)&&!bF(o),this.instance=o;const{layoutId:a,layout:u,visualElement:c}=this.options;if(c&&!c.current&&c.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(u||a)&&(this.isLayoutDirty=!0),t){let h,d=0;const p=()=>this.root.updateBlockedByResize=!1;_e.read(()=>{d=window.innerWidth}),t(o,()=>{const g=window.innerWidth;g!==d&&(d=g,this.root.updateBlockedByResize=!0,h&&h(),h=Aj(p,250),Vu.hasAnimatedSinceResize&&(Vu.hasAnimatedSinceResize=!1,this.nodes.forEach(Aw)))})}a&&this.root.registerSharedNode(a,this),this.options.animate!==!1&&c&&(a||u)&&this.addEventListener("didUpdate",({delta:h,hasLayoutChanged:d,hasRelativeLayoutChanged:p,layout:g})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const E=this.options.transition||c.getDefaultTransition()||Wj,{onLayoutAnimationStart:A,onLayoutAnimationComplete:C}=c.getProps(),w=!this.targetLayout||!aA(this.targetLayout,g),v=!d&&p;if(this.options.layoutRoot||this.resumeFrom||v||d&&(w||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const T={...zg(E,"layout"),onPlay:A,onComplete:C};(c.shouldReduceMotion||this.options.layoutRoot)&&(T.delay=0,T.type=!1),this.startAnimation(T),this.setAnimationOrigin(h,v)}else d||Aw(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=g})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Yr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(Uj),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&cA(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let h=0;h<this.path.length;h++){const d=this.path[h];d.shouldResetTransform=!0,(typeof d.latestValues.x=="string"||typeof d.latestValues.y=="string")&&(d.isLayoutDirty=!0),d.updateScroll("snapshot"),d.options.layoutRoot&&d.willUpdate(!1)}const{layoutId:a,layout:u}=this.options;if(a===void 0&&!u)return;const c=this.getTransformTemplate();this.prevTransformTemplateValue=c?c(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const u=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),u&&this.nodes.forEach(Lj),this.nodes.forEach(Sw);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Iw);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(Mj),this.nodes.forEach(Oj),this.nodes.forEach(kj),this.nodes.forEach(bj)):this.nodes.forEach(Iw),this.clearAllSnapshots();const a=Dt.now();st.delta=Un(0,1e3/60,a-st.timestamp),st.timestamp=a,st.isProcessing=!0,Sd.update.process(st),Sd.preRender.process(st),Sd.render.process(st),st.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Gg.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Vj),this.sharedNodes.forEach(Bj)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,_e.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){_e.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Vt(this.snapshot.measuredBox.x)&&!Vt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let u=0;u<this.path.length;u++)this.path[u].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=Ke()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:a}=this.options;a&&a.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let a=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(a=!1),a&&this.instance){const u=r(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:u,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:u}}}resetTransform(){if(!i)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,a=this.projectionDelta&&!oA(this.projectionDelta),u=this.getTransformTemplate(),c=u?u(this.latestValues,""):void 0,h=c!==this.prevTransformTemplateValue;o&&this.instance&&(a||fi(this.latestValues)||h)&&(i(this.instance,c),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const a=this.measurePageBox();let u=this.removeElementScroll(a);return o&&(u=this.removeTransform(u)),Hj(u),{animationId:this.root.animationId,measuredBox:a,layoutBox:u,latestValues:{},source:this.id}}measurePageBox(){var c;const{visualElement:o}=this.options;if(!o)return Ke();const a=o.measureViewportBox();if(!(((c=this.scroll)==null?void 0:c.wasRoot)||this.path.some(qj))){const{scroll:h}=this.root;h&&(Pn(a.x,h.offset.x),Pn(a.y,h.offset.y))}return a}removeElementScroll(o){var u;const a=Ke();if(fn(a,o),(u=this.scroll)!=null&&u.wasRoot)return a;for(let c=0;c<this.path.length;c++){const h=this.path[c],{scroll:d,options:p}=h;h!==this.root&&d&&p.layoutScroll&&(d.wasRoot&&fn(a,o),Pn(a.x,d.offset.x),Pn(a.y,d.offset.y))}return a}applyTransform(o,a=!1,u){var h,d;const c=u||Ke();fn(c,o);for(let p=0;p<this.path.length;p++){const g=this.path[p];!a&&g.options.layoutScroll&&g.scroll&&g!==g.root&&(Pn(c.x,-g.scroll.offset.x),Pn(c.y,-g.scroll.offset.y)),fi(g.latestValues)&&Nu(c,g.latestValues,(h=g.layout)==null?void 0:h.layoutBox)}return fi(this.latestValues)&&Nu(c,this.latestValues,(d=this.layout)==null?void 0:d.layoutBox),c}removeTransform(o){var u;const a=Ke();fn(a,o);for(let c=0;c<this.path.length;c++){const h=this.path[c];if(!fi(h.latestValues))continue;let d;h.instance&&(Ip(h.latestValues)&&h.updateSnapshot(),d=Ke(),fn(d,h.measurePageBox())),mw(a,h.latestValues,(u=h.snapshot)==null?void 0:u.layoutBox,d)}return fi(this.latestValues)&&mw(a,this.latestValues),a}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==st.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var g;const a=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=a.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=a.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=a.isSharedProjectionDirty);const u=!!this.resumingFrom||this!==a;if(!(o||u&&this.isSharedProjectionDirty||this.isProjectionDirty||(g=this.parent)!=null&&g.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:h,layoutId:d}=this.options;if(!this.layout||!(h||d))return;this.resolvedRelativeTargetAt=st.timestamp;const p=this.getClosestProjectingParent();p&&this.linkedParentVersion!==p.layoutVersion&&!p.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&p&&p.layout?this.createRelativeTarget(p,this.layout.layoutBox,p.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Ke(),this.targetWithTransforms=Ke()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),fj(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):fn(this.target,this.layout.layoutBox),KI(this.target,this.targetDelta)):fn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&p&&!!p.resumingFrom==!!this.resumingFrom&&!p.options.layoutScroll&&p.target&&this.animationProgress!==1?this.createRelativeTarget(p,this.target,p.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Ip(this.parent.latestValues)||GI(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(o,a,u){this.relativeParent=o,this.linkedParentVersion=o.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ke(),this.relativeTargetOrigin=Ke(),Ac(this.relativeTargetOrigin,a,u,this.options.layoutAnchor||void 0),fn(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var E;const o=this.getLead(),a=!!this.resumingFrom||this!==o;let u=!0;if((this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty)&&(u=!1),a&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(u=!1),this.resolvedRelativeTargetAt===st.timestamp&&(u=!1),u)return;const{layout:c,layoutId:h}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(c||h))return;fn(this.layoutCorrected,this.layout.layoutBox);const d=this.treeScale.x,p=this.treeScale.y;zF(this.layoutCorrected,this.treeScale,this.path,a),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=Ke());const{target:g}=o;if(!g){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(uw(this.prevProjectionDelta.x,this.projectionDelta.x),uw(this.prevProjectionDelta.y,this.projectionDelta.y)),la(this.projectionDelta,this.layoutCorrected,g,this.latestValues),(this.treeScale.x!==d||this.treeScale.y!==p||!ww(this.projectionDelta.x,this.prevProjectionDelta.x)||!ww(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",g))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){var a;if((a=this.options.visualElement)==null||a.scheduleRender(),o){const u=this.getStack();u&&u.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=_s(),this.projectionDelta=_s(),this.projectionDeltaWithTransform=_s()}setAnimationOrigin(o,a=!1){const u=this.snapshot,c=u?u.latestValues:{},h={...this.latestValues},d=_s();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!a;const p=Ke(),g=u?u.source:void 0,E=this.layout?this.layout.source:void 0,A=g!==E,C=this.getStack(),w=!C||C.members.length<=1,v=!!(A&&!w&&this.options.crossfade===!0&&!this.path.some($j));this.animationProgress=0;let T;this.mixTargetDelta=N=>{const L=N/1e3;Cw(d.x,o.x,L),Cw(d.y,o.y,L),this.setTargetDelta(d),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Ac(p,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),zj(this.relativeTarget,this.relativeTargetOrigin,p,L),T&&yj(this.relativeTarget,T)&&(this.isProjectionDirty=!1),T||(T=Ke()),fn(T,this.relativeTarget)),A&&(this.animationValues=h,wj(h,c,this.latestValues,L,v,w)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=L},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){var a,u,c;this.notifyListeners("animationStart"),(a=this.currentAnimation)==null||a.stop(),(c=(u=this.resumingFrom)==null?void 0:u.currentAnimation)==null||c.stop(),this.pendingAnimation&&(Yr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=_e.update(()=>{Vu.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Qs(0)),this.motionValue.jump(0,!1),this.currentAnimation=xj(this.motionValue,[0,1e3],{...o,velocity:0,isSync:!0,onUpdate:h=>{this.mixTargetDelta(h),o.onUpdate&&o.onUpdate(h)},onStop:()=>{},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Pj),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:a,target:u,layout:c,latestValues:h}=o;if(!(!a||!u||!c)){if(this!==o&&this.layout&&c&&dA(this.options.animationType,this.layout.layoutBox,c.layoutBox)){u=this.target||Ke();const d=Vt(this.layout.layoutBox.x);u.x.min=o.target.x.min,u.x.max=u.x.min+d;const p=Vt(this.layout.layoutBox.y);u.y.min=o.target.y.min,u.y.max=u.y.min+p}fn(a,u),Nu(a,h),la(this.projectionDeltaWithTransform,this.layoutCorrected,a,h)}}registerSharedNode(o,a){this.sharedNodes.has(o)||this.sharedNodes.set(o,new Cj),this.sharedNodes.get(o).add(a);const c=a.options.initialPromotionConfig;a.promote({transition:c?c.transition:void 0,preserveFollowOpacity:c&&c.shouldPreserveFollowOpacity?c.shouldPreserveFollowOpacity(a):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var a;const{layoutId:o}=this.options;return o?((a=this.getStack())==null?void 0:a.lead)||this:this}getPrevLead(){var a;const{layoutId:o}=this.options;return o?(a=this.getStack())==null?void 0:a.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:a,preserveFollowOpacity:u}={}){const c=this.getStack();c&&c.promote(this,u),o&&(this.projectionDelta=void 0,this.needsReset=!0),a&&this.setOptions({transition:a})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let a=!1;const{latestValues:u}=o;if((u.z||u.rotate||u.rotateX||u.rotateY||u.rotateZ||u.skewX||u.skewY)&&(a=!0),!a)return;const c={};u.z&&Dd("z",o,c,this.animationValues);for(let h=0;h<Nd.length;h++)Dd(`rotate${Nd[h]}`,o,c,this.animationValues),Dd(`skew${Nd[h]}`,o,c,this.animationValues);o.render();for(const h in c)o.setStaticValue(h,c[h]),this.animationValues&&(this.animationValues[h]=c[h]);o.scheduleRender()}applyProjectionStyles(o,a){if(!this.instance||this.isSVG)return;if(!this.isVisible){o.visibility="hidden";return}const u=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,o.visibility="",o.opacity="",o.pointerEvents=Du(a==null?void 0:a.pointerEvents)||"",o.transform=u?u(this.latestValues,""):"none";return}const c=this.getLead();if(!this.projectionDelta||!this.layout||!c.target){this.options.layoutId&&(o.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,o.pointerEvents=Du(a==null?void 0:a.pointerEvents)||""),this.hasProjected&&!fi(this.latestValues)&&(o.transform=u?u({},""):"none",this.hasProjected=!1);return}o.visibility="";const h=c.animationValues||c.latestValues;this.applyTransformsToTarget();let d=vj(this.projectionDeltaWithTransform,this.treeScale,h);u&&(d=u(h,d)),o.transform=d;const{x:p,y:g}=this.projectionDelta;o.transformOrigin=`${p.origin*100}% ${g.origin*100}% 0`,c.animationValues?o.opacity=c===this?h.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:h.opacityExit:o.opacity=c===this?h.opacity!==void 0?h.opacity:"":h.opacityExit!==void 0?h.opacityExit:0;for(const E in Cp){if(h[E]===void 0)continue;const{correct:A,applyTo:C,isCSSVariable:w}=Cp[E],v=d==="none"?h[E]:A(h[E],c);if(C){const T=C.length;for(let N=0;N<T;N++)o[C[N]]=v}else w?this.options.visualElement.renderState.vars[E]=v:o[E]=v}this.options.layoutId&&(o.pointerEvents=c===this?Du(a==null?void 0:a.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var a;return(a=o.currentAnimation)==null?void 0:a.stop()}),this.root.nodes.forEach(Sw),this.root.sharedNodes.clear()}}}function kj(t){t.updateLayout()}function bj(t){var n;const e=((n=t.resumeFrom)==null?void 0:n.snapshot)||t.snapshot;if(t.isLead()&&t.layout&&e&&t.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:i}=t.layout,{animationType:s}=t.options,o=e.source!==t.layout.source;if(s==="size")An(d=>{const p=o?e.measuredBox[d]:e.layoutBox[d],g=Vt(p);p.min=r[d].min,p.max=p.min+g});else if(s==="x"||s==="y"){const d=s==="x"?"y":"x";Pp(o?e.measuredBox[d]:e.layoutBox[d],r[d])}else dA(s,e.layoutBox,r)&&An(d=>{const p=o?e.measuredBox[d]:e.layoutBox[d],g=Vt(r[d]);p.max=p.min+g,t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[d].max=t.relativeTarget[d].min+g)});const a=_s();la(a,r,e.layoutBox);const u=_s();o?la(u,t.applyTransform(i,!0),e.measuredBox):la(u,r,e.layoutBox);const c=!oA(a);let h=!1;if(!t.resumeFrom){const d=t.getClosestProjectingParent();if(d&&!d.resumeFrom){const{snapshot:p,layout:g}=d;if(p&&g){const E=t.options.layoutAnchor||void 0,A=Ke();Ac(A,e.layoutBox,p.layoutBox,E);const C=Ke();Ac(C,r,g.layoutBox,E),aA(A,C)||(h=!0),d.options.layoutRoot&&(t.relativeTarget=C,t.relativeTargetOrigin=A,t.relativeParent=d)}}}t.notifyListeners("didUpdate",{layout:r,snapshot:e,delta:u,layoutDelta:a,hasLayoutChanged:c,hasRelativeLayoutChanged:h})}else if(t.isLead()){const{onExitComplete:r}=t.options;r&&r()}t.options.transition=void 0}function Nj(t){t.parent&&(t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty),t.isSharedProjectionDirty||(t.isSharedProjectionDirty=!!(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function Dj(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function Vj(t){t.clearSnapshot()}function Sw(t){t.clearMeasurements()}function Lj(t){t.isLayoutDirty=!0,t.updateLayout()}function Iw(t){t.isLayoutDirty=!1}function Mj(t){t.isAnimationBlocked&&t.layout&&!t.isLayoutDirty&&(t.snapshot=t.layout,t.isLayoutDirty=!0)}function Oj(t){const{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function Aw(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function Fj(t){t.resolveTargetDelta()}function jj(t){t.calcProjection()}function Uj(t){t.resetSkewAndRotation()}function Bj(t){t.removeLeadSnapshot()}function Cw(t,e,n){t.translate=Se(e.translate,0,n),t.scale=Se(e.scale,1,n),t.origin=e.origin,t.originPoint=e.originPoint}function Pw(t,e,n,r){t.min=Se(e.min,n.min,r),t.max=Se(e.max,n.max,r)}function zj(t,e,n,r){Pw(t.x,e.x,n.x,r),Pw(t.y,e.y,n.y,r)}function $j(t){return t.animationValues&&t.animationValues.opacityExit!==void 0}const Wj={duration:.45,ease:[.4,0,.1,1]},Rw=t=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t),kw=Rw("applewebkit/")&&!Rw("chrome/")?Math.round:ln;function bw(t){t.min=kw(t.min),t.max=kw(t.max)}function Hj(t){bw(t.x),bw(t.y)}function dA(t,e,n){return t==="position"||t==="preserve-aspect"&&!dj(_w(e),_w(n),.2)}function qj(t){var e;return t!==t.root&&((e=t.scroll)==null?void 0:e.wasRoot)}const Gj=hA({attachResizeListener:(t,e)=>Ha(t,"resize",e),measureScroll:()=>{var t,e;return{x:document.documentElement.scrollLeft||((t=document.body)==null?void 0:t.scrollLeft)||0,y:document.documentElement.scrollTop||((e=document.body)==null?void 0:e.scrollTop)||0}},checkIsScrollRoot:()=>!0}),Vd={current:void 0},fA=hA({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!Vd.current){const t=new Gj({});t.mount(window),t.setOptions({layoutScroll:!0}),Vd.current=t}return Vd.current},resetTransform:(t,e)=>{t.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:t=>window.getComputedStyle(t).position==="fixed"}),ey=D.createContext({transformPagePoint:t=>t,isStatic:!1,reducedMotion:"never"});function Nw(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}function Kj(...t){return e=>{let n=!1;const r=t.map(i=>{const s=Nw(i,e);return!n&&typeof s=="function"&&(n=!0),s});if(n)return()=>{for(let i=0;i<r.length;i++){const s=r[i];typeof s=="function"?s():Nw(t[i],null)}}}}function Qj(...t){return D.useCallback(Kj(...t),t)}class Yj extends D.Component{getSnapshotBeforeUpdate(e){const n=this.props.childRef.current;if(Pu(n)&&e.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const r=n.offsetParent,i=Pu(r)&&r.offsetWidth||0,s=Pu(r)&&r.offsetHeight||0,o=getComputedStyle(n),a=this.props.sizeRef.current;a.height=parseFloat(o.height),a.width=parseFloat(o.width),a.top=n.offsetTop,a.left=n.offsetLeft,a.right=i-a.width-a.left,a.bottom=s-a.height-a.top}return null}componentDidUpdate(){}render(){return this.props.children}}function Xj({children:t,isPresent:e,anchorX:n,anchorY:r,root:i,pop:s}){var p;const o=D.useId(),a=D.useRef(null),u=D.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:c}=D.useContext(ey),h=((p=t.props)==null?void 0:p.ref)??(t==null?void 0:t.ref),d=Qj(a,h);return D.useInsertionEffect(()=>{const{width:g,height:E,top:A,left:C,right:w,bottom:v}=u.current;if(e||s===!1||!a.current||!g||!E)return;const T=n==="left"?`left: ${C}`:`right: ${w}`,N=r==="bottom"?`bottom: ${v}`:`top: ${A}`;a.current.dataset.motionPopId=o;const L=document.createElement("style");c&&(L.nonce=c);const O=i??document.head;return O.appendChild(L),L.sheet&&L.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${g}px !important;
            height: ${E}px !important;
            ${T}px !important;
            ${N}px !important;
          }
        `),()=>{var S;(S=a.current)==null||S.removeAttribute("data-motion-pop-id"),O.contains(L)&&O.removeChild(L)}},[e]),P.jsx(Yj,{isPresent:e,childRef:a,sizeRef:u,pop:s,children:s===!1?t:D.cloneElement(t,{ref:d})})}const Jj=({children:t,initial:e,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:s,mode:o,anchorX:a,anchorY:u,root:c})=>{const h=Rg(Zj),d=D.useId();let p=!0,g=D.useMemo(()=>(p=!1,{id:d,initial:e,isPresent:n,custom:i,onExitComplete:E=>{h.set(E,!0);for(const A of h.values())if(!A)return;r&&r()},register:E=>(h.set(E,!1),()=>h.delete(E))}),[n,h,r]);return s&&p&&(g={...g}),D.useMemo(()=>{h.forEach((E,A)=>h.set(A,!1))},[n]),D.useEffect(()=>{!n&&!h.size&&r&&r()},[n]),t=P.jsx(Xj,{pop:o==="popLayout",isPresent:n,anchorX:a,anchorY:u,root:c,children:t}),P.jsx(dh.Provider,{value:g,children:t})};function Zj(){return new Map}function pA(t=!0){const e=D.useContext(dh);if(e===null)return[!0,null];const{isPresent:n,onExitComplete:r,register:i}=e,s=D.useId();D.useEffect(()=>{if(t)return i(s)},[t]);const o=D.useCallback(()=>t&&r&&r(s),[s,r,t]);return!n&&r?[!1,o]:[!0]}const nu=t=>t.key||"";function Dw(t){const e=[];return D.Children.forEach(t,n=>{D.isValidElement(n)&&e.push(n)}),e}const Rp=({children:t,custom:e,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:s="sync",propagate:o=!1,anchorX:a="left",anchorY:u="top",root:c})=>{const[h,d]=pA(o),p=D.useMemo(()=>Dw(t),[t]),g=o&&!h?[]:p.map(nu),E=D.useRef(!0),A=D.useRef(p),C=Rg(()=>new Map),w=D.useRef(new Set),[v,T]=D.useState(p),[N,L]=D.useState(p);BS(()=>{E.current=!1,A.current=p;for(let y=0;y<N.length;y++){const I=nu(N[y]);g.includes(I)?(C.delete(I),w.current.delete(I)):C.get(I)!==!0&&C.set(I,!1)}},[N,g.length,g.join("-")]);const O=[];if(p!==v){let y=[...p];for(let I=0;I<N.length;I++){const x=N[I],k=nu(x);g.includes(k)||(y.splice(I,0,x),O.push(x))}return s==="wait"&&O.length&&(y=O),L(Dw(y)),T(p),null}const{forceRender:S}=D.useContext(Pg);return P.jsx(P.Fragment,{children:N.map(y=>{const I=nu(y),x=o&&!h?!1:p===N||g.includes(I),k=()=>{if(w.current.has(I))return;if(C.has(I))w.current.add(I),C.set(I,!0);else return;let b=!0;C.forEach(R=>{R||(b=!1)}),b&&(S==null||S(),L(A.current),o&&(d==null||d()),r&&r())};return P.jsx(Jj,{isPresent:x,initial:!E.current||n?void 0:!1,custom:e,presenceAffectsLayout:i,mode:s,root:c,onExitComplete:x?void 0:k,anchorX:a,anchorY:u,children:y},I)})})},mA=D.createContext({strict:!1}),Vw={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let Lw=!1;function eU(){if(Lw)return;const t={};for(const e in Vw)t[e]={isEnabled:n=>Vw[e].some(r=>!!n[r])};WI(t),Lw=!0}function gA(){return eU(),FF()}function tU(t){const e=gA();for(const n in t)e[n]={...e[n],...t[n]};WI(e)}const nU=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function Cc(t){return t.startsWith("while")||t.startsWith("drag")&&t!=="draggable"||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||nU.has(t)}let yA=t=>!Cc(t);function rU(t){typeof t=="function"&&(yA=e=>e.startsWith("on")?!Cc(e):t(e))}try{rU(require("@emotion/is-prop-valid").default)}catch{}function iU(t,e,n){const r={};for(const i in t)i==="values"&&typeof t.values=="object"||lt(t[i])||(yA(i)||n===!0&&Cc(i)||!e&&!Cc(i)||t.draggable&&i.startsWith("onDrag"))&&(r[i]=t[i]);return r}const gh=D.createContext({});function sU(t,e){if(mh(t)){const{initial:n,animate:r}=t;return{initial:n===!1||Wa(n)?n:void 0,animate:Wa(r)?r:void 0}}return t.inherit!==!1?e:{}}function oU(t){const{initial:e,animate:n}=sU(t,D.useContext(gh));return D.useMemo(()=>({initial:e,animate:n}),[Mw(e),Mw(n)])}function Mw(t){return Array.isArray(t)?t.join(" "):t}const ty=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function vA(t,e,n){for(const r in e)!lt(e[r])&&!XI(r,n)&&(t[r]=e[r])}function aU({transformTemplate:t},e){return D.useMemo(()=>{const n=ty();return Jg(n,e,t),Object.assign({},n.vars,n.style)},[e])}function lU(t,e){const n=t.style||{},r={};return vA(r,n,t),Object.assign(r,aU(t,e)),r}function uU(t,e){const n={},r=lU(t,e);return t.drag&&t.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=t.drag===!0?"none":`pan-${t.drag==="x"?"y":"x"}`),t.tabIndex===void 0&&(t.onTap||t.onTapStart||t.whileTap)&&(n.tabIndex=0),n.style=r,n}const _A=()=>({...ty(),attrs:{}});function cU(t,e,n,r){const i=D.useMemo(()=>{const s=_A();return JI(s,e,eA(r),t.transformTemplate,t.style),{...s.attrs,style:{...s.style}}},[e]);if(t.style){const s={};vA(s,t.style,t),i.style={...s,...i.style}}return i}const hU=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function ny(t){return typeof t!="string"||t.includes("-")?!1:!!(hU.indexOf(t)>-1||/[A-Z]/u.test(t))}function dU(t,e,n,{latestValues:r},i,s=!1,o){const u=(o??ny(t)?cU:uU)(e,r,i,t),c=iU(e,typeof t=="string",s),h=t!==D.Fragment?{...c,...u,ref:n}:{},{children:d}=e,p=D.useMemo(()=>lt(d)?d.get():d,[d]);return D.createElement(t,{...h,children:p})}function fU({scrapeMotionValuesFromProps:t,createRenderState:e},n,r,i){return{latestValues:pU(n,r,i,t),renderState:e()}}function pU(t,e,n,r){const i={},s=r(t,{});for(const p in s)i[p]=Du(s[p]);let{initial:o,animate:a}=t;const u=mh(t),c=zI(t);e&&c&&!u&&t.inherit!==!1&&(o===void 0&&(o=e.initial),a===void 0&&(a=e.animate));let h=n?n.initial===!1:!1;h=h||o===!1;const d=h?a:o;if(d&&typeof d!="boolean"&&!ph(d)){const p=Array.isArray(d)?d:[d];for(let g=0;g<p.length;g++){const E=Wg(t,p[g]);if(E){const{transitionEnd:A,transition:C,...w}=E;for(const v in w){let T=w[v];if(Array.isArray(T)){const N=h?T.length-1:0;T=T[N]}T!==null&&(i[v]=T)}for(const v in A)i[v]=A[v]}}}return i}const wA=t=>(e,n)=>{const r=D.useContext(gh),i=D.useContext(dh),s=()=>fU(t,e,r,i);return n?s():Rg(s)},mU=wA({scrapeMotionValuesFromProps:Zg,createRenderState:ty}),gU=wA({scrapeMotionValuesFromProps:tA,createRenderState:_A}),yU=Symbol.for("motionComponentSymbol");function vU(t,e,n){const r=D.useRef(n);D.useInsertionEffect(()=>{r.current=n});const i=D.useRef(null);return D.useCallback(s=>{var a;s&&((a=t.onMount)==null||a.call(t,s));const o=r.current;if(typeof o=="function")if(s){const u=o(s);typeof u=="function"&&(i.current=u)}else i.current?(i.current(),i.current=null):o(s);else o&&(o.current=s);e&&(s?e.mount(s):e.unmount())},[e])}const EA=D.createContext({});function rs(t){return t&&typeof t=="object"&&Object.prototype.hasOwnProperty.call(t,"current")}function _U(t,e,n,r,i,s){var T,N;const{visualElement:o}=D.useContext(gh),a=D.useContext(mA),u=D.useContext(dh),c=D.useContext(ey),h=c.reducedMotion,d=c.skipAnimations,p=D.useRef(null),g=D.useRef(!1);r=r||a.renderer,!p.current&&r&&(p.current=r(t,{visualState:e,parent:o,props:n,presenceContext:u,blockInitialAnimation:u?u.initial===!1:!1,reducedMotionConfig:h,skipAnimations:d,isSVG:s}),g.current&&p.current&&(p.current.manuallyAnimateOnMount=!0));const E=p.current,A=D.useContext(EA);E&&!E.projection&&i&&(E.type==="html"||E.type==="svg")&&wU(p.current,n,i,A);const C=D.useRef(!1);D.useInsertionEffect(()=>{E&&C.current&&E.update(n,u)});const w=n[RI],v=D.useRef(!!w&&typeof window<"u"&&!((T=window.MotionHandoffIsComplete)!=null&&T.call(window,w))&&((N=window.MotionHasOptimisedAnimation)==null?void 0:N.call(window,w)));return BS(()=>{g.current=!0,E&&(C.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),E.scheduleRenderMicrotask(),v.current&&E.animationState&&E.animationState.animateChanges())}),D.useEffect(()=>{E&&(!v.current&&E.animationState&&E.animationState.animateChanges(),v.current&&(queueMicrotask(()=>{var L;(L=window.MotionHandoffMarkAsComplete)==null||L.call(window,w)}),v.current=!1),E.enteringChildren=void 0)}),E}function wU(t,e,n,r){const{layoutId:i,layout:s,drag:o,dragConstraints:a,layoutScroll:u,layoutRoot:c,layoutAnchor:h,layoutCrossfade:d}=e;t.projection=new n(t.latestValues,e["data-framer-portal-id"]?void 0:TA(t.parent)),t.projection.setOptions({layoutId:i,layout:s,alwaysMeasureLayout:!!o||a&&rs(a),visualElement:t,animationType:typeof s=="string"?s:"both",initialPromotionConfig:r,crossfade:d,layoutScroll:u,layoutRoot:c,layoutAnchor:h})}function TA(t){if(t)return t.options.allowProjection!==!1?t.projection:TA(t.parent)}function Ld(t,{forwardMotionProps:e=!1,type:n}={},r,i){r&&tU(r);const s=n?n==="svg":ny(t),o=s?gU:mU;function a(c,h){let d;const p={...D.useContext(ey),...c,layoutId:EU(c)},{isStatic:g}=p,E=oU(c),A=o(c,g);if(!g&&typeof window<"u"){TU();const C=xU(p);d=C.MeasureLayout,E.visualElement=_U(t,A,p,i,C.ProjectionNode,s)}return P.jsxs(gh.Provider,{value:E,children:[d&&E.visualElement?P.jsx(d,{visualElement:E.visualElement,...p}):null,dU(t,c,vU(A,E.visualElement,h),A,g,e,s)]})}a.displayName=`motion.${typeof t=="string"?t:`create(${t.displayName??t.name??""})`}`;const u=D.forwardRef(a);return u[yU]=t,u}function EU({layoutId:t}){const e=D.useContext(Pg).id;return e&&t!==void 0?e+"-"+t:t}function TU(t,e){D.useContext(mA).strict}function xU(t){const e=gA(),{drag:n,layout:r}=e;if(!n&&!r)return{};const i={...n,...r};return{MeasureLayout:n!=null&&n.isEnabled(t)||r!=null&&r.isEnabled(t)?i.MeasureLayout:void 0,ProjectionNode:i.ProjectionNode}}function SU(t,e){if(typeof Proxy>"u")return Ld;const n=new Map,r=(s,o)=>Ld(s,o,t,e),i=(s,o)=>r(s,o);return new Proxy(i,{get:(s,o)=>o==="create"?r:(n.has(o)||n.set(o,Ld(o,void 0,t,e)),n.get(o))})}const IU=(t,e)=>e.isSVG??ny(t)?new tj(e):new QF(e,{allowProjection:t!==D.Fragment});class AU extends ni{constructor(e){super(e),e.animationState||(e.animationState=oj(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();ph(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:n}=this.node.prevProps||{};e!==n&&this.updateAnimationControlsSubscription()}unmount(){var e;this.node.animationState.reset(),(e=this.unmountControls)==null||e.call(this)}}let CU=0;class PU extends ni{constructor(){super(...arguments),this.id=CU++,this.isExitComplete=!1}update(){var s;if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===r)return;if(e&&r===!1){if(this.isExitComplete){const{initial:o,custom:a}=this.node.getProps();if(typeof o=="string"){const u=Ai(this.node,o,a);if(u){const{transition:c,transitionEnd:h,...d}=u;for(const p in d)(s=this.node.getValue(p))==null||s.jump(d[p])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const i=this.node.animationState.setActive("exit",!e);n&&!e&&i.then(()=>{this.isExitComplete=!0,n(this.id)})}mount(){const{register:e,onExitComplete:n}=this.node.presenceContext||{};n&&n(this.id),e&&(this.unmount=e(this.id))}unmount(){}}const RU={animation:{Feature:AU},exit:{Feature:PU}};function ml(t){return{point:{x:t.pageX,y:t.pageY}}}const kU=t=>e=>Kg(e)&&t(e,ml(e));function ua(t,e,n,r){return Ha(t,e,kU(n),r)}const xA=({current:t})=>t?t.ownerDocument.defaultView:null,Ow=(t,e)=>Math.abs(t-e);function bU(t,e){const n=Ow(t.x,e.x),r=Ow(t.y,e.y);return Math.sqrt(n**2+r**2)}const Fw=new Set(["auto","scroll"]);class SA{constructor(e,n,{transformPagePoint:r,contextWindow:i=window,dragSnapToOrigin:s=!1,distanceThreshold:o=3,element:a}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=g=>{this.handleScroll(g.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=ru(this.lastRawMoveEventInfo,this.transformPagePoint));const g=Md(this.lastMoveEventInfo,this.history),E=this.startEvent!==null,A=bU(g.offset,{x:0,y:0})>=this.distanceThreshold;if(!E&&!A)return;const{point:C}=g,{timestamp:w}=st;this.history.push({...C,timestamp:w});const{onStart:v,onMove:T}=this.handlers;E||(v&&v(this.lastMoveEvent,g),this.startEvent=this.lastMoveEvent),T&&T(this.lastMoveEvent,g)},this.handlePointerMove=(g,E)=>{this.lastMoveEvent=g,this.lastRawMoveEventInfo=E,this.lastMoveEventInfo=ru(E,this.transformPagePoint),_e.update(this.updatePoint,!0)},this.handlePointerUp=(g,E)=>{this.end();const{onEnd:A,onSessionEnd:C,resumeAnimation:w}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&w&&w(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const v=Md(g.type==="pointercancel"?this.lastMoveEventInfo:ru(E,this.transformPagePoint),this.history);this.startEvent&&A&&A(g,v),C&&C(g,v)},!Kg(e))return;this.dragSnapToOrigin=s,this.handlers=n,this.transformPagePoint=r,this.distanceThreshold=o,this.contextWindow=i||window;const u=ml(e),c=ru(u,this.transformPagePoint),{point:h}=c,{timestamp:d}=st;this.history=[{...h,timestamp:d}];const{onSessionStart:p}=n;p&&p(e,Md(c,this.history)),this.removeListeners=dl(ua(this.contextWindow,"pointermove",this.handlePointerMove),ua(this.contextWindow,"pointerup",this.handlePointerUp),ua(this.contextWindow,"pointercancel",this.handlePointerUp)),a&&this.startScrollTracking(a)}startScrollTracking(e){let n=e.parentElement;for(;n;){const r=getComputedStyle(n);(Fw.has(r.overflowX)||Fw.has(r.overflowY))&&this.scrollPositions.set(n,{x:n.scrollLeft,y:n.scrollTop}),n=n.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(e){const n=this.scrollPositions.get(e);if(!n)return;const r=e===window,i=r?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},s={x:i.x-n.x,y:i.y-n.y};s.x===0&&s.y===0||(r?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=s.x,this.lastMoveEventInfo.point.y+=s.y):this.history.length>0&&(this.history[0].x-=s.x,this.history[0].y-=s.y),this.scrollPositions.set(e,i),_e.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Yr(this.updatePoint)}}function ru(t,e){return e?{point:e(t.point)}:t}function jw(t,e){return{x:t.x-e.x,y:t.y-e.y}}function Md({point:t},e){return{point:t,delta:jw(t,IA(e)),offset:jw(t,NU(e)),velocity:DU(e,.1)}}function NU(t){return t[0]}function IA(t){return t[t.length-1]}function DU(t,e){if(t.length<2)return{x:0,y:0};let n=t.length-1,r=null;const i=IA(t);for(;n>=0&&(r=t[n],!(i.timestamp-r.timestamp>Jt(e)));)n--;if(!r)return{x:0,y:0};r===t[0]&&t.length>2&&i.timestamp-r.timestamp>Jt(e)*2&&(r=t[1]);const s=on(i.timestamp-r.timestamp);if(s===0)return{x:0,y:0};const o={x:(i.x-r.x)/s,y:(i.y-r.y)/s};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function VU(t,{min:e,max:n},r){return e!==void 0&&t<e?t=r?Se(e,t,r.min):Math.max(t,e):n!==void 0&&t>n&&(t=r?Se(n,t,r.max):Math.min(t,n)),t}function Uw(t,e,n){return{min:e!==void 0?t.min+e:void 0,max:n!==void 0?t.max+n-(t.max-t.min):void 0}}function LU(t,{top:e,left:n,bottom:r,right:i}){return{x:Uw(t.x,n,i),y:Uw(t.y,e,r)}}function Bw(t,e){let n=e.min-t.min,r=e.max-t.max;return e.max-e.min<t.max-t.min&&([n,r]=[r,n]),{min:n,max:r}}function MU(t,e){return{x:Bw(t.x,e.x),y:Bw(t.y,e.y)}}function OU(t,e){let n=.5;const r=Vt(t),i=Vt(e);return i>r?n=za(e.min,e.max-r,t.min):r>i&&(n=za(t.min,t.max-i,e.min)),Un(0,1,n)}function FU(t,e){const n={};return e.min!==void 0&&(n.min=e.min-t.min),e.max!==void 0&&(n.max=e.max-t.min),n}const kp=.35;function jU(t=kp){return t===!1?t=0:t===!0&&(t=kp),{x:zw(t,"left","right"),y:zw(t,"top","bottom")}}function zw(t,e,n){return{min:$w(t,e),max:$w(t,n)}}function $w(t,e){return typeof t=="number"?t:t[e]||0}const UU=new WeakMap;class BU{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Ke(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:n=!1,distanceThreshold:r}={}){const{presenceContext:i}=this.visualElement;if(i&&i.isPresent===!1)return;const s=d=>{n&&this.snapToCursor(ml(d).point),this.stopAnimation()},o=(d,p)=>{const{drag:g,dragPropagation:E,onDragStart:A}=this.getProps();if(g&&!E&&(this.openDragLock&&this.openDragLock(),this.openDragLock=pF(g),!this.openDragLock))return;this.latestPointerEvent=d,this.latestPanInfo=p,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),An(w=>{let v=this.getAxisMotionValue(w).get()||0;if(Fn.test(v)){const{projection:T}=this.visualElement;if(T&&T.layout){const N=T.layout.layoutBox[w];N&&(v=Vt(N)*(parseFloat(v)/100))}}this.originPoint[w]=v}),A&&_e.update(()=>A(d,p),!1,!0),wp(this.visualElement,"transform");const{animationState:C}=this.visualElement;C&&C.setActive("whileDrag",!0)},a=(d,p)=>{this.latestPointerEvent=d,this.latestPanInfo=p;const{dragPropagation:g,dragDirectionLock:E,onDirectionLock:A,onDrag:C}=this.getProps();if(!g&&!this.openDragLock)return;const{offset:w}=p;if(E&&this.currentDirection===null){this.currentDirection=$U(w),this.currentDirection!==null&&A&&A(this.currentDirection);return}this.updateAxis("x",p.point,w),this.updateAxis("y",p.point,w),this.visualElement.render(),C&&_e.update(()=>C(d,p),!1,!0)},u=(d,p)=>{this.latestPointerEvent=d,this.latestPanInfo=p,this.stop(d,p),this.latestPointerEvent=null,this.latestPanInfo=null},c=()=>{const{dragSnapToOrigin:d}=this.getProps();(d||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:h}=this.getProps();this.panSession=new SA(e,{onSessionStart:s,onStart:o,onMove:a,onSessionEnd:u,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:h,distanceThreshold:r,contextWindow:xA(this.visualElement),element:this.visualElement.current})}stop(e,n){const r=e||this.latestPointerEvent,i=n||this.latestPanInfo,s=this.isDragging;if(this.cancel(),!s||!i||!r)return;const{velocity:o}=i;this.startAnimation(o);const{onDragEnd:a}=this.getProps();a&&_e.postRender(()=>a(r,i))}cancel(){this.isDragging=!1;const{projection:e,animationState:n}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,n,r){const{drag:i}=this.getProps();if(!r||!iu(e,i,this.currentDirection))return;const s=this.getAxisMotionValue(e);let o=this.originPoint[e]+r[e];this.constraints&&this.constraints[e]&&(o=VU(o,this.constraints[e],this.elastic[e])),s.set(o)}resolveConstraints(){var s;const{dragConstraints:e,dragElastic:n}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(s=this.visualElement.projection)==null?void 0:s.layout,i=this.constraints;e&&rs(e)?this.constraints||(this.constraints=this.resolveRefConstraints()):e&&r?this.constraints=LU(r.layoutBox,e):this.constraints=!1,this.elastic=jU(n),i!==this.constraints&&!rs(e)&&r&&this.constraints&&!this.hasMutatedConstraints&&An(o=>{this.constraints!==!1&&this.getAxisMotionValue(o)&&(this.constraints[o]=FU(r.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:n}=this.getProps();if(!e||!rs(e))return!1;const r=e.current,{projection:i}=this.visualElement;if(!i||!i.layout)return!1;const s=$F(r,i.root,this.visualElement.getTransformPagePoint());let o=MU(i.layout.layoutBox,s);if(n){const a=n(UF(o));this.hasMutatedConstraints=!!a,a&&(o=qI(a))}return o}startAnimation(e){const{drag:n,dragMomentum:r,dragElastic:i,dragTransition:s,dragSnapToOrigin:o,onDragTransitionEnd:a}=this.getProps(),u=this.constraints||{},c=An(h=>{if(!iu(h,n,this.currentDirection))return;let d=u&&u[h]||{};(o===!0||o===h)&&(d={min:0,max:0});const p=i?200:1e6,g=i?40:1e7,E={type:"inertia",velocity:r?e[h]:0,bounceStiffness:p,bounceDamping:g,timeConstant:750,restDelta:1,restSpeed:10,...s,...d};return this.startAxisValueAnimation(h,E)});return Promise.all(c).then(a)}startAxisValueAnimation(e,n){const r=this.getAxisMotionValue(e);return wp(this.visualElement,e),r.start($g(e,r,0,n,this.visualElement,!1))}stopAnimation(){An(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){const n=`_drag${e.toUpperCase()}`,r=this.visualElement.getProps(),i=r[n];return i||this.visualElement.getValue(e,(r.initial?r.initial[e]:void 0)||0)}snapToCursor(e){An(n=>{const{drag:r}=this.getProps();if(!iu(n,r,this.currentDirection))return;const{projection:i}=this.visualElement,s=this.getAxisMotionValue(n);if(i&&i.layout){const{min:o,max:a}=i.layout.layoutBox[n],u=s.get()||0;s.set(e[n]-Se(o,a,.5)+u)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!rs(n)||!r||!this.constraints)return;this.stopAnimation();const i={x:0,y:0};An(o=>{const a=this.getAxisMotionValue(o);if(a&&this.constraints!==!1){const u=a.get();i[o]=OU({min:u,max:u},this.constraints[o])}});const{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.constraints=!1,this.resolveConstraints(),An(o=>{if(!iu(o,e,null))return;const a=this.getAxisMotionValue(o),{min:u,max:c}=this.constraints[o];a.set(Se(u,c,i[o]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;UU.set(this.visualElement,this);const e=this.visualElement.current,n=ua(e,"pointerdown",c=>{const{drag:h,dragListener:d=!0}=this.getProps(),p=c.target,g=p!==e&&wF(p);h&&d&&!g&&this.start(c)});let r;const i=()=>{const{dragConstraints:c}=this.getProps();rs(c)&&c.current&&(this.constraints=this.resolveRefConstraints(),r||(r=zU(e,c.current,()=>this.scalePositionWithinConstraints())))},{projection:s}=this.visualElement,o=s.addEventListener("measure",i);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),_e.read(i);const a=Ha(window,"resize",()=>this.scalePositionWithinConstraints()),u=s.addEventListener("didUpdate",({delta:c,hasLayoutChanged:h})=>{this.isDragging&&h&&(An(d=>{const p=this.getAxisMotionValue(d);p&&(this.originPoint[d]+=c[d].translate,p.set(p.get()+c[d].translate))}),this.visualElement.render())});return()=>{a(),n(),o(),u&&u(),r&&r()}}getProps(){const e=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:i=!1,dragConstraints:s=!1,dragElastic:o=kp,dragMomentum:a=!0}=e;return{...e,drag:n,dragDirectionLock:r,dragPropagation:i,dragConstraints:s,dragElastic:o,dragMomentum:a}}}function Ww(t){let e=!0;return()=>{if(e){e=!1;return}t()}}function zU(t,e,n){const r=X_(t,Ww(n)),i=X_(e,Ww(n));return()=>{r(),i()}}function iu(t,e,n){return(e===!0||e===t)&&(n===null||n===t)}function $U(t,e=10){let n=null;return Math.abs(t.y)>e?n="y":Math.abs(t.x)>e&&(n="x"),n}class WU extends ni{constructor(e){super(e),this.removeGroupControls=ln,this.removeListeners=ln,this.controls=new BU(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||ln}update(){const{dragControls:e}=this.node.getProps(),{dragControls:n}=this.node.prevProps||{};e!==n&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const Od=t=>(e,n)=>{t&&_e.update(()=>t(e,n),!1,!0)};class HU extends ni{constructor(){super(...arguments),this.removePointerDownListener=ln}onPointerDown(e){this.session=new SA(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:xA(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:n,onPan:r,onPanEnd:i}=this.node.getProps();return{onSessionStart:Od(e),onStart:Od(n),onMove:Od(r),onEnd:(s,o)=>{delete this.session,i&&_e.postRender(()=>i(s,o))}}}mount(){this.removePointerDownListener=ua(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let Fd=!1;class qU extends D.Component{componentDidMount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:r,layoutId:i}=this.props,{projection:s}=e;s&&(n.group&&n.group.add(s),r&&r.register&&i&&r.register(s),Fd&&s.root.didUpdate(),s.addEventListener("animationComplete",()=>{this.safeToRemove()}),s.setOptions({...s.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Vu.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:n,visualElement:r,drag:i,isPresent:s}=this.props,{projection:o}=r;return o&&(o.isPresent=s,e.layoutDependency!==n&&o.setOptions({...o.options,layoutDependency:n}),Fd=!0,i||e.layoutDependency!==n||n===void 0||e.isPresent!==s?o.willUpdate():this.safeToRemove(),e.isPresent!==s&&(s?o.promote():o.relegate()||_e.postRender(()=>{const a=o.getStack();(!a||!a.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:e,layoutAnchor:n}=this.props,{projection:r}=e;r&&(r.options.layoutAnchor=n,r.root.didUpdate(),Gg.postRender(()=>{!r.currentAnimation&&r.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:i}=e;Fd=!0,i&&(i.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(i),r&&r.deregister&&r.deregister(i))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function AA(t){const[e,n]=pA(),r=D.useContext(Pg);return P.jsx(qU,{...t,layoutGroup:r,switchLayoutGroup:D.useContext(EA),isPresent:e,safeToRemove:n})}const GU={pan:{Feature:HU},drag:{Feature:WU,ProjectionNode:fA,MeasureLayout:AA}};function Hw(t,e,n){const{props:r}=t;t.animationState&&r.whileHover&&t.animationState.setActive("whileHover",n==="Start");const i="onHover"+n,s=r[i];s&&_e.postRender(()=>s(e,ml(e)))}class KU extends ni{mount(){const{current:e}=this.node;e&&(this.unmount=gF(e,(n,r)=>(Hw(this.node,r,"Start"),i=>Hw(this.node,i,"End"))))}unmount(){}}class QU extends ni{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=dl(Ha(this.node.current,"focus",()=>this.onFocus()),Ha(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function qw(t,e,n){const{props:r}=t;if(t.current instanceof HTMLButtonElement&&t.current.disabled)return;t.animationState&&r.whileTap&&t.animationState.setActive("whileTap",n==="Start");const i="onTap"+(n==="End"?"":n),s=r[i];s&&_e.postRender(()=>s(e,ml(e)))}class YU extends ni{mount(){const{current:e}=this.node;if(!e)return;const{globalTapTarget:n,propagate:r}=this.node.props;this.unmount=TF(e,(i,s)=>(qw(this.node,s,"Start"),(o,{success:a})=>qw(this.node,o,a?"End":"Cancel")),{useGlobalTarget:n,stopPropagation:(r==null?void 0:r.tap)===!1})}unmount(){}}const bp=new WeakMap,jd=new WeakMap,XU=t=>{const e=bp.get(t.target);e&&e(t)},JU=t=>{t.forEach(XU)};function ZU({root:t,...e}){const n=t||document;jd.has(n)||jd.set(n,{});const r=jd.get(n),i=JSON.stringify(e);return r[i]||(r[i]=new IntersectionObserver(JU,{root:t,...e})),r[i]}function e3(t,e,n){const r=ZU(e);return bp.set(t,n),r.observe(t),()=>{bp.delete(t),r.unobserve(t)}}const t3={some:0,all:1};class n3 extends ni{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var u;(u=this.stopObserver)==null||u.call(this);const{viewport:e={}}=this.node.getProps(),{root:n,margin:r,amount:i="some",once:s}=e,o={root:n?n.current:void 0,rootMargin:r,threshold:typeof i=="number"?i:t3[i]},a=c=>{const{isIntersecting:h}=c;if(this.isInView===h||(this.isInView=h,s&&!h&&this.hasEnteredView))return;h&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",h);const{onViewportEnter:d,onViewportLeave:p}=this.node.getProps(),g=h?d:p;g&&g(c)};this.stopObserver=e3(this.node.current,o,a)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:e,prevProps:n}=this.node;["amount","margin","root"].some(r3(e,n))&&this.startObserver()}unmount(){var e;(e=this.stopObserver)==null||e.call(this),this.hasEnteredView=!1,this.isInView=!1}}function r3({viewport:t={}},{viewport:e={}}={}){return n=>t[n]!==e[n]}const i3={inView:{Feature:n3},tap:{Feature:YU},focus:{Feature:QU},hover:{Feature:KU}},s3={layout:{ProjectionNode:fA,MeasureLayout:AA}},o3={...RU,...i3,...GU,...s3},Cn=SU(o3,IU),a3="modulepreload",l3=function(t){return"/"+t},Gw={},yh=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(n.map(u=>{if(u=l3(u),u in Gw)return;Gw[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":a3,c||(d.as="script"),d.crossOrigin="",d.href=u,a&&d.setAttribute("nonce",a),document.head.appendChild(d),c)return new Promise((p,g)=>{d.addEventListener("load",p),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */const u3=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},r=(s,o)=>{n.platforms.set(s,o)},i=s=>{n.platforms.has(s)&&(n.currentPlatform=n.platforms.get(s))};return n.addPlatform=r,n.setPlatform=i,n},c3=t=>t.CapacitorPlatforms=u3(t),CA=c3(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});CA.addPlatform;CA.setPlatform;var Ys;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(Ys||(Ys={}));class ks extends Error{constructor(e,n,r){super(e),this.message=e,this.code=n,this.data=r}}const h3=t=>{var e,n;return t!=null&&t.androidBridge?"android":!((n=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},d3=t=>{var e,n,r,i,s;const o=t.CapacitorCustomPlatform||null,a=t.Capacitor||{},u=a.Plugins=a.Plugins||{},c=t.CapacitorPlatforms,h=()=>o!==null?o.name:h3(t),d=((e=c==null?void 0:c.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||h,p=()=>d()!=="web",g=((n=c==null?void 0:c.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||p,E=S=>{const y=N.get(S);return!!(y!=null&&y.platforms.has(d())||w(S))},A=((r=c==null?void 0:c.currentPlatform)===null||r===void 0?void 0:r.isPluginAvailable)||E,C=S=>{var y;return(y=a.PluginHeaders)===null||y===void 0?void 0:y.find(I=>I.name===S)},w=((i=c==null?void 0:c.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||C,v=S=>t.console.error(S),T=(S,y,I)=>Promise.reject(`${I} does not have an implementation of "${y}".`),N=new Map,L=(S,y={})=>{const I=N.get(S);if(I)return console.warn(`Capacitor plugin "${S}" already registered. Cannot register plugins twice.`),I.proxy;const x=d(),k=w(S);let b;const R=async()=>(!b&&x in y?b=typeof y[x]=="function"?b=await y[x]():b=y[x]:o!==null&&!b&&"web"in y&&(b=typeof y.web=="function"?b=await y.web():b=y.web),b),me=(W,J)=>{var X,ue;if(k){const ze=k==null?void 0:k.methods.find(Pe=>J===Pe.name);if(ze)return ze.rtype==="promise"?Pe=>a.nativePromise(S,J.toString(),Pe):(Pe,Je)=>a.nativeCallback(S,J.toString(),Pe,Je);if(W)return(X=W[J])===null||X===void 0?void 0:X.bind(W)}else{if(W)return(ue=W[J])===null||ue===void 0?void 0:ue.bind(W);throw new ks(`"${S}" plugin is not implemented on ${x}`,Ys.Unimplemented)}},re=W=>{let J;const X=(...ue)=>{const ze=R().then(Pe=>{const Je=me(Pe,W);if(Je){const pt=Je(...ue);return J=pt==null?void 0:pt.remove,pt}else throw new ks(`"${S}.${W}()" is not implemented on ${x}`,Ys.Unimplemented)});return W==="addListener"&&(ze.remove=async()=>J()),ze};return X.toString=()=>`${W.toString()}() { [capacitor code] }`,Object.defineProperty(X,"name",{value:W,writable:!1,configurable:!1}),X},ye=re("addListener"),ft=re("removeListener"),U=(W,J)=>{const X=ye({eventName:W},J),ue=async()=>{const Pe=await X;ft({eventName:W,callbackId:Pe},J)},ze=new Promise(Pe=>X.then(()=>Pe({remove:ue})));return ze.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await ue()},ze},G=new Proxy({},{get(W,J){switch(J){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return k?U:ye;case"removeListener":return ft;default:return re(J)}}});return u[S]=G,N.set(S,{name:S,proxy:G,platforms:new Set([...Object.keys(y),...k?[x]:[]])}),G},O=((s=c==null?void 0:c.currentPlatform)===null||s===void 0?void 0:s.registerPlugin)||L;return a.convertFileSrc||(a.convertFileSrc=S=>S),a.getPlatform=d,a.handleError=v,a.isNativePlatform=g,a.isPluginAvailable=A,a.pluginMethodNoop=T,a.registerPlugin=O,a.Exception=ks,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},f3=t=>t.Capacitor=d3(t),Pc=f3(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),zi=Pc.registerPlugin;Pc.Plugins;class ry{constructor(e){this.listeners={},this.retainedEventArguments={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,n){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(n);const s=this.windowListeners[e];s&&!s.registered&&this.addWindowListener(s),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,n);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,n,r){const i=this.listeners[e];if(!i){if(r){let s=this.retainedEventArguments[e];s||(s=[]),s.push(n),this.retainedEventArguments[e]=s}return}i.forEach(s=>s(n))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,n){this.windowListeners[n]={registered:!1,windowEventName:e,pluginEventName:n,handler:r=>{this.notifyListeners(n,r)}}}unimplemented(e="not implemented"){return new Pc.Exception(e,Ys.Unimplemented)}unavailable(e="not available"){return new Pc.Exception(e,Ys.Unavailable)}async removeListener(e,n){const r=this.listeners[e];if(!r)return;const i=r.indexOf(n);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const n=this.retainedEventArguments[e];n&&(delete this.retainedEventArguments[e],n.forEach(r=>{this.notifyListeners(e,r)}))}}const Kw=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Qw=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class p3 extends ry{async getCookies(){const e=document.cookie,n={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[i,s]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=Qw(i).trim(),s=Qw(s).trim(),n[i]=s}),n}async setCookie(e){try{const n=Kw(e.key),r=Kw(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,s=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${n}=${r||""}${i}; path=${s}; ${o};`}catch(n){return Promise.reject(n)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const n of e)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}zi("CapacitorCookies",{web:()=>new p3});const m3=async t=>new Promise((e,n)=>{const r=new FileReader;r.onload=()=>{const i=r.result;e(i.indexOf(",")>=0?i.split(",")[1]:i)},r.onerror=i=>n(i),r.readAsDataURL(t)}),g3=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(i=>i.toLocaleLowerCase()).reduce((i,s,o)=>(i[s]=t[e[o]],i),{})},y3=(t,e=!0)=>t?Object.entries(t).reduce((r,i)=>{const[s,o]=i;let a,u;return Array.isArray(o)?(u="",o.forEach(c=>{a=e?encodeURIComponent(c):c,u+=`${s}=${a}&`}),u.slice(0,-1)):(a=e?encodeURIComponent(o):o,u=`${s}=${a}`),`${r}&${u}`},"").substr(1):null,v3=(t,e={})=>{const n=Object.assign({method:t.method||"GET",headers:t.headers},e),i=g3(t.headers)["content-type"]||"";if(typeof t.data=="string")n.body=t.data;else if(i.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[o,a]of Object.entries(t.data||{}))s.set(o,a);n.body=s.toString()}else if(i.includes("multipart/form-data")||t.data instanceof FormData){const s=new FormData;if(t.data instanceof FormData)t.data.forEach((a,u)=>{s.append(u,a)});else for(const a of Object.keys(t.data))s.append(a,t.data[a]);n.body=s;const o=new Headers(n.headers);o.delete("content-type"),n.headers=o}else(i.includes("application/json")||typeof t.data=="object")&&(n.body=JSON.stringify(t.data));return n};class _3 extends ry{async request(e){const n=v3(e,e.webFetchExtra),r=y3(e.params,e.shouldEncodeUrlParams),i=r?`${e.url}?${r}`:e.url,s=await fetch(i,n),o=s.headers.get("content-type")||"";let{responseType:a="text"}=s.ok?e:{};o.includes("application/json")&&(a="json");let u,c;switch(a){case"arraybuffer":case"blob":c=await s.blob(),u=await m3(c);break;case"json":u=await s.json();break;case"document":case"text":default:u=await s.text()}const h={};return s.headers.forEach((d,p)=>{h[p]=d}),{data:u,headers:h,status:s.status,url:s.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}zi("CapacitorHttp",{web:()=>new _3});const ui=zi("Geolocation",{web:()=>yh(()=>import("./web-BcYPFczX.js"),[]).then(t=>new t.GeolocationWeb)});var Nt;(function(t){t.Heavy="HEAVY",t.Medium="MEDIUM",t.Light="LIGHT"})(Nt||(Nt={}));var Np;(function(t){t.Success="SUCCESS",t.Warning="WARNING",t.Error="ERROR"})(Np||(Np={}));const Tt=zi("Haptics",{web:()=>yh(()=>import("./web-Cvmepigc.js"),[]).then(t=>new t.HapticsWeb)});var kr;(function(t){t.Prompt="PROMPT",t.Camera="CAMERA",t.Photos="PHOTOS"})(kr||(kr={}));var ca;(function(t){t.Rear="REAR",t.Front="FRONT"})(ca||(ca={}));var Rc;(function(t){t.Uri="uri",t.Base64="base64",t.DataUrl="dataUrl"})(Rc||(Rc={}));class PA extends ry{async getPhoto(e){return new Promise(async(n,r)=>{if(e.webUseInput||e.source===kr.Photos)this.fileInputExperience(e,n,r);else if(e.source===kr.Prompt){let i=document.querySelector("pwa-action-sheet");i||(i=document.createElement("pwa-action-sheet"),document.body.appendChild(i)),i.header=e.promptLabelHeader||"Photo",i.cancelable=!1,i.options=[{title:e.promptLabelPhoto||"From Photos"},{title:e.promptLabelPicture||"Take Picture"}],i.addEventListener("onSelection",async s=>{s.detail===0?this.fileInputExperience(e,n,r):this.cameraExperience(e,n,r)})}else this.cameraExperience(e,n,r)})}async pickImages(e){return new Promise(async(n,r)=>{this.multipleFileInputExperience(n,r)})}async cameraExperience(e,n,r){if(customElements.get("pwa-camera-modal")){const i=document.createElement("pwa-camera-modal");i.facingMode=e.direction===ca.Front?"user":"environment",document.body.appendChild(i);try{await i.componentOnReady(),i.addEventListener("onPhoto",async s=>{const o=s.detail;o===null?r(new ks("User cancelled photos app")):o instanceof Error?r(o):n(await this._getCameraPhoto(o,e)),i.dismiss(),document.body.removeChild(i)}),i.present()}catch{this.fileInputExperience(e,n,r)}}else console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(e,n,r)}fileInputExperience(e,n,r){let i=document.querySelector("#_capacitor-camera-input");const s=()=>{var o;(o=i.parentNode)===null||o===void 0||o.removeChild(i)};i||(i=document.createElement("input"),i.id="_capacitor-camera-input",i.type="file",i.hidden=!0,document.body.appendChild(i),i.addEventListener("change",o=>{const a=i.files[0];let u="jpeg";if(a.type==="image/png"?u="png":a.type==="image/gif"&&(u="gif"),e.resultType==="dataUrl"||e.resultType==="base64"){const c=new FileReader;c.addEventListener("load",()=>{if(e.resultType==="dataUrl")n({dataUrl:c.result,format:u});else if(e.resultType==="base64"){const h=c.result.split(",")[1];n({base64String:h,format:u})}s()}),c.readAsDataURL(a)}else n({webPath:URL.createObjectURL(a),format:u}),s()}),i.addEventListener("cancel",o=>{r(new ks("User cancelled photos app")),s()})),i.accept="image/*",i.capture=!0,e.source===kr.Photos||e.source===kr.Prompt?i.removeAttribute("capture"):e.direction===ca.Front?i.capture="user":e.direction===ca.Rear&&(i.capture="environment"),i.click()}multipleFileInputExperience(e,n){let r=document.querySelector("#_capacitor-camera-input-multiple");const i=()=>{var s;(s=r.parentNode)===null||s===void 0||s.removeChild(r)};r||(r=document.createElement("input"),r.id="_capacitor-camera-input-multiple",r.type="file",r.hidden=!0,r.multiple=!0,document.body.appendChild(r),r.addEventListener("change",s=>{const o=[];for(let a=0;a<r.files.length;a++){const u=r.files[a];let c="jpeg";u.type==="image/png"?c="png":u.type==="image/gif"&&(c="gif"),o.push({webPath:URL.createObjectURL(u),format:c})}e({photos:o}),i()}),r.addEventListener("cancel",s=>{n(new ks("User cancelled photos app")),i()})),r.accept="image/*",r.click()}_getCameraPhoto(e,n){return new Promise((r,i)=>{const s=new FileReader,o=e.type.split("/")[1];n.resultType==="uri"?r({webPath:URL.createObjectURL(e),format:o,saved:!1}):(s.readAsDataURL(e),s.onloadend=()=>{const a=s.result;n.resultType==="dataUrl"?r({dataUrl:a,format:o,saved:!1}):r({base64String:a.split(",")[1],format:o,saved:!1})},s.onerror=a=>{i(a)})})}async checkPermissions(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");try{return{camera:(await window.navigator.permissions.query({name:"camera"})).state,photos:"granted"}}catch{throw this.unavailable("Camera permissions are not available in this browser")}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}async pickLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}async getLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}}new PA;const RA=zi("Camera",{web:()=>new PA}),Yw=zi("Network",{web:()=>yh(()=>import("./web-D4tl3M1y.js"),[]).then(t=>new t.NetworkWeb)}),w3=zi("Device",{web:()=>yh(()=>import("./web-Z_fQxujv.js"),[]).then(t=>new t.DeviceWeb)}),E3="dbd9x1o02",T3="fc3i8urq",kA="https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png",x3="5567999999999",Xw={lat:-20.4697,lng:-54.6201},S3=(t,e)=>{if(!t||!e)return"CENTRO";const n=t-Xw.lat,r=e-Xw.lng;let i=Math.atan2(n,r)*(180/Math.PI);i<0&&(i+=360);const o=[{nome:"LESTE",min:337.5,max:22.5},{nome:"NORDESTE",min:22.5,max:67.5},{nome:"NORTE",min:67.5,max:112.5},{nome:"NOROESTE",min:112.5,max:157.5},{nome:"OESTE",min:157.5,max:202.5},{nome:"SUDOESTE",min:202.5,max:247.5},{nome:"SUL",min:247.5,max:292.5},{nome:"SUDESTE",min:292.5,max:337.5}].find(a=>i>=a.min&&i<a.max||a.nome==="LESTE"&&(i>=337.5||i<22.5));return o?o.nome:"CENTRO"},Dp=async(t,e)=>{const n=new FormData;if(typeof t=="string"&&t.startsWith("data:image")){const i=await(await fetch(t)).blob();n.append("file",new File([i],"imagem_nativa.jpg",{type:"image/jpeg"}))}else n.append("file",t);n.append("upload_preset",T3),n.append("folder",`rodrigues_acai/${e}`);try{const i=await(await fetch(`https://api.cloudinary.com/v1_1/${E3}/image/upload`,{method:"POST",body:n})).json();if(!i.secure_url)throw new Error("Falha na validação da URL segura retornada pelo servidor de imagens.");return i.secure_url}catch(r){throw console.error("Erro critico no upload de midia: ",r),r}},su=t=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t||0),Vp=t=>(t=t.replace(/\D/g,""),t=t.replace(/(\d{3})(\d)/,"$1.$2"),t=t.replace(/(\d{3})(\d)/,"$1.$2"),t=t.replace(/(\d{3})(\d{1,2})$/,"$1-$2"),t),bA=t=>t.replace(/\D/g,""),NA=D.createContext(null),DA=()=>{const t=D.useContext(NA);if(!t)throw new Error("useToast deve ser usado dentro de um ToastProvider");return t},I3=({children:t})=>{const[e,n]=D.useState([]),r=D.useCallback((i,s="info")=>{try{s==="error"?Tt.impact({style:Nt.Heavy}):s==="success"?Tt.notification({type:Np.Success}):Tt.impact({style:Nt.Light})}catch(a){console.warn("Haptics não suportado no ambiente atual",a)}const o=Math.random().toString(36).substring(2,9);n(a=>[...a,{id:o,msg:i,type:s}]),setTimeout(()=>{n(a=>a.filter(u=>u.id!==o))},4e3)},[]);return P.jsxs(NA.Provider,{value:r,children:[t,P.jsx("div",{className:`\r
                    fixed \r
                    top-4 \r
                    left-1/2 \r
                    -translate-x-1/2 \r
                    z-[9999] \r
                    flex \r
                    flex-col \r
                    gap-2 \r
                    w-[90%] \r
                    max-w-sm \r
                    pointer-events-none\r
                `,children:P.jsx(Rp,{children:e.map(i=>P.jsxs(Cn.div,{initial:{opacity:0,y:-20,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-20,scale:.9},className:`
                                p-4 
                                rounded-2xl 
                                shadow-2xl 
                                flex 
                                items-center 
                                gap-3 
                                text-sm 
                                font-black 
                                uppercase 
                                tracking-wide 
                                text-white 
                                ${i.type==="error"?"bg-[#EA1D2C]":""}
                                ${i.type==="success"?"bg-[#82C91E] text-[#4B0082]":""}
                                ${i.type==="info"?"bg-slate-800":""}
                            `,children:[i.type==="error"&&P.jsx(AM,{size:24,className:"shrink-0"}),i.type==="success"&&P.jsx(PM,{size:24,className:"shrink-0"}),i.type==="info"&&P.jsx(MM,{size:24,className:"shrink-0"}),P.jsx("span",{className:"flex-1 text-left",children:i.msg})]},i.id))})})]})},A3=()=>{const[t,e]=D.useState({level:100,isCritical:!1});return D.useEffect(()=>{let n=!0;const r=async()=>{try{const s=await w3.getBatteryInfo();if(!n)return;const o=Math.round((s.batteryLevel||1)*100);e({level:o,isCritical:o<=15})}catch(s){console.warn("API de bateria não disponível no ambiente atual",s)}};r();const i=setInterval(r,6e4);return()=>{n=!1,clearInterval(i)}},[]),t},C3=()=>{const[t,e]=D.useState(!0);return D.useEffect(()=>{let n=null;return(async()=>{try{const i=await Yw.getStatus();e(i.connected),n=await Yw.addListener("networkStatusChange",s=>{e(s.connected)})}catch(i){console.error("Erro ao inicializar listener de rede",i)}})(),()=>{n&&n.remove()}},[]),t},P3=({mensagem:t})=>P.jsxs("div",{className:`\r
                h-[100dvh] \r
                bg-[#1F0137] \r
                flex \r
                flex-col \r
                items-center \r
                justify-center \r
                relative \r
                overflow-hidden\r
            `,children:[P.jsx("div",{className:`\r
                    absolute \r
                    inset-0 \r
                    opacity-5 \r
                    bg-[url('https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png')] \r
                    bg-repeat \r
                    bg-[length:150px_150px]\r
                `}),P.jsx(Cn.img,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.8,ease:"easeOut"},src:kA,className:`\r
                    w-56 \r
                    h-56 \r
                    object-contain \r
                    z-10 \r
                    drop-shadow-[0_0_30px_rgba(130,201,30,0.4)]\r
                `,alt:"Rodrigues Logo Oficial"}),P.jsxs(Cn.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},className:`\r
                    mt-12 \r
                    z-10 \r
                    flex \r
                    flex-col \r
                    items-center\r
                `,children:[P.jsx("div",{className:`\r
                        w-10 \r
                        h-10 \r
                        border-4 \r
                        border-[#4B0082] \r
                        border-t-[#82C91E] \r
                        rounded-full \r
                        animate-spin \r
                        mb-4\r
                    `}),P.jsx("p",{className:`\r
                        text-[#82C91E] \r
                        font-black \r
                        uppercase \r
                        tracking-widest \r
                        text-[10px] \r
                        animate-pulse\r
                    `,children:t||"Iniciando Motor NATIVO e sincronizando..."})]})]}),R3=({onVoltar:t})=>P.jsxs("div",{className:`\r
                min-h-screen \r
                bg-[#F8FAFC] \r
                flex \r
                flex-col \r
                items-center \r
                justify-center \r
                p-8 \r
                text-center \r
                relative \r
                overflow-hidden\r
            `,children:[P.jsxs("div",{className:`\r
                    w-32 \r
                    h-32 \r
                    bg-yellow-100 \r
                    rounded-full \r
                    flex \r
                    items-center \r
                    justify-center \r
                    mb-8 \r
                    relative\r
                `,children:[P.jsx(kM,{size:64,className:`\r
                        text-yellow-600 \r
                        relative \r
                        z-10\r
                    `}),P.jsx("div",{className:`\r
                        absolute \r
                        inset-0 \r
                        border-4 \r
                        border-yellow-400 \r
                        border-t-transparent \r
                        rounded-full \r
                        animate-spin\r
                    `})]}),P.jsx("h1",{className:`\r
                    text-3xl \r
                    font-[1000] \r
                    uppercase \r
                    italic \r
                    tracking-tighter \r
                    text-[#4B0082] \r
                    mb-4\r
                `,children:"Conta em Análise"}),P.jsx("p",{className:`\r
                    text-sm \r
                    font-bold \r
                    text-slate-500 \r
                    uppercase \r
                    tracking-widest \r
                    leading-relaxed \r
                    mb-8 \r
                    max-w-xs\r
                `,children:"Seus documentos e placa do veículo estão sendo validados pela nossa equipe de logística. Em breve você receberá a liberação para ligar o seu radar."}),P.jsx("button",{onClick:t,className:`\r
                    w-full \r
                    max-w-xs \r
                    py-5 \r
                    bg-[#4B0082] \r
                    text-white \r
                    rounded-[2rem] \r
                    font-[1000] \r
                    uppercase \r
                    text-xs \r
                    tracking-widest \r
                    shadow-xl \r
                    active:scale-95 \r
                    transition-all\r
                `,children:"Voltar à Tela de Início"})]}),k3=({onVoltar:t,onSucesso:e})=>{const n=DA(),[r,i]=D.useState(1),[s,o]=D.useState(!1),[a,u]=D.useState({nome:"",cpf:"",telefone:"",veiculo:"MOTO",placa:"",senha:""}),[c,h]=D.useState({perfil:null,cnh:null}),d=async g=>{try{const E=await RA.getPhoto({quality:80,allowEditing:!1,resultType:Rc.DataUrl,source:kr.Camera});h(A=>({...A,[g]:E.dataUrl})),n(`Imagem de ${g} capturada com sucesso!`,"success")}catch(E){console.warn("Captura cancelada pelo usuario.",E),n("Captura de imagem cancelada.","error")}},p=async()=>{if(!c.perfil||!c.cnh)return n("É obrigatório tirar todas as fotos listadas!","error");o(!0);try{n("Processando cadastro, não feche o app...","info");const g=bA(a.cpf),[E,A]=await Promise.all([Dp(c.perfil,"entregadores/perfil"),Dp(c.cnh,"entregadores/cnh")]),C={nome:a.nome.toUpperCase(),telefone:a.telefone,modalidade:a.veiculo,placa:a.placa.toUpperCase(),senha:a.senha,urlPerfil:E,urlCNH:A,statusAprovacao:"PENDENTE",status:"Offline",ganhosTaxas:0,debitosLoja:0,saldoLiquido:0,dataCadastro:Wo()};await hM(kt(Ze,"entregadores",g),C),n("Seu cadastro foi enviado para análise!","success"),e()}catch(g){console.error("Erro fatal no cadastro",g),n("Ocorreu um erro ao gravar seus dados. Tente novamente.","error")}finally{o(!1)}};return P.jsxs("div",{className:`\r
                min-h-screen \r
                bg-[#F8FAFC] \r
                flex \r
                flex-col \r
                p-6 \r
                relative\r
                overflow-y-auto\r
            `,children:[P.jsxs("div",{className:`\r
                    flex \r
                    justify-between \r
                    items-center \r
                    mb-8 \r
                    mt-4\r
                `,children:[P.jsx("button",{onClick:r===1?t:()=>i(1),className:`\r
                        p-3 \r
                        bg-white \r
                        text-[#4B0082] \r
                        rounded-2xl \r
                        shadow-sm \r
                        active:scale-95 \r
                        transition-transform\r
                    `,children:P.jsx(jS,{size:24})}),P.jsxs("span",{className:`\r
                        text-[10px] \r
                        font-black \r
                        uppercase \r
                        tracking-widest \r
                        text-slate-400\r
                    `,children:["Progresso: Passo ",r," de 2"]})]}),P.jsx("h1",{className:`\r
                    text-4xl \r
                    font-[1000] \r
                    uppercase \r
                    italic \r
                    tracking-tighter \r
                    text-[#4B0082] \r
                    mb-8\r
                `,children:"Novo Piloto"}),r===1?P.jsxs("div",{className:"space-y-4",children:[P.jsxs("div",{className:"flex flex-col gap-1",children:[P.jsx("label",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2",children:"Identificação"}),P.jsx("input",{type:"text",placeholder:"NOME COMPLETO",value:a.nome,onChange:g=>u({...a,nome:g.target.value}),className:`\r
                                w-full \r
                                h-16 \r
                                bg-white \r
                                border \r
                                border-slate-200 \r
                                rounded-2xl \r
                                px-6 \r
                                font-black \r
                                text-[#4B0082] \r
                                text-sm \r
                                uppercase \r
                                outline-none \r
                                focus:border-[#82C91E] \r
                                transition-colors\r
                            `})]}),P.jsxs("div",{className:"flex flex-col gap-1",children:[P.jsx("label",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2",children:"Documento"}),P.jsx("input",{type:"tel",placeholder:"CPF (APENAS NÚMEROS)",value:Vp(a.cpf),onChange:g=>u({...a,cpf:g.target.value}),maxLength:14,className:`\r
                                w-full \r
                                h-16 \r
                                bg-white \r
                                border \r
                                border-slate-200 \r
                                rounded-2xl \r
                                px-6 \r
                                font-black \r
                                text-[#4B0082] \r
                                text-sm \r
                                outline-none \r
                                focus:border-[#82C91E] \r
                                transition-colors\r
                            `})]}),P.jsxs("div",{className:"flex flex-col gap-1",children:[P.jsx("label",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2",children:"Contato"}),P.jsx("input",{type:"tel",placeholder:"WHATSAPP COM DDD",value:a.telefone,onChange:g=>u({...a,telefone:g.target.value}),className:`\r
                                w-full \r
                                h-16 \r
                                bg-white \r
                                border \r
                                border-slate-200 \r
                                rounded-2xl \r
                                px-6 \r
                                font-black \r
                                text-[#4B0082] \r
                                text-sm \r
                                outline-none \r
                                focus:border-[#82C91E] \r
                                transition-colors\r
                            `})]}),P.jsxs("div",{className:"flex flex-col gap-1 mt-4",children:[P.jsx("label",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2",children:"Ferramenta de Trabalho"}),P.jsxs("div",{className:"flex gap-2",children:[P.jsxs("button",{onClick:()=>u({...a,veiculo:"MOTO"}),className:`
                                    flex-1 
                                    py-4 
                                    rounded-2xl 
                                    font-black 
                                    uppercase 
                                    text-xs 
                                    border-2 
                                    transition-all 
                                    ${a.veiculo==="MOTO"?"bg-[#4B0082] text-[#82C91E] border-[#4B0082]":"bg-white text-slate-400 border-slate-200"}
                                `,children:[P.jsx(TM,{className:"mx-auto mb-1"}),"Motocicleta"]}),P.jsxs("button",{onClick:()=>u({...a,veiculo:"CARRO"}),className:`
                                    flex-1 
                                    py-4 
                                    rounded-2xl 
                                    font-black 
                                    uppercase 
                                    text-xs 
                                    border-2 
                                    transition-all 
                                    ${a.veiculo==="CARRO"?"bg-[#4B0082] text-[#82C91E] border-[#4B0082]":"bg-white text-slate-400 border-slate-200"}
                                `,children:[P.jsx(SM,{className:"mx-auto mb-1"}),"Automóvel"]})]})]}),P.jsxs("div",{className:"flex flex-col gap-1",children:[P.jsx("label",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2",children:"Placa Oficial"}),P.jsx("input",{type:"text",placeholder:"EX: ABC-1234 OU MERCOSUL",value:a.placa,onChange:g=>u({...a,placa:g.target.value}),className:`\r
                                w-full \r
                                h-16 \r
                                bg-white \r
                                border \r
                                border-slate-200 \r
                                rounded-2xl \r
                                px-6 \r
                                font-black \r
                                text-[#4B0082] \r
                                text-sm \r
                                uppercase \r
                                outline-none \r
                                focus:border-[#82C91E] \r
                                transition-colors\r
                            `})]}),P.jsxs("div",{className:"flex flex-col gap-1",children:[P.jsx("label",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2",children:"Segurança de Acesso"}),P.jsx("input",{type:"password",placeholder:"CRIE UMA SENHA NUMÉRICA",value:a.senha,onChange:g=>u({...a,senha:g.target.value}),className:`\r
                                w-full \r
                                h-16 \r
                                bg-white \r
                                border \r
                                border-slate-200 \r
                                rounded-2xl \r
                                px-6 \r
                                font-black \r
                                text-[#4B0082] \r
                                text-sm \r
                                outline-none \r
                                focus:border-[#82C91E] \r
                                transition-colors\r
                            `})]}),P.jsx("button",{onClick:()=>{a.nome&&a.cpf.length>=11&&a.senha&&a.placa?i(2):n("Por favor, preencha todos os campos corretamente para avançar.","error")},className:`\r
                            w-full \r
                            py-5 \r
                            mt-6 \r
                            bg-[#82C91E] \r
                            text-[#4B0082] \r
                            rounded-[2rem] \r
                            font-[1000] \r
                            uppercase \r
                            text-sm \r
                            shadow-xl \r
                            active:scale-95 \r
                            transition-transform\r
                        `,children:"Prosseguir para Fotos"})]}):P.jsxs("div",{className:"space-y-6",children:[P.jsx("h3",{className:"text-sm font-black text-slate-500 uppercase tracking-widest mb-4",children:"Validação Biográfica"}),P.jsxs("div",{onClick:()=>d("perfil"),className:`
                            w-full 
                            h-40 
                            rounded-3xl 
                            border-2 
                            border-dashed 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            gap-3 
                            relative 
                            overflow-hidden 
                            transition-colors 
                            ${c.perfil?"border-[#82C91E] bg-green-50":"border-[#4B0082] bg-white cursor-pointer"}
                        `,children:[c.perfil?P.jsx("img",{src:c.perfil,className:"absolute inset-0 w-full h-full object-cover opacity-50",alt:"Selfie"}):P.jsx(iO,{size:40,className:"text-[#4B0082]"}),P.jsx("span",{className:"font-black text-sm uppercase z-10 text-center px-4",children:c.perfil?"Selfie Confirmada (Toque para Refazer)":"Tirar Foto Limpa do Seu Rosto"})]}),P.jsxs("div",{onClick:()=>d("cnh"),className:`
                            w-full 
                            h-40 
                            rounded-3xl 
                            border-2 
                            border-dashed 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            gap-3 
                            relative 
                            overflow-hidden 
                            transition-colors 
                            ${c.cnh?"border-[#82C91E] bg-green-50":"border-[#4B0082] bg-white cursor-pointer"}
                        `,children:[c.cnh?P.jsx("img",{src:c.cnh,className:"absolute inset-0 w-full h-full object-cover opacity-50",alt:"CNH"}):P.jsx(NM,{size:40,className:"text-[#4B0082]"}),P.jsx("span",{className:"font-black text-sm uppercase z-10 text-center px-4",children:c.cnh?"CNH Confirmada (Toque para Refazer)":"Tirar Foto da Frente da CNH"})]}),P.jsx("button",{disabled:s,onClick:p,className:`
                            w-full 
                            py-6 
                            mt-8 
                            rounded-[2rem] 
                            font-[1000] 
                            uppercase 
                            text-sm 
                            shadow-xl 
                            transition-all 
                            ${s?"bg-slate-300 text-slate-500 cursor-not-allowed":"bg-[#4B0082] text-[#82C91E] active:scale-95"}
                        `,children:s?"Processando Documentos na Nuvem...":"Finalizar e Enviar Cadastro"})]})]})},b3=({onClose:t})=>P.jsxs("div",{className:`\r
                fixed \r
                inset-0 \r
                z-[5000] \r
                bg-[#1F0137]/95 \r
                backdrop-blur-xl \r
                flex \r
                flex-col \r
                items-center \r
                justify-center \r
                p-6 \r
                text-center\r
            `,children:[P.jsx(US,{size:90,className:`\r
                    text-red-500 \r
                    mb-6 \r
                    animate-pulse \r
                    drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]\r
                `}),P.jsx("h2",{className:`\r
                    text-5xl \r
                    font-[1000] \r
                    uppercase \r
                    italic \r
                    tracking-tighter \r
                    text-white \r
                    mb-4\r
                `,children:"EMERGÊNCIA"}),P.jsx("p",{className:`\r
                    text-slate-300 \r
                    font-bold \r
                    uppercase \r
                    tracking-widest \r
                    text-xs \r
                    mb-10 \r
                    max-w-xs \r
                    leading-relaxed\r
                `,children:"Acione o suporte imediatamente se você sofreu um acidente, foi vítima de roubo ou teve problemas críticos com o pacote."}),P.jsxs("button",{onClick:()=>{Tt.impact({style:Nt.Medium}),window.open(`https://wa.me/${x3}`)},className:`\r
                    w-full \r
                    max-w-sm \r
                    py-6 \r
                    mb-4 \r
                    bg-green-500 \r
                    text-white \r
                    rounded-[2rem] \r
                    font-[1000] \r
                    uppercase \r
                    tracking-widest \r
                    text-sm \r
                    flex \r
                    items-center \r
                    justify-center \r
                    gap-4 \r
                    shadow-xl \r
                    active:scale-95 \r
                    transition-transform\r
                `,children:[P.jsx($M,{size:24}),"Contato com a Base"]}),P.jsxs("button",{onClick:()=>{Tt.impact({style:Nt.Heavy}),window.open("tel:190")},className:`\r
                    w-full \r
                    max-w-sm \r
                    py-6 \r
                    mb-10 \r
                    bg-red-600 \r
                    text-white \r
                    rounded-[2rem] \r
                    font-[1000] \r
                    uppercase \r
                    tracking-widest \r
                    text-sm \r
                    flex \r
                    items-center \r
                    justify-center \r
                    gap-4 \r
                    shadow-xl \r
                    active:scale-95 \r
                    transition-transform\r
                `,children:[P.jsx(QM,{size:24}),"Ligar 190 (Polícia)"]}),P.jsx("button",{onClick:t,className:`\r
                    text-white/50 \r
                    font-black \r
                    uppercase \r
                    text-xs \r
                    tracking-widest \r
                    border-b \r
                    border-white/30 \r
                    pb-1 \r
                    hover:text-white \r
                    transition-colors\r
                `,children:"Cancelar e Fechar Menu"})]}),N3=({onSave:t,onCancel:e})=>{const n=D.useRef(null),[r,i]=D.useState(!1);D.useEffect(()=>{const h=n.current,d=h.getContext("2d");d.strokeStyle="#4B0082",d.lineWidth=5,d.lineJoin="round",d.lineCap="round",d.fillStyle="#ffffff",d.fillRect(0,0,h.width,h.height)},[]);const s=h=>{const p=n.current.getBoundingClientRect(),g=h.touches?h.touches[0].clientX:h.clientX,E=h.touches?h.touches[0].clientY:h.clientY;return{offsetX:g-p.left,offsetY:E-p.top}},o=h=>{const{offsetX:d,offsetY:p}=s(h),g=n.current.getContext("2d");g.beginPath(),g.moveTo(d,p),i(!0)},a=h=>{if(!r)return;h.cancelable&&h.preventDefault();const{offsetX:d,offsetY:p}=s(h),g=n.current.getContext("2d");g.lineTo(d,p),g.stroke()},u=()=>{i(!1)},c=()=>{const h=n.current,d=h.getContext("2d");d.clearRect(0,0,h.width,h.height),d.fillStyle="#ffffff",d.fillRect(0,0,h.width,h.height),Tt.impact({style:Nt.Light})};return P.jsxs("div",{className:`\r
                bg-white \r
                p-6 \r
                rounded-[2.5rem] \r
                shadow-2xl \r
                w-full \r
                max-w-sm \r
                border \r
                border-slate-200 \r
                flex \r
                flex-col \r
                gap-4\r
            `,children:[P.jsx("div",{className:"flex justify-between items-center mt-2",children:P.jsxs("h3",{className:`\r
                        text-base \r
                        font-black \r
                        text-[#4B0082] \r
                        uppercase \r
                        flex \r
                        items-center \r
                        gap-2\r
                    `,children:[P.jsx(GM,{className:"text-[#EA1D2C]"}),"Coletar Assinatura"]})}),P.jsx("div",{className:`\r
                    w-full \r
                    border-2 \r
                    border-dashed \r
                    border-slate-300 \r
                    rounded-2xl \r
                    bg-white \r
                    overflow-hidden \r
                    touch-none \r
                    relative \r
                    shadow-inner\r
                `,children:P.jsx("canvas",{ref:n,width:320,height:220,className:"w-full h-full cursor-crosshair bg-slate-50",onMouseDown:o,onMouseMove:a,onMouseUp:u,onMouseLeave:u,onTouchStart:o,onTouchMove:a,onTouchEnd:u})}),P.jsxs("div",{className:"flex gap-2",children:[P.jsx("button",{onClick:c,className:`\r
                        flex-1 \r
                        py-4 \r
                        bg-slate-100 \r
                        text-slate-600 \r
                        rounded-2xl \r
                        font-black \r
                        uppercase \r
                        text-xs \r
                        hover:bg-slate-200 \r
                        transition-colors \r
                        shadow-sm\r
                    `,children:"Limpar"}),P.jsx("button",{onClick:()=>{Tt.impact({style:Nt.Light}),e()},className:`\r
                        flex-1 \r
                        py-4 \r
                        bg-red-50 \r
                        text-red-500 \r
                        rounded-2xl \r
                        font-black \r
                        uppercase \r
                        text-xs \r
                        hover:bg-red-100 \r
                        transition-colors \r
                        shadow-sm\r
                    `,children:"Cancelar"})]}),P.jsx("button",{onClick:()=>{Tt.impact({style:Nt.Heavy}),t(n.current.toDataURL("image/jpeg",.7))},className:`\r
                    w-full \r
                    py-5 \r
                    mt-2 \r
                    bg-[#82C91E] \r
                    text-[#4B0082] \r
                    rounded-2xl \r
                    font-black \r
                    uppercase \r
                    text-sm \r
                    shadow-lg \r
                    hover:brightness-110 \r
                    active:scale-95 \r
                    transition-transform\r
                `,children:"Confirmar Traço"})]})},D3=()=>{var qi,Gi,ho;const t=DA(),e=C3(),n=A3(),[r,i]=D.useState(null),[s,o]=D.useState("WELCOME"),[a,u]=D.useState(!1),[c,h]=D.useState(!1),[d,p]=D.useState("RADAR"),[g,E]=D.useState(!1),[A,C]=D.useState(null),[w,v]=D.useState(60),[T,N]=D.useState([]),[L,O]=D.useState([]),[S,y]=D.useState("TODOS"),[I,x]=D.useState(!1),[k,b]=D.useState(null),[R,me]=D.useState(""),re=D.useRef(null),ye=D.useRef(null),ft=D.useRef({time:0}),[U,G]=D.useState(""),[W,J]=D.useState(""),[X,ue]=D.useState(()=>{try{const B=localStorage.getItem("config_som_radar_v2");return B?JSON.parse(B):{src:"https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",volume:1}}catch{return{src:"https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",volume:1}}});D.useEffect(()=>{re.current?re.current.src!==X.src&&(re.current.src=X.src):(re.current=new Audio(X.src),re.current.loop=!0),re.current.volume=X.volume},[X]),D.useEffect(()=>{if(s==="SPLASH"){const B=setTimeout(()=>{o("WELCOME")},3e3);return()=>clearTimeout(B)}},[s]);const ze=async B=>{if(B.preventDefault(),!e)return t("Sem conexão com a internet. Verifique o sinal da sua operadora.","error");const ie=bA(U);if(ie.length!==11)return t("Formato de CPF inválido. Digite 11 números.","error");u(!0);try{t("Autenticando na base central...","info");const ge=await cM(kt(Ze,"entregadores",ie));if(ge.exists()&&ge.data().senha===W){const Ae=ge.data();i({id:ge.id,...Ae}),Tt.impact({style:Nt.Heavy}),re.current&&re.current.play().then(()=>{re.current.pause()}).catch(je=>console.log("Bloqueio silencioso de áudio ignorado.",je)),t(`Bem-vindo, ${Ae.nome.split(" ")[0]}!`,"success")}else t("Credenciais inválidas. CPF não encontrado ou senha errada.","error")}catch(ge){console.error(ge),t("Erro na resposta do servidor. Contate o suporte.","error")}finally{u(!1)}},Pe=()=>{window.confirm("Deseja desconectar sua conta deste aparelho? Seu turno será pausado.")&&(i(null),o("WELCOME"),h(!1),ye.current&&ui.clearWatch({id:ye.current}),t("Conta desconectada em segurança.","info"))};D.useEffect(()=>{if(!r||!g||r.statusAprovacao!=="APROVADO")return;const B=Ed(wd(Ze,"pedidos"),Zi("statusDespacho","==","OFERTA_INDIVIDUAL"),Zi("entregadorAtualOferta","==",r.id)),ie=Td(B,je=>{var Ft,mt;if(je.empty)C(null),re.current&&!re.current.paused&&(re.current.pause(),re.current.currentTime=0);else{const Ht={id:je.docs[0].id,...je.docs[0].data()},Bn=S3((Ft=Ht.endereco)==null?void 0:Ft.lat,(mt=Ht.endereco)==null?void 0:mt.lng);if(S!=="TODOS"&&Bn!==S){Je(Ht.id);return}C(Ht),v(60),re.current&&re.current.paused&&(re.current.play().catch(()=>{}),Tt.vibrate())}}),ge=Ed(wd(Ze,"pedidos"),Zi("entregadorId","==",r.id),Zi("status","in",["A_CAMINHO_LOJA","SAIU_ENTREGA"])),Ae=Td(ge,je=>{const Ft=je.docs.map(mt=>({id:mt.id,...mt.data()}));N(Ft),Ft.length===0&&(r.status==="Coletando"||r.status==="Em Rota")&&(Gt(kt(Ze,"entregadores",r.id),{status:"Livre"}),i(mt=>({...mt,status:"Livre"})))});return()=>{ie(),Ae()}},[r==null?void 0:r.id,g,S,r==null?void 0:r.status,r==null?void 0:r.statusAprovacao]),D.useEffect(()=>{if(!r||d!=="HISTORICO")return;const B=Ed(wd(Ze,"pedidos"),Zi("entregadorId","==",r.id),Zi("status","==","CONCLUIDO"),iM("horarioConcluido","desc"),sM(20)),ie=Td(B,ge=>{const Ae=ge.docs.map(je=>({id:je.id,...je.data()}));O(Ae)});return()=>ie()},[r==null?void 0:r.id,d]),D.useEffect(()=>{if(!A)return;const B=setInterval(()=>{v(ie=>ie<=1?(Je(A.id),clearInterval(B),0):ie-1)},1e3);return()=>clearInterval(B)},[A]);const Je=async B=>{try{await Gt(kt(Ze,"pedidos",B),{entregadorAtualOferta:"PROXIMO_FILA",tentativas:dM(1)}),C(null)}catch(ie){console.error("Falha ao passar bastão de oferta",ie)}},pt=async()=>{u(!0);try{await Gt(kt(Ze,"pedidos",A.id),{status:"A_CAMINHO_LOJA",statusDespacho:"Atribuído",statusLogistica:"AGUARDANDO_COLETA",entregadorId:r.id,entregadorAtualOferta:null,horarioAceitePiloto:Wo()}),r.status==="Livre"&&(await Gt(kt(Ze,"entregadores",r.id),{status:"Coletando"}),i(B=>({...B,status:"Coletando"}))),Tt.impact({style:Nt.Heavy}),C(null),t("Missão aceita com sucesso! Direcione-se para a base.","success"),re.current&&!re.current.paused&&(re.current.pause(),re.current.currentTime=0)}catch{t("Falha critica: A missão expirou ou foi retirada da sua tela.","error")}finally{u(!1)}},vh=async B=>{Tt.impact({style:Nt.Light}),await Gt(kt(Ze,"pedidos",B),{statusLogistica:"COLETADO_NA_LOJA"})},_h=async()=>{Tt.vibrate(),u(!0);try{const B=T.map(ie=>Gt(kt(Ze,"pedidos",ie.id),{status:"SAIU_ENTREGA",statusLogistica:"EM_TRANSITO"}));await Promise.all(B),await Gt(kt(Ze,"entregadores",r.id),{status:"Em Rota"}),i(ie=>({...ie,status:"Em Rota"})),t("Rota de despachos Iniciada. Pilote com atenção!","success")}catch{t("Erro fatal na transação de rota.","error")}finally{u(!1)}},$i=async B=>{Tt.impact({style:Nt.Heavy}),await Gt(kt(Ze,"pedidos",B),{statusLogistica:"CHEGOU_NO_LOCAL",horarioChegadaCliente:Wo()}),t("Cliente está sendo notificado por SMS/Push!","success")},Wi=async B=>{if(!e)return t("Requerimento não cumprido: Você está sem conexão com a internet.","error");if(Tt.impact({style:Nt.Medium}),B)try{if((await ui.checkPermissions()).location!=="granted"&&(await ui.requestPermissions()).location!=="granted")throw new Error("Permissão Negada.");t("Buscando satélite. Mantendo conexão aberta...","info");const ge=await ui.getCurrentPosition({enableHighAccuracy:!0});E(!0),await Gt(kt(Ze,"entregadores",r.id),{status:"Livre",coords:{lat:ge.coords.latitude,lng:ge.coords.longitude}}),i(Ae=>({...Ae,status:"Livre"})),t("Radar Central Ativado com sucesso!","success")}catch(ie){console.error("Log de Erro GPS",ie),t("Falha Sistêmica: Ative o GPS nas configurações do seu celular.","error"),E(!1)}else E(!1),ye.current!=null&&ui.clearWatch({id:ye.current}),await Gt(kt(Ze,"entregadores",r.id),{status:"Offline"}),i(ie=>({...ie,status:"Offline"})),t("Expediente finalizado. Radar offline.","info")};D.useEffect(()=>!r||!g||!e?void 0:((async()=>{ye.current=await ui.watchPosition({enableHighAccuracy:!0,timeout:5e3},async ie=>{if(!ie)return;const ge=Date.now(),Ae=n.isCritical?4e4:15e3;if(ge-ft.current.time>=Ae){ft.current={time:ge};try{await Gt(kt(Ze,"entregadores",r.id),{coords:{lat:ie.coords.latitude,lng:ie.coords.longitude},ultimaAtualizacao:Wo()})}catch(je){console.warn("Falha silenciosa ao atualizar posição no servidor",je)}}})})(),()=>{ye.current!=null&&ui.clearWatch({id:ye.current})}),[g,n,e,r]);const co=B=>{if(!R||R.trim()==="")return t("Obrigatoriedade: Digite o código pin informado.","error");if(R!==B.codigoEntrega)return t("Auditoria falhou: Código numérico incorreto!","error");B.requerAssinatura?b(B):RA.getPhoto({quality:70,resultType:Rc.DataUrl,source:kr.Camera}).then(ie=>{b(B),Hi(ie.dataUrl,!1)}).catch(()=>{t("Captura de prova documental cancelada.","info")})},Hi=async(B,ie=!1)=>{var ge,Ae,je;u(!0);try{t("Transacionando informações... enviando prova remota.","info");const Ft=ie?`entregas/${k.id}/assinaturas`:`entregas/${k.id}/fotos`,mt=await Dp(B,Ft),Ht=((ge=k.valores)==null?void 0:ge.taxaEntrega)||6,Bn=["DINHEIRO","MAQUININHA"].includes((Ae=k.pagamento)==null?void 0:Ae.metodo)&&((je=k.valores)==null?void 0:je.total)||0,Re=(r.ganhosTaxas||0)+Ht,Le=(r.debitosLoja||0)+Bn,xn=Re-Le;await Gt(kt(Ze,"pedidos",k.id),{status:"CONCLUIDO",provaEntregaUrl:mt,horarioConcluido:Wo()});const ri=T.length>1?"Em Rota":"Livre";await Gt(kt(Ze,"entregadores",r.id),{ganhosTaxas:Re,debitosLoja:Le,saldoLiquido:xn,status:ri}),i(gl=>({...gl,ganhosTaxas:Re,debitosLoja:Le,saldoLiquido:xn,status:ri})),b(null),me(""),t("Missão executada com brilhantismo e registrada no livro caixa!","success")}catch(Ft){console.error("Transacao Critica Abortada",Ft),t("Erro fatal no processo final. Retenha os dados offline.","error")}finally{u(!1)}};if(!r){if(s==="SPLASH"||a)return P.jsx(P3,{mensagem:a?"Sincronizando Banco de Dados...":"Iniciando Motor Primário..."});if(s==="CADASTRO")return P.jsx(k3,{onVoltar:()=>o("WELCOME"),onSucesso:()=>o("LOGIN")});if(s==="WELCOME")return P.jsxs("div",{className:`\r
                        h-[100dvh] \r
                        bg-[#1F0137] \r
                        flex \r
                        flex-col \r
                        items-center \r
                        justify-end \r
                        p-8 \r
                        relative \r
                        overflow-hidden\r
                    `,children:[P.jsx("div",{className:`\r
                            absolute \r
                            inset-0 \r
                            opacity-[0.03] \r
                            bg-[url('https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png')] \r
                            bg-repeat \r
                            bg-[length:120px_120px]\r
                        `}),P.jsx(Cn.img,{initial:{y:-50,opacity:0},animate:{y:0,opacity:1},transition:{type:"spring",stiffness:100},src:kA,className:`\r
                            w-44 \r
                            mb-auto \r
                            mt-20 \r
                            z-10 \r
                            drop-shadow-2xl\r
                        `,alt:"Logo Rodrigues Base"}),P.jsxs(Cn.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},className:`\r
                            w-full \r
                            bg-white/10 \r
                            backdrop-blur-xl \r
                            p-8 \r
                            rounded-[3rem] \r
                            border \r
                            border-white/10 \r
                            text-center \r
                            z-10 \r
                            shadow-[0_0_50px_rgba(0,0,0,0.5)]\r
                        `,children:[P.jsxs("h1",{className:`\r
                                text-4xl \r
                                font-[1000] \r
                                text-white \r
                                uppercase \r
                                italic \r
                                tracking-tighter \r
                                mb-2\r
                            `,children:["Rodrigues ",P.jsx("span",{className:"text-[#82C91E]",children:"Pilotos"})]}),P.jsxs("div",{className:"space-y-4 mt-8",children:[P.jsx("button",{onClick:()=>o("LOGIN"),className:`\r
                                    w-full \r
                                    h-16 \r
                                    bg-[#82C91E] \r
                                    text-[#4B0082] \r
                                    rounded-3xl \r
                                    font-[1000] \r
                                    uppercase \r
                                    text-sm \r
                                    shadow-lg \r
                                    active:scale-95 \r
                                    transition-transform\r
                                `,children:"Acessar Minha Conta"}),P.jsx("button",{onClick:()=>o("CADASTRO"),className:`\r
                                    w-full \r
                                    h-16 \r
                                    bg-transparent \r
                                    text-white \r
                                    border-2 \r
                                    border-white/20 \r
                                    rounded-3xl \r
                                    font-[1000] \r
                                    uppercase \r
                                    text-sm \r
                                    active:scale-95 \r
                                    transition-transform\r
                                `,children:"Quero ser um Piloto"})]})]})]});if(s==="LOGIN")return P.jsx("div",{className:`\r
                        min-h-screen \r
                        bg-[#F8FAFC] \r
                        flex \r
                        flex-col \r
                        p-6\r
                    `,children:P.jsxs("div",{className:`\r
                            flex-1 \r
                            flex \r
                            flex-col \r
                            justify-center \r
                            max-w-sm \r
                            mx-auto \r
                            w-full\r
                        `,children:[P.jsx("button",{onClick:()=>o("WELCOME"),className:`\r
                                mb-8 \r
                                p-3 \r
                                bg-white \r
                                w-12 \r
                                h-12 \r
                                rounded-2xl \r
                                shadow-sm \r
                                text-[#4B0082] \r
                                flex \r
                                items-center \r
                                justify-center\r
                            `,children:P.jsx(jS,{})}),P.jsx("h1",{className:`\r
                                text-4xl \r
                                font-[1000] \r
                                uppercase \r
                                italic \r
                                tracking-tighter \r
                                text-[#4B0082] \r
                                mb-8 \r
                                text-center\r
                            `,children:"Login Operacional"}),P.jsxs("form",{onSubmit:ze,className:`\r
                                space-y-5 \r
                                bg-white \r
                                p-8 \r
                                rounded-[3rem] \r
                                shadow-2xl \r
                                border \r
                                border-slate-100\r
                            `,children:[P.jsx("input",{type:"tel",placeholder:"CPF DO ENTREGADOR",value:Vp(U),onChange:B=>G(B.target.value),maxLength:14,className:`\r
                                    w-full \r
                                    h-16 \r
                                    bg-slate-50 \r
                                    border-2 \r
                                    border-slate-100 \r
                                    rounded-2xl \r
                                    px-6 \r
                                    text-xl \r
                                    font-black \r
                                    text-center \r
                                    outline-none \r
                                    focus:border-[#82C91E] \r
                                    text-[#4B0082]\r
                                `}),P.jsx("input",{type:"password",placeholder:"SENHA ALFANUMÉRICA",value:W,onChange:B=>J(B.target.value),className:`\r
                                    w-full \r
                                    h-16 \r
                                    bg-slate-50 \r
                                    border-2 \r
                                    border-slate-100 \r
                                    rounded-2xl \r
                                    px-6 \r
                                    text-xl \r
                                    font-black \r
                                    text-center \r
                                    outline-none \r
                                    focus:border-[#82C91E] \r
                                    text-[#4B0082]\r
                                `}),P.jsx("button",{type:"submit",disabled:a,className:`\r
                                    w-full \r
                                    h-16 \r
                                    mt-4 \r
                                    bg-[#4B0082] \r
                                    text-[#82C91E] \r
                                    rounded-3xl \r
                                    font-[1000] \r
                                    uppercase \r
                                    shadow-xl \r
                                    active:scale-95 \r
                                    transition-all \r
                                    disabled:opacity-50\r
                                `,children:"Autorizar Acesso"})]})]})})}return r.statusAprovacao==="PENDENTE"?P.jsx(R3,{onVoltar:()=>{i(null),o("WELCOME")}}):P.jsxs("div",{className:`\r
                min-h-screen \r
                bg-[#3A0066] \r
                pb-32 \r
                relative \r
                overflow-x-hidden \r
                pt-[env(safe-area-inset-top)]\r
            `,children:[P.jsxs("header",{className:`\r
                    bg-white \r
                    px-5 \r
                    py-3 \r
                    sticky \r
                    top-0 \r
                    z-[100] \r
                    shadow \r
                    flex \r
                    justify-between \r
                    items-center \r
                    rounded-b-[2.5rem]\r
                `,children:[P.jsxs("div",{className:"flex items-center gap-4",children:[P.jsx("button",{onClick:()=>h(!0),className:`\r
                            w-12 \r
                            h-12 \r
                            bg-slate-50 \r
                            rounded-[1.2rem] \r
                            flex \r
                            items-center \r
                            justify-center \r
                            text-[#4B0082] \r
                            shadow-inner \r
                            active:scale-95 \r
                            transition-transform\r
                        `,children:P.jsx(BM,{size:24})}),P.jsxs("div",{children:[P.jsx("h1",{className:`\r
                                font-[1000] \r
                                italic \r
                                text-sm \r
                                uppercase \r
                                text-[#4B0082] \r
                                leading-none\r
                            `,children:"Pilotos App"}),P.jsxs("p",{className:`\r
                                text-[8px] \r
                                font-black \r
                                text-slate-400 \r
                                uppercase \r
                                tracking-[0.2em] \r
                                mt-1.5 \r
                                flex \r
                                items-center \r
                                gap-1\r
                            `,children:["Métrica Bateria:",P.jsxs("span",{className:n.isCritical?"text-red-500":"text-green-500",children:[n.level,"%"]})]})]})]}),P.jsxs("button",{onClick:()=>Wi(!g),className:`
                        w-14 
                        h-14 
                        rounded-2xl 
                        flex 
                        flex-col 
                        items-center 
                        justify-center 
                        gap-0.5 
                        border-2 
                        transition-colors 
                        ${g?"bg-[#82C91E] text-[#4B0082] border-[#82C91E]":"bg-white text-slate-400 border-slate-200"}
                    `,children:[P.jsx(XM,{size:20,strokeWidth:g?3:2}),P.jsx("span",{className:"text-[8px] font-black uppercase",children:g?"ON":"OFF"})]})]}),P.jsx(Rp,{children:c&&P.jsxs("div",{className:"fixed inset-0 z-[1000] flex",children:[P.jsx(Cn.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:`\r
                                absolute \r
                                inset-0 \r
                                bg-[#4B0082]/80 \r
                                backdrop-blur-md\r
                            `,onClick:()=>h(!1)}),P.jsxs(Cn.div,{initial:{x:"-100%"},animate:{x:0},exit:{x:"-100%"},transition:{type:"spring",damping:25,stiffness:200},className:`\r
                                w-[85%] \r
                                max-w-[340px] \r
                                bg-white \r
                                h-full \r
                                shadow-2xl \r
                                flex \r
                                flex-col \r
                                rounded-r-[3rem] \r
                                overflow-hidden \r
                                relative \r
                                z-20\r
                            `,children:[P.jsxs("div",{className:`\r
                                    p-8 \r
                                    bg-gradient-to-br \r
                                    from-[#1F0137] \r
                                    to-[#4B0082] \r
                                    text-white\r
                                `,children:[P.jsx("div",{className:`\r
                                        w-20 \r
                                        h-20 \r
                                        bg-white/10 \r
                                        rounded-[2rem] \r
                                        mb-5 \r
                                        border-2 \r
                                        border-[#82C91E]/50 \r
                                        overflow-hidden \r
                                        shadow-inner\r
                                    `,children:P.jsx("img",{src:r.urlPerfil,className:"w-full h-full object-cover",alt:"Perfil Motorista"})}),P.jsx("h2",{className:`\r
                                        text-2xl \r
                                        font-[1000] \r
                                        uppercase \r
                                        truncate \r
                                        italic \r
                                        tracking-tighter\r
                                    `,children:r.nome}),P.jsxs("p",{className:`\r
                                        text-[10px] \r
                                        font-black \r
                                        text-[#82C91E] \r
                                        mt-2 \r
                                        flex \r
                                        items-center \r
                                        gap-1.5 \r
                                        uppercase \r
                                        tracking-widest\r
                                    `,children:[P.jsx("div",{className:`
                                            w-2 
                                            h-2 
                                            rounded-full 
                                            ${g?"bg-[#82C91E] animate-pulse":"bg-red-500"}
                                        `}),"CPF: ",Vp(r.id)]})]}),P.jsx("nav",{className:`\r
                                    p-6 \r
                                    flex-1 \r
                                    space-y-3 \r
                                    bg-[#F8FAFC] \r
                                    overflow-y-auto\r
                                `,children:[{id:"RADAR",icon:ZM,label:"Radar Central"},{id:"CARTEIRA",icon:oO,label:"Livro Caixa"},{id:"HISTORICO",icon:VM,label:"Histórico"},{id:"PERFIL",icon:tO,label:"Ajustes App"}].map(B=>P.jsxs("button",{onClick:()=>{p(B.id),h(!1)},className:`
                                            w-full 
                                            p-5 
                                            flex 
                                            items-center 
                                            gap-4 
                                            rounded-[2rem] 
                                            font-[1000] 
                                            text-xs 
                                            uppercase 
                                            transition-colors 
                                            ${d===B.id?"bg-white border-2 border-[#4B0082] text-[#4B0082] shadow-xl":"text-slate-500 bg-white border border-transparent"}
                                        `,children:[P.jsx("div",{className:`
                                                p-2 
                                                rounded-xl 
                                                bg-slate-50 
                                                ${d===B.id?"text-[#4B0082]":"text-slate-400"}
                                            `,children:P.jsx(B.icon,{size:20})}),B.label]},B.id))}),P.jsxs("div",{className:`\r
                                    p-6 \r
                                    bg-white \r
                                    border-t \r
                                    border-slate-100 \r
                                    flex \r
                                    gap-2\r
                                `,children:[P.jsxs("button",{onClick:()=>x(!0),className:`\r
                                        flex-1 \r
                                        p-4 \r
                                        bg-red-100 \r
                                        text-red-600 \r
                                        rounded-2xl \r
                                        font-black \r
                                        text-xs \r
                                        uppercase \r
                                        shadow-sm \r
                                        active:scale-95\r
                                    `,children:[P.jsx(US,{className:"mx-auto mb-1"})," SOS"]}),P.jsxs("button",{onClick:Pe,className:`\r
                                        flex-1 \r
                                        p-4 \r
                                        bg-slate-100 \r
                                        text-slate-600 \r
                                        rounded-2xl \r
                                        font-black \r
                                        text-xs \r
                                        uppercase \r
                                        shadow-sm \r
                                        active:scale-95\r
                                    `,children:[P.jsx(FM,{className:"mx-auto mb-1"})," Sair"]})]})]})]})}),P.jsxs("main",{className:"p-6",children:[d==="RADAR"&&P.jsx("div",{className:"space-y-6",children:g?P.jsxs(Rp,{mode:"popLayout",children:[A&&r.status!=="Em Rota"&&P.jsxs(Cn.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:`\r
                                            bg-gradient-to-br \r
                                            from-[#EA1D2C] \r
                                            to-red-900 \r
                                            rounded-[3rem] \r
                                            p-8 \r
                                            shadow-2xl \r
                                            ring-4 \r
                                            ring-red-500/30 \r
                                            mb-6 \r
                                            relative\r
                                        `,children:[P.jsxs("div",{className:"flex justify-between items-start mb-6",children:[P.jsxs("span",{className:`\r
                                                    bg-white \r
                                                    text-red-600 \r
                                                    px-4 \r
                                                    py-2 \r
                                                    rounded-full \r
                                                    font-[1000] \r
                                                    text-[10px] \r
                                                    uppercase\r
                                                `,children:[w,"s RESTANTES"]}),P.jsxs("div",{className:"text-right",children:[P.jsx("p",{className:"text-[9px] font-black text-white/60 uppercase",children:"Ganho Estimado"}),P.jsxs("span",{className:"font-[1000] text-[#82C91E] text-3xl italic",children:["R$ ",(Gi=(qi=A.valores)==null?void 0:qi.taxaEntrega)==null?void 0:Gi.toFixed(2)]})]})]}),P.jsxs("div",{className:"bg-black/20 p-5 rounded-3xl mb-8",children:[P.jsxs("p",{className:"text-[9px] font-black text-white/50 uppercase",children:[P.jsx(k_,{size:12,className:"inline"})," Bairro de Destino"]}),P.jsx("h3",{className:"font-[1000] text-2xl text-white uppercase italic truncate",children:(ho=A.endereco)==null?void 0:ho.bairro})]}),P.jsxs("div",{className:"flex gap-3",children:[P.jsx("button",{onClick:()=>Je(A.id),className:`\r
                                                    w-20 \r
                                                    py-5 \r
                                                    bg-white/10 \r
                                                    text-white \r
                                                    rounded-[2rem] \r
                                                    flex \r
                                                    items-center \r
                                                    justify-center \r
                                                    font-black \r
                                                    active:scale-95\r
                                                `,children:P.jsx(lO,{size:24})}),P.jsx("button",{onClick:pt,className:`\r
                                                    flex-1 \r
                                                    py-5 \r
                                                    bg-white \r
                                                    text-[#EA1D2C] \r
                                                    rounded-[2rem] \r
                                                    font-[1000] \r
                                                    uppercase \r
                                                    italic \r
                                                    text-sm \r
                                                    active:scale-95 \r
                                                    shadow-lg\r
                                                `,children:"ACEITAR AGORA"})]})]}),T.map(B=>{var ge,Ae,je,Ft,mt,Ht,Bn,Re,Le,xn;const ie=B.statusLogistica==="COLETADO_NA_LOJA";return r.status!=="Em Rota"?P.jsxs(Cn.div,{className:`
                                                    bg-white 
                                                    rounded-[3rem] 
                                                    shadow-xl 
                                                    p-8 
                                                    border 
                                                    mb-6 
                                                    ${ie?"border-[#82C91E]":"border-slate-100"}
                                                `,children:[P.jsxs("div",{className:"flex justify-between items-center mb-6",children:[P.jsxs("div",{children:[P.jsxs("p",{className:"text-[10px] font-black uppercase text-slate-400",children:["REGISTRO #",B.id.slice(-4)]}),P.jsx("h3",{className:"text-xl font-[1000] text-[#4B0082] uppercase italic mt-1",children:(ge=B.endereco)==null?void 0:ge.bairro})]}),P.jsxs("p",{className:"text-xl font-[1000] text-red-600 italic",children:["R$ ",(je=(Ae=B.valores)==null?void 0:Ae.total)==null?void 0:je.toFixed(2)]})]}),ie?P.jsx("div",{className:`\r
                                                            w-full \r
                                                            py-5 \r
                                                            bg-[#82C91E]/20 \r
                                                            text-[#4B0082] \r
                                                            rounded-[2rem] \r
                                                            font-[1000] \r
                                                            uppercase \r
                                                            text-xs \r
                                                            text-center \r
                                                            border-2 \r
                                                            border-[#82C91E]\r
                                                        `,children:"NA MOCHILA"}):P.jsx("button",{onClick:()=>vh(B.id),className:`\r
                                                            w-full \r
                                                            py-5 \r
                                                            bg-[#4B0082] \r
                                                            text-[#82C91E] \r
                                                            rounded-[2rem] \r
                                                            font-[1000] \r
                                                            uppercase \r
                                                            text-xs \r
                                                            shadow-xl \r
                                                            active:scale-95\r
                                                        `,children:"SINALIZAR COLETA"})]},B.id):P.jsxs(Cn.div,{className:`\r
                                                    bg-white \r
                                                    rounded-[3.5rem] \r
                                                    shadow-2xl \r
                                                    p-8 \r
                                                    mb-6\r
                                                `,children:[P.jsxs("div",{className:"flex justify-between items-start mb-6",children:[P.jsxs("span",{className:"text-[10px] font-[1000] text-slate-500 uppercase tracking-widest",children:["PACOTE #",B.id.slice(-4)]}),P.jsxs("div",{className:"text-right",children:[P.jsx("p",{className:"text-[8px] font-black text-slate-400 uppercase",children:"PAGAR AO MOTORISTA"}),P.jsxs("p",{className:"text-2xl font-[1000] text-[#EA1D2C] italic leading-none my-1.5",children:["R$ ",(mt=(Ft=B.valores)==null?void 0:Ft.total)==null?void 0:mt.toFixed(2)]}),P.jsx("span",{className:"text-[8px] font-[1000] uppercase px-2 py-0.5 rounded bg-purple-50 text-[#4B0082]",children:(Ht=B.pagamento)==null?void 0:Ht.metodo})]})]}),P.jsx("h3",{className:"text-4xl font-[1000] text-[#4B0082] uppercase tracking-tighter leading-none mb-8",children:(Bn=B.cliente)==null?void 0:Bn.nome}),P.jsxs("div",{className:"bg-slate-50 rounded-[2rem] p-6 mb-6 flex items-center gap-4",children:[P.jsx("div",{className:"w-10 h-10 bg-white rounded-full flex items-center justify-center border shrink-0",children:P.jsx(k_,{size:20,className:"text-[#4B0082]"})}),P.jsxs("div",{children:[P.jsxs("p",{className:"text-sm font-[1000] text-[#4B0082] uppercase italic",children:[(Re=B.endereco)==null?void 0:Re.rua,", ",(Le=B.endereco)==null?void 0:Le.numero]}),P.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1",children:(xn=B.endereco)==null?void 0:xn.bairro})]})]}),P.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-8",children:[P.jsxs("button",{onClick:()=>window.open(`https://maps.google.com/?q=$$${B.endereco.rua}`),className:`\r
                                                            bg-white \r
                                                            py-4 \r
                                                            rounded-[1.5rem] \r
                                                            border \r
                                                            border-slate-200 \r
                                                            font-[1000] \r
                                                            text-[8px] \r
                                                            text-slate-500 \r
                                                            uppercase \r
                                                            active:scale-95 \r
                                                            transition-transform \r
                                                            flex \r
                                                            flex-col \r
                                                            items-center \r
                                                            gap-2\r
                                                        `,children:[P.jsx("img",{src:"https://www.gstatic.com/images/branding/product/2x/maps_96dp.png",className:"w-6",alt:"Maps"}),"MAPS GERAL"]}),P.jsxs("button",{onClick:()=>window.open(`https://waze.com/ul?q=${B.endereco.rua}`),className:`\r
                                                            bg-white \r
                                                            py-4 \r
                                                            rounded-[1.5rem] \r
                                                            border \r
                                                            border-slate-200 \r
                                                            font-[1000] \r
                                                            text-[8px] \r
                                                            text-slate-500 \r
                                                            uppercase \r
                                                            active:scale-95 \r
                                                            transition-transform \r
                                                            flex \r
                                                            flex-col \r
                                                            items-center \r
                                                            gap-2\r
                                                        `,children:[P.jsx("img",{src:"https://upload.wikimedia.org/wikipedia/commons/6/66/Waze_icon.svg",className:"w-6",alt:"Waze"}),"WAZE ROTAS"]})]}),B.statusLogistica!=="CHEGOU_NO_LOCAL"?P.jsx("button",{onClick:()=>$i(B.id),className:`\r
                                                            w-full \r
                                                            py-5 \r
                                                            bg-blue-500 \r
                                                            text-white \r
                                                            rounded-[2rem] \r
                                                            font-[1000] \r
                                                            uppercase \r
                                                            text-xs \r
                                                            shadow-lg \r
                                                            active:scale-95\r
                                                        `,children:"MARCAR CHEGADA NA PORTA"}):P.jsxs("div",{className:"bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200 shadow-inner",children:[P.jsx("input",{type:"number",placeholder:"DIGITE O PIN (4)",value:R,onChange:ri=>me(ri.target.value),className:`\r
                                                                w-full \r
                                                                h-16 \r
                                                                bg-white \r
                                                                border-2 \r
                                                                border-[#82C91E] \r
                                                                rounded-2xl \r
                                                                text-center \r
                                                                text-2xl \r
                                                                font-[1000] \r
                                                                text-[#4B0082] \r
                                                                outline-none \r
                                                                mb-4 \r
                                                                tracking-widest\r
                                                            `}),P.jsx("button",{onClick:()=>co(B),className:`\r
                                                                w-full \r
                                                                py-5 \r
                                                                bg-[#82C91E] \r
                                                                text-[#4B0082] \r
                                                                rounded-2xl \r
                                                                font-[1000] \r
                                                                uppercase \r
                                                                text-xs \r
                                                                shadow-xl \r
                                                                active:scale-95\r
                                                            `,children:"VALIDAR E FINALIZAR"})]})]},B.id)})]}):P.jsxs("div",{className:"text-center pt-32 opacity-30",children:[P.jsx(HM,{size:100,className:"mx-auto mb-6 text-white drop-shadow-lg"}),P.jsx("h2",{className:`\r
                                        text-3xl \r
                                        font-[1000] \r
                                        uppercase \r
                                        italic \r
                                        tracking-tighter \r
                                        text-white\r
                                    `,children:"Radar Adormecido"})]})}),d==="HISTORICO"&&P.jsxs("div",{className:"space-y-4",children:[P.jsx("h2",{className:"text-2xl font-[1000] text-white uppercase italic tracking-tighter mb-6",children:"Repositório de Missões"}),L.length===0?P.jsx("p",{className:"text-white/50 text-center text-sm font-bold mt-10 uppercase tracking-widest",children:"O histórico em memória não possui registros."}):L.map(B=>{var ie,ge,Ae;return P.jsxs("div",{className:`\r
                                        bg-white/10 \r
                                        p-5 \r
                                        rounded-3xl \r
                                        border \r
                                        border-white/10 \r
                                        flex \r
                                        justify-between \r
                                        items-center \r
                                        backdrop-blur-md \r
                                        shadow-lg\r
                                    `,children:[P.jsxs("div",{children:[P.jsxs("p",{className:"text-[10px] text-[#82C91E] font-black uppercase tracking-widest",children:["LOTE #",B.id.slice(-4)," •",new Date((ie=B.horarioConcluido)==null?void 0:ie.toDate()).toLocaleDateString()]}),P.jsx("p",{className:"text-white font-[1000] uppercase mt-1 text-sm truncate max-w-[150px]",children:(ge=B.endereco)==null?void 0:ge.bairro})]}),P.jsxs("p",{className:"text-[#82C91E] font-[1000] text-xl italic",children:["+",su(((Ae=B.valores)==null?void 0:Ae.taxaEntrega)||6)]})]},B.id)})]}),d==="PERFIL"&&P.jsxs("div",{className:"space-y-6",children:[P.jsxs("div",{className:`\r
                                bg-white \r
                                p-10 \r
                                rounded-[3rem] \r
                                text-center \r
                                border \r
                                border-slate-100 \r
                                relative \r
                                overflow-hidden \r
                                shadow-sm\r
                            `,children:[P.jsx("div",{className:`\r
                                    w-28 \r
                                    h-28 \r
                                    mx-auto \r
                                    bg-slate-50 \r
                                    rounded-[2.5rem] \r
                                    border-4 \r
                                    border-white \r
                                    shadow-lg \r
                                    overflow-hidden \r
                                    mb-6\r
                                `,children:P.jsx("img",{src:r.urlPerfil,className:"w-full h-full object-cover",alt:"Foto de Identidade"})}),P.jsx("h2",{className:"text-2xl font-[1000] italic uppercase tracking-tighter text-[#4B0082]",children:r.nome}),P.jsxs("p",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2",children:[r.modalidade," Registrada • ",r.placa]})]}),P.jsxs("div",{className:"bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm",children:[P.jsx("h2",{className:"text-lg font-[1000] uppercase text-[#4B0082] italic mb-4",children:"Mixer de Áudio"}),P.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block",children:"Seletor de Frequência"}),P.jsxs("select",{value:X.src,onChange:B=>{const ie={...X,src:B.target.value};ue(ie),localStorage.setItem("config_som_radar_v2",JSON.stringify(ie))},className:`\r
                                    w-full \r
                                    bg-slate-50 \r
                                    p-4 \r
                                    rounded-2xl \r
                                    border \r
                                    border-slate-200 \r
                                    mb-4 \r
                                    font-bold \r
                                    text-[#4B0082] \r
                                    outline-none\r
                                `,children:[P.jsx("option",{value:"https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",children:"Padrão - Radar Clássico"}),P.jsx("option",{value:"https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3",children:"Alternativo - Alarme Suave"}),P.jsx("option",{value:"https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3",children:"Alternativo - Sino Digital"})]}),P.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block",children:"Potência do Som"}),P.jsx("input",{type:"range",min:"0.1",max:"1",step:"0.1",value:X.volume,onChange:B=>{const ie={...X,volume:parseFloat(B.target.value)};ue(ie),localStorage.setItem("config_som_radar_v2",JSON.stringify(ie))},className:`\r
                                    w-full \r
                                    accent-[#82C91E] \r
                                    h-2 \r
                                    bg-slate-200 \r
                                    rounded-lg \r
                                    mb-6\r
                                `}),P.jsx("button",{onClick:()=>{Tt.impact({style:Nt.Light});const B=new Audio(X.src);B.volume=X.volume,B.play(),setTimeout(()=>B.pause(),3e3)},className:`\r
                                    w-full \r
                                    py-4 \r
                                    bg-[#82C91E]/10 \r
                                    text-[#4B0082] \r
                                    rounded-2xl \r
                                    font-[1000] \r
                                    uppercase \r
                                    text-xs \r
                                    shadow-sm \r
                                    active:scale-95\r
                                `,children:"Diagnóstico de Áudio"})]}),P.jsxs("div",{className:"bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm",children:[P.jsx("h2",{className:"text-lg font-[1000] uppercase text-[#4B0082] italic mb-4",children:"Configuração Setorial"}),P.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6",children:"Force o algoritmo a filtrar pedidos apenas para a direção configurada."}),P.jsx("div",{className:"grid grid-cols-2 gap-3",children:["TODOS","NORTE","SUL","LESTE","OESTE","NORDESTE","SUDOESTE","NOROESTE","SUDESTE"].map(B=>P.jsx("button",{onClick:()=>{y(B),t(`Diretriz logística alterada para ${B}`,"info")},className:`
                                            py-4 
                                            rounded-2xl 
                                            font-black 
                                            text-[10px] 
                                            uppercase 
                                            border-2 
                                            transition-colors
                                            ${S===B?"bg-[#4B0082] text-[#82C91E] border-[#4B0082]":"bg-slate-50 text-slate-500 border-slate-100"}
                                        `,children:B},B))})]})]}),d==="CARTEIRA"&&P.jsx("div",{className:"space-y-6",children:P.jsxs("div",{className:"bg-white p-10 rounded-[3rem] text-center border shadow-sm",children:[P.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2",children:"Saldo Global do Turno"}),P.jsx("p",{className:`
                                    text-5xl 
                                    font-[1000] 
                                    italic 
                                    tracking-tighter 
                                    ${(r.saldoLiquido||0)<0?"text-[#EA1D2C]":"text-[#82C91E]"}
                                `,children:su(Math.abs(r.saldoLiquido||0))}),P.jsxs("p",{className:"text-xs font-bold text-slate-400 uppercase mt-4",children:["Valores devidos ao restaurante: ",su(r.debitosLoja||0)]}),P.jsxs("p",{className:"text-xs font-bold text-slate-400 uppercase mt-1",children:["Total taxas geradas: ",su(r.ganhosTaxas||0)]})]})})]}),d==="RADAR"&&r.status!=="Em Rota"&&T.length>0&&T.every(B=>B.statusLogistica==="COLETADO_NA_LOJA")&&P.jsx("div",{className:`\r
                        fixed \r
                        bottom-0 \r
                        left-0 \r
                        right-0 \r
                        p-6 \r
                        bg-[#3A0066] \r
                        pb-[calc(20px+env(safe-area-inset-bottom))] \r
                        z-[500] \r
                        shadow-[0_-20px_40px_rgba(0,0,0,0.3)]\r
                    `,children:P.jsx("button",{onClick:_h,disabled:a,className:`
                            w-full 
                            py-6 
                            rounded-[3rem] 
                            font-[1000] 
                            uppercase 
                            italic 
                            tracking-widest 
                            text-sm 
                            shadow-xl 
                            transition-transform
                            ${a?"bg-slate-400 text-slate-700":"bg-[#82C91E] text-[#4B0082] active:scale-95"}
                        `,children:a?"AGUARDE...":`INICIAR EXPEDIÇÃO COMPLETA (${T.length})`})}),I&&P.jsx(b3,{onClose:()=>x(!1)}),k&&k.requerAssinatura&&P.jsx("div",{className:`\r
                        fixed \r
                        inset-0 \r
                        z-[3000] \r
                        bg-[#4B0082]/90 \r
                        backdrop-blur-md \r
                        flex \r
                        items-center \r
                        justify-center \r
                        p-6\r
                    `,children:P.jsx(N3,{onCancel:()=>b(null),onSave:B=>Hi(B,!0)})})]})};function V3(){return P.jsx(I3,{children:P.jsx(D3,{})})}function L3(){return P.jsx(kk,{children:P.jsxs(Ck,{children:[P.jsx(Lf,{path:"/",element:P.jsx(V3,{})}),P.jsx(Lf,{path:"*",element:P.jsx(Ik,{to:"/"})})]})})}Ud.createRoot(document.getElementById("root")).render(P.jsx(lE.StrictMode,{children:P.jsx(L3,{})}));export{Nt as I,Np as N,ry as W};
