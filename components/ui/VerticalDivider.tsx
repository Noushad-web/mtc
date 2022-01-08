import React from 'react'

const VerticalDivider = () => {
  return (
    <>
      <hr className="verticalDivider" />
      <style jsx>
        {`
          .verticalDivider {
            background-color: white;
            width: 2px;
            height: auto;
            background-color: rgba(255, 255, 255, 0.7);
            margin: 9px 0;
            opacity: 0.7;
          }
        `}
      </style>
    </>
  )
}

export default VerticalDivider
