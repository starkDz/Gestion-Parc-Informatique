const mongoose= require('mongoose');
const Operation_ArticleSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    article : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    article_entre : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article_entre_magasin'
    },
    qte_demande:{
        type:Number
    },
    qte_destribue: {
        type: Number
    },
    observation: {
        type: String,
        required:true
    },
    qte_consomme:{
        type: Number
    },
    qte_restante:{
        type: Number
    },
    date_Cre: {
        type: Date,
        default: Date.now
    },
    num_Ordre:{
        type: Number,
        default:0
    }

});

module.exports = Operation_Article = mongoose.model('operation_article',Operation_ArticleSchema);