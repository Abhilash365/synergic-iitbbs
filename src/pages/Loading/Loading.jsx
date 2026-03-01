import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      {/* Both the animation and the text are now inside the flex container */}
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot" />
        <div className="newtons-cradle__dot" />
        <div className="newtons-cradle__dot" />
        <div className="newtons-cradle__dot" />
      </div>
      <p className="loading-text">Please wait... we are processing your request</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column; /* This stacks children vertically */
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 75vh; /* Creates consistent space between animation and text */

  .loading-text {
    font-family: sans-serif;
    color: #474554;
    font-size: 20px;
    margin: 0;
    /* Optional: adds a subtle fade-in-out effect */
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  /* --- ANIMATION STYLES --- */
  .newtons-cradle {
   --uib-size: 50px;
   --uib-speed: 1.2s;
   --uib-color: #474554;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   width: var(--uib-size);
   height: var(--uib-size);
  }

  .newtons-cradle__dot {
   position: relative;
   display: flex;
   align-items: center;
   height: 100%;
   width: 25%;
   transform-origin: center top;
  }

  .newtons-cradle__dot::after {
   content: '';
   display: block;
   width: 100%;
   height: 25%;
   border-radius: 50%;
   background-color: var(--uib-color);
  }

  .newtons-cradle__dot:first-child {
   animation: swing var(--uib-speed) linear infinite;
  }

  .newtons-cradle__dot:last-child {
   animation: swing2 var(--uib-speed) linear infinite;
  }

  @keyframes swing {
   0% { transform: rotate(0deg); animation-timing-function: ease-out; }
   25% { transform: rotate(70deg); animation-timing-function: ease-in; }
   50% { transform: rotate(0deg); animation-timing-function: linear; }
  }

  @keyframes swing2 {
   0% { transform: rotate(0deg); animation-timing-function: linear; }
   50% { transform: rotate(0deg); animation-timing-function: ease-out; }
   75% { transform: rotate(-70deg); animation-timing-function: ease-in; }
  }
`;

export default Loader;