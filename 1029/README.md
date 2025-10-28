# 8장 요약: HTML DOM (Document Object Model)

## 학습 목표
- HTML DOM의 필요성과 구조를 이해한다.
- DOM 트리와 HTML 페이지의 관계를 익힌다.
- DOM 객체를 통해 HTML 태그의 출력, 콘텐츠, 스타일을 제어할 수 있다.
- `document` 객체와 `write()`, `createElement()` 등의 메서드를 활용할 수 있다.

---

## 1. HTML DOM 개요
- **DOM(Document Object Model)** 은 HTML 태그를 객체로 표현한 구조이다.
- 각 HTML 태그마다 하나의 DOM 객체가 생성되어 **트리 구조(DOM Tree)** 를 이룬다.
- DOM 객체는 **HTML 태그의 속성, 스타일, 콘텐츠** 를 제어할 수 있다.

### DOM 트리의 특징
1. 루트는 `document` 객체.
2. 각 HTML 태그는 하나의 DOM 객체를 가진다.
3. 태그의 포함관계에 따라 부모-자식 관계가 형성된다.
4. DOM 객체 변경 시 화면 출력이 즉시 갱신된다.

---

## 2. DOM 객체 구성 요소
| 구성 요소 | 설명 |
|------------|--------|
| **Property** | HTML 태그 속성 반영 |
| **Method** | DOM 객체를 제어하는 함수 |
| **Collection** | 자식 DOM 객체들을 배열 형태로 보관 |
| **Event Listener** | 이벤트 반응 코드 (예: onclick) |
| **CSS3 Style** | HTML 태그의 스타일 시트 정보 |

---

## 3. 주요 프로퍼티 및 메서드
- `document.getElementById(id)` : 특정 id의 DOM 객체 검색
- `document.getElementsByTagName(tag)` : 특정 태그 이름으로 객체 집합 검색
- `document.getElementsByClassName(class)` : 특정 class 이름으로 객체 집합 검색
- `element.innerHTML` : 태그 내 콘텐츠(HTML 포함) 읽기/수정
- `element.style.property` : CSS 스타일 동적 변경
- `document.write()` : HTML 문서에 내용 추가
- `document.createElement(tag)` : 새 DOM 객체 생성
- `parent.appendChild(child)` : 부모 객체에 새 요소 추가
- `parent.removeChild(child)` : 자식 요소 삭제

---

## 4. this 키워드
- `this` : 이벤트가 발생한 **자기 자신(DOM 객체)** 을 가리킴.
- 예: `<button onclick="this.style.color='red'">버튼</button>`

---

## 5. document 객체
- HTML 문서 전체를 대표하는 최상위 객체.
- DOM 트리의 루트로서, 모든 HTML 요소에 접근 가능.
- 주요 프로퍼티:  
  - `document.URL`, `document.title`, `document.domain`, `document.lastModified` 등

---

## 6. document.write(), writeln()
- HTML 문서 로딩 중일 때 콘텐츠 추가에 사용.
- `writeln()` 은 줄바꿈(
) 포함 출력.
- 로딩 완료 후 실행하면 기존 문서를 덮어쓰기 때문에 **주의 필요**.

---

## 7. document.open(), close()
- `document.open()` : 현재 문서를 초기화 후 새 HTML 작성 시작.
- `document.close()` : 문서 작성을 마침.

---

## 8. DOM 동적 구성
- **요소 추가**
  ```js
  let div = document.createElement("div");
  div.innerHTML = "새 DIV";
  parent.appendChild(div);
  ```
- **요소 삭제**
  ```js
  parent.removeChild(div);
  ```

---

## 핵심 요약
- DOM은 HTML과 자바스크립트의 연결 고리이다.
- 모든 HTML 요소는 객체로 표현되며 JS로 접근/제어 가능.
- `document` 객체는 DOM 트리의 시작점이다.
- `innerHTML`, `style`, `createElement()` 등을 활용해 동적 웹 페이지를 구현할 수 있다.

---

### 참고 키워드
`DOM`, `document`, `innerHTML`, `getElementById`, `createElement`, `appendChild`, `removeChild`, `this`, `CSS3 style`

---

© 명품 웹 프로그래밍 - 8장: HTML DOM 요약
