import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import { handleResponse,renderChangePercent } from '../../helpers';

import './Detail.css';


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
        const id = this.props.match.params.id;
        this.fetchCurrency(id);
        
    }
    componentWillReceiveProps(np){
        if(this.props.location.pathname !== np.location.pathname){
            const newId = np.match.params.id;
            this.fetchCurrency(newId);
        }
    }

    fetchCurrency(id){
        this.setState({loading: true});

        fetch(API_URL+"cryptocurrencies/"+id)
        .then(handleResponse)
        .then((currency) => {
            this.setState({
                loading:false,
                data: currency
            });
        })
        .catch((error) => {
            this.setState({
                loading:false, 
                error: error.errorMessage
            });
        });
    }
    render(){
        const { loading,error,data } = this.state;
        
        if(loading){
            return <div className="loading-container"><Loading/></div>
        }

        if(error){
            return <div className="error">{ error }</div>
        }

        return(
            <div className="Detail">
                <h1 className="Detail-heading">
                    {data.name} ({data.symbol})
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {data.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{data.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H Change
                        <span className="Detail-value">{renderChangePercent(data.percentChange24h)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market Cap</span>
                        <span className="Detail-dollar">$</span>
                        {data.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24H volume</span>
                        <span className="Detail-dollar">$</span>
                        {data.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total Supply</span>
                        {data.totalSupply}
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;