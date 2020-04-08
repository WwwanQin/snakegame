;(function(){
    var time;
    window.time = time;
    const start = document.querySelector('#start');
    const pause = document.querySelector('#pause');
    const gameMap = new GameMap(document.querySelector('.main'))
    start.addEventListener('click',() => {
        gameMap.creareMap();
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
})()