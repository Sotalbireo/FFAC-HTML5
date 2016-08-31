
class Cell{
	isOpened: boolean = false
	neighbourMines: number = 0
	constructor(arg: any) {
		// code...
	}
	open(){
		this.isOpened = true;

	}
}

class MineCell extends Cell {
	constructor(arg: any){
		super(arg);
	}
	bumb(){
		// MineSweeper.GameOver();
	}
}


// class MineSweeper extends Backbone.View<Backbone.Model>{
// 	template;

// 	constructor(v) {
// 		super(v);
// 		this.el = $('#Main');
// 		this.template = '<td><button class="btn"></button></td>';
// 	}
// 	GameOver(){

// 	}
// }

class MineSweeper {
	constructor(){
		const row = $('#Table tr').length;
		const col = $('#Table tr td').length / row;
		const bombs = Math.floor(row*col*2/9);
		let mapping = this.arrayInit(row,col);
		console.dir(mapping);

		$('button').on('click', (ev)=>{
			console.log((ev.target.name));
		});
	}
	positioning(row: number, col: number, bombs: number): void{

	}
	arrayInit(row: number, col: number): number[]{
		let array = new Array(row);
		for(let i=0;i<row;i++){
			let c: number[] = new Array(col);
			for(let j=0;j<col;j++){
				c[j] = 0;
			}
			array[i] = c;
		}
		return array;
	}
}

function ready(fn: any) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
