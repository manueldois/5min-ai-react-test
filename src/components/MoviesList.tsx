import React from 'react'
import { Link } from 'react-router-dom'
import { THE_MOVIE_DB_API_IMAGES_BASE_URL } from '../api'

export function MoviesList({ movies }) {
    return <ul>
        {
            movies.map(m =>
                <li>
                    <Link to={`/movie/${m.id}`}>
                        <h3>{m.title}</h3>
                        {m.poster_path && <img src={`${THE_MOVIE_DB_API_IMAGES_BASE_URL}/w92/${m.poster_path}`} alt="" />}
                    </Link>
                </li>
            )
        }
    </ul>
}