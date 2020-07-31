function createId(str) {
  return str
    .split('')
    .filter((char) => char !== ' ')
    .join('')
    .toLowerCase();
}

class Site {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.id = createId(this.name);
  }
}

export default Site;
