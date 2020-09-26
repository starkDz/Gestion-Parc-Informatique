const mongoose= require('mongoose');
const DocumentSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    liste_article:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'article'
    },
    code_service_dist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service'
    },
    code_service_anc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service'
    },
    code_service_dest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service'
    },
    code_type_doc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type_document'
    },
    code_type_mouv:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type_mouvement'
    },
    num_document: {
        type: String,
        required:true
    },
    observation: {
        type: String
    },
    matricule_per_sign: {
        type: String
    },
    matricule_per_use: {
        type: String
    },
    date_doc: {
        type: Date
    },
    date_val: {
        type: Date
    },
    liste_article_supp:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'article'
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Document = mongoose.model('document',DocumentSchema);