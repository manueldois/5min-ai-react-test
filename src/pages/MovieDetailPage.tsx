import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { getMovieById, IMovieMoreDetail, THE_MOVIE_DB_API_IMAGES_BASE_URL } from '../api';
import './movie-detail-page.scss'

const imageUrl = new URL(
    '../static/forbidden-icon-10068.png?as=webp&width=780',
    // @ts-ignore
    import.meta.url
);


export function MovieDetailPage() {
    const params = useParams();
    const { movie: m } = useLoaderData() as {
        movie: IMovieMoreDetail
    };

    return (
        <main className='movie-detail-page'>
            <figure>
                {
                    m.backdrop_path
                        ?
                        <img src={`${THE_MOVIE_DB_API_IMAGES_BASE_URL}/w780/${m.backdrop_path}`} alt="" />
                        :
                        <img src={imageUrl.toString()} />
                }
            </figure>
            <br style={{ marginTop: 50 }}></br>
            <section>
            <h1>{m.title}</h1>
            <b>{m.genres[0]?.name}</b>
            <p>{m.overview}</p>
            <p>Vote average: {m.vote_average} from {m.vote_count} reviews</p>
            </section>
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

