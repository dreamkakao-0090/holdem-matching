/* 백그라운드 푸시 알림 수신용 서비스 워커 — index.html 과 같은 폴더에 두세요 (수정할 필요 없음) */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// index.html 의 Firebase 설정을 등록 주소(?cfg=...)로 넘겨받음
const cfg = JSON.parse(new URL(self.location.href).searchParams.get("cfg") || "{}");
firebase.initializeApp(cfg);
firebase.messaging(); // notification 페이로드는 SDK가 자동으로 알림을 띄우고, 누르면 모임 페이지를 엶

// 앱이 열려 있을 때 앱이 직접 띄운 알림을 누르면 해당 모임 페이지로 이동
self.addEventListener("notificationclick", (e) => {
  const link = e.notification && e.notification.data && e.notification.data.link;
  if (!link) return;                       // FCM 이 띄운 알림은 SDK 가 처리
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ("focus" in c) { c.navigate(link); return c.focus(); } }
    return clients.openWindow(link);
  }));
});
