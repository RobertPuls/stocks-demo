import { useEffect, useState, useMemo } from 'react'
import Chart from 'react-apexcharts'
import { roundToCents, toDateFormat } from './utils/helpers';
import { fetchStonks } from './utils/fetcher'
import { usePrevious } from './utils/hooks'
import { DIRECTION, CHART_OPTIONS, CHART_TYPE } from './utils/constants';

const getSeries = (stock) => {
  const {open, high, low, close} = stock.indicators.quote[0];
  return stock.timestamp.map((timestamp, index) => ({
    x: toDateFormat(timestamp),
    y: [open[index], high[index], low[index], close[index]].map(roundToCents),
  }));
};

const App = () => {
  const [series, setSeries] = useState([{data: []}]);
  const [curPrice, setCurPrice] = useState(-1);
  const [curTime, setCurTime] = useState(new Date());
  const prevPrice = usePrevious(curPrice);

  const priceDirection = useMemo(() => (
    prevPrice < curPrice ? DIRECTION.UP :
    prevPrice > curPrice ? DIRECTION.DOWN :
    ''
  ),[curPrice, prevPrice]);

  useEffect(() => {
    let timeoutId;

    const refreshPrice = async () => {
      try {
        const data = await fetchStonks();
        const GME = data.chart.result[0];
        setSeries([{data: getSeries(GME)}]);
        setCurTime(toDateFormat(GME.meta.regularMarketTime));
        setCurPrice(roundToCents(GME.meta.regularMarketPrice));
        // Use if rate limited
        // setCurPrice((Math.random() * 100).toFixed(2));
      } catch (error) {
        console.log(error);
      };
      // Using setTimeout instead of setInterval because we want to wait 5 sec after the response comes back.
      // setInterval would run the function every 10 sec regardless of when the res comes back creating a race condition
      timeoutId = setTimeout(refreshPrice, 10000);
    };

    refreshPrice();

    // Clean up. Removes timeout when the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className='container'>
      {/* TODO make stock name changeable */}
      <div className='Name'>GME</div>
      <div className={`price ${priceDirection}`}>{'$' + curPrice}</div>
      <div className='time'>{curTime.toLocaleString()}</div>
      <Chart options={CHART_OPTIONS} series={series} type={CHART_TYPE} width='100%' height='100%' />
    </div>
  );
}

export default App;
