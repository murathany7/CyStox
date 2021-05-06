import React from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
function Card(props) {
  var firstHalf, secondHalf
  if (props.element.changePercent) {
    if (props.element.changePercent.toString().charAt(0) != '-') {
      firstHalf = props.element.changePercent.toString().slice(2, 4)
      secondHalf = props.element.changePercent.toString().slice(4, 6)
    } else {
      firstHalf = props.element.changePercent.toString().slice(3, 5)
      secondHalf = props.element.changePercent.toString().slice(5, 7)
    }

    return <div key={props.element.symbol} className={`card text-white ${parseFloat(props.element.changePercent.toString()) >= 0 ? "bg-success" : "bg-danger"} `} style={{ width: "25rem", margin: 10, paddingTop: 2, paddingBottom: 10, paddingTop: 10 }}>
      <Link onClick={props.onChildClick} style={{ color: 'white' }} to={"/chart/" + props.element.symbol}>
        <span style={{ float: 'left' }}>{props.element.symbol}</span>
        <span style={{ float: 'right' }}>{"%" + firstHalf + "." + secondHalf}</span>
      </Link>
    </div>
  } else {
    if (props.symbol) {

    } else {
      return <div></div>
    }
  }
}

export default Card
