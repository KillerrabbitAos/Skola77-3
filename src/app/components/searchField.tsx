import React from "react";

export function SearchField() {
    return <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
            </svg>
        </div>
        <input
            type="text"
            placeholder="Search"
            className="w-full h-4/6 px-4 py-2 pl-10 bg-gray-100 rounded-lg text-gray-700 outline-none"
        />
    </div>;
}