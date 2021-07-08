class CommonEle<K extends keyof HTMLElementTagNameMap>{
    readonly element:HTMLElementTagNameMap[K]
    readonly classList:DOMTokenList
    readonly style:CSSStyleDeclaration
    readonly dataset:DOMStringMap
    constructor(classes:string[]=[],tag:K){
        this.element=document.createElement(tag)
        this.classList=this.element.classList
        this.style=this.element.style
        this.dataset=this.element.dataset
        for(let i=0;i<classes.length;i++){
            const className=classes[i].replace(/\s/g,'-')
            if(className==='')continue
            try{
                this.element.classList.add(className)
            }catch(err){
                console.log(err)
            }
        }
    }
    append(...nodes: (string | Node | CommonEle<keyof HTMLElementTagNameMap>)[]){
        this.element.append(...nodes.map(val=>{
            if(val instanceof CommonEle)return val.element
            return val
        }))
        return this
    }
    prepend(...nodes: (string | Node | CommonEle<keyof HTMLElementTagNameMap>)[]){
        this.element.prepend(...nodes.map(val=>{
            if(val instanceof CommonEle)return val.element
            return val
        }))
        return this
    }
    after(...nodes: (string | Node | CommonEle<keyof HTMLElementTagNameMap>)[]){
        this.element.after(...nodes.map(val=>{
            if(val instanceof CommonEle)return val.element
            return val
        }))
        return this
    }
    before(...nodes: (string | Node | CommonEle<keyof HTMLElementTagNameMap>)[]){
        this.element.before(...nodes.map(val=>{
            if(val instanceof CommonEle)return val.element
            return val
        }))
        return this
    }
    setText(string:string){
        this.element.textContent=string
        return this
    }
    setHTML(string:string){
        this.element.innerHTML=string
        return this
    }
    scrollBy(options:ScrollToOptions){
        this.element.scrollBy(options)
        return this
    }
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions){
        this.element.scrollIntoView(arg)
        return this
    }
    getBoundingClientRect(){
        return this.element.getBoundingClientRect()
    }
    getClientRects(){
        return this.element.getClientRects()
    }
}
export class Div extends CommonEle<'div'>{
    constructor(classes:string[]=[]){
        super(classes,'div')
    }
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions){
        this.element.addEventListener(type,listener,options)
        return this
    }
}
export class NamedDiv extends Div{
    constructor(public readonly name:string,public readonly type:string,otherClasses:string[]=[]){
        super([name,type].concat(otherClasses))
        try{
            this.element.dataset.name=name
        }catch(err){
            console.log(err)
        }
    }
}
export class Checkbox extends NamedDiv{
    constructor(name:string,otherClasses:string[]=[]){
        super(name,'checkbox',otherClasses)
        this.element.classList.add('icomoon')
    }
}
export class Button extends NamedDiv{
    constructor(name:string,otherClasses:string[]=[]){
        super(name,'button',otherClasses)
        this.element.classList.add('icomoon')
    }
}
export class FormLine extends NamedDiv{
    constructor(name:string,otherClasses:string[]=[]){
        super(name,'form-line',otherClasses)
    }
}
export class Form extends NamedDiv{
    constructor(name:string,otherClasses:string[]=[]){
        super(name,'form',otherClasses)
    }
}
export class Anchor extends CommonEle<'a'>{
    constructor(href:string,classes:string[]=[],target='_blank'){
        super(classes,'a')
        try{
            this.element.href=href
            this.element.target=target
        }catch(err){
            console.log(err)
        }
    }
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions){
        this.element.addEventListener(type,listener,options)
        return this
    }
}
export class NamedAnchor extends Anchor{
    constructor(href:string,public readonly name:string,public readonly type:string,otherClasses:string[]=[],target='_blank'){
        super(href,[name,type].concat(otherClasses),target)
        try{
            this.element.dataset.name=name
        }catch(err){
            console.log(err)
        }
    }
}
export class NumberBar extends NamedDiv{
    readonly valEle=new Div(['value'])
    readonly track=new Div(['track'])
    readonly bar=new Div(['bar'])
    readonly activePart=new Div(['active'])
    constructor(
        name:string,
        protected min:number,
        protected value:number,
        protected max:number,
        protected log=false,
        protected fractionDigits=1,
        otherClasses:string[]=[]
    ){
        super(name,'number bar',otherClasses)
        if(log){
            this.min=Math.log(min)
            this.value=Math.log(value)
            this.max=Math.log(max)
        }
        this
        .append(
            this.track.append(
                this.bar.append(this.activePart)
            )
        )
        .append(this.valEle)
        
        this.track.addEventListener('click',async e=>{
            const rate=e.offsetX/this.track.element.offsetWidth
            this.value=this.min+(this.max-this.min)*rate
            this.renderBar()
            await this.handleInput(this.log?Math.exp(this.value):this.value)
        })
        this.renderBar()
    }
    setValue(value:number){
        if(this.log){
            value=Math.log(value)
        }
        if(value<this.min||!isFinite(value)){
            value=this.min
        }else if(value>this.max){
            value=this.max
        }
        this.value=value
        this.renderBar()
    }
    protected renderBar(){
        this.activePart.style.width=this.getRate()*100+'%'
        this.valEle.setText((this.log?Math.exp(this.value):this.value).toFixed(this.fractionDigits))
    }
    getRate(){
        if(this.max<=this.min){
            return 0
        }
        return (this.value-this.min)/(this.max-this.min)
    }
    async handleInput(value:number){

    }
}
export class TimeBar extends NumberBar{
    constructor(name:string,duration=0,otherClasses:string[]=[]){
        super(name,0,0,duration,false,1,otherClasses)
    }
    protected renderBar(){
        this.activePart.style.width=this.getRate()*100+'%'
        this.valEle.setText(TimeBar.prettyTime(this.value)+'/'+TimeBar.prettyTime(this.max))
    }
    setDuration(duration:number){
        if(duration<this.value||!isFinite(duration)){
            duration=this.value
        }
        this.max=duration
        this.renderBar()
    }
    static prettyTime(time:number){
        const m=Math.floor((time%3600)/60).toString().padStart(2,'0')
        const s=Math.floor(time%60).toString().padStart(2,'0')
        const string=m+':'+s
        if(time<=3600){
            return string
        }
        return Math.floor(time/3600).toString()+':'+string
    }
}
