class StartUp{
    constructor({Server}){
        this._server = Server;
    }

    async start(){
        await this._server.start();
    }
}

module.exports = StartUp;