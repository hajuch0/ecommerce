const { createContainer , asClass , asFunction , asValue } = require('awilix');

const container = createContainer();

// Server
const StartUp = require('./startup');
const Server = require('./server');
const config = require('../config/enviroments');
const db = require('../dal/entities');

//Routes
const Routes = require('../api/routes');
const userRoutes = require('./routes/user.routes');

//Controllers
const { userController } = require('./controllers');

//Services
const { userService } = require('../services');

//Repositories
const { userRepository } = require('../dal/repositories');

container.register({
    app : asClass(StartUp).singleton(),
    Server : asClass(Server).singleton(),
    config : asValue(config),
    db : asValue(db)
})
.register({
    userController : asClass(userController).singleton()
})
.register({
    router : asFunction(Routes).singleton(),
    userRoutes : asFunction(userRoutes).singleton()
})
.register({
    userService : asClass(userService).singleton()
})
.register({
    userRepository : asClass(userRepository).singleton()
});


module.exports = container; 