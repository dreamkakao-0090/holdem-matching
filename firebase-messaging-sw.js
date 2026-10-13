/* 백그라운드 푸시 알림 수신용 서비스 워커 — index.html 과 같은 폴더에 두세요 (수정할 필요 없음) */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// index.html 의 Firebase 설정을 등록 주소(?cfg=...)로 넘겨받음
const cfg = JSON.parse(new URL(self.location.href).searchParams.get("cfg") || "{}");
firebase.initializeApp(cfg);
firebase.messaging(); // notification 페이로드는 SDK가 자동으로 알림을 띄우고, 누르면 모임 페이지를 엶
