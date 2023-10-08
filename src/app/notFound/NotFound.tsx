import React from 'react';
import './NotFound.scss';

export const NotFound: React.FC = () => (
  <div className="not-found">
    <div className="not-found__text">
      <span className="not-found__text_wrap">
        <span className="not-found__word">Page</span>
      </span>
      <span className="not-found__text_wrap not-found__text_wrap_sec">
        <span className="not-found__word not-found__word_sec">Nøt</span>
      </span>
      <span className="not-found__text_wrap not-found__text_wrap_last">
        <span className="not-found__word not-found__word_last">Føund</span>
      </span>
    </div>
  </div>
);
