document.addEventListener("DOMContentLoaded", function () {
  const scrollbarContainers = document.querySelectorAll(".scrollbar-container");
  scrollbarContainers.forEach(handleScrollbar);
});

function handleScrollbar(scrollbarContainer) {
  const scrollbarTrack = scrollbarContainer.querySelector(".scrollbar-track");
  const scrollbarThumb = scrollbarTrack.querySelector(".scrollbar-thumb");
  const scrollbarFill = scrollbarThumb.querySelector(".scrollbar-fill");
  const imagesContainer = scrollbarContainer.nextElementSibling;
  const images = imagesContainer.querySelectorAll("img");

  const scrollPercentageMap = [
    { start: 0, end: 25, index: 0 },
    { start: 25, end: 50, index: 1 },
    { start: 50, end: 75, index: 2 },
    { start: 75, end: 100, index: 3 }
  ];

  const thumbWidthPercentage = 25; // Largura em porcentagem do thumb

  scrollbarThumb.addEventListener("mousedown", startDragging);

  function startDragging(e) {
    e.preventDefault();
    const startX = e.clientX - scrollbarThumb.offsetLeft;
    document.addEventListener("mousemove", dragThumb);
    document.addEventListener("mouseup", stopDragging);

    function dragThumb(e) {
      e.preventDefault();
      const x = e.clientX - startX;
      const minScroll = 0;
      const maxScroll = scrollbarTrack.offsetWidth - scrollbarThumb.offsetWidth;
      const scroll = Math.max(minScroll, Math.min(maxScroll, x));
      const scrollPercentage = (scroll / maxScroll) * 100;

      scrollbarThumb.style.left = scroll + "px";
      scrollbarFill.style.width = scrollPercentage + "%";
      const activeImageIndex = getActiveImageIndex(scrollPercentage);
      setActiveImage(activeImageIndex);

      const scrollLeft = (scrollPercentage / 100) * (imagesContainer.scrollWidth - imagesContainer.offsetWidth);
      imagesContainer.scrollLeft = scrollLeft;
    }

    function stopDragging() {
      document.removeEventListener("mousemove", dragThumb);
      document.removeEventListener("mouseup", stopDragging);
    }
  }

  imagesContainer.addEventListener("scroll", () => {
    const scrollPercentage = calculateScrollPercentage(imagesContainer);
    const thumbPosition = (scrollPercentage / 100) * (scrollbarTrack.offsetWidth - scrollbarThumb.offsetWidth);

    scrollbarThumb.style.left = thumbPosition + "px";
    scrollbarFill.style.width = scrollPercentage + "%";
    const activeImageIndex = getActiveImageIndex(scrollPercentage);
    setActiveImage(activeImageIndex);
  });

  function calculateScrollPercentage(container) {
    const scrollWidth = container.scrollWidth - container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const scrollPercentage = (scrollLeft / scrollWidth) * 100;
    return scrollPercentage;
  }

  function getActiveImageIndex(scrollPercentage) {
    for (let i = 0; i < scrollPercentageMap.length; i++) {
      const range = scrollPercentageMap[i];
      if (scrollPercentage >= range.start && scrollPercentage < range.end) {
        return range.index;
      }
    }
    return 0;
  }

  function setActiveImage(index) {
    images.forEach((image, i) => {
      if (i === index) {
        image.classList.add("active");
      } else {
        image.classList.remove("active");
      }
    });
  }
}
