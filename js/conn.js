;(function(global){
    class conn{
        constructor(serverAddress){
            this.serverAddress = serverAddress;
            this.message = {}
            console.log(serverAddress);
            this.server = new WebSocket(serverAddress)
            this.server.onmessage = (res => {
                let GameMap = global.GameMap;
                let gameMap = new GameMap(document.querySelector('.main'));
                let {data} = res;
                if(data){
                    let connectionState = JSON.parse(data);
                    // 检测到等待开始
                    if(connectionState.type == 'waiting'){
                        let ele = document.querySelector('.connectionState');
                        ele.innerText = connectionState.message;
                    }
                    // 检测到开始游戏
                    if(connectionState.type == 'startGame'){
                        // 构建地图
                        gameMap.createMap();
                        // 构建食物
                        let food = new global.food(
                            gameMap.atom,
                            gameMap.atom,
                            gameMap.xSize,
                            gameMap.ySize,
                            document.querySelector('.gameMap'));
                        food.createFood(connectionState.xDistance,connectionState.yDistance);
                        global.food = food;
                        // 初始化蛇的位置
                        let s1 = new snake(20,20,document.querySelector('.gameMap'),food);
                        global.s1 = s1;
                        s1.createSnake();
                        global.time = setInterval(() => {
                            s1.run();
                        },150)
                        let ele = document.querySelector('.connectionState');
                        ele.innerText = connectionState.message;
                    }
                    // 检测到食物被吃
                    if(connectionState.type == 'eatFood'){
                        global.food.createFood(connectionState.xDistance,connectionState.yDistance);
                    }
                    // 侦测蛇的移动位置改变
                    if(connectionState.type == 'snakeRun'){
                        console.log(`位置改变${connectionState.message}`);
                        global.s1.setRunPosition(connectionState.message);
                    }
                }
                this.message = res;
            })
            this.server.onclose = (res => {
                console.dir(res);
            })
            this.server.onerror = (err => {
                console.log(`${err}，系统错误`);
            })
        }
        sendPosition(direction){
            this.server.send(direction)
        }
        getPosition(){
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    if(this.message){
                        resolve(this.message.data);
                    }
                },10)
            })
        }
    }
    global.conn = conn;
})(window)