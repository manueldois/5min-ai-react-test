import React, { useEffect } from 'react'
import { Form, Link, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { IMovieDetail, searchMoviesByName } from '../api';
import { MoviesList } from '../components/MoviesList';
import { PagePicker } from '../components/PagePicker';

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
        <main>
            <h1>Movie search</h1>
            <Form id="search-form" role="search">
                <input
                    id="q"
                    aria-label="Search"
                    placeholder="Search"
                    type="search"
                    name="q"
                    defaultValue={q}
                    onChange={(event) => {
                        submit(event.currentTarget.form);
                    }}
                />
            </Form>

            {
                movies &&
                <section>
                    <MoviesList
                        movies={movies}
                    />
                    <PagePicker
                        page={page}
                        total_pages={total_pages}
                        onSelectPage={(p) => navigate(`/?q=${q}&p=${p}`)}
                    />
                </section>
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


