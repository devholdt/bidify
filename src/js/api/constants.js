export const API_PATH = "https://api.noroff.dev/api/v1";
export const API_BASE_URL = new URL(API_PATH);

export const API_URLS = {
  REGISTER: `${API_PATH}/auction/auth/register`,
  LOGIN: `${API_PATH}/auction/auth/login`,
  LISTINGS: `${API_PATH}/auction/listings`,
  PROFILES: `${API_PATH}/auction/profiles`,
};
