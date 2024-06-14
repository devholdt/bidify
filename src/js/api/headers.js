import * as storage from "../storage/index.js";
import { PUBLIC_API_KEY } from "./constants.js";

export const headers = (contentType = null, needAuth = false) => {
	const token = storage.getItem("token");
	let headers = {};

	if (needAuth) {
		headers["X-Noroff-API-Key"] = PUBLIC_API_KEY;
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (contentType) {
		headers["Content-Type"] = contentType;
	}

	return headers;
};
