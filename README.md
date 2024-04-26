# PLOW - 문화행사

### PLOW : PLAY + GROW

> 사용자들이 다양한 활동을 통해 재미 뿐만 아니라 성장과 자기개발을 이뤄가도록 독려하는 컨셉의 웹사이트입니다.

### 문화행사
> 다양한 카테고리가 있다는 전제 하에, [문화행사] 카테고리의 페이지를 구현했습니다.

-----
#### 진행 기간 | 2024/04/18 ~
-----
### API
 서울시 문화행사정보 : [사이트이동](https://data.seoul.go.kr/dataList/OA-15486/S/1/datasetView.do)

    아이템 샘플
      {
        "CODENAME": "뮤지컬/오페라",
        "GUNAME": "종로구",
        "TITLE": "오페라 갈라",
        "DATE": "2024-12-07~2024-12-07",
        "PLACE": "세종대극장",
        "ORG_NAME": "세종문화회관",
        "USE_TRGT": "7세 이상 관람 가능(2017년생부터 관람 가능)",
        "USE_FEE": "SUITE석 140,000원 / VIP석 120,000원 / R석 100,000원 / S석 80,000원 / A석 50,000원 / B석 30,000원",
        "PLAYER": "",
        "PROGRAM": "\u003Chtml\u003E\u003Chead\u003E\u003C/head\u003E\u003Cbody spellcheck=",
        "ETC_DESC": "",
        "ORG_LINK": "https://www.sejongpac.or.kr/portal/performance/performance/view.do?menuNo=200004&performIdx=34877",
        "MAIN_IMG": "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=a6cb4e5a9b5b404e83454b084d88a399&thumb=Y",
        "RGSTDATE": "2024-01-26",
        "TICKET": "기관",
        "STRTDATE": "2024-12-07 00:00:00.0",
        "END_DATE": "2024-12-07 00:00:00.0",
        "THEMECODE": "기타",
        "LOT": "37.5726241",
        "LAT": "126.9760053",
        "IS_FREE": "유료",
        "HMPG_ADDR": "https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?cultcode=144976&menuNo=200008"
      },
----
### 주요기능

* 검색어 입력 검색
* 이번주 주말 가볼만한 행사 리스트 (토요일 기준)
* 날짜 입력 검색
* 분야별 필터링 버튼
* 페이지네이션
-----

### 주요이슈
1. CORS 에러
    * ___임시 해결: 'Allow CORS' 크롬 확장  프로그램을 설치___
    * 참고 블로그: https://inpa.tistory.com/entry/WEB-📚-CORS-💯-정리-해결-방법-👏 
    
2. 조건에 해당하는 리스트가 없을 때
    * 기존 처리 방법 :  dataList.length == 0 의 조건으로 처리
        ```
        function renderLists(dataList) {
            if (dataList.length == 0) {
                listsUl.innerHTML = `<li classList='noList'> 검색 결과가 없습니다 ㅠㅠ </li>`;
                return;
            }
        // 이하 생략 //
        }
        ```
    * 문제점 : 해당 API는 해당 리스트가 없을 경우 그냥 전체 리스트를 출력한다.. ( dataList.length 로 처리가 안 됨 )
    * ___해결 : 아직 못함___

-----

### 아직 개발중인 부분
1. javascript
    * pagination 기능
    * 검색바 검색 기능
    * 추천리스트 세로 슬라이드 애니메이션 무한루프 처리 
    * ham 버튼 작동
2. css
    * 추천리스트 title 스타일링
    * nav 스타일링