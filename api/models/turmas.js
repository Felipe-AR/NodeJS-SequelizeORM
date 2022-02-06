'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    static associate(models) {
      this.hasMany(models.Matriculas, { foreignKey: 'turma_id' })
      this.belongsTo(models.Pessoas, { foreignKey: 'docente_id' })
      this.belongsTo(models.Niveis, { foreignKey: 'nivel_id' })
    }
  }
  Turmas.init({
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Turmas',
  });
  return Turmas;
};