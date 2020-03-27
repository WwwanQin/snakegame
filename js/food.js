;(function(global){
    const food = function(width,height,xSize,ySize,ele){
        this.width = width;
        this.height = height;
        this.xSize = xSize;
        this.ySize = ySize;
        this.ele = ele;
    }
    food.prototype.createFood = function(){
        let fd = document.createElement('div');
        fd.style.cssText = 'position:absolute;'
        fd.style.width = this.width + 'px';
        fd.style.height = this.height + 'px';
        fd.style.top = Math.floor(Math.random() * this.ySize) * this.height + 'px'
        fd.style.left = Math.floor(Math.random() * this.xSize)  * this.width + 'px'
        fd.style.backgroundColor = 'black'
        this.ele.appendChild(fd);
    }
    global.food = food;
})(window)