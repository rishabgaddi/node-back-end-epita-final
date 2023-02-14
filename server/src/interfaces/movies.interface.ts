export interface Movie {
  _id: string;
  title: string;
  releaseDate: string;
  category: string;
  director: string;
  posterURL: string;
  trailerURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovie {
  title: string;
  releaseDate: string;
  category: string;
  director: string;
  posterURL: any;
  trailerURL: any;
}
