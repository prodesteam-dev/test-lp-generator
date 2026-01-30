/* assets/main.js */

// ハンバーガーメニューの開閉
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.header__hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // スムーススクロール
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // モバイルメニューが開いていたら閉じる
        if (navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', false);
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // Intersection Observerによるスクロールアニメーション
  const faders = document.querySelectorAll('.fade-in');
  const sliders = document.querySelectorAll('.slide-up');

  const appearOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
  sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  });

  // フォームバリデーション
  const form = document.getElementById('contact-form');
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const nameError = form.querySelector('#name-error');
  const emailError = form.querySelector('#email-error');

  function validateEmail(email) {
    // 簡易メールアドレスチェック
    const re = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', function (e) {
    let valid = true;

    // 名前チェック
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'お名前を入力してください。';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // メールチェック
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'メールアドレスを入力してください。';
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = '有効なメールアドレスを入力してください。';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    if (!valid) {
      e.preventDefault();
    }
  });
});
