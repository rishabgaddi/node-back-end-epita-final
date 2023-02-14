import App from '@/app';

import validateEnv from '@utils/validateEnv';
import MoviesRoute from './routes/movies.route';
import RatingsRoute from './routes/ratings.route';

validateEnv();

const app = new App([new MoviesRoute(), new RatingsRoute()]);

app.listen();
