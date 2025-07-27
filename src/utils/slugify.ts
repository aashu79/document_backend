export function slugify(text) {
  if (typeof text !== "string") {
    return "";
  }
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

// A more robust alternative is to use a library:
// npm install slugify
// import slugify from 'slugify';
// export { slugify };
