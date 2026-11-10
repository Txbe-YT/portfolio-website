// Red-flag demo: a simple keyword check (not the real SafeText NG model)
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
    if (first) { // one staggered reveal on page load
      mark.className = 'pre';
      setTimeout(() => mark.classList.remove('pre'), 500 + n * 350);
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

// Lagos clock in the footer
const clock = document.getElementById('clock');
if (clock) {
  const tick = () => {
    clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date());
  };
  tick();
  setInterval(tick, 30000);
}
