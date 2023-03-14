const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');




// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const setTimer = setInterval(() => {
      const hour = Math.floor(seconds / 3600);
      const min = Math.floor(
        hour > 0 ? (seconds - hour * 3600) / 60 : seconds / 60
      );
      const sec = seconds - (hour * 3600 + min * 60);

      //склонение - час, минута, секунда
      timerEl.innerHTML = `${hour} ${declensions(hour, ["час", "часа", "часов"])} -
                           ${min} ${declensions(min, ["минута", "минуты", "минут"])} - 
                           ${sec} ${declensions(sec, ["секунда", "секунды", "секунд"])}`;


      //отчест назад и конец
      seconds = seconds - 1;
      if (seconds < 0) {
        timerEl.innerHTML = "Время вышло";
        clearInterval(setTimer);
      }
    },1000);
  };
};

// склонение - пример взять сo StackOverFlow
function declensions(a, dataTime) {
  let marhTime = Math.abs(a) % 100;
  let numTime = marhTime % 10;

  if(marhTime > 10 && marhTime < 20) {
    return dataTime[2];
  }

  if(numTime > 1 && numTime < 5) {
    return dataTime[1];
  }

  if(numTime == 1) {
    return dataTime[0];
  }
  return dataTime[2];
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/[^0-9\.]/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
