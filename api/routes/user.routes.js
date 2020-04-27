const { Router } = require('express');

module.exports = function({userController}){
    const router = Router();
    router.get('/',userController.save);
    router.get('/',userController.getUsers.bind(userController));
    router.post('/',userController.createUser.bind(userController));
    return router;
}