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



const normalizePhone = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};




const normalizeDate = value => {
  if (!value) {
    return value;
  }

  if(value === '0000-00-00') return '';
  
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 4) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 4)}/${onlyNums.slice(4)}`;
  }
  return `${onlyNums.slice(0, 4)}/${onlyNums.slice(4, 6)}/${onlyNums.slice(6, 8)}`;
};




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


const normalizePhoneInternational = value => (value ? `+${value.replace(/[^\d]/g, '')}` : value);

const normalizeUSZip = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 5) {
    return onlyNums;
  }
  if (onlyNums.length <= 9) {
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5)}`;
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 9)}`;
};

const zipCodeText = isInternational => (isInternational ? 'Postal Code' : 'Zip code');




export { isServer, theme, managePosts, getFeaturedmedia, contentAppJSON, contentAppForm,
   errorAndLog, okAndLog, thousandsSeparatedAndFixed, normalizeExDate,
   normalizePhone, zipCodeText, normalizeUSZip, normalizePhoneInternational, normalizeDate };
