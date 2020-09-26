const mongoose= require('mongoose');
const ArticleSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type'
    },
    marque : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marque'
    },
    categorie : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie'
    },
    model_ : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'model_'
    },
    color : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color'
    },
    mesure_unit : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mesure_unit'
    },
    etat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'etat'
    },
    mode_consommation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mode_consommation'
    },
    observation: {
        type: String
    },
    num_kit: {
        type: String,
        required:true
    },
    num_serie: {
        type: String,
        required:true,
    },
    num_ref: {
        type: String,
        required:true
    },
    qte_seuil: {
        type: Number
    },
    annee_expiration: {
        type: Number
    },
    qte_globale_entre: {
        type: Number
    },
    num_Ordre:{
        type: Number
    },
    date_Cre: {
        type: Date,
        default: Date.now
    }

});

module.exports = Article = mongoose.model('article',ArticleSchema);
