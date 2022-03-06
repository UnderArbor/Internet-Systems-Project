import React from "react";
import { Song, Track, Instrument, Effect } from "reactronica";
import "./css/core.scss";

const SongComponent = ({
  musicSheet,
  onBarChange,
  tempo,
  instrument,
  effect,
}) => {
  return (
    <Song bpm={tempo} isPlaying={true} volume={5}>
      <Track
        steps={[
          musicSheet[0],
          musicSheet[1],
          musicSheet[2],
          musicSheet[3],
          musicSheet[4],
          musicSheet[5],
          musicSheet[6],
          musicSheet[7],
          musicSheet[8],
          musicSheet[9],
          musicSheet[10],
          musicSheet[11],
          musicSheet[12],
          musicSheet[13],
          musicSheet[14],
          musicSheet[15],
        ]}
        onStepPlay={(step, index) => {
          onBarChange(step, index);
        }}
      >
        <Instrument type={instrument} />
        {effect !== "none" && <Effect type={effect} />}
      </Track>
    </Song>
  );
};

export default SongComponent;
