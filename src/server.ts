import fastify from 'fastify';
import { authRoutes } from './routes/authRoutes';
import jwtPlugin from './plugins/jwt';

const app = fastify();

app.register(jwtPlugin);
app.register(authRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${process.env.BASE_URL}`);
});
