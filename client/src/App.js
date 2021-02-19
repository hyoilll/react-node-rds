import React, { useState, useEffect } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    witdh: "100%",
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  progress: {
    marginTop: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const [customers, setCustomers] = useState("");
  const [progress, setProgress] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const classes = useStyles();

  const cellList = ["Id", "Image", "Name", "Birthday", "Sex", "Job", "Setting"];

  const stateRefresh = () => {
    setCustomers("");
    setProgress(0);
    setSearchKeyword("");

    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // componentDidMount
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 20);

    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err))
      .finally(() => {
        clearInterval(timer);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredComponents = (datas) => {
    // 검색 키워드를 포함하는 리스트만 출력
    datas = datas.filter((data) => {
      return data.name.indexOf(searchKeyword) > -1;
    });

    return datas.map((data) => {
      return (
        <Customer
          key={data.id}
          id={data.id}
          img={data.image}
          name={data.name}
          birthday={data.birthday}
          gender={data.gender}
          job={data.job}
          stateRefresh={stateRefresh}
        ></Customer>
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Management System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh}></CustomerAdd>
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map((cell, idx) => {
                return (
                  <TableCell
                    key={idx}
                    className={classes.tableHead}
                    align="center"
                  >
                    {cell}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              filteredComponents(customers)
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={progress}
                  ></CircularProgress>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default App;
