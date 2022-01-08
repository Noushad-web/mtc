import Option from "./Option";
import { AiOutlineDown } from "react-icons/ai";
import Link from "next/link";

export default function Dropdown({ btnStyle, name, children, url }) {
  // console.log(children)
  return (
    <div className="dropdown">
      <Link href={url} passHref className={(!btnStyle) ? `dropdown__btn` : `${btnStyle}`}>
        <div className="dropdown__btn__link">
          {name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10px" height="6px">
            <path fillRule="evenodd" fill="rgb(255, 255, 255)"
              d="M1.274,0.006 L4.997,3.542 L8.678,0.002 L9.994,1.217 L4.997,6.002 L-0.000,1.217 L1.274,0.006 Z" />
          </svg>
        </div>
      </Link>
      <div className="dropdown__content">
        {children}
      </div>
      <style jsx>{`
        .dropdown{
          margin: 0;
          position: relative;
          // padding: 0.5rem 1rem;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dropdown__btn{
          background-color: #06c506;
          color: white;
          textTransform: capitalize;
          padding: 0; 
          font-weight: 600;          
        }

        .dropdown__btn__link {
          display: flex;
          align-items: center;
          column-gap: .5rem;
        }

        /* important */
        .dropdown__content{
          display: none;
          /* border: 1px solid purple; */
          width: max-content;
          position: absolute;
          left: 0px;
          right: 500px;
          top: 100%;
          z-index: 3;
          min-width: 100px;
        }

        .dropdown__content:last-child {
          border-bottom: 0;
        }

        // @media screen and (min-width: 992px) and (max-width: 1399px) {
        //   .dropdown__content {
        //     width: fit-content;
        //   }
        // }

        /* important */
         .dropdown:hover > .dropdown__content{ 
          /* display: inline-block; */
           display: block; 
         } 

        .dropdown__btn:hover{
          cursor: pointer;
        }
      `}
      </style>
    </div>
  )
}

Dropdown.Option = Option;


