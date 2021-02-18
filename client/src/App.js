import React, { useState, useEffect } from "react";
import Customer from "./components/Customer";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    witdh: "100%",
    marginTop: 30,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // componentDidMount
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  const classes = useStyles();
  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => {
            return (
              <Customer
                key={customer.id}
                id={customer.id}
                img={customer.image}
                name={customer.name}
                birthday={customer.birthday}
                gender={customer.gender}
                job={customer.job}
              ></Customer>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
