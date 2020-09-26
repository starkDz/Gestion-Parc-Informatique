const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Article = require('../../models/Article');
const Document = require('../../models/Document');
const Document_Entre = require('../../models/Document_Entre');
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
     check('num_kit','numero de kit is required')
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
    type,
    model_,
    marque,
    categorie,
    color,
    qte_seuil,
    qte_globale_entre,
    mesure_unite,
    observation,
    annee_expiration,
    mode_consommation,
    description_Fr,
    description_Ar,
    num_kit,
    etat,
    num_serie,
    num_ref
}= req.body;

//Build profile objects
const articleFields = {};
articleFields.owner = req.user.id;
if(type) articleFields.type = type;
if(marque) articleFields.marque = marque;
if(categorie) articleFields.categorie = categorie;
if(color) articleFields.color = color;
if(qte_seuil) articleFields.qte_seuil = qte_seuil;
if(qte_globale_entre) articleFields.qte_globale_entre = qte_globale_entre;
if(mesure_unite) articleFields.mesure_unite = mesure_unite;
if(observation) articleFields.observation = observation;
if(etat) articleFields.etat = etat;
if(annee_expiration) articleFields.annee_expiration = annee_expiration;
if(model_) articleFields.model_ = model_;
if(mode_consommation) articleFields.mode_consommation = mode_consommation;
if(description_Fr) articleFields.description_Fr = description_Fr;
if(description_Ar) articleFields.description_Ar = description_Ar;
if(num_kit) articleFields.num_kit = num_kit;
if(num_serie) articleFields.num_serie = num_serie;
if(num_ref) articleFields.num_ref = num_ref;

try{
    let article = await Article.findOne({user:req.user.id});
    article = new Article(articleFields);
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
        const articles = await Article.find()
        .populate('owner',['name'])
        .populate('marque',['description_Fr'])
        .populate('categorie',['description_Fr'])
        .populate('mode_consommation',['description_Fr'])
        .populate('color',['description_Fr'])
        .populate('model_',['description_Fr'])
        .populate('etat',['description_Fr'])
        .populate('unite_mesure',['description_Fr'])
        .populate('type',['description_Fr']);
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/getCount',async (req,res)=>{
    try {
      const NumberArticle = await Article.count();
      const NumberDocument = await Document.count();
      const NumberDocument_Entre = await Document_Entre.count();

        res.json([NumberArticle,NumberDocument,NumberDocument_Entre]);
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
        await Article.findOneAndRemove({_id:req.params.article_id});

        res.json({msg:'Article Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/',auth,async (req,res)=>{
    try {

        //remove type
        await Article.deleteMany({});

        res.json({msg:'all Articles are Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
