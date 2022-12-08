import _ from 'lodash';

export const shareStatus = (score, rows, remainder) => {
  navigator.clipboard.writeText(
    `Dicicle Score: ${score} Points\n` 
      + generateRemainder(remainder)
      + generateEmojiGrid(rows)
  )
}

export const generateRemainder = (remainder) => {
  let valueStr = 'Extra Dice: ';
  _.forEach(remainder, function(value) {

    if(value === 1){
      valueStr = valueStr + '1️⃣'
    } else if(value === 2) {
      valueStr = valueStr + '2️⃣'
    } else if(value === 3) {
      valueStr = valueStr + '3️⃣'
    } else if(value === 4) {
      valueStr = valueStr + '4️⃣'
    } else if(value === 5) {
      valueStr = valueStr + '5️⃣'
    } else if(value === 6) {
      valueStr = valueStr + '6️⃣'
    }
  });
  return valueStr + '\n';
}

export const generateEmojiGrid = (rows) => {
  let valueStr = '\n';
  _.forEach(rows, function(value, key) {
    if(!_.isInteger(value)) {
      return;
    }
    if(value === 0){
      valueStr = valueStr + '⬛⬛⬛⬛⬛⬛\n'
    } else if( value > 0 && value < 4) {
      valueStr = valueStr + '🟥🟥🟥🟥🟥🟥\n'
    } else if(value === 4) {
      valueStr = valueStr + '🟨⬛⬛⬛⬛⬛\n'
    } else if(value === 5) {
      valueStr = valueStr + '🟨🟩⬛⬛⬛⬛\n'
    } else if(value === 6) {
      valueStr = valueStr + '🟨🟩🟩⬛⬛⬛\n'
    } else if(value === 7) {
      valueStr = valueStr + '🟨🟩🟩🟩⬛⬛\n'
    } else if(value === 8) {
      valueStr = valueStr + '🟨🟩🟩🟩🟩⬛\n'
    } else if(value >= 9) {
      valueStr = valueStr + '🟨🟨🟨🟨🟨🟨\n'
    }
  });
  return valueStr
}
