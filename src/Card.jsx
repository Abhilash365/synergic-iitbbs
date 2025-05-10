import { useNavigate } from 'react-router-dom';
import './card.css';
import csImg from './cs.png';
import eceImg from './ec.png';
import eeImg from './ee.png';
import meImg from './me.png';
import mmImg from './mm.jpg';
import ceImg from './Ce.png';
import epImg from './ep.jpg';
import othersImg from './others.jpg';

export default function Card({ subject, code, num_mat, semester }) {  // 👈 Accept semester as prop
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
    const route = `/questionpapers/${subject.replace(/\s+/g, '_')}?semester=${semester}`;  // 👈 Add query param
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
            {/* <p className='des3'>{num_mat}+ materials available</p> */}
            <button onClick={handleExplore}>Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}
