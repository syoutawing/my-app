import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        index={i}
        value={this.props.squares[i]}
        winner={this.props.winner}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squaresDisplay = [];
    let array = [];
    const MAX_SIZE = 9;
    let startPush = 0;
    let funcPush = 3;

    for (let i = 0; i < MAX_SIZE; i += 3) {
      for (let j = startPush; j < MAX_SIZE + 1; j++) {
        if (j !== funcPush) {
          array.push(this.renderSquare(j));
        }
        if (i === startPush && j === funcPush) {
          squaresDisplay.push(
            <div key={j} className='board-row'>
              {array}
            </div>
          );
          startPush += 3;
          funcPush += 3;
          array = [];
          break;
        }
      }
    }

    return <div>{squaresDisplay}</div>;
  }
}

export default Board;
