const mongoose= require('mongoose');
const EtatSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description_Fr:{
        type:String,
        required:true
    },
    description_Ar: {
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
    }

});

module.exports = Etat = mongoose.model('etat',EtatSchema);
