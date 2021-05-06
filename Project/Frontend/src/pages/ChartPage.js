import Chart from '../components/Chart'
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Card from '../components/Card.js'
import Info from '../components/info.component.js'
import News from '../components/news.component.js'
import './Cards.css'
import axios from 'axios';

function ChartPage(props) {

  const [curSelection, setcurSelection] = useState("intraday-prices");
  const { sym } = useParams();
  const [symbol, setsymbol] = useState(sym);
  const [gainers, setgainers] = useState([]);
  const [followed, setfollowed] = useState(true)
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/market/list/mostActive?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setgainers(result)
          console.log(result)
        })

  }, [])
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: 50 }}>{symbol}</h1>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <button className={followed ? "btn btn-success" : "btn btn-danger"} style={{ margin: 10, display: 'flex', justifyContent: 'center' }} onClick={() => {
          axios.post("http://localhost:8080/api/test/follow", { "username": user.username, "symbol": symbol });
          setfollowed(!followed);
        }} >
          {followed ? "Follow this stock" : "Followed"}
        </button>
      </div>
      <Chart symbol={symbol} curSelection={curSelection} />
      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={() => setcurSelection("chart/ytd")}>YTD</button>
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={() => setcurSelection("chart/2y")}>2 year</button>
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={() => setcurSelection("chart/5y")}>5 year</button>
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={() => setcurSelection("chart/1y")}>1 year</button>
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={() => setcurSelection("chart/1m")}>1 month</button>
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={() => setcurSelection("chart/6m")}>6 month</button>
      </div>
      <div style={{ display: "flex", justifyContent: 'center' }}>

        <div>
          <Info symbol={symbol} />
        </div>
        <News symbol={symbol} />
      </div>

      <h1 style={{ textAlign: "center" }}>Check out these stocks too!</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {gainers.slice(0, 5).map((element) => {
          return <Card element={element} onChildClick={() => setsymbol(element.symbol)} />
        })}
      </div>
      <div style={{ display: "flex", justifyContent: 'center' }}>
        {gainers.slice(-5).map((element) => {
          return <Card element={element} onChildClick={() => setsymbol(element.symbol)} />
        })}
      </div>
    </div>
  )
}

export default ChartPage
