import React from "react";

const notes = [
  "C6",
  "A5",
  "G5",
  "E5",
  "D5",
  "C5",
  "A4",
  "G4",
  "E4",
  "D4",
  "C4",
  "A3",
  "G3",
  "E3",
  "D3",
  "C3",
];

const SongGrid = ({ musicSheet, toggleNote, playingIndex }) => {
  return (
    <div className="gridContainer">
      {musicSheet.map((bar, barIndex) => {
        return (
          <div key={"bar" + barIndex} className="musicBar">
            {notes.map((note, noteIndex) => {
              const activeNote =
                bar.findIndex((barNote) => {
                  return barNote === note;
                }) > -1;
              return (
                <div
                  key={"note" + barIndex + "&" + noteIndex}
                  className={`musicNote ${
                    activeNote ? "activeNote" : "inactiveNote"
                  } ${
                    playingIndex === barIndex && activeNote
                      ? "playingNote"
                      : null
                  }`}
                  onClick={() => toggleNote(barIndex, note, !activeNote)}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SongGrid;
