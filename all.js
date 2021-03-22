let data = [
    {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];


const addTicket = document.querySelector('#add');
const serch = document.querySelector('#serch');
const showList = document.querySelector('#showList');
const serchTotal = document.querySelector('#serchTotal');
const ticketName = document.querySelector('#ticketName');
const imgUrl = document.querySelector('#imgUrl');
const area = document.querySelector('#location');
const description = document.querySelector('#description');
const manySet = document.querySelector('#manySet');
const money = document.querySelector('#money');
const star = document.querySelector('#star');
const inputGroup = [
    ticketName,
    imgUrl,
    area,
    description,
    manySet,
    money,
    star
];

// console.log(addTicket);
let isEmpty = false;

function reset() {
    inputGroup.forEach(function (item) {
        // console.log(item);
        item.value = "";
    })
    isEmpty = false;
}
function addTicketData(e) {
    // console.log(data);
    e.preventDefault();

    //空值判斷，若空顯示紅框，秀出未填寫項目
    inputGroup.forEach(item => {
        let str = item.value.trim();
        if(str === ""){
            console.log(`${item.labels[0].textContent} 未填寫`);
            isEmpty = true;
            item.classList.add("empty");
        }
    })
    //若有空值中斷執行
    if (isEmpty === true) return;

    //資料寫入
    let newData = {};
    newData.id = data.length;
    newData.name = ticketName.value;
    newData.imgUrl = imgUrl.value;
    newData.area = area.value;
    newData.description = description.value;
    newData.group = parseInt(manySet.value, 10);
    newData.price = parseInt(money.value, 10);
    newData.rate = parseInt(star.value, 10);
    // console.log(newData);
    data.push(newData);
    // console.log(data);

    rendor(data);
    reset();
    console.log(`新增${newData}成功！`)
    return true;
}


function rendor(data) {
    let list = ``;
    data.forEach(function(item){
        list += `
        <li class="col-lg-4 col-sm-12 col-md-6 mb-4">
            <div class="card">
                <div class="position-relative">
                <img src="${item.imgUrl}" class="card-img-top" alt="#">
                <div class="card-location">${item.area}</div>
                <div class="card-score">${item.rate}</div>
            </div>
            
            <div class="card-body pt-4">
                <h5 class="card-title customTextPrimaryColor h5 mb-3">${item.name}</h5>
                <p class="card-text mb-4 customTextSecColor">${item.description}</p>
                <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center customTextPrimaryColor">
                        <span class="material-icons h6 mb-0">
                        error
                        </span>
                        <p class="h6 mb-0">剩下最後${item.group}組</p>
                    </div>
                        <div class="d-flex align-items-center customTextPrimaryColor">
                            <span>TWD</span>
                            <p class="h2 mb-0">$${item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
    });
    serchTotal.textContent = `本次搜尋共 ${data.length} 筆資料`;
    showList.innerHTML = list;
}

function areaFilter(e){
    let str = e.target.value;
    if(str === "全部" ){
        rendor(data);
    } else {
        let newData = data.filter( item => item.area === str);
        rendor(newData);
    }
}

//card list rendor
rendor(data);

//點擊新增套票按鈕新增套票資訊
addTicket.addEventListener('click', addTicketData);

//選擇地區執行areaFilter分類
serch.addEventListener('change', areaFilter);


inputGroup.forEach(item => {
    item.addEventListener('change', function(e){
        e.target.classList.remove('empty');
    })
})