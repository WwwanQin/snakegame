;(function(global){
    const bundleResponseFunction = [
        // 检测到等待开始
        {
            type: 'waiting',
            fn: (connectionState,base) => {
                let ele = document.querySelector('.connectionState');
                ele.innerText = connectionState.message;
            }
        },
        // 检测到开始游戏
        {
            type: 'startGame',
            fn: (connectionState,base) => {
                let GameMap = base.GameMap;
                let gameMap = new GameMap(document.querySelector('.main'));
                // 构建地图
                gameMap.createMap();
                // 构建食物
                let food = new base.food(
                    gameMap.atom,
                    gameMap.atom,
                    gameMap.xSize,
                    gameMap.ySize,
                    document.querySelector('.gameMap'));
                food.createFood(connectionState.xDistance,connectionState.yDistance);
                base.gameMap = gameMap;
                base.food = food;
                // 初始化蛇的位置
                let s1 = new snake(20,20,document.querySelector('.gameMap'),food);
                base.s1 = s1;
                s1.createSnake();
                base.time = setInterval(() => {
                    s1.run();
                },150)
                let ele = document.querySelector('.connectionState');
                ele.innerText = connectionState.message;
            }
        },
        // 检测到食物被吃
        {
            type: 'eatFood',
            fn: (connectionState,base) => {
                base.food.createFood(connectionState.xDistance,connectionState.yDistance);
            }
        },
        // 侦测蛇的移动位置改变
        {
            type: 'snakeRun',
            fn: (connectionState,base) => {
                console.log(`位置改变${connectionState.message}`);
                base.s1.setRunPosition(connectionState.message);
            }
        },
        // 侦测到游戏暂停
        {
            type: 'pause',
            fn: (connectionState,base) => {
                const pause = document.querySelector('#pause');
                pause.innerText = '开始'
                alert('游戏暂停');
                base.gameMap.pause();
            }
        },
        // 侦测到启动游戏
        {
            type: 'start',
            fn: (connectionState,base) => {
                const pause = document.querySelector('#pause');
                pause.innerText = '暂停'
                base.gameMap.start();
            }
        }
    ]
    class conn{
        constructor(serverAddress){
            this.serverAddress = serverAddress;
            this.message = {}
            console.log(serverAddress);
            this.server = new WebSocket(serverAddress)
            this.server.onmessage = (res => {
                let {data} = res;
                if(data){
                    let connectionState = JSON.parse(data);
                    bundleResponseFunction.filter(e => e.type == connectionState.type)[0].fn(connectionState,global);
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