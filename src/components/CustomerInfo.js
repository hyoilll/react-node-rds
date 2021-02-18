import React from "react";

// birthday + gender + job rendering
const CustomerInfo = ({ birthday, gender, job }) => {
  return (
    <div>
      <p>birthday : {birthday}</p>
      <p>gender : {gender}</p>
      <p>job : {job}</p>
    </div>
  );
};

export default CustomerInfo;
