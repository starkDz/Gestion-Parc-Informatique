const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Categorie = require('../../models/Categorie');
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
const categorieFields = {};
categorieFields.owner = req.user.id;
if(description_Ar) categorieFields.description_Ar = description_Ar;
if(description_Fr) categorieFields.description_Fr = description_Fr;
if(num_Ordre) categorieFields.num_Ordre = num_Ordre;


try{
    categorie = new Categorie(categorieFields);
    await categorie.save()
    res.json(categorie);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const categories = await Categorie.find().populate('owner',['name']);
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:categorie_id',auth,async (req,res)=>{
    try {

        //remove type
        await Categorie.findOneAndRemove({_id:req.params.categorie_id});
        res.json({msg:'Categorie Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Categorie.deleteMany({});

        res.json({msg:'all Categories are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
