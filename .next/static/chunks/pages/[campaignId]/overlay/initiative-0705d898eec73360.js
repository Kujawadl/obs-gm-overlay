(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[0],{9384:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[campaignId]/overlay/initiative",function(){return t(2697)}])},2153:function(n,e,t){"use strict";t.d(e,{Z:function(){return p}});var r=t(5893),o=t(5861),i=t(9226),l=t(9008),a=t.n(l),d=t(5675),u=t.n(d),c=t(7294),s=t(3337),v=t(8054),m=t(4505);function p(n){var e,t;let{campaign:l,style:d="overlay",forceShowMonsterNames:p=!1}=n,{hideMonsterNames:f,round:h,turn:g,turnStart:x}=(0,c.useMemo)(()=>null!==(e=null==l?void 0:l.activeEncounter)&&void 0!==e?e:{hideMonsterNames:v.NJ.Always,round:0,turn:0,turnStart:null},[l]),y=(0,c.useMemo)(()=>{var n,e;return null!==(e=null==l?void 0:null===(n=l.activeEncounter)||void 0===n?void 0:n.combatants.sort((n,e)=>n.turnOrder-e.turnOrder))&&void 0!==e?e:[]},[l]),[b,w]=(0,c.useState)(null),[j,_]=(0,c.useState)(!1);return(0,s.Z)(()=>{if((h>0||g>0)&&x){let n=new Date,e=(0,m.sG)(x),t=(0,m.J_)((0,m.sG)(x),n,["minutes","seconds"]);w(t),_(n.getTime()-e.getTime()>6e4)}else b&&(w(null),_(!1))},1e3),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"".concat(null!==(t=null==l?void 0:l.name)&&void 0!==t?t:"Campaign"," Initiative | OBS GM Overlay")})}),(0,r.jsxs)(o.Z,{variant:"h5",sx:"overlay"===d?{marginLeft:2,marginRight:2}:{paddingTop:2,paddingBottom:2,paddingLeft:4,paddingRight:4,border:0,borderStyle:"solid",borderTop:2,borderTopColor:"primary.light",borderBottom:1,borderBottomColor:"grey.400"},children:[h?"Round ".concat(h):"Combat Not Started",(0,r.jsx)(i.Z,{className:j?"blink":void 0,sx:{color:j?"error.main":"text.secondary",display:"inline-flex"},children:b?"(".concat(b,")"):(0,r.jsx)(i.Z,{sx:{display:"inline-block",width:62}})})]}),"overlay"===d&&(0,r.jsx)("hr",{style:{width:"100%",padding:0,border:"none",borderTop:"medium double #333",color:"#333"}}),y.map((n,e)=>(0,r.jsxs)(i.Z,{sx:"overlay"===d?{display:"flex",flexDirection:"row",alignItems:"center",height:32}:{display:"flex",flexDirection:"row",alignItems:"center",height:32,marginTop:2,paddingBottom:2,border:0,borderBottom:1,borderStyle:"solid",borderColor:"grey.400"},children:[(0,r.jsx)(i.Z,{sx:{width:32,display:"inline-block",marginBottom:"-6px"},children:n.turnOrder===g&&(0,r.jsx)(u(),{src:"/d20.png",alt:"d20",height:32,width:32})}),(0,r.jsx)(i.Z,{sx:{fontWeight:n.turnOrder===g?"bold":void 0,textDecoration:n.turnOrder===g?"underline":void 0},children:p?n.name:function(){switch(f){case v.NJ.Always:if(!n.public)return"???";case v.NJ.UntilTurn:if(!n.public&&g<n.turnOrder&&h<=1)return"???";default:return n.name}}()})]},"combatant_".concat(e,"_").concat(n)))]})}},2697:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return c}});var r=t(5893),o=t(9226),i=t(9008),l=t.n(i),a=t(1163),d=t(2153),u=t(8054);function c(){var n,e,t,i,c;let s=(0,a.useRouter)(),{campaignId:v}=s.query,{data:m}=(0,u.mU)({variables:{id:v}});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l(),{children:(0,r.jsx)("title",{children:"".concat(null!==(c=null==m?void 0:null===(n=m.campaign)||void 0===n?void 0:null===(e=n.activeEncounter)||void 0===e?void 0:e.name)&&void 0!==c?c:"Encounter"," Initiative | OBS GM Overlay")})}),!!(null==m?void 0:null===(t=m.campaign)||void 0===t?void 0:null===(i=t.activeEncounter)||void 0===i?void 0:i.round)&&(0,r.jsx)(o.Z,{sx:{display:"inline-flex",flexDirection:"column",width:"auto",justifyContent:"space-around",border:"80px solid transparent",borderImage:"url(/celtic-frame.png)",borderImageSlice:"320 fill"},children:(0,r.jsx)(d.Z,{campaign:null==m?void 0:m.campaign})})]})}},4505:function(n,e,t){"use strict";t.d(e,{J_:function(){return a},sG:function(){return o},qI:function(){return m}});var r=t(3595);function o(n){return n instanceof Date?n:n?(0,r.D)(n):void 0}var i=t(2290),l=t(2090);function a(n,e){var t;let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["hours","minutes","seconds"],o={xSeconds:"{{count}}",xMinutes:"{{count}}",xHours:"{{count}}"},a=(0,i.y)({start:n,end:e});return(0,l.L)(a,{format:r,locale:{formatDistance:(n,e)=>{var r;return null!==(t=null===(r=o[n])||void 0===r?void 0:r.replace("{{count}}",null==e?void 0:e.toString().padStart(2,"0")))&&void 0!==t?t:""}},delimiter:":",zero:!0}).replace(/^0(\d)/,"$1")}var d=t(7294),u=t(3337),c=t(3732),s=t(209);function v(n){let{player:e,campaign:t}=n;if(!e||!t||!t.gmInspiration&&e.isGM||"none"===t.cooldownType)return 0;let r=o("player"===t.cooldownType?e.lastInspirationUsed:t.lastInspirationUsed),i=(0,c.m)(r,t.cooldownTime),l=i>new Date,a=l?(0,s.c)(i,new Date):0;return a}function m(n){var e;let{player:t,campaign:r}=n,[o,i]=(0,d.useState)(v({player:t,campaign:r}));return(0,d.useEffect)(()=>{i(v({player:t,campaign:r}))},[t,r]),(0,u.Z)(()=>{i(v({player:t,campaign:r}))},r&&"none"===r.cooldownType?null:1e3),{cooldownTimeRemaining:o,percentComplete:Math.round(o/((null!==(e=null==r?void 0:r.cooldownTime)&&void 0!==e?e:0)*60)*100),formattedDuration:(0,l.L)({hours:Math.trunc(o/60/60),minutes:Math.trunc(o/60%60),seconds:Math.trunc(o%60)},{format:["hours","minutes","seconds"]})}}}},function(n){n.O(0,[948,675,774,888,179],function(){return n(n.s=9384)}),_N_E=n.O()}]);