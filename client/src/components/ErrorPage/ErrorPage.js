import React from 'react';

const ErrorPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-danger">Error</h1>
      <p className="lead">Oops! Something went wrong. Please contact the administrator.</p>
      <p className="text-muted">We apologize for the inconvenience.</p>
    </div>
  );
};

export default ErrorPage;
