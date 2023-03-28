import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './App.css';
// import SoundQ from './sounds/Heater-1.mp3';
// import SoundW from './sounds/Heater-2.mp3';
// import SoundE from './sounds/Heater-3.mp3';

const DrumMachineKeypadButton = ({buttonKey, pressFx, soundlink}) => {
  return (
    <div className="drum-machine-keypad-item">      
      <button className="drum-machine-keypad-button" onClick={pressFx} id={"key" + buttonKey}>
        <audio id={buttonKey} src={soundlink}></audio>
        <label>{buttonKey}</label>
      </button>
    </div>
  );
}

const DrumMachineTogglepadSwitch = ({switchName}) => {
  return (
    <div className="drum-machine-togglepad-switch" id={switchName}>
      <label>{switchName}</label>      
      <div className="slider">
        <input type="checkbox" className="switch" />
      </div>
  </div>
  );  
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayValue: 'something'
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeypadButtonPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypadButtonPressed);
  }

  playSoundFx(keyStroke, soundName) {
    document.getElementById(keyStroke).play();
    
    this.setState({
      displayValue: soundName
    }, () => { console.log(soundName)});
  }

  handleKeypadButtonPressed(event) {
    let regex = /81|87|69|65|83|68|90|88|67/;
    let isValidKeyPressed = regex.test(event.keyCode);
    console.log(isValidKeyPressed);
  }

  // q 81
  // w 87
  // e 69
  // a 65
  // s 83
  // d 68
  // z 90
  // x 88 
  // c 67

  render() {
    return (
      <div className="App">
        <div className="drum-machine-container">
          <div className="drum-machine-container-header">
            FCC <FontAwesomeIcon icon={faFreeCodeCamp} style={{marginLeft: "2px"}} />
          </div>
          <div className="drum-machine-container-content">
            <div className="drum-machine-keypad">
              <DrumMachineKeypadButton buttonKey="Q" pressFx={() => this.playSoundFx('Q', 'Heater-1')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
              <DrumMachineKeypadButton buttonKey="W" pressFx={() => this.playSoundFx('W', 'Heater-2')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
              <DrumMachineKeypadButton buttonKey="E" pressFx={() => this.playSoundFx('E', 'Heater-3')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
              <DrumMachineKeypadButton buttonKey="A" pressFx={() => this.playSoundFx('A', 'Heater-4')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
              <DrumMachineKeypadButton buttonKey="S" pressFx={() => this.playSoundFx('S', 'Clap')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
              <DrumMachineKeypadButton buttonKey="D" pressFx={() => this.playSoundFx('D', 'Open HH')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
              <DrumMachineKeypadButton buttonKey="Z" pressFx={() => this.playSoundFx('Z', 'Kick n\' Hat')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
              <DrumMachineKeypadButton buttonKey="X" pressFx={() => this.playSoundFx('X', 'Kick')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
              <DrumMachineKeypadButton buttonKey="C" pressFx={() => this.playSoundFx('C', 'Closed HH')} soundlink="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
            </div>
            <div className="drum-machine-togglepad">
              <DrumMachineTogglepadSwitch switchName="Power" />
              <div className="drum-machine-togglepad-display">
                  <label className="">
                    {this.state.displayValue}
                  </label>
              </div>
              <div className="drum-machine-togglepad-volume"></div>
              <div className="drum-machine-togglepad-switch"></div>
            </div>
          </div>          
        </div>      
      </div>
    );
  }  
}

export default App;
