document.addEventListener("DOMContentLoaded", function() {
    // Get all image elements
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        let src = img.getAttribute("src");
        // Check if the src contains "../../"
        if (src.startsWith("../../")) {
            // Adjust the src for GitHub Pages
            src = src.replace("../../", "/");
            img.setAttribute("src", src);
        }
    });
});
