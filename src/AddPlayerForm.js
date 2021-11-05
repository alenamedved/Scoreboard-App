import React, { useRef } from "react";
import PropTypes from "prop-types";

const AddPlayerForm = ({ onAddPlayer, players }) => {
  const inputRef = useRef();

  const addNewPlayer = (event) => {
    event.preventDefault();
    let lastId;
    let newPlayerName = inputRef.current.value;

    if (players.length === 0) {
      lastId = 0;
    } else {
      lastId = players[players.length - 1].id;
    }

    const newPlayerObj = {
      name: newPlayerName,
      id: lastId + 1,
      score: 0,
      isHighScore: null,
    };

    onAddPlayer(newPlayerObj);
    event.target.reset();
  };

  return (
    <form onSubmit={addNewPlayer}>
      <input type="text" ref={inputRef} placeholder="Enter a player's name" />

      <input type="submit" value="Add Player" />
    </form>
  );
};

AddPlayerForm.propTypes = {
  players: PropTypes.array,
  onAddPlayer: PropTypes.func,
};

export default AddPlayerForm;
