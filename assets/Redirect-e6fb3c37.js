import{j as c,ad as p,q as u,o as i,br as d,k as _,l}from"./index-f0783a82.js";const h=c({__name:"Redirect",setup(m){const{currentRoute:r,replace:n}=p(),{params:o,query:s}=u(r);function t(){const{path:e}=o,a=Array.isArray(e)?e.join("/"):e;n({path:"/"+a,query:s})}return i(()=>{t()}),d(()=>{t()}),(e,a)=>(_(),l("div"))}});export{h as default};
