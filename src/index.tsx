document.addEventListener('DOMContentLoaded', ()=>{
	const router = new Navigo(null, true)
	router.on({
		'item': function() {console.log('item')},
		'': function() {
			console.log('home')
		}
	}).resolve()
})
