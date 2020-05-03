import { createMuiTheme } from '@material-ui/core/styles';

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

export { isServer, theme, managePosts, getFeaturedmedia, contentAppJSON, contentAppForm, errorAndLog, okAndLog, thousandsSeparatedAndFixed };
