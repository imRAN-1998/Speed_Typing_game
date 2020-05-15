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
let i;

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
	word.classList.add('temp-class')
}

function inputForm(){
	isplaying=true;
	if(time===1&&score>0)
	{
		score=-1;
		// totalScore.innerHTML=0;
	}
	if(input.value.toLowerCase()===word.innerHTML && time!==0)
	{
		gameover.style.display='none';
		score++;
		time=6;
		word.innerHTML=words[Math.floor(Math.random()* words.length)];
		word.classList.add('temp-class');
		input.value='';
		isplaying=true;
		totalScore.innerHTML=score;
		f=0;
	}
}

function timeFunc(){
	if(time>1&&isplaying)
	{
		word.classList.remove('temp-class')
		time--;
		timeout.innerHTML=time;
		error.innerHTML='';
	}
	else if(time==1&&isplaying)
	{
		word.classList.remove('temp-class')
		gameover.style.display='block';
		clearInterval(timeFunc);
		isplaying=false;
		if(score!=-1)
		{
			if(localStorage.getItem('scores')===null)
			{
				i=1;
			}
			else{
				console.log('here');
				const temp = JSON.parse(localStorage.getItem('scores'));
				console.log(temp);
				if(!temp.length){
					i=1;
				}
				else{
				i=parseInt(temp[temp.length-1].id)+1;
				}
			}
			const p = new Score(score,i);
			List.addScore(p);
			UI.addData(p);
		}
		if(f==0){
			txt_value=input.value.toLowerCase();
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

class Score{
	constructor(score,id){
		this.score=parseInt(score);
		this.id=id;
	}
}
class List{
	static getScore(){
		let scores;
		if(localStorage.getItem('scores')==null)
		{
			scores = [];
		}
		else{
			scores = JSON.parse(localStorage.getItem('scores'));

		}
		return scores;
	}
	static addScore(score){
		const scores=List.getScore();
		scores.push(score);
		localStorage.setItem('scores',JSON.stringify(scores));
	}
	static removeScore(id1){
		// console.log()
		const scores=List.getScore();
		scores.forEach(function(score,index){
			if(score.id===id1){
				scores.splice(index,1);
			}
		})
		localStorage.setItem('scores',JSON.stringify(scores));
	}
}
let btn_x;
document.querySelector('.table-data').addEventListener('click',function(e){
	if(e.target.classList=='red'){
		btn_x=e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
		e.target.parentElement.parentElement.remove();
		console.log(btn_x);
		List.removeScore(parseInt(btn_x));
	}
	
})

class UI{
	static addData(score1){
		const tbody=document.querySelector('.table-data');
		const tr=document.createElement('tr');
		const td1=document.createElement('td');
		td1.innerText=score1.id;
		const td2=document.createElement('td');
		td2.innerText=score1.score;
		const td3=document.createElement('td');
		td3.innerHTML='<button class="red">x</button>';
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tbody.appendChild(tr);
	}
}
document.addEventListener('DOMContentLoaded',function(){
	const output=List.getScore();
	output.forEach(function(o){
		UI.addData(o);
	})
})



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