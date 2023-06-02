import React from 'react';
import loader from '../assets/gif/loading.gif'

const Loading = () => {
    return ( 
        <div className='loader'>
            <img src={loader} alt='Loading...' />
        </div>
     );
}
 
export default Loading;