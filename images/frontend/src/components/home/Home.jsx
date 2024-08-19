import React, { useEffect, useState } from "react";
import "./home.scss";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [userName, setUserName] = useState();
  const [userId, setUserID] = useState();
  const [games, setGames] = useState();

  useEffect(() => {
    let userId = window.sessionStorage.getItem("userId");
    setUserID(userId);
    let userName = window.sessionStorage.getItem("userName");
    setUserName(userName);

    if (!userId) return;

    axios
      .get(`http://localhost:81/game/saved/${userId}`)
      .then((response) => {
        // do something with the response data
        setGames(response.data);
      })
      .catch((error) => {
        // handle error
      });
  }, [userId]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [history]);

  useEffect(() => {
    console.log(games);
  }, [games]);

  const handleDelete = (event) => {
    const elementId = event.target.id;
    console.log(elementId);
    axios
      .delete(`http://localhost:81/game/${elementId}`)
      .then((data) => {
        location.reload();
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <div className="home">
      <div className="topwebsite">
        <h3 className="hey">Hello there, {userName}!</h3>
        <h3 className="addgametitle">Your Library</h3>
        <Link to="/profile" className="gotoprofilbtn">
          <h3 className="addgametitle">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </h3>
        </Link>
      </div>
      <div className="addgamebtndiv">
        <Link to={`/create`}>
          <button className="addgamebtn">
            <Link
              to="/create"
              style={{ textDecoration: "none", color: "black" }}
            >
              +
            </Link>
          </button>
        </Link>
      </div>
      <div className="gamescontainer">
        {games &&
          games.map((game, i) => (
            <div className="gamecontainer">
              <Link to={`/specific?gameid=${game.id}`}>
                <img className="gameposter" src={game.gameImg}></img>
              </Link>
              <div className="gamebottom">
                <p className="gamename">{game.gameName}</p>

                <div className="tools">
                  <p className="deletebtn" id={game.id} onClick={handleDelete}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="icon"
                      id={game.id}
                      style={{ pointerEvents: "none" }}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
