// ============================================
// ハンバーガーメニューの開閉
// ============================================

// getElementById（ゲット・エレメント・バイ・アイディー）
// = HTML内のid属性を指定して、その要素を取得する関数
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// addEventListener（アド・イベント・リスナー）
// = イベント（click = クリックなど）が起きた時に実行する処理を登録する関数
hamburger.addEventListener('click', () => {

  // classList.toggle（クラスリスト・トグル）
  // = 指定したクラスがあれば削除、なければ追加する（ON/OFF切り替え）
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');

  // メニューが開いている時はページのスクロールを無効にする
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden'; // overflow: hidden = スクロールを禁止
  } else {
    document.body.style.overflow = ''; // 空文字でリセット（スクロールを元に戻す）
  }
});

// ============================================
// モバイルメニュー内のリンクをクリックしたらメニューを閉じる
// ============================================

// querySelectorAll（クエリ・セレクタ・オール）
// = CSSセレクタに一致するすべての要素を取得する
const mobileLinks = document.querySelectorAll('.mobile-menu a');

// forEach（フォー・イーチ）= リストの各要素に対して1つずつ処理を実行する
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active'); // classList.remove（リムーブ）= クラスを削除
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ============================================
// スクロールアニメーション（要素が画面に入ったらふわっと表示）
// ============================================

// .fade-in クラスを持つすべての要素を取得
const fadeElements = document.querySelectorAll('.fade-in');

// IntersectionObserver（インターセクション・オブザーバー）
// = 要素が画面内（ビューポート）に入ったかどうかを監視するAPI
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    // isIntersecting（イズ・インターセクティング）
    // = 要素が画面内に入ったかどうか（true = 入った）
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // 'visible'クラスを追加 → CSSのアニメーション発動
      observer.unobserve(entry.target);      // unobserve（アンオブザーブ）= この要素の監視を解除
    }
  });
}, {
  threshold: 0.1,              // threshold（スレッショルド）= 要素の10%が見えたら発火
  rootMargin: '0px 0px -40px 0px' // 発火タイミングを40px下にずらす
});

// 各要素を監視対象に登録
// observe（オブザーブ）= 監視を開始する
fadeElements.forEach(el => observer.observe(el));
