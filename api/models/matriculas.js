'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    static associate(models) {
      this.belongsTo(models.Pessoas, { foreignKey: 'estudante_id' })
      this.belongsTo(models.Turmas, { foreignKey: 'turma_id' })
    }
  }
  Matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
  });
  return Matriculas;
};