import React from "react";

import './movie.css';


export default class Movie extends React.Component {
    _cutOverview(text, limit=140) {
        text = text.trim();
        if( text.length <= limit) return text;
        text = text.slice( 0, limit);
        let lastSpace = text.lastIndexOf(" ");
        if( lastSpace > 0) {
            text = text.substring(0, lastSpace);
        }
        return text + "...";
    }
    render() {

        const {title, release_date, overview, poster_path} = this.props.movieProps;
        const imgUrl = `https://image.tmdb.org/t/p/original/${poster_path}`



        return (
            <li className="movie-card">
                <div className="movie-card__poster">
                    <img src={imgUrl} alt="zaglushka" />
                </div>
                <div className="movie-card__text-content ">
                    <span className="movie-card__title">
                        <h5>{title}</h5>
                    </span>
                    <span className="movie-card__data">{release_date}</span>
                    <span className="movie-card__genres">genres</span>
                    <span className="movie-card__overview">
                        {this._cutOverview(overview)}
                    </span>
                </div>
            </li>
        );
    }
}