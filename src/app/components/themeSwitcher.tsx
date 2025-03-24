'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);

        const loadTheme = async () => {
            const res = await fetch('/api/theme');
            const data = await res.json();
            if (data.theme) {
                setTheme(data.theme);
            }
        };

        loadTheme();
    }, [setTheme]);

    const onThemeSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        setTheme(newTheme);

        try {
            const res = await fetch('/api/theme', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ theme: newTheme }),
            });

            if (!res.ok) {
                console.error('Failed to update theme:', await res.text());
            }
        } catch (error) {
            console.error('Error in PUT request:', error);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex items-center space-x-4">
            <span className="text-primary-green color-scheme">Theme:</span>
            <select
                value={theme}
                onChange={onThemeSelect}
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded cursor-pointer"
            >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
            </select>
        </div>
    );
};

export default ThemeSwitcher;