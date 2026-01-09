import { useNavigate } from 'react-router-dom';
import './card.css';
import csImg from './images/cs.png';
import eceImg from './images/ec.png';
import eeImg from './images/ee.png';
import meImg from './images/me.png';
import mmImg from './images/mm.jpg';
import ceImg from './images/Ce.png';
import epImg from './images/ep.jpg';
import othersImg from './others.jpg';

export default function Card({ subject, code, num_mat, semester }) {
  const departmentImages = {
    cs: csImg,
    ece: eceImg,
    ee: eeImg,
    me: meImg,
    mm: mmImg,
    ce: ceImg,
    ep: epImg,
  };

  const prefix = code.toLowerCase().match(/^[a-z]+/)?.[0];
  const imageSrc = departmentImages[prefix] || othersImg;
  const navigate = useNavigate();

  const handleExplore = () => {
    // Navigating away... 
    // Because we used sessionStorage in Papers.jsx, 
    // the state will be there when we come back.
    const route = `/questionpapers/${subject.replace(/\s+/g, '_')}?semester=${semester}`;
    navigate(route);
  };

  return (
    <div className="main_Container">
      <div className='card'>
        <div className='content'>
          <div className='image'>
            <img className='img_content' src={imageSrc} alt="Subject" />
          </div>
          <div className="conten_desc">
            <p className='des1'>{subject}</p>
            <p className='des2'>{code}</p>
            <br />
            <button onClick={handleExplore}>Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}