import React from 'react';
import './Contacts.scss';

const Contacts: React.FC = () => (
  <div className="contacts">
    <div className="contacts__title">
      To contact me about a project or collaboration:
    </div>

    <a className="contacts__mail" href="mailto:sbreus03@gmail.com">
      sbreus03@gmail.com
    </a>

    <div className="contacts__socials socials">
      <a
        className="socials__link"
        href="https://www.instagram.com/breus_/"
        target="_blank"
      >
        Instagram
      </a>
      <a
        className="socials__link"
        href="https://t.me/breus1710"
        target="_blank"
      >
        Telegram
      </a>
      <a
        className="socials__link"
        href="https://www.behance.net/super_sayaf755"
        target="_blank"
      >
        Behance
      </a>
      <a
        className="socials__link"
        href="https://savee.it/breus_/"
        target="_blank"
      >
        Savvee
      </a>
    </div>
  </div>
);

export default Contacts;
