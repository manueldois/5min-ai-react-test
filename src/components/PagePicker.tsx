import React from 'react'
import './page-picker.scss'

export function PagePicker({ page, total_pages, onSelectPage }) {
    const show = 5

    let arr: any[] = [page]

    // Try adding pages above and bellow
    for (let i = 1; i < show; i++) {
        if (page - i > 0) {
            arr.unshift(page - i)
        }
        if (page + i <= total_pages) {
            arr.push(page + i)
        }
        if (arr.length >= show) {
            break
        }
    }

    // Add last page if missing
    if (!arr.find((p) => p === total_pages)) {
        arr[arr.length - 2] = null
        arr[arr.length - 1] = total_pages
    }

    return (
        <section className='page-picker'>
            <button
                onClick={() => onSelectPage(page - 1)}
                disabled={page < 2}>
                &#x3C;
            </button>

            {
                arr.map(i =>
                    i
                        ?
                        <button
                            key={i}
                            onClick={() => onSelectPage(i)}
                            className={i === page ? 'selected' : ''}
                        >
                            {i}
                        </button>

                        :
                        <span
                            key={i}
                        >
                            &#x2026;
                        </span>
                )
            }

            <button
                onClick={() => onSelectPage(page + 1)}
                disabled={total_pages === page}>
                &#x3E;
            </button>
        </section>
    )
}