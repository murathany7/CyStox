import React, { useEffect, useState } from "react";
import { LoopCircleLoading } from 'react-loadingg';

export default function News(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const [error, seterror] = useState(null);
  const [news, setNews] = useState([]);

  function getNews() {
    fetch(`${process.env.REACT_APP_REAL_API}/${props.symbol}/news/last/4?token=${process.env.REACT_APP_REAL_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setNews(result);
        },
        (error) => {
          setisLoaded(true);
          seterror(error)
        }
      )
  }

  useEffect(() => {
    getNews();
    setisLoaded(true);
  }, [props.symbol]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div><LoopCircleLoading /></div>;
  } else {
    return (
      <div style={{ width: "250rem", paddingTop: 2, paddingBottom: 10, paddingTop: 10 }}>
        <h3>Related Articles:</h3>
        <div class="list-group">
          {news.slice().map((element) => {
            let date = Date(element.datetime).toString().split(" ");
            return (
              <a href={element.url} class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">{element.headline}</h6>
                  <small>{`${date[1]} ${date[2]}`}</small>
                </div>
                <p class="mb-1">{element.summary.substring(0, 255) + "..."}</p>
              </a>);
          }
          )}
        </div>
      </div>
    );
  }
}
