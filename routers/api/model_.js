const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Model_ = require('../../models/Model_');
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
const model_Fields = {};
model_Fields.owner = req.user.id;
if(description_Ar) model_Fields.description_Ar = description_Ar;
if(description_Fr) model_Fields.description_Fr = description_Fr;
if(num_Ordre) model_Fields.num_Ordre = num_Ordre;


try{
    model_ = new Model_(model_Fields);
    await model_.save()
    res.json(model_);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const model_s = await Model_.find().populate('owner',['name']);
        res.json(model_s);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:model__id',auth,async (req,res)=>{
    try {

        //remove type
        await Model_.findOneAndRemove({_id:req.params.model__id});
        res.json({msg:'Model Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Model_.deleteMany({});

        res.json({msg:'all Models are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
