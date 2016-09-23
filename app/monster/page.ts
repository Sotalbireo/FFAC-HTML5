/// <reference path="../../node_modules/jquery/dist/jquery.min.js" />
/// <reference path="../../node_modules/underscore/underscore-min.js" />
/// <reference path="../../node_modules/backbone/backbone-min.js" />

class MonsterHunt {
	turn: number;
	static Buttle(player1, player2){

		for(this.turn=1,isContinues:boolean=true;isContinues;this.turn++){
			isContinues = isOdd(this.turn)? this.phasing(player1): this.phasing(player2);
		}
	}
	phasing(player){

	}
	constructor() {
		// code...
	}
}

class CharactorMovingObj {
	private maxHP: number;
	private HP: number;
	private EXP: number;
	private Level: number;
	constructor(){
		this.maxHP=0;
		this.HP=0;
		this.EXP=0;
		this.Level=1;
	}
	attack(attr:number){
		let damage :number= this.Level + _.random(-5,6);
			damage = (damage > 0)? damage: this.Level;
		console.log('level',this.Level,'damage',damage);
		const isCritical = ()=>{
			if(true){
				// damage*=1.5;
				damage*=1;
				return true;
			}
			// }else{return false;}
		};
		const isExAttack = ()=>{
			if(true){
				// damage*=2;
				damage*=1;
				return true;
			}
			// }else{return false;}
		};
		damage += attr;
		return [isCritical(), isExAttack(), Math.floor(damage)];
	}
	incurred(){

	}
	death(){

	}
	attack_pre(job:string, attributes:number[]){
		switch (job) {
			case "value":
				// code...
				break;

			default:
				// code...
				break;
		}
	}
}
class Player extends MovingObj{
	private job: string;
	constructor(){
		super();
		this.job='';
		// this.attack = super.attack;
	}
}
// class Monster extends Charactor{
// 	constructor(args:any){
// 		super(args);
// 	}
// }

class UserData extends Backbone.Model {
	validate(attr:any, opt:any){

		console.log(attr,opt);
	}
	constructor(args:any) {
		super(args);
		// this.urlRoot = "../data/users";
	}
}
class MyPage extends Backbone.View<UserData> {

	constructor(args:any) {
		super(args);
		const a = new Player();
		console.log(a.attack(0));
		// console.log('mypage');
		// const hash :string = window.location.hash.substr(1) || '';
		// let a = new UserData({"id": hash});
		// a.fetch({
		// 	success: (model,resp,opts)=>{
		// 		model=''; opts='';
		// 		console.dir(resp);
		// 	}
		// });
		//
	}
}

function isEven = n => (n%2)===0;
function isOdd  = n => (n%2)===1;
function ready(fn: any) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
