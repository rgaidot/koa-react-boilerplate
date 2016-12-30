import config from 'config';
import Sequelize from 'sequelize';

const database = config.database;

export default new Sequelize(database.name, database.username, database.password, {
    host: database.hostname,
    dialect: database.adapter,
});
