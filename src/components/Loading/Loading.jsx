import React from 'react';
import './Loading.scss';
import loading from 'assets/loading.gif';


function Loading(props) {
    return (
        <div className="loading-icon">
            <img src={loading} alt='Loading' />
        </div>
    );
}

export default Loading;