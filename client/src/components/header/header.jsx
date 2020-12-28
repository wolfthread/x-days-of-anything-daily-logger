import React from "react";

const Header = () => {
  return (
    <header className="jumbotron">
      <h1 className="display-3">My Daily Logger</h1>
      <p className="lead">
        Your simple daily log formatter for the #XDaysOfX Challenge
      </p>
      <hr className="my-4" />
      <p>To learn more about the official #100DaysOfX:</p>
      <p className="lead">
        <a
          className="btn btn-primary btn-lg"
          target="_black"
          href="https://www.100daysofx.com/"
          rel="noopener noreferrer"
          role="button"
        >
          #100DaysOfX
        </a>
      </p>
    </header>
  );
};

export default Header;
