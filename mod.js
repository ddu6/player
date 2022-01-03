var e={d:(t,a)=>{for(var n in a)e.o(a,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:a[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function a(){const e=document.createElement("div");e.classList.add("rate-bar");let t=.5;function a(){const a=100*t;e.style.background=`linear-gradient(to right, var(--color-variable) ${a}%, var(--color-area) ${a}%)`}function n(e){isFinite(e)&&(e<0?e=0:e>1&&(e=1),t=e,a())}return e.addEventListener("click",(t=>{n(t.offsetX/e.offsetWidth)})),a(),{element:e,getValue:function(){return t},setValue:n}}function n(e,t){return Math.exp(2*(e-.5)*Math.log(t))}function r(e,t){return Math.log(e)/Math.log(t)/2+.5}function o(e){const t=Math.floor(e%3600/60).toString().padStart(2,"0")+":"+Math.floor(e%60).toString().padStart(2,"0");return e<=3600?t:Math.floor(e/3600).toString()+":"+t}e.d(t,{ky:()=>a,F_:()=>n,SM:()=>r,AS:()=>o,hM:()=>i});const s=["autoplay","controls","crossorigin","loop","muted","poster","preload"],i=async(e,t)=>{const i=document.createElement("div"),d=document.createElement("video"),l=document.createElement("div"),c=document.createElement("div"),p=document.createElement("div"),u=document.createElement("button"),m=a(),v=document.createElement("div"),y=a(),g=document.createElement("div"),L=a(),f=document.createElement("div");i.append(d),i.append(l),l.append(c),l.append(p),c.append(u),c.append(m.element),c.append(v),p.append(new Text("Speed")),p.append(y.element),p.append(g),p.append(new Text("Brightness")),p.append(L.element),p.append(f),l.classList.add("hide"),u.classList.add("show-icon"),u.classList.add("play"),m.setValue(0);const{src:h,time:E}=e.options;"string"==typeof h&&(d.src=h),"number"==typeof E&&isFinite(E)&&E>0&&(d.currentTime=E);for(const a of s){let n=e.options[a]??t.extractor.extractLastGlobalOption(a,"player",t.context.tagToGlobalOptions);if(!0===n&&(n=""),"string"==typeof n)try{d.setAttribute(a,n)}catch(e){console.log(e)}}function k(){const e=n(L.getValue(),10);d.style.filter=`brightness(${e})`,f.textContent=e.toFixed(1)}v.textContent=o(0),g.textContent="1.0",f.textContent="1.0",d.addEventListener("click",(()=>{l.classList.toggle("hide")})),u.addEventListener("click",(async()=>{u.classList.contains("pushing")||(u.classList.add("pushing"),u.classList.contains("play")?await d.play():d.pause(),u.classList.remove("pushing"))})),m.element.addEventListener("click",(()=>{const e=m.getValue()*d.duration,{seekable:t}=d;for(let a=0;a<t.length;a++)if(t.start(a)<=e&&e<=t.end(a))return d.currentTime=e,void(v.textContent=o(d.currentTime))})),y.element.addEventListener("click",(()=>{d.playbackRate=Math.exp(2*(y.getValue()-.5)*Math.log(5))})),L.element.addEventListener("click",k),d.addEventListener("loadedmetadata",(()=>{v.textContent=o(d.duration),i.classList.remove("loading")})),d.addEventListener("playing",(()=>{i.classList.remove("loading")})),d.addEventListener("waiting",(()=>{i.classList.add("loading")})),d.addEventListener("error",(()=>{i.classList.add("error")})),d.addEventListener("play",(()=>{u.classList.remove("play"),u.classList.add("pause")})),d.addEventListener("pause",(()=>{u.classList.add("play"),u.classList.remove("pause")})),d.addEventListener("ended",(()=>{u.classList.add("play"),u.classList.remove("pause")}));let x=0;return d.addEventListener("timeupdate",(()=>{const e=Date.now();e-x<500||(x=e,m.setValue(d.currentTime/d.duration),v.textContent=o(d.currentTime))})),d.addEventListener("ratechange",(()=>{const e=d.playbackRate;y.setValue(r(e,5)),g.textContent=e.toFixed(1)})),u.addEventListener("keydown",(e=>"ArrowLeft"===e.key?(e.preventDefault(),d.currentTime-=10,void(v.textContent=o(d.currentTime))):"ArrowRight"===e.key?(e.preventDefault(),d.currentTime+=10,void(v.textContent=o(d.currentTime))):"ArrowUp"===e.key?(e.preventDefault(),L.setValue(r(n(L.getValue(),10)+.1,10)),void k()):"ArrowDown"===e.key?(e.preventDefault(),L.setValue(r(n(L.getValue(),10)-.1,10)),void k()):"["===e.key?(e.preventDefault(),void(d.playbackRate=Math.max(.2,d.playbackRate-.1))):"]"===e.key?(e.preventDefault(),void(d.playbackRate=Math.min(5,d.playbackRate+.1))):void 0)),d.append(await t.compileInlineSTDN(e.children)),i};var d=t.ky,l=t.hM,c=t.AS,p=t.F_,u=t.SM;export{d as createRateBar,l as player,c as prettyTime,p as rateToScale,u as scaleToRate};