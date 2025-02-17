import { useNavigate } from 'react-router-dom';
import './card.css'
import csImg from './cs.png';
import eceImg from './ec.png';
import eeImg from './ee.png';
import meImg from './me.png';
import mmImg from './mm.jpg';
import ceImg from './Ce.png'
import epImg from './ep.jpg';
import othersImg from './others.jpg'; // Default fallback image


export default function Card({subject,code,num_mat}){
    const departmentImages = {
        cs: csImg,
        ece: eceImg,
        ee: eeImg,
        me: meImg,
        mm: mmImg,
        ce: ceImg,
        ep: epImg,
    };
    
  // Extract the department prefix from the code (convert to lowercase for case insensitivity)
  const prefix = code.toLowerCase().match(/^[a-z]+/)?.[0]; 

  // Determine the image source based on the department prefix, defaulting to "others.png" if not found
  const imageSrc = departmentImages[prefix] || othersImg; 
  const navigate = useNavigate();

  const handleExplore = () => {
    const route = `/questionpapers/${subject.replace(/\s+/g, '_')}`;
    navigate(route);
};

    return (
<div className="main_Container">
<div className='card' >
 
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