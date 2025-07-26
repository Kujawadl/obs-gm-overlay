exports.id=81,exports.ids=[81],exports.modules={3715:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.d(b,{A:()=>e.A});var e=c(99624),f=a([e]);e=(f.then?(await f)():f)[0],d()}catch(a){d(a)}})},32081:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{default:()=>m});var e=c(8732),f=c(82015),g=c(49788),h=c.n(g),i=c(60143),j=c(3715),k=c(42227);c(86800);var l=a([j,k]);[j,k]=l.then?(await l)():l;let m=function({Component:a,pageProps:b}){let c=(0,f.useMemo)(k.A,[]);return(0,e.jsxs)(i.ApolloProvider,{client:c,children:[(0,e.jsxs)(h(),{children:[(0,e.jsx)("meta",{name:"description",content:"OBS GM Overlay"}),(0,e.jsx)("meta",{name:"viewport",content:"initial-scale=1, width=device-width"})]}),(0,e.jsx)(j.A,{}),(0,e.jsx)(a,{...b})]})};d()}catch(a){d(a)}})},42227:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.d(b,{A:()=>h});var e=c(60143);c(91629),c(62472);var f=c(29752),g=a([f]);function h(){let a,b=new e.HttpLink({uri:(a="http",`${a}s://obs.jager-kujawa.com:3000/api/graphql`)});return new e.ApolloClient({link:(0,e.from)([b]),cache:new e.InMemoryCache({typePolicies:{Campaign:{fields:{players:{merge:(a,b)=>b}}}}})})}f=(g.then?(await g)():g)[0],d()}catch(a){d(a)}})},49377:(a,b,c)=>{"use strict";c.d(b,{BE:()=>D,F3:()=>f,G$:()=>P,HP:()=>t,J1:()=>r,Jj:()=>L,Ki:()=>N,N$:()=>V,O:()=>H,R1:()=>F,aY:()=>J,g9:()=>B,hm:()=>z,hy:()=>R,ki:()=>M,n8:()=>p,oy:()=>T,qi:()=>v,rE:()=>l,sF:()=>x,w_:()=>n});var d=c(60143);let e={};var f=function(a){return a.Always="always",a.Never="never",a.UntilTurn="untilTurn",a}({});let g=(0,d.gql)`
	fragment Player on Player {
		id
		playerName
		characterName
		isGM
		inspiration
		lastInspirationUsed
	}
`,h=(0,d.gql)`
	fragment Combatant on Combatant {
		id
		name
		public
		turnOrder
		player {
			id
			playerName
		}
	}
`,i=(0,d.gql)`
	fragment Encounter on Encounter {
		id
		name
		hideMonsterNames
		round
		turn
		turnStart
		combatants {
			...Combatant
		}
	}
	${h}
`,j=(0,d.gql)`
	fragment Campaign on Campaign {
		id
		name
		gmInspiration
		cooldownType
		cooldownTime
		lastInspirationUsed
		players {
			...Player
		}
		activeEncounter {
			...Encounter
		}
	}
	${g}
	${i}
`,k=(0,d.gql)`
	mutation ADVANCE_INITIATIVE(
		$campaignId: ID!
		$encounterId: ID!
		$forward: Boolean = true
	) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				next @include(if: $forward)
				prev @skip(if: $forward)
			}
		}
	}
`;function l(a){let b={...e,...a};return d.useMutation(k,b)}let m=(0,d.gql)`
	mutation DELETE_CAMPAIGN($id: ID!) {
		campaign(id: $id) {
			delete
		}
	}
`;function n(a){let b={...e,...a};return d.useMutation(m,b)}let o=(0,d.gql)`
	mutation DELETE_COMBATANT($id: ID!) {
		campaign {
			encounter {
				combatant(id: $id) {
					delete
				}
			}
		}
	}
`;function p(a){let b={...e,...a};return d.useMutation(o,b)}let q=(0,d.gql)`
	mutation DELETE_ENCOUNTER($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				delete
			}
		}
	}
`;function r(a){let b={...e,...a};return d.useMutation(q,b)}let s=(0,d.gql)`
	mutation DELETE_PLAYER($id: ID!) {
		player(id: $id) {
			delete
		}
	}
`;function t(a){let b={...e,...a};return d.useMutation(s,b)}let u=(0,d.gql)`
	mutation RESET_PLAYER_COOLDOWN($id: ID!) {
		player(id: $id) {
			resetCooldown
		}
	}
`;function v(a){let b={...e,...a};return d.useMutation(u,b)}let w=(0,d.gql)`
	mutation SAVE_CAMPAIGN($id: ID, $input: CampaignInput!) {
		campaign(id: $id) {
			save(input: $input) {
				...Campaign
			}
		}
	}
	${j}
`;function x(a){let b={...e,...a};return d.useMutation(w,b)}let y=(0,d.gql)`
	mutation SAVE_COMBATANT($combatant: CombatantInput!) {
		campaign {
			encounter {
				combatant {
					save(input: $combatant) {
						...Combatant
					}
				}
			}
		}
	}
	${h}
`;function z(a){let b={...e,...a};return d.useMutation(y,b)}let A=(0,d.gql)`
	mutation SAVE_COMBATANTS($combatants: [CombatantInput!]!) {
		campaign {
			encounter {
				saveCombatants(input: $combatants) {
					...Combatant
				}
			}
		}
	}
	${h}
`;function B(a){let b={...e,...a};return d.useMutation(A,b)}let C=(0,d.gql)`
	mutation SAVE_ENCOUNTER($encounter: EncounterInput!) {
		campaign {
			encounter {
				save(input: $encounter) {
					...Encounter
				}
			}
		}
	}
	${i}
`;function D(a){let b={...e,...a};return d.useMutation(C,b)}let E=(0,d.gql)`
	mutation SAVE_PLAYER($id: ID, $input: PlayerInput!) {
		player(id: $id) {
			save(input: $input) {
				...Player
			}
		}
	}
	${g}
`;function F(a){let b={...e,...a};return d.useMutation(E,b)}let G=(0,d.gql)`
	mutation SET_ACTIVE_ENCOUNTER($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				setActive(active: true)
			}
		}
	}
`;function H(a){let b={...e,...a};return d.useMutation(G,b)}let I=(0,d.gql)`
	mutation SET_PLAYER_INSPIRATION($id: ID!, $inspiration: Int!) {
		player(id: $id) {
			save(input: { inspiration: $inspiration }) {
				...Player
			}
		}
	}
	${g}
`;function J(a){let b={...e,...a};return d.useMutation(I,b)}let K=(0,d.gql)`
	query CAMPAIGN_NAME($campaignId: ID!) {
		campaign(id: $campaignId) {
			name
			activeEncounter {
				name
			}
		}
	}
`;function L(a){let b={...e,...a};return d.useQuery(K,b)}let M=(0,d.gql)`
	query ENCOUNTER_DETAIL($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				...Encounter
			}
		}
	}
	${i}
`;function N(a){let b={...e,...a};return d.useQuery(M,b)}let O=(0,d.gql)`
	query ENCOUNTER_NAME($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				name
			}
		}
	}
`;function P(a){let b={...e,...a};return d.useQuery(O,b)}let Q=(0,d.gql)`
	query LIST_CAMPAIGNS {
		campaigns {
			...Campaign
		}
	}
	${j}
`;function R(a){let b={...e,...a};return d.useQuery(Q,b)}let S=(0,d.gql)`
	query LIST_ENCOUNTERS($campaignId: ID!) {
		campaign(id: $campaignId) {
			encounters {
				...Encounter
			}
		}
	}
	${i}
`;function T(a){let b={...e,...a};return d.useQuery(S,b)}let U=(0,d.gql)`
	subscription CAMPAIGN($id: ID!) {
		campaign(id: $id) {
			...Campaign
		}
	}
	${j}
`;function V(a){let b={...e,...a};return d.useSubscription(U,b)}},86800:()=>{},99624:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.d(b,{A:()=>w});var e=c(8732),f=c(45340),g=c(12479),h=c(88608),i=c(51789),j=c(51117),k=c(9077),l=c(76883),m=c(66229),n=c(31164),o=c(74217),p=c(27337),q=c(19918),r=c.n(q),s=c(44233),t=c(82015),u=c(49377),v=a([p,n,g,o,h,f,i,j,k,l,m]);[p,n,g,o,h,f,i,j,k,l,m]=v.then?(await v)():v;let x=(0,n.Ay)(g.A)(({theme:a})=>({"& .MuiBreadcrumbs-separator, & .MuiBreadcrumbs-li, & a, & a:hover, & a:visited, & a:active":{color:a.palette.primary.contrastText,textDecoration:"none",fontWeight:"normal"}}));function w(){let a=(0,s.useRouter)(),b=(0,o.A)(),c=(0,h.A)(b.breakpoints.down("md")),{campaignId:d,encounterId:g}=a.query,{data:n,refetch:q}=(0,u.Jj)({variables:{campaignId:d},skip:!d}),{data:v}=(0,u.G$)({variables:{campaignId:d,encounterId:g},skip:!(d&&g)}),w=(0,t.useMemo)(()=>{let b=a.pathname.replace(/\/$/,""),c=[{href:"/",title:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(f.A,{sx:{mr:.25,mb:-.25},fontSize:"inherit"}),"Campaigns"]})}];switch(b){case"/[campaignId]/edit":c.push({title:n?.campaign?.name});break;case"/[campaignId]/encounter":c.push({href:`/${d}/edit`,title:n?.campaign?.name}),c.push({title:"Encounters"});break;case"/[campaignId]/encounter/run":case"/[campaignId]/encounter/[encounterId]/edit":c.push({href:`/${d}/edit`,title:n?.campaign?.name}),c.push({href:`/${d}/encounter`,title:"Encounters"}),c.push({title:b.endsWith("run")?n?.campaign?.activeEncounter?.name:v?.campaign?.encounter?.name})}return c},[d,n,v,a.pathname]);return a.pathname.includes("overlay")?null:(0,e.jsx)(i.A,{sx:{flexGrow:1,pb:4},children:(0,e.jsx)(x,{position:"static",children:(0,e.jsx)(p.Container,{maxWidth:"lg",children:(0,e.jsx)(j.A,{sx:{ml:-4,mr:-4},children:(0,e.jsx)(k.A,{"aria-label":"breadcrumb",sx:{flexGrow:1},maxItems:c?1:void 0,children:w.map(({href:a,title:b})=>a?(0,e.jsx)(r(),{href:a,children:(0,e.jsx)(l.A,{component:"span",underline:"hover",color:"text.",children:(0,e.jsx)(m.A,{noWrap:!0,children:b})})},a):(0,e.jsx)(m.A,{noWrap:!0,children:b},a||"active"))})})})})})}d()}catch(a){d(a)}})}};