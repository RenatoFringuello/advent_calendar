/**
 * 
 * create an element using tag class contents and attributes
 * 
 * @param {*} tag the tag of the elemnt
 * @param {*} className the whole class list in a string
 * @param {*} contents a list of contents to append
 * @param {*} attributes a list of attributes to set; es: {type:'href', value:'#'}
 * @returns the element
 */
function createEle(tag, className = '', contents = [], attributes = []){
    const element = document.createElement(tag);
    element.className = className;
    contents.forEach((content) => {
        element.append(content);
    });
    attributes.forEach((attribute) => {
        element.setAttribute(attribute.type, attribute.value);
    });
    return element;
}

/*----------------------------------
          ADVENT CALENDAR
----------------------------------*/

/**
 * 
 * @param {*} presents the list of presents
 * @returns the container to append
 */
function createCalendar(presents){
    const row = createEle('div','row g-4');

    presents.forEach((present) => {
        const usedBtnText = (present.isUsed) ? 'Used' : 'Check as Used';
        const colCard = `
        <div class="scene col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="day card rounded-4 text-center">
                <div class="card__face card__face--front display-1 d-flex p-3">
                    <i class="fa-solid fa-gift m-auto my-color-red"></i>
                </div>
                <div class="card-body card__face card__face--back d-flex flex-column justify-content-between p-3 rounded-4">
                    <h5 class="card-title">${present.title}</h5>
                    <p class="card-text text-secondary">${present.details}</p>
                    <button href="#" class="btn usedBtn my-btn-red text-white">${usedBtnText}</button>
                </div>
            </div>
        </div>
        `;
        row.innerHTML += colCard; 
    });

    const usedBtns = document.querySelectorAll('.usedBtn');
    usedBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            alert('used');
        });
    });

    const container = createEle('div', 'container-md', [row]);
    return container;
}

function showAvailable(){
    const dayCards = document.querySelectorAll('.day');
    const date = new Date();
    setTimeout(function(){
        dayCards.forEach((day, i)=>{
            if(i < date.getDate()){
                day.classList.add('is-flipped');
            }
        });
    },1000);
}

/*----------------------------------
                INIT
----------------------------------*/
//presents list
const presentsCalendar = [
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
    {title: 'reaglo', details: 'cool present, this is a new car, enjoy this, maan', isUsed : false},
];
//init
const appPage = document.getElementById('app-page');
appPage.append(createCalendar(presentsCalendar));
showAvailable();
