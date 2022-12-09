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

function setPage(nPage, target, countdownIntervalId, ...presents){
    
    target.innerHTML = '';
    switch (nPage) {
        case 0:
            createCalendar(target, presents);
            showAvailable(1000);
            return countdownIntervalId;
        case 1:
            
            return countdownIntervalId;
        case 2:
            
            return countdownIntervalId;
    }
}

/*----------------------------------
          ADVENT CALENDAR
----------------------------------*/

/**
 * 
 * @param {*} presents the list of presents
 * @returns the container to append
 */
function createCalendar(target, presents){
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
    
    const container = createEle('div', 'container-md', [row]);
    target.append(container);
   
    const usedBtns = document.querySelectorAll('.usedBtn');
    usedBtns.forEach((btn) => {
        btn.addEventListener('click', function(){
            this.classList.add('my-disabled');
            this.innerHTML = 'Used';
        });
    });
}

/**
 * show the available cards after the delay
 * 
 * @param {*} delay is the time in milliseconds
  */
function showAvailable(delay){
    const dayCards = document.querySelectorAll('.day');
    const date = new Date();
    setTimeout(function(){
        dayCards.forEach((day, i)=>{
            if(i < date.getDate()){
                day.classList.add('is-flipped');
            }
        });

        clearTimeout(this);
    },delay);
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
const presentsList = [
    {
        firstname : 'ciccio',
        budget : 30,
        gift : 'car',
        location : 'german car'
    },
    {
        firstname : 'ciccio',
        budget : 30,
        gift : 'car',
        location : 'german car'
    },
    {
        firstname : 'ciccio',
        budget : 30,
        gift : 'car',
        location : 'german car'
    }
];
//init
const appPage = document.getElementById('app-page');
const calendarBtn = document.getElementById('header-calendar');
const countdownBtn = document.getElementById('header-countdown');
const presentsListBtn = document.getElementById('header-list-presents');
let countdownIntervalId;

//open the advent calendar
createCalendar(appPage, presentsCalendar);
showAvailable(1000);

//event listener
calendarBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(0, appPage, countdownIntervalId, ...presentsCalendar);
}); 
countdownBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(1, appPage, countdownIntervalId);
}); 
presentsListBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(2, appPage, countdownIntervalId, ...presentsList);
}); 
