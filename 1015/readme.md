# 📘 명품 웹 프로그래밍 — Chapter 7 요약 (JavaScript 객체)

## 📌 학습 목표
- 객체의 기본 개념 이해
- 코어 객체(Array, Date, String, Math) 사용
- 자바스크립트 배열 생성 및 활용
- 사용자 객체 직접 생성 방법 이해
- 프로토타입 기반 객체 생성 방식 이해

---

## 🧩 객체 기본 개념
| 개념 | 설명 |
|------|------|
| 객체 | 속성(프로퍼티) + 동작(메소드)으로 구성된 데이터 단위 |
| 프로퍼티 | 객체의 상태, 변수 역할 |
| 메소드 | 기능, 함수 역할 |

📌 예시  
자동차 = { 색상, 배기량, 제조사 … }  
사람 = { 이름, 나이, 주소 … }

---

## ⚙ 자바스크립트 객체의 종류
| 종류 | 특징 |
|------|------|
| **코어 객체** | JS 어디서든 사용 가능 (Array, Date, String, Math 등) |
| **HTML DOM 객체** | HTML 요소를 객체화하여 문서 구조 제어 |
| **브라우저 객체 (BOM)** | 브라우저 제어 목적 (window, location 등) |

---

## 🗂 코어 객체 요약

### ✔ Array 객체 (배열)
- 여러 데이터를 연속적으로 저장하는 구조
- 생성 방법
```js
let arr = [1, 2, 3];
let arr2 = new Array(1, 2, 3);
주요 특징	설명
동적 크기	원소 추가 시 자동 확장
length 속성	배열 크기 확인 및 임의 조정 가능
다양한 타입 저장 가능	숫자 / 문자열 / 객체 / 함수 혼합 저장 가능

📌 주요 메소드: concat, join, reverse, slice, sort, toString

✔ Date 객체 (날짜/시간)
js
코드 복사
let now = new Date();          // 현재 시간
let d = new Date(2023, 7, 15); // 2023년 8월 15일
주요 메소드	설명
getFullYear()	년도
getMonth() + 1	월
getDate()	일
getHours()	시
getMinutes()	분
getSeconds()	초

활용 예시: 방문 시간 짝수/홀수에 따라 배경색 변경

✔ String 객체 (문자열)
불변 객체 → 문자열 변경 시 새로운 문자열 생성

배열처럼 문자에 접근 가능 (예: "Hello"[0] → 'H')

주요 메소드: charAt, concat, indexOf, slice, substr, toUpperCase, replace, trim, split

✔ Math 객체 (수학 계산)
객체 생성 없이 사용

js
코드 복사
Math.sqrt(), Math.PI, Math.random(), Math.floor()
📌 랜덤 정수 예

js
코드 복사
Math.floor(Math.random() * 100);
🧱 사용자 객체 생성 방법
방법	설명	예
new Object()	빈 객체 생성 후 프로퍼티/메소드 추가	let obj = new Object()
리터럴 표기법	중괄호로 객체 정의	{name:"A", age:20}
프로토타입(생성자 함수)	붕어빵 찍어내는 틀처럼 객체 생성	function Account(){...}

방법별 예시
🟦 new Object()

js
코드 복사
let account = new Object();
account.owner = "황기태";
account.deposit = function(money){ this.balance += money; };
🟩 리터럴 표기법

js
코드 복사
let account = {
  owner:"황기태",
  deposit:function(money){ this.balance += money; }
};
🟥 프로토타입 기반 (생성자 함수)

js
코드 복사
function Account(owner, code, balance) {
  this.owner = owner;
  this.balance = balance;
  this.deposit = function(money){ this.balance += money; };
}
let acc = new Account("황기태", "111", 35000);
