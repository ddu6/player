(()=>{"use strict";class A{constructor(A,n=[]){this.element=document.createElement(A),this.classList=this.element.classList,this.style=this.element.style,this.dataset=this.element.dataset,this.childNodes=this.element.childNodes,this.children=this.element.children;for(let A=0;A<n.length;A++){const e=n[A].replace(/\s/g,"-");if(""!==e)try{this.element.classList.add(e)}catch(A){console.log(A)}}}append(...n){return this.element.append(...n.map((n=>n instanceof A?n.element:n))),this}prepend(...n){return this.element.prepend(...n.map((n=>n instanceof A?n.element:n))),this}after(...n){return this.element.after(...n.map((n=>n instanceof A?n.element:n))),this}before(...n){return this.element.before(...n.map((n=>n instanceof A?n.element:n))),this}setText(A){return this.element.textContent=A,this}setHTML(A){return this.element.innerHTML=A,this}scrollBy(A){return this.element.scrollBy(A),this}scrollIntoView(A){return this.element.scrollIntoView(A),this}getBoundingClientRect(){return this.element.getBoundingClientRect()}getClientRects(){return this.element.getClientRects()}setAttribute(A,n){try{this.element.setAttribute(A,n)}catch(A){console.log(A)}return this}removeAttribute(A){return this.element.removeAttribute(A),this}getAttribute(A){return this.element.getAttribute(A)}hasAttribute(A){return this.element.hasAttribute(A)}}class n extends A{constructor(A=[]){super("div",A)}addEventListener(A,n,e){return this.element.addEventListener(A,n,e),this}}class e extends n{constructor(A,n,e=[]){super([A,n].concat(e)),this.name=A,this.type=n;try{this.element.dataset.name=A}catch(A){console.log(A)}}}class t extends e{constructor(A,n=[]){super(A,"checkbox",["show icon"].concat(n))}}class o extends e{constructor(A,e,t,o,r=!1,i=3,a=!1,l=[]){super(A,"number bar",l),this.min=e,this.value=t,this.max=o,this.log=r,this.fractionDigits=i,this.isStatic=a,this.valEle=new n(["value"]),this.track=new n(["track"]),this.bar=new n(["bar"]),this.inputListeners=[],r&&(this.min=Math.log(e),this.value=Math.log(t),this.max=Math.log(o)),this.append(this.track.append(this.bar)).append(this.valEle),this.track.addEventListener("click",(async A=>{if(a)return;const n=A.offsetX/this.track.element.offsetWidth;this.value=this.min+(this.max-this.min)*n,this.renderBar();const e=this.log?Math.exp(this.value):this.value;for(let A=0;A<this.inputListeners.length;A++)await this.inputListeners[A](e)})),this.renderBar()}setMin(A){this.log&&(A=Math.log(A)),(A>this.value||!isFinite(A))&&(A=this.value),this.min=A,this.renderBar()}setValue(A){this.log&&(A=Math.log(A)),A<this.min||!isFinite(A)?A=this.min:A>this.max&&(A=this.max),this.value=A,this.renderBar()}setMax(A){this.log&&(A=Math.log(A)),(A<this.value||!isFinite(A))&&(A=this.value),this.max=A,this.renderBar()}renderBar(){const A=100*this.getRate()+"%";this.bar.style.background=`linear-gradient(to right, var(--color-variable) ${A}, var(--color-area) ${A})`,this.renderValue()}renderValue(){const A=Math.pow(10,this.fractionDigits);this.valEle.setText((Math.round((this.log?Math.exp(this.value):this.value)*A)/A).toString())}getRate(){return this.max<=this.min?0:(this.value-this.min)/(this.max-this.min)}getValue(){return this.log?Math.exp(this.value):this.value}}class r extends o{constructor(A,n=0,e=!1,t=[]){super(A,0,0,n,!1,0,e,t)}renderValue(){this.valEle.setText(r.prettyTime(this.value)+"/"+r.prettyTime(this.max))}static prettyTime(A){const n=Math.floor(A%3600/60).toString().padStart(2,"0")+":"+Math.floor(A%60).toString().padStart(2,"0");return A<=3600?n:Math.floor(A/3600).toString()+":"+n}}class i extends n{constructor(A="",n="",e="",t=[]){super(t),this.styleEle=document.createElement("style"),document.head.innerHTML+="<meta charset='utf8'><meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'>",document.head.innerHTML.includes("icon")||(""===n&&(n="data:image/png;base64,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"),document.head.innerHTML+=`<link rel='icon' href=${JSON.stringify(n)}>`),""!==A&&""===document.title&&(document.title=A),document.body.style.margin="0",this.styleEle.textContent='@font-face{font-family:"menu";src:url("data:font/woff;base64,d09GRgABAAAAAAR4AAsAAAAABCwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxEMa2NtYXAAAAFoAAAAVAAAAFQAFAEJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAHAAAABwilZXf2hlYWQAAAI0AAAANgAAADYc4smiaGhlYQAAAmwAAAAkAAAAJAdCA8ZobXR4AAACkAAAABQAAAAUCgAAgGxvY2EAAAKkAAAADAAAAAwAKABMbWF4cAAAArAAAAAgAAAAIAAJAA5uYW1lAAAC0AAAAYYAAAGGmUoJ+3Bvc3QAAARYAAAAIAAAACAAAwAAAAMDAAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAQAAAAEEDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIABB//3//wAAAAAAIABB//3//wAB/+P/wwADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAwCAAKsDgAKrAAMABwALAAATIRUhFTUhFQU1IRWAAwD9AAMA/QADAAKrVtRUVNZWVgAAAAEAAAABAAB7+aVnXw889QALBAAAAAAA3SJC/QAAAADdIkL9AAAAAAOAAqsAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAA4AAAQAAAAAAAAAAAAAAAAAAAAUEAAAAAAAAAAAAAAACAAAABAAAgAAAAAAACgAUAB4AOAABAAAABQAMAAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==")}.show-icon.menu::before{font-family:"menu";content:"A"}/* html */\nhtml {\n    --color-text: black;\n    --color-light: #6a737d;\n    --color-string: darkorange;\n    --color-number: #098658;\n    --color-keyword: #AF00DB;\n    --color-function: #ecad00;\n    --color-variable: deepskyblue;\n    --color-modifier: dodgerblue;\n    --color-class: #267f99;\n    --color-warn: red;\n    --color-comment: limegreen;\n    --color-border: #e1e4e8;\n    --color-bg: white;\n    --color-area: whitesmoke;\n    --color-pre: #f6f8fa;\n    --color-slice: rgba(211, 211, 211, 0.5);\n    --color-selection: rgba(135, 206, 235, 0.5);\n    --color-span: rgba(27, 31, 35, .05);\n    --font: ui-sans-serif, "Segoe UI", Helvetica, Arial, "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;\n    --font-mono: ui-monospace, "SF Mono", Consolas, monospace, "Segoe UI", Helvetica, Arial, "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    --length-width: calc(210mm - .8in);\n    ;\n    --length-width-side: 336px;\n    --length-width-bar: 15px;\n    --length-tab: 2em;\n    --length-padding: 1em;\n    --length-gap: .5em;\n    --length-padding-span: .3em;\n    --length-space: .25em;\n    --length-padding-circle: .2em;\n    --length-font-title: 1.8em;\n    --length-font-heading: 1.3em;\n    --length-font-span: .85em;\n    --length-font-log: .8em;\n    --length-font-circle: .7em;\n    --number-ratio-line: 1.5;\n    line-height: var(--number-ratio-line);\n    font-family: var(--font);\n    color: var(--color-text);\n    background-color: var(--color-bg) !important;\n    font-size: 16px;\n}\n\nhtml[data-font-size=medium] {\n    font-size: 17px\n}\n\nhtml[data-font-size=large] {\n    font-size: 18px\n}\n\nhtml[data-color-scheme=dark] {\n    --color-text: #cccccc;\n    --color-light: #8f8f8f;\n    --color-string: #df9e61;\n    --color-number: #B5CEA8;\n    --color-keyword: #cc80c6;\n    --color-function: #DCDCAA;\n    --color-variable: #6ec0ec;\n    --color-modifier: #3074ac;\n    --color-class: #4EC9B0;\n    --color-warn: #F44747;\n    --color-comment: #6A9955;\n    --color-border: #2e3133;\n    --color-bg: #131313;\n    --color-area: #161616;\n    --color-pre: #191b1d;\n    --color-slice: rgba(88, 88, 88, 0.5);\n    --color-selection: rgba(95, 144, 163, 0.5);\n    --color-span: rgba(58, 61, 65, 0.5);\n}\n\nhtml[data-color-scheme=dark] .dark{\n    filter: brightness(.5);\n}\n\nhtml[data-color-scheme=dark] .invert{\n    filter: invert(.9147982) brightness(.8745098);\n}\n\n@media (prefers-color-scheme: dark) {\n    html:not([data-color-scheme=light]) {\n        --color-text: #cccccc;\n        --color-light: #8f8f8f;\n        --color-string: #df9e61;\n        --color-number: #B5CEA8;\n        --color-keyword: #cc80c6;\n        --color-function: #DCDCAA;\n        --color-variable: #6ec0ec;\n        --color-modifier: #3074ac;\n        --color-class: #4EC9B0;\n        --color-warn: #F44747;\n        --color-comment: #6A9955;\n        --color-border: #2e3133;\n        --color-bg: #131313;\n        --color-area: #161616;\n        --color-pre: #191b1d;\n        --color-slice: rgba(88, 88, 88, 0.5);\n        --color-selection: rgba(95, 144, 163, 0.5);\n        --color-span: rgba(58, 61, 65, 0.5);\n    }\n\n    html:not([data-color-scheme=light]) .dark{\n        filter: brightness(.5);\n    }\n\n    html:not([data-color-scheme=light]) .invert{\n        filter: invert(.9147982) brightness(.8745098);\n    }\n}\n\n@media screen and (max-width:600px) {\n    html {\n        font-size: 15px\n    }\n\n    html[data-font-size=medium] {\n        font-size: 16px\n    }\n\n    html[data-font-size=large] {\n        font-size: 17px\n    }\n}\n\n@media screen and (max-width:500px) {\n    html {\n        font-size: 14px\n    }\n\n    html[data-font-size=medium] {\n        font-size: 15px\n    }\n\n    html[data-font-size=large] {\n        font-size: 16px\n    }\n}\n\n@media screen and (max-width:400px) {\n    html {\n        font-size: 13px\n    }\n\n    html[data-font-size=medium] {\n        font-size: 14px\n    }\n\n    html[data-font-size=large] {\n        font-size: 15px\n    }\n}\n\n/* lrStruct */\nbody>.lr-struct {\n    min-height: 100vh;\n    position: relative;\n    display: flex;\n}\n\nbody>.lr-struct>.main {\n    margin-left: var(--length-width-side);\n    flex-grow: 1;\n    box-sizing: border-box;\n    width: 100%;\n}\n\nbody>.lr-struct>.button {\n    display: none;\n    position: fixed;\n    left: 0;\n    top: 0;\n}\n\nbody>.lr-struct>.side {\n    box-sizing: border-box;\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: var(--length-width-side);\n    max-width: 90%;\n    height: 100vh;\n    background-color: var(--color-pre);\n    border-right: 1px solid var(--color-border);\n}\n\n@media screen and (max-width:960px) {\n    body>.lr-struct>.side:not(.active) {\n        display: none;\n    }\n\n    body>.lr-struct>.button {\n        display: block;\n    }\n\n    body>.lr-struct>.main {\n        margin-left: 0 !important;\n    }\n}\n\nbody>.lr-struct>.side>.cover {\n    display: none;\n}\n\nbody>.lr-struct.sashing>.side>.cover {\n    display: block;\n    position: fixed;\n    width: 100vw;\n    height: 100%;\n    top: 0;\n    left: 0;\n    cursor: ew-resize;\n}\n\nbody>.lr-struct>.side>.sash {\n    height: 100%;\n    width: 10px;\n    position: absolute;\n    top: 0;\n    right: -5px;\n    cursor: ew-resize;\n}\n\nbody>.lr-struct.sashing>.side>.sash {\n    background-color: var(--color-slice);\n}\n\nbody>.lr-struct>.side>.content {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n}\n\nbody>.lr-struct>.side>.content.vanished {\n    display: none;\n}\n\n@media print {\n    body>.lr-struct {\n        min-height: 0;\n    }\n\n    body>.lr-struct>.main {\n        margin-left: 0 !important;\n    }\n\n    body>.lr-struct>.side,\n    body>.lr-struct>.button {\n        display: none;\n    }\n}\n\n/* print */\n@page {\n    color-adjust: exact;\n    -webkit-print-color-adjust: exact;\n    size: A4 portrait;\n}/* scroll */\n::-webkit-scrollbar {\n    background-color: transparent;\n}\n\n::-webkit-scrollbar-corner {\n    background-color: transparent;\n}\n\n::-webkit-scrollbar-thumb {\n    background-color: var(--color-slice);\n}\n\n/* a */\na,\na:hover {\n    color: inherit;\n    text-decoration: none;\n}\n\na[href]:not([href^="#"]) {\n    color: var(--color-modifier);\n}\n\na[href]:hover {\n    text-decoration: underline;\n}\n\n/* blockquote */\nblockquote {\n    padding: 0px;\n    margin: 0px;\n    border: 0px solid var(--color-border);\n    border-left-width: 3px;\n    padding-left: var(--length-padding);\n    color: var(--color-light);\n}\n\n/* button */\nbutton,\ninput[type="button"],\ninput[type="reset"],\ninput[type="submit"],\n.button {\n    font: inherit;\n    color: var(--color-text);\n    border-radius: var(--length-padding-span);\n    padding: var(--length-space) var(--length-padding);\n    background-color: var(--color-slice);\n    border: none;\n    outline: none;\n    text-align: center;\n    cursor: pointer;\n    display: inline-block;\n}\n\nbutton:hover,\ninput[type="button"]:hover,\ninput[type="reset"]:hover,\ninput[type="submit"]:hover,\n.button:hover,\nbutton.pushing,\ninput[type="button"].pushing,\ninput[type="reset"].pushing,\ninput[type="submit"].pushing,\n.button.pushing {\n    background-color: var(--color-selection);\n}\n\n/* code */\ncode,\npre,\nsamp {\n    white-space: pre-wrap;\n    tab-size: 4;\n    font-family: var(--font-mono);\n}\n\ncode {\n    font-size: var(--length-font-span);\n    padding: 0 var(--length-padding-span);\n    border-radius: var(--length-padding-span);\n    background-color: var(--color-span);\n}\n\npre code {\n    font: inherit;\n    padding: 0;\n    border-radius: 0;\n    background-color: transparent;\n}\n\n/* details */\nsummary {\n    outline: none;\n}\n\n/* fieldset */\nfieldset {\n    margin: 0;\n    padding: var(--length-padding);\n    border: 1px solid var(--color-border);\n}\n\nlegend {\n    padding: var(--length-padding-span);\n}\n\n/* figure */\nfigure {\n    text-align: center;\n    margin: var(--length-space) 0;\n}\n\nfigcaption {\n    margin: var(--length-space) 0;\n}\n\n/* h */\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    margin: var(--length-gap) 0;\n    font: inherit;\n}\n\nh1,\nh2 {\n    padding-bottom: var(--length-padding-circle);\n    border-bottom: 1px solid var(--color-border);\n}\n\nh1 {\n    font-size: var(--length-font-title);\n}\n\nh2 {\n    font-size: calc((var(--length-font-title) + var(--length-font-heading)) / 2);\n}\n\nh3 {\n    font-size: calc((var(--length-font-title) + var(--length-font-heading)) / 2);\n}\n\nh4 {\n    font-size: var(--length-font-heading);\n}\n\nh5 {\n    font-size: calc((1em + var(--length-font-heading)) / 2);\n}\n\nh6 {\n    font-size: 1em;\n}\n\n/* hr */\nhr {\n    height: 3px;\n    margin: var(--length-gap) 0;\n    background-color: var(--color-border);\n    border: 0;\n}\n\nhr::after {\n    content: "";\n    display: flow-root;\n    clear: both;\n}\n\n/* img */\nimg {\n    max-width: 100%;\n}\n\n/* input */\ninput,\nselect,\ntextarea {\n    font: inherit;\n    color: var(--color-text);\n    padding: 0 var(--length-padding-circle);\n    margin: 0;\n    background-color: transparent;\n    border: 1px solid var(--color-border);\n    outline: none;\n    border-radius: var(--length-padding-span);\n    box-sizing: content-box;\n}\n\ninput:focus,\nselect:focus,\ntextarea:focus {\n    border-color: var(--color-variable);\n}\n\nselect {\n    appearance: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n}\n\ninput[type=number],\ninput[type=date] {\n    appearance: textfield;\n    -webkit-appearance: textfield;\n    -moz-appearance: textfield;\n}\n\ninput[type=date] {\n    height: auto;\n    width: auto;\n    vertical-align: middle;\n    height: calc(var(--number-ratio-line) * 1em);\n}\n\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button,\ninput[type=date]::-webkit-calendar-picker-indicator,\ninput[type=date]::-webkit-clear-button { \n    opacity: 0;\n}\n\ninput[type=file]::-webkit-file-upload-button {\n    display: none;\n}\n\noption {\n    background-color: var(--color-bg);\n}\n\ntextarea {\n    resize: none;\n    height: calc(var(--number-ratio-line) * 5em);\n}\n\n/* kbd */\nkbd {\n    display: inline-block;\n    padding: var(--length-padding-circle);\n    font-size: var(--length-font-circle);\n    line-height: 1;\n    border: 1px solid var(--color-border);\n    border-radius: var(--length-padding-span);\n    box-shadow: inset 0 -1px 0 var(--color-border);\n    font-family: var(--font-mono);\n}\n\n/* l */\nol {\n    list-style: decimal\n}\n\nul {\n    list-style: disc\n}\n\nol ol,\nul ol {\n    list-style-type: lower-roman\n}\n\nol ol ol,\nol ul ol,\nul ol ol,\nul ul ol {\n    list-style-type: lower-alpha\n}\n\nol,\nul {\n    margin: var(--length-gap) 0;\n    padding-left: var(--length-tab);\n}\n\nli {\n    margin: var(--length-gap) 0;\n}\n\ndl {\n    margin: var(--length-gap) 0;\n}\n\ndd {\n    margin: var(--length-gap) 0;\n    margin-left: var(--length-tab);\n}\n\ndt {\n    font-weight: bold;\n}\n\n/* p */\np {\n    margin: var(--length-gap) 0;\n}\n\n/* pre */\npre {\n    display: table;\n    width: 100%;\n    box-sizing: border-box;\n    margin: var(--length-gap) 0;\n    font-size: var(--length-font-span);\n    padding: var(--length-padding);\n    border-radius: var(--length-padding);\n    background-color: var(--color-pre);\n}\n\n/* table */\ntable {\n    border-collapse: collapse;\n    color: inherit;\n    font: inherit;\n}\n\ntd,\nth {\n    padding: var(--length-gap);\n    border: 1px solid var(--color-border);\n}\n\nth {\n    font-weight: normal;\n    text-align: center;\n}\n\ntr:nth-child(even) {\n    background-color: var(--color-pre);\n}\n\ntable>caption {\n    margin: var(--length-space) 0;\n}/* checkbox */\n.checkbox {\n    display: inline-block;\n    min-width: 1em;\n    color: var(--color-light);\n    cursor: pointer;\n    padding: var(--length-padding-span);\n    border-radius: var(--length-padding-span);\n    line-height: 1;\n    text-align: center;\n}\n\n.checkbox.left {\n    text-align: left;\n}\n\n.checkbox.checked {\n    color: var(--color-variable);\n}\n\n.checkbox:hover,\n.checkbox.checking {\n    background-color: var(--color-slice);\n}\n\n.button.show-icon:not(:empty)::before,\n.checkbox.show-icon:not(:empty)::before,\n.button.show-icon.show-name::before,\n.checkbox.show-icon.show-name::before {\n    padding-right: var(--length-space);\n}\n\n.button[data-name].show-name::after,\n.checkbox[data-name].show-name::after {\n    content: attr(data-name);\n    text-transform: capitalize;\n}\n\n/* form */\n.form>:not(:first-child) {\n    margin-top: var(--length-gap);\n}\n\n.form,\n.form-line {\n    display: flex;\n    flex-direction: column;\n}\n\n.form>*,\n.form-line>* {\n    flex-shrink: 0;\n}\n\n.form-line[data-name]::before {\n    display: block;\n    content: attr(data-name);\n    color: var(--color-light);\n    font-size: var(--length-font-log);\n    text-transform: capitalize;\n}\n\n/* number bar */\n.number-bar {\n    display: flex;\n    align-items: center;\n    gap: var(--length-space);\n}\n\n.number-bar>.track {\n    flex-grow: 1;\n}\n\n.number-bar>.track>.bar {\n    height: 2px;\n    margin: .5em 0;\n    border-radius: 1px;\n}\n\n.number-bar>.value {\n    color: var(--color-light);\n    font-size: var(--length-font-log);\n}\n\n.number-bar[data-name]:before {\n    content: attr(data-name);\n    color: var(--color-light);\n    font-size: var(--length-font-log);\n    text-transform: capitalize;\n}\n\n/* hide */\n.hide {\n    display: none !important;\n}'+e,document.body.append(this.styleEle),document.body.append(this.element)}}window.player=new class extends i{constructor(){super("Player","",'@font-face{font-family:"pause";src:url("data:font/woff;base64,d09GRgABAAAAAARsAAsAAAAABCAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxEMa2NtYXAAAAFoAAAAVAAAAFQAFAEJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAGQAAABkVKOalmhlYWQAAAIoAAAANgAAADYcY9a8aGhlYQAAAmAAAAAkAAAAJAbCA8ZobXR4AAAChAAAABQAAAAUCgABAGxvY2EAAAKYAAAADAAAAAwAKABGbWF4cAAAAqQAAAAgAAAAIAAIAApuYW1lAAACxAAAAYYAAAGGmUoJ+3Bvc3QAAARMAAAAIAAAACAAAwAAAAMDAAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAQAAAAEEDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIABB//3//wAAAAAAIABB//3//wAB/+P/wwADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgEAAIEDAALVAAMABwAAATMRIyERMxECVqqq/qqqAtX9rAJU/awAAAEAAAABAADpXwR5Xw889QALBAAAAAAA3SLJdQAAAADdIsl1AAAAAAMAAtUAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAAwAAAQAAAAAAAAAAAAAAAAAAAAUEAAAAAAAAAAAAAAACAAAABAABAAAAAAAACgAUAB4AMgABAAAABQAIAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==")}.show-icon.pause::before{font-family:"pause";content:"A"}@font-face{font-family:"play";src:url("data:font/woff;base64,d09GRgABAAAAAARgAAsAAAAABBQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxEMa2NtYXAAAAFoAAAAVAAAAFQAFAEJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAFgAAABYBLO2tGhlYWQAAAIcAAAANgAAADYcjdimaGhlYQAAAlQAAAAkAAAAJAbsA8ZobXR4AAACeAAAABQAAAAUCgABVmxvY2EAAAKMAAAADAAAAAwAKABAbWF4cAAAApgAAAAgAAAAIAAHAAVuYW1lAAACuAAAAYYAAAGGmUoJ+3Bvc3QAAARAAAAAIAAAACAAAwAAAAMDAAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAQAAAAEEDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIABB//3//wAAAAAAIABB//3//wAB/+P/wwADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQFWAIEDKgLVAAIAAAkCAVYB1P4sAtX+1v7WAAEAAAABAACImMgzXw889QALBAAAAAAA3SLKagAAAADdIspqAAAAAAMqAtUAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAAyoAAQAAAAAAAAAAAAAAAAAAAAUEAAAAAAAAAAAAAAACAAAABAABVgAAAAAACgAUAB4ALAABAAAABQADAAEAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==")}.show-icon.play::before{font-family:"play";content:"A"}.player{\n    position: relative;\n}\n.player>video{\n    display: block;\n    width: 100%;\n    max-height: 100vh;\n}\n.player>.tool-bar{\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: linear-gradient(to top, var(--color-bg), 75%, transparent);\n    padding: var(--length-gap);\n}\n.player>.tool-bar>div{\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: var(--length-gap);\n}\n.player>.tool-bar>div>.number-bar{\n    flex-grow: 1;\n}\n.player>.tool-bar>div>.number-bar.time:before {\n    display: none;\n}',["player"]),this.videoEle=document.createElement("video"),this.toolBar=new n(["tool bar"]),this.bars={time:new r("time",0),speed:new o("speed",.2,1,5,!0),brightness:new o("brightness",.1,1,10,!0)},this.checkboxes={play:new t("play")},this.append(this.videoEle).append(this.toolBar.append((new n).append(this.checkboxes.play).append(this.bars.time)).append((new n).append(this.bars.speed).append(this.bars.brightness)));const A=new URLSearchParams(document.location.search),e=A.get("src")??document.documentElement.dataset.src??"";""!==e&&(this.videoEle.src=e);const i=Number(A.get("t")??document.documentElement.dataset.t??"");i>0&&(this.videoEle.currentTime=i),this.bars.time.inputListeners.push((async A=>{this.videoEle.currentTime=A})),this.bars.speed.inputListeners.push((async A=>{this.videoEle.playbackRate=A})),this.bars.brightness.inputListeners.push((async A=>{this.videoEle.style.filter=`brightness(${A})`})),this.checkboxes.play.addEventListener("click",(async()=>{this.checkboxes.play.classList.contains("checking")||(this.checkboxes.play.classList.add("checking"),this.checkboxes.play.classList.contains("play")?await this.videoEle.play():this.videoEle.pause(),this.checkboxes.play.classList.remove("checking"))})),this.videoEle.addEventListener("loadedmetadata",(()=>{this.bars.time.setMax(this.videoEle.duration)})),this.videoEle.addEventListener("play",(()=>{this.checkboxes.play.classList.remove("play"),this.checkboxes.play.classList.add("pause")})),this.videoEle.addEventListener("pause",(()=>{this.checkboxes.play.classList.add("play"),this.checkboxes.play.classList.remove("pause")})),this.videoEle.addEventListener("ended",(()=>{this.checkboxes.play.classList.add("play"),this.checkboxes.play.classList.remove("pause")})),this.videoEle.addEventListener("timeupdate",(()=>{this.bars.time.setValue(this.videoEle.currentTime)})),this.videoEle.addEventListener("ratechange",(()=>{this.bars.speed.setValue(this.videoEle.playbackRate)})),this.videoEle.addEventListener("click",(()=>{this.toolBar.classList.toggle("hide")})),addEventListener("keydown",(A=>{" "!==A.key?"ArrowLeft"!==A.key?"ArrowRight"!==A.key?"["!==A.key?"]"!==A.key||(this.videoEle.playbackRate=Math.min(5,this.videoEle.playbackRate+.1)):this.videoEle.playbackRate=Math.max(.2,this.videoEle.playbackRate-.1):this.videoEle.currentTime+=10:this.videoEle.currentTime-=10:this.checkboxes.play.element.click()}))}}})();