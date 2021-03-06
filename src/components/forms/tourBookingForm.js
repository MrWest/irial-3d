import React, { Fragment } from "react";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CoolButton } from "../buttons";
import { Form, reduxForm, Field, initialize } from "redux-form";
import { required, email, length, numericality } from "redux-form-validators";
import { sendEmail } from "../../actions";

const renderTextField = ({ input, label, placeholder, classes, meta }) => {
  return (
    <FormControl fullWidth className="">
      <InputLabel>{label}</InputLabel>
      <Input
        {...input}
        error={meta.touched && meta.error && true}
        placeholder={placeholder}
      />
      {renderError(meta)}
    </FormControl>
  );
};

const renderTextArea = ({ input, label, placeholder, classes, meta }) => {
  return (
    <FormControl fullWidth className="">
      <InputLabel>{label}</InputLabel>
      <Input
        {...input}
        placeholder={placeholder}
        error={meta.touched && meta.error && true}
        multiline={true}
        rows={6}
        rowsMax={4}
      />

      {renderError(meta)}
    </FormControl>
  );
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <FormHelperText id="component-error-text" style={{ color: "#f44336" }}>
        {error}
      </FormHelperText>
    );
  }
};

const renderDateField = ({ input, label, placeholder, classes, meta }) => {
  return (
    <Fragment fullWidth className="">
      <div>
        <InputLabel>{label}</InputLabel>
      </div>
      <Input
        {...input}
        fullWidth
        error={meta.touched && meta.error && true}
        type="date"
        placeholder={"placeholder"}
      />
      {renderError(meta)}
    </Fragment>
  );
};

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 8,
    paddingBottom: 8,
    background: "transparent",
  },
  orderButton: {
    background: "#ffffff",
    color: "#3577D4",
    fontWeight: "bold",
    width: "100%",
  },
  orderBottomButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "100%",
    fontWeight: "bold",
    marginTop: 20,
  },
  hrBar: {
    background: "#e4e400",
    borderColor: "#337ab7",
    color: "#337ab7 !important",
    marginTop: 20,
    marginBottom: 20,
    height: 3,
    width: "100%",
    textAlign: "left !important",
  },
  typographyText: {
    color: "#337ab7 !important",
    textAlign: "left !important",
    fontWeight: "bold",
  },
  typographyTextSmall: {
    marginBottom: 10,
    textAlign: "left !important",
    fontSize: 14,
  },
});

const validations = {
  date: [required({ msg: "Required" })],
  persons: [
    required({ msg: "Required" }),
    numericality({
      int: true,
      message: "Must be a number",
    }),
  ],

  email: [required({ msg: "Required" }), email()],
  first_name: [required({ msg: "Required" }), length({ min: 3 })],
};

// Reusable with any other form
const validate = (values) => {
  const errors = {};
  for (let field in validations) {
    let value = values[field];
    errors[field] = validations[field]
      .map((validateField) => {
        return validateField(value, values);
      })
      .find((x) => x);
  }
  let regex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(xxx|zzz).com$"
  );
  if (regex.test(values.email)) {
    errors.email = "Must use corporate email address";
  }
  return errors;
};

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
  };
}

class TourBookingForm extends React.Component {
  state = { emailStatus: undefined, isSending: false };

  realhandleSubmit = async (data) => {
    if (data) {
      this.setState({ isSending: true });
      data.service = this.props.tour.name + " Booking";

      const { change } = this.props;
      this.props
        .sendEmail(data)
        .then((rslt) => {
          this.setState({ emailStatus: rslt.data, isSending: false });

          change("first_name", undefined);
          change("email", undefined);
          change("date", undefined);
          change("persons", undefined);
          change("subject", undefined);
          change("message", undefined);
        })
        .catch((e) => {
          this.setState({ emailStatus: e.message, isSending: false });

          change("first_name", undefined);
          change("email", undefined);
          change("date", undefined);
          change("persons", undefined);
          change("subject", undefined);
          change("message", undefined);
        });
    }
  };

  render() {
    const { pristine, reset, submitting, classes, tour } = this.props;
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.realhandleSubmit.bind(this))}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h3"
              className={classes.typographyText}
            >
              {this.props.language.BookIt}
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <div className={classes.hrBar} />
              </Grid>
              <Grid item xs={10}></Grid>
            </Grid>

            <p className={classes.typographyTextSmall}>
              {this.props.language.LodgingsBookingText.format(tour.name)}
            </p>
          </Grid>
          <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 0 }}>
            <Field
              name="first_name"
              margin="small"
              type="text"
              fullWidth
              autoFocus={false}
              autoComplete="first_name"
              component={renderTextField}
              label={this.props.language.Name}
            />
          </Grid>

          <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 0 }}>
            <Field
              name="email"
              margin="small"
              type="email"
              fullWidth
              autoFocus={false}
              autoComplete="email"
              component={renderTextField}
              label={this.props.language.ContactEmail}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            alignItems="flex-start"
            style={{ paddingTop: 0 }}
          >
            {/* <Field name="date" component={DatePicker} format={null} hintText={this.props.language.Date}/> */}
            <Field
              name="date"
              margin="small"
              fullWidth
              autoFocus={false}
              autoComplete="date"
              type="date"
              component={renderDateField}
              label={this.props.language.Date}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            alignItems="flex-start"
            style={{ paddingTop: 0 }}
          >
            <Field
              name="persons"
              margin="small"
              fullWidth
              autoFocus={false}
              autoComplete="persons"
              type="number"
              component={renderTextField}
              label={this.props.language.NumberOfPeople}
            />
          </Grid>
          <Grid item xs={12} alignItems="flex-start" style={{ paddingTop: 0 }}>
            <Field
              name="message"
              component={renderTextArea}
              margin="small"
              fullWidth
              autoFocus={false}
              type="text"
              label={this.props.language.AnythigElse}
              multiLine={true}
              rows={4}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: 0, minHeight: 36 }}>
            {this.state.emailStatus && (
              <p
                style={{
                  color:
                    this.state.emailStatus ===
                    "Your message was sent successfully!"
                      ? "#3aa53a"
                      : "#f44336",
                }}
              >
                {this.state.emailStatus}
              </p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="flex-start"
            style={{ paddingTop: 10, textAlign: "left" }}
          >
            <CoolButton
              height={56}
              width={245}
              fill={"#337ab7"}
              color={"#ffffff"}
              disabled={pristine}
            >
              {this.state.isSending
                ? this.props.language.Sending
                : this.props.language.Send}
            </CoolButton>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};
export default connect(mapStateToProps, { initialize, sendEmail })(
  reduxForm({ form: "tourBookingForm", enableReinitialize: true, validate })(
    withStyles(styles)(TourBookingForm)
  )
);
