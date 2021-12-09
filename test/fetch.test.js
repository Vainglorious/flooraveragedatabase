for (let index = 0; index < 99; index++) {
  setTimeout(() => openseaAPICall(index), index * 1000);
}
setInterval(() => {
  for (let index = 0; index < 99; index++) {
    setTimeout(() => openseaAPICall(index), index * 1000);
  }
}, 105);
