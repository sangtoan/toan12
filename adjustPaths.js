document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả các thẻ img trong nội dung
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        let src = img.getAttribute("src");
        // Kiểm tra nếu src bắt đầu bằng "../../khohinh"
        if (src.startsWith("../../khohinh")) {
            // Điều chỉnh src để phù hợp với GitHub Pages
            src = src.replace("../../khohinh", "https://raw.githubusercontent.com/sangtoan/toan12/main/khohinh");
            img.setAttribute("src", src);
        }
    });
});
