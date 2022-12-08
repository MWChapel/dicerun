import { BaseModal } from './BaseModal'

export const InfoModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-green-500 dark:text-green-300 mb-1">
        1. Pick two dice. They will add together and go in the first box.
      </p>
      <div className={'flex items-center justify-center'}>
        <img width="70" alt="" src="first.png"/>
      </div>
      <p className="text-sm text-yellow-500 dark:text-yellow-300 mb-1">
        2. Pick another two dice. They will add together and go in the second box.
      </p>
      <div className={'flex items-center justify-center'}>
        <img width="70" alt="" src="second.png"/>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
        The FIRST and SECOND boxes will fill up the numbers in the grid below with the multiplier.
      </p>
      <p className="text-sm text-red-500 dark:text-red-300 mb-1">
        The remaining die will be your extra dice  
      </p>
      <div className={'flex items-center justify-center'}>
        <img width="70" alt="" src="extra.png"/>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
        Finally, hit submit.  
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
      *In the next few turns, you will choose three numbers for your extra dice. Out of the five dice, you have to use one of these three numbers each turn after you fill the first three boxes. Once ONE column of extra dice is filled (down to the X), the game over. If one turn doesn't give you one of the three extra dice choices, it's a FREE turn. You will have up to 21 turns to get the most points as possible. If a row is maxed out(5), you can continue to add to this row, but it doesn't add to the score.
      </p>
      <img height="5" alt="" src="multiplier.png"/>
      <img height="100" alt="" src="remainder.png"/>
      <p className="text-sm text-green-500 font-bold dark:text-green-300 mb-1">
        HOW TO SCORE
      </p>
      <p className="text-sm text-green-500 font-bold dark:text-green-300 mb-1">
        1. The first three spaces of any number will give you -200 points. When you fill the number up across the row, passed the third box, the score will start at zero and increase by the multiplier.
      </p>
      <p className="text-sm text-green-500 font-bold dark:text-green-300 mb-1">
        2. Continue filling up rows until the game is over (once one column in the extra dice is filled.)
      </p>
      <a className="text-sm text-blue-500 dark:text-blue-300 mb-1" href = "mailto: mwchapel@gmail.com">email suggestions and questions</a>
    </BaseModal>
  )
}
