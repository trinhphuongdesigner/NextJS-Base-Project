import React, { useState } from 'react';

export default function Index() {
  const [address, setAddress] = useState([]);
  const [isShowModal, setShowModal] = useState(false)

  // Helper function to get an element's exact position
  const getPosition = (el) => {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      if (el.tagName === 'BODY') {
        // deal with browser quirks with body/window/document and page scroll
        const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        const yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      // eslint-disable-next-line no-param-reassign
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos,
    };
  };

  const getClickPosition = (e) => {
    const theClickPoint = document.querySelector('#clickPoint');

    const parentPosition = getPosition(e.currentTarget);
    const xPosition = e.clientX - parentPosition.x - (theClickPoint.clientWidth / 2);
    const yPosition = e.clientY - parentPosition.y - (theClickPoint.clientHeight / 2);

    theClickPoint.style.left = `${xPosition}px`;
    theClickPoint.style.top = `${yPosition}px`;
    theClickPoint.style.display = 'block';
    setAddress([...address, {
      x: `${xPosition}px`,
      y: `${yPosition}px`,
    }]);
    setShowModal(true)
  };

  return (
    <>
      <div id="contentContainer" onClick={getClickPosition} role="presentation">
        <img src="https://i-giaitri.vnecdn.net/2019/12/20/thao-tam-tu-hotgirl-ielts-8-5-den-hong-trong-mat-biec-1576831788_680x0.jpg" alt="" />
        <span id="clickPoint" />
        {
          address && address.map((elm, i) => (
            <div
              key={i}
              className="dot"
              style={{
                left: elm.x,
                top: elm.y,
              }}
            />
          ))
        }
      </div>
      <ul>
        {address && address.map((item) => <li>{`X: ${item.x} ---- Y: ${item.y}`}</li>)}
      </ul>
      <div className="modal" style={{ display: `${isShowModal ? 'block' : 'none'}` }}>
        <button onClick={() => setShowModal(false)}>x</button>
        <p>Hello</p>
      </div>

      <style jsx>
        {`
          #contentContainer {
            position: relative;
            width: 1000px;
            height: auto;
            // border: 5px black solid;
            // background-color: #F2F2F2;
            overflow: hidden;
            cursor: pointer;
          }
          img {
            width: 100%
          }
          #clickPoint {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: red;
            display: none;
            z-index: 10;
          }
          .dot {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: black;
          }
          .modal {
            width: 150px;
            height: 150px;
            background: blue;
            color: white;
          }
        `}
      </style>
    </>
  );
};
