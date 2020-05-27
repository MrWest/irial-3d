import React, { useState } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { normalizePhone, zipCodeText, normalizeUSZip, normalizePhoneInternational, normalizeDate } from '../../helpers/utils';
import { ReduxTextField, ReduxSelectField } from '../global/reduxFormFields';
import usaStates from '../../apis/usStates';
import countries from '../../apis/countries';


const InfoForm = ({ international }) => {
  
  const [isInternational, setIsInternational] = useState(international);
  const handleCountryChanged = ({target: {value }}) => setIsInternational( value !== 'US');
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <Field
        name="first_name"
        fullWidth
        placeholder="First name"
        label="First name"
        component={ReduxTextField}
        type="text"
        autoComplete="first_name"
        margin="small"
      />
    </Grid>
    <Grid item xs={4}>
      <Field
        name="last_name"
        fullWidth
        placeholder="Last name"
        label="Last name"
        component={ReduxTextField}
        type="text"
        autoComplete="last_name"
        margin="small"
      />
    </Grid>
      <Grid item xs={4}>
        <Field
          name="email"
          fullWidth
          placeholder="Email address"
          label="Email address"
          component={ReduxTextField}
          type="email"
          autoComplete="email"
          margin="small"
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name="country"
          label="Country"
          component={ReduxSelectField}
          defaultValue="US"
          onSelectChange={handleCountryChanged}
        >
          {countries &&
            countries.map(country => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
        </Field>
      </Grid>
      <Grid item xs={6}>
        {isInternational ? (
          <Field
            name="state"
            fullWidth
            placeholder="State / Province / Region"
            component={ReduxTextField}
            autoComplete="name"
            htmlFor="text"
            margin="small"
          />
        ) : (
          <Field name="state" fullWidth label="State" component={ReduxSelectField} >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {usaStates.map(st => (
              <MenuItem key={st.abbreviation} value={st.abbreviation}>
                {st.name}
              </MenuItem>
            ))}
          </Field>
        )}
      </Grid>
      <Grid item xs={6}>
        <Field
          name="city"
          fullWidth
          placeholder="City"
          label="City"
          component={ReduxTextField}
          type="text"
          autoComplete="city"
          margin="small"
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name="zip"
          fullWidth
          placeholder={zipCodeText(isInternational)}
          label={zipCodeText(isInternational)}
          component={ReduxTextField}
          normalize={isInternational ? undefined : normalizeUSZip}
          type="text"
          autoComplete="zip"
          margin="small"
        />
      </Grid>
      <Grid item xs={8}>
        <Field
          name="address1"
          fullWidth
          placeholder="Address"
          label="Address"
          component={ReduxTextField}
          type="text"
          autoComplete="address1"
          margin="small"
        />
      </Grid>
      <Grid item xs={4}>
        <Field
          name="address2"
          fullWidth
          placeholder="Floor, suite, unit (optional)"
          label="Floor, suite, unit (optional)"
          component={ReduxTextField}
          type="text"
          autoComplete="address2"
          margin="small"
        />
      </Grid>
      <Grid item xs={4}>
        <Field
          name="phone_number"
          fullWidth
          placeholder="Phone number"
          label="Phone number"
          component={ReduxTextField}
          normalize={isInternational ? normalizePhoneInternational : normalizePhone}
          type="text"
          autoComplete="phone_number"
          margin="small"
        />
      </Grid>
      <Grid item xs={4}>
        <Field
          name="billing_birth_day"
          fullWidth
          placeholder="YYYY/MM/DD"
          label="Birth day"
          component={ReduxTextField}
          normalize={normalizeDate}
          type="email"
          autoComplete="billing_birth_day"
          margin="small"
        />
      </Grid>
      <Grid item xs={4}>
        <Field
          name="billing_pid_number"
          fullWidth
          placeholder={`${isInternational ? "Personal Id number" : "Last 4 digits"}`}
          label={`${isInternational ? "Personal Id number" : "Last 4 digits of your SSN"}`}
          component={ReduxTextField}
          normalize={value => value.replace(/[^\d]/g, '')}
          // validate={value => !isInternational && value && value.length === 4 ? undefined : isInternational ? undefined : ma}
          type="text"
          autoComplete="billing_pid_number"
          margin="small"
        />
      </Grid>
      
      <Grid item xs={12}>
        <Field
          name="billing_professional_profile_url"
          fullWidth
          placeholder="Professional profile url"
          label="Professional profile url (LinkedIn profile url, or personal web site, or blog)"
          component={ReduxTextField}
          type="text"
          autoComplete="billing_professional_profile_url"
          validate={value => /^[\x00-\x7F]+$/.test(value)? undefined : 'Url contains invalid characters'}
          margin="small"
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  sizes: state.sizes,
  countries: state.countries
});
export default connect(mapStateToProps)(InfoForm);
