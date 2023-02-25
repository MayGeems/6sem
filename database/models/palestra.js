'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Palestra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Evento, {
        foreignKey: 'eventoId',
        as: 'evento'
      })
      this.belongsToMany(models.Ministrante,{
        through: 'palestraministrante',
        as: 'ministrantes',
        foreignKey: 'palestraId'
      })
    }
  }
  Palestra.init({
    titulo: DataTypes.STRING,
    resumo: DataTypes.STRING,
    data: DataTypes.DATE,
    eventoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Palestra',
  });
  return Palestra;
};