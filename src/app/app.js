import React from "react";
import MovieList from "../movie-list";

import TMDBService from "../services/tmdb-service";

export default class App extends React.Component {
    tmdbService = new TMDBService();

    state = {
        moviesList: null,
        loading: true
    }

    updateMovies() {
        this.tmdbService
            .getMovies()
            .then((movies) => {
                if (movies.length === 0) {
                    console.log('no movies')
                    this.setState({
                        moviesList: [],
                        loading: false
                    })
                } else {
                    console.log("update movies")
                    this.setState({
                        moviesList: movies
                    })
                }

            })

    }

    componentDidMount() {
        this.updateMovies();
    }

    render() {
        const {moviesList} = this.state;
        return (
            <div>
                <MovieList moviesList={moviesList}/>
            </div>
        )
    }
}