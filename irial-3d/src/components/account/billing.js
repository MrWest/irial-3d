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
  FormHelperText
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Field } from "redux-form";
import wholestates from "../../apis/usStates";
import CardSection from '../global/cardSection';
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
          <div style={{ width: '100' }}>

           <CardSection onReady={token => this.setState({ stripeToken: token })} />
          </div>
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

export default Billing;
