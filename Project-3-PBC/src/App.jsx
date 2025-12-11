import { useEffect, useState } from "react";
import { getRandomPlayer, searchPlayers } from "./api/mockPlayers";
import createGame from "./Game/game";
import "./App.css";

export default function App(){

  const [game, setGame] = useState(null)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([]);
  const [won, setWon] = useState(false);
  const [lose, setLose] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const target = getRandomPlayer();
    setGame(createGame(target));
  }, []);
    function UpdateQueryImput(e){
      const value = e.target.value;
      setQuery(value);
      if(!value){
        setSuggestions([]);
        return;
      }
      const results = searchPlayers(value);
      setSuggestions(results);
    }
  function submitPlayerGuess(player) {
    if (!game || won || lose) return;
    const feedback = game.makeGuess(player);
    setQuery("");
    setSuggestions([]);
    setAttempts(attempts + 1);
    if (attempts + 1 > 5) {
    setLose(true);
  }
    if (
      feedback.team &&
      feedback.conference &&
      feedback.division &&
      feedback.position &&
      feedback.height
    ) {
      alert(`You guessed correctly! It was ${player.first_name} ${player.last_name}`);
      setWon(true)
    }
  }
  function playAgain(){
    const target = getRandomPlayer();
    setGame(createGame(target));
    setWon(false);
    setLose(false);
    setAttempts(0);
    setQuery("");
    setSuggestions([]);
  }

  if (!game) return <p>Loading game...</p>;
// I changed the title and our names to look better
  return (
    <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "1rem" }}>
    <h1 style={{ marginBottom: "0.2rem" }}>NBA Wordle</h1>
    <p style={{ fontSize: "1rem", fontWeight: "normal", marginTop: 0 }}>
      by Antonio Cascio and Lincoln Anderson
    </p>
    {/* Im not sure if you wanted to keep this but i didn't think it made sense for the final product */}
    {/* So i commented it out */}
    {/* <h3 style={{ fontWeight: "normal", marginTop: "0.5rem" }}>(Mock API)</h3> */}

      <input
        type="text"
        value={query}
        onChange={UpdateQueryImput}
        placeholder="Search for a player..."
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {/* Search suggestions */}
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}>
        {suggestions.map((p) => (
          <li
            key={p.id}
            onClick={() => submitPlayerGuess(p)}
            style={{
              padding: "0.5rem",
              borderBottom: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {p.first_name} {p.last_name} - {p.team.full_name}
          </li>
        ))}
      </ul>

      {/* Attempts */}
      <h2>Attempts</h2>

      {game.attempts.length === 0 && <p>No guesses yet.</p>}
{/* I made it so it shows each attempt, and labeled name, team conference, etc.. */}
{/* I also made it horizontal because it looked a lot better, so i used div */}
<div className="result-row" style={{ justifyContent: "flex-start", marginBottom: "0.5rem" }}>
  <div style={{ width: "30px", fontWeight: "bold" }}>#</div>
  <div style={{ width: "200px", fontWeight: "bold" }}>Name</div>
  <div className="result-box" style={{ fontWeight: "bold" }}>Team</div>
  <div className="result-box" style={{ fontWeight: "bold" }}>Conference</div>
  <div className="result-box" style={{ fontWeight: "bold" }}>Division</div>
  <div className="result-box" style={{ fontWeight: "bold" }}>Position</div>
  <div className="result-box" style={{ fontWeight: "bold" }}>Height</div>
</div>

    {game.attempts.map((a, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      borderBottom: "1px solid #eee",
      marginBottom: "0.5rem",
      gap: "10px"
    }}
  >
    {/* Attempt number */}
    <div style={{ fontWeight: "bold", width: "30px" }}>{i + 1}.</div>

    {/* Player name */}
    <div style={{ width: "200px" }}>
      {a.guessPlayer.first_name} {a.guessPlayer.last_name}
    </div>

    {/* Feedback boxes */}
    <div className="result-row">
      <div className={`result-box ${a.feedback.team ? 'true' : 'false'}`}>
        {a.guessPlayer.team.full_name}
      </div>
      <div className={`result-box ${a.feedback.conference ? 'true' : 'false'}`}>
        {a.guessPlayer.team.conference}
      </div>
      <div className={`result-box ${a.feedback.division ? 'true' : 'false'}`}>
        {a.guessPlayer.team.division}
      </div>
      <div className={`result-box ${a.feedback.position ? 'true' : 'false'}`}>
        {a.guessPlayer.position}
      </div>
      <div className={`result-box ${a.feedback.height ? 'true' : 'false'}`}>
        {a.guessPlayer.height_feet}
      </div>
    </div>
  </div>
))}
      {won && (
      <button 
        onClick={playAgain}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Play Again
      </button>
    )}
    {lose && (
    <div style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
      You lost! The correct player was {game.target.first_name} {game.target.last_name}.
      <br />
      <button 
        onClick={playAgain}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Play Again
      </button>
    </div>
  )}
    </div>
    

      
  );

}