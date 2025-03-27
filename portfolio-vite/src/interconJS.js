let backButton = document.getElementById("previous");

backButton.addEventListener('click', () => {
    let hLength = history.length;
    
    if(hLength > 1) {
        // history.back();
        history.go(-1);
    } else {
        window.location.assign("index.html");
    }
  });