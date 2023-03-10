export interface Film {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  production_companies: [];
  revenue: number;
  runtime: number;
  vote_count: number;
  media_type: string;
  isFavourite?: boolean;
}
