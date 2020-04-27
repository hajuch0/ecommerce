class userController{
    constructor({userService}){
        this._userService = userService;
    }

    save(req , res){
        return res.send({
            message:'hola mundo, este es el controlador de guardar'
        });
    }

    async getUsers(req , res){   
        const users = await this._userService.getUsers();
        return res.send({
            error : false,
            payload : users
        });
    }

    async createUser(res , req){
        const { body } = req;
        console.log(body);
        
        const createdUser = await this._userService.createUsers(body);
        return res.send({
            error : false,
            payload : createUsers
        });
    }
}

module.exports = userController;