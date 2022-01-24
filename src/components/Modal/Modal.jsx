import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './Modal.scss';

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
    onClose: PropTypes.func
};

function Modal(props) {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])
    
    const handleClickModal = (e) => {
        const item = e.target.closest('.active')

        if (item) {
            e.target.classList.toggle('active')

            if (props.onClose) props.onClose();
        }
    }

    return (
        <div 
            id={props.id} 
            className={`modal ${active ? 'active' : ''}`}
            onClick={(e) => handleClickModal(e)}
        >
            {props.children}     
        </div>
    );
}

export const ModalContent = props => {

    const contentRef = useRef(null);
    
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose()
    }

    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal;
