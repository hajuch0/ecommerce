const { toDomainEntity } = require('../domain/mappers');
const { toDbEntity } = require('../dal/mappers');
class userService{
    constructor({ userRepository }){
        this._userRepository = userRepository;
    }

    async getUsers(){
        const users = await this._userRepository.getUsers();
        return users.map(toDomainEntity);
    }

    async createUsers(user){
        const User = toDbEntity(user);
        const createdUser = await this._userRepository.createUsers(User);
        return createdUser;
    }
}

module.exports = userService;