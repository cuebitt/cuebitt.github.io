import { Outlet } from "react-router-dom";
import { StrictMode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";

export default function App() {
	return (
		<StrictMode>
			<ThemeProvider>
				<Outlet />
			</ThemeProvider>
		</StrictMode>
	);
}
