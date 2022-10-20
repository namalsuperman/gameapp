
 import React from "react";
 import Board from "./Board"
class Game extends React.Component {
  
    // props are get from the out side methode passing valus to theis class 
    constructor(props) {
      super(props);
      this.state = {
        // store history values of states
        history: [
          {
            //createint array calld Sqare
            squares: Array(9).fill(null)
          }
        ],
        // set the starting steps to for saveing value of sitory
        stepNumber: 0,
        //set the player calue X  to start first
        xIsNext: true
      };
    }
  
    handleClick(i) {
        console.log("Click Call"); 
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      
      const current = history[history.length - 1];
      const squares = current.squares.slice();
    // wheck wether found a Winer
      if (calculateWinner(squares) || squares[i]) {
        // if found return
        return;
      }
    
      squares[i] = this.state.xIsNext ? "X" : "O";
      console.log(squares[i]);
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        // set the current stat of the step to selected history 
        stepNumber: step,
        // 
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
       console.log("Render Call")
        // when classing to the render method   create a variable using history of state 
      const history = this.state.history;
      // get the currnt square value of the state history in game 
      const current = history[this.state.stepNumber];
      // check the winner can be identidy in current change
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
            
          </li>
        );
      });
      // jsx eliment it can be update in any ware 
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        console.log("return Call"), 
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  export default Game;