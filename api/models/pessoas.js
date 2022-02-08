'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      this.hasMany(models.Turmas, { foreignKey: 'docente_id' })
      this.hasMany(models.Matriculas, { foreignKey: 'estudante_id', scope: { status: 'confirmado' }, as: 'aulasMatriculadas' })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado.length < 3) throw new Error("O campo nome deve possuir mais de 3 caracteres")
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "O dado do tipo e-mail está inválido"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      todos: { where: {} }
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};