/// <reference path="typings/index.d.ts" />

class ItemModel extends Backbone.Model {
	validate(attrs, opts){
		if(!_.isNumber(attrs.atk)){
			return "Items ATK point is not Number.";
		}
		if(!_.isNumber(attrs.cost)){
			return "Items Cost is not Number.";
		}
	}
	constructor(argument) {
		super(argument);
	}
}
class ItemCollections extends Backbone.Collection<ItemModel> {
	constructor(argument) {
		super(argument);
		this.model = ItemModel;
		this.url = 'app/data/item.json';
	}
}

class ItemView extends Backbone.View<Backbone.Model> {
	template;

	constructor(argument) {
		super(argument);
		this.el = $('#c1 tbody');
		this.template = _.template($('#c2').html());
		this.model = new ItemModel({});
		this.collection = new ItemCollections({});
		this.collection.fetch();

		this.listenTo(this.collection, 'sync', this.perse);
	}
	perse(){
		this.collection.each((ele, i)=>{
			if(!this.model.isValid()){
				this.collection.remove(ele, {silent:true});
			}
		});
		this.render();
	}
	render(){


		this.collection.each((model)=>{
			this.el.append(this.template(model.toJSON()));
		});

		return this;
	}
}

class Router extends Backbone.Router {
	constructor(argument) {
		super(argument);
		this.routes = {
			""      : "index",
			"#item" : "itemView"
		};
	}
	initialize(){
		_.bindAll(this);
	}
	index(){
		console.log('index');
		new ItemView({});
	}
	itemView(){
		console.log('itemView');
	}
}























function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(()=>{
	new Router({});
	console.log(Backbone.history.start({pushState:false,root:""}));
});
