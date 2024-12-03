import React from "react";

const PWDRequisite = (props) => {
  console.log(props);
  return (
    <div>
      {props.LengthFlag ? "" : "Password length must be at least 8 characters."}
    </div>
  );
};

export default PWDRequisite;
