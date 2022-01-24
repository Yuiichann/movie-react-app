import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
// import HeroSlide from 'components/HeroSlide/HeroSlide';

const HeroSlide = React.lazy(() => import('components/HeroSlide/HeroSlide'))

Home.propTypes = {

};

function Home(props) {

    return (
        <>
            <Suspense fallback={<div>Loading ... </div>}>
                <HeroSlide page="1" />
            </Suspense>
        </>
    );
}

export default Home;