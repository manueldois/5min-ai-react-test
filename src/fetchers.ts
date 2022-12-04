const { THE_MOVIE_DB_API_BASE_URL, THE_MOVIE_DB_API_TOKEN } = process.env

interface IMovieDetail {
    title: string,
    id: number,
    backdrop_path: string,
    poster_path: string,
    release_date: string,
    popularity: number,
    vote_average: number,
    vote_count: number,
    adult: boolean,
}

interface IMovieMoreDetail extends IMovieDetail {
    homepage: string,
    tagline: string,
    genres: {
        id: number,
        name: string
    }
}

interface ISearchMoviesByNameResponse {
    total_results: number,
    total_pages: number
    page: number,
    results: IMovieDetail[]
}

interface ISearchMoviesByNameResponse {
    total_results: number,
    total_pages: number
    page: number,
    results: IMovieDetail[]
}


export async function searchMoviesByName(q: string): Promise<ISearchMoviesByNameResponse> {
    return fetch(
        `${THE_MOVIE_DB_API_BASE_URL}/search/movie?` + new URLSearchParams({
            query: q
        }),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${THE_MOVIE_DB_API_TOKEN}`
            },
        }
    ) as any
}

export async function getMovieById(id: number): Promise<IMovieMoreDetail> {
    return fetch(
        `${THE_MOVIE_DB_API_BASE_URL}/movie/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${THE_MOVIE_DB_API_TOKEN}`
            },
        }
    ) as any
}