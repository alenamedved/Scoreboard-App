import React, { useState } from "react";
import "./app.css";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayerForm";

const App = () => {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleRemovePlayer = (id) => {
    setPlayers((players) => {
      return players.filter((player) => player.id !== id);
    });
  };

  const handleAddPlayer = (newName) => {
    setPlayers((players) => {
      return [...players, newName];
    });
  };

  const handleScoreChange = (index, delta) => {
    setPlayers((players) => {
      //make a copy of previous "players" state
      const updatedPlayers = [...players]; //or we can use players.slice()
      //a copy of player obj we're targiting
      const updatedPlayer = { ...updatedPlayers[index] };
      console.log(updatedPlayers);
      console.log(updatedPlayer);
      //update the target player's score
      updatedPlayer.score += delta;
      //update the player's array with the target plaeyer's score
      updatedPlayers[index] = updatedPlayer;
      console.log(updatedPlayers[index].score);
      //update the player's state without mutating the original state
      return updatedPlayers;
    });
  };

  return (
    <div className="scoreboard">
      <Header
        title="My Scoreboard"
        players={players}
        addPlayer={handleAddPlayer}
        playerList={players}
      />

      {/*Players list */}
      {players.map((player, index) => (
        <Player
          name={player.name}
          score={player.score}
          id={player.id}
          index={index}
          key={player.id.toString()}
          removePlayer={handleRemovePlayer}
          changeScore={handleScoreChange}
        />
      ))}

      <AddPlayerForm players={players} onAddPlayer={handleAddPlayer} />
    </div>
  );
};

export default App;
