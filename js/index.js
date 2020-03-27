;(function(){
    var time;
    const start = document.querySelector('#start');
    const pause = document.querySelector('#pause');
    const openFrid = document.querySelector('#openGrid');
    const closeFrid = document.querySelector('#closeGrid');
    const gameMap = new GameMap(document.querySelector('.main'))
    start.addEventListener('click',() => {
        gameMap.creareMap();
        clearInterval(time);
        time = setInterval(() => {
            console.log('蛇开始动');
        },300)
    })
    pause.addEventListener('click',() => {
        clearInterval(time);
    })
    openFrid.addEventListener('click',() => {
        gameMap.createGrid();
    })
    closeFrid.addEventListener('click',() => {
        gameMap.closeGrid();
    })
})()