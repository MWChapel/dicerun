
import './App.css';
import { Cell } from './components/grid/Cell'
import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
} from '@heroicons/react/outline'
import { useRef, useState, useEffect } from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import classnames from 'classnames'
import _ from 'lodash';
import { Alert } from './components/alerts/Alert'
import { StatsModal } from './components/modals/StatsModal'
import { InfoModal } from './components/modals/InfoModal'
import {
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './lib/localStorage'

function App() {

  let rollDice1 = useRef(null);
  let rollDice2 = useRef(null);
  let rollDice3 = useRef(null);
  let rollDice4 = useRef(null);
  let rollDice5 = useRef(null);

  //Constants 
  const multiplier = [100, 70, 60, 50, 40, 30, 40, 50, 60, 70, 100];
  const ALERT_TIME_MS = 2000;

  const numberRows = Array.from(Array(11));
  const numberColums = Array.from(Array(16));
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches


  const emptySelection = {
    1: {value: 0, die: undefined},
    2: {value: 0, die: undefined},
    3: {value: 0, die: undefined},
    4: {value: 0, die: undefined}
  }
  const emptyRemainder = {value: 0, die: undefined};
  const emptyPayload = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    extra1: {value: undefined, number: 0},
    extra2: {value: undefined, number: 0},
    extra3: {value: undefined, number: 0},
  }

  //Sets the state for all the objects
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isGameOver, setIsGameOver] = useState(false)
  const [diceValues, setDiceValues] = useState({});
  const [selection, setSelection] = useState(emptySelection);
  const [remainder, setRemainder] = useState(emptyRemainder);
  const [hasRolled, setHasRolled]= useState(false);
  const [extraIsFull, setExtraIsFull]= useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [successAlert, setSuccessAlert] = useState('');
  const [payload, setPayload]= useState(emptyPayload);

  //Checks to see if the three reminder dice have been set or can be set
  const showRemainder = (num) => {
    if(_.find(payload, {value: undefined})) {
      return false;
    } else if(_.find(payload, {value: num})) {
      return true;
    }
    return false;
  }

  //Set the style for all the objects
  const clearButton = classnames(
    'flex items-center justify-center rounded text-xs font-bold cursor-pointer dark:text-white bg-green-200 dark:bg-green-600',
    {
      'bg-slate-200 dark:bg-slate-600': isGameOver
    }
  )

  const replayButton = classnames(
    'flex items-center justify-center rounded text-xs font-bold cursor-pointer dark:text-white bg-green-200 dark:bg-green-600',
    {
      '': !isGameOver
    }
  )

  const submitButton = classnames(
    'flex items-center justify-center rounded text-xs font-bold cursor-pointer dark:text-white bg-green-200 dark:bg-green-600',
    {
      'bg-slate-200 dark:bg-slate-600': (isGameOver || !hasRolled || !selection[1]?.value || !selection[2]?.value || !selection[3]?.value || !selection[4]?.value ||  !remainder.value)
    }
  )

  const diceOne = classnames(
    'border-solid border-2 flex items-center justify-center rounded pl-1 pr-1 pt-2 m-1',
    {
      'bg-green-500 border-green-500': selection[1].die === 1 || selection[2].die === 1
    },
    {
      'bg-yellow-500 border-yellow-500': selection[3].die === 1 || selection[4].die === 1
    },
    {
      'bg-red-500 border-red-500': remainder.die === 1
    },
    {
      'border-slate-400': showRemainder(diceValues[1])
    }
  )

  const diceTwo = classnames(
    'border-solid border-2 flex items-center justify-center rounded pl-1 pr-1 pt-2 m-1',
    {
      'bg-green-500 border-green-500': selection[1].die === 2 || selection[2].die === 2
    },
    {
      'bg-yellow-500 border-yellow-500': selection[3].die === 2 || selection[4].die === 2
    },
    {
      'bg-red-500 border-red-500': remainder.die === 2
    },
    {
      'border-slate-400': showRemainder(diceValues[2])
    }
  )

  const diceThree = classnames(
    'border-solid border-2 flex items-center justify-center rounded pl-1 pr-1 pt-2 m-1',
    {
      'bg-green-500 border-green-500': selection[1].die === 3 || selection[2].die === 3
    },
    {
      'bg-yellow-500 border-yellow-500': selection[3].die === 3 || selection[4].die === 3
    },
    {
      'bg-red-500 border-red-500': remainder.die === 3
    },
    {
      'border-slate-400': showRemainder(diceValues[3])
    }
  )

  const diceFour = classnames(
    'border-solid border-2 flex items-center justify-center rounded pl-1 pr-1 pt-2 m-1',
    {
      'bg-green-500 border-green-500': selection[1].die === 4 || selection[2].die === 4
    },
    {
      'bg-yellow-500 border-yellow-500': selection[3].die === 4 || selection[4].die === 4
    },
    {
      'bg-red-500 border-red-500': remainder.die === 4
    },
    {
      'border-slate-400': showRemainder(diceValues[4])
    }
  )

  const diceFive = classnames(
    'border-solid border-2 flex items-center justify-center rounded pl-1 pr-1 pt-2 m-1',
    {
      'bg-green-500 border-green-500': selection[1].die === 5 || selection[2].die === 5
    },
    {
      'bg-yellow-500 border-yellow-500': selection[3].die === 5 || selection[4].die === 5
    },
    {
      'bg-red-500 border-red-500': remainder.die === 5
    },
    {
      'border-slate-400': showRemainder(diceValues[5])
    }
  )

  //Roll all dice for the next round
  useEffect(() => {
    if (!hasRolled) {
      rollAll()
    }
  }, [hasRolled])

  //Toggle the dark/light mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  // Rolls all the dice
  const rollAll = () => {
    rollDice1.rollAll()
    rollDice2.rollAll()
    rollDice3.rollAll()
    rollDice4.rollAll()
    rollDice5.rollAll()
    setHasRolled(true);
  }

  // Clear the currently selected values before submit
  const clearSelected = () => {
    setSelection({...emptySelection});
    setRemainder({...emptyRemainder});
  }

  // Reset the game without reloading
  const resetGame = () => {
    setPayload({...emptyPayload});
    setSelection({...emptySelection});
    setRemainder({...emptyRemainder});
    setExtraIsFull(false);
    setIsGameOver(false);
    setHasRolled(false);
  }

  // Gets the current score
  const getScore = () => {
    let score = 0;
    _.forEach(payload, function(value, key) {
      if(value < 4 && value > 0){
        score = score - 200;
      } else if(value > 4 && value <= 9){
        score = score + multiplier[parseInt(key - 2)] * (value - 4);
      } else if(value > 9){
        score = score + multiplier[parseInt(key - 2)] * (5);
      }
    });
    return score;
  }

  // Get end game message
  const endMessage = () => {
    const setScore = getScore();
    if(setScore <= 0) {
      return 'Game Over! Keep trying!';
    } else if(setScore < 100) {
      return 'Game Over! Good job getting a positive score!';
    } else if(setScore < 300) {
      return 'Game Over! Nice score!';
    } else if(setScore < 500) {
      return 'Game Over! Yes, great job!';
    } else if(setScore < 800) {
      return 'Game Over! OVER THE TOP!';
    } else if(setScore < 1000) {
      return 'Game Over! Congrats, You are a winner!';
    } else {
      return 'Game Over! SUPER STAR!';
    }
  }

  //Submits the currently selected dice
  const submitSelection = () => {
    let item = _.find(payload, {value: undefined});
    if(item && !_.find(payload, {value: remainder.value})) {
      item.value = remainder.value;
      item.number = item.number + 1;
    } else if(_.find(payload, {value: remainder.value})) {
      item = _.find(payload, {value: remainder.value});
      item.number = item.number + 1;
    }

    //Increment the first value in the grid
    payload[`${selection[1]?.value + selection[2]?.value}`] ++;
    //Increment the second value in the grid
    payload[`${selection[3]?.value + selection[4]?.value}`] ++;
    //Save the payload
    setPayload({...payload})
    //Reset the selection
    setRemainder({...emptyRemainder});
    setSelection({...emptySelection})

    //Game has reached conclusion
    if(item?.number > 7) {
      //Get latest score
      const score =  getScore();
      //Get historical scores
      let stats = loadStatsFromLocalStorage() || {};
      let scores = _.get(stats, 'scores', []);
      //Add the current score
      scores.push(score);
      //Sort scores from lowest negative to highest positive
      scores = scores.sort(function(a, b){return a-b});
      //Number of games played
      let numberGames = scores.length;
      //Highest scored game
      let highGame = _.last(scores) || 0;
      //Lowest score game
      let lowGame = _.first(scores) || 0;
      //Save it in stats
      stats.scores = scores;
      stats.numberGames = numberGames;
      stats.highGame = highGame;
      stats.lowGame = lowGame;
      //Save it in local storage
      saveStatsToLocalStorage(stats);
      //set game over state
      setIsGameOver(true);
      // Open the stats dialog to see scores and share
      setIsStatsModalOpen(true);
    } else {
      // Reset the rolled state
      setHasRolled(false);
    }
  }

  // Sets the values of the dice after the dice roller finishes
  const rollDoneCallback = (num, dice) => {
    diceValues[dice] = num;
    setDiceValues({...diceValues});
  }

  //Checks to see if the three reminder dice have been set or can be set
  const canSetRemainder = (num) => {
    if(_.find(payload, {value: undefined})) {
      return true;
    } else if(!_.includes(diceValues, payload['extra1'].value) && !_.includes(diceValues, payload['extra2'].value) && !_.includes(diceValues, payload['extra3'].value)){
      return true;
    } else if(_.find(payload, {value: num})) {
      return true;
    }
    return false;
  }

  
  //Click on a die, sets its selected order first/second/remainder
  const selectDice = (num) => {
    let item = _.find(selection, { 'die': num });
    if(item) {
      item.die = undefined;
      item.value = 0;
      setSelection({...selection});
    } else if(_.find(selection, { 'die': undefined }) && remainder.die !== num){
      item = _.find(selection, { 'die': undefined });
      item.die = num;
      item.value = diceValues[num];
      setSelection({...selection});
    } else if(remainder.die === num) {
      remainder.die = undefined;
      remainder.value = 0;
      setExtraIsFull(false);
      setRemainder({...remainder});
    } else if(canSetRemainder(diceValues[num])){
      remainder.die = num;
      remainder.value = diceValues[num];
      setExtraIsFull(false);
      setRemainder({...remainder});
    } else if(!canSetRemainder(diceValues[num])){
      setExtraIsFull(true);
      setTimeout(() => setExtraIsFull(false), ALERT_TIME_MS)
    }
  }

  //Gets the value label for each cell
  const getValue = (col, row) => {
    if( payload[row + 2] >= 9 && col > 0  && col < 10 ) {
      return '★';
    } else if( payload[row + 2] >= 9 && col === 10 ) {
      return 'MAX!';
    } else if(col === 0) {
      return row + 2;
    } else if(col === 10) {
      return `x${multiplier[row]}`;
    } else if(col === 11) {
      const value = payload[row + 2];
      if(value < 4 && value > 0){
        return -200;
      } else if(value === 4){
        return 0;
      } else if(value > 4 && value <= 9){
        return multiplier[row] * (value - 4);
      } else if(value > 9){
        return multiplier[row] * (5);
      }
      return 0;
    } else if(col > 12 && row === 0) {
      return payload[`extra${col - 12}`]?.value;
    } else if(col > 12 && row === 8) {
      return 'X';
    } else if(col > 12 && row > 0 && row < 8) {
      const extraVal = payload[`extra${col - 12}`]?.number
      if(extraVal >= row) {
        return '✓';
      }
   } else if(col === 4) {
      return 0;
    } else if(col > 4 && col <= 9) {
      return col - 4;
    }
    return;
  }

  //Gets the colors for each each cell depending on it's utility
  const geStatus = (col, row) => {
    if( payload[row + 2] >= 9 && col > 0  && col <= 11 ) {
      return 'closed';
    } else if(col > 0 && col < 4) {
      return payload[row + 2] >= col ? 'bad' : undefined;
    } else if(col > 12 && row === 8) {
      return 'end';
    } else if(col === 4) {
      return payload[row + 2] >= col ? 'zero' : undefined;
    } else if(col > 4 && (col < 10)) {
      return payload[parseInt(row + 2)] >= col ? 'good' : undefined;
    } else if(col === 12 || (col > 12 && row > 8)) {
      return 'clear';
    } else if (col === 11) {
      const value = payload[parseInt(row + 2)];
      if(value < 4 && value > 0){
        return 'bad';
      } else if(value > 4 && value <= 10){
        return 'good';
      } else if(value > 10){
        return 'good';
      }
    } else if (col === 10) {
      const value = payload[parseInt(row + 2)];
      if(value > 4 && value <= 9){
        return 'multiple';
      } else if(value > 9){
        return 'multiple';
      }
    } else if(col > 12 && row === 0) {
      return 'fifth';
    } else if(col > 12 && row > 0 && row < 8) {
       const extraVal = payload[`extra${col - 12}`]?.number
       if(extraVal >= row) {
         return 'extra';
       }
    }
    return;
  }


  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-4 mt-1">
        <h1 className="text-xl grow font-bold dark:text-white">
          DICICLE
        </h1>
        <SunIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => handleDarkMode(!isDarkMode)}
        />
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <div className="flex mx-auto justify-center items-center mb-5">
        <button className={diceOne} disabled={!hasRolled || isGameOver} onClick={() => selectDice(1)}>
          <ReactDice
            numDice={1}
            dieSize={40}
            margin={2}
            faceColor={'#056af9'}
            dotColor={`#ffffff`}
            rollTime={1}
            disableIndividual
            rollDone={(value) => rollDoneCallback(value, 1)}
            ref={dice => rollDice1 = dice}
          />
        </button>
        <button className={diceTwo} disabled={!hasRolled || isGameOver} onClick={() => selectDice(2)}>
          <ReactDice
            numDice={1}
            dieSize={40}
            margin={2}
            faceColor={'#056af9'}
            dotColor={`#ffffff`}
            rollTime={1}
            disableIndividual
            rollDone={(value) => rollDoneCallback(value, 2)}
            ref={dice => rollDice2 = dice}
          />
        </button>
        <button className={diceThree} disabled={!hasRolled || isGameOver} onClick={() => selectDice(3)}>
          <ReactDice
            numDice={1}
            dieSize={40}
            margin={2}
            faceColor={'#056af9'}
            dotColor={`#ffffff`}
            rollTime={1}
            disableIndividual
            rollDone={(value) => rollDoneCallback(value, 3)}
            ref={dice => rollDice3 = dice}
          />
        </button>
        <button className={diceFour} disabled={!hasRolled || isGameOver} onClick={() => selectDice(4)}>
          <ReactDice
            numDice={1}
            dieSize={40}
            margin={2}
            faceColor={'#056af9'}
            dotColor={`#ffffff`}
            rollTime={1}
            disableIndividual
            rollDone={(value) => rollDoneCallback(value, 4)}
            ref={dice => rollDice4 = dice}
          />
        </button>
        <button className={diceFive} disabled={!hasRolled || isGameOver} onClick={() => selectDice(5)}>
          <ReactDice
            numDice={1}
            dieSize={40}
            margin={2}
            faceColor={'#056af9'}
            dotColor={`#ffffff`}
            rollTime={1}
            disableIndividual
            rollDone={(value) => rollDoneCallback(value, 5)}
            ref={dice => rollDice5 = dice}
          />
        </button>
      </div>
      <div className="flex justify-center mx-auto items-center mb-1">
        <button
          disabled={isGameOver}
          style={{ width: `70px`, height: '55px' }}
          className={clearButton}
          onClick={clearSelected}
        >
          Clear
        </button>
        <div className={"ml-3 mr-1"}>
          <div className="items-center text-center justify-center text-green-500">
            <div className={`border-solid border-2 rounded border-green-500`} style={{ width: `60px` }}>
              <div className="text-3xl font-bold">{selection[1]?.value + selection[2]?.value || 0}</div>
            </div>
            <div className="text-xs">First</div>
          </div>
        </div>
        <div className={"ml-1 mr-1"}>
          <div className="items-center text-center justify-center text-yellow-500">
            <div className={`border-solid border-2 rounded border-yellow-500`} style={{ width: `60px` }}>
              <div className="text-3xl font-bold">{selection[3]?.value + selection[4]?.value || 0}</div>
            </div>
            <div className="text-xs">Second</div>
          </div>
        </div>
        <div className={"ml-1 mr-3"}>
          <div className="items-center text-center justify-center text-red-500">
            <div className={`border-solid border-2 rounded border-red-500`} style={{ width: `60px` }}>
              <div className="text-3xl font-bold">{remainder?.value || 0}</div>
            </div>
            <div className="text-xs">Extra Die</div>
          </div>
        </div>
        <button
          style={{ width: `70px`, height: '55px' }}
          disabled={!hasRolled || !selection[1]?.value || !selection[2]?.value || !selection[3]?.value || !selection[4]?.value ||  !remainder.value || isGameOver}
          className={submitButton}
          onClick={submitSelection}
        >
          Submit
        </button>
      </div>
      <div className="columns mx-auto mb-1 mt-5 mr-1 ml-1">
      {numberRows.map((_, row) => (
        <div key={row} className="flex justify-center mb-1">
          {numberColums.map((_, column) => (
            <Cell value={getValue(column, row)} column={column} status={geStatus(column, row)} size={ column === 10 || column === 11 ? 'score' : ''} key={column}>
            </Cell>
          ))}
        </div>
      ))}
      </div>
      <div className="flex w-80 mx-auto justify-center items-center mb-2 mt-5">
        <div style={{ marginLeft: 'auto', marginRight: '25px' }} className="items-center text-center dark:text-white">
          <div className={`border-solid border-2 rounded dark:border-white`} style={{ width: `60px` }}>
              <div className="text-lg font-bold">{getScore() || 0}</div>
          </div>
          <div className="text-xs">Total Score</div>
        </div>
      </div>
      <div className="flex w-80 items-center justify-center mx-auto mb-1">
        <div>
          <button
            style={{ width: `100px`, height: '45px' }}
            className={replayButton}
            onClick={resetGame}
          >
            Restart
          </button>
        </div>
      </div>
      <div className="flex w-80 items-center justify-center mx-auto mb-1 mt-3">
        <div className="text-center">
          <h1 className="text-xl font-bold dark:text-white">
            {isGameOver ? endMessage() : ''}
          </h1>
        </div>
      </div>
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        score={getScore()}
        rows={payload}
        remainder={[payload['extra1'].value, payload['extra2'].value, payload['extra3'].value]}
        stats={loadStatsFromLocalStorage() || {}}
        handleClose={() => setIsStatsModalOpen(false)}
        handleShare={() => {
          setSuccessAlert('Game Copied Successfully')
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
      <Alert message={'The extra dice pool is full. Select a number that matches one of those three'} isOpen={extraIsFull} />
    </div>
  )
}

export default App;
