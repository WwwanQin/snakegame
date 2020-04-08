;(function(global){
    class GameMap{
        constructor(ele){
            this.width = 800;
            this.height = 600;
            this.atom = 20;
            this.xSize = this.width / this.atom;
            this.ySize = this.height / this.atom;
            this.ele = ele;
            this.s1 = null;
        }
        // 构建地图
        creareMap(){
            let gmp = document.createElement('div');
            gmp.className = 'gameMap'
            gmp.style.width = `${this.width}px`;
            gmp.style.height = `${this.height}px`;
            this.ele.appendChild(gmp);
            const f1 = new food(this.atom,this.atom,this.xSize,this.ySize,gmp);
            f1.removeFood();
            f1.createFood();
            this.s1 = new snake(this.atom,this.atom,gmp,f1);
            this.s1.createSnake();
            window.time = setInterval(() => {
                this.s1.run();
            },150)
        }
        pause(){
            clearInterval(window.time);
        }
        start(){
            window.time = setInterval(() => {
                this.s1.run();
            },150)
        }
    }
    global.GameMap = GameMap;
})(window)