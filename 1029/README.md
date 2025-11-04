# 📘 명품 웹 프로그래밍 8장 요약  
**HTML DOM(Document Object Model)**

---

## 🎯 학습 목표  
- HTML DOM의 필요성과 구조 이해  
- DOM 트리와 HTML 태그의 관계 파악  
- DOM 객체의 구성 요소(프로퍼티, 메서드, 컬렉션 등) 이해  
- DOM을 이용해 HTML 콘텐츠와 스타일 제어  
- `document` 객체의 역할과 활용법 습득  
- `createElement()`, `appendChild()` 등을 이용한 DOM 동적 조작  

---

## 🧱 HTML DOM의 개념  
- **DOM(Document Object Model)**:  
  브라우저가 HTML 문서를 해석해 **태그마다 객체를 생성**한 구조.  
- **목적**  
  - HTML 태그의 **출력 모양**과 **콘텐츠**를 제어  
  - CSS 스타일 시트를 동적으로 변경  
  - 텍스트, 이미지 등의 내용을 수정  

---

## 🌳 DOM 트리 구조  
- HTML 문서의 포함 관계에 따라 **트리(tree)** 형태로 구성됨  
- 각 HTML 태그마다 **DOM 객체(Node)** 하나씩 생성  
- **루트 객체**는 `document`  
- DOM 변경 시 브라우저는 즉시 해당 HTML 출력 갱신  

---

## 📄 예시 구조
```html
<html>
  <head><title>HTML DOM 트리</title></head>
  <body>
    <p>이것은 <span>문장입니다.</span></p>
    <form>
      <input type="text">
      <input type="button" value="테스트">
    </form>
  </body>
</html>
```
→ DOM 트리 관계
`document` → `html` → (`head`, `body`) → (`p`, `form`) → (`span`, `input`, `input`)

---

## 🧩 DOM 객체의 구성 요소
| 구성 요소 | 설명 |
|-----------|------|
| property | 태그 속성(attribute)을 반영 |
| method | DOM 조작용 함수 |
| collection | 자식 노드들의 집합 (배열 형태) |
| event listener | 이벤트 발생 시 실행되는 함수 |
| CSS3 style | 태그의 스타일 정보를 제어 |

```js
let p = document.getElementById("firstP");
p.style.color = "red";       // 글자 색 변경
p.innerHTML = "새 텍스트";  // 콘텐츠 변경

```
---

## 🔍 DOM 탐색 관계
| 관계 | 예시 속성 |
|------|-----------|
| 부모 노드 | `parentElement` |
| 첫 자식 | `firstElementChild` |
| 마지막 자식 | `lastElementChild` |
| 형제 노드 | `nextElementSibling`, `previousElementSibling` |
| 자식 수 | `childElementCount` |

---

## 🎨 CSS 스타일 동적 변경
```html
<span id="mySpan" style="color:red">문장입니다.</span>
<script>
let span = document.getElementById("mySpan");
span.style.color = "green";
span.style.fontSize = "30px";
span.style.border = "3px dotted magenta";
</script>
```

---

## 🧾 innerHTML 프로퍼티
- 태그의 내부 콘텐츠를 읽거나 변경
```js
let p = document.getElementById("firstP");
p.innerHTML = "나의 <img src='puppy.png'> 강아지";
```
-> 실행 시 `<p>` 내부 HTML이 교체됨

---

## 🧠 this 키워드
- 객체 자신을 가리킴
```html
<button onclick="this.style.color='red'">버튼</button>
<div onclick="this.style.backgroundColor='orange'">DIV</div>
```

---

## 📘 document 객체
- HTML 문서 전체를 대표하는 객체
- DOM 트리의 **루트(root)** 역할
- 접근 방법: `window.document` 또는 `document`

| 주요 프로퍼티 | 설명 |
|---------------|------|
| `location` | 문서 URL |
| `title` | 문서 제목 |
| `head`, `body` | 주요 노드 접근 |
| `domain` | 현재 도메인 |
| `lastModified` | 마지막 수정 날짜 |
| `readyState` | 문서 로드 상태 |
| `activeElement` | 현재 포커스된 요소 |

---

## 🔎 DOM 객체 찾기
| 메서드 | 설명 |
|--------|------|
| `getElementById(id)` | 특정 ID의 요소 찾기 |
| `getElementsByTagName(name)` | 같은 태그 이름의 모든 요소 찾기 |
| `getElementsByClassName(name)` | 같은 class 속성을 가진 모든 요소 찾기 |

### 예시: getElementsByTagName()
```js
let spanArray = document.getElementsByTagName("span");
for(let i=0; i<spanArray.length; i++) {
  spanArray[i].style.color = "orchid";
}
```

### 예시: getElementsByClassName()
```js
let foodList = document.getElementsByClassName("food");
for(let tag of foodList) tag.style.color = "darkcyan";
```

---

## 🧾 document.write() / writeln()
- 문서에 HTML 코드를 동적으로 출력

```js
document.write("<h3>Welcome!</h3>");
document.write(2 + 3); // 숫자 계산 가능
document.writeln("줄바꿈 포함 출력");
```

⚠️ 주의:
`document.write()`는 문서가 완성된 후 실행하면 **기존 내용이 모두 삭제됨**

---

## 📄 document.open() / close()
- `open()` : 현재 문서 내용을 초기화하고 새로 작성 시작
- `close()` : 문서 작성 완료

```js
document.open();
document.write("<h1>Hello!</h1>");
document.close();
```

---

## 🧱 DOM 객체의 동적 생성
| 기능 | 메서드 | 설명 |
|------|--------|------|
| DOM 생성 | `createElement("태그명")` | 새 HTML 요소 생성 |
| DOM 삽입 | `appendChild(obj)` | 자식으로 추가 |
| DOM 삭제 | `removeChild(obj)` |  특정 자식 제거 |

```js
let newDiv = document.createElement("div");
newDiv.innerHTML = "새 DIV입니다.";
newDiv.style.backgroundColor = "yellow";
document.body.appendChild(newDiv);
```

---

## 🧠 핵심 정리
- HTML의 각 태그는 **DOM 객체**로 표현되어 제어 가능
- DOM 트리는 **document** 객체를 루트로 구성
- `innerHTML`, `style`, `this` 등을 통해 동적 콘텐츠 제어 가능
- `createElement()` / `appendChild()`로 **새 요소를 추가**하고, `removeChild()`로 **요소를 삭제** 가능

---

# 📘 명품 웹 프로그래밍 9장 요약  
**이벤트(Event)와 이벤트 리스너(Event Listener)**

---

## 🎯 학습 목표
- 이벤트의 개념과 발생 시점을 이해한다.  
- 자바스크립트 코드로 이벤트 리스너를 작성할 수 있다.  
- 이벤트의 흐름(capturing, bubbling)을 이해한다.  
- `onload`를 이용한 문서 및 이미지 로딩 이벤트를 제어한다.  
- 폼, 마우스, 키보드 관련 이벤트를 처리한다.

---

## 🧠 이벤트(Event)의 개념
- **이벤트**: 사용자의 입력(클릭, 키보드 입력 등)이나 문서/브라우저의 상태 변화를 알리는 신호  
- **이벤트 리스너(Event Listener)**: 발생한 이벤트에 반응하여 실행되는 자바스크립트 코드  
- **이벤트 이름 규칙**: 이벤트명 앞에 `on`을 붙임  
  - 예: `onmousedown`, `onkeydown`, `onload`, `onclick`  

---

## 🖱️ 주요 이벤트 종류
| 이벤트 | 설명 |
|--------|------|
| `click` | 마우스 클릭 |
| `dblclick` | 더블 클릭 |
| `keydown` / `keyup` | 키 누름 / 뗌 |
| `load` | 문서나 이미지 로딩 완료 |
| `resize` | 창 크기 변경 |
| `submit` / `reset` | 폼 제출 / 초기화 |
| `change` | 입력값 변경 시 |

---

## 🧩 이벤트 리스너 작성 방법 (3가지)
1. **HTML 태그 내 작성**
```html
<p onmouseover="this.style.backgroundColor='orchid'" 
onmouseout="this.style.backgroundColor='white'">
마우스를 올리면 배경색이 변합니다.
</p>
```

2. **DOM 객체의 리스너 프로퍼티 이용**
```js
let p = document.getElementById("p");
p.onmouseover = function() { p.style.backgroundColor = "orchid"; };
p.onmouseout = function() { p.style.backgroundColor = "white"; };
```

3. **`addEventListener()` 메서드 이용**
```js
p.addEventListener("mouseover", over);
p.addEventListener("mouseout", out);
```

✅ addEventListener()의 장점
- 여러 리스너 등록 가능
- 캡처/버블 단계 지정 가능

---

## 🧠 익명 함수(Anonymous Function)
```js
p.addEventListener("mouseover", function() {
  this.style.backgroundColor = "orchid";
});
```
- 이름이 없는 함수로, 간단한 동작을 바로 정의할 때 사용

---

## ⚙️ 이벤트 객체(Event Object)
- 발생한 이벤트 정보를 담은 객체
- 리스너의 첫 번째 매개변수로 자동 전달

```js
function f(e) {
  alert(e.type); // 이벤트 종류 출력
}
```

| 주요 프로퍼티 | 설명 |
|---------------|------|
| `type` | 이벤트 종류 |
| `target` | 이벤트가 발생한 DOM 객체 |
| `currentTarget` | 현재 이벤트를 처리 중인 객체 |
| `defaultPrevented` | 디폴트 행동 취소 여부 |

---

## 🚫 디폴트 행동 취소
- 특정 이벤트의 기본 동작을 막을 수 있음

```html
<a href="http://www.naver.com" onclick="return false">이동 안됨</a>
<a href="http://www.naver.com" onclick="event.preventDefault()">이동 안됨</a>
```

또는

```js
function noAction(e) {
  e.preventDefault(); // 디폴트 행동 취소
}
```

---

## 🔁 이벤트 흐름(Event Flow)
- 이벤트는 `window -> target -> window` 순으로 흐름
  - `Capturing Phase` : 상위 객체에서 타깃으로 전달
  - `Bubbling Phase` : 타깃에서 다시 상위로 전달

```js
element.addEventListener("click", handler, true);  // 캡처 리스너
element.addEventListener("click", handler, false); // 버블 리스너
```

- **이벤트 중단** : `event.stopPropagation()` 사용

---

## 🖱️ 마우스 이벤트
| 이벤트 | 설명 |
|--------|------|
| `onclick` | 클릭 시 |
| `ondblclick` | 더블 클릭 시 |
| `onmousedown` / `onmouseup` | 눌렀을 때 / 뗐을 때 |
| `onmouseover` / `onmouseout` | 영역 진입 / 벗어남 |
| `onwheel` | 마우스 휠 동작 시 |
| `oncontextmenu` | 오른쪽 클릭 시 (컨텍스트 메뉴 차단 기능) |

```js
document.oncontextmenu = function() {
  alert("오른쪽 클릭 금지");
  return false;
};
```

---

## 📸 onload (문서/이미지 로딩 완료)
1. **문서 로딩 완료 시 실행**
```html
<body onload="alert('페이지 로딩 완료!')">
```

2. **이미지 로딩 완료 시 실행**
```js
let img = document.getElementById("myImg");
img.onload = function() {
  alert("이미지 로드 완료: " + img.width + "x" + img.height);
};
img.src = "banana.png";
```

3. **new Image()를 이용한 사전 로딩**
```js
let preload = new Image();
preload.src = "apple.png";
```

---

## 🔡 포커스 관련 이벤트
| 이벤트 | 설명 |
|--------|------|
| `onfocus` | 포커스를 얻을 때 |
| `onblur` | 포커스를 잃을 때 |

```js
function checkFilled(obj) {
  if (obj.value === "") obj.focus();
}
```

## 🔘 폼(Form) 관련 이벤트
| 이벤트 | 설명 |
|--------|------|
| `onchange` | 선택값 변경 시 |
| `onsubmit` | 폼 전송 시 |
| `onreset` | 폼 초기화 시 |

**✅ 라디오 버튼 / 체크박스 예시**
```js
let items = document.getElementsByName("city");
for (let i of items) if (i.checked) alert(i.value);
```

**✅ 체크박스 합계 계산**
```js
function calc(cBox) {
  if(cBox.checked) sum += parseInt(cBox.value);
  else sum -= parseInt(cBox.value);
}
```

---

## ⌨️ 키보드 이벤트
| 이벤트 | 설명 |
|--------|------|
| `onkeydown` | 키 눌림 |
| `onkeypress` | 문자 입력 시 호출 |
| `onkeyup` | 키 뗌 |

```js
function whatKeyDown(e) {
  console.log(e.key, e.code);
}
```

**응용** : 방향키로 테이블 셀 이

```js
switch(e.key) {
  case "ArrowUp": index -= 3; break;
  case "ArrowDown": index += 3; break;
  case "ArrowLeft": index--; break;
  case "ArrowRight": index++; break;
}
```

---

## 🧭 핵심 정리
- 이벤트는 사용자와 브라우저 간 상호작용의 중심 요소
- 이벤트 리스너는 세 가지 방법으로 등록 가능
- 이벤트 객체는 이벤트 정보(e.g., type, target)를 담고 있음
- 디폴트 행동 취소와 이벤트 흐름 제어 가능
- 다양한 입력 장치(마우스, 키보드, 폼) 이벤트 제어 가능
