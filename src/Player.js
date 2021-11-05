import React, { memo } from "react";
import Counter from "./Counter";
import PropTypes from "prop-types";
import SvgCrown from "./SvgCrown"

const Player = memo(({ name, id, score, index, changeScore, removePlayer, className }) => {
  
  return (
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => removePlayer(id)}>
          ✖
        </button>
        <SvgCrown className={className} /> {/* crown icon */}
        {name}
      </span>
      <Counter score={score} changeScore={changeScore} index={index} />
    </div>
  );
});

Player.propTypes = {
  changeScore: PropTypes.func,
  removePlayer: PropTypes.func,
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
  id: PropTypes.number,
  score: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Player;
