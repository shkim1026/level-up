export function slugify(text) {
  return (text ?? "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')          // replace & with 'and'
    .replace(/[\s\W-]+/g, '-')     // replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens
}