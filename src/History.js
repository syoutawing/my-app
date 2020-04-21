import React from 'react';

function SortAsc(props) {
  return (
    <button
      className={props.isAsc ? 'sort-btn-true' : 'sort-btn'}
      onClick={() => props.onClick()}
    >
      昇順
    </button>
  );
}

function SortDesc(props) {
  return (
    <button
      className={props.isDesc ? 'sort-btn-true' : 'sort-btn'}
      onClick={() => props.onClick()}
    >
      降順
    </button>
  );
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: false,
      isDesc: false,
    };
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
    const history = this.props.history;
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to move start';
      return (
        <li key={move}>
          {this.props.buttonNumber === move ? (
            <button
              style={{ fontWeight: '900' }}
              onClick={() => this.props.onClick(move)}
            >
              {desc}
            </button>
          ) : (
            <button onClick={() => this.props.onClick(move)}>{desc}</button>
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

    return (
      <div>
        <SortAsc isAsc={this.state.isAsc} onClick={() => this.sortAscClick()} />
        <SortDesc
          isDesc={this.state.isDesc}
          onClick={() => this.sortDescClick()}
        />
        <ol className='sort'>{moves}</ol>
      </div>
    );
  }
}

export default History;
