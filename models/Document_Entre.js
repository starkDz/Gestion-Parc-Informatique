const mongoose= require('mongoose');
const Document_EntreSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    code_service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service'
    },
    code_type_doc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type_document'
    },
    code_doc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'document'
    },
    magasin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'magasin'
    },
    articles:{
        type: [String]
    },
    ref_document_entr: {
        type: String,
        required:true
    },
    observation: {
        type: String
    },

    date_doc: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Document_Entre = mongoose.model('document_entre',Document_EntreSchema);
