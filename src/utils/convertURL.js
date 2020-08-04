export function convertURL(url, swapOne, swapTwo) {
  url = url.split('');

  return url
    .map((char) => {
      if (char === swapOne) {
        char = swapTwo;
      }

      return char;
    })
    .join('');
}
