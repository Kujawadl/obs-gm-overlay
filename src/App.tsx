import React from "react";
import { Routes, Route } from "react-router-dom";

// Example pages
function Home() {
	return <h1>Home Page</h1>;
}
function NotFound() {
	return <h1>404 - Not Found</h1>;
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* Add more routes here */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
