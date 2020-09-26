import React,{Component} from 'react';
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
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from '../../defaults/default';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
class Call_Api extends Component {
    constructor(props) {
      super();
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          secondary:false,
          dense:false,
          type:"success",
          selectedRow: null,
          opensnack:false,
          msg:"Suppression a ete fait avec success",
          Title:"Liste des articles",
          a:null
        };

        this.DeleteThis = this.DeleteThis.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }


handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          this.setState({
              opensnack:false,
            });
        };
async DeleteThis(id,index){
  try{
    const cookie=new Cookies();
    const res = await axios.delete(url+'/api/article/'+id,{headers: {
      "Access-Control-Allow-Origin": "*",
      "x-auth-token":cookie.get('token'),
    }});
      this.setState({
        opensnack:true,
        type:"success",
        msg:"Suppression a ete fait avec Success ",
      });
      const { items } = this.state;
      items.splice(index, 1);
      this.setState({ items });
  }catch{
      this.setState({
        opensnack:true,
        type:"error",
        msg:"Erreur lors de la suppression",
      });
    }
      }
async componentDidMount(){
    fetch(url+'/api/article')
    .then(response=>response.json())
    .then(res=>{
        this.setState({
            isLoaded:true,
            items:res,
          });

        }
        ,
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });

        localStorage.clear();
        const cookies = new Cookies();
        await axios
            .get('/api/marque')
            .then(response => {
              const marque = JSON.stringify(response.data);
              localStorage.setItem('marques', marque);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/model_')
            .then(response => {
              const model = JSON.stringify(response.data);
              localStorage.setItem('model', model);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/categorie')
            .then(response => {
              const categorie = JSON.stringify(response.data);
              localStorage.setItem('categorie', categorie);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/type')
            .then(response => {
              const type = JSON.stringify(response.data);
              localStorage.setItem('type', type);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/mode_consommation')
            .then(response => {
              const mode_consommation = JSON.stringify(response.data);
              localStorage.setItem('mode_consommation', mode_consommation);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/etat')
            .then(response => {
              const etat = JSON.stringify(response.data);
              localStorage.setItem('etat', etat);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/color')
            .then(response => {
              const couleur = JSON.stringify(response.data);
              localStorage.setItem('couleur', couleur);
                })
                .catch(error => console.log(error.response));
        await axios
            .get('/api/sns_serie')
            .then(response => {
              const sns_serie = JSON.stringify(response.data);
              localStorage.setItem('sns_serie', sns_serie);
            })
            .catch(error => console.log(error.response));
        await axios
            .get('/api/sns_ref')
            .then(response => {
              const sans_ref = JSON.stringify(response.data);
              localStorage.setItem('sns_ref', sans_ref);
            })
            .catch(error => console.log(error.response));
      }

render(){
    const { error, isLoaded, items,Title ,selectedRow,opensnack,msg,type} = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div><Loading_Item /></div>;
    } else {
        return (
          <div>
            <Snackbar open={opensnack} autoHideDuration={2000} onClose={this.handleClose}>
              <Alert onClose={this.handleClose} severity={type}>
                {msg}
              </Alert>
            </Snackbar>
          <MaterialTable
            icons={tableIcons}
            title={Title}
            columns={[
              { title: "Type d'article", field: 'type.description_Fr',width:"20%" },
              { title: 'Marque', field: 'marque.description_Fr',width:"10%" },
              { title: 'Catégorie', field: 'categorie.description_Fr',width:"10%" },
              { title: 'Observation', field: 'observation',width:"20%" },
              { title: 'Num série', field: 'num_serie',width:"15%" },
              { title: 'Etat', field: 'etat.description_Fr' ,width:"10%"},
              { title: 'Crée par', field: 'owner.name',width:"10%" },
            ]}
            data={items}
            actions={[
              {
                icon: () => <EditIcon color='primary'/>,
                tooltip: 'Edit User',
                onClick: (event, rowData) => alert("You saved " + rowData._id)
              },
              {
                icon:  () => <DeleteIcon color='secondary' />,
                tooltip: 'Delete User',
                onClick: (event,rowData) => this.DeleteThis(rowData._id,rowData.tableData.id)
              }
            ]}
            onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
            options={{
              exportButton: true,
              pageSize:20,
              pageSizeOptions:[5, 10, 20,50,100],
              sorting:true,
              filtering: true,
              grouping: true,
              rowStyle:true,
              rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
              }),
              headerStyle: {
                backgroundColor: '#3f51b5',
                color: '#FFF'
              }
            }}
          />
        </div>
        );
        }
    }
}

export default Call_Api;
