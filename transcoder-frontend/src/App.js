import React from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import "./styles.css";

export default function App() {
  const [page, setPage] = React.useState(1);
  return (
    <div className="App">
      {page === 1 && <Page1 goNextPage={() => setPage(2)} />}
      {page === 2 && <Page2 goNextPage={() => setPage(3)} />}
      {page === 3 && <Page3 />}
    </div>
  );
}
