const routes = {
  'index': '/',
  'about': '/about',
  'contact': '/contact',
  'projects': '/projects'
}

export const route = (name: keyof typeof routes, pathname?: string) => {
  const route = routes[name]
  return pathname ? `${route}/${pathname}` : route
}
