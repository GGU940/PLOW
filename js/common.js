const category3 = [
    //전체 카테고리3을 출력해보니 100개가 나와서.. 서비스랑 어울리는 것들을 추리고, 비슷한것끼리 묶었습니다
    ["스포츠/운동/레저", ["실내스포츠", 'PT/GX', "농구/축구/야구", "그룹운동", "요가/필라테스", "헬스/PT", "레저/액티비티", "야외스포츠"]],
    ["음악/공연예술", ["보컬", "악기", "댄스", "연기/무용/뮤지컬", "작곡/작사/프로듀싱"]],
    ["미술/공예", ["라탄", "뜨개/자수", "미술", "취미미술", "플라워/가드닝", "향/초/비누", "가죽/목공/도예", "캘리그래피", "종이접기"]],
    ["디지털 창작", ["디지털드로잉", '영상 편집/색보정', "그래픽 디자인", "디자인 툴", '유튜브', '3D']],
    ["요리/음식", ["요리/베이킹", "커피/차/술"]],
    ["개인발전", ['헤어/네일', '퍼스널컬러', '사주/타로', '스킨케어', "메이크업"]],
    ["언어/문학", ["한국어", "기타 외국어", '1:1 영어', "인문", "일본어", "중국어", "영어회화", "글쓰기"]]
];

const API_KEY = '159536c7-599e-4d9f-acfd-8d2f6493f2d7';
const itemsUl = document.querySelector('.cateListArea .items');
const cate3BtnCon = document.querySelector('.cate3Btns');
const conditionBtn = document.querySelector('.conditionBox');

//---- pagination----
let totalCount = 0; //5075개임
let pageNo = 1;
let numOfRows = 12; //한 페이지에 보여질 아이템 갯수
let groupSize = 5;  //5page = 1 group



function moveToPage(i) {
    console.log('moveToPage 실행~!~!~');
    pageNo = i;
    const url = new URL(`
http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY} `);
    fetchLists(url, pageNo);
}

function pagination(pageNo) {
    // 해야함
    let totalPage = Math.ceil(totalCount / numOfRows);  //전체 page 수
    let groupOfPage = Math.ceil(pageNo / numOfRows);      //pageNo가 몇번 그룹인지
    let firstOfPage = (groupOfPage - 1) * groupSize + 1   //pageGroup에서의 first page
    let lastOfPage = Math.min(totalPage, groupOfPage * groupSize)  //pageGroup에서의 last page

    let pagiHtml = `<button class='btnPagePrev'> &#8668; </button>`;
    for (let i = firstOfPage; i <= lastOfPage; i++) {
        pagiHtml += `<button class= "pgBtn ${i == pageNo ? 'on' : ''} "> ${i} </button>`;
    }
    pagiHtml += `<button class='btnPageNext'> &#8669; </button>`;

    document.querySelector('.cateListArea .pg').innerHTML = pagiHtml;

    const pagiBtn = document.querySelectorAll('.pg .pgBtn');
    console.log(pagiBtn);
    pagiBtn.forEach(pgBtn => {
        pgBtn.addEventListener('click', () => {
            moveToPage(pagiBtn.textContent);
        })
    })

}



// ham 클릭 => nav .active 토글
const nav = document.querySelector('.hd nav');
const hamBtn = document.querySelector('.hd .ham');
hamBtn.addEventListener('click', () => {
    console.log('click');
    nav.classList.toggle('active');
})


//검색기능
const searchInput = document.querySelector('.search .inputArea input');
const searchBtn = document.querySelector('.search .inputArea button');

function searchkeyword() {
    const searchWord = searchInput.value;
    searchInput.value = '';//초기화
    console.log('searchkeyword 작동');
    const url = new URL(
        `
        http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY}&keyword=${searchWord}&pageNo=1   
        `
    );
    fetchLists(url);
}
searchBtn.addEventListener('click', () => {
    searchkeyword();
})
searchInput.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') { return; }
    searchkeyword();
})

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
            // 버튼 class on
            if (e.target.classList.contains('on')) {
                e.target.classList.remove('on');
                return;
            }
            cate3Btn.forEach((b) => {
                b.classList.remove('on');
            })
            e.target.classList.add('on');

            // 카테고리 리스트 업데이트
            // let cateName = e.target.textContent;
            // getListByCate(cateName);
        })

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
    // ////////html 만들어서 화면에 뿌리기
    let description = item.description || '설명 없음';
    let title = item.title || '클래스명 없음';
    let charge = item.charge ? item.charge.slice(0, 7) : '가격정보 없음';
    let time = item.time || '시간정보 없음';
    let address = item.address || '주소정보 없음';
    let category3 = item.category3 || '카테고리 없음';
    let headcount = item.headcount || '인원정보 없음';
    return ` 
    <li class="item">
        <div class="descriptionBox">
        <span class="description">${description}</span>
        </div>
        <div class="infoBox">
            <span class="cate3">${category3}</span>
            <span class="headcount">${headcount}</span>
            <strong class='title'>${title}</strong>
            <span class="address">${address}</span>
            <span class="time">${time}</span>
            <strong class='price'>${charge}</strong>
        </div>
    </li>
    `
}


function renderItems(itemsList) {
    //html 만들어서 화면에 list 랜더링하기
    if (itemsList.length === 0) {
        itemsUl.innerHTML = ` <li class="noList">검색 결과가 없습니다 ㅠㅠ </li>`
    }
    const itemsHtml = itemsList.map((item) => {
        return creatHtml(item);
    }).join('');
    itemsUl.innerHTML = itemsHtml;
}





// function getListByCate(cateName) {
//     //카테고리 버튼 클릭하면
//     //해당 카테고리 리스트로 업데이트


//     let cateBundles = '';
//     for (let i = 0; i < category3.length; i++) {
//         if (category3[i][0] == cateName) {
//             console.log('test', category3[i][0]);

//             for (let n = 0; n < category3[i][1].length; n++) {
//                 if (n == category3[i][1].length - 1) {
//                     cateBundles += category3[i][1][n];
//                 } else {
//                     cateBundles += category3[i][1][n] + "+";
//                 }
//             }
//         }
//     }
//     console.log('cateBundles', cateBundles);
//     // const url = new URL(
//     //     `http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY}&pageNo=1&`
//     // );

//     // fetchLists(url, itemListByCate);
//}

function listCount(totalCount) {
    // 총 결과 갯수 
    const totalResult = document.querySelector('.cateListArea .totalResult strong');
    totalResult.innerHTML = `${totalCount}`;
}



async function fetchLists(url, pageNo = 1) {
    // try ( 정상적인 경우 ) catch(error){ 에러났을 경우 } 
    try {
        url.searchParams.append('numOfRows', numOfRows);
        url.searchParams.append('pageNo', pageNo);
        // console.log(url);

        const response = await fetch(url, {
            method: 'GET',
            credentials: "include", // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            // *** cors 오류 ***
            // 어제 저녁부터 cors 오류가 계속 났었는데 검색해보다가 일단
            // 위의 credentials 부분 추가하고, 크롬브라우저에 allow cors 라는 확장프로그램 깔아서 당장은 어찌어찌 해결했습니다..
            // 찾아봐도 개념이 잘 이해가 안 가서 제대로 해결은 못 했어요 ㅠㅠ
            // 해결 방법 다뤄주시면 감사하겠습니다
            headers: {
                accept: 'application/json'
            },

        });
        const data = await response.json();

        // const dataBody = data.response.body
        const dataBody = data.response.body
        // console.log(dataBody.items.item.filter(item => item.category3 === '마케팅'));


        let itemsList = dataBody.items.item;
        renderItems(itemsList);

        totalCount = dataBody.totalCount;
        listCount(totalCount);

        pagination(pageNo);


    } catch (error) {
        console.log('^3^ 에러가 나버림 ^3^ => ', error.message);
    }

};


function getLatestData() {
    //최신뉴스 호출
    const url = new URL(`
    http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY}   `);
    fetchLists(url);
}
getLatestData();


//카테고리3 전체 확인용..
// async function getCate3() {

//     const url = new URL(`
//     http://api.kcisa.kr/openapi/API_CIA_081/request?serviceKey=${API_KEY}&numOfRows=${totalCount}&pageNo=1    `);
//     // fetchLists(url);/
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             credentials: "include", // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
//             headers: {
//                 accept: 'application/json'
//             },
//         });
//         const data = await response.json();

//         const dataBody = data.response.body
//         console.log('dataBody', dataBody);

//         let totalCount = dataBody.totalCount;
//         let itemsList = dataBody.items.item;
//         // 정리해서 배열 출력
//         let cate3All = [];
//         itemsList.forEach((tem) => {
//             if (cate3All.includes(tem.category3)) {
//                 return;
//             }
//             cate3All.push(tem.category3);
//         });
//         console.log('전체 카테고리3 종류~!', cate3All);

//     } catch (error) {
//         console.log('^3^ getCate3 에러 ^3^ => ', error.message);
//     }

//     //cate3 종류가 100개... 
//     //재미 & 취미 위주의 카테고리만 남기기

// };
