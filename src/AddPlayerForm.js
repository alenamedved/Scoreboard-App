import React, { useState } from "react";

const AddPlayerForm = ({ onAddPlayer, players }) => {
  const [value, setValue] = useState("");

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const addNewPlayer = (event) => {
    event.preventDefault();
    let lastId;
    let newPlayerName = value;

    if (players.length === 0) {
      lastId = 0;
    } else {
      lastId = players[players.length - 1].id;
    }

    const newPlayerObj = {
      name: newPlayerName,
      id: lastId + 1,
      score: 0,
    };

    onAddPlayer(newPlayerObj);
    setValue("");
  };
  
  return (
    <form onSubmit={addNewPlayer}>
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        placeholder="Enter a player's name"
      />

      <input type="submit" value="Add Player" />
    </form>
  );
};

export default AddPlayerForm;
