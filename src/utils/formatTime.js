const oneDay = 86400000; // 86400000 мілісекунд у добі

export function formatTime(seconds) {
  // Створити об'єкт дати для заданого часу в секундах
  let specifiedDate = new Date(seconds * 1000);
  // Отримати поточний час
  let currentDate = new Date();
  // Знайти різницю між заданим часом та поточним часом у мілісекундах
  let timeDifference = currentDate - specifiedDate;
  // Якщо пройшло менше доби
  if (timeDifference < oneDay) {
    return (
      specifiedDate.getHours() +
      ':' +
      (specifiedDate.getMinutes() < 10 ? '0' : '') +
      specifiedDate.getMinutes()
    );
  } else {
    // Якщо пройшло більше доби
    return (
      specifiedDate.getDate() +
      '.' +
      (specifiedDate.getMonth() + 1) +
      '.' +
      specifiedDate.getFullYear()
    );
  }

  
}
