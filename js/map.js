;(function(global){
    class GameMap{
        constructor(ele){
            this.width = 400;
            this.height = 300;
            this.atom = 20;
            this.xSize = this.width / this.atom;
            this.ySize = this.height / this.atom;
            this.ele = ele;
        }
        // 构建地图
        createMap(){
            console.log(1);
            let gmp = document.createElement('div');
            gmp.className = 'gameMap'
            gmp.style.width = `${this.width}px`;
            gmp.style.height = `${this.height}px`;
            this.ele.appendChild(gmp);
            const f1 = new food(this.atom,this.atom,this.xSize,this.ySize,gmp);
            f1.removeFood();
        }
        // 暂停游戏
        pause(){
            clearInterval(global.time);
        }
        // 禁用开始按钮
        disabledBeginBtn(){
   
        }
        start(){
            global.time = setInterval(() => {
                global.s1.run();
            },150)
        }
    }
    global.GameMap = GameMap;
})(window)