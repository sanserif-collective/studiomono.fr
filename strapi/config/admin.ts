export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2a77ac5735e05b87af24b76b31f16bff'),
  },
});
