import React, { useState, useEffect } from "react";
import "./create.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Create() {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [completion, setCompletion] = useState("");
  const [developer, setDeveloper] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(window.sessionStorage.getItem("userId"));
    console.log(userId);
    setUserName(window.sessionStorage.getItem("userName"));
    console.log(userName);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formBody = {
      userId: userId,
      gameImg: poster,
      gameName: name,
      gameDescription: description,
      gameCompletion: completion,
      gameDeveloper: developer,
      gameGenre: genre,
    };

    console.log(formBody);

    axios
      .post("http://localhost:81/game", formBody)
      .then((response) => {
        // do something with the response data
        console.log(response);
        navigate(`/home`);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [history]);

  const handleBackToHome = (event) => {
    navigate("/home");
  };

  return (
    <div className="create">
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
        <h3 className="hey">Adding something new, {userName} ?</h3>
        <h3 className="addgametitle">Add a game</h3>
      </div>

      <form className="addgameform" onSubmit={handleSubmit}>
        <div className="firstaddgameform">
          <div className="inputform">
            <label className="namelabel label">Name</label>
            <input
              type="text"
              className="nameinput input"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="inputform">
            <label className="posterlabel label">Poster(url of image)</label>
            <input
              type="text"
              className="posterinput input"
              name="poster"
              onChange={(e) => setPoster(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="secondaddgameform ">
          <div className="inputform">
            <label className="genrelabel label">Genre</label>
            <input
              type="text"
              className="genreinput input"
              name="genre"
              onChange={(e) => setGenre(e.target.value)}
            ></input>
          </div>
          <div className="inputform">
            <label className="completionlabel label">Game Completion</label>
            <input
              type="text"
              className="completioninput input"
              name="completion"
              onChange={(e) => setCompletion(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="thirdaddgameform">
          <div className="inputform">
            <label className="developerlabel label">Developer</label>
            <input
              type="text"
              className="developerinput input"
              name="developer"
              onChange={(e) => setDeveloper(e.target.value)}
            ></input>
          </div>
          <div className="inputform">
            <label className="descriptionlabel label">Description</label>
            <textarea
              className="descriptioninput"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="addgamesubmit">
          Add
        </button>
      </form>
    </div>
  );
}
