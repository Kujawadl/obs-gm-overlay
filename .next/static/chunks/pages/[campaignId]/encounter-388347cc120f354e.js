(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[813],{9334:function(e,n,r){"use strict";var i=r(3366),o=r(7462),a=r(7294),s=r(3680),t=r(4780),l=r(5861),d=r(9773),c=r(1657),u=r(948),p=r(6336),x=r(5893);let m=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],h=e=>{let{classes:n,inset:r,primary:i,secondary:o,dense:a}=e;return(0,t.Z)({root:["root",r&&"inset",a&&"dense",i&&o&&"multiline"],primary:["primary"],secondary:["secondary"]},p.L,n)},v=(0,u.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,n)=>{let{ownerState:r}=e;return[{[`& .${p.Z.primary}`]:n.primary},{[`& .${p.Z.secondary}`]:n.secondary},n.root,r.inset&&n.inset,r.primary&&r.secondary&&n.multiline,r.dense&&n.dense]}})(({ownerState:e})=>(0,o.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},e.primary&&e.secondary&&{marginTop:6,marginBottom:6},e.inset&&{paddingLeft:56})),Z=a.forwardRef(function(e,n){let r=(0,c.Z)({props:e,name:"MuiListItemText"}),{children:t,className:u,disableTypography:p=!1,inset:Z=!1,primary:y,primaryTypographyProps:j,secondary:g,secondaryTypographyProps:f}=r,b=(0,i.Z)(r,m),{dense:C}=a.useContext(d.Z),w=null!=y?y:t,k=g,E=(0,o.Z)({},r,{disableTypography:p,inset:Z,primary:!!w,secondary:!!k,dense:C}),N=h(E);return null==w||w.type===l.Z||p||(w=(0,x.jsx)(l.Z,(0,o.Z)({variant:C?"body2":"body1",className:N.primary,component:null!=j&&j.variant?void 0:"span",display:"block"},j,{children:w}))),null==k||k.type===l.Z||p||(k=(0,x.jsx)(l.Z,(0,o.Z)({variant:"body2",className:N.secondary,color:"text.secondary",display:"block"},f,{children:k}))),(0,x.jsxs)(v,(0,o.Z)({className:(0,s.Z)(N.root,u),ownerState:E,ref:n},b,{children:[w,k]}))});n.Z=Z},3315:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[campaignId]/encounter",function(){return r(4433)}])},4433:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return S}});var i=r(5893),o=r(8169),a=(0,o.Z)((0,i.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear"),s=r(2428),t=r(6574),l=r(5861),d=r(9226),c=r(3321),u=r(9008),p=r.n(u),x=r(1163),m=r(7294),h=r(8462),v=r(891),Z=r(9334),y=r(1797),j=(0,o.Z)((0,i.jsx)("path",{d:"M8 5v14l11-7z"}),"PlayArrow"),g=r(6761),f=r(2734),b=r(8396),C=r(657),w=r(7645),k=r(6580),E=r(8951),N=r(1425),T=r(1664),_=r.n(T),I=r(8054);function R(e){var n;let{campaign:r,encounter:o,refetch:a}=e,s=(0,x.useRouter)(),[t]=(0,I.DM)({variables:{campaignId:r.id,encounterId:null==o?void 0:o.id}}),[u]=(0,I.Co)({variables:{campaignId:r.id,encounterId:o.id},refetchQueries:[I.N8]}),[p,h]=(0,m.useState)(!1),T=(0,f.Z)(),R=(0,b.Z)(T.breakpoints.only("xs")),B=(0,m.useCallback)(()=>{u().then(e=>{var n,i;let{data:o}=e;(null==o?void 0:null===(n=o.campaign)||void 0===n?void 0:null===(i=n.encounter)||void 0===i?void 0:i.setActive)&&s.push("/".concat(r.id,"/encounter/run"))})},[u,s,r.id]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(v.ZP,{sx:{flexWrap:"wrap",border:0,borderBottom:1,borderStyle:"solid",borderColor:"grey.400"},children:[(0,i.jsx)(Z.Z,{sx:{flexBasis:"100%"},children:(0,i.jsxs)(l.Z,{variant:"h5",children:[o.name," ",o.id===(null===(n=r.activeEncounter)||void 0===n?void 0:n.id)?(0,i.jsx)(l.Z,{color:"text.secondary",component:"span",children:"(Active)"}):null]})}),(0,i.jsxs)(d.Z,{sx:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",width:"100%"},children:[(0,i.jsx)(d.Z,{sx:{flexGrow:1,flexBasis:R?"100%":"auto"},children:(0,i.jsx)(_(),{href:"/".concat(r.id,"/encounter/").concat(o.id,"/edit"),children:(0,i.jsxs)(c.Z,{component:"a",children:[(0,i.jsx)(y.Z,{sx:{paddingRight:1,fontSize:"1.8rem"}}),"Edit"]})})}),(0,i.jsx)(d.Z,{sx:{flexGrow:1,flexBasis:R?"100%":"auto"},children:(0,i.jsxs)(c.Z,{onClick:B,children:[(0,i.jsx)(j,{sx:{paddingRight:1,fontSize:"1.8rem"}}),(0,i.jsx)(d.Z,{sx:{display:"flex",alignItems:"baseline",width:70},children:o.round>0?"Resume":"Run"})]})}),(0,i.jsx)(d.Z,{sx:{flexBasis:R?"100%":"auto"},children:(0,i.jsxs)(c.Z,{color:"error",onClick:()=>h(!0),children:[(0,i.jsx)(g.Z,{sx:{paddingRight:1,fontSize:"1.8rem"}}),"Delete"]})})]})]},o.id),(0,i.jsxs)(C.Z,{open:p,onClose:()=>h(!1),children:[(0,i.jsxs)(w.Z,{children:["Delete encounter ",o.name,"?"]}),(0,i.jsx)(k.Z,{children:(0,i.jsx)(E.Z,{children:"This action cannot be undone."})}),(0,i.jsxs)(N.Z,{children:[(0,i.jsx)(c.Z,{variant:"contained",onClick:()=>h(!1),children:"Cancel"}),(0,i.jsxs)(c.Z,{variant:"contained",onClick:()=>{t().then(e=>{var n,r;let{data:i}=e;(null==i?void 0:null===(n=i.campaign)||void 0===n?void 0:null===(r=n.encounter)||void 0===r?void 0:r.delete)&&(a(),h(!1))})},color:"error",children:[(0,i.jsx)(g.Z,{})," Delete"]})]})]})]})}function B(e){let{campaign:n,encounters:r,refetch:o}=e;return(0,i.jsx)(h.Z,{sx:{marginTop:2,paddingTop:0,border:0,borderTop:2,borderStyle:"solid",borderColor:"primary.light"},children:r&&r.length>0?r.map(e=>(0,i.jsx)(R,{campaign:n,encounter:e,refetch:o},e.id)):(0,i.jsx)(v.ZP,{sx:{border:0,borderBottom:1,borderStyle:"solid",borderColor:"grey.400"},children:(0,i.jsx)(Z.Z,{children:"No Encounters Found..."})})})}function S(){var e,n;let r=(0,x.useRouter)(),{campaignId:o}=r.query,{data:u}=(0,I.mU)({variables:{id:o}}),{data:h,refetch:v}=(0,I.g8)({variables:{campaignId:o},skip:!o}),[Z]=(0,I.u9)(),[y]=(0,I.$p)(),j=(0,m.useCallback)(()=>{y({variables:{encounter:{campaignId:o,name:"New Encounter"}}}).then(e=>{var n,i;let{data:a}=e;(null==a?void 0:null===(n=a.campaign)||void 0===n?void 0:null===(i=n.encounter)||void 0===i?void 0:i.save)&&r.push("/".concat(o,"/encounter/").concat(a.campaign.encounter.save.id,"/edit")),v()})},[y,o,r,v]),g=(0,m.useCallback)(()=>{(null==u?void 0:u.campaign)&&Z({variables:{id:o,input:{name:u.campaign.name,activeEncounter:null}}})},[Z,u,o]);return(null==u?void 0:u.campaign)&&(null==h?void 0:null===(e=h.campaign)||void 0===e?void 0:e.encounters)?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(p(),{children:(0,i.jsx)("title",{children:"List Encounters | OBS GM Overlay"})}),(0,i.jsxs)(t.Z,{fixed:!0,children:[(0,i.jsx)(l.Z,{variant:"h3",children:"Encounters"}),(0,i.jsx)(B,{campaign:u.campaign,encounters:h.campaign.encounters,refetch:v}),(0,i.jsxs)(d.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,i.jsxs)(c.Z,{disabled:!(null==u?void 0:null===(n=u.campaign)||void 0===n?void 0:n.activeEncounter),onClick:g,children:[(0,i.jsx)(a,{}),"Clear Active Encounter"]}),(0,i.jsxs)(c.Z,{variant:"contained",color:"success",onClick:j,children:[(0,i.jsx)(s.Z,{})," New Encounter"]})]})]})]}):null}}},function(e){e.O(0,[387,934,774,888,179],function(){return e(e.s=3315)}),_N_E=e.O()}]);