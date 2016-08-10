/// <reference path="typings/index.d.ts" />
class HeaderView extends Backbone.View<Backbone.Model> {

	constructor(args) {
		super(args);
		this.el = $('body');
		// this.t
	}
}
class FooterView extends Backbone.View<Backbone.Model> {

	constructor(args) {
		super(args);
		this.el = $('body');
		// this.t
	}
}

class MainModel extends Backbone.Model {

	constructor(args) {
		super(args);

	}
}
class MainView extends Backbone.View<MainModel> {
	constructor(args) {
		super(args);
		this.el = document.body;

	}
	render(){
		new HeaderView({});
		new FooterView({});
		return this;
	}
}

function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
