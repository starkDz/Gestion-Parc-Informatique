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
import FullScreenDialog from './FullDialog_AddArticles';
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
  }
}));


const New_Distribution = ({setAlert}) => {
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
    Types_M:[{}],
    Magasins:[{}],
    Services:[{}],
    num_document: '',
    code_type_doc: '',
    code_type_mouv: '',
    code_service_dist: '',
    code_service_anc:'',
    code_service_dest: '',
    matricule_per_sign: "/",
    matricule_per_use: "/",
    observation:"/",
    date:'',
    magasin:'',
    doc:'',
  });
  const cookie = new Cookies();
  const {
    Types,
    Types_M,
    Magasins,
    Services,
    num_document,
    code_type_doc,
    code_type_mouv,
    code_service_dist,
    code_service_anc,
    code_service_dest,
    matricule_per_sign,
    matricule_per_use,
    observation,
    magasin,
    doc,
    date
    } = formData;
  const onChange = e=> setFormData({
    ...formData,[e.target.name]:e.target.value
  });

  const fill_Type_D = async e =>{
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
  const fill_Type_M = async e =>{
    e.preventDefault();
    await axios
        .get('/api/type_mouvement')
        .then(response => {
          setFormData({
            ...formData,Types_M:response.data
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
const call = e => console.log(state.data);


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

  return (
    <div className={classes.root}>
    <Grid container spacing={1} justify='flex-start'>
      <Grid item md={12} xs={12} sm={12} lg={12}>
        <Grid container spacing={4} justify='flex-start'>
          <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
               error
               label="Numero du Document* (Obligatoire)"
               style={{ margin: 0 }}
               placeholder="Numero du Document"
               helperText=""
               fullWidth
               type="search"
               variant="outlined"
               name='num_document'
               value={num_document}
               onChange={e => onChange(e)}
             />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
               <InputLabel id="demo-simple-select-outlined-label-1">Type de Document</InputLabel>
               <Select
                 label="Type de Document"
                 name='code_type_doc'
                 value={code_type_doc}
                 onChange={e => onChange(e)}
                 onOpen={e => fill_Type_D(e)}
               >
               {Types.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}
               </Select>
             </FormControl>
         </Grid>
         <Grid item xs={12} sm={12} md={2} lg={2}>
           <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
              <InputLabel id="demo-simple-select-outlined-label-1">Type de Mouvement</InputLabel>
              <Select
                label="Type de Mouvement"
                name='code_type_mouv'
                value={code_type_mouv}
                onChange={e => onChange(e)}
                onOpen={e => fill_Type_M(e)}
              >
              {Types_M.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}

              </Select>
            </FormControl>
        </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                placeholder="YYYY-MM-DD"
               style={{ margin: 0 }}
               helperText=""
               fullWidth
               type="date"
               name='date'
               value={date}
               onChange={e => onChange(e)}
               variant="outlined"
             />
          </Grid>

        </Grid>
        <Grid container spacing={4} justify='left'>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
               <InputLabel id="demo-simple-select-outlined-label-1">Service distination</InputLabel>
               <Select
                 label="Service distination"
                 name='code_service_dist'
                 value={code_service_dist}
                 onChange={e => onChange(e)}
                 margin="normal"
                 variant="outlined"
                 onOpen={e => fill_Service(e)}
               >
               {Services.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}

               </Select>
             </FormControl>
         </Grid>
           <Grid item xs={12} sm={12} md={3} lg={4}>
             <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                <InputLabel id="demo-simple-select-outlined-label-1">Service de Destribution</InputLabel>
                <Select
                  label="Service de Destribution"
                  name='code_service_dest'
                  value={code_service_dest}
                  onChange={e => onChange(e)}
                  margin="normal"
                  variant="outlined"
                  onOpen={e => fill_Service(e)}
                >
                {Services.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}

                </Select>
              </FormControl>
          </Grid>
           <Grid item xs={12} sm={12} md={3} lg={4}>
           </Grid>
            <Grid item xs={12} sm={12} md={3} lg={4}>
              <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                 <InputLabel id="demo-simple-select-outlined-label-1">Ancienne Service</InputLabel>
                 <Select
                   label="Ancienne Service"
                   name='code_service_anc'
                   value={code_service_anc}
                   onChange={e => onChange(e)}
                   margin="normal"
                   variant="outlined"
                   onOpen={e => fill_Service(e)}
                 >
                 {Services.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}

                 </Select>
               </FormControl>
           </Grid>
          <Grid item xs={12} sm={12} md={3} lg={4}>
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
          <Grid item xs={12} sm={12} md={3} lg={4}>
          </Grid>
           <Grid item xs={12} sm={12} md={3} lg={4}>
               <TextField
                 label="La Personne qui utilise le materiel"
                style={{ margin: 0 }}
                placeholder="La Personne qui utilise le materiel"
                helperText=""
                fullWidth
                type="search"
                name='matricule_per_use'
                value={matricule_per_use}
                onChange={e => onChange(e)}
                variant="outlined"
              />
           </Grid>
            <Grid item xs={12} sm={12} md={3} lg={4}>
                <TextField
                  label="La Personne qui signe le document"
                 style={{ margin: 0 }}
                 placeholder="La Personne qui signe le document"
                 helperText=""
                 fullWidth
                 type="search"
                 name='matricule_per_sign'
                 value={matricule_per_sign}
                 onChange={e => onChange(e)}
                 variant="outlined"
               />
            </Grid>
             <Grid item xs={12} sm={12} md={3} lg={4}>
             </Grid>
             <Grid item xs={12} sm={12} md={3} lg={6}>
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
              <Grid item xs={12} sm={12} md={3} lg={6}>
              </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <MaterialTable
              icons={tableIcons}
              title="Liste des articles a distribuer"
              options={{
                exportButton: true,
                pageSize:5,
                pageSizeOptions:[5, 10, 20,50,100],
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
                      }, 600);
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
                      }, 600);
                    }),
                }}
              />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} >
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
                Ajouter le document
              </Button>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
      <FullScreenDialog />

    </div>
  );
}
New_Distribution.propTypes = {
  setAlert: PropTypes.func.isRequired
}
export default connect(null, {setAlert})(New_Distribution);
