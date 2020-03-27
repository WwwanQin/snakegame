;(function(global){
    var fangxaing = 'right'
    const snake = function(width,height,ele){
        this.width = width;
        this.height = height;
        this.ele = ele;
        this.snakeArrs = [
            {x:10,y:10},
            {x:9,y:10},
            {x:8,y:10}
        ];
    }
    snake.prototype.createSnake = function(){
        for (const item of this.snakeArrs) {
            let div = document.createElement('div');
            div.style.cssText = 'position: absolute;box-sizing;' 
            div.style.backgroundColor = `rgb(${Math.floor(Math.random()*254)},${Math.floor(Math.random()*254)},${Math.floor(Math.random()*254)}`;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = item.x * this.width + 'px';
            div.style.top = item.y * this.width + 'px';
            item.flag = div;
            this.ele.appendChild(div);
        }
    }
    document.querySelector('body').addEventListener('keydown',(e) =>{
        console.log(e.keyCode);
        switch(e.keyCode){
            case 38 : fangxaing = 'top'; break;
            case 40 : fangxaing = 'bottom'; break;
            case 39 : fangxaing = 'right'; break;
            case 37 : fangxaing = 'left'; break;
        }
    })
    snake.prototype.run = function(){
        for(let i = this.snakeArrs.length-1 ;i>0; i--){
            this.snakeArrs[i].x = this.snakeArrs[i-1].x;
            this.snakeArrs[i].y = this.snakeArrs[i-1].y;
        }
        // this.snakeArrs[0].x += 1;
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
    global.snake = snake;
})(window)