import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    let a = null;
    let b = null;
    let c = null;
    const i = this.props.index;

    if (this.props.winner) {
      a = this.props.winner[1];
      b = this.props.winner[2];
      c = this.props.winner[3];
    }
    const squares =
      a === i ? (
        <span style={{ color: 'red' }}>{this.props.value}</span>
      ) : b === i ? (
        <span style={{ color: 'red' }}>{this.props.value}</span>
      ) : c === i ? (
        <span style={{ color: 'red' }}>{this.props.value}</span>
      ) : (
        <span>{this.props.value}</span>
      );

    return (
      <button className='square' onClick={this.props.onClick}>
        {squares}
      </button>
    );
  }
}

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

function SortAsc(props) {
  return (
    <div>
      <button
        className={props.isAsc ? 'sort-btn-true' : 'sort-btn'}
        onClick={() => props.onClick()}
      >
        昇順
      </button>
    </div>
  );
}

function SortDesc(props) {
  return (
    <div>
      <button
        className={props.isDesc ? 'sort-btn-true' : 'sort-btn'}
        onClick={() => props.onClick()}
      >
        降順
      </button>
    </div>
  );
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          id: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      buttonNumber: null,
      isAsc: false,
      isDesc: false,
      dispHistory: [],
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const id = current.id.slice();

    // ゲーム終了時、マス目に配置済みの場合
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    id[i] = i;
    this.setState({
      history: history.concat([
        {
          squares: squares,
          id: id,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      buttonNumber: step,
    });
  }

  sortAscClick() {
    this.setState({
      isAsc: true,
      isDesc: false,
    });
  }

  sortDescClick() {
    this.setState({
      isAsc: false,
      isDesc: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        // ゲームの着手順をkeyに指定
        <li key={move}>
          {this.state.buttonNumber === move ? (
            <button
              style={{ fontWeight: '900' }}
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          ) : (
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          )}
        </li>
      );
    });

    if (this.state.isAsc && !this.state.isDesc) {
      moves.sort();
    }
    if (this.state.isDesc && !this.state.isAsc) {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const DROW = 9;
    if (!winner && this.state.stepNumber === DROW) {
      status = 'DROW';
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            winner={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <SortAsc isAsc={this.state.isAsc} onClick={() => this.sortAscClick()} />
        <SortDesc
          isDesc={this.state.isDesc}
          onClick={() => this.sortDescClick()}
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('container'));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
