const Ke=()=>{};function Pe(e){return typeof(e==null?void 0:e.then)=="function"}function fe(e){for(var t=0;t<e.length;t++)e[t]()}function Ue(e){return e()}var ue=Array.isArray,Ye=Array.from,He=Object.isFrozen,Ve=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,ke=Object.getOwnPropertyDescriptors,We=Object.prototype,ge=Array.prototype,Ge=Object.getPrototypeOf;const Te=1,X=2,le=4,q=8,ee=16,P=64,I=128,h=256,v=512,S=1024,Z=2048,V=4096,Ze=0,Ae=1,Se=2,$e=3,Je=4,Qe=6,Xe=7,et=8,Ce=Symbol(),ce=Symbol("$state");let U=!1,$=[];function ie(){U=!1;const e=$.slice();$=[],fe(e)}function tt(e){U||(U=!0,setTimeout(ie,0)),$.push(e)}function xe(){U&&ie()}const z=le|q|ee,_e=0,De=1;let B=_e,Y=!1,A=!1,l=[],x=[],D=0,O=null,p=null,_=null,u=0,k=null,T=!1,J=!1;function nt(e){J=e}let R=!1,M=!1,C=new Set,K=null,b=null,G=!1;function H(e){const t=e||b;return t!==null&&t.r}function te(e){const t=e.f;if(t&v||e.v===Ce)return!0;if(t&S){const n=e.d;if(n!==null){const r=n.length;let o;for(o=0;o<r;o++){const s=n[o];if(s.f&S&&!te(s)){y(s,h);continue}if(s.f&v)if(s.f&X){if(Ee(s,!0),e.f&v)return!0}else return!0;const i=(t&I)!==0,c=e.w,f=s.w;if(i&&f>c)return e.w=f,!0}}}return!1}function pe(e){const t=e.i,n=e.f,r=_,o=u,s=k,i=O,c=K,f=b,E=R,m=(n&ee)!==0,we=T;_=null,u=0,k=null,O=e,K=e.b,b=e.x,R=!A&&(n&I)!==0,T=!1;try{let W;m?W=t(e.b,e):W=t();let a=e.d;if(_!==null){let d;if(a!==null){const L=a.length,w=u===0?_:a.slice(0,u).concat(_),se=w.length>16&&L-u>1?new Set(w):null;for(d=u;d<L;d++){const g=a[d];(se!==null?!se.has(g):!w.includes(g))&&ae(e,g)}}if(a!==null&&u>0)for(a.length=u+_.length,d=0;d<_.length;d++)a[u+d]=_[d];else e.d=a=_;if(!R)for(d=u;d<a.length;d++){const L=a[d],w=L.c;w===null?L.c=[e]:w[w.length-1]!==e&&w.push(e)}}else a!==null&&u<a.length&&(ne(e,u),a.length=u);return W}finally{_=r,u=o,k=s,O=i,K=c,b=f,R=E,T=we}}function ae(e,t){const n=t.c;let r=0;if(n!==null){r=n.length-1;const o=n.indexOf(e);o!==-1&&(r===0?t.c=null:(n[o]=n[r],n.pop()))}r===0&&t.f&I&&(y(t,v),ne(t,0))}function ne(e,t){const n=e.d;if(n!==null){const r=t===0?null:n.slice(0,t);let o;for(o=t;o<n.length;o++){const s=n[o];(r===null||!r.includes(s))&&ae(e,s)}}}function re(e){const t=e.r;if(e.r=null,t!==null){let n;for(n=0;n<t.length;n++)je(t[n])}}function Ne(e,t){if(e!==null)throw t}function de(e){if(e.f&V)return;const t=e.v,n=p;p=e;try{re(e),t!==null&&t();const o=pe(e);typeof o=="function"&&(e.v=o)}catch(o){const s=e.b;if(s!==null)Ne(s,o);else throw o}finally{p=n}const r=e.x;H(r)&&e.f&q&&l.length>0&&Le(r)}function he(){if(D>100)throw D=0,new Error("ERR_SVELTE_TOO_MANY_UPDATES");D++}function N(e){const t=e.length;if(t>0){he();const n=A;A=!0;try{let r;for(r=0;r<t;r++){const o=e[r],s=o.f;s&(V|Z)||(te(o)?(y(o,h),de(o)):s&S&&y(o,h))}}finally{A=n}e.length=0}}function Ie(){if(Y=!1,D>101)return;const e=l,t=x;l=[],x=[],N(e),N(t),Y||(D=0)}function F(e,t){const n=e.f;if(t){const r=A;try{A=!0,de(e),y(e,h)}finally{A=r}}else if(B===_e&&(Y||(Y=!0,queueMicrotask(Ie))),n&le)x.push(e),n&P||Oe(e,!0);else{const r=l.length;let o=r===0;if(!o){const s=e.l,i=e.b,c=(n&q)!==0;let f,E,m=r;for(;;){if(f=l[--m],f.l<=s){m+1===r?o=!0:(E=(f.f&q)!==0,(f.b!==i||E&&!c)&&m++,l.splice(m,0,e));break}if(m===0){l.unshift(e);break}}}o&&l.push(e)}}function rt(){const e=[];for(let t=0;t<l.length;t++){const n=l[t];n.f&ee&&n.x===b&&(e.push(n),l.splice(t,1),t--)}N(e)}function Le(e){const t=[];for(let n=0;n<l.length;n++){const r=l[n];r.f&q&&r.x===e&&(t.push(r),l.splice(n,1),n--)}N(t)}function ye(e){Re(e)}function Re(e,t=!0){const n=B,r=l,o=x;let s;try{he();const i=[],c=[];B=De,l=i,x=c,t&&(N(r),N(o)),e!==void 0&&(s=e()),(l.length>0||c.length>0)&&ye(),xe(),D=0}finally{B=n,l=r,x=o}return s}async function ot(){await Promise.resolve(),ye()}function Ee(e,t){const n=G;G=!0,re(e);const r=pe(e);G=n;const o=(R||e.f&I)&&e.d!==null?S:h;y(e,o);const s=e.e;s(r,e.v)||(e.v=r,oe(e,v,t))}function me(e){const t=e.f;if(t&V)return e.v;if(M&&C.add(e),O!==null&&!(O.f&P)&&!T){const n=(O.f&I)!==0,r=O.d;_===null&&r!==null&&r[u]===e&&!(n&&p!==null)?u++:(r===null||u===0||r[u-1]!==e)&&(_===null?_=[e]:_.push(e)),k!==null&&p!==null&&p.f&h&&!(p.f&P)&&k.includes(e)&&(y(p,v),F(p,!1))}return t&X&&te(e)&&Ee(e,!1),e.v}function st(e,t){return ve(e,t),t}function ct(e){var t=M,n=C;M=!0,C=new Set;var r=C,o;try{be(e)}finally{if(M=t,M)for(o of C)n.add(o);C=n}for(o of r)Me(o,null)}function Me(e,t){return ve(e,be(()=>me(e))),t}function Oe(e,t,n){const r=e.r;if(r!==null){let o;for(o=0;o<r.length;o++){const s=r[o];s.f&z&&j(s,t,n)}}}function j(e,t,n=new Set){const r=e.f;if((r&Z)!==0!==t){e.f^=Z,!t&&r&z&&!(r&h)&&F(e,!1);const s=e.b;if(s!==null&&!n.has(s)){n.add(s);const i=s.t;if(i===Ae){const c=s.e;c!==null&&s!==K&&j(c,t,n);const f=s.ce;f!==null&&s.v&&j(f,t,n);const E=s.ae;E!==null&&!s.v&&j(E,t,n)}else if(i===Se){const c=s.v;for(let{e:f}of c)f!==null&&j(f,t,n)}}}Oe(e,t,n)}function oe(e,t,n){const r=H(null),o=e.c;if(o!==null){const s=o.length;let i;for(i=0;i<s;i++){const c=o[i],f=c.f,E=(f&I)!==0;if((!n||!r)&&c===p)continue;y(c,t);const m=(f&S)!==0;(f&h||m&&E)&&(c.f&z?F(c,!1):oe(c,S,n))}}}function ve(e,t){if(!T&&!J&&O!==null&&H(null)&&O.f&X)throw new Error("ERR_SVELTE_UNSAFE_MUTATION");e.f&Te&&!e.e(t,e.v)&&(e.v=t,e.w++,H(null)&&!J&&p!==null&&p.c===null&&p.f&h&&!(p.f&P)&&(_!==null&&_.includes(e)?(y(p,v),F(p,!1)):k===null?k=[e]:k.push(e)),oe(e,v,!0))}function je(e){const t=e.v,n=e.y,r=e.f;re(e),ne(e,0),e.i=e.r=e.y=e.x=e.b=e.d=e.c=null,y(e,V),n!==null&&(ue(n)?fe(n):n()),t!==null&&r&z&&t()}function be(e){const t=T;try{return T=!0,e()}finally{T=t}}function ft(e,t){let n=e.y;n===null?e.y=t:ue(n)?n.push(t):e.y=[n,t]}const qe=~(v|S|h);function y(e,t){e.f=e.f&qe|t}function Fe(e){return typeof e=="object"&&e!==null&&typeof e.f=="number"}function ut(e,t=!1,n){b={x:null,c:null,e:null,m:!1,p:b,d:null,s:e,r:t,u:null}}function lt(e){const t=b;if(t!==null){e!==void 0&&(t.x=e);const n=t.e;if(n!==null){t.e=null;for(let r=0;r<n.length;r++)F(n[r],!1)}b=t.p,t.m=!0}return e||{}}function it(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(ce in e)Q(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&ce in n&&Q(n)}}}function Q(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e);for(let r in e)try{Q(e[r],t)}catch{}const n=Object.getPrototypeOf(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=ke(n);for(let o in r){const s=r[o].get;if(s)try{s.call(e)}catch{}}}}}function _t(e){return Fe(e)?me(e):e}export{Re as $,Je as A,b as B,ot as C,F as D,Se as E,le as F,p as G,rt as H,Ae as I,O as J,v as K,h as L,P as M,X as N,I as O,q as P,Te as Q,ee as R,ce as S,tt as T,Ce as U,j as V,fe as W,Ze as X,Qe as Y,et as Z,Xe as _,ut as a,Ye as a0,M as a1,Ue as a2,it as a3,ft as b,K as c,je as d,de as e,$e as f,me as g,st as h,ue as i,ct as j,be as k,nt as l,Me as m,Ke as n,Pe as o,lt as p,ye as q,He as r,ve as s,We as t,_t as u,ge as v,Ve as w,G as x,ze as y,Ge as z};
