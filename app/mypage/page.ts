/// <reference path="../../typings/index.d.ts" />

class MyPageModel extends Backbone.Model {
	validate(attr, opt){

	}
	constructor(args) {
		super(args);
		this.urlRoot = "users";
	}
}
class MyPage extends Backbone.View<MyPageModel> {

	constructor(args) {
		super(args);
		console.log('mypage');
		let a = new MyPageModel({"id":"1234"});
		console.log(a.url());
	}
}
