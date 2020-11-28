import React from "react";
import {
  Grid,
  Select,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CoolButton } from "../buttons";
import { addTour } from "../../actions";
import SectionIcon from "@material-ui/icons/CardTravel";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Form, reduxForm, Field, initialize } from "redux-form";
import { withRouter } from "react-router-dom";
import {
  required,
  email,
  length,
  format,
} from "redux-form-validators";
import { Link } from "react-router-dom";
import styles from './styles/tourAddForm';

//  var ImagePicker = require('react-native-image-picker');

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
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Input
        {...input}
        placeholder={placeholder}
        error={meta.touched && meta.error && true}
        multiline={true}
        rows={6}
        rowsMax={6}
        classes={classes}
        className={classes}
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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <Select
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(event)}
    children={children}
    {...custom}
  />
);

const validations = {
  email: [
    required({ msg: "Required" }),
    email(),
    format({
      width: /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail)\.com$/i,
      message: { defaultMessage: "Must use corporate email address" },
    }),
  ],
  name: [required({ msg: "Required" }), length({ min: 3 })],
  promotion: [required({ msg: "Required" }), length({ min: 10 })],
  description: [required({ msg: "Required" }), length({ min: 100 })],
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
    "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(gmail|aol|hotmail|yahoo|outlook|icloud|inbox|mail).com$"
  );
  if (regex.test(values.email)) {
    errors.email = "Must use corporate email address";
  }
  return errors;
};

class TourAddForm extends React.Component {
  state = { id_category: -1, guide: "Si" };
  handleChange = (event) => {
    this.setState({ guide: event.target.value });

    // alert(value)
  };
  realhandleSubmit = (data) => {
    // console.log("SHIT: ", data)
    data.id_category = this.state.id_category;
    this.props.addTour(data);
    this.props.history.push("/account");
  };

  componentWillMount() {
    const { id } = this.props.match.params;

    this.setState({ id_category: id });
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.container}>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.center}>
            <Form
              onSubmit={this.props.handleSubmit(
                this.realhandleSubmit.bind(this)
              )}
            >
              <Grid container spacing={4} style={{ paddingBottom: 40 }}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item>
                      <div style={{ display: "table", height: 40 }}>
                        <div
                          style={{
                            display: "table-cell",
                            verticalAlign: "middle",
                          }}
                        >
                          <Link to="/account" style={{ background: "#ffffff" }}>
                            <ArrowBack color="primary"></ArrowBack>
                          </Link>
                        </div>
                      </div>
                    </Grid>
                    <Grid item alignItems="baseline">
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.typographyText}
                      >
                        Tour Adding Form
                      </Typography>
                      <Grid container>
                        <Grid item xs={2}>
                          <div className={classes.hrBar} />
                        </Grid>
                        <Grid item xs={10}></Grid>
                      </Grid>

                      <Typography
                        variant="p"
                        component="p"
                        className={classes.typographyTextSmall}
                      >
                        Edit the content to display for the current Tour, you
                        can also customize the images on the right panel.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  alignItems="flex-start"
                  style={{ paddingTop: 0 }}
                >
                  <Grid container spacing={4}>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      alignItems="flex-start"
                      style={{ paddingTop: 10 }}
                    >
                      <Field
                        name="name"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="name"
                        component={renderTextField}
                        label="Name"
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      alignItems="flex-start"
                      style={{ paddingTop: 10 }}
                    >
                      <Field
                        name="general_description"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="general_description"
                        component={renderTextField}
                        label="General Description"
                        component={renderTextArea}
                        multiLine={true}
                        rows={6}
                      />
                    </Grid>

                    <Grid item xs={12} style={{ paddingTop: 10 }}>
                      <Field
                        name="full_description"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="full_description"
                        component={renderTextField}
                        label="Full Description"
                        component={renderTextArea}
                        multiLine={true}
                        rows={6}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{ paddingTop: 10, fontSize: 8 }}
                    >
                      <Field
                        name="modality"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="modality"
                        component={renderTextField}
                        label="Modality"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      style={{ paddingTop: 10, fontSize: 8 }}
                    >
                      <Field
                        name="how_long"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="how_long"
                        component={renderTextField}
                        label="Duration"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      style={{ paddingTop: 10, fontSize: 8 }}
                    >
                      <Field
                        name="pickup_time"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="pickup_time"
                        component={renderTextField}
                        label="Pick up Time"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={8}
                      style={{ paddingTop: 10, fontSize: 8 }}
                    >
                      <Field
                        name="languages"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="languages"
                        component={renderTextField}
                        label="Languages"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      md={4}
                      style={{ paddingTop: 25, fontSize: 8 }}
                      alignItems="baseline"
                    >
                      <Field
                        name="guide"
                        type="text"
                        fullWidth
                        autoComplete="guide"
                        component={renderSelectField}
                        label="Guide"
                        value={this.state.guide}
                        onChange={this.handleChange}
                      >
                        <MenuItem value="Si">
                          <p>Yes</p>
                        </MenuItem>
                        <MenuItem value="No">
                          <p>No</p>
                        </MenuItem>
                      </Field>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      md={12}
                      style={{ paddingTop: 10, fontSize: 8 }}
                    >
                      <Field
                        name="note"
                        margin="small"
                        type="text"
                        fullWidth
                        autoComplete="note"
                        component={renderTextField}
                        label="A Quick Note if Needed"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={4}
                  alignItems="flex-start"
                  style={{ paddingTop: 0 }}
                  align="right"
                  className={classes.rightOnMobile}
                >
                  <div
                    style={{
                      border: "1px #3577d4 solid",
                      height: 200,
                      width: 200,
                      borderRadius: 100,
                      display: "table",
                    }}
                  >
                    <div
                      style={{
                        margin: "auto",
                        display: "table-cell",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <SectionIcon
                        color="disabled"
                        style={{ fontSize: 80 }}
                      ></SectionIcon>
                    </div>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={12}
                  alignItems="flex-start"
                  style={{ paddingTop: 40, textAlign: "left" }}
                >
                  <CoolButton
                    height={56}
                    width={245}
                    fill={"#337ab7"}
                    color={"#ffffff"}
                  >
                    Save
                  </CoolButton>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tour: state.selectedTour,
    category: state.selectedCategory,
    initialValues: {
      guide: "Si",
    },
  };
};
export default connect(mapStateToProps, { initialize, addTour })(
  reduxForm({ form: "tourAddForm", validate })(
    withStyles(styles)(withRouter(TourAddForm))
  )
);
