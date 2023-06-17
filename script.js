const scrollbarTracks = document.querySelectorAll('.scrollbar-track');

    scrollbarTracks.forEach(scrollbarTrack => {
      const scrollbarThumb = scrollbarTrack.querySelector('.scrollbar-thumb');
      const scrollbarFill = scrollbarThumb.querySelector('.scrollbar-fill');
      const imagesContainer = scrollbarTrack.nextElementSibling;
      const images = imagesContainer.querySelectorAll('img');

      scrollbarThumb.addEventListener('mousedown', startDragging);

      function startDragging(e) {
        e.preventDefault();
        const startX = e.clientX - scrollbarThumb.offsetLeft;
        document.addEventListener('mousemove', dragThumb);
        document.addEventListener('mouseup', stopDragging);

        function dragThumb(e) {
          e.preventDefault();
          const x = e.clientX - startX;
          const minScroll = 0;
          const maxScroll = scrollbarTrack.offsetWidth - scrollbarThumb.offsetWidth;
          const scroll = Math.max(minScroll, Math.min(maxScroll, x));
          const scrollPercentage = (scroll / maxScroll) * 100;

          scrollbarThumb.style.left = scroll + 'px';
          scrollbarFill.style.width = scrollPercentage + '%';
          imagesContainer.scrollLeft = (imagesContainer.scrollWidth - imagesContainer.offsetWidth) * (scrollPercentage / 100);
        }

        function stopDragging() {
          document.removeEventListener('mousemove', dragThumb);
          document.removeEventListener('mouseup', stopDragging);
        }
      }

      imagesContainer.addEventListener('scroll', () => {
        const scrollPercentage = (imagesContainer.scrollLeft / (imagesContainer.scrollWidth - imagesContainer.offsetWidth)) * 100;
        const thumbPosition = (scrollPercentage / 100) * (scrollbarTrack.offsetWidth - scrollbarThumb.offsetWidth);
        
        scrollbarThumb.style.left = thumbPosition + 'px';
        scrollbarFill.style.width = scrollPercentage + '%';
      });

      images.forEach((image, index) => {
        image.addEventListener('click', () => {
          images.forEach((img) => img.classList.remove('active'));
          image.classList.add('active');
          const scrollPercentage = (index / (images.length - 1)) * 100;
          const thumbPosition = (scrollPercentage / 100) * (scrollbarTrack.offsetWidth - scrollbarThumb.offsetWidth);
          
          scrollbarThumb.style.left = thumbPosition + 'px';
          scrollbarFill.style.width = scrollPercentage + '%';
          imagesContainer.scrollLeft = (imagesContainer.scrollWidth - imagesContainer.offsetWidth) * (scrollPercentage / 100);
        });
      });
    });