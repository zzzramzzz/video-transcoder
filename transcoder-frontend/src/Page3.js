import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page3() {
  const [data, setData] = useState({ keys: [], baseUrl: "" });
  const [info, setInfo] = useState(null);

  const fetchData = () => {
    setInfo("Fetching Data...");
    axios
      .get("")
      .then((response) => {
        setInfo("");
        setData(response.data);
      })
      .catch((ex) => setInfo(ex.message));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setInfo("");
    }, 3000);
  }, [info]);
  return (
    <div
      style={{
        padding: "50px",
        borderRadius: "20px",

        background: "white",
        color: "purple",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Converted videos</h1>
      {info && <h3>{info}</h3>}
      {data.keys.map((item) => {
        const nameArray = item.split("/");
        const name = nameArray[nameArray.length - 1];

        return (
          <a href={data.baseUrl + item} target="_blank">
            {" "}
            <button> {name.substr(0, name.length - 17)}.mp4</button>{" "}
          </a>
        );
      })}
    </div>
  );
}
