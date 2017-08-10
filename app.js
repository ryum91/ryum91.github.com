
fetch('/data/test1.json', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => console.log(r))
.catch(e => console.err(e));

console.log('hello');
