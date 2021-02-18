import React from "react";
import CustomerProfile from "./CustomerProfile";
import CustomerInfo from "./CustomerInfo";

const Customer = ({ id, img, name, birthday, gender, job }) => {
  return (
    <div>
      <CustomerProfile img={img} name={name} id={id}></CustomerProfile>
      <CustomerInfo
        birthday={birthday}
        gender={gender}
        job={job}
      ></CustomerInfo>
    </div>
  );
};

export default Customer;
