const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT: number = process.env.SERVER_PORT
  ? +process.env.SERVER_PORT
  : 3000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const MONGODB_USER: string = process.env.MONGODB_USER || 'user';
const MONGODB_PASSWORD: string = process.env.MONGODB_PASSWORD || 'password';
const MONGODB_HOST: string =
  process.env.MONGODB_HOST ||
  'googlecloudcluster.n5v9j.mongodb.net/db?retryWrites=true&w=majority';
const MONGODB_URL: string = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}`;

const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const MONGODB = {
  user: MONGODB_USER,
  password: MONGODB_PASSWORD,
  host: MONGODB_HOST,
  url: MONGODB_URL,
  options: MONGODB_OPTIONS,
};

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'secret';
const TOKEN_ISSUER: string = process.env.TOKEN_ISSUER || 'issuer';
const TOKEN_EXPIRE_TIME: string = process.env.TOKEN_EXPIRE_TIME || '7d';

const TOKEN = {
  secret: TOKEN_SECRET,
  issuer: TOKEN_ISSUER,
  expireTime: TOKEN_EXPIRE_TIME,
};

const config = {
  server: SERVER,
  mongodb: MONGODB,
  token: TOKEN,
};

export default config;
