async function start(path = '') {

  let toShow = await (await fetch('/api/images?path=' + path)).json();
  let html = path ? '<a href="#" onclick="start()">Home</a>' : '';
  for (let file of toShow) {
    if (file.includes('.')) {
      if (file.includes('.jpg')) {
        // it is a file/image
        html += '<img src="' + file + '">';
      }
    }
    else {
      // it is a folder
      let folder = file.split('/images/')[1];
      html += '<a onclick="start(\'' + folder + '\')" href="#">Meet the ' + folder + '</a>';
    }
  }
  document.querySelector('main').innerHTML = html;

}


start();