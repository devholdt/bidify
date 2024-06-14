import * as storage from "../storage/index.js";
import { PUBLIC_API_KEY } from "./constants.js";

export const headers = (contentType) => {
	const token = storage.getItem("token");
	const headers = {};

	if (contentType) {
		headers["Content-Type"] = contentType;
		headers["X-Noroff-API-Key"] = PUBLIC_API_KEY;
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
};
