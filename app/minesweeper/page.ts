/// <reference path="../../node_modules/jquery/dist/jquery.min.js" />
/// <reference path="../../node_modules/backbone/node_modules/underscore/underscore-min.js" />

class Cells {

	constructor(args:any) {
		console.log(args);
	}
}
class Cell extends Cells{
	private isOpened: boolean = false
	private isMine: boolean = false
	private neighbourMines: number = 0
	constructor(args:any, n:number) {
		super(args);
		this.neighbourMines = n;
		if(n===9) {
			this.isMine = true;
		}
		console.log(this.isOpened);
	}
	open(r:number, c:number){
		return (this.isMine)? this.fire(): this.showCell(r,c);
	}
	fire(){
		this.showCell(-1,-1);
	}
	showCell(r:number,c:number){
		console.log(r,c);
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
	private row: number;
	private col: number;
	private bombs: number;
	private _map: number[][];
	private cells: any;
	constructor(){
		this.gameInit();

		_.each(document.getElementsByTagName('button'), (v)=>{
			let _domName = v.name;
			let name:any = _domName.split('_');
			name[0] = parseInt(name[0],10) -1;
			name[1] = parseInt(name[1],10) -1;
			v.innerHTML = (this._map[name[0]][name[1]]!==9)? ""+this._map[name[0]][name[1]]: '&#'+parseInt('1f4a3',16);
		});

		$('button').on('click', (ev: any)=>{
			console.log((ev.target.name));
		});
	}
	/**
	 * Set bomb spot
	 * @param {number} row   [description]
	 * @param {number} col   [description]
	 * @param {number} bombs Number of bomb
	 */
	setBombs(row: number, col: number, bombs: number): void{
		let i = 0;
		do {
			let r = _.random(0,row-1);
			let c = _.random(0,col-1);
			if(this._map[r][c]!==9) {
				this._map[r][c] = 9;
				this.setGuideNumber(r,c);
				i++;
			}
		} while (i < bombs);
	}
	setGuideNumber(r:number, c:number): void{
		const area: number[][] = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
		for(let i=0; i<8; i++){
			const _r = r+area[i][0];
			const _c = c+area[i][1];
			if(0 <= _r && _r < this.row && 0 <= _c && _c < this.col) {
				this._map[_r][_c] += (this._map[_r][_c]===9)? 0:1;
			}
		}
	}
	arrayInit(row: number, col: number): number[][]{
		let array = new Array(row);
		for(let i = 0; i < row; i++){
			let c: number[] = new Array(col);
			for(let j=0;j<col;j++){
				c[j] = 0;
			}
			array[i] = c;
		}
		return array;
	}
	gameInit(): void{
		this.row = $('#Table tr').length;
		this.col = $('#Table tr td').length / this.row;
		this.bombs = Math.floor(this.row*this.col*2/9);
		this._map = this.arrayInit(this.row,this.col);
		this.setBombs(this.row, this.col, this.bombs);
		this.cells = new Cells({
			'row': this.row,
			'col': this.col,
			'bom': this.bombs
		});

	}
	public get map(){
		return this._map;
	}
}

function ready(fn: any) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
