import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount(){
        this.fetchCurrency();
    }

    fetchCurrency(){
        this.setState({loading: true});
        
        const {page} = this.state;

        fetch(API_URL+'cryptocurrencies?page='+page+'&perPage=20')
        .then(handleResponse)
        .then((data) => {
            const {currencies , totalPages} = data;

            this.setState({ 
                currencies: currencies,
                loading: false,
                totalPages:totalPages 
            });
        })
        .catch((error) => {
            this.setState({ error: error.errorMessage,loading: false });
        });
    }

    renderChangePercent(percent){
        if(percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        }else if(percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        }else{
            return <span>{percent}</span>
        }
    }

    handlePaginationClick(dir){
        let nextPage = this.state.page;

        nextPage = dir === 'next' ? nextPage+1 : nextPage-1;
        
        this.setState({ page: nextPage },()=>{
            this.fetchCurrency();    
        });
    }

    render(){
        const {loading,error,currencies,page,totalPages} = this.state;

        if(loading){
            return(<div className="loading-container"><Loading /></div>)
        }
        if(error){
            return <div className="error">{this.state.error}</div>
        }
        return(
            <div>
                <Table
                    currencies={currencies}
                    renderChangePercent={this.renderChangePercent}
                />
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;