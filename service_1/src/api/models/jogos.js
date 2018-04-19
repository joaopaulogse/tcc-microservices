import { mongo } from 'mongoose';

const mongoose = require('../../config/mongodb');

const JogoSchema = mongoose.Schema({
    confronto: String,
    diaConfronto: Date,
    local:String,
    mandante:String,
    visitante:String,
    resultadoMandante:String,
    resultadoVisitante:String,
    numeroRodada:Number
});


const JogosSchema = mongoose.Schema({

    rodada: Number,
    jogos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jogo'
    }]
})

const jogos = mongoose.model('jogos', JogosSchema);
const jogo = mongoose.model('jogos', JogoSchema);
module.exports = { jogos, jogo };