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

  static async atualizarPessoa(req, res) {
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
      return res.status(200).json({mensagem: `O id ${id} foi deletado`})
    } catch (erro) {
      res.status(500).json(erro.message)
    }
  }
}

module.exports = PessoaController