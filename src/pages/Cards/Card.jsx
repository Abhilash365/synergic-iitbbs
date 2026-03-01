import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';

import csImg from './../../images/cs.png';
import ecImg from './../../images/ec.png';
import eeImg from './../../images/ee.png';
import meImg from './../../images/me.png';
import mmImg from './../../images/mm.png';
import ceImg from './../../images/ce.png';
import epImg from './../../images/ep.png';
import othersImg from './../../images/others.png';
import diagonal from './../../images/diagonal.png'

export default function Card({ subject, code, num_mat }) {
  const navigate = useNavigate();

  const departmentImages = {
    cs: csImg,
    ec: ecImg,
    ee: eeImg,
    me: meImg,
    ml: mmImg,
    ce: ceImg,
    ep: epImg,
  };

  const prefix = code.toLowerCase().match(/^[a-z]+/)?.[0];
  const imageSrc = departmentImages[prefix] || othersImg;

  const handleExplore = () => {
    const route = `/questionpapers/${subject.replace(/\s+/g, '_')}`;
    navigate(route);
  };

  return (
    <div className="main_card_wrapper">
      <div className="card_inner">
        <div className="icon_box">
          <img src={imageSrc} alt="dept-icon" className="subject_icon" />
        </div>

        <div className="text_box">
          <h2 className="subject_name">{subject}</h2>
          <p className="subject_id">{code}</p>
        </div>

        {/* Bottom Left Content */}
        <span className="materials_count">
          {num_mat || '5'}+ Materials Available
        </span>

        {/* Bottom Right Animated Button */}
        <button type="button" className="explore_btn" onClick={handleExplore}>
          <span className="btn_text">Explore</span>
          <span className="btn_icon">
            <img 
              src={diagonal}
              alt="arrow" 
              className="btn_svg"
            />
          </span>
        </button>
      </div>
    </div>
  );
}