const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Fournisseur = require('../../models/Fournisseur');
const User = require('../../models/User');


router.post('/',[auth,
    [
    check('name','Description is required')
    .not()
    .isEmpty(),
    check('address','address is required')
    .not()
    .isEmpty(),
    check('ville','ville is required')
    .not()
    .isEmpty(),
    check('telephone','telephone is required')
    .not()
    .isEmpty()
]
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

const {
    name,
    email,
    ville,
    address,
    bank_account,
    telephone,
    telephone2,
    fax,
    fax2,
    description,
    num_Ordre
}= req.body;

//Build type objects
const fournisseurFields = {};
fournisseurFields.owner = req.user.id;
if(name) fournisseurFields.name = name;
if(email) fournisseurFields.email = email;
if(ville) fournisseurFields.ville = ville;
if(address) fournisseurFields.address = address;
if(bank_account) fournisseurFields.bank_account = bank_account;
if(telephone) fournisseurFields.telephone = telephone;
if(telephone2) fournisseurFields.telephone2 = telephone2;
if(fax) fournisseurFields.fax = fax;
if(fax2) fournisseurFields.fax2 = fax2;
if(description) fournisseurFields.description = description;
if(num_Ordre) fournisseurFields.num_Ordre = num_Ordre;

try{
    fournisseur = new Fournisseur(fournisseurFields);
    await fournisseur.save()
    res.json(fournisseur);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const fournisseurs = await Fournisseur.find().populate('owner',['name']);
        res.json(fournisseurs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Delete Type
router.delete('/:fournisseur_id',auth,async (req,res)=>{
    try {

        //remove type
        await Fournisseur.findOneAndRemove({_id:req.params.fournisseur_id});
        res.json({msg:'fournisseur Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Fournisseur.deleteMany({});

        res.json({msg:'all fournisseurs are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
