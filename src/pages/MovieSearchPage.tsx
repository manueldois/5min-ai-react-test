import React, { useEffect } from 'react'
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { searchMoviesByName } from '../fetchers';

export function MovieSearchPage() {
    const { q, movies } = useLoaderData() as any;
    const submit = useSubmit();

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
                    aria-label="Search contacts"
                    placeholder="Search"
                    type="search"
                    name="q"
                    defaultValue={q}
                    onChange={(event) => {
                        submit(event.currentTarget.form);
                    }}
                />
            </Form>
            <ul>
                {JSON.stringify(movies)}
            </ul>
        </main>
    )
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    if (q) {
        const movies = await searchMoviesByName(q).then((res: any) => res.json())
        return { q, movies: movies.results };
    }
    return { q }
}


