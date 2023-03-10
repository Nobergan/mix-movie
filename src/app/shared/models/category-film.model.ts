export interface CategoryFilm {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  release: string;
  country: string[];
  total_pages: number;
  vote_average: number;
  isFavourite?: boolean;
  type: string;
}
