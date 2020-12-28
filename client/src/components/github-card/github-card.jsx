import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RegularAlert from "../../components/regular-alert/regular-alert";

const GithubCard = ({
  placeholderDay,
  getDay,
  getDate,
  placeholderProgress,
  getFormattedAccomplishments,
  placeholderThoughts,
  getThoughts,
  placeholderLinks,
  formatAccomplishments,
  getFormattedLinks,
  placeholderSeparator,
  formatLinks,
  toggleGithubRegularAlert,
  githubRegularAlertStatus,
  regularAlertErrMsg,
}) => {
  const handleCopy = () => {
    const head = "### " + placeholderDay + getDay + ": " + getDate + "\n";
    const body =
      placeholderProgress +
      "\n" +
      getFormattedAccomplishments +
      "\n" +
      placeholderThoughts +
      "\n" +
      getThoughts +
      "\n" +
      placeholderLinks +
      "\n" +
      getFormattedLinks +
      "\n" +
      placeholderSeparator;
    return head + body;
  };
  return (
    <div className="fixed p-2 bd-highlight">
      <div className="card bg-light mb-3">
        <div className="card-header">Github Log Markdown Format</div>
        <div className="card-body">
          <h4 className="card-title">
            ### {placeholderDay} {getDay}: {getDate}
          </h4>
          <p className="card-text">{placeholderProgress}</p>
          <div id="accomplishmentsLog">{formatAccomplishments}</div>
          <p className="card-text">{placeholderThoughts}</p>
          <p className="card-text">{getThoughts}</p>
          <p className="card-text">{placeholderLinks}</p>
          <div id="linksLog">{formatLinks}</div>
          <p className="card-text">{placeholderSeparator}</p>
          <div>
            <CopyToClipboard
              text={handleCopy()}
              onCopy={toggleGithubRegularAlert}
            >
              <button type="button" className="btn btn-outline-primary">
                Copy
              </button>
            </CopyToClipboard>
            <div className="mt-3">
              <RegularAlert
                show={githubRegularAlertStatus}
                msg={regularAlertErrMsg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubCard;
