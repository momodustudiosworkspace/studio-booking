// "use client";

// import { useEffect, useState } from "react";

// export default function ThemeToggle(): React.JSX.Element {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (
//       localStorage.theme === "dark" ||
//       (!("theme" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches)
//     ) {
//       document.documentElement.classList.add("dark");
//       setDarkMode(true);
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     if (darkMode) {
//       document.documentElement.classList.remove("dark");
//       localStorage.theme = "light";
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.theme = "dark";
//     }
//     setDarkMode(!darkMode);
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="px-4 py-2 rounded-md bg-foreground text-background hover:opacity-80 transition"
//     >
//       {darkMode ? "🌙 Dark" : "☀️ Light"}
//     </button>
//   );
// }
