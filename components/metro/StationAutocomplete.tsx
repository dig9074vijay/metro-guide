"use client";

import { useEffect, useRef, useState } from "react";

interface StationAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function StationAutocomplete({
  value,
  onChange,
  placeholder,
  disabled,
}: StationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/stations?q=${encodeURIComponent(value.trim())}`
        );
        const data = await res.json();
        setSuggestions(data);
        setOpen(data.length > 0);
      } finally {
        setLoading(false);
      }
    }, 200);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toTitleCase = (str: string) =>
    str.replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className="w-full h-12 px-4 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-neutral-400 disabled:opacity-50"
      />
      {loading && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs animate-pulse">
          …
        </span>
      )}
      {open && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s}
              onMouseDown={() => {
                onChange(toTitleCase(s));
                setOpen(false);
              }}
              className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {toTitleCase(s)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
