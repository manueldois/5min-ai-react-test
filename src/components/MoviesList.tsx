import React from 'react'
import { Link } from 'react-router-dom'
import { THE_MOVIE_DB_API_IMAGES_BASE_URL } from '../api'
import './movies-list.scss'

const imageUrl = new URL(
    '../static/forbidden-icon-10068.png?as=webp&width=92',
    // @ts-ignore
    import.meta.url
);

export function MoviesList({ movies }) {
    return <ul className='movies-list'>
        {
            movies.map(m =>
                <li>
                    <Link key={m.id} to={`/movie/${m.id}`}>
                        {
                            m.poster_path
                                ?
                                <img src={`${THE_MOVIE_DB_API_IMAGES_BASE_URL}/w92/${m.poster_path}`} alt="" />
                                :
                                <img src={imageUrl.toString()}></img>
                        }
                        <div>
                            <h3>{m.title}</h3>
                            <p>{m.release_date?.split('-')[0]}</p>
                        </div>
                    </Link>
                </li>
            )
        }
    </ul>
}