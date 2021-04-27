import React from "react";

const ErrorView = ({ error, reload }) => {
  return (
    <>
      <div>Something went wrong: {error.toString()}</div>
      {reload && <button onClick={reload}>TRY AGAIN</button>}
    </>
  );
}

export default ErrorView;