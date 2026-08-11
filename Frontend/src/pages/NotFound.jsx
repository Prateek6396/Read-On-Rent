import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}