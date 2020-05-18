import React from "react";
import {
  Grid,
  Radio,
  Select,
  FormControlLabel,
  Checkbox,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button
} from "@material-ui/core";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Form, reduxForm, Field, initialize } from "redux-form";
import Typography from '@material-ui/core/Typography';
import CardSection from '../global/cardSection';
import CommonForm from '../global/commonForm';
import { fieldValidation, runFieldValidations } from '../../helpers/commonValidations';
import { CustomWidthButton } from "../buttons";
// import CustomizedExpansionPanels from '../global/expansionPanels';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);


class Billing extends React.Component {
  state = {
    checkedB: true,
    method: "credit card",
    accType: "",
    modalOpen: false,
    expanded : 'panel1',
    stripeToken: undefined
  };

  handlePanelChange = (panel) => {
    this.setState({ expanded: panel });
  };

  handleChangeMethod = event => {
    this.setState({ method: event.target.value });
  };
  handleChangeAccount = event => {
    this.setState({ accType: event.target.value });
  };
  handleCloseModalPrivacy = () => {
    this.setState({ modalOpen: false });
  };
  handleOpenModalPrivacy = () => {
    this.setState({ modalOpen: true });
  };
  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { expanded } = this.state;
    const { pristine, classes, language } = this.props;
   
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <p style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Billing
          </p>
          <hr style={{ height: 1, backgroundColor: "#999999" }} />
        </Grid>

        <Grid item xs={12} style={{  paddingBottom: 0, paddingTop: 0 }}>
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={() => this.handlePanelChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Deposit Method</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Form style={{ width: '100%', paddingBottom: 16 }}>
           <CommonForm />
           <Grid container alignItems="flex-end"  spacing={2}>
             <Grid item xs={8}>
               <CardSection onReady={token => this.setState({ stripeToken: token })} />
             </Grid>
             <Grid item xs={8} />
             <Grid item xs={4}>
                <Button
                  className={pristine ? classes.actionButtonDisabled : classes.actionButton}
                  type="submit"
                  disabled={pristine}
                >
                  {language.Save}
                </Button>
             </Grid>
           </Grid>
          </Form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={() => this.handlePanelChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Invoice History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        </Grid>
     
      </Grid>
    );
  }
}


const styles = (theme) => ({
  actionButton: {
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#ffffff',
    backgroundColor: '#337ab7',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#559cd9'
    }
  },
  actionIconDisabled: {
    color: '#5f5f5f'
  },
  actionButtonDisabled: {
    borderRadius: 4,
    height: 36,
    width: '100%',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#5f5f5f !important',
    backgroundColor: '#dedede',
    textTransform: 'none',
    '&:hover': {
      cursor: 'default !important'
    }
  },
  submitButton: {
    width: '282px',
    height: '56px',
    '& span': {
      fontFamily: 'Futura',
      fontSize: '16px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    textAlign: 'center',
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#337ab7',
  },
});


const mapStateTopProps = (state) => ({
  language: state.language,
  initialValues: {
    shipping_country: 'US',
    shipping_address1: 'sdjksa sdjaklsl'
  }
});


const validate = values => {
  const fieldsToValidate = [
    'first_name',
    'last_name',
    'phone_number',
    'shipping_address1',
    'shipping_city',
    'shipping_state',
    'shipping_zip'
  ];
  return runFieldValidations(fieldsToValidate, values, fieldValidation);
};


export default reduxForm({ form: "depositMethodForm", enableReinitialize: true, validate })(connect(mapStateTopProps, {})(withStyles(styles)(Billing)));
