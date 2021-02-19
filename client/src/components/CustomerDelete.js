import React from "react";

const CustomerDelete = ({ id, stateRefresh }) => {
  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };

  return <button onClick={(e) => deleteCustomer(id)}>Delete</button>;
};

export default CustomerDelete;
