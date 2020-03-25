;(function(global){
    const GameMap = function(ele){
        this.width = 800;
        this.height = 600;
        this.ele = ele;
        this.creareMap = function(){
            let div = document.createElement('div');
            div.className = 'gameMap'
            div.style.width = `${this.width}px`;
            div.style.height = `${this.height}px`;
            this.ele.appendChild(div);
        }
    }
    global.GameMap = GameMap;
})(window)