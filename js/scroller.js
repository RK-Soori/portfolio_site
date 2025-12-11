const scroller = document.getElementById("scroller");
let autoScrollSpeed = 0.5;
let paused = false;

function infiniteScroll() {
    if (!paused && scroller) {
        scroller.scrollLeft += autoScrollSpeed;
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
            scroller.scrollLeft = 0;
        }
    }
    requestAnimationFrame(infiniteScroll);
}
infiniteScroll();

const items = document.querySelectorAll(".tech-item");
items.forEach(item => {
    item.addEventListener("mouseenter", () => {
        paused = true;
        const rect = item.getBoundingClientRect();
        const container = scroller.getBoundingClientRect();
        let shift = 0;
        if (rect.left < container.left + 20) { shift = rect.left - container.left - 20; }
        if (rect.right > container.right - 20) { shift = rect.right - container.right + 20; }
        if (shift !== 0) { scroller.scrollBy({ left: shift, behavior: "smooth" }); }
    });
    item.addEventListener("mouseleave", () => { paused = false; });
});