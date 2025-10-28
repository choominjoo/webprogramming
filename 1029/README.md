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

**Q1.** `innerHTML`과 `textContent`의 차이는 무엇이며, 언제 각각 사용하는 게 좋을까? 

**Q2.** `document.write()`를 잘못 사용할 경우 어떤 문제가 발생할까?

**Q3.** DOM 트리 조작 시 효율성과 안정성을 높이기 위한 방법은 무엇일까?
