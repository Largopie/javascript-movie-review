# FE 레벨1 영화 리뷰

이 서비스는 인기 영화 정보를 조회할 수 있는 웹입니다. 영화 검색 기능을 제공하며, 더보기 버튼을 통해 추가적인 영화 정보를 조회할 수 있습니다.

## 📍 컴포넌트

### 📁 헤더

- 홈버튼
- 검색바

### 📁 메인

- 제목
- 영화 리스트

  - 영화 아이템

- 더보기

### 📁 common

- 스켈레톤
- 버튼

## 🎯 비동기 로직

- 초기 렌더링
- 더보기 버튼
- 검색

## 🚀 요구사항

### 🎬 영화 목록 조회(인기순)

- [x] 한 페이지는 20개의 영화 아이템으로 구성되어 있다.
- [x] 로딩 시 한 아이템 당 스켈레톤 UI를 보여준다.

### ➕ 더보기

- [x] 더보기 버튼을 누르면 다음 페이지의 영화 목록을 불러온다.
- [x] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.

### 🔎 검색

- [x] 검색 버튼을 클릭 또는 엔터 시 검색어에 해당하는 영화 목록을 불러온다.
- [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다.

### ⚠️ 오류

- [x] 오류가 발생하거나, 검색 정보가 없을 시 경우에는 에러 페이지를 보여준다.
- [x] 페이지 오류(500 페이지 초과)가 발생했을 때, 에러 토스트를 띄워준다.
