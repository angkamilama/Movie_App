export type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  vote_count: number;
  video: boolean;
};

export type FavouriteProps = {
  selectedMovie: Movie;
};

export type MoviesAddedProps = {
  movieAutoId: string;
  movieInfo: Movie;
};

export interface IFormInput {
  firstName: string;
  lastName: string;
  mail: string;
}

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  textArea: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
