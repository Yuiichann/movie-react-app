import React from 'react';
import PropTypes from 'prop-types';
import HeroSlide from 'components/HeroSlide/HeroSlide';

Detail.propTypes = {
    
};

function Detail(props) {

    const randomNumber = Math.trunc(Math.random() * 100)

    return (
        <div>
            <HeroSlide page={randomNumber} />
        </div>
    );
}

export default Detail;