import React, { useState } from 'react';

const About: React.FC = () => {
  const [imgSwitcher] = useState<'breus' | 'pokemon'>('breus');
  return (
    <>
      <div className="about__img about-img">
        <div className={`about-img__${imgSwitcher}`} />
      </div>

      <div className="about__content about-content">
        <div className="about-content__text">
          Independent creative designer
          <span className="about-content_grey">Sergey Breus</span>
        </div>

        <div className="about-content__text">
          My profile is the creation of effective and comprehensive solutions
          for your business.
        </div>

        <div className="about-content__text about-content_purpp">
          Webdesign &#47; Creative concept &#47; Identity &#47; Branding &#47;
          Campaigns
        </div>
      </div>
    </>
  );
};

export default About;
