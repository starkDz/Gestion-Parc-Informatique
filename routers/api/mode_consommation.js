const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Mode_Consommation = require('../../models/Mode_Consommation');
const User = require('../../models/User');


router.post('/',[auth,
    [
    check('description_Fr','Description is required')
    .not()
    .isEmpty(),
    check('description_Ar','Description is required')
    .not()
    .isEmpty()
]
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

const {
    description_Ar,
    description_Fr,
    num_Ordre
}= req.body;

//Build type objects
const mode_consommationFields = {};
mode_consommationFields.owner = req.user.id;
if(description_Ar) mode_consommationFields.description_Ar = description_Ar;
if(description_Fr) mode_consommationFields.description_Fr = description_Fr;
if(num_Ordre) mode_consommationFields.num_Ordre = num_Ordre;


try{
    mode_consommation = new Mode_Consommation(mode_consommationFields);
    await mode_consommation.save()
    res.json(mode_consommation);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const modes = await Mode_Consommation.find().populate('owner',['name']);
        res.json(modes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:mode_id',auth,async (req,res)=>{
    try {

        //remove type
        await Mode_Consommation.findOneAndRemove({_id:req.params.mode_id});
        res.json({msg:'Mode_Consommation Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Mode_Consommation.deleteMany({});

        res.json({msg:'all Mode_Consommations are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
