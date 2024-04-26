// parameter 많은 새로운 api로 재도전...
const API_KEY = '50524a75646e617934397679494969';
const CodeNameList = ['전시/미술', '뮤지컬/오페라', '클래식', '국악', '독주/독창회', '무용', '연극', '영화', '콘서트', '축제-문화/예술', '기타'];

let dataList = []; //데이터 리스트 (아이템 리스트)

const codenameBtnCon = document.querySelector('.codenameBtnCon');
const listsUl = document.querySelector('.cateListArea .items');
const conditionBtn = document.querySelector('.cateListArea .conditionBox');
const inputDateSendBtn = document.querySelector('.conditionBox .inputBtn .btnSend')
const inputDateResetBtn = document.querySelector('.conditionBox .inputBtn .btnReset')
const inputDateCon = document.querySelector('.conditionBox .inputDate');
//---- pagination----
let list_total_count = 0; //총 데이터 수
let numOfRows = 9; //한 페이지에 보여질 아이템 갯수
let START_INDEX = 1;
let END_INDEX = START_INDEX + numOfRows - 1;

// let groupSize = 5;  //5page = 1 group


// ------ 카테 버튼 관련 ------


inputDateResetBtn.addEventListener('click', () => {
    inputDateCon.querySelector('.inputYear').value = '';
    inputDateCon.querySelector('.inputMonth').value = '';
    inputDateCon.querySelector('.inputDay').value = '';
})

inputDateSendBtn.addEventListener('click', () => {
    const inputYear = inputDateCon.querySelector('.inputYear');
    const inputMonth = inputDateCon.querySelector('.inputMonth');
    const inputDay = inputDateCon.querySelector('.inputDay');

    if (isNaN(inputYear.value) || isNaN(inputMonth.value) || isNaN(inputDay.value)) {
        alert("숫자를 입력해주세요");
    } else if (inputYear.value.length != 4 || inputMonth.value.length != 2 || inputDay.value.length != 2) {
        alert("날짜를 양식에 맞게 입력해주세요 \n예; [0000]년 [00]월 [00]일");
    }
    let deliverDate = inputYear.value + '-' + inputMonth.value + '-' + inputDay.value;

    console.log(deliverDate);
    getListsByDate(deliverDate);
})

function getListsByDate(deliverDate) {
    console.log('getListsByDate ))))');
    const url = new URL(`
    http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/`);
    fetchLists(url, undefined, undefined, undefined, deliverDate);

}

function getListsByCate(codename) {
    const url = new URL(`
    http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/`);
    console.log(codename);
    // fetchLists(url, '', codename, '', '');
    fetchLists(url, undefined, codename, undefined, undefined);

}

function renderCate(CodeNameList) {
    //CodeNameList 받ㅇ와서  button 삽입
    for (let i = 0; i < CodeNameList.length; i++) {
        const newBtn = document.createElement('button');
        codenameBtnCon.append(newBtn);
    }
    const codenameBtn = codenameBtnCon.querySelectorAll('button')

    for (let i = 0; i < codenameBtn.length; i++) {
        // console.log(i, cate3lists[i]);
        codenameBtn[i].innerText = `${CodeNameList[i]}`;
    }

    // codenameBtn클릭하면 on 클래스 추가
    codenameBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            codenameBtn.forEach((b) => {
                if (b === e.target) { return; }
                b.classList.remove('on');
            })
            e.target.classList.toggle('on');

            let codename = e.target.firstChild.data
            getListsByCate(codename);
        })
    });
}


// ------ 리스트 관련 ------
//조건검색 버튼 = conditionBtn 클릭하면 on 클래스 추가
conditionBtn.querySelector('p').addEventListener('click', () => {
    if (conditionBtn.classList.contains('on')) {
        conditionBtn.classList.remove('on');
        conditionBtn.querySelector('i').innerHTML = `✛`;

        return;
    }
    conditionBtn.classList.add('on');
    conditionBtn.querySelector('i').innerHTML = `-`;
})


function creatHtml(li) {
    // console.log(li);
    // console.log('lilili', li['DATE']);
    let img = li['MAIN_IMG'] || '../img/noimg.png';
    let codename = li['CODENAME'] || '분야정보없음';
    let isFree = li['IS_FREE'] || '유무료정보없음';
    let title = li['TITLE'] || '행사명정보없음';
    let startDate = li['STRTDATE'] == li['END_DATE']
        ? ''
        :
        li['STRTDATE']
            ? li['STRTDATE'].slice(0, 4) + '.' + li['STRTDATE'].slice(5, 7) + '.' + li['STRTDATE'].slice(8, 10) + ' ~'
            : '시작날짜정보없음';
    let endDate = li['END_DATE'] ? li['END_DATE'].slice(0, 4) + '.' + li['END_DATE'].slice(5, 7) + '.' + li['END_DATE'].slice(8, 10) : '종료날짜정보없음';
    let guname = '[' + li['GUNAME'] + ']' || '주소정보없음';
    let place = li['PLACE'] || '장소정보없음';
    let hmpageLink = li['ORG_LINK'] || '홈페이지정보없음';

    // console.log(guname);
    return `
    <li class="item">
         <div class="infoTag">
             <span class='isFree'>${isFree}</span>
             <span class="codnameBox">${codename}</span>
         </div>
         <div class="imgBox">
             <img class='mainImg'
                 src="${img}"
                 alt="img">
         </div>
         <div class="infoBox">
             <strong class='title'>${title}</strong>
             <div class="date">
                 <span class="startDate">${startDate}</span>
                 <span class="endDate">${endDate}</span>
             </div>
             <!-- <div class="place"> -->
             <span class="guName ">${guname}</span>
             <span class="place ">${place}</span>
             <!-- </div> -->
         </div>
         <a class='orgLink'
             href="${hmpageLink}" target="_blank"></a>
     </li>
    `;
}


function renderLists(dataList) {
    if (dataList.length == 0) {

        //***!!! 이 api는 해당하는 리스트가 없으면 전체 리스트가 출력됌 ㅠ */
        listsUl.innerHTML = `<li classList='noList'> 검색 결과가 없습니다 ㅠㅠ </li>`;
        return;
    }
    const listHtml = dataList.map((li) => {
        return creatHtml(li)
    }).join('');
    listsUl.innerHTML = listHtml;
}



function renderRecommendList(dataList) {

    const listHtml = dataList.map((li) => {
        return creatHtml(li)
    }).join('');
    document.querySelector('.recommendListCon .items').innerHTML = listHtml;

    listScrollUp(listHtml)
}

// 왼쪽 추천 리스트 (이번주 토요일 갈수있는 곳) 리스트 불러오기
async function fetchRecommendList() {
    try {
        // 현재 날짜 객체 생성
        let currentDate = new Date();
        // 현재 날짜의 요일을 가져옴 (0: 일요일, 1: 월요일, ..., 6: 토요일)
        let currentDay = currentDate.getDay();
        let saturdayDate = new Date(currentDate);
        saturdayDate.setDate(currentDate.getDate() - currentDay + 6);
        // console.log('000------', saturdayDate.getDate().toString.length);

        let saturYear = saturdayDate.getFullYear();
        let saturMonth = saturdayDate.getMonth().toString.length == 1
            ? '0' + saturdayDate.getMonth() :
            saturdayDate.getMonth();
        let saturDate =
            // saturdayDate.getDate().toString.length == 1
            //     ? '0' + saturdayDate.getDate() :
            saturdayDate.getDate();

        let settingDate = `${saturYear}-${saturMonth}-${saturDate}`;


        const url = new URL(`
    http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/${END_INDEX}/ / /${settingDate}`);

        const response = await fetch(url);
        const data = await response.json();
        const dataInfo = data.culturalEventInfo;
        console.log(url);
        dataList = dataInfo.row;

        renderRecommendList(dataList);
    } catch (error) {
        console.log('fetchRecommendList 에러 ^3^ => ', error.message);
    }
}

async function fetchLists(url, START_INDEX = 1, CODENAME = ' ', TITLE = ' ', DATE = ' ') {
    // try ( 정상적인 경우 ) catch(error){ 에러났을 경우 } 
    try {

        url = url + START_INDEX + '/' + END_INDEX + '/' + CODENAME + '/' + TITLE + '/' + DATE

        const response = await fetch(url);
        const data = await response.json();
        const dataInfo = data.culturalEventInfo
        list_total_count = dataInfo.list_total_count;
        dataList = dataInfo.row;

        // console.log(dataList[1]);
        // console.log(dataList[2]['CODENAME']);

        showTotalCount(list_total_count);    // 총 결과 갯수 표시
        renderLists(dataList);


        // console.log(CodeNameList);
        console.log(typeof list_total_count);


    } catch (error) {
        console.log(list_total_count);
        console.log(url);
        console.log('^3^ 에러 ^3^ => ', error.message);
    }

    // dataname 종류 확인용
    // function getCodeName(dataList) {
    //     let codenameList = [];
    //     for (let i = 0; i < 40; i++) {
    //         // console.log(dataList[i]['CODENAME']);
    //         let codename = dataList[i]['CODENAME'];
    //         // console.log(codename);
    //         if (codenameList.includes(codename)) {
    //             continue;
    //         } else {
    //             codenameList.push(codename);
    //         }
    //     }
    //     return codenameList
    // }
    // console.log(' dataname 종류', getCodeName(dataList));
};


function getLatestData() {
    //최신 데이터 호출
    // http://openapi.seoul.go.kr:8088/{API_KEY}/json/culturalEventInfo/${START_INDEX}/${END_INDEX}/${CODENAME}/${TITLE}/${DATE}

    const url = new URL(`
    http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/  `);
    fetchLists(url);
}
getLatestData();
renderCate(CodeNameList);
fetchRecommendList();

//------------------------  ------------------------//

// 총 결과 갯수 표시
function showTotalCount(list_total_count) {
    const totalResult = document.querySelector('.cateListArea .totalResult strong');
    totalResult.innerHTML = `${list_total_count}`;
};


// 왼쪽 스크롤바 무한루프 시키기
//1)리스트 복제해서 2배 길이로 만들기
//listHeight 다 올라가면 처음으로 초기화 (transform:translateY(0);)

function listScrollUp(listHtml) {
    const itemsWrap = document.querySelector('.recommendListCon .items');
    let listHeight = itemsWrap.clientHeight;

    console.log(-listHeight);// 길다란 리스트 전체높이
    console.log(itemsWrap.getBoundingClientRect().top);// 

    // 1)
    document.querySelector('.recommendListCon .items').innerHTML = listHtml;

    if (itemsWrap.getBoundingClientRect().top == listHeight) {
        console.log('다돌았당');
        itemsWrap.style.transform = 'translateY(0);';
    }

    console.log(listHeight);// 길다란 리스트 전체높이
}



