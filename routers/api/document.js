const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Document = require('../../models/Document');
//@route GET api/profile/me
//@desc  current user s router
//@route private
/*
router.get('/me',auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user : req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }
});
*/
//@route GET api/profile
//@desc create or update user profile
//@route private

router.post('/',[auth,
    [
    check('num_document','num_document is required')
    .not()
    .isEmpty()
]
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('Her We go');
        return res.status(400).json({ errors: errors.array()});
    }
const {
    code_service_dist,
    code_service_anc,
    code_service_dest,
    code_type_doc,
    code_type_mouv,
    num_document,
    observation,
    matricule_per_sign,
    matricule_per_use,
    liste_article_supp,
    liste_article
}= req.body;

//Build profile objects
const Fields = {};
Fields.owner = req.user.id;
if(code_service_dist) Fields.code_service_dist = code_service_dist;
if(code_service_anc) Fields.code_service_anc = code_service_anc;
if(code_service_dest) Fields.code_service_dest = code_service_dest;
if(code_type_doc) Fields.code_type_doc = code_type_doc;
if(code_type_mouv) Fields.code_type_mouv = code_type_mouv;
if(num_document) Fields.num_document = num_document;
if(observation) Fields.observation = observation;
if(matricule_per_sign) Fields.matricule_per_sign = matricule_per_sign;
if(matricule_per_use) Fields.matricule_per_use = matricule_per_use;
if(liste_article_supp){
    Fields.liste_article_supp = liste_article_supp.split(',').map(liste_article_supp =>liste_article_supp.trim());
}
if(liste_article){
    Fields.liste_article = liste_article.split(',').map(liste_article =>liste_article.trim());
}

try{
    let article = await Document.findOne({user:req.user.id});
    article = new Document(Fields);
    await article.save()
    res.json(article);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

// Get all profiles Public

router.get('/',async (req,res)=>{
    try {
        const articles = await Document.find().populate('owner',['name'])
        .populate('code_type_doc',['description_Fr'])
        .populate('code_type_mouv',['description_Fr'])
        .populate('code_service_dest',['description_Fr']).lean();
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all profiles Public

router.get('/:id',async (req,res)=>{
    try {
        const articles = await Document.findOne({_id:req.params.id}).populate('owner',['name'])
        .populate('code_type_doc',['description_Fr'])
        .populate('code_type_mouv',['description_Fr'])
        .populate('code_service_anc',['description_Fr'])
        .populate('code_service_dist',['description_Fr'])
        .populate('code_service_dest',['description_Fr']);
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//Get Proofile with User Id
/*
router.get('/:article_id',async (req,res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id }).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.status(500).send('Server Error');
    }
});

*/
//Delete User, profile and posts      api/profile   private
router.delete('/:article_id',auth,async (req,res)=>{
    try {

        //remove type
        await Document.findOneAndRemove({_id:req.params.article_id});

        res.json({msg:'Document Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Document.deleteMany({});

        res.json({msg:'all Documents are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
