import { Link} from 'gatsby';
import CartContext from '../context/CartContext';
import React, { useContext, useEffect } from 'react';


import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import * as styles from './cart.module.css';
import { Helmet } from 'react-helmet';

const ARPage = (props) => {
  const context = useContext(CartContext);
  const state = context?.state || { totalCost: 0, items: [] };
  const { items, totalCost } = state;
  //  size={state.sizeOptions} type={state.typeOptions} quantity={state.quantity}  

  const itemNames = items.map(item => item.name); 
  const itemSize = items.map(item => item.sizeOptions); 
  const itemType = items.map(item => item.typeOptions); 
  const itemQuantity = items.map(item => item.quantity); 

  useEffect(() => {
    const modelViewer = document.querySelector('#dimension-demo');
    if (!modelViewer) return;

    const checkbox = modelViewer.querySelector('#show-dimensions');
    const dimElements = [...modelViewer.querySelectorAll('button'), modelViewer.querySelector('#dimLines')];

    function setVisibility(visible) {
      dimElements.forEach((element) => {
        if (visible) {
          element.classList.remove('hide');
        } else {
          element.classList.add('hide');
        }
      });
    }

    checkbox.addEventListener('change', () => {
      setVisibility(checkbox.checked);
    });

    modelViewer.addEventListener('ar-status', (event) => {
      setVisibility(checkbox.checked && event.detail.status !== 'session-started');
    });

    // update svg
    function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
      if (dotHotspot1 && dotHotspot2) {
        svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
        svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
        svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
        svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);

        if (dimensionHotspot && !dimensionHotspot.facingCamera) {
          svgLine.classList.add('hide');
        } else {
          svgLine.classList.remove('hide');
        }
      }
    }

    const dimLines = modelViewer.querySelectorAll('line');

    const renderSVG = () => {
      drawLine(dimLines[0], modelViewer.queryHotspot('hotspot-dot+X-Y+Z'), modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Y'));
      drawLine(dimLines[1], modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Z'));
      drawLine(dimLines[2], modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X+Y-Z'));
      drawLine(dimLines[3], modelViewer.queryHotspot('hotspot-dot-X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dim-X-Z'));
      drawLine(dimLines[4], modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y+Z'), modelViewer.queryHotspot('hotspot-dim-X-Y'));
    };

    modelViewer.addEventListener('load', () => {
      const center = modelViewer.getBoundingBoxCenter();
      const size = modelViewer.getDimensions();
      const x2 = size.x / 2;
      const y2 = size.y / 2;
      const z2 = size.z / 2;

      modelViewer.updateHotspot({
        name: 'hotspot-dot+X-Y+Z',
        position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim+X-Y',
        position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim+X-Y"]').textContent =
        `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: 'hotspot-dot+X-Y-Z',
        position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim+X-Z',
        position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
        `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: 'hotspot-dot+X+Y-Z',
        position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim+Y-Z',
        position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
        `${(size.x * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: 'hotspot-dot-X+Y-Z',
        position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Z',
        position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
        `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: 'hotspot-dot-X-Y-Z',
        position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Y',
        position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').textContent =
        `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: 'hotspot-dot-X-Y+Z',
        position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
      });

      renderSVG();
      modelViewer.addEventListener('camera-change', renderSVG);
    });
  }, []);

  return (
    <div>
      <Helmet>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
        <style>
          {`
            #controls {
              position: absolute;
              bottom: 16px;
              right: 16px;
              max-width: unset;
              transform: unset;
              pointer-events: auto;
              z-index: 100;
              background: rgba(255, 255, 255, 0.8);
              padding: 0.5rem;
              border-radius: 0.5rem;
            }

            .dot {
              display: none;
            }

            .glass {
              background: rgba(255, 255, 255, 0.37);
              backdrop-filter: blur(8px) contrast(0.89) saturate(1.27);
              -webkit-backdrop-filter: blur(8px) contrast(0.89) saturate(1.27);
              border: 1px solid rgba(255, 255, 255, 0.4);
              padding: 0.5rem;
              border-radius: 0.5rem;
            }

            .dim {
              border-radius: 4px;
              border: none;
              box-sizing: border-box;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
              color: rgba(0, 0, 0, 0.8);
              display: block;
              font-family: Futura, Helvetica Neue, sans-serif;
              font-size: 1em;
              font-weight: 700;
              max-width: 128px;
              overflow-wrap: break-word;
              padding: 0.5em 1em;
              position: absolute;
              width: max-content;
              height: max-content;
              transform: translate3d(-50%, -50%, 0);
              pointer-events: none;
              --min-hotspot-opacity: 0;
            }

            @media only screen and (max-width: 800px) {
              .dim {
                font-size: 3vw;
              }
            }

            .dimensionLineContainer {
              pointer-events: none;
              display: block;
            }

            .dimensionLine {
              stroke: #16a5e6;
              stroke-width: 2;
              stroke-dasharray: 2;
            }

            .hide {
              display: none;
            }

            :not(:defined)>* {
              display: none;
            }

            #ar-button {
              background-image: url(../../assets/ic_view_in_ar_new_googblue_48dp.png);
              background-repeat: no-repeat;
              background-size: 20px 20px;
              background-position: 12px 50%;
              background-color: #fff;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              white-space: nowrap;
              bottom: 132px;
              padding: 0px 16px 0px 40px;
              font-family: Roboto Regular, Helvetica Neue, sans-serif;
              font-size: 14px;
              color:#4285f4;
              height: 36px;
              line-height: 36px;
              border-radius: 18px;
              border: 1px solid #DADCE0;
            }

            #ar-button:active {
              background-color: #E8EAED;
            }

            #ar-button:focus {
              outline: none;
            }

            #ar-button:focus-visible {
              outline: 1px solid #4285f4;
            }
          `}
        </style>
      </Helmet>

      <model-viewer id="dimension-demo" ar ar-modes="webxr" ar-scale="fixed" camera-orbit="-30deg auto auto" max-camera-orbit="auto 100deg auto" shadow-intensity="1" camera-controls touch-action="pan-y" auto-rotate src="./media/gltf/space/hive3.glb" alt="A 3D model of a lamp.">
        <button slot="hotspot-dot+X-Y+Z" class="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
        <button slot="hotspot-dim+X-Y" class="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
        <button slot="hotspot-dot+X-Y-Z" class="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
        <button slot="hotspot-dim+X-Z" class="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
        <button slot="hotspot-dot+X+Y-Z" class="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
        <button slot="hotspot-dim+Y-Z" class="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
        <button slot="hotspot-dot-X+Y-Z" class="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
        <button slot="hotspot-dim-X-Z" class="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
        <button slot="hotspot-dot-X-Y-Z" class="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
        <button slot="hotspot-dim-X-Y" class="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
        <button slot="hotspot-dot-X-Y+Z" class="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
        <button slot="ar-button" style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; left: 16px; ">
          👋 View in your space (AR)
        </button>
        <svg id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dimensionLineContainer">
          <line class="dimensionLine"></line>
          <line class="dimensionLine"></line>
          <line class="dimensionLine"></line>
          <line class="dimensionLine"></line>
          <line class="dimensionLine"></line>
        </svg>
      
        <div id="controls" class="dim glass">
          <label for="show-dimensions">Show Dimensions:</label>
          <input id="show-dimensions" type="checkbox" checked="true"/>
        </div>
      </model-viewer>
      <Footer />
    </div>
  );
};

export default ARPage;

