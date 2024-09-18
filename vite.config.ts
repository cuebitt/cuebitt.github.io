import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vike from "vike/plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vike({ prerender: true }), react({})],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	base: "/",
});
