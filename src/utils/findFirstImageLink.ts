export const findFirstImageLink = (markdown: string) => {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imageRegex);

  if (match && match[1]) {
    const imageUrl = match[1];
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    }
  }
  return null;
};
