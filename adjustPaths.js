document.addEventListener("DOMContentLoaded", function() {
    console.log("adjustPaths.js is loaded");
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        let src = img.getAttribute("src");
        console.log("Original src:", src);
        if (src.startsWith("../../khohinh")) {
            src = src.replace("../../khohinh", "https://raw.githubusercontent.com/sangtoan/toan12/main/khohinh");
            console.log("Updated src:", src);
            img.setAttribute("src", src);
        }
    });
});
