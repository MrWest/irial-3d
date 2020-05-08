import { createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const theme = createMuiTheme({
  spacing: 4
});

const isServer = typeof window === 'undefined';

const managePosts = filtered => (filtered.length > 9 ? filtered.splice(0, 9) : filtered);
const getFeaturedmedia = post => {
  const media = post._embedded['wp:featuredmedia'];
  return media && media[0] ? media[0].source_url : '';
};


const okAndLog = (actionName, okStatus, data) => {
  console.log(`${actionName} Action - Exiting`);
  return { result: 'ok', status: okStatus, data };
};

const errorAndLog = (actionName, errorStatus, data) => {
  console.log(`${actionName} Action - error: ${errorStatus}, data: ${data}`);
  return { result: 'error', status: errorStatus };
};


const contentAppJSON = { 'Content-Type': 'application/json' };
const contentAppForm = { 'Content-Type': 'application/x-www-form-urlencoded' };

const addThousandsSeparator = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const thousandsSeparatedAndFixed = (value, decimals = 2) => addThousandsSeparator(parseFloat(value).toFixed(decimals));





const normalizeExDate = (value, prevValue) => {
  if (value) {
    const valueOnlyNumbers = value.replace(/[^\d]/g, '');
    const prevValueOnlyNumbers = prevValue && prevValue.replace(/[^\d]/g, '');

    if (valueOnlyNumbers !== prevValueOnlyNumbers) {
      const len = valueOnlyNumbers.length;
      const month = valueOnlyNumbers.slice(0, 2);
      if (len < 2) return `${month}`;
      if (len === 2) return `${month}/`;

      const year = valueOnlyNumbers.slice(2, 4);
      if (len <= 4) return `${month}/${year}`;
    }
  }
  return prevValue;
};



export { isServer, theme, managePosts, getFeaturedmedia, contentAppJSON, contentAppForm, errorAndLog, okAndLog, thousandsSeparatedAndFixed, normalizeExDate };
