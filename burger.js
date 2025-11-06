const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');

burger.addEventListener('click', () => {
  if (burgerMenu.style.display === 'block') {
    burgerMenu.classList.add('slide-out'); 
    setTimeout(() => {
      burgerMenu.style.display = 'none';
      burgerMenu.classList.remove('slide-out'); 
    }, 300); 
  } else {
    burgerMenu.style.display = 'block';
    burgerMenu.classList.remove('slide-out');  
    closeAllDropdowns(); 
  }
});

// Toggle Dropdowns
function toggleMenu(menu) {
  const menuElement = document.getElementById(menu);
  if (window.innerWidth <= 768) {
    if (menuElement.style.display === 'block') {
      menuElement.classList.add('hide'); 
      setTimeout(() => {
        menuElement.style.display = 'none';
        menuElement.classList.remove('hide');
      }, 300); 
    } else {
      menuElement.style.display = 'block';
    }
  } else {
    if (menuElement.style.display === 'block') {
      menuElement.classList.add('hide'); 
      setTimeout(() => {
        menuElement.style.display = 'none';
        menuElement.classList.remove('hide');
      }, 300); 
    } else {
      menuElement.style.display = 'block';
    }
  }
}


function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
    dropdown.classList.add('hide');  
    setTimeout(() => {
      dropdown.style.display = 'none';
      dropdown.classList.remove('hide');
    }, 300); 
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    burgerMenu.style.display = 'none'; 
    closeAllDropdowns(); 
  }
});

window.addEventListener('click', (e) => {
  if (!e.target.closest('.head-right') && !e.target.closest('.burger-menu')) {
    closeAllDropdowns();
  }
});
