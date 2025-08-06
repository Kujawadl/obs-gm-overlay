import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "@src/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<CssBaseline />
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
