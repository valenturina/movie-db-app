import React from "react";
import Movie from "../movie";

import './movie-list.css';

export default class MovieList extends React.Component {


    render () {
        const {moviesList} = this.props;


        // const movies = moviesList.map((movie) => {
        //     const {id, ...movieProps} = movie;
        //     return (
        //         <Movie
        //         key={id}
        //         movieProps={movieProps}
        //         />
        //     )
        // })
        return (
            <ul className='container'>
                {/*{movies}*/}
                <Movie/>
            </ul>
        )
    }
}