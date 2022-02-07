import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import bg from 'assets/footer-bg.jpg';
import logo from 'assets/tmovie.png';
import { Link } from 'react-router-dom';

Footer.propTypes = {
    
};

function Footer(props) {
    const scrollTop = useRef(null)
    
    useEffect(() => {
        const item = scrollTop.current;

        item.addEventListener('click', () => {
            document.documentElement.scrollTop = 0;
        })

    }, [])

    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="container footer__content">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <div className="scroll-top" ref={scrollTop}>
                            <Link to='/'>tMovies</Link>
                        </div>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to='/'>Home</Link>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Term of Services</Link>
                        <Link to='/'>About Us</Link>
                    </div>

                    <div className="footer__content__menu">
                        <Link to='/'>Live</Link>
                        <Link to='/'>FAQ</Link>
                        <Link to='/'>Premium</Link>
                        <Link to='/'>Pravacy policy</Link>
                    </div>

                    <div className="footer__content__menu">
                        <Link to='/'>You must watch</Link>
                        <Link to='/'>Recent release</Link>
                        <Link to='/'>Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;