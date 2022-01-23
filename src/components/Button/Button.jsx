import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

Button.propTypes = {
    onClick: PropTypes.func,
};

function Button(props) {
    return (
        <button 
            className={`btn ${props.className}`} 
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    );
}

function OutlineButton(props) {
    return (
        <Button
            className={`btn-outline ${props.className}`} 
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    )
}

export default Button;