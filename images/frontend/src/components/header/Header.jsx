import React from "react";
import "./header.scss";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src={logo}></img>
    </div>
  );
}
