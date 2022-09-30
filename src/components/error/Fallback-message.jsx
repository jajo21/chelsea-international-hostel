import React from 'react'
import { Link } from 'react-router-dom';
import './fallback-message.css';

export default class FallbackMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="error-div">
        <div className="error-content">
          <h2>Något gick snett vid hämtning av sidan. <br />Vi beklagar!</h2>
          <p className="error-details">
            {this.props.error && this.props.error.toString()}
          </p>
          <div className="error-buttons">
            <div className="error-reload">
              <button onClick={() => location.reload()}>Ladda om sidan</button>
            </div>
            <div className="error-home">
              <Link to={'/'}>
                <button onClick={() => this.props.handleHasError()}>Gå tillbaka till hem</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}