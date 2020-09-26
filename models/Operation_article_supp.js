const mongoose= require('mongoose');
const Operation_Article_SuppSchema = new mongoose.Schema({
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
    qte_supp:{
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

module.exports = Operation_Article_Supp = mongoose.model('operation_article_supp',Operation_Article_SuppSchema);