document.addEventListener("DOMContentLoaded", function () {
    const topCriticsTab = document.getElementById("top-critics-tab");
    const audienceRevsTab = document.getElementById("audience-revs-tab");
    const topCriticsContent = document.getElementById("top-critics-content");
    const audienceRevsContent = document.getElementById("audience-revs-content");
  
    topCriticsTab.addEventListener("click", function () {
      showTab(topCriticsTab, topCriticsContent);
    });
  
    audienceRevsTab.addEventListener("click", function () {
      showTab(audienceRevsTab, audienceRevsContent);
    });
  
  
    function showTab(tabButton, tabContent) {
      document.querySelectorAll(".tab-button").forEach((button) => button.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active", "fade");
      });
    
      tabButton.classList.add("active");
    
      setTimeout(() => tabContent.classList.add("fade"), 100); 
      tabContent.classList.add("active");
    }
    
    showTab(topCriticsTab, topCriticsContent); 
  });




  //video overlay sa yt
const trailerModal = document.getElementById("trailerModal");
const youtubeVideo = document.getElementById("youtubeVideo");
const watchTrailerBtn = document.querySelector(".watch-trailer-btn");
const closeModalBtn = document.getElementById("closeModal");

watchTrailerBtn.addEventListener("click", () => {
  trailerModal.classList.add("show"); 
});

closeModalBtn.addEventListener("click", () => {
  trailerModal.classList.remove("show");
  youtubeVideo.src = youtubeVideo.src; 
});

window.addEventListener("click", (event) => {
  if (event.target === trailerModal) {
    trailerModal.classList.remove("show");
    youtubeVideo.src = youtubeVideo.src;
  }
});