import React from 'react';
import './Search.css';
import {API_URL} from './../../config';
import { withRouter } from 'react-router-dom';
import {handleResponse} from './../../helpers';
import Loading from './Loading';

class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            searchQuery: '',
            loading: false,
            searchResult : []
        }

        this.handleResponse = this.handleResponse.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleResponse(id){
        this.setState({
            searchQuery : '',
            searchResult : [],
        });
        
        this.props.history.push('/currency/'+id);
    }

    handleEdit(e){
        const dataValue = e.target.value;

        this.setState({
            searchQuery : dataValue,
            loading: true,
        });

        if(!dataValue){
            return '';
        }

        fetch(API_URL+'autocomplete?searchQuery='+dataValue)
        .then(handleResponse)
        .then((result) => {
            this.setState({
                searchResult: result,
                loading:false
            });
        })
        .catch(error => {
            this.setState({
                loading:false
            });
        });

        
    }

    renderSearchResult(){
        const { searchResult,searchQuery,loading } = this.state;
        if(!searchQuery){
            return '';
        }
        if(searchResult.length > 0){
            return(
                <div className="Search-result-container">
                {searchResult.map((res) => (
                    <div 
                        className="Search-result"
                        key={res.id}
                        onClick={() => this.handleResponse(res.id)}
                    >
                        {res.name} ({res.symbol})
                        
                    </div>
                ))}
                </div>
            )
        }
        if(!loading){
            return(
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        Ganok
                    </div>
                </div>
            )
        }
        
    }

    render(){
        const { loading,searchQuery } = this.state;
        return(
            <div className="Search">
                <span className="Search-icon"/>
                <input 
                    className="Search-input"
                    onChange={this.handleEdit} 
                    type="text"
                    value={searchQuery}
                    placeholder="Currency name"
                />

                {loading &&
                <div className="Search-loading">
                    <Loading
                        width="12px"
                        height="12px"
                    />
                </div>}
                {this.renderSearchResult()}
            </div>
        );
    }
}

export default withRouter(Search);