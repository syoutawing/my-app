import React from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(tempreature, convert) {
  const input = parseFloat(tempreature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>aa</p>;
  }
  return <p>a</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const tempreature = this.props.tempreature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter {scaleNames[scale]}:</legend>
        <input value={tempreature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      tempreature: '',
      scale: 'c',
    };
  }

  handleCelsiusChange(tempreature) {
    this.setState({
      scale: 'c',
      tempreature,
    });
  }
  handleFahrenheitChange(tempreature) {
    this.setState({
      scale: 'f',
      tempreature,
    });
  }
  render() {
    const scale = this.state.scale;
    const tempreature = this.state.tempreature;
    const celsius =
      scale === 'f' ? tryConvert(tempreature, toCelsius) : tempreature;
    const fahrenheit =
      scale === 'c' ? tryConvert(tempreature, toFahrenheit) : tempreature;

    return (
      <div>
        <TemperatureInput
          scale='c'
          tempreature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale='f'
          tempreature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
