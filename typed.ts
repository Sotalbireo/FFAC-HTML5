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
		this.url = '/data';

	}
}

class MainView extends Backbone.View<Backbone.Model> {
		tpl;

	constructor(argument) {
		super(argument);
		this.el = $('#a');
		this.tpl = _.template($('#b').html());

		this.render();
	}
	render(){
		let wrapr = document.createElement('p')
		wrapr.innerHTML += this.tpl({'name': 'john'});

		this.el.append(wrapr);
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

ready(()=>{
	new MainView({});
});
