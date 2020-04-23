;(function(){
    var time;
    window.time = time;
    const start = document.querySelector('#start');
    const pause = document.querySelector('#pause');
    let wsconn = window.wsconn;
    // 点击开始游戏
    start.addEventListener('click',() => {
        let startQueue = JSON.parse(localStorage.getItem('gameCode'));
        // 获取当前的游戏码
        let gameCode = startQueue ?  startQueue.gameCode : new Date().getTime();
        localStorage.setItem('gameCode',JSON.stringify({gameCode:gameCode}));
        sendStartGame(gameCode);
    })
    // 暂停游戏
    pause.addEventListener('click',() => {
        let flag = pause.getAttribute('data-id');
        console.log();
        if(flag == 'true'){
            pause.setAttribute('data-id','false');
            sendStopGame('start');
        }else{
            pause.setAttribute('data-id','true');
            sendStopGame('pause');
        }
    })
    // 发送一个开始请求到后台
    function sendStartGame(id){
        let sendMessage = {};
        sendMessage.id = id;
        sendMessage.message = 'gameStart';
        wsconn.sendPosition(JSON.stringify(sendMessage));
    }
    // 发送一个暂停按钮到后台
    function sendStopGame(message){
        let sendMessage = {};
        sendMessage.message = message;
        wsconn.sendPosition(JSON.stringify(sendMessage));
    }
})()