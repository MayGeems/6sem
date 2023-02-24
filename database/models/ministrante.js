'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ministrante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ministrante.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    formacao: DataTypes.STRING,
    fotoperfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ministrante',
  });
  return Ministrante;
};