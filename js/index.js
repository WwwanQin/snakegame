;(function(){
    var time;
    window.time = time;
    const start = document.querySelector('#start');
    const pause = document.querySelector('#pause');
    const gameMap = new GameMap(document.querySelector('.main'));
    let wsconn = window.wsconn;
    start.addEventListener('click',() => {
        let startQueue = JSON.parse(localStorage.getItem('gameCode'));
        let gameCode;
        gameCode = startQueue ?  startQueue.gameCode : new Date().getTime();
        localStorage.setItem('gameCode',JSON.stringify({gameCode:gameCode}));
        sendStartGame(gameCode);
        // gameMap.createMap();
    })
    pause.addEventListener('click',() => {
        let flag = pause.getAttribute('data-id');
        console.log();
        if(flag == 'true'){
            gameMap.start();
            pause.setAttribute('data-id','false');
        }else{
            gameMap.pause();
            pause.setAttribute('data-id','true');
        }
    })
    // 发送一个开始请求到后台
    function sendStartGame(id){
        let sendMessage = {};
        sendMessage.id = id;
        sendMessage.message = 'gameStart';
        wsconn.sendPosition(JSON.stringify(sendMessage));
    }
    // 获取连接状态
})()