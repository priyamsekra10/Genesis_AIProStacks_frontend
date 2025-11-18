import * as React from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';
import { RTVIProvider } from './product/providers/RTVIProvider';

import { generateMockBlogData, generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';
import Heronew from '../components/Hero/Heronew';

const IndexPage = () => {
  const newArrivals = generateMockProductData(3, 'shirt');
  const blogData = generateMockBlogData(3);

  const goToShop = () => {
    navigate('/shop');
  };

  return (

    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <div className={`heroContainer ${styles.heroContainer}`}>
    <Hero
        image={'/AI_vizaro1.jpeg'}
        ctaAction={goToShop}
    />
</div>

      {/* Message Container */}
      <div className={styles.messageContainer}>
        <h3>
          SHOP LIKE NEVER BEFORE
        </h3>
      
      </div>

      {/* Collection Container
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'Discover the Latest Products'} />
          <ProductCollectionGrid />
        </Container>
      </div> */}

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'ELECTRONICS GALORE'} link={'/shopmen'} textLink={'explore more'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={newArrivals}
          />
        </Container>
      </div>

      {/* Highlight  */}
      <div className={styles.highlightContainer}>
        \n\n\n\n
        {/* <Container size={'large'} fullMobile>
          <Highlight 
            image={'/AI_vizaro3.png'}
            altImage={'highlight image'}
            miniImage={'/AI_Vizaro1.jpeg'}
            miniImageAlt={'mini highlight image'}
            title={'AI Sales Assistant with each product'}
            description={`Vizaro's AI Sales Assistant is your personal shopping assistant. It helps you find the perfect products, answer your questions, and make shopping easy and efficient.`}
            textLink={'shop now'}
            link={'/shop'}
          />
        </Container> */}
      </div>

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Heronew image={'/tittlebanner.jpg'} title={`-50% off \n All Essentials`} />
        <div className={styles.linkContainers}>
          {/* <Link to={'/shop'}>WOMENefjneojn</Link> */}
          <Link to={'/shopmen'}>ELECTRONICS</Link>
        </div>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-black)'}
        title={'about VIZARO'}
        quote={
          '"An shopping experience that resonates with you"'
        }
      />

      {/* Blog Grid */}
      {/* <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Journal'} subtitle={'Notes on life and style'} />
          <BlogPreviewGrid data={blogData} />
        </Container>
      </div> */}

      {/* Promotion */}
      {/* <div className={styles.sustainableContainer}>
        <Hero
          image={'/banner3.png'}
          title={'We are Sustainable'}
          subtitle={
            'From caring for our land to supporting our people, discover the steps we’re taking to do more for the world around us.'
          }
          ctaText={'read more'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div> */}


    </Layout>

  );
};

export default IndexPage;
