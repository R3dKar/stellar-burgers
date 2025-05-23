import { defineConfig } from "cypress";
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:4000',
  },
  env: {
    BURGER_API_URL: process.env.BURGER_API_URL,
  },
});
