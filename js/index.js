;(function(){
    var time;
    window.time = time;
    const start = document.querySelector('#start');
    const pause = document.querySelector('#pause');
    const openFrid = document.querySelector('#openGrid');
    const closeFrid = document.querySelector('#closeGrid');
    const gameMap = new GameMap(document.querySelector('.main'))
    start.addEventListener('click',() => {
        gameMap.creareMap();
    })
    pause.addEventListener('click',() => {
        gameMap.pause();
    })
})()