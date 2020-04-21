import React from 'react';

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

export default Square;
