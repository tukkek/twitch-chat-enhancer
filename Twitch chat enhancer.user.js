// ==UserScript==
// @name         Twitch chat enhancer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Unmess Twitch chat
// @author       Alex Henry
// @match        https://www.twitch.tv/popout/*/chat?popout=
// @grant        none
// ==/UserScript==
const SECOND=1000
const BACKLOG=1000
const REFRESH=30*SECOND
const MESSAGES=7
const OLD=60*SECOND

var chat=false
var messages=[]
var scores={} //session vote score by twitch username

function isold(message){return Date.now()-message.arrived>=OLD}

let watcher=new MutationObserver((mutationsList,observer)=>{
    let incoming=Array.from(chat.childNodes)
        .filter(m=>!m.read&&m.querySelector('.chat-line__username'))
    for(let message of incoming){
        messages.push(message)
        message.style.display='none'
        message.read=true
        message.arrived=Date.now()
    }
    if(messages.length>BACKLOG) messages.splice(0,messages.length-BACKLOG)
})
let bootstrap=setInterval(()=>{
    let container=document.querySelector('.chat-list__list-container')
    if(!container) return
    chat=container
    watcher.observe(chat,{childList:true,subtree:true})
    clearInterval(bootstrap)
},1000)

function createbutton(label,action){
    let b=document.createElement('button')
    b.innerHTML=label
    b.style['font-size']='large'
    b.style['margin-left']='1em'
    b.style['font-size']='small'
    b.addEventListener('click',action)
    return b
}

function getuser(message){return message.querySelector('.chat-line__username').textContent}

function vote(message,increment){
    let u=getuser(message)
    if(scores[u]) scores[u]+=increment
    else scores[u]=increment
    message.hide=true
    for(let b of Array.from(message.querySelectorAll('button'))) b.remove()
}

function getscore(message){return scores[getuser(message)]||0}

function add(){
    messages.sort((a,b)=>getscore(a)-getscore(b)) //TODO ideally would then sort equals by arrival date
    let m=messages.splice(messages.length-1,1)[0]
    console.log(getscore(m))
    m.appendChild(document.createElement('br'))
    m.appendChild(createbutton('👍',()=>vote(m,+1)))
    m.appendChild(createbutton('👎',()=>vote(m,-1)))
    m.show=true
    m.style.display=''
}

function update(){
    let current=Array.from(chat.childNodes)
    for(let c of current.filter(c=>c.hide||isold(c))){
        c.style.display='none'
        c.show=false
    }
    messages=messages.filter(m=>!isold(m))
    while(current.filter(m=>m.show).length<MESSAGES){
        if(messages.length==0) return
        add()
    }
}
setInterval(update,REFRESH)
