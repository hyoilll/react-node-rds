import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";

const Customer = ({ id, img, name, birthday, gender, job, stateRefresh }) => {
  return (
    <>
      <TableRow key={id}>
        <TableCell align="center">{id}</TableCell>
        <TableCell align="center">
          <img src={img} alt="profile" width="64" height="64"></img>
        </TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{birthday}</TableCell>
        <TableCell align="center">{gender}</TableCell>
        <TableCell align="center">{job}</TableCell>
        <TableCell align="center">
          <CustomerDelete id={id} stateRefresh={stateRefresh}></CustomerDelete>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Customer;
