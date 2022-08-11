export default class TMDBService {

    _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=f025d328042d2ed742a7663e968247b0&language=en-US';
    _apiGenres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=f025d328042d2ed742a7663e968247b0';

    async getResource(url) {
        const response = await fetch(url, {
            mode: "cors",
            header: {
                "content-type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`could not fetch ${url}, received ${response.status}`);
        }
        const body = await response.json();
        return body;
    }

    async getMovies(query, page) {
        const searchUrl = `${this._apiBase}&query=${query}&page=${page}`;
        const movies = await this.getResource(searchUrl);
        return movies;
    }

    async getReturn() {
        const urlReturn = `${this._apiBase}&query='return'`;
        const moviesReturn = await this.getResource(urlReturn);
        return moviesReturn
    }

    async getGenres() {
        const {genres} = await this.getResource(this._apiGenres);
        return genres;
    }

}