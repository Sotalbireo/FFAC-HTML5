class Router extends Backbone.Router {
	constructor(props:any) {
		super(props)
		this.routes = {
			"":       this.index,
			"item":   this.itemView,
			"*splat": "test"
		}
	}
	test = (_i:any) => {
		console.log('test',_i)
	}
	index = () => {
		console.log('index')
	}
	itemView(){
		console.log('itemView')
	}
}
document.addEventListener('DOMContentLoaded', ()=>{
	const router = new Router({})
	router
	Backbone.history.start({ pushState:false})
})
