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

class Cell{
	private isMine: boolean;
	private isFlaged: boolean;
	private neighbourMines: number;
	constructor(n:number) {
		this.neighbourMines = n;
		this.isMine = (n===9)? true: false;
		this.isFlaged = false;
	}
	open(e:any){
		if(!this.isFlaged){
			return (this.isMine)? this.fire(): this.show(e.target.name);
		}
			return;
	}
	private fire(){
		console.log('fire');
		return MineSweeper.a;
	}
	flag(e:any):void{
		this.isFlaged = !this.isFlaged;
		MineSweeper.flags += (this.isFlaged)? 1: -1;
		console.log('flagged',MineSweeper.flags);
		e.target.innerHTML = (this.isFlaged)? "&#128681;": this.neighbourMines;
		document.getElementsByName('flagNums')[0].textContent = ''+MineSweeper.flags;
		return;
	}
	private show(name:string):void {
		console.log('show',document.getElementsByName(name)[0]);
		document.getElementsByName(name)[0].parentElement.innerHTML = '@';
		return;
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
	static a: string = 'BOMB';
	static b: string = 'BLANK';
	private row: number;
	private col: number;
	private mines: number;
	static flags: number;
	private map: number[][];
	private cells: any;
	constructor(){
		document.getElementsByTagName('main')[0].addEventListener('contextmenu', (e)=>{ e.preventDefault();});

		this.gameInit();

		document.getElementsByName('mineNums')[0].textContent += this.mines;

		_.each(document.getElementsByTagName('button'), (v)=>{
			let n:number[] = this.getArrayIdFromTagsName(v.name);
			this.cells[n[0]][n[1]] = new Cell(this.map[n[0]][n[1]]);


			v.innerHTML = (this.map[n[0]][n[1]]!==9)? ''+this.map[n[0]][n[1]]: '&#128163;';


			v.addEventListener('click', (event)=>this.clickL(event,n));
			v.addEventListener('contextmenu', (event)=>this.clickR(event,n));
		});
	}
	clickL(e:any,n:number[]){
		let tmp = this.cells[n[0]][n[1]].open(e);
		switch(tmp){
			case MineSweeper.a:
			console.log('bomb');
			this.gameOver();
				break;
			case MineSweeper.b:
				break;
			default:
				break;
		}
		return;
	}
	clickR(e:any,n:number[]){
		this.cells[n[0]][n[1]].flag(e);
	}
	setBombs(row: number, col: number, mines: number): void{
		let i = 0;
		do {
			let r = _.random(0,row-1);
			let c = _.random(0,col-1);
			if(this.map[r][c]!==9) {
				this.map[r][c] = 9;
				this.addGuideNumber(r,c);
				i++;
			}
		} while (i < mines);
	}
	addGuideNumber(r:number,c:number): void{
		const area: number[][] = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
		for(let i=0; i<8; i++){
			let _r = r+area[i][0];
			let _c = c+area[i][1];
			if(0 <= _r && _r < this.row && 0 <= _c && _c < this.col) {
				this.map[_r][_c] += (this.map[_r][_c]===9)? 0:1;
			}
		}
	}
	gameOver(): void{
		for(let r=0; r<this.row; r++){
			for(let c=0; c<this.col; c++){
				this.cells[r][c].show(this.getTagsNameFromArrayId(r,c));
			}
		}
		alert('Game Over :(');
	}
	gameClear(): void{

	}
	gameInit(): void{
		this.row = $('#Table tr').length;
		this.col = $('#Table tr td').length / this.row;
		this.mines = Math.floor(this.row*this.col*2/9);
		this.map = Util.ArrayInit(this.row,this.col);
		this.setBombs(this.row, this.col, this.mines);
		this.cells = Util.ArrayInit(this.row,this.col);
		MineSweeper.flags = 0;
	}
	getArrayIdFromTagsName(str:string):number[]{
		let ret:any = str.split('_');
		ret[0] = parseInt(ret[0],10);
		ret[1] = parseInt(ret[1],10);
		return ret;
	}
	getTagsNameFromArrayId(r:number,c:number):string{
		return r+'_'+c;
	}
	// private showAllCells(): void{
	// 	console.log('showAll');
	// 	for(let i=0; i<this.row; i++){
	// 		for(let j=0; j<this.col; j++){
	// 			console.log(i,j);
	// 			console.dir(this.cells[i][j]);
	// 			this.cells[i][j].show();
	// 		}
	// 	}
	// }
}

function ready(fn: any) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
