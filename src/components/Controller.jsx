import React, { useState } from "react";
import styled from "styled-components";

import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";

import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { delay } from "../common/helper";

import shallow from "zustand/shallow";
import { useControls, useData } from "../common/store";
import {
  convertInputToArrayString,
  convertArrayStringToArray,
  getRandomArray,
} from "../common/helper";

const ControlBar = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px 0;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

const ArrayBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 1;
  min-width: 300px;
  gap: 15px;
`;

const ExecutionBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 40%;
  flex-grow: 1;
  justify-content: flex-end;
  gap: 15px;
`;

const StyledButton = styled(Button)`
  background-color: red !important;
  color: #fff !important;
  &:hover {
    background-color: #FF7F3E !important;
  }
`;

const StyledSlider = styled(Slider)`
  color: red !important;
  & .MuiSlider-thumb {
    background-color: #cc3333;
  }
  & .MuiSlider-track {
    background-color: red;
  }
  & .MuiSlider-rail {
    background-color: red;
  }
`;

export function Controller() {
  const [isPausing, setIsPausing] = useState(false);

  const [progress, speed] = useControls(
    (state) => [state.progress, state.speed],
    shallow
  );

  const [sortingArray, setSortingArray] = useData(
    (state) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControls(
    (state) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  const [arrayInput, setArrayInput] = useState(sortingArray);

  const startElement = <VscDebugStart onClick={startSorting} />;
  const pauseElement = <ImPause onClick={pauseAndDelaySorting} />;
  const resetElement = <VscDebugRestart onClick={resetSorting} />;
  const disabledPauseElement = <ImPause style={{ color: "#e5e5e5" }} />;

  async function pauseAndDelaySorting() {
    pauseSorting();
    setIsPausing(true);
    await delay(useControls.getState().swapTime);
    setIsPausing(false);
  }

  function arrayDataChangeHandler(value) {
    const arrayString = convertInputToArrayString(value);
    setArrayInput(arrayString);

    const array = convertArrayStringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  }

  function generate() {
    const randomArray = getRandomArray();
    setArrayInput(randomArray);
    setSortingArray(randomArray);
    resetSorting();
  }

  function getProgressButton() {
    if (isPausing) return disabledPauseElement;

    switch (progress) {
      case "reset":
        return startElement;
      case "start":
        return pauseElement;
      case "pause":
        return startElement;
      case "done":
        return disabledPauseElement;
    }
  }

  return (
    <ControlBar>
      <ArrayBar>
        <StyledButton variant="contained" onClick={generate}>
          Generate
        </StyledButton>

        <TextField
          id="outlined-basic"
          label="Input"
          variant="outlined"
          onChange={(event) => arrayDataChangeHandler(event.target.value)}
          value={arrayInput}
          size="small"
          style={{ flexGrow: 1, margin: "0 10px" }}
        />
      </ArrayBar>
      <ExecutionBar>
        <StyledSlider
          key={`slider-${speed}`}
          defaultValue={speed}
          onChange={(event, value) => setSpeed(value)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          style={{ flexGrow: 1, flexBasis: "100%" }}
        />

        <div style={{ display: "flex", marginLeft: "20px", columnGap: "5px" }}>
          {getProgressButton()}
          {resetElement}
        </div>
      </ExecutionBar>
    </ControlBar>
  );
}
