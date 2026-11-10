// Red-flag demo: a simple keyword check (not a trained model)
const RISKY = /\b(bvn|otp|pin|password|verify|click|link|urgent|blocked?|suspend(?:ed)?|claim|prize|winner|congrat\w*|upgrade|free|abeg send|send money|transfer|dear customer|don block|go suspend)\b/gi;
const box = document.getElementById('sms');
const out = document.getElementById('out');
const verdict = document.getElementById('verdict');

function scan(first) {
  const text = box.value;
  out.textContent = '';
  let n = 0, last = 0, m;
  RISKY.lastIndex = 0;
  while ((m = RISKY.exec(text))) {
    out.append(text.slice(last, m.index));
    const mark = document.createElement('mark');
    mark.textContent = m[0];
    if (first) { // flags light up one by one on load
      mark.className = 'pre';
      setTimeout(() => mark.classList.remove('pre'), 900 + n * 350);
    }
    out.append(mark);
    last = m.index + m[0].length;
    n++;
  }
  out.append(text.slice(last));
  if (!text.trim()) verdict.textContent = 'Type or paste a message above.';
  else if (n === 0) verdict.textContent = 'No red flags found. Still check who sent it.';
  else verdict.textContent = n + (n === 1 ? ' red flag' : ' red flags') + ' found. Do not click or reply until you confirm the sender.';
}

if (box) {
  box.addEventListener('input', () => scan(false));
  scan(true);
}

// Screenshots wipe in as they scroll into view
const wipes = document.querySelectorAll('.wipe');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.25 });
  wipes.forEach((w) => io.observe(w));
} else {
  wipes.forEach((w) => w.classList.add('in'));
}

// Lagos clock in the footer
const clock = document.getElementById('clock');
if (clock) {
  const tick = () => {
    clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date());
  };
  tick();
  setInterval(tick, 30000);
}

// Glow follows the cursor on project cards
document.querySelectorAll('.proj').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', (e.clientX - r.left) + 'px');
    card.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });
});

// Header gets a shadow once you scroll
const head = document.querySelector('header');
window.addEventListener('scroll', () => head.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
