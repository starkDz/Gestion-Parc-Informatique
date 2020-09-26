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
import { url } from '../../../../defaults/default';
import { setAlert } from '../../../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    constructor(props,{setAlert}) {
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
          Title:"Liste des types d'article"
        };
        this.DeleteThis = this.DeleteThis.bind(this);
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
    const res = await axios.delete('/api/type/'+id,{headers: {
      "Access-Control-Allow-Origin": "*",
      "x-auth-token":cookie.get('token'),
    }});
      this.setState({
        opensnack:true,
        type:"success",
        msg:"Suppression de cet element a ete effectuee avec Success ",
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
componentDidMount(){
    fetch(url+'/api/type')
    .then(response=>response.json())
    .then(res=>{
        this.setState({
            isLoaded:true,
            items:res,
            })
        }
        ,
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });

}
render(){
    const { error, isLoaded, items,Title,selectedRow,opensnack,msg,type} = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div><Loading_Item /></div>;
    } else {
        return (
          <div>
            <Snackbar open={opensnack} autoHideDuration={200} onClose={this.handleClose}>
              <Alert onClose={this.handleClose} severity={type}>
                {msg}
              </Alert>
            </Snackbar>
          <MaterialTable
            icons={tableIcons}
            title={Title}
            columns={[
              { title: 'Désignation Fr', field: 'description_Fr',width:"20%" },
              { title: 'Désignation Ar', field: 'description_Ar',width:"20%" },
              { title: 'Date de création', field: 'date_Cre',width:"25%" },
              { title: "Crée par l'utilisateur", field: 'owner.name',width:"25%"},
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
              pageSize:10,
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
};

export default Call_Api;
