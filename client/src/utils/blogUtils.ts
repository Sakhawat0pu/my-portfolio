export const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200; // Average reading speed
  const noOfWords = text.split(/\s/g).length;
  const readingTime = Math.ceil(noOfWords / wordsPerMinute);
  return readingTime;
};
