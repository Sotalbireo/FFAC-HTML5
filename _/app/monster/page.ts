/// <reference path="../../node_modules/jquery/dist/jquery.min.js" />
/// <reference path="../../node_modules/underscore/underscore-min.js" />
/// <reference path="../../node_modules/backbone/backbone-min.js" />

class MonsterHunt {
	turn: number;
	Buttle(player1:any, player2:any){
		let isContinues: boolean = true;
		for(this.turn=1;isContinues;this.turn++){
			isContinues = isOdd(this.turn)? this.phasing(player1): this.phasing(player2);
		}
	}
	phasing(player:any){
		player=player;
		return true;
	}
	constructor() {
		// code...
	}
}

class CharactorMovingObj {
	private _name: string;
	private _maxHp: number;
	private _hp: number;
	private _exp: number;
	private _lv: number;
	constructor(arg:any){
		this._name = arg.name || '';
		this._maxHp= arg.hp   || 0;
		this._hp   = arg.hp   || 0;
		this._exp  = arg.exp  || 0;
		this._lv   = arg.lv   || 1;
	}
	attack(attr:number){
		let damage :number= this._lv + _.random(-5,6);
			damage = (damage > 0)? damage: this._lv;
		console.log('lv',this._lv,'damage',damage);
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
				console.dir(attributes);
				break;

			default:
				// code...
				break;
		}
	}
}
class Player extends CharactorMovingObj{
	private job: string;
	constructor(arg:any){
		super(arg);
		this.job='';
		// this.attack = super.attack;
	}
	getPlayerData(Id:string){
		console.log(Id);
	}
}
class Monster extends CharactorMovingObj{
	constructor(arg:any){
		super(arg);
	}
	static getMonsterData(Id:number){
		console.log(Id);
	}
}

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
		const a = new Player({});
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

const	isEven = (n:number) => (n%2)===0,
		isOdd  = (n:number) => (n%2)===1,
		uuid   = ()         => {
			let uuid = "", random:string|number;
			for (let i=0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i == 8 || i == 12 || i == 16 || i == 20) {
					uuid += "-";
				}
				uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
			}
			return uuid;
		},
		ready  = (fn:  any) => {
			if (document.readyState != 'loading'){
				fn();
			} else {
				document.addEventListener('DOMContentLoaded', fn);
			}
		}
