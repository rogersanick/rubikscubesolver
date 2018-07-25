import React from 'react';
import logo from'../images/Rubiks_Logo.png';
import photo1 from'../images/Rubiks_Insert.png';
import photo2 from'../images/grey_brain.png';

class RubiksLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="header__logo-box">
            <img src={logo} alt="Logo" className="header__logo" />
          </div>
          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">Ether Cube</span>
              <span className="heading-primary--sub">Send ETH, but make em' work for it.</span>
            </h1>
            <a href="/visualize" className="btn btn--white btn--animated">Get Started</a>
          </div>
        </header>
        <div className="u-margin-bottom-big"></div>

        <main>
          <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
              <h2 className="heading-secondary">
                Why a Rubiks Cube?
              </h2>
            </div>

            
            <div className="row row-animated__letter u-margin-bottom-medium">
              <div className="col-2-of-3">
                <div className="col-1-of-4 u-center-text">
                  <p className="capital-letter">
                    1
                  </p>
                </div>

                <div className="col-3-of-4">
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Incentivize friends or family to complete a challenging puzzle.
                  </h3>
                  <p className="paragraph">
                    This year, instead of sending a giftcard, cash or other ambigious gift; send a digital Rubik's Cube with real value inside! If they can't figure it out, send them a solve code to unlock their prize. Or don't!               
                  </p>
                  <a href="https://github.com/Team-Ravenclaw/LivePoll" className="btn-text"> Learn more on GitHub &rarr;</a>
                </div>
              </div>

              <div className="col-1-of-3">
                <div className="photo-centered">
                  <img src={photo1} alt="photo1" className="photo-centered__photo" />
                </div>
              </div>
            </div>

            <div className="u-horizontal-divider u-margin-bottom-medium"></div>

            <div className="row row-animated__letter">
            <div className="col-2-of-3">
              <div className="col-1-of-4 u-center-text">
                <p className="capital-letter">
                  2
                </p>
              </div>

              <div className="col-3-of-4">
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Learn a new skill on your own.
                </h3>
                <p className="paragraph">
                  Whether you're interested in learning how a Rubik's cube works or your a dedicated speed-cuber; learning to solve a cube in a digital setting will help train your critical thinking skills. Want to take a deeper dive? Consider checking out the solving algorithm on Github.
                </p>
                {/*<a href="#" className="btn-text"> Learn more &rarr;</a>*/}
              </div>
            </div>
                
              <div className="col-1-of-3">
                <div className="photo-centered">
                  <img src={photo2} alt="photo2" className="photo-centered__photo" />
                </div>
              </div>
            </div>
          </section>

          <section className="section-UX">
            
            <div className="u-center-text u-margin-top-big">
              <a href="/dashboard" className="btn btn--white">GET STARTED</a>
            </div>

          </section>
        </main>
      </div>
    );
  }
}

export default RubiksLanding;