const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Marque = require('../../models/Marque');
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
const marqueFields = {};
marqueFields.owner = req.user.id;
if(description_Ar) marqueFields.description_Ar = description_Ar;
if(description_Fr) marqueFields.description_Fr = description_Fr;
if(num_Ordre) marqueFields.num_Ordre = num_Ordre;

try{
    marque = new Marque(marqueFields);
    await marque.save()
    res.json(marque);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const marques = await Marque.find().populate('owner',['name']);
        res.json(marques);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:marque_id',auth,async (req,res)=>{
    try {

        //remove type
        await Marque.findOneAndRemove({_id:req.params.marque_id});
        res.json({msg:'marque Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Marque.deleteMany({});

        res.json({msg:'all Marques are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
