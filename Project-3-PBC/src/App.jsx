import { useEffect, useState } from "react";
import { getRandomPlayer, searchPlayers } from "./api/mockPlayers";
import createGame from "./Game/game";

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



    function handleSearch(e){
      const value = e.target.value;
      setQuery(value);

      if(!value){
        setSuggestions([]);
        return;
      }
      

      const results = searchPlayers(value);
      setSuggestions(results);


    }


  function handleGuess(player) {
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


  return (
    <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "1rem",  }}>
      <h1>NBA Wordle by Antonio Cascio and Lincoln Anderson</h1>
      <h2>(Mock API)</h2>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a player..."
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {/* Search suggestions */}
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}>
        {suggestions.map((p) => (
          <li
            key={p.id}
            onClick={() => handleGuess(p)}
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
      {game.attempts.map((a, i) => (
        <div
          key={i}
          style={{
            padding: "0.5rem",
            borderBottom: "1px solid #eee",
            marginBottom: "0.5rem",
          }}
        >
          <strong>
            {a.guessPlayer.first_name} {a.guessPlayer.last_name}
          </strong>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(a.feedback, null, 2)}
          </pre>
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