
  /* ── Particles ── */
  const colors = ['rgba(124,58,237,.7)','rgba(6,182,212,.7)','rgba(245,158,11,.6)','rgba(255,255,255,.4)'];
  const pContainer = document.getElementById('particles');
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${1+Math.random()*3}px;
      height:${1+Math.random()*3}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${6+Math.random()*14}s;
      animation-delay:${-Math.random()*14}s;
    `;
    pContainer.appendChild(p);
  }

  /* ── Math question generator ── */
  const questions = [
   
    { q: '∫₀² 2x dx',        ans: 4  },
    { q: '∫₀³ 3x² dx',       ans: 27 },
    { q: '∫₀² 4x³ dx',       ans: 16 },
    { q: '∫₁² 2x dx',        ans: 3  },
    { q: '∫₀¹ 5x⁴ dx',       ans: 1  },
    { q: '∫₀² 6x dx',        ans: 12 },
    { q: '∫₀³ 2x dx',        ans: 9  },
    { q: '∫₁³ 2x dx',        ans: 8  },
    { q: '∫₀² 3x² dx',       ans: 8  },
    { q: '∫₀¹ 4x³ dx',       ans: 1  },
    { q: '∫₀² x dx',         ans: 2  },
    { q: '∫₀³ x² dx',        ans: 9  },
    { q: '∫₀² 8x dx',        ans: 16 },
    { q: '∫₁² 6x² dx',       ans: 14 },
    { q: '∫₀² 5x dx',        ans: 10 },
  ];

  let correctAnswer;
  function generateQuestion() {
    const pick = questions[Math.floor(Math.random()*questions.length)];
    document.getElementById('mathQuestion').textContent = pick.q;
    correctAnswer = pick.ans;
  }
  generateQuestion();

  /* ── Login handler ── */
  function handleLogin() {
    const name   = document.getElementById('nameInput').value.trim();
    const pass   = document.getElementById('passInput').value.trim();
    const ans    = parseFloat(document.getElementById('mathAnswer').value);
    const errEl  = document.getElementById('errorMsg');

    // Reset error
    errEl.classList.remove('show');

    if (!name) {
      showFieldError('nameInput', 'Please enter your name.');
      return;
    }
    if (!pass) {
      showFieldError('passInput', 'Please enter your password.');
      return;
    }
    if (isNaN(ans) || ans !== correctAnswer) {
      errEl.textContent = isNaN(ans)
        ? '⚠ Please enter your integration answer.'
        : `✗ Incorrect! The answer was ${correctAnswer}. A new question awaits.`;
      errEl.classList.add('show');
      // Regenerate after wrong answer
      if (!isNaN(ans)) {
        setTimeout(generateQuestion, 1200);
        document.getElementById('mathAnswer').value = '';
      }
      return;
    }

    // ✅ Success
    launchConfetti();
    setTimeout(() => {
      document.getElementById('login-page').style.display = 'none';
      const ss = document.getElementById('success-screen');
      ss.classList.add('active');
    }, 400);
  }

  function showFieldError(id, msg) {
    const input = document.getElementById(id);
    input.style.borderColor = 'var(--error)';
    input.style.boxShadow = '0 0 0 3px rgba(244,63,94,.15)';
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }, 1800);
    const errEl = document.getElementById('errorMsg');
    errEl.textContent = '⚠ ' + msg;
    errEl.classList.add('show');
    input.focus();
  }

  /* ── Confetti ── */
  function launchConfetti() {
    const palette = ['#7c3aed','#06b6d4','#f59e0b','#10b981','#f43f5e','#fff'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.cssText = `
          left:${Math.random()*100}vw;
          background:${palette[Math.floor(Math.random()*palette.length)]};
          width:${6+Math.random()*8}px;
          height:${10+Math.random()*14}px;
          border-radius:${Math.random()>0.5?'50%':'2px'};
          animation-duration:${2+Math.random()*2.5}s;
          animation-delay:0s;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
      }, i * 22);
    }
  }

  /* ── Explore button ── */
  function explore() {
    alert('🚀 Redirecting you to the future… (connect your router here!)');
  }

  /* ── Enter key support ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
