import Image from 'next/image';
import React from 'react';
import logo from '../../public/logo.png';
// import { jsx } from 'theme-ui';

const LoadingSpinner = () => {
  return (
    <div className="loader__wrapper">
      <figure>
        <Image
          className="img-fluid--headerLogo"
          src={logo.src}
          alt="logo"
          height={logo.height}
          width={logo.width}
        />
        <div className="loader"></div>
      </figure>
      <style jsx>
        {`
          .loader__wrapper {
            background-color: white;
            display: grid;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9999;
          }

          .loader {            
            border-top-color: #e82428 !important;
            -webkit-animation: spinner 1s linear infinite;
            animation: spinner 1s linear infinite;
            transition-timing-function: linear;
            border-radius: 9999px;
            border-width: 6px;
            border-top-width: 6px;
            --border-opacity: 1;
            border-color: #e5e7eb;
            border-color: rgba(229, 231, 235, var(--border-opacity));
            height: 7rem;
            width: 7rem;
            margin: 0 auto;
          }

          @-webkit-keyframes spinner {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }

          @keyframes spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingSpinner
