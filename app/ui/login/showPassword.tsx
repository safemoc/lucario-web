import React from "react";

type Props = {
    show: boolean;
    onToggle: () => void;
};
export default function ShowPassword({
                                         show,
                                         onToggle,
                                     }: Props) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={show ? "隐藏密码" : "显示密码"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-ocean-700"
        >
            {show ? (
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 3l18 18"/>
                    <path d="M10.6 10.6a2 2 0 002.8 2.8"/>
                    <path d="M9.9 4.2A10 10 0 0112 4c5 0 9 4 10 8a9.7 9.7 0 01-3.2 4.4"/>
                    <path d="M6.3 6.3A10.4 10.4 0 002 12c1 4 5 8 10 8 1.6 0 3.1-.3 4.5-.9"/>
                </svg>
            ) : (
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            )}
        </button>
    )

}