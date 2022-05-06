import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import SongComponent from "./SongComponent";
import SongGrid from "./SongGrid";
import Header from "./Header";
import Dropdown from "react-dropdown";
import RefreshIcon from "../utils/icons/refreshing.svg";
import LogOutIcon from "../utils/icons/log-out.svg";
import TrashIcon from "../utils/icons/delete.svg";
import { motion, AnimatePresence } from "framer-motion";

var xmlhttp = new XMLHttpRequest();

const deleteVariant = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 0.5,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0.5,
    x: 8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const MainPage = ({ username, logout, songList, setSongList }) => {
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
  const [songName, setSongName] = useState("New Song");
  const [viewSongList, setViewSongList] = useState(false);
  const [jsonSheet, setJSONSheet] = useState({});
  const [hoverDelete, setHoverDelete] = useState(-1);

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

  useEffect(() => {
    var tempJSONSheet = {};
    musicSheet.forEach((column, index) => {
      tempJSONSheet[`${index}`] = column;
    });
    setJSONSheet(tempJSONSheet);
  }, [musicSheet]);

  return (
    <div className="mainPage">
      <Header />
      {username !== "" ? (
        <Fragment>
          <p className="username">{username}</p>
          <img
            src={LogOutIcon}
            className="logoutIcon"
            onClick={() => logout()}
          />
        </Fragment>
      ) : (
        <div className="authButtonContainer">
          <Link to="/register" className="authButton registerButton">
            Register
          </Link>
          <Link to="/login" className="authButton loginButton">
            Login
          </Link>
        </div>
      )}

      <button
        className="songListToggle"
        onClick={() => setViewSongList(!viewSongList)}
      >
        {viewSongList ? "Notesheet" : "Song List"}
      </button>

      {!viewSongList ? (
        <div className="body">
          <p className="songNameHeader">{songName}</p>
          <div className="optionsContainer" style={{ alignItems: "flex-end" }}>
            <div className="dropdownContainer">
              <p className="dropdownHeader">Song Name</p>
              <input
                className="songNameInput"
                placeholder={songName}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.length > 0) {
                    setSongName(e.target.value);
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => (e.target.value = "")}
              ></input>
            </div>
            <div className="buttonRow">
              {username !== "" ? (
                <button
                  className="saveButton"
                  onClick={async (e) => {
                    e.preventDefault();
                    await xmlhttp.open(
                      "GET",
                      `http://localhost/phpmyadmin/int_sys_db_auth/save_song.php?username=${username}&name=${songName}&instrument=${
                        instrumentOptions[instrumentIndex]
                      }&effect=${
                        effectOptions[effectIndex]
                      }&tempo=${tempo}&notes=${JSON.stringify(jsonSheet)}`,
                      true
                    );
                    xmlhttp.send();
                    xmlhttp.onload = () => {
                      if (xmlhttp.responseText > -1) {
                        setSongList([
                          ...songList,
                          {
                            name: songName,
                            instrument: instrumentOptions[instrumentIndex],
                            effect: effectOptions[effectIndex],
                            tempo,
                            notes: musicSheet,
                            id: xmlhttp.responseText,
                          },
                        ]);
                      }
                    };
                  }}
                >
                  Save
                </button>
              ) : null}
              <button
                className="resetButton"
                onClick={() => {
                  setTempo(90);
                  setInstrumentIndex(0);
                  setEffectIndex(0);
                  setMusicSheet(initialMusicSheet);
                }}
              >
                <img src={RefreshIcon} className="refreshIcon" /> Reset
              </button>
            </div>
          </div>
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
              <p className="tempoText">Tempo: {tempo}bpm</p>
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
            </div>
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
      ) : (
        <div className="body">
          <p className="songNameHeader">{`${username}'s Songs`}</p>
          <div className="songEntryWrapper">
            {songList.map((song, index) => {
              return (
                <div
                  className="songEntry"
                  key={song.name + index}
                  onClick={async (e) => {
                    if (hoverDelete === index) {
                      e.preventDefault();
                      await xmlhttp.open(
                        "GET",
                        `http://localhost/phpmyadmin/int_sys_db_auth/delete_song.php?id=${song.id}`,
                        true
                      );
                      xmlhttp.send();
                      if (!xmlhttp.responseText.includes("Error")) {
                        setSongList(
                          songList.filter((item) => item.id !== song.id)
                        );
                      }
                    } else {
                      setSongName(song.name);
                      setMusicSheet(song.notes);
                      setTempo(song.tempo);
                      setInstrumentIndex(
                        instrumentOptions.findIndex((option) => {
                          return option === song.instrument;
                        })
                      );
                      setEffectIndex(
                        effectOptions.findIndex((option) => {
                          return option === song.effect;
                        })
                      );
                      setViewSongList(false);
                    }
                  }}
                >
                  <div className="songEntryRow">
                    <p className="songEntryName">{song.name}</p>
                    <AnimatePresence>
                      {hoverDelete === index ? (
                        <motion.p
                          className="trashText"
                          variants={deleteVariant}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          Delete?
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                    <img
                      className="trashIcon"
                      src={TrashIcon}
                      onMouseEnter={() => setHoverDelete(index)}
                      onMouseLeave={() => setHoverDelete(-1)}
                    />
                  </div>
                  <div className="songEntryRow">
                    <p className="songEntryMisc">{song.instrument}</p>
                    <p className="songEntryMisc">{song.effect}</p>
                    <p className="songEntryMisc">{song.tempo}bpm</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
