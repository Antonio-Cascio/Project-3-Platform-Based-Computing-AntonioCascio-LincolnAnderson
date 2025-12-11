import players from "../mock-API-Data/players.json";

export function getRandomPlayer() {

    const randomIndex = Math.floor(Math.random()* players.length);
    return players[randomIndex];

}


export function searchPlayers(query){

    if(!query) return [];

    query = query.toLowerCase();
    return players.filter(
    (p) =>
      p.first_name.toLowerCase().includes(query) ||
      p.last_name.toLowerCase().includes(query)
  );

}