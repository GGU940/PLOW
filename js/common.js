const category3 = [
    ["스포츠/운동", ["실내스포츠", 'PT/GX', "농구/축구/야구", "그룹운동", "요가/필라테스", "헬스/PT", "레저/액티비티", "야외스포츠"]],
    ["예술/창작", ["라탄", "뜨개/자수", "미술", "취미미술", "플라워/가드닝", "향/초/비누", "가죽/목공/도예", "캘리그래피", "종이접기"]],
    ["디지털 창작", ["디지털드로잉", '영상 편집/색보정', "그래픽 디자인", "디자인 툴", '유튜브', '3D']],
    ["음악/공연", ["보컬", "악기", "댄스", "연기/무용/뮤지컬", "작곡/작사/프로듀싱"]],
    ["개인발전", ['헤어/네일', '퍼스널컬러', '사주/타로', '스킨케어', "메이크업"]],
    ["요리", ["요리/베이킹", "커피/차/술"]],
    ["언어/문학", ["한국어", "기타 외국어", '1:1 영어', "인문", "일본어", "중국어", "영어회화", "글쓰기"]]
];

const API_KEY = '159536c7-599e-4d9f-acfd-8d2f6493f2d7';
const itemsUl = document.querySelector('.cateListArea .items');
const cate3BtnCon = document.querySelector('.cate3Btns');
const conditionBtn = document.querySelector('.conditionBox');

function renderCate(category3) {
    //category3 삽입
    for (let i = 0; i < category3.length; i++) {
        const newBtn = document.createElement('button');
        cate3BtnCon.append(newBtn);
    }
    const cate3btn = cate3BtnCon.querySelectorAll('button')

    for (let i = 0; i < cate3btn.length; i++) {
        // console.log(i, cate3lists[i]);
        cate3btn[i].innerText = `${category3[i][0]}`;
    }

    // cate3BtnCon>buttoon = cate3Btn 클릭하면 on 클래스 추가
    const cate3Btn = cate3BtnCon.querySelectorAll('button');
    cate3Btn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (e.target.classList.contains('on')) {
                e.target.classList.remove('on');
                return;
            }
            cate3Btn.forEach((b) => {
                b.classList.remove('on');
            })
            e.target.classList.add('on');
            // console.log(e);
        })
        // addClassOn(btn);
    });
};
renderCate(category3);

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



function creatHtml(item) {
    // //////
}


function renderItems(itemsList) {
    //html 만들어서 화면에 list 랜더링하기
    if (itemsList.length === 0) {
        itemsUl.innerHTML = ` <li class="noList">검색 결과가 없습니다 ㅠㅠ </li>`
    }
    const itemsHtml = itemsList.map((item) => {
        return creatHtml(item);
    }).join('');
}


async function fetchNews(url, cate3 = '') {
    // try ( 정상적인 경우 ) catch(error){ 에러났을 경우 } 
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include", // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            headers: {
                accept: 'application/json'
            },
            // timeout: 13000 // 13초 (단위: 밀리초)

        });
        const data = await response.json();

        const dataBody = data.response.body
        console.log('dataBody', dataBody);

        let itemsList = dataBody.items.item;
        renderItems(itemsList);

    } catch (error) {
        console.log('^3^ 에러가 나버림 ^3^ => ', error.message);
    }


    // category3 전체 추출, 확인용
    // getCate3(itemsList, totalCount);
};


function getLatestData() {
    //최신뉴스 호출
    const url = new URL(`
    http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY}&numOfRows=12&pageNo=1    `);
    fetchNews(url);
}

getLatestData();


//카테고리3 전체 종류 확인용..
async function getCate3() {

    const url = new URL(`
    http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY}&numOfRows=${totalCount}&pageNo=1    `);
    // fetchNews(url);/
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include", // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            headers: {
                accept: 'application/json'
            },
        });
        const data = await response.json();

        const dataBody = data.response.body
        console.log('dataBody', dataBody);

        let totalCount = dataBody.totalCount;
        let itemsList = dataBody.items.item;
        // 정리해서 배열 출력
        let cate3All = [];
        itemsList.forEach((tem) => {
            if (cate3All.includes(tem.category3)) {
                return;
            }
            cate3All.push(tem.category3);
        });
        console.log('전체 카테고리3 종류~!', cate3All);

    } catch (error) {
        console.log('^3^ getCate3 에러 ^3^ => ', error.message);
    }

    //cate3 종류가 100개... 
    //재미 & 취미 위주의 카테고리만 남기기

};
