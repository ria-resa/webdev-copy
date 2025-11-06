(function () {
  // slider
  const imageSlider = {
    slider: document.querySelector(".slider"),
    slides: document.querySelectorAll(".slide"),
    dots: document.querySelectorAll(".nav-dot"),
    leftArrow: document.querySelector(".arrow-left"),
    rightArrow: document.querySelector(".arrow-right"),
    currentIndex: 0,
    startX: 0,
    currentX: 0,
    isDragging: false,
    animationId: null,
    slideWidth: 100,
    speed: 0.005,
    currentPosition: 0,
    lastAnimationTimestamp: 0,
    isMobileSlider: window.innerWidth <= 414,
    pauseDuration: 3000,
    isPaused: false,

    init: function () {
      this.cloneSlides();
      this.setupEventListeners();
      this.animate(performance.now());
    },

    cloneSlides: function () {
      this.slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        this.slider.appendChild(clone);
      });
    },

    animate: function (timestamp) {
      if (!this.lastAnimationTimestamp) this.lastAnimationTimestamp = timestamp;
      const deltaTime = timestamp - this.lastAnimationTimestamp;

      if (!this.isDragging && !this.isPaused) {
        this.currentPosition -= this.speed * deltaTime;

        if (this.currentPosition <= -this.slideWidth * this.slides.length) {
          this.currentPosition += this.slideWidth * this.slides.length;
        } else if (this.currentPosition > 0) {
          this.currentPosition -= this.slideWidth * this.slides.length;
        }

        this.slider.style.transition = "none";
        this.slider.style.transform = `translateX(${this.currentPosition}%)`;
        this.updateDots();
      }

      this.lastAnimationTimestamp = timestamp;
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    },

    updateDots: function () {
      const activeIndex =
        Math.abs(Math.round(this.currentPosition / this.slideWidth)) %
        this.slides.length;
      this.dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    },

    snapToSlide: function () {
      this.isPaused = true;
      this.currentPosition =
        Math.round(this.currentPosition / this.slideWidth) * this.slideWidth;
      this.slider.style.transition = "transform 0.3s ease-out";
      this.slider.style.transform = `translateX(${this.currentPosition}%)`;
      this.updateDots();

      cancelAnimationFrame(this.animationId);
      this.lastAnimationTimestamp = 0;

      setTimeout(() => {
        this.isPaused = false;
        this.animationId = requestAnimationFrame(this.animate.bind(this));
      }, this.pauseDuration);
    },

    setupEventListeners: function () {
      // for mobile
      this.slider.addEventListener(
        "touchstart",
        this.handleTouchStart.bind(this)
      );
      this.slider.addEventListener(
        "touchmove",
        this.handleTouchMove.bind(this)
      );
      this.slider.addEventListener("touchend", this.handleTouchEnd.bind(this));

      // for desk
      this.slider.addEventListener(
        "mousedown",
        this.handleMouseDown.bind(this)
      );
      this.slider.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );
      this.slider.addEventListener("mouseup", this.handleMouseUp.bind(this));
      this.slider.addEventListener(
        "mouseleave",
        this.handleMouseLeave.bind(this)
      );

      // arrow nav
      this.leftArrow.addEventListener(
        "click",
        this.handleLeftArrowClick.bind(this)
      );
      this.rightArrow.addEventListener(
        "click",
        this.handleRightArrowClick.bind(this)
      );

      // resixe
      window.addEventListener("resize", () => {
        this.isMobileSlider = window.innerWidth <= 414;
      });
    },

    handleTouchStart: function (e) {
      if (!this.isMobileSlider) return;
      this.startX = e.touches[0].clientX;
      this.isDragging = true;
      this.slider.style.transition = "none";
    },

    handleTouchMove: function (e) {
      if (!this.isMobileSlider || !this.isDragging) return;
      this.currentX = e.touches[0].clientX;
      const diff = this.currentX - this.startX;
      this.slider.style.transform = `translateX(${
        this.currentPosition + (diff / this.slider.offsetWidth) * 100
      }%)`;
    },

    handleTouchEnd: function () {
      if (!this.isMobileSlider) return;
      this.isDragging = false;
      this.snapToSlide();
    },

    handleMouseDown: function (e) {
      if (this.isMobileSlider) return;
      this.startX = e.clientX;
      this.isDragging = true;
      cancelAnimationFrame(this.animationId);
      this.slider.style.transition = "none";
    },

    handleMouseMove: function (e) {
      if (this.isMobileSlider || !this.isDragging) return;
      this.currentX = e.clientX;
      const diff = this.currentX - this.startX;
      this.slider.style.transform = `translateX(${
        this.currentPosition + (diff / this.slider.offsetWidth) * 100
      }%)`;
    },

    handleMouseUp: function () {
      if (this.isMobileSlider) return;
      this.isDragging = false;
      this.snapToSlide();
    },

    handleMouseLeave: function () {
      if (this.isMobileSlider || !this.isDragging) return;
      this.isDragging = false;
      this.snapToSlide();
    },

    handleLeftArrowClick: function () {
      this.currentPosition += this.slideWidth;
      if (this.currentPosition > 0) {
        this.currentPosition -= this.slideWidth * this.slides.length;
      }
      this.snapToSlide();
    },

    handleRightArrowClick: function () {
      this.currentPosition -= this.slideWidth;
      if (this.currentPosition <= -this.slideWidth * this.slides.length) {
        this.currentPosition += this.slideWidth * this.slides.length;
      }
      this.snapToSlide();
    },
  };

  // Burger
  const burgerMenu = {
    burger: document.querySelector(".burger"),
    burgerMenuElement: document.querySelector(".burger-menu"),

    init: function () {
      this.setupEventListeners();
    },

    setupEventListeners: function () {
      this.burger.addEventListener("click", this.toggleBurgerMenu.bind(this));
      window.addEventListener("resize", this.handleResize.bind(this));
      window.addEventListener("click", this.handleOutsideClick.bind(this));
    },

    toggleBurgerMenu: function () {
      if (this.burgerMenuElement.style.display === "block") {
        this.burgerMenuElement.classList.add("slide-out");
        setTimeout(() => {
          this.burgerMenuElement.style.display = "none";
          this.burgerMenuElement.classList.remove("slide-out");
        }, 300);
      } else {
        this.burgerMenuElement.style.display = "block";
        this.burgerMenuElement.classList.remove("slide-out");
        this.closeAllDropdowns();
      }
    },

    toggleMenu: function (menu) {
      const menuElement = document.getElementById(menu);
      if (menuElement.style.display === "block") {
        menuElement.classList.add("hide");
        setTimeout(() => {
          menuElement.style.display = "none";
          menuElement.classList.remove("hide");
        }, 300);
      } else {
        menuElement.style.display = "block";
      }
    },

    closeAllDropdowns: function () {
      const dropdowns = document.querySelectorAll(".dropdown-content");
      dropdowns.forEach((dropdown) => {
        dropdown.classList.add("hide");
        setTimeout(() => {
          dropdown.style.display = "none";
          dropdown.classList.remove("hide");
        }, 300);
      });
    },

    handleResize: function () {
      if (window.innerWidth > 768) {
        this.burgerMenuElement.style.display = "none";
        this.closeAllDropdowns();
      }
    },

    handleOutsideClick: function (e) {
      if (
        !e.target.closest(".head-right") &&
        !e.target.closest(".burger-menu")
      ) {
        this.closeAllDropdowns();
      }
    },
  };

  //tab switch
  const tabSwitcher = {
    topCriticsTab: document.getElementById("top-critics-tab"),
    audienceRevsTab: document.getElementById("audience-revs-tab"),
    topCriticsContent: document.getElementById("top-critics-content"),
    audienceRevsContent: document.getElementById("audience-revs-content"),

    init: function () {
      this.setupEventListeners();
      this.showTab(this.topCriticsTab, this.topCriticsContent);
    },

    setupEventListeners: function () {
      this.topCriticsTab.addEventListener("click", () =>
        this.showTab(this.topCriticsTab, this.topCriticsContent)
      );
      this.audienceRevsTab.addEventListener("click", () =>
        this.showTab(this.audienceRevsTab, this.audienceRevsContent)
      );
    },

    showTab: function (tabButton, tabContent) {
      document
        .querySelectorAll(".tab-button")
        .forEach((button) => button.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active", "fade");
      });

      tabButton.classList.add("active");

      setTimeout(() => tabContent.classList.add("fade"), 100);
      tabContent.classList.add("active");
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    imageSlider.init();
    // burgerMenu.init(); lipat
    // videoOverlay.init(); lipat
    tabSwitcher.init();
  });
})();
