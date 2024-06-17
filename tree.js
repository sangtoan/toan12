document.addEventListener("DOMContentLoaded", function() {
    var toggler = document.getElementsByClassName("caret");
    for (var i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  });
  
  function showContent(url) {
    var pdfViewer = document.getElementById('pdfViewer');
    var htmlContent = document.getElementById('htmlContent');
  
    if (url.endsWith(".pdf")) {
      pdfViewer.src = url;
      pdfViewer.style.display = 'block';
      htmlContent.style.display = 'none';
    } else {
      fetch(url)
        .then(response => response.text())
        .then(data => {
          htmlContent.innerHTML = data;
          pdfViewer.style.display = 'none';
          htmlContent.style.display = 'block';
  
          // Convert LaTeX to HTML
          renderLatexInElement(htmlContent);
        });
    }
  }
  