// ============================================
// ハンバーガーメニューの開閉
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ============================================
// スクロールアニメーション
// ============================================
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ============================================
// 送信完了メッセージの表示
// Formspreeは送信後にURLに ?thanks が付く
// それを検知してフォームを隠し、完了メッセージを表示する
// ============================================

// URLSearchParams（ユーアールエル・サーチ・パラムズ）
// = URLの ? 以降のパラメータを取得するAPI
// 例：contact.html?thanks → "thanks" を検知できる
const params = new URLSearchParams(window.location.search);

// URLに "thanks" が含まれていたら送信完了とみなす
if (params.has('thanks')) {
  // フォームエリアを非表示にする
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    contactSection.style.display = 'none';
  }

  // 完了メッセージを表示する
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.classList.add('visible');
  }
}
