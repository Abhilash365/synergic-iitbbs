
import './Login.css'

// import './App.css'
function Login() {
    return (
        <>
       <div className='start'>
        <div className="heading">
         <div className="syn_text">
            Synergic
         </div>
         <div className='logo'><img src={pen} alt="no img ef" className='logo_img' /></div>
        </div>
        
        <div className="signup_text">
     Login
        </div>
       <div className="input">
        <div className="username "><input type="text" className='input_box' placeholder='Username' />
        </div>
        <div className="password "><input type="text"className='input_box' placeholder='Password'/></div>
        {/* <div className="conformPassword "><input type="text"  className='input_box' placeholder='ConformPassword'/></div> */}
       </div>
       
      
        <button className='signup_btn'>Sign in</button>
       
        <div className="last_text">
            <div className='account'>Don’t have an account?</div>
            <div className='signup'>Sign up</div>
        </div>
  
       </div>

     
       

        </>
    );
}

export default Login
