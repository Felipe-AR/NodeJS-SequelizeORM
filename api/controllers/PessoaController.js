const database = require('../models')

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(umaPessoa)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novasInformacoes = req.body
    try {
      await database.Pessoas.update(novasInformacoes, { where: { id: Number(id) } })
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(pessoaAtualizada)
    } catch (erro) {
      res.status(500).json(erro.message)
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `O id ${id} foi deletado` })
    } catch (erro) {
      res.status(500).json(erro.message)
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `O id ${id} foi restaurado` })
    } catch (erro) {
      res.status(500).json(erro.message)
    }
  }

  static async pegaTodasAsMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      const todasAsMatriculas = await database.Matriculas.findAll({
        where: { estudante_id: Number(estudanteId) }
      })
      return res.status(200).json(todasAsMatriculas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json(umaMatricula)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
      return res.status(200).json(novaMatriculaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInformacoes = req.body
    try {
      await database.Matriculas.update(novasInformacoes, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) }
      })
      return res.status(200).json(matriculaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      res.status(200).json({ message: `O id  da matricula ${matriculaId} do estudante id ${estudanteId} foi deletado` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = PessoaController