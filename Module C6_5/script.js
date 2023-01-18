const mainBtn = document.querySelector('.main-btn');
const scrollBtn = document.querySelector('.show-scroll');
const longDiv = document.querySelector('.long');


mainBtn.addEventListener('click', () => {
  let result = `Размер экрана (шхв): ${window.screen.width} X ${window.screen.height} px\n`;
  result = result + `Размер клиентской области окна браузера (шхв): ${document.documentElement.clientWidth} X ${document.documentElement.clientHeight} px\n`;
  result = result + `Размер окна браузера (шхв): ${window.innerWidth} X ${window.innerHeight} px`;
  alert(result);
});

scrollBtn.addEventListener('click', () => {
  if(longDiv.style.display == "none"){
  	longDiv.style.display = "block";
    scrollBtn.innerText = "Скрыть полосы прокрутки"
  }else{
    longDiv.style.display = "none";
    scrollBtn.innerText = "Показать полосы прокрутки"		
  }
});