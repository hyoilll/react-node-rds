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

const useStyles = makeStyles((theme) => ({
  root: {
    witdh: "100%",
    marginTop: 30,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    marginTop: 20,
  },
}));

function App() {
  const [customers, setCustomers] = useState("");
  const [progress, setProgress] = useState(0);
  const classes = useStyles();

  const stateRefresh = () => {
    setCustomers("");
    setProgress(0);

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

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Job</TableCell>
              <TableCell align="center">Setting</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              customers.map((customer) => {
                return (
                  <Customer
                    key={customer.id}
                    id={customer.id}
                    img={customer.image}
                    name={customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                    stateRefresh={stateRefresh}
                  ></Customer>
                );
              })
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
      <CustomerAdd stateRefresh={stateRefresh}></CustomerAdd>
    </div>
  );
}

export default App;
