document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        let src = img.getAttribute("src");
        if (src.startsWith("../../khohinh")) {
            src = src.replace("../../khohinh", "https://raw.githubusercontent.com/sangtoan/toan12/main/khohinh");
            img.setAttribute("src", src);
        }
    });
});
