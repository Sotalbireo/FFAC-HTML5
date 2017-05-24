class Router extends Navigo {
	routes = {
		'items/:id': this.items,
		'items/': this.hoge,
		'/':     this.fuga
	}
	constructor(root?: string|null|undefined, useHash?:boolean|undefined) {
		super(root, useHash)
		this.on(this.routes)
		this.set404()
		this.resolve()
	}
	hoge() {
		console.log('hoge')
	}
	fuga() {
		console.log('fuga')
	}
	items(id:string) {
		console.log('items', id)
	}
	set404() {
		this.notFound(function(query){
			console.error(`Page not found: { param : "${query}" }`)
		})
	}
	updatePageLinks() {
		let links = document.querySelectorAll('a[data-navigo]')
		Array.prototype.forEach.call(links, (link:HTMLAnchorElement)=>{
			let location = link.getAttribute('href') || ''
			link.addEventListener('click', (e)=>this.pageFlow(e, location))
		})
	}
	private pageFlow(e:MouseEvent, location:string) {
		e.preventDefault()
		this.navigate(location)
	}
}


document.addEventListener('DOMContentLoaded', ()=>{
	const router = new Router(null, true)
	router.on(router.routes).resolve()
})
