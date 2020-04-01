;(function(global){
    const food = function(width,height,xAtoms,yAtoms,ele){
        this.width = width;
        this.height = height;
        this.xAtoms = xAtoms;
        this.yAtoms = yAtoms;
        this.ele = ele;
    }
    food.prototype.createFood = function(){
        let fd = document.createElement('div');
        fd.className = 'food';
        fd.style.cssText = 'position:absolute;'
        fd.style.width = this.width + 'px';
        fd.style.height = this.height + 'px';
        this.xDistance = Math.floor(Math.random() * this.xAtoms);
        this.yDistance = Math.floor(Math.random() * this.yAtoms);
        fd.style.top = this.yDistance * this.height + 'px'
        fd.style.left = this.xDistance  * this.width + 'px'
        fd.style.backgroundColor = 'black'
        this.ele.appendChild(fd);
    }
    food.prototype.removeFood = function(){
        document.querySelector('.food').remove();
    }
    global.food = food;
})(window)