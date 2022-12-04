import React from 'react'
import { redirect, useLoaderData, useParams } from 'react-router-dom';
import { getMovieById } from '../fetchers';

export function MovieDetailPage() {
    const params = useParams();
    const { id, movie } = useLoaderData() as any;


    return (
        <main>
            <h1>Movie detail</h1>
            <span>{params.id}</span>
            <span> {JSON.stringify(movie)} </span>
        </main>
    )
}

export async function loader({ params }) {
    const id = params.id

    if (id) {
        const movie = await getMovieById(id).then((res: any) => res.json())
        return { id, movie };
    }

    return
}

