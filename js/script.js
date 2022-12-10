/**
 * get a random between a min and a max -1
 * 
 * @param {*} min min random to get, inclusive
 * @param {*} max max random to get, exclusive
 * @returns 
 */
function getRandom(min, max){
    const num = Math.floor(Math.random() * (max - min) + min);
    console.log(num);
    return num;
}
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

/**
 * load the page
 * 
 * @param {*} nPage the number of the page to open
 * @param {*} target the main element
 * @param {*} btnClicked the btn clicked to call this function
 * @param {*} countdownIntervalId the countdown interval id to clear
 * @param  {...any} presents the presents to load in Calendar or Presents List
 * @returns the countdownIntervalId can be undefined if the interval is cleared
 */
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
        //get footer credits
        const credits = document.getElementById('credits');
        //set page
        switch (nPage) {
            case 0:
                //change color for footer credits
                credits.classList.remove('my-color-red');
                
                createCalendar(target, presents);
                showAvailable(1000);
                return countdownIntervalId;
            case 1:
                //change color for footer credits
                credits.classList.add('my-color-red');
                
                //create counter
                createCountdown(target);
                countdownIntervalId = setInterval(function(){
                    //overwrite innertext counter
                    startCounting();
                },500);
                return countdownIntervalId;
            case 2:
                //change color for footer credits
                credits.classList.remove('my-color-red');

                createPresentList(target, presents);
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
    const row = createEle('div','row g-3 g-sm-4');

    presents.forEach((present, i) => {
        const usedBtnText = (present.isUsed) ? 'Used' : 'Check as Used';
        const colCard = `
        <div class="scene col-6 col-md-4 col-lg-3 col-xxl-2">
            <div class="day card rounded-4 text-center">
                <div class="card__face card__face--front display-1 d-flex p-2 p-sm-3">
                    <i class="fa-solid fa-gift m-auto my-color-red"></i>
                </div>
                <div class="card-body card__face card__face--back d-flex flex-column justify-content-between p-2 p-sm-3 rounded-4">
                    <div>
                        <h6 class="opacity-50 m-0">#${i+1}</h6>
                        <h4 class="card-title">${present.title}</h4>
                    </div>
                    <p class="card-text text-secondary">${present.details}</p>
                    <button href="#" class="btn usedBtn my-btn-red text-white rounded-3">${usedBtnText}</button>
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
    let randTrees = [];
    for (let i = 0; i < 50; i++) {
        const tree = createEle('div','position-absolute display-3 translate-middle-x christmas-tree text-dark',[String.fromCharCode(getRandom(65, 91))]);
        tree.style.bottom = getRandom(10, 40) + 'px';
        tree.style.left = getRandom(0, 100) + '%';
        randTrees.push(tree);
    }
    const snowWindowImg = createEle('img', 'h-100 w-100 my-object-cover-bottom', [], [{type:'src', value: './assets/img/snowWindow.png'}]);
    const snowContainer = createEle('div', 'snow-container position-absolute bottom-0 w-100', [snowWindowImg, ...randTrees]);
    const timerElement = createEle('h1', 'm-auto display-1 snowy-christmas my-color-red', [], [{type:'id', value:'timer'}]);
    const timerContainer = createEle('div', 'col-10 col-md-8 col-lg-6 d-flex translate-middle top-50 start-50 position-absolute bg-white countdown-shape', [timerElement]);
    const timerRow = createEle('div', 'row w-100', [timerContainer]);
    const container = createEle('div', 'd-flex w-100 h-100', [timerRow, snowContainer]);
    target.append(container);
}

/**
 * start counting down to the xmas date
 */
function startCounting(){
    const timer = new Date();
    const timerEle = document.getElementById('timer');
    let timerString = '00:00:00:00';
    if(timer.getDate() < 25 && timer.getMonth() + 1 === 12){
        //fai il countdown fino a dd:24 hh:23 mm:59 ss:59
        timerString = `${getTwoDigits(24 - timer.getDate())}:${getTwoDigits(23 - timer.getHours())}:${getTwoDigits(59 - timer.getMinutes())}:${getTwoDigits(59 - timer.getSeconds())}`;
    }
    else if(timer.getDate() === 25 && timer.getMonth() + 1 === 12){
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
/**
 * create the container with a nav to add presents and a table width all presents loaded
 * 
 * @param {*} target the main element
 * @param {*} presents the list of presents to load
 */
function createPresentList(target, presents){
    const addPresentsNav = `
    <nav class="navbar navbar-dark">
        <h1 class="text-white">Add some presents</h1>
        <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#presentListNav" aria-controls="presentListNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-plus"></i>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="presentListNav">
            <ul class="navbar-nav user-select-none flex-row row g-4">
                <li class="col-12 col-sm-6 col-lg-3">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                            <i class="fa-solid fa-user my-color-red"></i>
                        </span>
                        <input type="text" class="form-control my-color-red fw-bold" placeholder="Name">
                    </div>
                </li>
                <li class="col-12 col-sm-6 col-lg-3">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                            <i class="fa-solid fa-sack-dollar my-color-red"></i>
                        </span>
                        <input type="number" class="form-control my-color-red fw-bold" placeholder="Budget">
                    </div>
                </li>
                <li class="col-12 col-sm-6 col-lg-3">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                            <i class="fa-solid fa-gifts my-color-red"></i>
                        </span>
                        <input type="text" class="form-control my-color-red fw-bold" placeholder="Gift Name">
                    </div>
                </li>
                <li class="col-12 col-sm-6 col-lg-3">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                            <i class="fa-solid fa-store my-color-red"></i>
                        </span>
                        <input type="text" class="form-control my-color-red fw-bold" placeholder="Marketplace">
                    </div>
                </li>
                <li class="col">
                    <button type="button" class="btn btn-light w-100 my-color-red fw-bold" id="addPresentBtn">Add Present</button>
                </li>
            </ul>
        </div>
    </nav>
    `;
    const table = `
    <table class="table text-white text-center">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Budget</th>
                <th scope="col">Gift</th>
                <th scope="col">Location</th>
                <th scope="col"></th>
            </tr>
            </thead>
        <tbody id="tbody">
            
        </tbody>
    </table>
    `;
    //create container and append nav and empty table
    const container = createEle('div', 'container-md');
    container.innerHTML = addPresentsNav + table;
    target.append(container);

    //load presents
    loadPresentsList(presents);

    //get form-controls, addPresentBtn
    const formControls = document.querySelectorAll('.form-control');
    const addPresentBtn = document.getElementById('addPresentBtn');
    addPresentBtn.addEventListener('click', function(){
        presents.push({
            firstname : formControls[0].value,
            budget : parseFloat(formControls[1].value, 10).toFixed(2),
            gift : formControls[2].value,
            location : formControls[3].value,
        });

        formControls.forEach((formControl)=>{
            formControl.value = '';
        });

        loadPresentsList(presents);
    });    
}

/**
 * load all presents in list presents and append it to the tbody
 * 
 * @param {*} presents the list of presents to load
 */
function loadPresentsList(presents){
    //add presents to tbody
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    presents.forEach((present, i)=>{
        const presentTr = `
        <tr class="align-middle">
            <th scope="row">${i+1}</th>
            <td>${present.firstname}</td>
            <td>€ ${present.budget}</td>
            <td>${present.gift}</td>
            <td>${present.location}</td>
            <td>
                <button class="btn w-100 deletePresentBtn">
                    <i class="fa-solid fa-square-minus text-white"></i>
                </button>
            </td>
        </tr>
        `;
        tbody.innerHTML += presentTr;
    });

    const deletePresentBtns = document.querySelectorAll('.deletePresentBtn');
    deletePresentBtns.forEach((deletePresentBtn, i)=>{
        deletePresentBtn.addEventListener('click', function(){
            presents.splice(i, 1);
            loadPresentsList(presents);
        }, {once:true});
    });
}

/**
 * load all delete present in list for every present il list
 * 
 * @param {*} presents the list of presents
 */
function loadDeleteBtns(presents){
    
}

/*----------------------------------
                INIT
----------------------------------*/
//presents list
const presentsCalendar = [
    {title: 'film', details: 'una fantastica serata film che spero faccia da sottofondo', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'pranzo', details: 'un buonissimo pranzo under €50; vale anche la mia cucina (non che il menù sia vastissimo)', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'film', details: 'una fantastica serata film che spero faccia da sottofondo', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'gita', details: 'una gita mozzafiato a casino di monte bello', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'film', details: 'una fantastica serata film che spero faccia da sottofondo', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'film', details: 'una fantastica serata film che spero faccia da sottofondo', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'cena', details: 'una buonissima cena under €50; vale anche la mia cucina (non che il menù sia vastissimo)', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'cheese cake', details: 'una fetta di cheese cake di sig.ra Pasqualina', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'cinema', details: 'una fantastica serat... vabbè hai capito, scegli un film (al cinema stavolta)', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'film', details: 'una fantastica serata film che spero faccia da sottofondo', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'gita', details: 'una gita mozzafiato a casino di monte tignosu', isUsed : false},
    {title: '', details: '', isUsed : false},
    {title: 'film', details: 'una fantastica serata film che spero faccia da sottofondo', isUsed : false},
];
const presentsList = [];
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
    countdownIntervalId = setPage(0, appPage, this, countdownIntervalId, ...presentsCalendar);
}); 
countdownBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(1, appPage, this, countdownIntervalId);
}); 
presentsListBtn.addEventListener('click', function(){
    countdownIntervalId = setPage(2, appPage, this, countdownIntervalId, ...presentsList);
}); 