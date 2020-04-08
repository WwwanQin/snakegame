;(function(global){
    class conn{
        constructor(serverAddress){
            this.serverAddress = serverAddress;
            this.message = {}
            console.log(serverAddress);
            this.server = new WebSocket(serverAddress)
            this.server.onmessage = (res => {
                this.message = res;
            })
            this.server.onclose = (res => {
                console.dir(res);
            })
            this.server.onerror = (err => {
                console.log(`${err}，系统错误`);
            })
        }
        sendPosition(direction){
            this.server.send(direction)
        }
        getPosition(){
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    if(this.message){
                        resolve(this.message);
                    }
                },10)
            })
        }
    }
    global.conn = conn;
})(window)