import React, { useEffect } from 'react';
import * as styles from './Gallery.module.css';
import { Helmet } from 'react-helmet';

const Gallery = (props) => {
  const { images, video, ar, dimensions } = props;
  console.log(ar);
  console.log(dimensions);
  console.log("width",dimensions?.width);
  console.log("height",dimensions?.height);
  console.log("depth",dimensions?.depth);
  console.log("weight",dimensions?.weight);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const modelViewer = document.querySelector('#dimension-demo');
    if (!modelViewer) return;

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
        dimensions?.height;

      modelViewer.updateHotspot({
        name: 'hotspot-dot+X-Y-Z',
        position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim+X-Z',
        position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
        dimensions?.height;

      modelViewer.updateHotspot({
        name: 'hotspot-dot+X+Y-Z',
        position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim+Y-Z',
        position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
        dimensions?.width;
        // this is width

      modelViewer.updateHotspot({
        name: 'hotspot-dot-X+Y-Z',
        position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Z',
        position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
        dimensions?.height;
        // this is hight

      modelViewer.updateHotspot({
        name: 'hotspot-dot-X-Y-Z',
        position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Y',
        position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
      });
      modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').textContent =
        dimensions?.depth;
        // this is depth

      modelViewer.updateHotspot({
        name: 'hotspot-dot-X-Y+Z',
        position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
      });

      renderSVG();
      modelViewer.addEventListener('camera-change', renderSVG);
    });
  }, [dimensions]);

  const renderGalleryItems = () => {
    const galleryItems = images?.map((imageObject, index) => {
      if (index === 0 && video) {
        return (
          <div key="video">
            <Helmet>
              <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
              <style>
                {`
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

            <model-viewer id="dimension-demo" src={ar} ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="poster.webp" shadow-intensity="1" style={{width: '100%', height: '520px'}}>
              <div className="progress-bar hide" slot="progress-bar">
                <div className="update-bar"></div>
              </div>
              <button slot="hotspot-dot+X-Y+Z" className="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
              <button slot="hotspot-dim+X-Y" className="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
              <button slot="hotspot-dot+X-Y-Z" className="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
              <button slot="hotspot-dim+X-Z" className="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
              <button slot="hotspot-dot+X+Y-Z" className="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
              <button slot="hotspot-dim+Y-Z" className="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
              <button slot="hotspot-dot-X+Y-Z" className="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
              <button slot="hotspot-dim-X-Z" className="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
              <button slot="hotspot-dot-X-Y-Z" className="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
              <button slot="hotspot-dim-X-Y" className="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
              <button slot="hotspot-dot-X-Y+Z" className="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
              <button slot="ar-button" id="ar-button">
                View in your space (AR)
              </button>
              <svg id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="dimensionLineContainer">
                <line className="dimensionLine"></line>
                <line className="dimensionLine"></line>
                <line className="dimensionLine"></line>
                <line className="dimensionLine"></line>
                <line className="dimensionLine"></line>
              </svg>
            </model-viewer>
          </div>
        );
      } else {
        return (
          <div key={index} className={styles.imageContainer}>
            <img alt={imageObject.alt} src={imageObject.image} />
          </div>
        );
      }
    });

    return galleryItems;
  };

  return (
    <div className={styles.root}>
      <div className={styles.cardGrid}>
        {renderGalleryItems()}
      </div>
    </div>
  );
};

export default Gallery;
