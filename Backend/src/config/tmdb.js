import axios from 'axios';
import https from 'https';
import dns from 'dns';

const token = process.env.TMDB_BEARER || process.env.TMDB_TOKEN;

const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE || 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    keepAlive: true,
    lookup: (hostname, options, callback) => {
      const family = options.family || 4;
      const all = options.all || false;

      return dns.lookup(hostname, { family, all }, (err, address, familyOrAddresses) => {
        if (err) {
          return callback(err);
        }

        if (all) {
          return callback(null, address);
        }

        return callback(null, address, familyOrAddresses);
      });
    },
  }),
  timeout: 8000,
});


tmdb.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      'TMDB Error | Code:', error.code, 
      '| Status:', error.response?.status, 
      '| Message:', error.message
    );
    
    const config = error.config || {};
    config.__retryCount = config.__retryCount || 0;
    const maxRetries = 2;
    
    if (config.__retryCount < maxRetries) {
      config.__retryCount += 1;
      console.warn(`Retrying TMDB request (${config.__retryCount}/${maxRetries}) due to: ${error.code || error.message}`);
      return tmdb.request(config);
    }

    const message = error.response?.data?.status_message || 'TMDB API request failed';
    const status = error.response?.status || 500;
    const err = new Error(message);
    err.statusCode = status;
    return Promise.reject(err);
  }
);

export default tmdb;