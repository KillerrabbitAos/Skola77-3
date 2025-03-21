'use client';

import {useState, useEffect} from 'react';
import {useTheme} from 'next-themes';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
    };

    return (
        <div className="flex items-center space-x-4">
            <span className="text-primary-green">Current Theme:</span>
            <select
                value={theme}
                onChange={handleChange}
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
            >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
            </select>
        </div>
    );
};

export default ThemeSwitcher;