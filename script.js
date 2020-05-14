const word=document.getElementById('data-words');
const input=document.getElementById('data');
const timeout=document.getElementById('timeout');
const totalScore=document.getElementById('score');
const gameover=document.querySelector('.over');
const error=document.querySelector('.error');
let score=0;
let time=5;
let isplaying;
let f=0;
let txt_value='';

document.addEventListener('DOMContentLoaded',load);

function load(){
	changeWord();
	input.addEventListener('input',inputForm)
	isplaying=false;
	score=0;
	time=5;
	setInterval(timeFunc,1000);
	setInterval(checking,50)
}
function changeWord(){
	word.innerHTML=words[Math.floor(Math.random()* words.length)];
}

function inputForm(){
	isplaying=true;
	if(time===1&&score>0)
	{
		score=-1;
		// totalScore.innerHTML=0;
	}
	if(input.value===word.innerHTML && time!==0)
	{
		gameover.style.display='none';
		score++;
		time=6;
		word.innerHTML=words[Math.floor(Math.random()* words.length)];
		input.value='';
		totalScore.innerHTML=score;
		f=0;
	}
}

function timeFunc(){
	if(time>1&&isplaying)
	{
		time--;
		timeout.innerHTML=time;
		error.innerHTML='';
	}
	else if(time==1&&isplaying)
	{
		gameover.style.display='block';
		clearInterval(timeFunc);
		isplaying=false;
		if(score!=-1)
		{
			console.log(score);
		}
		if(f==0){
			txt_value=input.value;
		f=1;
		}
		error.innerHTML=`Last entered value is "<span style="color:red">${txt_value}</span>"`;
	}

}
function checking(){
	if(!isplaying && time==1){
		timeout.innerHTML=0;
	}
}


const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'anachronistic',
  'antediluvian',
  'grandiloquent',
  'philanthropic',
  'sanctimonious',
  'vicissitude',
  'obstreperous',
  'vituperate',
  'utilitarian',
  'zephyr',
  'incontrovertible',
  'apocryphal',
];