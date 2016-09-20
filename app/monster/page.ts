/// <reference path="../../node_modules/jquery/dist/jquery.min.js" />
/// <reference path="../../node_modules/underscore/underscore-min.js" />
/// <reference path="../../node_modules/backbone/backbone-min.js" />

class Charactor {
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
			damage = (damage < 1)? this.Level: damage;
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
}
class Player extends Charactor{
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


function ready(fn: any) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
