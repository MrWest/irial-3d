import React from "react";
import { Grid, Link } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { reduxForm, initialize } from "redux-form";
import Typography from "@material-ui/core/Typography";
import CardSection from "../global/cardSection";
import {
  updateBillingInfo,
  createConnectedAccount,
  updateStripeAccountInfo,
  getStripeAccountLoginLink,
} from "../../actions";
import {
  fieldValidation,
  runFieldValidations,
} from "../../helpers/commonValidations";
import { isServer } from "../../apis/tools";
// Specify a string key:
// Don't do this though, your keys should most likely be stored in env variables
// and accessed via process.env.MY_SECRET_KEY
var key = "WILDWEST_COMPANY__KILLER-PRODUCTION_INC.__IRIAL-3D";

// Create an encryptor:
var encryptor = require("simple-encryptor")(key);

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
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
    expanded: "panel1",
    stripeToken: undefined,
    loginLink: undefined,
  };

  async componentDidMount() {
    const { profile } = this.props;
    if (!isServer && profile.stripe_account_id) {
      console.log("stripeAccountId", profile.stripe_account_id);
      // var stripeAccountIdEncrypted = encryptor.encrypt(profile.stripe_account_id);
      // console.log('stripeAccountIdEncrypted', encryptor.hmac(profile.stripe_account_id))
      var stripeAccountIdsummary = profile.stripe_account_id.replace(
        "acct_",
        ""
      );
      console.log("stripeAccountIdsummary", stripeAccountIdsummary);
      const linkInfo = await getStripeAccountLoginLink({
        id: profile.stripe_account_id,
        pid: profile.id,
        scaid: stripeAccountIdsummary,
      });
      console.log(linkInfo);
      this.setState({ loginLink: linkInfo.url });
    }
    // this.setState({ stripeToken: stripeExternalAccountId });
  }
  handlePanelChange = (panel) => {
    this.setState({ expanded: panel });
  };

  rhandleSubmit = async (data) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();
    // if(false) {
    const { updateBillingInfo, profile, stripeAccountId } = this.props;
    const { stripeToken } = this.state;
    console.log("stripeToken: ", data, stripeToken, stripeAccountId);
    await updateBillingInfo({ ...data, id: profile.id });

    if (!stripeAccountId && stripeToken) {
      const createdAccount = await createConnectedAccount({
        ...data,
        id: profile.id,
        external_account: stripeToken.id,
      });
      console.log("xxx1: ", createdAccount);

      if (createdAccount.id) {
        await updateStripeAccountInfo({
          id: profile.id,
          stripe_account_id: createdAccount.id,
          stripe_account_type: createdAccount.type,
        });
      }
    }
  };

  render() {
    const { expanded, loginLink } = this.state;
    const { classes, profile, stripe_account_status } = this.props;

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <p style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Billing
          </p>
          <hr style={{ height: 1, backgroundColor: "#999999" }} />
        </Grid>

        <Grid item xs={12} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <ExpansionPanel
            square
            expanded={expanded === "panel1"}
            onChange={() => this.handlePanelChange("panel1")}
          >
            <ExpansionPanelSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Deposit Method</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {/* <Form style={{ width: '100%', paddingBottom: 16 }} onSubmit={handleSubmit(this.rhandleSubmit)}> */}
              {/* <CommonForm international={country && country !== 'US'}/> */}
              <Grid container alignItems="flex-end" spacing={2}>
                <Grid item xs={8}>
                  <CardSection
                    onReady={(token) => this.setState({ stripeToken: token })}
                  />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Link
                    type="submit"
                    href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_HFjRgc6vCvDCBR6x5ghJisC6mOLPx4tp&scope=read_write&state=${profile.id}
                  &stripe_user[business_type]=individual&business_profile[mcc]=5815&stripe_user[business_name]=${profile.first_name}-${profile.last_name}&business_profile[name]=${profile.first_name}-${profile.last_name}
                  &stripe_user[url]=${profile.billing_professional_profile_url}&stripe_user[email]=${profile.email}&stripe_user[first_name]=${profile.first_name}
                  &stripe_user[last_name]=${profile.last_name}&business_profile[product_description]: Lumion models and projects
                  &business_profile[industry]: digital_products__other_digital_goods`}
                  >
                    <img
                      src="/static/images/public/blue-on-dark.png"
                      srcSet="/static/images/public/blue-on-dark.png 1x, /static/images/public/blue-on-dark@2x.png 2x,
                      /static/images/public/blue-on-dark@3x.png 3x"
                      alt="Connect Stripe"
                      className={classes.imageWASwagUp}
                    />
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  {stripe_account_status}
                  {/* <Button
                  className={classes.actionButton}
                  type="button"
                  style={{ background: '#daaaaa' }}
                  onClick={this.rhandleSubmit}
                >
                   {language.Delete}
                </Button> */}
                </Grid>
                <Grid item xs={4}>
                  <Link type="submit" href={loginLink}>
                    <img
                      src="/static/images/public/blue-on-dark.png"
                      srcSet="/static/images/public/blue-on-dark.png 1x, /static/images/public/blue-on-dark@2x.png 2x,
                      /static/images/public/blue-on-dark@3x.png 3x"
                      alt="Connect Stripe"
                      className={classes.imageWASwagUp}
                    />
                  </Link>
                  {/* <Button
                  className={(invalid || submitting || !stripeToken ) ? classes.actionButtonDisabled : classes.actionButton}
                  type="submit"
                  disabled={invalid || submitting || !stripeToken }
                >
                  {stripeAccountId? language.Save : language.Create}
                </Button> */}
                </Grid>
              </Grid>
              {/* </Form> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square
            expanded={expanded === "panel2"}
            onChange={() => this.handlePanelChange("panel2")}
          >
            <ExpansionPanelSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Invoice History</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
    width: "100%",
    fontFamily: "Delvon",
    fontSize: 22,
    letterSpacing: 2,
    fontStyle: "normal",
    color: "#ffffff",
    backgroundColor: "#1c5375",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#559cd9",
    },
  },
  actionIconDisabled: {
    color: "#5f5f5f",
  },
  actionButtonDisabled: {
    borderRadius: 4,
    height: 36,
    width: "100%",
    fontFamily: "Delvon",
    fontSize: 22,
    letterSpacing: 2,
    fontStyle: "normal",
    color: "#5f5f5f !important",
    backgroundColor: "#dedede",
    textTransform: "none",
    "&:hover": {
      cursor: "not-allowed !important",
    },
  },
  submitButton: {
    width: "282px",
    height: "56px",
    "& span": {
      fontFamily: "Delvon",
      fontSize: "16px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "4px",
    backgroundColor: "#1c5375",
  },
  imageWASwagUp: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: 36,
    objectFit: "contain",
  },
});

const mapStateTopProps = (state) => ({
  language: state.language,
  profile: state.profile,
  stripeAccountId: state.profile.stripe_account_id,
  country: state.profile.billing_country,
  initialValues: {
    first_name: state.profile.billing_first_name || state.profile.first_name,
    last_name: state.profile.billing_last_name || state.profile.last_name,
    phone_number:
      state.profile.billing_phone_number || state.profile.phone_number,
    email: state.profile.billing_email || state.profile.email,
    country: state.profile.billing_country || "US",
    address1: state.profile.billing_address1,
    address2: state.profile.billing_address2,
    state: state.profile.billing_state,
    city: state.profile.billing_city,
    zip: state.profile.billing_zip,
    billing_birth_day:
      state.profile.billing_birth_day !== "0000-00-00"
        ? state.profile.billing_birth_day
        : undefined,
    billing_pid_number: state.profile.billing_pid_number,
    billing_professional_profile_url:
      state.profile.billing_professional_profile_url,
  },
});

const validate = (values) => {
  const fieldsToValidate = [
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "address1",
    "city",
    "state",
    "zip",
    "billing_pid_number",
    "billing_birth_day",
    "billing_professional_profile_url",
  ];
  return runFieldValidations(fieldsToValidate, values, fieldValidation);
};

export default connect(mapStateTopProps, { initialize, updateBillingInfo })(
  reduxForm({ form: "DepositMethodForm", enableReinitialize: true, validate })(
    withStyles(styles)(Billing)
  )
);
