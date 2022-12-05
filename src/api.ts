export const THE_MOVIE_DB_API_BASE_URL = process.env.THE_MOVIE_DB_API_BASE_URL,
    THE_MOVIE_DB_API_TOKEN = process.env.THE_MOVIE_DB_API_TOKEN,
    THE_MOVIE_DB_API_IMAGES_BASE_URL = process.env.THE_MOVIE_DB_API_IMAGES_BASE_URL

export interface IMovieDetail {
    title: string,
    id: number,
    backdrop_path: string,
    poster_path: string,
    release_date: string,
    popularity: number,
    vote_average: number,
    vote_count: number,
    adult: boolean,
    overview: string,
}

export interface IMovieMoreDetail extends IMovieDetail {
    homepage: string,
    tagline: string,
    genres: {
        id: number,
        name: string
    }
}

export interface ISearchMoviesByNameResponse {
    total_results: number,
    total_pages: number
    page: number,
    results: IMovieDetail[]
}

export async function searchMoviesByName(q: string, page = '1'): Promise<ISearchMoviesByNameResponse> {
    return fetch(
        `${THE_MOVIE_DB_API_BASE_URL}/search/movie?` + new URLSearchParams({
            query: q,
            page: page,
        }),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${THE_MOVIE_DB_API_TOKEN}`
            },
        }
    ).then(res => res.json())
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
    ).then(res => res.json())
}