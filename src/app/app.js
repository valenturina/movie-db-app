import React from "react";
import MovieList from "../movie-list";
import Spinner from "../spinner";
import ErrorIndicator from "../error-alert";
import {Pagination} from "antd";
import SearchBar from "../search-bar";

import TMDBService from "../services/tmdb-service";

import "./app.css"

export default class App extends React.Component {


    state = {
        query: null,
        page: 1,
        moviesList: [],
        loading: true,
        hasError: false,
        pageTotal: 0
    }

    TMDBService = new TMDBService();

    updateMovies(query, page=1) {
        this.TMDBService
            .getMovies(query, page)
            .then((res) => {
               if (res.length === 0) {
                   this.setState({
                       moviesList: [],
                       loading: false,
                   })
               } else {
                   this.setState( {
                       moviesList: res.results,
                       loading: false,
                       pageTotal: res.total_results
                   })
               }
            })
            .catch(this.onError)

    }

    onError = (err) => {
        this.setState({
            loading: false,
            hasError: true
        })
    }

    onSearch = (value='return') => {
        this.setState({
            loading: true
        })
        this.updateMovies(value, 1);
    }

    onPageChange = (curPage) => {
        window.scroll({
            top: 0
        })
        this.setState({
            loading: true
        })
        this.updateMovies(this.state.query, curPage)

    }

    setMovies() {
        this.setState({
            loading: true
        })
        this.TMDBService
            .getReturn()
            .then((res) => {
                this.setState({
                    moviesList: res.results,
                    loading: false,
                    pageTotal: res.total_results
                })
            })
            .catch((err) => {
                this.onError(err)
            })
    }

    componentDidMount() {
        this.setMovies();
    }



    render() {
        const {moviesList, loading, hasError, pageTotal, page} = this.state;
        const errorAlert = hasError ? <ErrorIndicator/> : null;
        const hasData = !(loading || hasError);
        const spinner = loading? <Spinner/> : null
        const content = hasData? <MovieList moviesList={moviesList}/> : null;
        const pagination = hasData? <Pagination
            total={pageTotal}
            onChange={(e) => this.onPageChange(e)}
            style={{marginTop: '10px'}}
            current={page}
            pageSize={20}
            showSizeChanger={false}
        /> : null

        return (
            <div className='app'>
                <SearchBar onSearchMovie={this.onSearch}/>
                {errorAlert}
                {content}
                {spinner}
                {pagination}
            </div>
        )
    }
}