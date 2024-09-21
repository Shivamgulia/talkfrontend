import React from "react";

function Messages(props) {
  console.log(props);
  return (
    <div>
      {props.messages.map((item, index) => {
        return <div key={index}>{item.message}</div>;
      })}
    </div>
  );
}

export default Messages;
