import React, { useState, useContext, useEffect } from 'react';
import * as styles from './sample.module.css';
import { Link } from 'gatsby';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import Split from '../../components/Split';
import SwatchList from '../../components/SwatchList';
import Layout from '../../components/Layout/Layout';

import { generateMockProductData } from '../../helpers/mock';
import Icon from '../../components/Icons/Icon';
import ProductCardGrid from '../../components/ProductCardGrid';
import { navigate } from 'gatsby';

import CartContext from '../../context/CartContext';
import { Helmet } from 'react-helmet';

import {
  RTVIClientAudio,
  RTVIClientVideo,
  useRTVIClientTransportState,
} from '@pipecat-ai/client-react';
import { RTVIProvider } from '../../product-components/providers/RTVIProvider';
import { ConnectButton } from '../../product-components/components/ConnectButton';


import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
const ProductPage = (props) => {



  const { state } = props.location;
  const productDetails = state && state.productDetails;
  const productName = productDetails && productDetails.name;
  let sampleProduct;


  // Display different sample products based on the name
  if (productName === 'BFM 01') {
    sampleProduct = generateMockProductData(1, 'sample')[0];
  } else if (productName === 'BFM 02') {
    // Add conditions for other product names
    sampleProduct = generateMockProductData(1, 'sample1')[0];
  } else if (productName === 'BFM 03') {
    // Add conditions for other product names
    sampleProduct = generateMockProductData(1, 'sample2')[0];
  } else if (productName === 'BFM 04') {
    sampleProduct = generateMockProductData(1, 'sample3')[0];
  }
  else if (productName === 'BFM 05') {
    sampleProduct = generateMockProductData(1, 'sample4')[0];
  }
  else if (productName === 'BFM 06') {
    sampleProduct = generateMockProductData(1, 'sample5')[0];
  }
  else if (productName === 'BFM 07') {
    sampleProduct = generateMockProductData(1, 'sample6')[0];
  }
  else if (productName === 'Sticker 1') {
    sampleProduct = generateMockProductData(1, 'sample7')[0];
  }
  else if (productName === 'Sticker 2') {
    sampleProduct = generateMockProductData(1, 'sample8')[0];
  }
  else if (productName === 'Sticker 3') {
    sampleProduct = generateMockProductData(1, 'sample9')[0];
  }
  else if (productName === 'Sticker 4') {
    sampleProduct = generateMockProductData(1, 'sample10')[0];
  }
  else if (productName === 'Sticker 5') {
    sampleProduct = generateMockProductData(1, 'sample11')[0];
  }
  else if (productName === 'Sticker 6') {
    sampleProduct = generateMockProductData(1, 'sample12')[0];
  }
  else if (productName === 'Sticker 7') {
    sampleProduct = generateMockProductData(1, 'sample13')[0];
  }
  else if (productName === 'Sticker 8') {
    sampleProduct = generateMockProductData(1, 'sample14')[0];
  }
  else if (productName === 'Sticker 9') {
    sampleProduct = generateMockProductData(1, 'sample15')[0];
  }
  else if (productName === 'Sticker 10') {
    sampleProduct = generateMockProductData(1, 'sample16')[0];
  }
  else if (productName === 'Sticker 11') {
    sampleProduct = generateMockProductData(1, 'sample17')[0];
  }
  else if (productName === 'Sticker 12') {
    sampleProduct = generateMockProductData(1, 'sample18')[0];
  }
  else if (productName === 'Sticker 13') {
    sampleProduct = generateMockProductData(1, 'sample19')[0];
  }
  else if (productName === 'Sticker 14') {
    sampleProduct = generateMockProductData(1, 'sample20')[0];
  }
  else if (productName === 'Sticker 15') {
    sampleProduct = generateMockProductData(1, 'sample21')[0];
  }
  else if (productName === 'Sticker 16') {
    sampleProduct = generateMockProductData(1, 'sample22')[0];
  }
  else if (productName === 'Sticker 17') {
    sampleProduct = generateMockProductData(1, 'sample23')[0];
  }
  else if (productName === 'Sticker 18') {
    sampleProduct = generateMockProductData(1, 'sample24')[0];
  }
  else if (productName === 'BFM CROPTOP 08') {
    sampleProduct = generateMockProductData(1, 'sample25')[0];
  }
  else if (productName === 'BFM CROPTOP 09') {
    sampleProduct = generateMockProductData(1, 'sample26')[0];
  }
  else if (productName === 'BFM CROPTOP 10') {
    sampleProduct = generateMockProductData(1, 'sample27')[0];
  }
  else if (productName === 'BFM CROPTOP 11') {
    sampleProduct = generateMockProductData(1, 'sample28')[0];
  }
  else if (productName === 'BFM CROPTOP 12') {
    sampleProduct = generateMockProductData(1, 'sample29')[0];
  }
  else if (productName === 'BFM CROPTOP 13') {
    sampleProduct = generateMockProductData(1, 'sample30')[0];
  }
  else if (productName === 'BFM CROPTOP 14') {
    sampleProduct = generateMockProductData(1, 'sample31')[0];
  }
  else if (productName === 'BFM CROPTOP 15') {
    sampleProduct = generateMockProductData(1, 'sample32')[0];
  }
  else if (productName === 'BFM TSHIRT 16') {
    sampleProduct = generateMockProductData(1, 'sample33')[0];
  }
  else if (productName === 'BFM TSHIRT 17') {
    sampleProduct = generateMockProductData(1, 'sample34')[0];
  }
  else if (productName === 'BFM TSHIRT 18') {
    sampleProduct = generateMockProductData(1, 'sample35')[0];
  }
  else if (productName === 'BFM TSHIRT 19') {
    sampleProduct = generateMockProductData(1, 'sample36')[0];
  }
  else if (productName === 'BFM TSHIRT 20') {
    sampleProduct = generateMockProductData(1, 'sample37')[0];
  }
  else if (productName === 'BFM TSHIRT 21') {
    sampleProduct = generateMockProductData(1, 'sample38')[0];
  }
  else if (productName === 'BFM TSHIRT 22') {
    sampleProduct = generateMockProductData(1, 'sample39')[0];
  }
  else if (productName === 'BFM TSHIRT 23') {
    sampleProduct = generateMockProductData(1, 'sample40')[0];
  }
  else {
    // Default case or handle additional product names
    console.log('No Product')
    sampleProduct = null;

  }

  const productNameSafe = productName || "";
  const isSpecialCategory = productNameSafe.includes('Sticke') || productNameSafe.includes('BFM CROPTOP') || productNameSafe.includes('BFM TSHIRT');

  const isSticker = productNameSafe.toLowerCase().includes('sticker');




  const context = useContext(CartContext);
  const dispatch = context ? context.dispatch : () => { };
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  const [qty, setQty] = useState(1); // Initialize quantity state
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(
    sampleProduct && sampleProduct.colorOptions ? sampleProduct.colorOptions[0] : null
  );
  const [activeType, setActiveType] = useState(
    sampleProduct && sampleProduct.typeOptions ? sampleProduct.typeOptions[0] : null
  );
  const [activeSize, setActiveSize] = useState(
    sampleProduct && sampleProduct.sizeOptions ? sampleProduct.sizeOptions[0] : null
  );

  const originalBasePrice = sampleProduct ? sampleProduct.price : 0;
  const [basePrice, setBasePrice] = useState(originalBasePrice);

  // Calculate the total price
  const totalPrice = basePrice * qty;  // Multiply basePrice by quantity

  const handleTypeSelection = (type) => {
    setActiveType(type);
    if (sampleProduct && sampleProduct.typePriceAdjustments && sampleProduct.typePriceAdjustments[type]) {
      const adjustment = sampleProduct.typePriceAdjustments[type];
      setBasePrice(originalBasePrice + adjustment);
    } else {
      setBasePrice(originalBasePrice); // Revert to original base price if no adjustment is found
    }
  };
  const [buttonText, setButtonText] = useState('Add to Cart');
  const handleAddToCart = () => {
    if (dispatch && sampleProduct) {
      // Create a new product object with the adjusted price and current quantity
      const productWithAdjustedPrice = {
        ...sampleProduct,
        price: totalPrice, // Use the totalPrice
        quantity: qty, // Include the selected quantity
        sizeOptions: activeSize,
        typeOptions: activeType,
      };

      // Dispatch the new product object to the cart
      dispatch({ type: 'ADD_ITEM', payload: productWithAdjustedPrice });
      setButtonText('Added to Cart')
    } else {
      console.error('Dispatch function not available or sampleProduct is null');
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <RTVIProvider>
    <Layout>
      <div className={styles.root}>
      <Helmet>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
      </Helmet>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            <div className={styles.gallery}>
              {sampleProduct && isSpecialCategory ? (
                // For special categories, display only the specified photo (e.g., the fourth one)
                <img style={{
                  maxWidth: '100%',
                  maxHeight: '100vh',
                  objectFit: 'contain'
                }} src={sampleProduct.gallery[2].image} alt="Special Product" />
              ) : (
                // Otherwise, render the Gallery component as before
                <Gallery 
                  images={sampleProduct?.gallery ?? []} 
                  video={sampleProduct?.video ?? null} 
                  ar={sampleProduct?.ar ?? null}
                  dimensions={sampleProduct?.dimensions}
                />
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '90px' }}></div>
            {/* add syle to h1 with text color white */}
            

            <div className={styles.details}>
       
              {sampleProduct && (sampleProduct.name) && (<h1>{sampleProduct.name}</h1>)}
              {sampleProduct && (sampleProduct.vendor) && (<span className={styles.vendor}> by {sampleProduct.vendor}</span>)}

              <div className={styles.priceContainer}>
                {sampleProduct && (sampleProduct.price) && (<CurrencyFormatter appendZero amount={totalPrice} />)}

              </div>



              {!isSticker && (
                <div className={styles.sizeContainer}>
                  <SizeList
                    sizeList={(sampleProduct && sampleProduct.sizeOptions) || []}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                  />
                </div>
              )}
              <br />
              <div className={styles.typeContainer}>
                {sampleProduct && sampleProduct.typeOptions && sampleProduct.typeOptions.map((type, index) => (
                  <button
                    key={index}
                    className={`${styles.typeButton} ${type === activeType ? styles.activeType : ''}`}
                    onClick={() => handleTypeSelection(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>




              <div className={styles.quantityContainer}>
                <span>Quantity</span>
                <AdjustItem qty={qty} setQty={setQty} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button
                    onClick={() => handleAddToCart(sampleProduct)}
                    fullWidth
                    level={'primary'}
                  >
                    {buttonText} {/* Use the state for button text */}
                  </Button>
                </div>
                <br />
                <br />
                <br />

                <div className={styles.addToButtonContainer}>
                  < Link
                    to='/cart'
                  >
                    <Button

                      fullWidth
                      level={'secondary'}

                    >
                      Go to Cart {/* Use the state for button text */}
                    </Button>
                  </Link>
                </div>
                
                <div className={styles.wishlistActionContainer}>
                <Icon symbol={'bag'}></Icon>
                </div>

                <ConnectButton productId="iphone" agentId="YOUR_AGENT_ID" />
            <RTVIClientAudio />
                <br />
             
                  
                <div style={{ float: 'left', margin: '0 0 10px' }}>
                <br />
          
                </div>



   
               
              </div>
              {
                showPopup && (


                  <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>


                      <form class="max-w-md mx-auto">
                        <div class="relative z-0 w-full mb-5 group">
                          <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                          <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                          </div>
                          <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                          </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                          <div class="relative z-0 w-full mb-5 group">
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                          </div>
                          <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                          </div>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>


                        <button
                          type="button"
                          onClick={togglePopup}
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Close
                        </button>
                      </form>
                    </div>
                  </div>

                )
              }



              {/* <div className={styles.informationContainer}>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'composition & care'}
                >
                  <p className={styles.information}>
                    {sampleProduct.description}
                  </p>
                </Accordion>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'delivery & returns'}
                >
                  <p className={styles.information}>
                    {sampleProduct.description}
                  </p>
                </Accordion>
                <Accordion type={'plus'} customStyle={styles} title={'help'}>
                  <p className={styles.information}>
                    {sampleProduct.description}
                  </p>
                </Accordion>
              </div> */}
            </div>
          </div>
          {/* <div className={styles.suggestionContainer}>
            <h2>You may also like</h2>
            <ProductCardGrid
              spacing
              showSlider
              height={400}
              columns={4}
              data={suggestions}
            />
          </div> */}
        </Container>

        <div className={styles.attributeContainer}>
          <Split
            image={'/tittlebanner.jpg'}
            alt={'attribute description'}
            title={'VIZARO'}
            description={
              ''
            }
            ctaText={'learn more'}
            cta={() => navigate('/')}
            bgColor={'var(--standard-light-grey)'}
          />
        </div>
      </div>
    </Layout>
    </RTVIProvider>
  );
};

export default ProductPage;
