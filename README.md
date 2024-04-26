# PLOW - 문화행사

### PLOW : PLAY + GROW

> 사용자들이 다양한 활동을 통해 재미 뿐만 아니라 성장과 자기개발을 이뤄가도록 독려하는 컨셉의 웹사이트입니다.

### 문화행사
> 다양한 활동 중 '문화행사'에 대한 정보를 제공하는 페이지를 구현했습니다.

-----
## 주요기능
> 

## 주요이슈
* CORS 에러
    * 임시 해결: 'Allow CORS' 크롬 확장 프로그램을 설치
    * 참고 블로그: https://inpa.tistory.com/entry/WEB-📚-CORS-💯-정리-해결-방법-👏 

* 조건에 해당하는 리스트가 없을 때
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
    * 문제점 : 해당 API는 해당 리스트가 없을 경우 그냥 전체 리스트를 출력한다..
    * 해결 : 못함

### 아직 개발중인 부분
* javascript
    * pagination 기능
    * 검색바 검색 기능
    * 추천리스트 세로 슬라이드 애니메이션 무한루프 처리 
* css
    * 추천리스트 title 스타일링