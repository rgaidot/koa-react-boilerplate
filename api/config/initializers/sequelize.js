import path from 'path';
import Sequelize from 'sequelize';
import { readdirSync } from 'fs';

const ENV = process.env.NODE_ENV || 'development';
const modelsPath = path.join(__dirname, '..', '..', 'src', '/models');
const config = require(path.join(__dirname, '..', 'database.json'))[ENV];
const client = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

let models = {};

readdirSync(modelsPath)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(file => {
        const model = client.import(path.join(modelsPath, file));
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export default client;
