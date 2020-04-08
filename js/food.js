;(function(global){
    class food{
        constructor(width,height,xAtoms,yAtoms,ele){
            this.width = width;
            this.height = height;
            this.xAtoms = xAtoms;
            this.yAtoms = yAtoms;
            this.ele = ele;
        }
        createFood(){
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
        removeFood(){
            if(document.querySelector('.food')){
                document.querySelector('.food').remove();
            }
        }
    }
    global.food = food;
})(window)