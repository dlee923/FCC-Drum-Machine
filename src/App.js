import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './App.css';

const DrumMachineKeypadButton = ({buttonKey, pressFx, soundlink}) => {
  return (
    <div className="drum-machine-keypad-item">      
      <button className="drum-pad" onClick={pressFx} id={"key" + buttonKey}>
        <audio className="clip" id={buttonKey} src={soundlink}></audio>
        <label>{buttonKey}</label>
      </button>
    </div>
  );
}

const DrumMachineTogglepadSwitch = ({switchName}) => {
  return (
    <div className="drum-machine-togglepad-switch">
      <label className="switch-label">{switchName}</label>      
      <label className="switch">
        <input type="checkbox" id={switchName} />
        <span className="slider"></span>
      </label>
    </div>
  );  
}

const DrumMachineDisplay = ({displayValue}) => {
  return (
    <div className="drum-machine-togglepad-display" id="display">
      <label className="">{displayValue}</label>
    </div>
  );
}

const DrumMachineVolume = () => {
  return (
    <input type="range" className="drum-machine-togglepad-volume" id="volume-slider"/>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      power: true,
      displayValue: '',
      volumeLevel: 0.5
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeypadButtonPressed);
    document.getElementById("volume-slider").addEventListener("input", this.handleVolumeSliderChange)
    document.getElementById("Power").addEventListener("change", this.powerFx)
    document.getElementById("Power").checked = true;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypadButtonPressed);
    document.getElementById("volume-slider").removeEventListener("input", this.handleVolumeSliderChange);
  }

  test = () => {
    console.log("test");
  }

  playSoundFx = (keyStroke, soundName) => {
    if (this.state.power) {
      var audioElement = document.getElementById(keyStroke)
      audioElement.load();
      console.log("element volume: " + audioElement.volumeLevel);
      console.log("state volume: " + this.state.volumeLevel);
      audioElement.volumeLevel = this.state.volumeLevel;
      console.log("element volume2: " + audioElement.volumeLevel);
      
      console.log(this.state.volumeLevel);
      audioElement.play();
      this.setState({
        displayValue: soundName
      }, () => { console.log(soundName)});
    }
    
  }

  handleKeypadButtonPressed = (event) => {
    let regex = /81|87|69|65|83|68|90|88|67/;
    let isValidKeyPressed = regex.test(event.keyCode);
    if (isValidKeyPressed) {
      document.getElementById(String.fromCharCode(event.keyCode)).click();
    } 
  }

  handleVolumeSliderChange = (event) => {
    this.setState({
      displayValue: "Volume: " + event.currentTarget.value,
      volumeLevel: (event.currentTarget.value / 100)
    });
  }

  powerFx = () => {
    this.setState({
      power: !this.state.power
    }, () => { 
      // set color properties here
      if (this.state.power) {
        document.documentElement.style.setProperty('--button-hover-color', '#cdf4dc');
        document.documentElement.style.setProperty('--button-press-color', '#cdf4dc');
        document.documentElement.style.setProperty('--button-press-text-color', '#203946');
        document.documentElement.style.setProperty('--button-text-color', '#cdf4dc');
        
      } else {
        document.documentElement.style.setProperty('--button-hover-color', '#203946');
        document.documentElement.style.setProperty('--button-press-color', '#203946');
        document.documentElement.style.setProperty('--button-press-text-color', 'black');
        document.documentElement.style.setProperty('--button-text-color', 'black');
      }
      console.log(this.state.power) 
    });
  }

  render() {
    return (
      <div className="App">
        <div className="drum-machine-container" id="drum-machine">
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
              <DrumMachineDisplay displayValue={this.state.displayValue} />              
              <DrumMachineVolume />              
            </div>
          </div>          
        </div>      
      </div>
    );
  }  
}

export default App;
