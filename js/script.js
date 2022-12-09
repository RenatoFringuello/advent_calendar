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

function setPage(nPage, target, btnClicked, countdownIntervalId, ...presents){
    
    if(!btnClicked.classList.contains('active')){
        //set active
        const btnActive = document.querySelector('.active');
        btnActive.classList.remove('active')
        btnClicked.classList.add('active');
        //clear main tag
        target.innerHTML = '';
        //clear Interval changing page
        clearInterval(countdownIntervalId);
        //set page
        switch (nPage) {
            case 0:
                createCalendar(target, presents);
                showAvailable(1000);
                return countdownIntervalId;
            case 1:
                //create counter
                createCountdown(target);
                countdownIntervalId = setInterval(function(){
                    //overwrite innertext counter
                    startCounting();

                },500);
                return countdownIntervalId;
            case 2:
                
                return countdownIntervalId;
        }
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
             COUNTDOWN
----------------------------------*/
/**
 * create the countdown structure
 * 
 * @param {*} target the element to append the container
 */
function createCountdown(target){
    //timer structure
    const snowWindowImg = createEle('img', 'position-absolute bottom-0 w-100', [], [{type:'src', value: './img/snowWindow.png'}]);
    const timerElement = createEle('h1', 'm-auto display-1', [], [{type:'id', value:'timer'}]);
    const container = createEle('div', 'd-flex w-100 h-100 text-white position-relative', [timerElement, snowWindowImg]);
    target.append(container);
}

/**
 * start counting down to the xmas date
 */
function startCounting(){
    const timer = new Date();
    const timerEle = document.getElementById('timer');
    let timerString = '00:00:00:00';
    if(timer.getDate() < 10 && timer.getMonth() + 1 === 12){
        //fai il countdown fino a dd:24 hh:23 mm:59 ss:59
        timerString = `${getTwoDigits(9 - timer.getDate())}:${getTwoDigits(23 - timer.getHours())}:${getTwoDigits(59 - timer.getMinutes())}:${getTwoDigits(59 - timer.getSeconds())}`;
    }
    else if(timer.getDate() === 10 && timer.getMonth() + 1 === 12){
        // per tutto il giorno a partire da dd:25 hh:00 mm:00 ss:00 fino a quando non sarà il dd:26
        timerString = 'Merry Christmas!'
    }
    timerEle.innerHTML = timerString;
}

/**
 * returns a string with two digits if it's 1 digit
 * 
 * @param {*} num the num to check
 * @returns a string where if it has 1 digit will returned with a 0 ahead
 */
function getTwoDigits(num){
    return (num >= 0 && num < 10) ? `0${num}` : `${num}`;
}

/*----------------------------------
            PRESENTS LIST
----------------------------------*/

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
// createCalendar(appPage, presentsCalendar);
// showAvailable(1000);

//event listener
calendarBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(0, appPage, this, countdownIntervalId, ...presentsCalendar);
}); 
countdownBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(1, appPage, this, countdownIntervalId);
}); 
presentsListBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(2, appPage, this, countdownIntervalId, ...presentsList);
}); 
