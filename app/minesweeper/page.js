class Cell {
    constructor(arg) {
        this.isOpened = false;
        this.neighbourMines = 0;
    }
    open() {
        this.isOpened = true;
    }
}
class MineCell extends Cell {
    constructor(arg) {
        super(arg);
    }
    bumb() {
    }
}
class MineSweeper {
    constructor() {
        const row = $('#Table tr').length;
        const col = $('#Table tr td').length / row;
        const bombs = Math.floor(row * col * 2 / 9);
        let mapping = this.arrayInit(row, col);
        console.dir(mapping);
        $('button').on('click', (ev) => {
            console.log((ev.target.name));
        });
    }
    positioning(row, col, bombs) {
    }
    arrayInit(row, col) {
        let array = new Array(row);
        for (let i = 0; i < row; i++) {
            let c = new Array(col);
            for (let j = 0; j < col; j++) {
                c[j] = 0;
            }
            array[i] = c;
        }
        return array;
    }
}
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
//# sourceMappingURL=page.js.map