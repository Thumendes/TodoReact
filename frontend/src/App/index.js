import React from "react";
import ContextProvider from "../Context";
import { Typography, Box, Container, makeStyles } from "@material-ui/core";
import Todo from "../Components/Todo";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column'
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <ContextProvider>
      <Box className={classes.root}>
          <Typography variant="h3">Todo-List</Typography>
          <Todo />
      </Box>
    </ContextProvider>
  );
};

export default App;
