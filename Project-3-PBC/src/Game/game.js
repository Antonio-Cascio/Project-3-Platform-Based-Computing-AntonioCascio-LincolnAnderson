

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


    let teamMatch = false;
    let conferenceMatch = false;
    let divisionMatch = false;
    let positionMatch = false;
    let heightMatch = false;


    if (guess.team && target.team) {
        if (guess.team.full_name === target.team.full_name) {
            teamMatch = true;
    }


    }



    if (guess.team && target.team) {
        if (guess.team.conference === target.team.conference) {
            conferenceMatch = true;
        }

    }


    
    if (guess.team && target.team) {
        if (guess.team.division === target.team.division) {
            divisionMatch = true;
        }

    }

    if (guess.position && target.position) {
        if (guess.position === target.position) {
            positionMatch = true;
        }

    }



    if (guess.height_feet && target.height_feet) {
        if (guess.height_feet === target.height_feet) {
            heightMatch = true;
        }
    }


  return {

    team: teamMatch,
    conference: conferenceMatch,
    division: divisionMatch,
    position: positionMatch,
    height: heightMatch




  };



}