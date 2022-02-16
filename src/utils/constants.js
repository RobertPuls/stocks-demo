// TODO: stick in a constants file
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
// TODO: add ability to change stock
export const STONKS_URL = `${PROXY_URL}https://query1.finance.yahoo.com/v8/finance/chart/GME`;

export const CHART_TYPE = 'candlestick';

export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
};

export const CHART_OPTIONS = {
  chart: {
    type: CHART_TYPE,
    height: 350,
  },
  title: {
    text: 'Stock Prices',
    align: 'center',
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    decimalsInFloat: 2,
    tickAmount: 6,
    forceNiceScale: true,
    tooltip: {
      enabled: true
    },
  },
};
