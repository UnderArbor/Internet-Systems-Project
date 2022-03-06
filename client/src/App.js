import React, { useState } from "react";
import SongComponent from "./SongComponent";
import SongGrid from "./SongGrid";
import Dropdown from "react-dropdown";

const App = (props) => {
  const initialMusicSheet = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const instrumentOptions = [
    "amSynth",
    "duoSynth",
    "fmSynth",
    "membraneSynth",
    "monoSynth",
    "pluckSynth",
    "synth",
  ];

  const effectOptions = [
    "autoFilter",
    "autoPanner",
    "autoWah",
    "bitCrusher",
    "distortion",
    "feedbackDelay",
    "freeverb",
    "panVol",
    "temolo",
  ];

  const [musicSheet, setMusicSheet] = useState(initialMusicSheet);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [tempo, setTempo] = useState(90);
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [effectIndex, setEffectIndex] = useState(0);

  function toggleNote(barIndex, note, toggle) {
    if (toggle) {
      setMusicSheet([
        ...musicSheet.slice(0, barIndex),
        [...musicSheet[barIndex], note],
        ...musicSheet.slice(barIndex + 1),
      ]);
    } else {
      const noteIndex = musicSheet[barIndex].findIndex((barNote) => {
        return note === barNote;
      });
      setMusicSheet([
        ...musicSheet.slice(0, barIndex),
        [
          ...musicSheet[barIndex].slice(0, noteIndex),
          ...musicSheet[barIndex].slice(noteIndex + 1),
        ],
        ...musicSheet.slice(barIndex + 1),
      ]);
    }
  }

  function onBarChange(event, index) {
    setPlayingIndex(index);
  }

  return (
    <div className="page">
      <p className="header">Music Master!!</p>
      <div className="body">
        <div className="optionsContainer">
          <div className="dropdownContainer">
            <p className="dropdownHeader">Instrument</p>
            <Dropdown
              options={instrumentOptions}
              onChange={(e) => {
                const newInstrument = e.value;
                const newIndex = instrumentOptions.findIndex((instrument) => {
                  return newInstrument === instrument;
                });
                setInstrumentIndex(newIndex);
              }}
              value={instrumentOptions[instrumentIndex]}
            />
          </div>
          <div className="dropdownContainer">
            <p className="dropdownHeader">Effect</p>
            <Dropdown
              options={effectOptions}
              onChange={(e) => {
                const newEffect = e.value;
                const newIndex = effectOptions.findIndex((effect) => {
                  return newEffect === effect;
                });
                setEffectIndex(newIndex);
              }}
              value={effectOptions[effectIndex]}
            />
          </div>
          <div className="dropdownContainer">
            <input
              className="tempoInput"
              onKeyDown={(e) => {
                if (e.key === "Enter") setTempo(e.target.value);
                else if (
                  isNaN(e.key) &&
                  e.key !== "Delete" &&
                  e.key !== "Backspace"
                )
                  e.preventDefault();
              }}
            ></input>
            <p className="tempoText">Tempo: {tempo}bpm</p>
          </div>
          <button
            className="resetButton"
            onClick={() => {
              setTempo(90);
              setInstrumentIndex(0);
              setEffectIndex(0);
              setMusicSheet(initialMusicSheet);
            }}
          >
            Reset
          </button>
        </div>
        <SongComponent
          musicSheet={musicSheet}
          onBarChange={onBarChange}
          tempo={tempo}
          instrument={instrumentOptions[instrumentIndex]}
          effect={effectOptions[effectIndex]}
        />
        <SongGrid
          musicSheet={musicSheet}
          toggleNote={toggleNote}
          playingIndex={playingIndex}
        />
      </div>
    </div>
  );
};

export default App;
