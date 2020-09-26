const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Mesure_Unit = require('../../models/Mesure_Unit');
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
const mesure_unitFields = {};
mesure_unitFields.owner = req.user.id;
if(description_Ar) mesure_unitFields.description_Ar = description_Ar;
if(description_Fr) mesure_unitFields.description_Fr = description_Fr;
if(num_Ordre) mesure_unitFields.num_Ordre = num_Ordre;


try{
    mesure_unit = new Mesure_Unit(mesure_unitFields);
    await mesure_unit.save()
    res.json(mesure_unit);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const unites = await Mesure_Unit.find().populate('owner',['name']);
        res.json(unites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:unit_id',auth,async (req,res)=>{
    try {

        //remove type
        await Mesure_Unit.findOneAndRemove({_id:req.params.unit_id});
        res.json({msg:'Mesure_Unit Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Mesure_Unit.deleteMany({});

        res.json({msg:'all Mesure_Units are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
