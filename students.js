// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
   
];

console.log(studentsList);


// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.
// У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
let string = document.createElement('tr');
let columnFirstName = document.createElement('td');
let columnLastName = document.createElement('td');
let columnMiddleName = document.createElement('td');
let columnDateOfBirth = document.createElement('td');
let columnStartYear = document.createElement('td');
let columnFaculty = document.createElement('td');

columnFirstName.textContent = studentObj.firstName;
columnLastName.textContent = studentObj.lastName;
columnMiddleName.textContent = studentObj.middleName;
columnDateOfBirth.textContent = studentObj.dateOfBirth; 
columnStartYear.textContent = studentObj.startYear;
columnFaculty.textContent = studentObj.faculty;

string.append(columnLastName,columnFirstName,columnMiddleName,columnDateOfBirth,columnStartYear,columnFaculty)

const tbody = document.querySelector('tbody');

tbody.append(string)

return {
    string
};
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.
// Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';  // Очищаем таблицу перед перерисовкой
    for (let i =0; i < studentsArray.length; i++){
         getStudentItem(studentsArray[i]) 
    }
}

 
console.log(renderStudentsTable(studentsList));  

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.
// Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
const form = document.querySelector('form');
const input = document.querySelector('input');
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const middleName = document.getElementById('middleName')
const dateOfBirth = document.getElementById('dateOfBirth')
const startYear = document.getElementById('startYear')
const faculty = document.getElementById('faculty')

form.addEventListener('submit', function (e) {   
    e.preventDefault();
      // Регулярное выражение для проверки только букв
      const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    // Преобразуем введённую дату в объект Date
    const inputDate = new Date(dateOfBirth.value);
    // Устанавливаем минимальную и максимальную даты
    const minDate = new Date('1900-01-01');  // 01.01.1900
    const maxDate = new Date();

    if (
        lettersOnly.test(firstName.value.trim()) &&  
        lettersOnly.test(lastName.value.trim()) &&   
        lettersOnly.test(middleName.value.trim()) && 
        lettersOnly.test(faculty.value.trim()) &&    
        inputDate >= minDate && inputDate <= maxDate && 
        startYear.value >= 2000 && startYear.value <= 2024 
    ) {
        let newObj = {
            firstName: firstName.value,
            lastName: lastName.value,
            middleName: middleName.value,
            dateOfBirth: dateOfBirth.value,
            startYear: startYear.value,
            faculty: faculty.value
        };

        studentsList.push(newObj)
        renderStudentsTable(studentsList)  
        
     }
})


// Функция сортировки массива студентов
function sortUser(arr, prop, dir) {
    let result = arr.sort(function (a, b) {
      let dirIf = a[prop] < b[prop];
  
      if (dir == true) dirIf = a[prop] > b[prop];
  
      if (dirIf == true) return -1;
    });
    return result;
  }

const sortLastName = document.getElementById('sortLastName');
const sortFirstName = document.getElementById('sortFirstName');
const sortMiddleName = document.getElementById('sortMiddleName');
const sortDateOfBirth = document.getElementById('sortDateOfBirth');
const sortStartYear = document.getElementById('sortStartYear');
const sortFaculty = document.getElementById('sortFaculty');

let isAscending = true; // Переменная для отслеживания направления сортировки

sortLastName.addEventListener('click', function () {
  let sortStart = sortUser(studentsList,'lastName', !isAscending)
  isAscending = !isAscending
 renderStudentsTable(sortStart) 
})

sortFirstName.addEventListener('click', function () {
  let sortStart = sortUser(studentsList,'firstName', !isAscending)
  isAscending = !isAscending
 renderStudentsTable(sortStart) 
})

sortMiddleName.addEventListener('click', function () {
  let sortStart = sortUser(studentsList,'middleName', !isAscending)
  isAscending = !isAscending
 renderStudentsTable(sortStart) 
})

sortDateOfBirth.addEventListener('click', function () {
  let sortStart = sortUser(studentsList,'dateOfBirth', !isAscending)
  isAscending = !isAscending
 renderStudentsTable(sortStart) 
})

sortStartYear.addEventListener('click', function () {
  let sortStart = sortUser(studentsList,'startYear', !isAscending)
  isAscending = !isAscending
 renderStudentsTable(sortStart) 
})

sortFaculty.addEventListener('click', function () {
  let sortStart = sortUser(studentsList,'faculty', !isAscending)
  isAscending = !isAscending
 renderStudentsTable(sortStart) 
})


// Функция фильтрации массива студентов 

let user = [
  {
    name: 'Оля',
    age: 22
  },
  {
    name: 'Павел',
    age: 32
  },
  {
    name: 'Алекс',
    age: 19
  }
]

//Функция для фильтрации по параметрам кроме ФИО
function filter(arr, prop, value) {
    let result = [],
    copy = [...arr]

    for (const item of copy) {
        if(String(item[prop]).includes(value) == true) result.push(item)
    }
  return result;
}

const formFilter = document.getElementById('formFilter')
const filterFio = document.getElementById('filterFio')
const filterDateOfBirth =  document.getElementById('filterDateOfBirth')
const filterStartYear = document.getElementById('filterStartYear')
const filterFaculty =  document.getElementById('filterFaculty')
 
//Функция для фильтрации по ФИО
function filterName(arr, value) {
  let result = [],
  copy = [...arr]

  for (const item of copy) {
      if(String(item.lastName).includes(value) ||
        String(item.firstName).includes(value) ||
        String(item.middleName).includes(value))     
        result.push(item)
  }
return result;
}

formFilter.addEventListener('submit', function (event) {
  event.preventDefault()

  let filteredList = studentsList;

  if(filterFio.value.trim() !== '') {  
    filteredList  = filterName(filteredList, filterFio.value)
  } 
  
  if(filterDateOfBirth.value !== '') {
    filteredList  = filter(filteredList, 'dateOfBirth', filterDateOfBirth.value)
  }
  if(filterStartYear.value.trim() !== '') {  
    filteredList  = filter(filteredList, 'startYear', filterStartYear.value)
  }
  if(filterFaculty.value.trim() !== '') {  
    filteredList  = filter(filteredList, 'faculty', filterFaculty.value)
  }

  if(filteredList.length === 0) {
    filteredList = studentsList;
  }

  // filterFio.addEventListener('input', () => {
  //   if(filterFio.value.trim() === '') {
  //     renderStudentsTable(filteredList)
  //   }
  // })
  
  // filterDateOfBirth.addEventListener('input', () => {
  //   if(filterDateOfBirth.value.trim() === '') {
  //     renderStudentsTable(filteredList)
  //   }
  // })
  
  // filterStartYear.addEventListener('input', () => {
  //   if(filterStartYear.value.trim() === '') {
  //     renderStudentsTable(filteredList)
  //   }
  // })
  
  // filterFaculty.addEventListener('input', () => {
  //   if(filterFaculty.value.trim() === '') {
  //     renderStudentsTable(filteredList)
  //   }
  // })

  
renderStudentsTable(filteredList)
})


 

 






 


 














// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.