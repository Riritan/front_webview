# 웹뷰 실행하는 방법

1. 리액트 프로젝트를 시작한다. (npm start)
2. ngrok을 다운받은 후 터미널에서 ngrok http http://localhost:3001 로 배포를 시작한다.
3. 터미널에 뜨는 링크 (ex) https://0343-203-241-183-7.ngrok-free.app)를 복사하여 app 폴더의 index.tsx에서 WebView 컴포넌트의 source={{ uri: '' }}에 붙여넣기 한다.
4. npm start로 실행한 후 expo 앱으로 실행한다.