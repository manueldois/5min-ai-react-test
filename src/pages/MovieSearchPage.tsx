import React, { useEffect } from 'react'
import { Form, Link, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { IMovieDetail, searchMoviesByName } from '../api';
import { MoviesList } from '../components/MoviesList';
import { PagePicker } from '../components/PagePicker';
import { SearchBox } from '../components/SearchBox';
import './movie-search-page.scss'

export function MovieSearchPage() {
    const { q, movies, total_pages, page } = useLoaderData() as {
        q: string | undefined,
        movies: IMovieDetail[] | undefined,
        total_pages: number | undefined,
        page: number | undefined,
    };

    const submit = useSubmit();
    const navigate = useNavigate();

    useEffect(() => {
        const input = (document?.getElementById("q") as any)
        input.value = q;
    }, [q]);

    return (
        <main className='movie-search-page'>
            <br style={{ marginTop: 50 }}></br>

            <h1>Movie search</h1>

            <SearchBox defaultValue={q} submit={submit} />

            <br style={{ marginTop: 50 }}></br>

            {
                movies?.length
                    ?
                    <React.Fragment>
                        <MoviesList
                            movies={movies}
                        />

                        <br style={{ marginTop: 50 }}></br>

                        <PagePicker
                            page={page}
                            total_pages={total_pages}
                            onSelectPage={(p) => navigate(`/?q=${q}&p=${p}`)}
                        />
                    </React.Fragment>
                    :
                    q && <h3>No movies found</h3>
            }

        </main>
    )
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const p = url.searchParams.get("p");
    if (q) {
        const res = await searchMoviesByName(q, p ? p : undefined)
        return { q, movies: res.results, total_pages: res.total_pages, page: res.page };
    }
    return { q }
}


