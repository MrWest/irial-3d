import React from "react";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CoolButton } from "../buttons";
import { getSection, updateSection } from "../../actions";
import SectionIcon from "@material-ui/icons/School";
import { withRouter } from "react-router-dom";
import { Form, reduxForm, Field, initialize } from "redux-form";
import { required, email, length, format } from "redux-form-validators";
import styles from "./styles/sectionEditForm";

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
        rowsMax={6}
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

class SectionEditForm extends React.Component {
  realhandleSubmit = (data) => {
    data.id = this.props.section.id;
    this.props.updateSection(data);
    this.props.history.push("/account");
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getSection(id);
  }

  render() {
    const { pristine, name, general, classes } = this.props;
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
                <Grid container style={{ paddingLeft: 18 }}>
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
                  <Grid item>
                    <Typography
                      variant="h4"
                      component="h4"
                      className={classes.typographyText}
                    >
                      Section Edit Form
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2}>
                      <div className={classes.hrBar} />
                    </Grid>
                    {/* <Grid item xs={10}></Grid> */}
                  </Grid>

                  <Typography
                    variant="p"
                    component="p"
                    className={classes.typographyTextSmall}
                  >
                    Edit the content to display for the current Section, you can
                    also customize the images on the right panel.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  alignItems="flex-start"
                  style={{ paddingTop: 0 }}
                >
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
                    md={10}
                    alignItems="flex-start"
                    style={{ paddingTop: 10 }}
                  >
                    <Field
                      name="promotion"
                      margin="small"
                      type="text"
                      fullWidth
                      autoComplete="promotion"
                      component={renderTextField}
                      label="Promotion"
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    alignItems="flex-start"
                    style={{ paddingTop: 10 }}
                  >
                    <Field
                      name="description"
                      component={renderTextArea}
                      margin="small"
                      fullWidth
                      type="text"
                      label="Description"
                      multiLine={true}
                      rows={4}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  alignItems="flex-start"
                  style={{ paddingTop: 0 }}
                  align="center"
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
    section: state.selectedSection,
    initialValues: {
      name: state.selectedSection.name,
      description: state.selectedSection.description,
      promotion: state.selectedSection.promotion,
    },
  };
};
export default connect(mapStateToProps, {
  initialize,
  getSection,
  updateSection,
})(
  reduxForm({ form: "sectionEditForm", enableReinitialize: true, validate })(
    withStyles(styles)(withRouter(SectionEditForm))
  )
);
