const mongoose = require('mongoose');
const FournisseurSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bank_account:{
        type:String
    },
    ville:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    telephone:{
        type:String,
        required:true
    },
    telephone2:{
        type:String
    },
    fax:{
        type:String
    },
    fax2:{
        type:String
    },
    description:{
        type:String
    },
    num_Ordre:{
        type: Number,
        default:0
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = Fournisseur = mongoose.model('fournisseur', FournisseurSchema);
