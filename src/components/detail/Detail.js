import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import { handleResponse } from '../../helpers';

import './Detail';


class Detail extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            data: [],
            error: null,
        };
    }

    componentDidMount(){

    }
    
    render(){
        return(<div>Detail Page</div>)
    }
}

export default Detail;