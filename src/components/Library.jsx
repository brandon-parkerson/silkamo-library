import React from "react";

export default function Library({ books, onDelete, onEdit }) {
    return (
        <div className="library-container">
            <ul>
                {books.length === 0 ? (
                    <p style={{ color: 'white', textAlign: 'center' }}>No books here yet.</p>
                ) : (
                    books.map((book, index) => (
                        <li key={index}>
                            {book.title} by {book.author} | {book.pages} pages | {book.rating}/5
                            
                            <button className="delete-btn btn" onClick={() => onDelete(index)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
