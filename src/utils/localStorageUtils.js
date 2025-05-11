const FAVORITES_KEY = 'favorites';
const LAST_SEARCH_KEY = 'lastSearch';

export const loadFavorites = () => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const loadLastSearch = () => {
  const data = localStorage.getItem(LAST_SEARCH_KEY);
  return data ? data : '';
};

export const saveLastSearch = (searchTerm) => {
  localStorage.setItem(LAST_SEARCH_KEY, searchTerm);
};