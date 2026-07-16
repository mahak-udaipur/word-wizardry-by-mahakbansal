const D=window.DATA,$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const loader=$("#loader"),loadText=$("#loadText");
const loads=["Opening tab 38…","Searching for the perfect word…","Consulting the imaginary creative department…"];
let lx=0;
let lt=setInterval(()=>{ if(loadText) loadText.textContent=loads[++lx%loads.length] },450);
function dismissLoader(){
  clearInterval(lt);
  if(!loader) return;
  loader.style.opacity="0";
  loader.style.pointerEvents="none";
  setTimeout(()=>loader.remove(),650);
}
if(document.readyState==="complete" || document.readyState==="interactive"){
  setTimeout(dismissLoader,900);
}else{
  window.addEventListener("DOMContentLoaded",()=>setTimeout(dismissLoader,900),{once:true});
  window.addEventListener("load",()=>setTimeout(dismissLoader,900),{once:true});
}
setTimeout(dismissLoader,3500);
let mouse={x:0,y:0};document.addEventListener("mousemove",e=>{mouse={x:e.clientX,y:e.clientY};$("#cursor").style.left=mouse.x+"px";$("#cursor").style.top=mouse.y+"px";$("#cursorDot").style.left=mouse.x+"px";$("#cursorDot").style.top=mouse.y+"px"});
$$("a,button,.project").forEach(el=>{el.addEventListener("mouseenter",()=>{$("#cursor").style.width="55px";$("#cursor").style.height="55px"});el.addEventListener("mouseleave",()=>{$("#cursor").style.width="34px";$("#cursor").style.height="34px"})});
const intro=$("#intro"),typed=$("#typed"),actions=$("#introActions"),lines=["Oh. You’re here.","Well, since you’ve already entered my brain…","Mind the open tabs."];let l=0,c=0;function type(){if(l===lines.length){actions.classList.add("show");return}if(c<lines[l].length){typed.innerHTML+=lines[l][c++];setTimeout(type,36)}else{typed.innerHTML+="<br>";l++;c=0;setTimeout(type,550)}}setTimeout(type,1300);
$$(".enter").forEach(b=>b.onclick=()=>intro.classList.add("out"));$$(".recruiter").forEach(b=>b.onclick=()=>{intro.classList.add("out");const rv=$("#recruiterView");rv.classList.add("open");rv.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";rv.scrollTop=0});
$(".mapBtn").onclick=()=>$(".navlinks").classList.toggle("open");$$(".navlinks a").forEach(a=>a.onclick=()=>$(".navlinks").classList.remove("open"));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});$$(".reveal").forEach(e=>obs.observe(e));
function project(x,i,type){return `<article class="project reveal" style="--accent:${["#7857ff","#f065a8","#7cd7c2","#f3cc65"][i%4]}"><div class="top"><span>${String(i+1).padStart(2,"0")} / ${type}</span><span>✦</span></div><h3>${x.title}</h3><p>${x.desc}</p><a class="original-link" href="${x.url}" target="_blank" rel="noopener">${type==="LINKEDIN"?"VIEW ON LINKEDIN":"VIEW ON INSTAGRAM"} ↗</a><span class="arrow">↗</span></article>`}


$("#archiveCount").textContent=`${D.blogs.length} PIECES IN THE ARCHIVE`;
$("#blogSearch").oninput=e=>{const q=e.target.value.toLowerCase();$$("#blogGrid .blog-card").forEach(card=>card.style.display=card.textContent.toLowerCase().includes(q)?"":"none")};
const thoughts=["Have you tried staring at the blank document harder?","Plot twist: the first headline was better.","Opening tab 39… this one has the answer.","Try adding ✨ strategic caffeine ✨.","The perfect word is hiding behind Ctrl+Z.","Consulting the imaginary creative department…"];$("#emergency").onclick=()=>{let t=$("#toast");t.textContent=thoughts[Math.floor(Math.random()*thoughts.length)];t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3200)};
$(".coffee").onclick=()=>{$$(".hero-object").forEach((e,i)=>{e.animate([{transform:getComputedStyle(e).transform},{transform:`translateY(-${20+i*7}px) rotate(${i%2?8:-8}deg)`},{transform:getComputedStyle(e).transform}],{duration:700+i*100})})};
document.addEventListener("mousemove",e=>{if(innerWidth<800)return;let x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);$$(".hero-object").forEach((el,i)=>el.style.translate=`${x*(10+i*3)}px ${y*(8+i*2)}px`)});

function recruiterCard(x,label){return `<a class="recruiter-card" href="${x.url}" target="_blank" rel="noopener"><small>${label}</small><h4>${x.title}</h4><p>${x.desc}</p><b>OPEN ORIGINAL ↗</b></a>`}
$("#recruiterLinkedin").innerHTML=D.linkedin.map(x=>recruiterCard(x,"LINKEDIN")).join("");
$("#recruiterInstagram").innerHTML=D.instagram.map(x=>recruiterCard(x,"INSTAGRAM")).join("");
$("#recruiterBlogs").innerHTML=D.blogs.map(x=>recruiterCard(x,"BLOG")).join("");
$("#recruiterBooks").innerHTML=D.books.map(x=>recruiterCard(x,"BOOK")).join("");
$("#closeRecruiter").onclick=()=>{const rv=$("#recruiterView");rv.classList.remove("open");rv.setAttribute("aria-hidden","true");document.body.style.overflow=""};
