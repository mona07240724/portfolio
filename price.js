// ============================================
// ハンバーガーメニューの開閉
// ============================================

// getElementById（ゲット・エレメント・バイ・アイディー）= IDで要素を取得する
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// addEventListener（アド・イベント・リスナー）= クリックなどの操作を検知する
hamburger.addEventListener('click', () => {
  // classList.toggle（クラスリスト・トグル）= クラスを追加・削除を交互に切り替える
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// モバイルメニューのリンクをクリックしたら閉じる
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// ============================================
// フェードインアニメーション
// IntersectionObserver（インターセクション・オブザーバー）
// = 要素が画面内に入ったタイミングを検知する仕組み
// ============================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // isIntersecting（イズ・インターセクティング）= 画面内に入っているか（true/false）
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1 // threshold（スレッショルド）= 要素の10%が見えたら発火
});

// fade-inクラスがついた要素をすべて監視対象にする
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));