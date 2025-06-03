import express from 'express';
import authRouter from './auth.route';

const router = express.Router();

const routerList = [
  {
    prefix: '/auth',
    route: authRouter,
  },
];

routerList.map((route) => {
  router.use(route.prefix, route.route);
});

export default router;
