import React from "react";

export function LeftArrowButton(props: { onClick: () => void }) {
    return <button onClick={props.onClick} className="cursor-pointer">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
            />
        </svg>
    </button>;
}