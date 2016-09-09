/// <reference path="../../node_modules/jquery/dist/jquery.min.js" />
/// <reference path="../../node_modules/underscore/underscore-min.js" />
class Util {
	static ArrayInit(row: number, col: number): number[][]{
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
}

class Cells {
	private col: number
	private row: number
	private flags: number
	private map: any
	constructor(args?:any) {
		args = args || {};
		this.col = args.col || 0;
		this.row = args.row || 0;
		this.flags = 0;
		this.map = Util.ArrayInit(this.row,this.col);
	}
}
class Cell extends Cells{
	private isOpened: boolean
	private isMine: boolean
	private isFlaged: boolean
	private neighbourMines: number
	constructor(args:any) {
		super(args);
		this.neighbourMines = args.n || 0;
		this.isMine = (args.n===9)? true: false;
		this.isFlaged = false;
		this.isOpened = false;
	}
	open(r:number, c:number){
		return (this.isMine)? this.fire(): this.showCell(r,c);
	}
	fire(){
		this.showCell(-1,-1);
	}
	flag(){
		this.isFlaged = !this.flag;
		console.log('flagged');
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
	private mines: number;
	private _map: number[][];
	private cells: any;
	constructor(){
		document.getElementsByTagName('main')[0].addEventListener('contextmenu', (e)=>{
			e.preventDefault();
		});
		this.gameInit();
		this.cells = new Cells({
			row: this.row,
			col: this.col,
			mines: this.mines
		});
		document.getElementsByName('mineNums')[0].innerHTML += this.mines;

		_.each(document.getElementsByTagName('button'), (v)=>{
			let n:any = v.name.split('_');
			n[0] = parseInt(n[0],10) -1;
			n[1] = parseInt(n[1],10) -1;
			this.cells.map[n[0]][n[1]] = new Cell({
				n: this._map[n[0]][n[1]]
			});
			v.innerHTML = (this._map[n[0]][n[1]]!==9)? ''+this._map[n[0]][n[1]]: '&#128163;';
			v.addEventListener('click', ()=>{
				console.log(v.name);
			});
			v.addEventListener('contextmenu', (e)=>{
				e.preventDefault();
				console.log('right',v.name);
				this.cells.map[n[0]][n[1]].flag();
			});
		});
	}
	setBombs(row: number, col: number, mines: number): void{
		let i = 0;
		do {
			let r = _.random(0,row-1);
			let c = _.random(0,col-1);
			if(this._map[r][c]!==9) {
				this._map[r][c] = 9;
				this.addGuideNumber(r,c);
				i++;
			}
		} while (i < mines);
	}
	addGuideNumber(r:number, c:number): void{
		const area: number[][] = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
		for(let i=0; i<8; i++){
			const _r = r+area[i][0];
			const _c = c+area[i][1];
			if(0 <= _r && _r < this.row && 0 <= _c && _c < this.col) {
				this._map[_r][_c] += (this._map[_r][_c]===9)? 0:1;
			}
		}
	}
	gameInit(): void{
		this.row = $('#Table tr').length;
		this.col = $('#Table tr td').length / this.row;
		this.mines = Math.floor(this.row*this.col*2/9);
		this._map = Util.ArrayInit(this.row,this.col);
		this.setBombs(this.row, this.col, this.mines);
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
