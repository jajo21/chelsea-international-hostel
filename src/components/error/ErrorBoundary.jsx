import React from "react";
import FallbackMessage from "./Fallback-message";

/**Global ErrorBoundary */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  componentDidCatch = (error, errorInfo) => {
    this.setState({
      error: error,
      errorInfo: errorInfo //errorInfo.componentStack ger dig mer info om felen.
    })
  }

  handleHasError = () => {
    this.setState({
      hasError: false
    })
  }

  render() {
    const error = this.state.error;
    const hasError = this.state.hasError;
    if (hasError && error) {
      return (
        <FallbackMessage
          error={error}
          handleHasError={this.handleHasError}
        />
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
