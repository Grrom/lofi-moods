(this["webpackJsonplofi-moods"]=this["webpackJsonplofi-moods"]||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){},54:function(t,e,n){},56:function(t,e,n){},57:function(t,e,n){},59:function(t,e,n){},60:function(t,e,n){"use strict";n.r(e);var c=n(11),i=n.n(c),o=n(34),a=n.n(o),r=(n(41),n(10)),s=(n(42),n(0)),u=n.n(s),f=n(3),l=n(35),d=n.n(l),j=(n(54),n(9));function b(){return Object(j.jsx)("div",{className:"loader-container",children:Object(j.jsx)("div",{className:"mini-loader"})})}n(56);function h(t){var e=t.onClick,n=t.isLoading,c=t.text,i=t.icon,o=t.className;return Object(j.jsxs)("span",{className:"action-button ".concat(o),title:c,onClick:function(){e()},children:[n?Object(j.jsx)(b,{}):Object(j.jsx)("img",{src:i,alt:c,className:"icon"}),Object(j.jsxs)("h4",{children:[c," "]})]})}function m(t){var e=t.mood,n=t.playMusic,c=t.isSelected,i=t.onClick;return Object(j.jsx)("div",{className:"mood ".concat(c?"active":""),onClick:Object(f.a)(u.a.mark((function t(){var c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i(),t.next=3,S.fetchMusic(e);case 3:c=t.sent,n(c[Math.floor(Math.random()*(c.length-0))]);case 5:case"end":return t.stop()}}),t)}))),children:e})}n(57);var p=n.p+"static/media/mute.d7f38ca3.svg",v=n.p+"static/media/unMute.8a278345.svg";function O(t){var e=t.setBottomMessage,n=t.setIsBuffering,i=Object(c.useState)([]),o=Object(r.a)(i,2),a=o[0],s=o[1],l=Object(c.useState)(!1),b=Object(r.a)(l,2),O=b[0],g=b[1],x=Object(c.useState)(""),w=Object(r.a)(x,2),k=w[0],y=w[1],M=Object(c.useState)(!1),I=Object(r.a)(M,2),B=I[0],C=I[1],N=Object(c.useState)(),E=Object(r.a)(N,2),P=E[0],F=E[1],L=Object(c.useState)("https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg"),D=Object(r.a)(L,2),K=D[0],T=D[1];function q(t){F((function(){return t})),g((function(){return!0}))}return Object(c.useEffect)((function(){function t(){return(t=Object(f.a)(u.a.mark((function t(){var e;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,S.fetchMoods();case 2:e=t.sent,s((function(){return e}));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),Object(j.jsxs)("div",{id:"parent",style:{backgroundImage:"url(".concat(K,")")},children:[Object(j.jsx)(h,{onClick:function(){return C((function(t){return!t}))},isLoading:!1,text:"",icon:B?p:v,className:"mute-button"}),Object(j.jsxs)("div",{id:"moods",children:[a.map((function(t){return Object(j.jsx)(m,{onClick:function(){return y(t)},mood:t,playMusic:q,isSelected:k===t},t)})),Object(j.jsx)(d.a,{className:"react-player",onStart:function(){e("Now Playing: "+(null===P||void 0===P?void 0:P.title)),function(t){var e=new Image;e.src="https://i.ytimg.com/vi/".concat(t,"/maxresdefault.jpg"),e.onload=function(){e.width>120?T(e.src):T("https://i.ytimg.com/vi/".concat(t,"/hqdefault.jpg"))}}(null===P||void 0===P?void 0:P.link)},onError:function(){return e("Something went wrong while fetching the music")},onBuffer:function(){return n(!0)},onBufferEnd:function(){return n(!1)},playing:O,muted:B,controls:!0,autoPlay:!0,url:"https://www.youtube.com/watch?v=".concat(null===P||void 0===P?void 0:P.link),loop:!0,config:{playerVars:{height:"144px",width:"256px",vq:"small"}}})]})]})}var g=n(1),x=n(18),w=function t(e,n,c,i){Object(g.a)(this,t),this.artist=void 0,this.link=void 0,this.title=void 0,this.id=void 0,this.artist=e,this.link=n,this.title=c,this.id=i},k=n(36);n(59);function y(t){var e=t.message,n=t.isBuffering;return console.log(n),Object(j.jsxs)("span",{id:"bottom-indicator",children:[e,n?Object(j.jsx)(b,{}):""]})}Object(k.a)({apiKey:"AIzaSyDl1rXG54RQlR7FnxPct8oLKYNkurrwNMY",authDomain:"lofi-moods.firebaseapp.com",projectId:"lofi-moods",storageBucket:"lofi-moods.appspot.com",messagingSenderId:"474872717326",appId:"1:474872717326:web:50bfa76cd2dcf9164f5c5f",measurementId:"G-Q75WDCCK7V"});var S=new function t(){var e=this;Object(g.a)(this,t),this.firestore=Object(x.c)(),this.fetchMusic=function(){var t=Object(f.a)(u.a.mark((function t(n){var c,i;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(x.b)(Object(x.a)(e.firestore,n));case 2:return c=t.sent,i=[],c.forEach((function(t){var e=t.data();i.push(new w(e.artist,e.link,e.title,t.id))})),t.abrupt("return",i);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),this.fetchMoods=Object(f.a)(u.a.mark((function t(){var n,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(x.b)(Object(x.a)(e.firestore,"moods"));case 2:return n=t.sent,c=[],n.forEach((function(t){var e=t.data();c.push(e.name)})),t.abrupt("return",c);case 6:case"end":return t.stop()}}),t)})))};var M=function(){var t=Object(c.useState)(!1),e=Object(r.a)(t,2),n=e[0],i=e[1],o=Object(c.useState)("Hello, How are you today?"),a=Object(r.a)(o,2),s=a[0],u=a[1];return Object(j.jsxs)("div",{id:"app",children:[Object(j.jsx)(O,{setBottomMessage:function(t){u((function(){return t}))},setIsBuffering:function(t){console.log(t),i((function(){return t}))}}),Object(j.jsx)(y,{message:s,isBuffering:n})]})},I=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,61)).then((function(e){var n=e.getCLS,c=e.getFID,i=e.getFCP,o=e.getLCP,a=e.getTTFB;n(t),c(t),i(t),o(t),a(t)}))};a.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(M,{})}),document.getElementById("root")),I()}},[[60,1,2]]]);
//# sourceMappingURL=main.2e26fd08.chunk.js.map