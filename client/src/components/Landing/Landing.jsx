import React from 'react';
import logo from'../../images/Rubiks_Logo.png';
import RubiksVisualization from './RubiksVisualization.jsx';

class RubiksLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.learnMoreDestination = document.getElementById('learn-more');
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="header__logo-box">
            <img src={logo} alt="Logo" className="header__logo" />
          </div>
          <div className="header__text-box">
            <h1 className="heading-primary flex-container column">
              <span className="heading-primary--main">DLC</span>
              <span className="heading-primary--sub">Distributed Ledger Cube</span>
            </h1>
            <div className="flex-container">
              <RubiksVisualization/>
            </div>
            <a href="/visualize" className="btn btn--grey btn--animated">Just Play</a>
            <a href="/login" className="btn btn--grey btn--animated">Set Up a Cube (Coming Soon)</a>
          </div>
        </header>
      </div>
    );
  }
}

export default RubiksLanding;