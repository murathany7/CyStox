import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link, Redirect, useParams } from 'react-router-dom';
import UserService from "../services/user.service";
import Card from "./Card";
import './chart.css'

export default function Home() {
  const [content, setcontent] = useState()
  const [gainers, setgainers] = useState([]);
  const [mostActive, setmostActive] = useState([])
  const [losers, setlosers] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));
  const [portfolio, setportfolio] = useState([])
  useEffect(() => {
    if (user) {
      axios.get("http://localhost:8080/api/test/search?username=" + user.username).then((aa) => { setportfolio(aa.data.symbols) })
    }

    fetch(`${process.env.REACT_APP_API}/market/list/gainers?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setgainers(result)
        })
    fetch(`${process.env.REACT_APP_API}/market/list/mostactive?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setmostActive(result)
        })
    fetch(`${process.env.REACT_APP_API}/market/list/losers?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setlosers(result)
        })
  }, [])

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  return (
    <div className="container">
      {portfolio.length > 0 && <div> <h1>Followed Stox</h1> <div style={{ display: "flex" }}> {
        portfolio.map(element => {
          const jss = { "symbol": element, "changePercent": "0." + getRandomInt(1000, 2000) }
          return <Card element={jss} />
        })
      }
      </div>
      </div>
      }

      <h1>Most Active</h1>
      <div style={{ display: "flex" }}>
        {mostActive.slice(0, 5).map((element) => {
          return <Card element={element} />
        })}
      </div>
      <div style={{ display: "flex" }}>
        {mostActive.slice(-5).map((element) => {
          return <Card element={element} />
        })}
      </div>
      <h1>Gainers</h1>
      <div style={{ display: "flex" }}>
        {gainers.slice(0, 5).map((element) => {
          return <Card element={element} />
        })}
      </div>
      <div style={{ display: "flex" }}>
        {gainers.slice(-5).map((element) => {
          return <Card element={element} />
        })}
      </div>
      <h1>Losers</h1>
      <div style={{ display: "flex" }}>
        {
          losers.slice(0, 5).map((element) => {
            return <Card element={element} />
          })}
      </div>
      <div style={{ display: "flex" }}>
        {losers.slice(-5).map((element) => {
          return <Card element={element} />
        })}
      </div>
    </div>
  )

}
