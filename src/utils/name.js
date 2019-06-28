export function slugToName(slug) {
  return slug
    .split('-')
    .map(i => i.slice(0, 1).toLocaleUpperCase() + i.slice(1))
    .join(' ');
}
