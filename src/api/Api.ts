import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL;

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export async function fetchCharacters(page = 1) {
  const res = await axios.get<CharactersResponse>(
    `${API_BASE}/character?page=${page}`
  );
  return res.data;
}

export async function fetchCharacterById(id: number) {
  const res = await axios.get<Character>(`${API_BASE}/character/${id}`);
  return res.data;
}
