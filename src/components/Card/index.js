import React from 'react';
import './card.css';

function Container({ title, content }) {
  return (
    <>
      <div className="card mx-auto mt-5">
        <div className="card-header text-center">
          <h3>{title}</h3>
        </div>
        <div className="card-body">{content}</div>
      </div>
    </>
  );
}

export default Container;
