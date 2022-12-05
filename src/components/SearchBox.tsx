import React from "react";
import { Form } from "react-router-dom";
import './search-box.scss'

export function SearchBox({ defaultValue, submit }) {
    return <Form id="search-form" role="search" className="search-box">
        <input
            id="q"
            aria-label="Search"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={defaultValue}
            onChange={(event) => {
                submit(event.currentTarget.form);
            }}
        />
    </Form>
}