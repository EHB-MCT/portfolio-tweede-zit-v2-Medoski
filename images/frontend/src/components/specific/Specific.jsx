import React, { useState, useEffect } from "react";
import "./specific.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";

export default function Specific() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [game, setGame] = useState();

  useEffect(() => {
    let userId = window.sessionStorage.getItem("userId");
    setUserId(userId);
    let userName = window.sessionStorage.getItem("userName");
    setUserName(userName);
    const { gameid } = queryString.parse(location.search);

    if (!userId) return;

    axios
      .get(`http://localhost:81/game/${gameid}`)
      .then((response) => {
        // do something with the response data
        setGame(response.data);
      })
      .catch((error) => {
        // handle error
      });
  }, [userId]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [history]);

  const navigate = useNavigate();

  const handleBackToHome = (event) => {
    navigate("/home");
  };

  return (
    <div className="specific">
      <div className="topwebsite">
        <h3
          className="hey"
          style={{ color: "white", cursor: "pointer" }}
          onClick={handleBackToHome}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icon"
            style={{ pointerEvents: "none", marginRight: "10px" }}
          />
          Back to home
        </h3>
        <h3 className="hey">Hello there, {userName} !</h3>
        {game && <h3 className="addgametitle">{game[0].gameName}</h3>}
      </div>
      {game && (
        <div className="specificmain">
          <div className="mainleft">
            <img className="gameposter" src={game[0].gameImg}></img>
          </div>

          <div className="mainright">
            <h1 className="gametitle text">{game[0].gameName}</h1>
            <h2 className="gamegenre text">Genre : {game[0].gameGenre}</h2>
            <h2 className="gamedeveloper text">
              Developer : {game[0].gameDeveloper}
            </h2>
            <h2 className="gamecompletion text">
              Completion : {game[0].gameCompletion}
            </h2>
            <p className="gamedescription text">
              Description :<br />
              <br />
              {game[0].gameDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
