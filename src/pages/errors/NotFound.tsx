import React from 'react';
import { Link } from 'react-router-dom';

/** Util(s) */
import { ROUTE_URLS } from '../../routes/RouteUrls';

const NotFound = (): JSX.Element => (
  <section className="base">
    <nav className="navbar">
      <Link className="navlink" to={ROUTE_URLS.HOME_URL}>
        WEFOX
      </Link>
    </nav>
    <main className="main-section">
      <div className="error-card">
        <h1 className="title">404</h1>
        <p className="info">
          Something went wrong. We can’t find the page you are looking for
        </p>
        <Link to={ROUTE_URLS.HOME_URL} className="btn btn-green">
          Go back
        </Link>
      </div>
    </main>
  </section>
);

export default NotFound;
