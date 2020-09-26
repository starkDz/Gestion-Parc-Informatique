import React,{ forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Provider, connect } from 'react-redux';
import store from '../../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from '../../defaults/default';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Fab } from '@material-ui/core';
import Loading_Item from './Loading_Item';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import FullScreenDialog from './FullDialog';
axios.defaults.baseURL = url;
const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
    toolbar: theme.mixins.toolbar,
  button:{
    textTransform: "none",
  },
  fateh: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(18),

  }
}));


const Add_New_Entry = ({setAlert}) => {
  const [sizeTable, setSizeTable] = React.useState(5);
  const [state, setState] = React.useState({
    columns: [
      { title: "Type d'article", field: 'Type' ,width:"20%" },
      { title: "Qte d'entrer", field: 'qte_entre' ,type: 'numeric',width:"10%"},
      { title: 'Prix Unitaire', field: 'prix_unitaire' ,type: 'numeric' ,width:"10%"},
      { title: 'Date', field: 'date_Reception', width:"10%"},
      { title: 'Observation',field: 'observation',width:"50%" },
      { title: "id", field: 'article' ,width:"10%" },
    ],
    data:[]
  });
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    Types:[{}],
    Magasins:[{}],
    Services:[{}],
    article:[{}],
    ref_document_entr:'',
    date_doc:'',
    ville:'',
    code_type_doc:'',
    code_service:'',
    magasin:'',
    observation:'',
    code_doc:''
  });

  const cookie = new Cookies();
  const {
    Types,
    Magasins,
    Services,
    article,
    ref_document_entr,
    date_doc,
    ville,
    code_type_doc,
    code_service,
    magasin,
    observation,
    code_doc
  } = formData;
  const onChange = e=> setFormData({
    ...formData,[e.target.name]:e.target.value
  });
  const getData = (val,type) => {
      // do not forget to bind getData in constructor
      setState({
        ...state,data:state.data.concat([{
          Type: type,
          qte_entre:1,
          prix_unitaire: 1,
          date_Reception: '10/10/2020',
          observation: 'Observations',
          article: val,
        }])
      });
  }

  const fill_Type = async e =>{
    e.preventDefault();
    await axios
        .get('/api/type_document')
        .then(response => {
          setFormData({
            ...formData,Types:response.data
          });
        })
        .catch(error => console.log(error.response));
  }

  const fill_Magasin = async e =>{
    e.preventDefault();
    await axios
        .get('/api/magasinconf')
        .then(response => {
          setFormData({
            ...formData,Magasins:response.data
          });
      })
      .catch(error => console.log(error.response));
  }
const call = async e => {
  e.preventDefault();
  const element={
    ref_document_entr,
    date_doc,
    ville,
    code_type_doc,
    code_service,
    magasin,
    observation,
    article
  };

  try{
    const cookies=new Cookies();
    const body = JSON.stringify(element);
    console.log(body);
    const res = await axios.post('/api/document_entre',body,{headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "x-auth-token":cookies.get('token'),
    }});
  setAlert("Ajoute d'un nouveau element a ete effectue avec Success",'success');
}catch(err){
  setAlert(err.response.data.errors[0].msg,'error');
}
}


  const fill_Service = async e =>{
    e.preventDefault();
    await axios
        .get('/api/service')
        .then(response => {
          setFormData({
            ...formData,Services:response.data
          });
      })
      .catch(error => console.log(error.response));
  }

  const insert_Aricles = async e =>{
      e.preventDefault();
      const article=[];
      state.data.map(async option =>{
        try{
          const cookies=new Cookies();
          const body = JSON.stringify(option);
          const res = await axios.post('/api/article_entre_magasin',body,{headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "x-auth-token":cookies.get('token'),
          }});
          console.log(option);
          console.log(res.data._id);
          article.push(res.data._id);
        setAlert("Ajoute d'un nouveau element a ete effectue avec Success",'success');
      }catch(err){
        setAlert(err.response.data.errors[0].msg,'error');
      }});
      setFormData({
        ...formData,article:article
      });
  }

  return (
    <div className={classes.root}>
    <Grid container spacing={4} justify='center'>

      <Grid item xs={12} sm={12} md={9} lg={9} >

      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} >
          <Button
            style={{ margin: 0 }}
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SaveIcon/>}
            fullWidth
            size="large"
            onClick={e => call(e)}

          >
            Enrgistrer
          </Button>
      </Grid>
      <Grid item md={12} xs={12} sm={12} lg={12}>
        <Grid container spacing={4} justify='center'>
          <Grid item xs={12} sm={6} md={6} lg={4}>
              <TextField
               label="Reference du Document"
              style={{ margin: 0 }}
               placeholder="Reference du Document"
               helperText=""
               fullWidth
               type="search"
               variant="outlined"
               name='ref_document_entr'
               value={ref_document_entr}
               onChange={e => onChange(e)}
             />
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={4}>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
               <InputLabel id="demo-simple-select-outlined-label-1">Type de Document</InputLabel>
               <Select
                 label="Type de Document"
                 name='code_type_doc'
                 value={code_type_doc}
                 onChange={e => onChange(e)}
                 onOpen={e => fill_Type(e)}
               >
               {Types.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}

               </Select>
             </FormControl>
         </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
              <TextField
                placeholder="YYYY-MM-DD"
               style={{ margin: 0 }}
               helperText=""
               fullWidth
               type="date"
               name='date_doc'
               value={date_doc}
               onChange={e => onChange(e)}
               variant="outlined"
             />
          </Grid>

        </Grid>
        <Grid container spacing={4} justify='center'>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
               <InputLabel id="demo-simple-select-outlined-label-1">Service</InputLabel>
               <Select
                 label="Service"
                 name='code_service'
                 value={code_service}
                 onChange={e => onChange(e)}
                 variant="outlined"
                 onOpen={e => fill_Service(e)}
               >
               {Services.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}

               </Select>
             </FormControl>
         </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
               <InputLabel id="demo-simple-select-outlined-label">Magasin</InputLabel>
               <Select
                 label="Magasin"
                 name='magasin'
                 value={magasin}
                 onChange={e => onChange(e)}
                 onOpen={e => fill_Magasin(e)}
               >
               {Magasins.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}
               </Select>
             </FormControl>
         </Grid>
          <Grid item xs={12} sm={6} md={3} lg={4}>
              <TextField
                label="Observation"
               style={{ margin: 0 }}
               placeholder="Observation"
               helperText=""
               fullWidth
               type="search"
               name='observation'
               value={observation}
               onChange={e => onChange(e)}
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
               label="Document de Restitution"
              style={{ margin: 0 }}
               placeholder="XXXXX"
               helperText=""
               fullWidth
               disabled
               type="search"
               name='code_doc'
               value={code_doc}
               onChange={e => onChange(e)}

               variant="outlined"
             />
         </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} >
            <MaterialTable
              icons={tableIcons}
              title="Liste des articles reçu"
              options={{
                exportButton: true,
                pageSize:sizeTable,
                pageSizeOptions:[1,2,3,4,5,10,11,12,13,14,15, 20,50,100],
                headerStyle: {
                  backgroundColor: '#3f51b5',
                  color: '#FFF'
                }
              }}
                columns={state.columns}
                data={state.data}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 60);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 60);
                    }),
                }}
              />
          </Grid>


        </Grid>
        </Grid>
      </Grid>
      <FullScreenDialog sendData={getData}/>
        <Fab onClick={e => insert_Aricles(e)} variant="extended" color="primary"  aria-label="Valider" className={classes.fateh}>
          Valider la liste des article
          <SaveIcon/>
        </Fab>
    </div>
  );
}
Add_New_Entry.propTypes = {
  setAlert: PropTypes.func.isRequired
}
export default connect(null, {setAlert})(Add_New_Entry);
