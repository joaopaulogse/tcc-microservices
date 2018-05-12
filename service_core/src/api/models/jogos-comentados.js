const mongoose = require("../../config/mongodb");


const JogosComentadosSchema = mongoose.Schema({
    time:String,
    tweet: String,
    tweetTranslated:String,
    createdAt: Date,
    polarity: Number,
    subjectivity: Number,
    user:String,
    lang:String
});

JogosComentadosSchema.index({
    rodada:1
});

JogosComentadosSchema.index({
    confronto:1
});

JogosComentadosSchema.index({
    placarMandante:1
});

JogosComentadosSchema.index({
    placarVisitante:1
});

JogosComentadosSchema.set("toObject", { virtuals: true });

JogosComentadosSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the _id and __v of every document before returning the result
    delete ret.__v;
    return ret;
};

module.exports = mongoose.model("jogos-comentados", JogosComentadosSchema);