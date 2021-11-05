import React, { useState, useCallback } from "react";
import "./app.css";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayerForm";

//find a max score
function getHighScore(array) {
  if (array.length === 0) {
    return null;
  } else {
    let max = array[0].score;
    for (let i = 1; i < array.length; i++) {
      if (array[i].score > max) {
        max = array[i].score;
      }
    }
    return max;
  }
}
//change a isHighScore key for players with high score
function checkTheWinner(array) {
  const maxScore = getHighScore(array);
  array.map((player) => {
    if (player.score === maxScore && player.score !== 0) {
      player.isHighScore = "is-high-score";
    } else {
      player.isHighScore = null;
    }
  });
  return array;
}

const App = () => {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleRemovePlayer = useCallback((id) => {
    setPlayers((players) => {
      return checkTheWinner(players.filter((player) => player.id !== id));
    });
  }, []);

  const handleAddPlayer = (newName) => {
    setPlayers((players) => {
      return [...players, newName];
    });
  };

  const handleScoreChange = useCallback((index, delta) => {
    setPlayers((players) => {
      //make a copy of previous "players" state
      const updatedPlayers = [...players]; //or we can use players.slice()
      //a copy of player obj we're targiting
      const updatedPlayer = { ...updatedPlayers[index] };
      //update the target player's score
      updatedPlayer.score += delta;
      //update the player's array with the target plaeyer's score
      updatedPlayers[index] = updatedPlayer;
      //update the player's state without mutating the original state
      checkTheWinner(updatedPlayers);
      return updatedPlayers;
    });
  }, []);
  
  return (
    <div className="scoreboard">
      <Header
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
          className={player.isHighScore}
        />
      ))}

      <AddPlayerForm players={players} onAddPlayer={handleAddPlayer} />
    </div>
  );
};

export default App;
