import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRandomPlayer = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomPage = Math.floor(Math.random() * 14) + 1;
      console.log("Fetching page", randomPage);

      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?per_page=25&page=${randomPage}`
      );

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Data:", data);

      if (!data || !data.data || data.data.length === 0) {
        throw new Error("No players returned from API");
      }

      const random = data.data[Math.floor(Math.random() * data.data.length)];
      console.log("Random player:", random);
      setPlayer(random);
    } catch (err) {
      console.error(err);
      setError(err.toString());
    }

    setLoading(false);
  };

  useEffect(() => {
    getRandomPlayer();
  }, []);

  if (loading) return <h1>Loading player...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!player) return <h1>No player found</h1>;

  const height =
    player.height_feet && player.height_inches
      ? `${player.height_feet}'${player.height_inches}"`
      : "N/A";

  const weight = player.weight_pounds || "N/A";
  const college = player.college || "N/A";
  const team = player.team?.full_name || "N/A";

  return (
    <div style={{ padding: 20 }}>
      <h1>Random NBA Player</h1>
      <div style={{ border: "1px solid #ccc", padding: 10, width: 300 }}>
        <p><strong>Name:</strong> {player.first_name} {player.last_name}</p>
        <p><strong>Position:</strong> {player.position || "N/A"}</p>
        <p><strong>Height:</strong> {height}</p>
        <p><strong>Weight:</strong> {weight} lbs</p>
        <p><strong>College:</strong> {college}</p>
        <p><strong>Team:</strong> {team}</p>
      </div>
      <button onClick={getRandomPlayer} style={{ marginTop: 10 }}>
        Get New Player
      </button>
    </div>
  );
}

export default App;