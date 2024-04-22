import { useEffect, useState } from "react";
import { useGameContext } from "../../../context/GameContext";
import { useSoundContext } from "../../../context/SoundContext.jsx";
import "./styles.css"
import Circle from '../../../svg/tictactoe/Circle.jsx';
import Cross from '../../../svg/tictactoe/Cross.jsx';

// eslint-disable-next-line react/prop-types
const Square = ({ value, index, isWinning }) => {
    const { makeMove,myTurn, winPattern, matchWinner } = useGameContext();
    const [isEmpty, setIsEmpty] = useState(true);
    const { playSquareClickSound } = useSoundContext();
    const [winEffectBg,setWinEffectBg] = useState('')

    const handleMakeMove = (index) => {
      if(!isEmpty || !myTurn || matchWinner != null) return
      makeMove(index)
      playSquareClickSound();
    }

    useEffect(() => {
      if(matchWinner == null) return 

      setWinEffectBg(matchWinner == "player1" ? "bg-primary" : 
        matchWinner == "player2" ? "bg-secondary" : matchWinner == "tie" ? "bg-slate-400 opacity-50" : "");

    },[matchWinner]);

    useEffect(() => {
      setIsEmpty(value == null)
    },[value])

  return (
    <td className={`bg-neutral rounded-lg cursor-pointer w-1/3 aspect-square 
        ${isWinning && matchWinner == null && (value == "X" ? "bg-primary" : value == 'O' ? "bg-secondary" : '')} 
        ${winPattern == null && "bg-slate-400 opacity-50"} ${winEffectBg}
        transition-all   ${isEmpty && matchWinner == null && myTurn ? "square-can-hover" : ""}`}
        onClick={() => handleMakeMove(index)}>
          <div className="flex items-center justify-center">
            {value == "X" ? <Cross /> : value == "O" ? <Circle /> : <svg width="70%" viewBox="0 0 24 24"></svg>}
          </div>
    </td>
  )
}

export default Square