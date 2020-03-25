;(function(){
    var time;
    const start = document.querySelector('#start');
    const pause = document.querySelector('#pause');
    start.addEventListener('click',() => {
        new GameMap(document.querySelector('.main')).creareMap();
        clearInterval(time);
        time = setInterval(() => {
            console.log('蛇开始动');
        },300)
    })
    pause.addEventListener('click',() => {
        clearInterval(time);
    })
})()