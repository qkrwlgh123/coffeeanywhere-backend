export const parseCategories = (caption) => {
  const categories = caption.match(/#[\w]+/g) || [];
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category },
  }));
};
