import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RegularAlert from "../../components/regular-alert/regular-alert";

const TwitterCard = ({
  placeholderDay,
  getDay,
  placeholderChallenge,
  getFormattedAccomplishments,
  getThoughts,
  formatAccomplishments,
  toggleTwitterRegularAlert,
  twitterRegularAlertStatus,
  regularAlertErrMsg,
}) => {
  const handleCopy = () => {
    const head = placeholderDay + getDay + placeholderChallenge;
    const lenAccs = getFormattedAccomplishments
      ? getFormattedAccomplishments
      : "";
    const body = "\n\n" + getThoughts + "\n" + lenAccs;
    return head + body;
  };

  const checkThoughtsPossibleLength = () => {
    // const accsLength = getAccomplishmentLength;
    const twitterMax = 280;
    const currentAvailableCount = twitterMax - handleCopy().length;
    const currentThoughts = getThoughts;
    let overFlow = "";
    let allowedText = currentThoughts;
    if (currentAvailableCount < 0) {
      overFlow = currentThoughts.slice(currentAvailableCount);
      allowedText = currentThoughts.slice(0, currentAvailableCount);
    }
    if (getFormattedAccomplishments.length > 1) {
      return (
        <p>
          {allowedText}
          <span style={{ backgroundColor: "#d23430" }}>{overFlow}</span>
        </p>
      );
    } else {
      return <p>{getThoughts}</p>;
    }
  };

  return (
    <div className="fixed p-2 bd-highlight">
      <div className="card text-white bg-info mb-3">
        <div className="card-header">Twitter Format</div>
        <div className="card-body">
          <h4 className="card-title">
            {placeholderDay}
            {getDay}
            {placeholderChallenge}
          </h4>
          <div className="card-text">{checkThoughtsPossibleLength()}</div>
          <div>{formatAccomplishments}</div>
          <div>
            <CopyToClipboard
              text={handleCopy()}
              onCopy={toggleTwitterRegularAlert}
            >
              <button type="button" className="btn btn-outline-primary">
                Copy
              </button>
            </CopyToClipboard>
            <div className="mt-3">
              <RegularAlert
                show={twitterRegularAlertStatus}
                msg={regularAlertErrMsg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterCard;
