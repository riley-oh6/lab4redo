import{C as _,D as w,i as D,F as L,G as P,H as A,c as E,d as a,a as g,I as F,J as I,r as J,K,L as M,t as R,f as U,o as W,b as Y,g as $,s as q,e as H}from"../chunks/disclose-version.CO_dDP94.js";import{g as e,p as z,a as B,h as N,j as O,u as i,k as y,m as Q}from"../chunks/runtime.ydBjxQlf.js";import{e as V}from"../chunks/each.DjCXWW3j.js";import{u as X,s as Z,p as ee}from"../chunks/stores.Bb8etOrd.js";var te=H('<a class="svelte-1ph2wmi"> </a>'),ae=H('<nav class="svelte-1ph2wmi"></nav> <!> <label class="color-scheme svelte-1ph2wmi">Theme: <select id="themeSelect"><option>Automatic</option><option>Light</option><option>Dark</option></select></label>',!0);function ne(v,h){var S;B(h,!1);const f={};X(f);const j=()=>Z(ee,"$page",f);let G=_([{url:"./",title:"Home"},{url:"./projects",title:"Projects"},{url:"./resume",title:"Resume"},{url:"./contact",title:"Contact"},{url:"https://github.com/YourGitHubUsername",title:"GitHub",external:!0},{url:"./meta",title:"Meta"}]),n=(S=globalThis==null?void 0:globalThis.document)==null?void 0:S.documentElement,s=_(globalThis.localStorage??{});console.log(e(s));let t=_(e(s).colorScheme??"light dark");w(()=>{e(t),y(()=>{Q(s,e(s).colorScheme=e(t))})}),w(()=>{e(t),y(()=>{n==null||n.style.setProperty("color-scheme",e(t))})}),D();var d=W(v,!0,ae),b=Y(d),k=a(a(b,!0)),T=a(a(k,!0)),u=a(g(T));F(u),L(()=>{e(t),O(()=>{})});var c=g(u);c.value=(c.__value="light dark")==null?"":"light dark";var m=a(c);m.value=(m.__value="light")==null?"":"light";var x=a(m);x.value=(x.__value="dark")==null?"":"dark",V(b,()=>e(G),9,(r,o,le)=>{var l=$(r,!0,te),C=q(g(l));I(l,"target",()=>i(o).url.startsWith("http")?"_blank":null);var p;J(()=>{p!==(p=i(o).url)&&K(l,"href",p),M(l,"active","."+j().route.id===i(o).url),R(C,i(o).title)}),U(r,l)},null),P(k,h.children,{},null),A(u,()=>e(t),r=>N(t,r)),E(v,d),z()}export{ne as component};