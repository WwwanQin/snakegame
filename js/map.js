;(function(global){
    const GameMap = function(ele){
        this.width = 800;
        this.height = 600;
        this.atom = 20;
        this.xSize = this.width / this.atom;
        this.ySize = this.height / this.atom;
        this.ele = ele;
    }
    // 构建地图
    GameMap.prototype.creareMap = function(){
        let gmp = document.createElement('div');
        gmp.className = 'gameMap'
        gmp.style.width = `${this.width}px`;
        gmp.style.height = `${this.height}px`;
        this.ele.appendChild(gmp);
        const f1 = new food(this.atom,this.atom,this.xSize,this.ySize,gmp);
        f1.createFood()
        const s1 = new snake(this.atom,this.atom,gmp,f1);
        s1.createSnake();
        window.time = setInterval(() => {
            s1.run();
        },150)
    }
    GameMap.prototype.pause = function(){
        clearInterval(window.time);
    }
    global.GameMap = GameMap;
})(window)