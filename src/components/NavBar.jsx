import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { sortingAlgorithms } from "../common/config";
import { useData } from "../common/store";
import shallow from "zustand/shallow";
import { AiFillGithub } from "react-icons/ai";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
  },
  tab: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
}));

export function NavBar() {
  const classes = useStyles();

  const [algorithm, setAlgorithm] = useData(
    (state) => [state.algorithm, state.setAlgorithm],
    shallow
  );

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>SortSpectra: Sorting Visualizer</h2>
        <a href="" target="_blank"><AiFillGithub style={{ fontSize: "2rem" ,color: "black" }} /></a>
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={algorithm}
          onChange={(event, id) => setAlgorithm(id)}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {sortingAlgorithms.map((algorithm, index) => (
            <Tab
              label={algorithm.title}
              {...a11yProps(index)}
              key={algorithm.title}
              className={classes.tab}
            />
          ))}
          <Tab label="All" {...a11yProps(sortingAlgorithms.length)} className={classes.tab} />
        </Tabs>
      </AppBar>
    </div>
  );
}
