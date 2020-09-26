const mongoose= require('mongoose');
const Article_Entre_MagasinSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    article : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    document_entre : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'document_entre'
    },
    prix_unitaire:{
        type:Number,
        required:true
    },
    qte_entre: {
        type: Number,
        required:true
    },
    observation: {
        type: String,
        required:true
    },
    num_Ordre:{
        type: Number,
        default:0
    },
    date_Cre: {
        type: Date,
        default: Date.now
    },
    date_Reception: {
        type: Date,
        default: Date.now
    }

});

module.exports = Article_Entre_Magasin = mongoose.model('article_entre_magasin',Article_Entre_MagasinSchema);
