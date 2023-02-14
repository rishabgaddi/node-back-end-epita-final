import axios from 'axios';
import { SPRING_BOOT_HOST, SPRING_BOOT_PORT } from '@/config';

export const springInstance = axios.create({
  baseURL: `http://${SPRING_BOOT_HOST}:${SPRING_BOOT_PORT}`,
  withCredentials: true,
});
