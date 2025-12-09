

export default function createGame(targetplayer) {

    return{ 
        target: targetplayer,
        attempts: [],

        makeGuess(guessPlayer){
            const feedback = comparePlayers(guessPlayer, this.target);
            this.attempts.push({guessPlayer, feedback});
            return feedback;
        }

    };


}

function comparePlayers(guess, target) {
    
  return {

    team: guess.team?.full_name === target.team?.full_name,
    conference: guess.team?.conference === target.team?.conference,
    division: guess.team?.division === target.team?.division,
    position: guess.position === target.position,
    height: guess.height_feet === target.height_feet,


  };



}