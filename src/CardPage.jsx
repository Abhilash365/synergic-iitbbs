import Card from './Card.jsx';
import './CardPage.css'
import Navbar from './Navbar.jsx';
function CardPage() {
  return (<>
  <div >
   <Navbar></Navbar>
  </div>
    <div className='main56'>
      <Card subject='Data structures' code='CSL2001' num_mat={15}></Card>
      <Card subject='Data structures' code='CSL2001' num_mat={15}></Card>
      <Card subject='Data structures' code='CSL2001' num_mat={15}></Card>
      <Card subject='Data structures' code='CSL2001' num_mat={15}></Card>
      <Card subject='Data structures' code='CSL2001' num_mat={15}></Card>
    </div>
    </>
  );
}

export default CardPage;
