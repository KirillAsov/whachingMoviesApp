
const inputFilmNode = document.getElementById('input-film');
const addFilmBtn = document.getElementById('add-film-btn');
const validationInfoNode = document.getElementById('validation-info');
const listFilmsNode = document.getElementById('list-films');


const CHECKED_CLASS_NAME = 'checked-film-item';
const CHECKED_CHECKBOX = 'checked-checkbox';

let films = [];

//Получение названия фильма от пользователя
const getFilmFormUser = () => {
    let nameFilm = inputFilmNode.value;
    return nameFilm;
}
function isExitingValue (value) {
    if (!value) {
        validationInfoNode.style.visibility = "visible"; 
        return true;
    }
    validationInfoNode.style.visibility = "hidden";
}

//Очистка поля ввода
const inputClearing = () => {
    inputFilmNode.value = '';
}
// добавление в массив(список) фильма (от пользователя)
const addFilm = () => {
    const newFilm = getFilmFormUser();
    films.unshift(newFilm);
}

// добавляем шаблонную запись для нового фильма
const renderFilm = (newFilm) => {
    return (
    `<li class="film-item">
        <input class="film-item__checkbox" type="checkbox">
        <label class="label">${newFilm}</label>
        <div class="film-item__delete-film">
            <span class="film-item__delete-film-span"></span>
        </div>
    </li>`)
}

//получаем шаблонную запись от предыдущей функции и записываем в начало списка
const createFilm =(newFilm) => {
    const filmsList = renderFilm (newFilm);
    listFilmsNode.insertAdjacentHTML("afterBegin", filmsList);
}

// const renderList = () => {
//     films.forEach(createFilm); 
// }

//поиск фильма (индекса) в списке
const getFilmIndex = (filmElement) => {
    // задаем массив, состоящий из вложенных элементов
    const filmIndex = Array.from(listFilmsNode.children).indexOf(filmElement)
    return (
        filmIndex
    );
}

// удаление фильма из списка
const deleteFilm = (event) => {
    if (event.target.classList.contains("film-item__delete-film") ||
    event.target.classList.contains("film-item__delete-film-span")) {
        const currentFilmItem = event.target.closest(".film-item");
        const currentFilmIndex = getFilmIndex(currentFilmItem);
           
        films.splice(currentFilmIndex, 1);
        currentFilmItem.remove();
        }; 

}

// активация чекбокса
const activeCheckbox = (event) => {
    if (event.target.classList.contains("film-item__checkbox") ||
    event.target.classList.contains("label")) {
        const currentFilmItem = event.target.closest(".film-item");
        const currentCheckbox = event.target.closest(".label");
        // const currentFilmIndex = getFilmIndex(currentFilmItem);
        currentFilmItem.classList.toggle(CHECKED_CLASS_NAME);
        currentCheckbox.classList.toggle(CHECKED_CHECKBOX);
    }
}

const addButtonHandler = () =>{
    const unExitingValue = isExitingValue(getFilmFormUser());
    if (unExitingValue == true)
    {
        return;
    }
    addFilm();  
    createFilm (getFilmFormUser());
    inputClearing();
}

listFilmsNode.addEventListener('click', deleteFilm);
listFilmsNode.addEventListener('click', activeCheckbox);
addFilmBtn.addEventListener('click', addButtonHandler)
    
