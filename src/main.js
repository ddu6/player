import {Player} from './components/pure/player'
document.head.innerHTML=`<meta charset='utf8'>
<meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'>`+document.head.innerHTML
document.body.style.margin="0"
window.player=new Player(document.body)