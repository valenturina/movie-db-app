import React from "react";

import './movie.css';
import blind from './test-image.jpg';

export default class Movie extends React.Component {
    render() {
        const {title, posterPath, overview, releaseDate } = this.props;

        if (this.props === null || this.props === undefined) {
            return (
                <li>
                    <span>
                        oups no content here
                    </span>
                </li>
            )
        }
        return (
            <li className="movie-card">
                <div className="movie-card__poster">
                    <img src={blind} alt="zaglushka" />
                </div>
                <div className="movie-card__text-content ">
                    <span className="movie-card__title">
                        <h5>{title}</h5>
                    </span>
                    <span className="movie-card__data">{releaseDate}</span>
                    <span className="movie-card__genres">genres</span>
                    <span className="movie-card__overview">
                        {overview}
                    </span>
                </div>
            </li>
        );
    }
}