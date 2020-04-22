;(function(global){
    global.serverAddress = 'ws://127.0.0.1:8080';
    global.wsconn = new conn(global.serverAddress);
    let wsconn = global.wsconn;
    var fangxaing = 'right'
    class snake{
        constructor(width,height,ele,food){
            this.width = width;
            this.height = height;
            this.ele = ele;
            this.food = food;
            this.snakeArrs = [
                {
                    x: 10,
                    y: 8,
                    rgb: 'rgb(2, 90, 108)'
                },
                {
                    x: 9,
                    y: 8,
                    rgb: 'rgb(255, 255, 255)'
                },
                {
                    x: 8,
                    y: 8,
                    rgb: 'rgb(145, 211, 240)'
                }
            ];
        }
        // 设置重构蛇
        createSnake(){
            for (const item of this.snakeArrs) {
                let div = document.createElement('div');
                div.style.cssText = 'position: absolute;box-sizing;' 
                div.style.backgroundColor = item.rgb;
                div.style.width = this.width + 'px';
                div.style.height = this.height + 'px';
                div.style.left = item.x * this.width + 'px';
                div.style.top = item.y * this.width + 'px';
                item.flag = div;
                this.ele.appendChild(div);
            }
        }
        // 蛇的运动
        run(){
            // 判断是否吃自己
            for (let i = 1; i < this.snakeArrs.length; i++) {
                if(this.snakeArrs[0].x == this.snakeArrs[i].x && 
                    this.snakeArrs[0].y == this.snakeArrs[i].y){
                        this.endGame();
                        return;
                }
            }
            // 判断是否吃到了食物
            if(this.snakeArrs[0].x * this.width == this.food.xDistance && 
                this.snakeArrs[0].y * this.height == this.food.yDistance){
                    this.snakeArrs.push({
                        x: null,
                        y: null,
                        flag: null,
                        rgb: getBgc()
                    });
                    this.food.removeFood();
                    wsconn.sendPosition(JSON.stringify({message: 'eatFood'}));
            }
            // 蛇的运动
            for(let i = this.snakeArrs.length-1 ;i>0; i--){
                this.snakeArrs[i].x = this.snakeArrs[i-1].x;
                this.snakeArrs[i].y = this.snakeArrs[i-1].y;
            }
            // 判断蛇的运动方向
            switch(fangxaing){
                case 'right': this.snakeArrs[0].x+=1; break;
                case 'left': this.snakeArrs[0].x-=1; break;
                case 'top': this.snakeArrs[0].y-=1; break;
                case 'bottom': this.snakeArrs[0].y+=1; break;
            }
            // 撞墙
            if(this.snakeArrs[0].x * this.width > 380
                || this.snakeArrs[0].x * this.width < 0
                || this.snakeArrs[0].y * this.width > 280
                || this.snakeArrs[0].y * this.width < 0){
                this.endGame();
                return;
            }
            // 每次移动完之后去除掉上一次运动的元素
            for(let i = 0;i<this.snakeArrs.length;i++){
                if(this.snakeArrs[i].flag != null){
                    this.ele.removeChild(this.snakeArrs[i].flag);
                }
            }
            this.createSnake();   
        }
        // 结束游戏
        endGame(){
            global.clearInterval(global.time);
            fangxaing = 'right';
            alert('游戏结束');
        }
        // 设置蛇的运动
        setRunPosition(position){
            fangxaing = position;
        }
    }
    // 获取键盘方向事件
    document.querySelector('body').addEventListener('keydown',(e) =>{
        let position = 'right'
        switch(e.keyCode){
            case 38 : position = 'top'; break;
            case 40 : position = 'bottom'; break;
            case 39 : position = 'right'; break;
            case 37 : position = 'left'; break;
        }
        let sendMessage = {};
        sendMessage.message = 'snakeRun'
        sendMessage.position = position;
        wsconn.sendPosition(JSON.stringify(sendMessage));
    })
    const getBgc = function(){
        return `rgb(${Math.floor(Math.random()*254)},${Math.floor(Math.random()*254)},${Math.floor(Math.random()*254)}`;
    }
    global.snake = snake;
})(window)