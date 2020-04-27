module.exports = function(sequelize , DataTypes){
    const User = sequelize.define(
        'users',
        {
            id : {
                type : DataTypes.INTEGER,
                allowNull : false,
                primaryKey : true,
                autoIncrement : true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false
            },
            lastname : {
                type : DataTypes.STRING,
                allowNull : true
            }
        },
        {
            tableName : 'Users',
            timestamp : false
        }
    );

    User.assosiate = function(models){
        User.belongsTo(models.bussiness);
    }

    return User;
}