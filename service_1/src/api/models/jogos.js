const mongoose = require('../../config/mongodb');

const JogoSchema = mongoose.Schema({
    createdAt:Date,
    updatedAt:Date,
    confronto: String,
    dataConfronto: String,
    data: String,
    hora: String,
    local: String,
    mandante: String,
    visitante: String,
    placarMandante: String,
    placarVisitante: String,
    numeroRodada: String,
    jogoRealizado: Boolean,
    rodada: String
});

JogoSchema.index({
  rodada:1
});

JogoSchema.index({
  confronto:1
});

JogoSchema.index({
  placarMandante:1
});

JogoSchema.index({
  placarVisitante:1
});

JogoSchema.set("toObject", { virtuals: true });

JogoSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id and __v of every document before returning the result
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('jogos', JogoSchema);

