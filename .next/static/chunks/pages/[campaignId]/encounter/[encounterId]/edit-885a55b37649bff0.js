(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[681],{4241:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[campaignId]/encounter/[encounterId]/edit",function(){return a(4349)}])},4349:function(e,n,a){"use strict";a.r(n),a.d(n,{default:function(){return en}});var r=a(5893),t=a(6574),i=a(9008),l=a.n(i),s=a(1163),d=a(2175),o=a(5861),c=a(6886),u=a(1903),m=a(4054),h=a(3841),x=a(315),p=a(9840),b=a(3321),v=a(7294),j=a(6310),y=a(8054),Z=a(4808),g=a(8456),f=a(9226),N=a(6761),C=a(9020),P=a(2428),I=a(2535),M=a(6678),k=a.n(M),w=a(4753),_=a.n(w),O=a(7557),F=a.n(O),S=a(9699),E=a(2511),R=a(480),T=a(6242),V=a(4267),A=a(7383),D=a(9653),U=a(3946),q=a(657),J=a(7645),L=a(6580),z=a(8951),W=a(1425),B=a(948),G=a(9609),Q=a(153);let H=(0,B.ZP)(u.Z)(e=>{let{theme:n}=e;return{"& input.Mui-disabled":{cursor:"not-allowed",color:n.palette.text.primary,textFillColor:n.palette.text.primary}}}),X=(0,B.ZP)(R.Z)(e=>{let{theme:n}=e;return{"& .MuiFormControlLabel-label.Mui-disabled":{cursor:"not-allowed",color:n.palette.text.primary,textFillColor:n.palette.text.primary}}});function Y(e){let{playerList:n,combatant:a,index:t,onDragEnd:i}=e,[l,s]=(0,v.useState)(!1),o=(0,Q.o)(),u=(0,d.u6)(),[j]=(0,y.kU)({variables:{id:a.id},refetchQueries:[y.N8]}),Z=u.handleSubmit.bind(u);return(0,r.jsxs)(I.t.Item,{value:a.id,dragListener:!1,dragControls:o,onDragEnd:i,style:{listStyle:"none",margin:0,marginBottom:16,padding:0,position:"relative"},children:[(0,r.jsx)(T.Z,{children:(0,r.jsxs)(V.Z,{children:[(0,r.jsx)(G.Z,{width:40,children:(0,r.jsx)(S.Z,{onPointerDown:e=>o.start(e),style:{cursor:"grab",position:"absolute",top:"50%",left:8,transform:"translateY(-50%)"}})}),(0,r.jsxs)(c.ZP,{container:!0,spacing:2,alignItems:"center",ml:2,pr:6,mb:-1,children:[(0,r.jsx)(c.ZP,{item:!0,xs:12,md:5,children:(0,r.jsx)(d.gN,{name:"combatants[".concat(t,"].name"),children:e=>{var n;let{field:a,form:i,meta:l}=e,s=!!(null===(n=i.values.combatants[t])||void 0===n?void 0:n.playerId)||i.isSubmitting;return(0,r.jsx)(A.Z,{title:s?"Controlled by Player Preset":void 0,placement:"top",followCursor:!0,children:(0,r.jsx)("span",{children:(0,r.jsx)(H,{required:!0,id:"combatants[".concat(t,"].name"),label:"Name",fullWidth:!0,autoFocus:!0,disabled:s,error:l.touched&&!!l.error,helperText:l.touched?l.error:void 0,...a,onBlur:()=>{Z()}})})})}})}),(0,r.jsx)(c.ZP,{item:!0,xs:8,md:5,children:(0,r.jsx)(d.gN,{name:"combatants[".concat(t,"].playerId"),children:e=>{let{field:a,form:i}=e,l=n.find(e=>e.id===a.value),s=n.filter(e=>(null==l?void 0:l.id)===e.id||!i.values.combatants.map(e=>e.playerId).includes(e.id));return(0,r.jsxs)(m.Z,{fullWidth:!0,children:[(0,r.jsxs)(h.Z,{id:"combatants[".concat(t,"].playerId"),children:["Player Preset"," ",s.length?"":"(No Players Available)"]}),(0,r.jsx)(x.Z,{labelId:"playerIdLabel",id:"combatants[".concat(t,"].playerId"),label:"Player Preset",disabled:!s.length||i.isSubmitting,...a,value:a.value||"",endAdornment:(0,r.jsx)(E.Z,{sx:{color:"grey.800",marginRight:2,cursor:"pointer",display:a.value?"":"none"},onClick:()=>{i.setFieldValue("combatants[".concat(t,"].playerId"),void 0),Z()}}),onChange:e=>{let r=n.find(n=>n.id===e.target.value);a.onChange(e),i.setFieldValue("combatants[".concat(t,"].name"),r.characterName),i.setFieldValue("combatants[".concat(t,"].public"),!0),Z()},children:s.map(e=>(0,r.jsxs)(p.Z,{value:e.id,children:[e.playerName," (",e.characterName,")"]},"".concat(t,"_").concat(e.id)))})]})}})}),(0,r.jsx)(c.ZP,{item:!0,xs:2,md:1,sx:{display:"flex",justifyContent:"center"},children:(0,r.jsx)(d.gN,{name:"combatants[".concat(t,"].public"),children:e=>{var n;let{field:a,form:i}=e,l=!!(null===(n=i.values.combatants[t])||void 0===n?void 0:n.playerId)||i.isSubmitting;return(0,r.jsx)(A.Z,{title:l?"Controlled by Player Preset":void 0,placement:"top",followCursor:!0,children:(0,r.jsx)("span",{children:(0,r.jsx)(X,{id:"combatants[".concat(t,"].public"),label:"Public",labelPlacement:"start",control:(0,r.jsx)(D.Z,{color:"primary",checked:a.value,disabled:l,sx:{cursor:l?"not-allowed":"default"},...a,onChange:e=>{a.onChange(e),Z()}})})})})}})}),(0,r.jsx)(c.ZP,{item:!0,xs:2,md:1,sx:{display:"flex",justifyContent:"flex-end"},children:(0,r.jsx)(U.Z,{onClick:()=>s(!0),children:(0,r.jsx)(N.Z,{})})})]})]})}),(0,r.jsxs)(q.Z,{open:l,onClose:()=>s(!1),children:[(0,r.jsxs)(J.Z,{children:["Delete combatant ",a.name,"?"]}),(0,r.jsx)(L.Z,{children:(0,r.jsx)(z.Z,{children:"This action cannot be undone."})}),(0,r.jsxs)(W.Z,{children:[(0,r.jsx)(b.Z,{variant:"contained",onClick:()=>s(!1),children:"Cancel"}),(0,r.jsxs)(b.Z,{variant:"contained",onClick:()=>{j(),s(!1)},color:"error",children:[(0,r.jsx)(N.Z,{})," Delete"]})]})]})]},a.id)}function $(e){var n,a,t;let{campaignId:i,encounterId:l,combatants:s}=e,{data:o}=(0,y.mU)({variables:{id:i}}),[c,{loading:u}]=(0,y.oY)({variables:{combatant:{campaignId:i,encounterId:l,name:"New Combatant",turnOrder:(null!==(a=null===(n=_()(s,"turnOrder"))||void 0===n?void 0:n.turnOrder)&&void 0!==a?a:0)+1}},refetchQueries:[y.N8]}),[m,{loading:h}]=(0,y.hU)({refetchQueries:[y.N8]}),x=(0,v.useMemo)(()=>({combatants:s.map(e=>{var n;return{...F()(e,"__typename","player"),campaignId:i,encounterId:l,playerId:null===(n=e.player)||void 0===n?void 0:n.id}})}),[s,i,l]),p=(0,v.useMemo)(()=>{var e;return(null!==(t=null==o?void 0:null===(e=o.campaign)||void 0===e?void 0:e.players)&&void 0!==t?t:[]).filter(e=>!e.isGM)},[o]),j=(0,v.useMemo)(()=>p.filter(e=>!s.some(n=>{var a;return(null===(a=n.player)||void 0===a?void 0:a.id)===e.id})),[p,s]),M=(0,v.useCallback)(()=>{m({variables:{combatants:[]}})},[m]),w=(0,v.useCallback)(()=>{var e;let n=j.map((n,a)=>{var r;return{campaignId:i,encounterId:l,name:n.characterName||n.playerName,public:!0,turnOrder:(null!==(e=null===(r=_()(s,"turnOrder"))||void 0===r?void 0:r.turnOrder)&&void 0!==e?e:0)+a+1,playerId:n.id}});m({variables:{combatants:s.map(e=>{var n;return{campaignId:i,encounterId:l,id:e.id,public:e.public,name:e.name,playerId:null===(n=e.player)||void 0===n?void 0:n.id,turnOrder:e.turnOrder}}).concat(n)}})},[j,s,i,l,m]),O=(0,v.useCallback)(e=>{let n=e.combatants.map((e,n)=>({...e,turnOrder:n+1}));m({variables:{combatants:n}})},[m]);return(0,r.jsx)(d.J9,{initialValues:x,onSubmit:O,enableReinitialize:!0,children:e=>{let n=e.values.combatants.map(e=>e.id),a=n=>{e.setValues({combatants:n.map((n,a)=>{let r=k()(e.values.combatants.find(e=>e.id===n));return r.turnOrder=a+1,r})})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(Z.Z,{sx:{color:"#fff",zIndex:e=>e.zIndex.drawer+1},open:h||u,children:(0,r.jsx)(g.Z,{color:"inherit"})}),(0,r.jsx)(I.t.Group,{axis:"y",values:n,onReorder:a,style:{padding:0},children:e.values.combatants.map((n,a)=>(0,r.jsx)(Y,{playerList:p,combatant:n,index:a,onDragEnd:e.submitForm},n.id))}),(0,r.jsxs)(f.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,r.jsx)("div",{children:(0,r.jsxs)(b.Z,{variant:"contained",color:"error",onClick:M,children:[(0,r.jsx)(N.Z,{})," Clear Combatants"]})}),(0,r.jsxs)("div",{children:[j.length>0&&(0,r.jsxs)(b.Z,{variant:"contained",color:"primary",onClick:w,style:{marginRight:8},children:[(0,r.jsx)(C.Z,{})," Add All PCs"]}),(0,r.jsxs)(b.Z,{variant:"contained",color:"success",onClick:c,children:[(0,r.jsx)(P.Z,{})," New Combatant"]})]})]})]})}})}let K=j.Ry().shape({name:j.Z_().required("Campaign Name is required")});function ee(e){let{campaign:n,encounter:a}=e,[t]=(0,y.$p)(),i=(0,v.useMemo)(()=>({name:a.name,hideMonsterNames:a.hideMonsterNames}),[a.name,a.hideMonsterNames]),l=(0,v.useCallback)(async e=>{t({variables:{encounter:{id:a.id,name:e.name,campaignId:n.id,hideMonsterNames:e.hideMonsterNames}}})},[a.id,n.id,t]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{variant:"h3",children:"Edit Encounter"}),(0,r.jsx)(d.J9,{initialValues:i,enableReinitialize:!0,validationSchema:K,onSubmit:l,children:e=>{let{handleReset:n,isValid:a,dirty:t}=e;return(0,r.jsx)(d.l0,{children:(0,r.jsxs)(c.ZP,{container:!0,spacing:2,my:2,children:[(0,r.jsx)(c.ZP,{item:!0,xs:12,sm:8,children:(0,r.jsx)(d.gN,{name:"name",children:e=>{let{field:n,meta:a}=e;return(0,r.jsx)(u.Z,{required:!0,id:"name",label:"Encounter Name",fullWidth:!0,error:a.touched&&!!a.error,helperText:a.error,...n})}})}),(0,r.jsx)(c.ZP,{item:!0,xs:12,sm:4,children:(0,r.jsx)(d.gN,{name:"hideMonsterNames",children:e=>{let{field:n}=e;return(0,r.jsxs)(m.Z,{fullWidth:!0,children:[(0,r.jsx)(h.Z,{id:"hideMonsterNames",children:"Hide Monster Names"}),(0,r.jsxs)(x.Z,{labelId:"hideMonsterNamesLabel",id:"hideMonsterNames",label:"Hide Monster Names",...n,children:[(0,r.jsx)(p.Z,{value:y.NJ.Never,children:"Never"}),(0,r.jsx)(p.Z,{value:y.NJ.UntilTurn,children:"Until Their Turn"}),(0,r.jsx)(p.Z,{value:y.NJ.Always,children:"Always"})]})]})}})}),t&&(0,r.jsxs)(c.ZP,{item:!0,xs:12,sx:{textAlign:"right",order:"2"},children:[(0,r.jsx)(b.Z,{variant:"contained",color:"secondary",onClick:n,sx:{mr:2},children:"Reset"}),(0,r.jsx)(b.Z,{variant:"contained",color:"primary",disabled:!a,type:"submit",children:"Save"})]})]})})}}),(0,r.jsx)($,{campaignId:n.id,encounterId:a.id,combatants:a.combatants})]})}function en(){var e,n;let a=(0,s.useRouter)(),{campaignId:i,encounterId:d}=a.query,{data:o}=(0,y.mU)({variables:{id:i}}),{data:c}=(0,y.VV)({variables:{campaignId:i,encounterId:d},skip:!(i&&d)});return(null==o?void 0:o.campaign)&&(null==c?void 0:null===(e=c.campaign)||void 0===e?void 0:e.encounter)&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l(),{children:(0,r.jsx)("title",{children:"".concat(null!==(n=o.campaign.name)&&void 0!==n?n:"Campaign"," Details | OBS GM Overlay")})}),(0,r.jsx)(t.Z,{fixed:!0,children:(0,r.jsx)(ee,{campaign:o.campaign,encounter:c.campaign.encounter})})]})}}},function(e){e.O(0,[387,404,557,594,774,888,179],function(){return e(e.s=4241)}),_N_E=e.O()}]);