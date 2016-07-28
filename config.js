var request = new XMLHttpRequest();
request.open('GET', 'config.json', false);  // `false` makes the request synchronous
request.send(null);
// Although Synchronous XMLHttpRequest  is deprecated and a bad practice
// i maintain it here for easing the loading of configuration data
if (request.status === 200) {
  window.config = JSON.parse(request.response);
}