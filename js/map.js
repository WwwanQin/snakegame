;(function(global){
    const GameMap = function(ele){
        this.width = 800;
        this.height = 600;
        this.atom = 20;
        this.xSize = this.width / this.atom;
        this.ysize = this.height / this.atom;
        this.ele = ele;
    }
    // 构建地图
    GameMap.prototype.creareMap = function(){
        let gmp = document.createElement('div');
        gmp.className = 'gameMap'
        gmp.style.width = `${this.width}px`;
        gmp.style.height = `${this.height}px`;
        this.ele.appendChild(gmp);
        new food(this.atom,this.atom,this.xSize,this.ysize,gmp).createFood();
    }
    // 展示网格
    GameMap.prototype.createGrid = function(){
        console.log(this.atom);
        for (let i = 0; i < this.ysize; i++) {
            for (let j = 0; j < this.xSize; j++) {
                let grid = document.createElement('div');
                grid.style.cssText = 'border:1px solid rgb(255,255,255);position: absolute;box-sizing: border-box;';
                grid.style.width = `${this.atom}px`;
                grid.style.height = `${this.atom}px`;
                grid.style.top = `${this.atom * i}px`;
                grid.style.left = `${this.atom * j}px`;
                let gameMap = document.querySelector('.gameMap');
                gameMap.appendChild(grid);
            }  
        }
    }
    // 关闭网格
    GameMap.prototype.closeGrid = function(){
        document.querySelector('.gameMap').innerHTML = '';
    }
    global.GameMap = GameMap;
})(window)