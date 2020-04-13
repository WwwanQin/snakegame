;(function(global){
    class food{
        constructor(width,height,xAtoms,yAtoms,ele){
            this.width = width;
            this.height = height;
            this.xAtoms = xAtoms;
            this.yAtoms = yAtoms;
            this.ele = ele;
        }
        createFood(xDistance,yDistance){
            let fd = document.createElement('div');
            fd.className = 'food';
            fd.style.cssText = 'position:absolute;'
            fd.style.width = this.width + 'px';
            fd.style.height = this.height + 'px';
            this.xDistance = xDistance;
            this.yDistance = yDistance;
            fd.style.top = yDistance + 'px'
            fd.style.left = xDistance + 'px'
            fd.style.backgroundColor = 'black'
            this.ele.appendChild(fd);
        }
        removeFood(){
            if(document.querySelector('.food')){
                document.querySelector('.food').remove();
            }
        }
    }
    global.food = food;
})(window)