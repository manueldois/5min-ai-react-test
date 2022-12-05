import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { getMovieById, IMovieMoreDetail, THE_MOVIE_DB_API_IMAGES_BASE_URL } from '../api';

export function MovieDetailPage() {
    const params = useParams();
    const { movie: m } = useLoaderData() as {
        movie: IMovieMoreDetail
    };

    return (
        <main>
            <h1>Movie detail</h1>
            <h3>{m.title}</h3>
            {m.backdrop_path && <img src={`${THE_MOVIE_DB_API_IMAGES_BASE_URL}/w500/${m.backdrop_path}`} alt="" />}
            <p>{m.overview}</p>
            <p>Vote average: {m.vote_average} from {m.vote_count} reviews</p>
        </main>
    )
}

export async function loader({ params }) {
    const id = params.id

    if (id) {
        const movie = await getMovieById(id)
        return { id, movie };
    }

    return
}

