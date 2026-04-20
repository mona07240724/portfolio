// ============================================
// ハンバーガーメニューの開閉
// ============================================

// getElementById（ゲット・エレメント・バイ・アイディー）
// = HTML内のid属性を指定して、その要素を取得する関数
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('header');

// addEventListener（アド・イベント・リスナー）
// = イベント（click = クリックなど）が起きた時に実行する処理を登録する関数
hamburger.addEventListener('click', () => {

  // classList.toggle（クラスリスト・トグル）
  // = 指定したクラスがあれば削除、なければ追加する（ON/OFF切り替え）
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');

  // メニューが開いている時はページのスクロールを無効にする
  // classList.contains（コンテインズ） = 指定したクラスがあるかどうか（true/false）
  if (mobileMenu.classList.contains('active')) {
    // overflow: hidden = スクロールを禁止
    document.body.style.overflow = 'hidden';
  } else {
    // overflow: '' = スクロールを元に戻す（空文字でリセット）
    document.body.style.overflow = '';
  }
});

// ============================================
// モバイルメニュー内のリンクをクリックしたらメニューを閉じる
// ============================================

// querySelectorAll（クエリ・セレクタ・オール）
// = CSSセレクタに一致するすべての要素を取得する（配列のようなリストで返る）
const mobileLinks = document.querySelectorAll('.mobile-menu a');

// forEach（フォー・イーチ）= リストの各要素に対して、1つずつ処理を実行する
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    // classList.remove（リムーブ）= 指定したクラスを削除する
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ============================================
// スクロール時のヘッダー背景変更
// ============================================

// window（ウィンドウ）= ブラウザの画面全体を指すオブジェクト
// scroll（スクロール）イベント = ページをスクロールするたびに発生する
window.addEventListener('scroll', () => {

  // window.scrollY（スクロール・ワイ）= 現在の縦スクロール位置（px単位の数値）
  if (window.scrollY > 50) {
    // 50px以上スクロールしたら 'scrolled' クラスを追加（背景をつける）
    header.classList.add('scrolled');
  } else {
    // 50px未満なら 'scrolled' クラスを削除（背景を消す）
    header.classList.remove('scrolled');
  }
});

// ============================================
// スクロールアニメーション（要素が画面に入ったらふわっと表示）
// ============================================

// .fade-in クラスを持つすべての要素を取得
const fadeElements = document.querySelectorAll('.fade-in');

// IntersectionObserver（インターセクション・オブザーバー）
// = 要素が画面内（ビューポート）に入ったかどうかを監視するAPI
// entries = 監視対象の要素の配列
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    // isIntersecting（イズ・インターセクティング）
    // = 要素が画面内に入ったかどうか（true = 入った / false = まだ）
    if (entry.isIntersecting) {
      // 'visible' クラスを追加 → CSSのアニメーションが発動
      entry.target.classList.add('visible');

      // unobserve（アンオブザーブ）= この要素の監視を解除
      // 一度表示されたら、もう監視しなくてOK（パフォーマンス向上のため）
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,    // threshold（スレッショルド） = 要素の10%が見えたら発火
  rootMargin: '0px 0px -40px 0px' // rootMargin = 発火タイミングを40px下にずらす
});

// 各要素を監視対象に登録
// observe（オブザーブ） = 監視を開始する
fadeElements.forEach(el => observer.observe(el));
