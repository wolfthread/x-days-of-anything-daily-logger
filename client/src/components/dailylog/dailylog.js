import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getCurrentProfile, createProfile } from '../../actions/profile';
import { createDailyLog } from '../../actions/dailylog';
import { v4 as uuidv4 } from 'uuid';
import Header from '../header/header';
import DailyQuote from '../daily-quote/daily-quote';
import TwitterCard from '../twitter-card/twitter-card';
import GithubCard from '../github-card/github-card';
import DailyLogger from '../daily-logger/daily-logger';
import Timer from '../timer/timer';
import AddAccomplishment from '../add-accomplishment/add-accomplishment';
import AddLink from '../add-link/add-link';
import MainAlert from '../main-alert/main-alert';
import Spinner from '../layout/Spinner';

const DailyLog = ({
  getCurrentProfile,
  profile: { profile, loading },
  createDailyLog,

  history,
}) => {
  const [timer, setTimer] = useState({
    timerNotStarted: true,
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [timerInterval, setTimerInterval] = useState(null);
  const [timerAlertisOpen, setTimerAlertIsOpen] = useState(false);
  const [databaseAlertisOpen, setDatabaseAlertisOpen] = useState(false);
  const [regularAlertIsOpen, setRegularAlertIsOpen] = useState({
    twitter: false,
    github: false,
  });
  const [errMsgs, setSetErrMsgs] = useState({
    timerStarted: 'The timer is already started!',
    copied: 'Copied!',
    database: 'Daily Log Stored to DB!',
  });
  const [placeholderDay, setPlaceholderDay] = useState('Day ');
  const [placeholderChallenge, setPlaceholderChallenge] = useState(
    ' of #100DaysOfX'
  );
  const [placeholderProgress, setPlaceholderProgress] = useState(
    "\n**Today's Progress**\n"
  );
  const [placeholderThoughts, setPlaceholderThoughts] = useState(
    '\n**Thoughts**\n'
  );
  const [placeholderLinks, setPlaceholderLinks] = useState(
    '\n**Link(s) to work**\n'
  );
  const [placeholderSeparator, setPlaceholderSeparator] = useState('---');
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(new Date().toString().substring(0, 15));
  const [thoughts, setThoughts] = useState(null);
  const [numAccomplishments, setNumAccomplishments] = useState(0);
  const [numLinks, setNumLinks] = useState(0);
  const [accomplishments, setAccomplishments] = useState([]);
  const [links, setLinks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    getCurrentProfile();
    if (profile) {
      profile.openchallenges.forEach((chall) => {
        if (chall._id === profile.currentchallenge) {
          setPlaceholderChallenge(
            ` of #${chall.numberofdaystotal}DaysOf${chall.category}`
          );
          setCurrentCategory(chall.category);
          const newDay = chall.currentday + 1;
          setDay(newDay);
        }
      });
    }
    //eslint-disable-next-line
  }, []);

  // database access
  const storeToDB = () => {
    const dailylogToStore = {
      date,
      day,
      category: currentCategory,
      timer: getTimer(),
      thoughts,
      accomplishments: accomplishments.map((acc) => {
        return { accomplishment: acc.title.title };
      }),
      links: links.map((lnk) => {
        return { link: lnk.title.title };
      }),
    };
    createDailyLog(dailylogToStore, '/dashboard', history);

    const updatedDay = {
      openchallenges: profile.openchallenges.map((opChall) => {
        if (opChall._id.toString() === profile.currentchallenge) {
          return { ...opChall, currentday: parseInt(day) };
        } else {
          return opChall;
        }
      }),
    };
    createProfile(updatedDay, history, true);

    setDatabaseAlertisOpen(!databaseAlertisOpen);
    setTimeout(() => {
      setDatabaseAlertisOpen(null);
    }, 2500);
  };

  // timer code

  const handleResetTimer = () => {
    if (timer.timerNotStarted) {
      handleStopTimer();
      changeTimerBkgColor('#ed9d2b');
      setTimer({
        timerNotStarted: true,
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    } else {
      setTimerAlertIsOpen(!timerAlertisOpen);
      setTimeout(() => {
        setTimerAlertIsOpen(null);
      }, 2500);
    }
  };

  const handleStopTimer = () => {
    clearInterval(timerInterval);
    timer.timerNotStarted = true;
    changeTimerBkgColor('#d9534f');
    setTimer(timer);
  };

  const handleStartTimer = () => {
    changeTimerBkgColor('#5cb85c');
    if (timer.timerNotStarted) {
      setTimerInterval(
        setInterval(() => {
          increaseSeconds(timer);
          setTimer({
            timerNotStarted: false,
            seconds: timer.seconds,
            minutes: timer.minutes,
            hours: timer.hours,
          });
        }, 1000)
      );
    } else {
      setTimerAlertIsOpen(!timerAlertisOpen);
      setTimeout(() => {
        setTimerAlertIsOpen(null);
      }, 2500);
    }
  };

  const increaseSeconds = (timer) => {
    let seconds = timer.seconds;
    if (seconds < 59) {
      timer.seconds++;
    } else {
      timer.seconds = 0;
      increaseMinutes(timer);
    }
  };

  const increaseMinutes = (timer) => {
    let minutes = timer.minutes;
    if (minutes < 59) {
      timer.minutes++;
    } else {
      timer.minutes = 0;
      increaseHours(timer);
    }
  };

  const increaseHours = (timer) => {
    timer.hours++;
  };

  const getTimer = () => {
    const h = timer.hours;
    const m = timer.minutes;
    const s = timer.seconds;
    var formatted = '';
    h < 10 ? (formatted += '0' + h) : (formatted += h);
    formatted += ':';
    m < 10 ? (formatted += '0' + m) : (formatted += m);
    formatted += ':';
    s < 10 ? (formatted += '0' + s) : (formatted += s);
    return formatted;
  };

  const changeTimerBkgColor = (newColor) => {
    document.getElementById('timer').style.backgroundColor = newColor;
  };

  // alerts methods

  const handleTimerAlertStatus = () => {
    return timerAlertisOpen;
  };

  const toggleAlertTimer = () => {
    setTimerAlertIsOpen(!timerAlertisOpen);
  };

  const handleDatabaseAlertStatus = () => {
    return databaseAlertisOpen;
  };

  const toggleAlertDatabase = () => {
    setDatabaseAlertisOpen(!databaseAlertisOpen);
  };

  const handleErrorMessage = (msg) => {
    switch (msg) {
      case 'timer':
        return errMsgs.timerStarted;
      case 'database':
        return errMsgs.database;
      default:
        break;
    }
  };

  // twitter and github alerts

  const handleToggleGithubRegularAlert = () => {
    setRegularAlertIsOpen({
      github: !regularAlertIsOpen.github,
    });
    setTimeout(() => {
      setRegularAlertIsOpen({
        github: null,
      });
    }, 1200);
  };

  const handleRegularAlertErrMsg = () => {
    if (regularAlertIsOpen) {
      return errMsgs.copied;
    }
  };

  const handleRegularAlertStatus = (card) => {
    switch (card) {
      case 'twitter':
        return regularAlertIsOpen.twitter;
      case 'github':
        return regularAlertIsOpen.github;
      default:
        break;
    }
  };

  const handleToggleTwitterRegularAlert = () => {
    setRegularAlertIsOpen({
      twitter: !regularAlertIsOpen.twitter,
    });
    setTimeout(() => {
      setRegularAlertIsOpen({
        twitter: null,
      });
    }, 1200);
  };

  // daily logger methods

  const handleChangeDay = (val) => {
    setDay(val);
  };

  const handleChangeThoughts = (val) => {
    setThoughts(val);
  };

  // accomplishments

  const handleAddAccomplishment = () => {
    let currNum = numAccomplishments + 1;
    if (accomplishments) {
      accomplishments.push({
        id: uuidv4(),
        title: '',
      });
      setAccomplishments(accomplishments);
      setNumAccomplishments(currNum);
    } else {
      setAccomplishments([]);
      setNumAccomplishments(0);
    }
  };

  const handleGetNumAccomplishments = () => {
    return numAccomplishments;
  };

  const handleRemoveAccomplishment = (id) => {
    const filteredAccs = accomplishments.filter((currAcc) => currAcc.id !== id);
    let currNum = numAccomplishments - 1;
    setAccomplishments(filteredAccs);
    setNumAccomplishments(currNum);
  };

  const handleGetAccomplishments = () => {
    let allAccToRender = [];
    if (accomplishments) {
      accomplishments.forEach((element) => {
        allAccToRender.push(
          <AddAccomplishment
            key={element.id}
            id={element.id}
            logAccomplishment={handleLogAccomplishment}
            removeAccomplishement={handleRemoveAccomplishment.bind(
              this,
              element.id
            )}
          />
        );
      });
    }
    return allAccToRender;
  };

  const handleLogAccomplishment = (id, title) => {
    let newAccs = [...accomplishments];
    if (newAccs) {
      newAccs.forEach((acc) => {
        if (acc.id === id) {
          acc.title = title;
        }
      });
    }
    setAccomplishments(newAccs);
  };

  const handleFormatAccomplishments = () => {
    const trimmed = [];
    if (accomplishments) {
      accomplishments.forEach((acc) => {
        let currAcc = acc.title.title;
        trimmed.push(<p key={uuidv4()}>{currAcc}</p>);
      });
    }
    return trimmed;
  };

  const handleGetFormattedAccomplishments = () => {
    let formatted = '';
    if (accomplishments) {
      accomplishments.forEach((acc) => {
        let currAcc = acc.title.title ? acc.title.title : '';
        formatted += currAcc + '\n';
      });
    }
    return formatted;
  };

  // links

  const handleAddLink = () => {
    let currNum = numLinks + 1;
    links.push({
      id: uuidv4(),
      title: '',
    });
    setLinks(links);
    setNumLinks(currNum);
  };

  const handleRemoveLink = (id) => {
    const filteredLinks = links.filter((currLnk) => currLnk.id !== id);
    let currNum = numLinks - 1;
    setLinks(filteredLinks);
    setNumLinks(currNum);
  };

  const handleLogLink = (id, title) => {
    let newLinks = [...links];
    if (newLinks) {
      newLinks.forEach((lnk) => {
        if (lnk.id === id) {
          lnk.title = title;
        }
      });
    }
    setLinks(newLinks);
  };

  const handleGetLinks = () => {
    let allLinksToRender = [];
    if (links) {
      links.forEach((element) => {
        allLinksToRender.push(
          <AddLink
            key={element.id}
            id={element.id}
            logLink={handleLogLink}
            removeLink={handleRemoveLink.bind(this, element.id)}
          />
        );
      });
    }
    return allLinksToRender;
  };

  const handleFormatLinks = () => {
    const trimmed = [];
    if (links) {
      links.forEach((lnk) => {
        let currLnk = lnk.title.title;
        trimmed.push(<p key={uuidv4()}>{currLnk}</p>);
      });
    }
    return trimmed;
  };

  const handleGetFormattedLinks = () => {
    let formatted = '';
    if (links) {
      links.forEach((lnk) => {
        let currLnk = lnk.title.title;
        formatted += '- ' + currLnk + '\n\n';
      });
    }
    console.log(formatted);
    return formatted;
  };

  return loading && profile !== null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <div className="container-fluid">
            <Header />
            <div className="d-flex justify-content-around">
              <DailyQuote />
              <Timer
                startTimer={handleStartTimer}
                stopTimer={handleStopTimer}
                resetTimer={handleResetTimer}
                getTimer={getTimer()}
                alertStatusTimer={handleTimerAlertStatus()}
                toggleAlertTimer={toggleAlertTimer}
                errMsgTimer={handleErrorMessage('timer')}
              />
            </div>
            <div className="d-xl-flex d-md-wrap justify-content-center">
              <DailyLogger
                changeDay={handleChangeDay}
                changeThoughts={handleChangeThoughts}
                addAccomplishment={handleAddAccomplishment}
                addLink={handleAddLink}
                getAccomplishments={handleGetAccomplishments}
                getLinks={handleGetLinks}
                removeAccomplishement={handleRemoveAccomplishment}
                removeLink={handleRemoveLink}
                getNumAccomplishments={handleGetNumAccomplishments}
                logAccomplishment={handleLogAccomplishment}
                logLink={handleLogLink}
                placeholderDay={placeholderDay}
                getDay={day}
                placeholderChallenge={placeholderChallenge}
                getFormattedAccomplishments={handleGetFormattedAccomplishments()}
              />
              <div className="flex-column justify-content-center">
                <TwitterCard
                  placeholderDay={placeholderDay}
                  getDay={day}
                  placeholderChallenge={placeholderChallenge}
                  getThoughts={thoughts}
                  formatAccomplishments={handleFormatAccomplishments()}
                  getFormattedAccomplishments={handleGetFormattedAccomplishments()}
                  twitterRegularAlertStatus={handleRegularAlertStatus(
                    'twitter'
                  )}
                  toggleTwitterRegularAlert={handleToggleTwitterRegularAlert}
                  regularAlertErrMsg={handleRegularAlertErrMsg()}
                  getAccomplishmentLength={
                    accomplishments ? accomplishments.length : 0
                  }
                />
                <div className="d-flex justify-content-center mt-5">
                  <MainAlert
                    show={handleDatabaseAlertStatus()}
                    close={toggleAlertDatabase}
                    msg={handleErrorMessage('database')}
                    alertType={'success'}
                  />
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <button
                    className="btn btn-outline-primary mb-5"
                    onClick={storeToDB}
                  >
                    <i className="fas fa-database fa-4x mt-4 mb-2" />
                    <h4 className="text-primary d-flex justify-content-center">
                      Store your Daily Log
                    </h4>
                  </button>
                </div>
              </div>
              <GithubCard
                placeholderDay={placeholderDay}
                getDay={day}
                getDate={date}
                placeholderChallenge={placeholderChallenge}
                placeholderProgress={placeholderProgress}
                placeholderThoughts={placeholderThoughts}
                placeholderLinks={placeholderLinks}
                placeholderSeparator={placeholderSeparator}
                getThoughts={thoughts}
                formatAccomplishments={handleFormatAccomplishments()}
                formatLinks={handleFormatLinks()}
                getFormattedAccomplishments={handleGetFormattedAccomplishments()}
                getFormattedLinks={handleGetFormattedLinks()}
                githubRegularAlertStatus={handleRegularAlertStatus('github')}
                toggleGithubRegularAlert={handleToggleGithubRegularAlert}
                regularAlertErrMsg={handleRegularAlertErrMsg()}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="large text-primary mt-2 mb-4">Daily Logger</h1>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default withRouter(
  connect(mapStateToProps, {
    getCurrentProfile,
    createProfile,
    createDailyLog,
  })(DailyLog)
);
