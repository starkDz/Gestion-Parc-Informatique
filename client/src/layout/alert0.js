import React from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import DescriptionAlerts from './AlertComponent0';

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert =>(
<DescriptionAlerts type={alert.alertType} msg={alert.msg} id={alert.id}/>
))

Alert.prpTypes = {
  alerts : PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  alerts: state.alert
})
export default connect(mapStateToProps)(Alert);
