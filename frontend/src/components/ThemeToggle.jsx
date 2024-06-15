import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    // Check the user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const htmlClasses = document.documentElement.classList;
    if (htmlClasses.contains('dark')) {
      htmlClasses.remove('dark');
    } else {
      htmlClasses.add('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black px-4 py-2 rounded mt-4"
    >
      Toggle Theme
    </button>
  );
}
