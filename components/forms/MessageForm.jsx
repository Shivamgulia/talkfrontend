import React from "react";

function MessageForm(props) {
  function sendMessage(event) {
    event.preventDefault();

    console.log(event.target[0].value);

    props.sendMessage(event.target[0].value);
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input type="text" />
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default MessageForm;
