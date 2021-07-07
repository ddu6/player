import flvjs from 'flv.js'
import DPlayer from 'dplayer'
import { Div } from './common'
import * as css from '../../lib/css'
export class Player{
    readonly element=new Div(['player'])
    readonly styleEle=document.createElement('style')
    readonly dp?:DPlayer
    constructor(public parent:HTMLElement){
        this.styleEle.textContent=css.main
        parent.append(this.styleEle)
        parent.append(this.element.element)
        const params = new URLSearchParams(document.location.search)
        const src=params.get('src')??document.body.dataset.src??''
        if(src===''){
            return
        }
        const type=src.endsWith('.flv')?'customFLV':'auto'
        const time=Number(params.get('t')??document.body.dataset.t??'')
        this.dp = new DPlayer({
            container: this.element.element,
            playbackSpeed:[0.5, 0.75, 1, 1.25, 1.5, 2,3,4,5],
            video:{
                url: src,
                type:type,
                customType: {
                    customFLV: function (video:HTMLVideoElement) {
                        const flvPlayer = flvjs.createPlayer({
                            type: 'flv',
                            url: video.src,
                        })
                        flvPlayer.attachMediaElement(video)
                        flvPlayer.load()
                    },
                }
            }
        })
        if(time>0){
            this.dp.seek(time)
        }
    }
}