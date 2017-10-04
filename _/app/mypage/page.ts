/// <reference path="../../node_modules/jquery/dist/jquery.min.js" />
/// <reference path="../../node_modules/underscore/underscore-min.js" />
/// <reference path="../../node_modules/backbone/backbone-min.js" />

class UserData extends Backbone.Model {
	validate(attr:any, opt:any){
		console.log(attr,opt);
	}
	constructor(args:any) {
		super(args);
		this.urlRoot = "../data/users";
	}
}
class MyPage extends Backbone.View<UserData> {

	constructor(args:any) {
		super(args);
		console.log('mypage');
		const hash :string = window.location.hash.substr(1) || '';
		let a = new UserData({"id": hash});
		a.fetch({
			success: (model,resp,opts)=>{
				model=''; opts='';
				console.dir(resp);
			}
		});
	}
}


function ready(fn: any) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
