import React from "react";
import MovieList from "../movie-list";
import Spinner from "../spinner";
import ErrorIndicator from "../error-alert";
import {Pagination, Tabs} from "antd";
import SearchBar from "../search-bar";


import TMDBService from "../services/tmdb-service";
import {GetGenresProvider} from "../services/tmdb-service-context";

import "./app.css"

const {TabPane} = Tabs;

export default class App extends React.Component {


    state = {
        query: null,
        page: 1,
        moviesList: [],
        loading: true,
        hasError: false,
        pageTotal: 0,
        genres: [],
        ratedMovies: JSON.parse(localStorage.getItem('rated')) || [],
    }

    TMDBService = new TMDBService();
    storage = window.localStorage;

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
                       page: page,
                       loading: false,
                       pageTotal: res.total_results,
                       query: query
                   })
               }
            })
            .catch(this.onError)

    }

   handleRating = async (id, star, data) => {
        this.setState(({ratedMovies}) => {
            let store = ratedMovies;
            const idx = ratedMovies.findIndex(i => i.id === data.id);
            if (store.length === 0) {
                store.push(data)
            } else if (store.length > 0) {
                if (idx === -1) {
                    store.push(data)
                } else {
                    store = [
                        ...ratedMovies.slice(0, idx),
                        data,
                        ...ratedMovies.slice(idx + 1)
                    ]
                }
            }
            localStorage.setItem('rated', JSON.stringify(store))
            return {
                ratedMovies: store
            }
        })

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
                    pageTotal: res.total_results,
                    query: 'return'
                })
            })
            .catch((err) => {
                this.onError(err)
            })
    }

    setGenres = () => {
        this.TMDBService
            .getGenres()
            .then((genres) => {
                this.setState({
                    genres: genres
                })
            })
    }

    componentDidMount() {
        this.setMovies();
        this.setGenres();
    }



    render() {
        const {moviesList, loading, hasError, pageTotal, page, ratedMovies} = this.state;
        const errorAlert = hasError ? <ErrorIndicator/> : null;
        const hasData = !(loading || hasError);
        const spinner = loading? <Spinner/> : null
        const contentSearch = hasData? <MovieList moviesList={moviesList} handleRating={this.handleRating}/> : null;
        const contentRated = hasData? <MovieList moviesList={ratedMovies} handleRating={this.handleRating}/> : null;

        const pagination = hasData && moviesList.length !== 0 ? <Pagination
            total={pageTotal}
            onChange={(e) => this.onPageChange(e)}
            style={{display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px'}}
            size='small'
            current={page}
            pageSize={20}
            showSizeChanger={false}
        /> : null

        return (
            <GetGenresProvider value={this.state.genres}>
                <div className='app'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Search" key='1'>
                            <SearchBar onSearchMovie={this.onSearch}/>
                            {errorAlert}
                            {contentSearch}
                            {spinner}
                            {pagination}
                        </TabPane>
                        <TabPane tab="Rated" key='2'>
                            {spinner}
                            {errorAlert}
                            {contentRated}
                        </TabPane>
                    </Tabs>

                </div>
            </GetGenresProvider>
        )
    }
}