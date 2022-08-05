export default class TMDBService {

    _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=f025d328042d2ed742a7663e968247b0&language=en-US&query=return&page=1';


    async getResource(url) {
        const response = await fetch(url, {
            mode: "no-cors",
            header: {
                "content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`could not fetch ${url}, received ${response.status}`);
        }
        console.log(response)
        const body = await response.json();
        return body;
    }

    async getMovies() {
        const movies = await this.getResource(this._apiBase);
        console.log('got movies' + movies)
        return movies.results.map(this._transformMovie)
    }

    _transformMovie = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            overview: movie.overview,
            popularity: movie.popularity,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count
        }
    }
}