export const parseCategories = (caption) => {
  const categories = caption.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g) || [];
  return categories.map((category) => ({
    name: category,
  }));
};
