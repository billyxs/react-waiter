(this.webpackJsonppages=this.webpackJsonppages||[]).push([[0],{128:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(28),c=n.n(l),i=(n(39),n(15)),u=n(17),s=n(5),o=n.n(s),m=n(16),d=n.n(m),p=n(29),b=n(2);function E(){return(new Date).getTime()}function f(e,t){var n=Object(r.useRef)(null),a=Object(r.useRef)(null),l=Object(r.useRef)(null),c=Object(r.useRef)(!1),i=Object(r.useState)(null),u=Object(b.a)(i,2),s=u[0],o=u[1],m=Object(r.useState)(null),f=Object(b.a)(m,2),g=f[0],v=f[1],h=Object(r.useState)(!1),j=Object(b.a)(h,2),O=j[0],y=j[1],w=Object(r.useState)(!1),k=Object(b.a)(w,2),S=k[0],x=k[1],C=Object(r.useState)(!1),R=Object(b.a)(C,2),W=R[0],T=R[1],B=Object(r.useState)(!1),J=Object(b.a)(B,2),N=J[0],P=J[1],M=Object(r.useState)(!1),q=Object(b.a)(M,2),I=q[0],z=q[1],H=Object(r.useState)(null),A=Object(b.a)(H,2),D=A[0],G=A[1],L=Object(r.useState)(null),Y=Object(b.a)(L,2),$=Y[0],F=Y[1],K=Object(r.useState)(null),Q=Object(b.a)(K,2),U=Q[0],V=Q[1];function X(){return(X=Object(p.a)(d.a.mark((function t(r){var i,u,s,m;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.current=!1,a.current=r,i=n.current+1,n.current=i,t.prev=4,u=e(),s=!!l.current,z(s),o(u),v(null),y(!0),x(!1),T(!1),P(!1),G(E()),F(null),V(E()),t.next=19,u;case 19:if(m=t.sent,i===n.current){t.next=22;break}return t.abrupt("return");case 22:if(!c.current){t.next=24;break}return t.abrupt("return");case 24:l.current=m,x(!0),t.next=37;break;case 28:if(t.prev=28,t.t0=t.catch(4),i===n.current){t.next=32;break}return t.abrupt("return");case 32:if(!c.current){t.next=34;break}return t.abrupt("return");case 34:l.current=null,v(t.t0),T(!0);case 37:y(!1),P(!0),z(!1),F(E()),V(E());case 42:case"end":return t.stop()}}),t,null,[[4,28]])})))).apply(this,arguments)}var Z=Object(r.useCallback)((function(e){!function(e){X.apply(this,arguments)}(e)}),[]),_=Object(r.useCallback)((function(){n.current=null,c.current=!1,l.current=null,a.current=null,v(null),o(null),y(!1),x(!1),T(!1),P(!1),z(!1),G(null),F(null),V(E())}),[]),ee=Object(r.useCallback)((function(){N||(c.current=!0,l.current=null,o(null),v(null),y(!1),x(!1),T(!1),P(!1),z(!1),G(null),F(null),V(E()))}),[N]);return Object(r.useEffect)((function(){Z(t)}),[Z]),{callWaiter:Z,cancelWaiter:ee,clearWaiter:_,params:a.current,id:n.current,request:s,response:l.current,error:g,isPending:O,isResolved:S,isRejected:W,isCompleted:N,isRefreshing:I,isCanceled:c.current,lastModified:U,startTime:D,endTime:$,elapsedTime:$?$-D:null}}function g(){return a.a.createElement("div",null,a.a.createElement("h1",null,"react-waiter"," "," "," ",a.a.createElement("a",{className:"github-button",href:"https://github.com/billyxs/react-waiter","data-size":"large","aria-label":"Star billyxs/react-waiter on GitHub"},"Star")),a.a.createElement("div",null,"Managing the promise lifecyle for you react applications.",a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("a",{href:"https://npmjs.org/package/react-waiter"},a.a.createElement("img",{alt:"npm",src:"https://img.shields.io/npm/v/react-waiter"}))," ",a.a.createElement("a",{href:"https://travis-ci.org/billxys/react-waiter"},a.a.createElement("img",{src:"https://travis-ci.org/billyxs/react-waiter.svg?branch=master",alt:"travis build badge"}))," ",a.a.createElement("a",{href:"https://img.shields.io/npm/l/react-waiter?color=blue"},a.a.createElement("img",{alt:"NPM",src:"https://img.shields.io/npm/l/react-waiter?color=blue&label=License"}))),a.a.createElement("br",null),a.a.createElement("hr",null))}function v(){var e=Object(i.a)(["\n  padding: 20px;\n  margin-bottom: 10px;\n  color: ",";\n  border: 1px solid #ccc;\n  border-color: ",";\n  display: block;\n"]);return v=function(){return e},e}function h(){var e=Object(i.a)(["\n  cursor: pointer;\n  padding: 8px 20px;\n  background: none;\n  font-size: 16px;\n  :hover {\n     background: #efefef;\n  }\n"]);return h=function(){return e},e}var j=u.a.button(h()),O=u.a.div(v(),(function(e){var t=e.isPending,n=e.isResolved,r=e.isRejected;return e.isCanceled?"#666":t?"orange":n?"green":r?"red":"black"}),(function(e){var t=e.isPending,n=e.isResolved,r=e.isRejected;return e.isCanceled?"#666":t?"orange":n?"green":r?"red":"black"}));function y(){return new Promise((function(e,t){setTimeout((function(){Math.floor(10*Math.random())%2!==1?e({success:!0}):t({message:"Sorry, rejected"})}),5e3)}))}function w(){var e=f(y,{param1:"hello"}),t=e.id,n=e.params,r=e.callWaiter,l=e.cancelWaiter,c=e.clearWaiter,i=e.response,u=e.error,s=e.isPending,m=e.isResolved,d=e.isRejected,p=e.isCompleted,b=e.isRefreshing,E=e.isCanceled,v=e.startTime,h=e.endTime,w=e.elapsedTime,k=e.lastModified;return a.a.createElement("div",{style:{margin:"20px auto",width:"900px",padding:"20px"}},a.a.createElement(g,null),a.a.createElement("h2",null,"Example"),a.a.createElement("div",{style:{width:"35%",display:"inline-block",padding:"15px",verticalAlign:"top"}},a.a.createElement(j,{onClick:function(){return r({prevWaiterId:t})}},"Call Waiter with params"),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement(j,{onClick:function(){return l()}},"Cancel Waiter"),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement(j,{onClick:function(){return c()}},"Clear Waiter"),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("h3",null,"Button code"),a.a.createElement(o.a,{source:"\n    <Button onClick={\n        () => callWaiter({\n          prevWaiterId: id\n        })\n      }>\n      Run with new params\n    </Button>"}),a.a.createElement("hr",null),a.a.createElement(o.a,{source:"\n    <Button onClick={cancelWaiter}>\n      Cancel Waiter\n    </Button>"}),a.a.createElement("hr",null),a.a.createElement(o.a,{source:"\n    <Button onClick={clearWaiter}>\n      Clear Waiter\n    </Button>"})),a.a.createElement("div",{style:{width:"55%",display:"inline-block"}},a.a.createElement(O,{isPending:s,isResolved:m,isRejected:d,isCanceled:E},s&&"...working",m&&"Yes, success!",d&&"Oh no, error",E&&"Hey, I got canceled!",a.a.createElement("br",null),a.a.createElement("br",null),"params: ",JSON.stringify(n),a.a.createElement("br",null),a.a.createElement("br",null),m&&a.a.createElement("span",null,"response: ",JSON.stringify(i)),d&&a.a.createElement("span",null,"error: ",JSON.stringify(u))),a.a.createElement("div",{style:{border:"solid 1px #ddd",padding:"15px"}},a.a.createElement("div",null,"id: ",JSON.stringify(t)),a.a.createElement("div",null,"params: ",JSON.stringify(n)),a.a.createElement("br",null),a.a.createElement("div",null,"response: ",JSON.stringify(i)),a.a.createElement("div",null,"error: ",JSON.stringify(u)),a.a.createElement("br",null),a.a.createElement("div",null,"isPending: ",s.toString()),a.a.createElement("div",null,"isResolved: ",m.toString()),a.a.createElement("div",null,"isRejected: ",d.toString()),a.a.createElement("div",null,"isCompleted: ",p.toString()),a.a.createElement("div",null,"isRefreshing: ",b.toString()),a.a.createElement("div",null,"isCanceled: ",E.toString()),a.a.createElement("br",null),a.a.createElement("div",null,"startTime: ",v),a.a.createElement("div",null,"endTime: ",h),a.a.createElement("div",null,"elapsedTime: ",w),a.a.createElement("div",null,"lastModified: ",k))),a.a.createElement("div",null,a.a.createElement("h2",null,"useWaiter()"),a.a.createElement("div",null,a.a.createElement(o.a,{source:'\n      function myRequest(params) {\n        return apiRequest(params)\n      }\n\n      const myWaiter = usewaiter( myrequest, { param1: "hello" })\n\n      const {\n        callWaiter,\n        cancelWaiter,\n        clearWaiter,\n\n        id,\n        params,\n        request,\n        response,\n        error,\n\n        isPending,\n        isResolved,\n        isRejected,\n        isCompleted,\n        isRefreshing,\n        isCanceled,\n\n        startTime,\n        endTime,\n        elapsedTime,\n        lastModified\n      } = myWaiter'}))))}var k=function(){return a.a.createElement("div",null,a.a.createElement(w,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},34:function(e,t,n){e.exports=n(128)},39:function(e,t,n){}},[[34,1,2]]]);
//# sourceMappingURL=main.7b53fb9a.chunk.js.map