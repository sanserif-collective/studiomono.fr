import { Shared } from 'types/shared';

export const route = (name: keyof typeof Shared.Routes, pathname?: string) => {
  const route = Shared.Routes[name];
  return pathname ? `${route}/${pathname}` : route;
};
