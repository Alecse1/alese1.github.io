const container = document.querySelector('.container');
const buttons = document.querySelectorAll('.next-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    container.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
});
