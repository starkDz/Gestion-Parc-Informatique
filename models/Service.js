const mongoose= require('mongoose');
const ServiceSchema = new mongoose.Schema({
    code_ser : {
        type: String,
        required:true
    },
    fils : {
        type: [String]
    },
     owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    parent : {
        type:String
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

module.exports = Service = mongoose.model('service',ServiceSchema);