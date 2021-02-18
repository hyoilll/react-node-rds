import React from "react";

// id + img + name rendering
const CustomerProfile = ({ id, name, img }) => {
  return (
    <div>
      <img src={img} alt="profile"></img>
      <h2>
        {name} ({id})
      </h2>
    </div>
  );
};

export default CustomerProfile;
