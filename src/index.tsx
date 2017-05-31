interface Items {
	id   : number,
	meta : string,
	name : string,
	atk  : number,
	cost : number
}
interface itemId {
	itemId: number|null
}
class ItemList extends React.Component<itemId, any> {

	private items: Items[]|null
	private pickedItem: Items|null = null

	constructor(props: itemId) {
		super(props)
		this.items = this.getJson
		if(!!this.props.itemId && !!this.items) this.pickItem(this.props.itemId)

	}
	pickItem(id: number) {
		this.items!.forEach(item => {
			if(item.id === id) this.pickedItem = item
		})
	}
	get getJson():Items[]|null {
		let xhr = new XMLHttpRequest()
		let data : Items[]|null = null
		xhr.open('GET', 'app/data/items.json', false)
		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status < 400) {
				data = JSON.parse(xhr.response)
			} else {
				console.error(xhr.responseText, xhr)
			}
		}
		xhr.onerror = function() {
			console.error(xhr)
		}
		xhr.send()
		return data
	}
	render() {
		return (
			<section className='ui container segment'>
				<h1 className='ui dividing header'>アイテムリスト</h1>
				<table className='ui selectable single line table'>
					<thead>
						<tr>
							<th>名前</th>
							<th>威力</th>
							<th>価格</th>
						</tr>
					</thead>
					<Item items={this.items} />
				</table>
				<ItemDetail item={this.pickedItem}/>
			</section>
		)
	}
}





class Item extends React.Component<any, any> {

	constructor(props:any) {
		super(props)
	}
	render() {
		let items: any[] = []
		for(let i in this.props.items) {
			items.push(<tr key={this.props.items[i].id.toString()}><td>{this.props.items[i].name}</td><td>{this.props.items[i].atk}</td><td>{this.props.items[i].cost}</td></tr>)
		}
		return (
			<tbody>
				{items}
			</tbody>
		)
	}
}



class ItemDetail extends React.Component<any,any> {

	constructor(props:any) {
		super(props)
	}
	render() {
		return (
			<div className = 'ui small modal'>
				<div className='header'>
					{this.props.item ? this.props.item.name : ''}
				</div>
				<div className='content'>
					<table className='ui definition table'>
						<colgroup><col style={{width: '30%'}} /></colgroup>
						<tbody>
							<tr><td>攻撃力</td><td>{this.props.item ? this.props.item.atk : '0'}</td></tr>
							<tr><td>費用</td><td>{this.props.item ? this.props.item.cost : '0'}</td></tr>
						</tbody>
					</table>
				</div>
				<div className='actions'>
					<button className='ui approve button'>買う</button>
					<button className='ui cancel button'>買わない</button>
				</div>
			</div>
		)
	}
}



class Router extends Navigo {
	private routes = {
		'items/:id': this.items,
		'items/':    this.items,
		'/':         this.hoge
	}
	constructor(root?: string|null, useHash?:boolean) {
		super(root, useHash)
		this.on(this.routes)
		this.set404()
		this.updatePageLinks()
	}
	hoge() {
		console.log('hoge')
	}
	items(props?:{id:string|null}) {
		const id = props && props.id
			? !/\D/i.test(props.id!)
			? parseInt(props.id!, 10)
			: null : null
		console.log('items', id)
		ReactDOM.render(<ItemList itemId={id} />, document.getElementById('root'))
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
			link.addEventListener('click', e=>this.pageFlow(e, location))
		})
	}
	private pageFlow(e:MouseEvent, location:string) {
		e.preventDefault()
		this.navigate(location)
	}
}


document.addEventListener('DOMContentLoaded', ()=>{
	const router = new Router(null, true)
	router.resolve()
})
