import React from "react";

const ThoughtsInput = ({
  placeholderDay,
  getDay,
  placeholderChallenge,
  getFormattedAccomplishments,
  changeThoughts,
}) => {
  const handleChange = (e) => {
    changeThoughts(e.target.value);
  };

  const getAvailableLength = () => {
    const twitterMax = 280;
    const spaces = 3;
    const titleLength = (placeholderDay + getDay + placeholderChallenge).length;
    const accomplishmentsLength = getFormattedAccomplishments.length;
    const remaining =
      twitterMax - (spaces + accomplishmentsLength + titleLength);
    return remaining.toString();
  };

  return (
    <div>
      <label className="col-form-label">Thoughts:</label>
      <textarea
        className="form-control"
        maxLength={getAvailableLength()}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default ThoughtsInput;
