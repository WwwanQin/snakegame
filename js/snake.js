;(function(global){
    var fangxaing = 'right'
    const snake = function(width,height,ele,food){
        this.width = width;
        this.height = height;
        this.ele = ele;
        this.food = food;
        this.snakeArrs = [
            {x:10,y:8},
            {x:9,y:8},
            {x:8,y:8},
            {x:7,y:8},
            {x:6,y:8},
            {x:5,y:8},
            {x:4,y:8},
            {x:3,y:8},
            {x:2,y:8}
        ];
    }
    snake.prototype.createSnake = function(){
        for (const item of this.snakeArrs) {
            let div = document.createElement('div');
            div.style.cssText = 'position: absolute;box-sizing;' 
            div.style.backgroundColor = 
            `rgb(${Math.floor(Math.random()*254)},${Math.floor(Math.random()*254)},${Math.floor(Math.random()*254)}`;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = item.x * this.width + 'px';
            div.style.top = item.y * this.width + 'px';
            item.flag = div;
            this.ele.appendChild(div);
        }
    }
    // 获取键盘方向事件
    document.querySelector('body').addEventListener('keydown',(e) =>{
        switch(e.keyCode){
            case 38 : fangxaing = 'top'; break;
            case 40 : fangxaing = 'bottom'; break;
            case 39 : fangxaing = 'right'; break;
            case 37 : fangxaing = 'left'; break;
        }
    })
    snake.prototype.run = function(){
        if(this.snakeArrs[0].x * this.width > 780
            || this.snakeArrs[0].x * this.width < 0
            || this.snakeArrs[0].y * this.width > 580
            || this.snakeArrs[0].y * this.width < 0){
            this.endGame();
            return;
        }
        for (let i = 1; i < this.snakeArrs.length; i++) {
            if(this.snakeArrs[0].x == this.snakeArrs[i].x && 
                this.snakeArrs[0].y == this.snakeArrs[i].y){
                    this.endGame();
                    return;
            }
        }
        console.log(this.snakeArrs[0].x,this.food.xDistance);
        if(this.snakeArrs[0].x == this.food.xDistance && 
            this.snakeArrs[0].y == this.food.yDistance){
                this.snakeArrs.push({
                    x:null,
                    y:null,
                    flag:null
                });
                this.food.removeFood();
                this.food.createFood();
        }
        for(let i = this.snakeArrs.length-1 ;i>0; i--){
            this.snakeArrs[i].x = this.snakeArrs[i-1].x;
            this.snakeArrs[i].y = this.snakeArrs[i-1].y;
        }
        switch(fangxaing){
            case 'right': this.snakeArrs[0].x+=1; break;
            case 'left': this.snakeArrs[0].x-=1; break;
            case 'top': this.snakeArrs[0].y-=1; break;
            case 'bottom': this.snakeArrs[0].y+=1; break;
        }
        for(let i = 0;i<this.snakeArrs.length;i++){
            if(this.snakeArrs[i].flag != null){
                this.ele.removeChild(this.snakeArrs[i].flag);
            }
        }
        this.createSnake();
    }
    snake.prototype.endGame = function(){
        window.clearInterval(window.time);
        fangxaing = 'right';
        alert('游戏结束');
    }
    global.snake = snake;
})(window)