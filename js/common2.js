// parameter 많은 새로운 api로 재도전...
const API_KEY = '50524a75646e617934397679494969';
const CodeNameList = ['전시/미술', '뮤지컬/오페라', '클래식', '국악', '독주/독창회', '무용', '연극', '영화', '콘서트', '축제-문화/예술', '기타'];
let dataList = []; //데이터 리스트 (아이템 리스트)
const codenameBtnCon = document.querySelector('.codenameBtnCon');
const listsUl = document.querySelector('.cateListArea .items')

//---- pagination----
let list_total_count = 0; //총 데이터 수
let numOfRows = 3; //한 페이지에 보여질 아이템 갯수
let START_INDEX = 1;
let END_INDEX = START_INDEX + numOfRows - 1;

// let groupSize = 5;  //5page = 1 group


// ------ 카테 버튼 관련 ------
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
        })
    });
}


// ------ 리스트 관련 ------


function creatHtml(li) {
    // console.log(li);
    // console.log('lilili', li['DATE']);
    let img = li['MAIN_IMG'] || '../img/noimg.png';
    let codename = li['CODENAME'] || '분야정보없음';
    let isFree = li['IS_FREE'] || '유무료정보없음';
    let title = li['TITLE'] || '행사명정보없음';
    let startDate = li['STRTDATE'] ? li['STRTDATE'].slice(0, 10) + '~' : '시작날짜정보없음';
    let endDate = li['END_DATE'] ? li['END_DATE'].slice(0, 10) + '~' : '종료날짜정보없음';
    let guname = li['GUNAME'] || '주소정보없음';
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
             <span class="gunName ">${guname}</span>
             <span class="place ">${place}</span>
             <!-- </div> -->
         </div>
         <a class='orgLink'
             href="${hmpageLink}"></a>
     </li>
    `;
}

function renderLists(dataList) {
    if (dataList.length == 0) {
        listsUl.innerHTML = `<li classList='noList'> 검색 결과가 없습니다 ㅠㅠ </li>`;
        return;
    }
    const listHtml = dataList.map((li) => {
        return creatHtml(li)
    }).join('');
    listsUl.innerHTML = listHtml;
}


async function fetchLists(url, START_INDEX = 1, TITLE = '', DATE = '') {
    // try ( 정상적인 경우 ) catch(error){ 에러났을 경우 } 
    try {

        url = url + START_INDEX + '/' + '300' + '/' + TITLE + '/' + DATE
        // console.log(url);

        const response = await fetch(url);
        const data = await response.json();
        const dataInfo = data.culturalEventInfo
        list_total_count = dataInfo.list_total_count;
        dataList = dataInfo.row;

        // console.log(dataList[1]);
        // console.log(dataList[2]['CODENAME']);

        showTotalCount(list_total_count);    // 총 결과 갯수 표시
        renderCate(CodeNameList);
        renderLists(dataList)


    } catch (error) {
        console.log('^3^ 에러 ^3^ => ', error.message);
    }

    // dataname 종류 확인용
    function getCodeName(dataList) {
        let codenameList = [];
        for (let i = 0; i < 40; i++) {
            // console.log(dataList[i]['CODENAME']);
            let codename = dataList[i]['CODENAME'];
            // console.log(codename);
            if (codenameList.includes(codename)) {
                continue;
            } else {
                codenameList.push(codename);
            }
        }
        return codenameList
    }
    console.log(' dataname 종류', getCodeName(dataList));
};


function getLatestData() {
    //최신 데이터 호출
    // http://openapi.seoul.go.kr:8088/{API_KEY}/json/culturalEventInfo/${START_INDEX}/${END_INDEX}/{TITLE}/{DATE}

    const url = new URL(`
    http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/  `);
    fetchLists(url);
}
getLatestData();



//------------------------  ------------------------//

// 총 결과 갯수 표시
function showTotalCount(list_total_count) {
    const totalResult = document.querySelector('.cateListArea .totalResult strong');
    totalResult.innerHTML = `${list_total_count}`;
};
// // ham 클릭 => nav .active 토글
// const nav = document.querySelector('.hd nav');
// const hamBtn = document.querySelector('.hd .ham');

// hamBtn.addEventListener('click', () => {
//     console.log('click');
//     nav.classList.toggle('active');
// });