import React from "react";
import "./App.css";
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

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "lee hyo il",
    birthday: 930727,
    gender: "man",
    job: "student",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "sana",
    birthday: 900322,
    gender: "woman",
    job: "student",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "mina",
    birthday: 940808,
    gender: "woman",
    job: "teacher",
  },
];

function App() {
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
