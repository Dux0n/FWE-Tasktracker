import React, { useEffect, useState } from "react";
import { StyledMessage, MessageType } from "./components/Message";
import "./style.css";

export const App = () => {

  let [count,setCount] = useState(0);
  const [siteTitle, setSiteTitle] = useState("");
  useEffect(() =>{
  window.document.title = siteTitle;
  });
  const onButtonClickHandler = () => {
    console.log("clicked");
    setCount(count + 1);
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSiteTitle(e.currentTarget.value);
  };
  return (
  <div className="container">
    <p>You have clicked the button {count} times</p>
    <button onClick={onButtonClickHandler}>Click Me</button>
    <StyledMessage type={MessageType.INFO}>Hello World</StyledMessage>
    <input type="text" onChange={onInputChangeHandler}></input>
  </div>
  );
};
