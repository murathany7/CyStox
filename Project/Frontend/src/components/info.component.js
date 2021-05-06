import React, { useEffect, useState } from "react";
import { LoopCircleLoading } from 'react-loadingg';
import News from './news.component.js'

export default function Quote(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const [error, seterror] = useState(null);
  const [quote, setQuote] = useState({});

  function getQuote() {
    fetch(`${process.env.REACT_APP_API}/${props.symbol}/quote?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setQuote({
            volume: result.volume,
            marketCap: result.marketCap,
            pe: result.peRatio,
            week52High: result.week52High,
            week52Low: result.week52Low,
            ytdChange: result.ytdChange.toFixed(2)
          });
          setisLoaded(true);
        },
        (error) => {
          setisLoaded(true);
          seterror(error)

        }
      )
  }

  useEffect(() => {
    getQuote();
    setisLoaded(true);
  }, [props.symbol]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div><LoopCircleLoading /></div>;
  } else {
    return (
      <div class="container">
	<div class="col" style={{paddingTop: 2, paddingBottom: 10}}>
	  <h5>Volume</h5>
	  <h4>{quote.volume}</h4>
	</div>
	<div class="col" style={{paddingTop: 2, paddingBottom: 10}}>
	  <h5>Market Cap</h5>
	  <h4>{quote.marketCap}</h4>
	</div>
	<div class="col" style={{paddingTop: 2, paddingBottom: 10}}>
	  <h5>Ratio</h5>
	  <h4>{quote.pe}</h4>
	</div>

	<div class="col" style={{paddingTop: 2, paddingBottom: 10}}>
	  <h5>Week High</h5>
	  <h4>{quote.week52High}</h4>
	</div>
	<div class="col" style={{paddingTop: 2, paddingBottom: 10}}>
	  <h5>Week Low</h5>
	  <h4>{quote.week52Low}</h4>
	</div>
	<div class="col" style={{paddingTop: 2, paddingBottom: 10}}>
	  <h5>YTD Change</h5>
	  <h4>{quote.ytdChange}</h4>
	</div>
      </div>
    );
  }
}
