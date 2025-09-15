// ------------- Utility: beautify a segment to displayable text -------------
function beautifySegment(seg) {
  if (!seg) return '';
  // decode percent-encoding and plus-signs
  let s = decodeURIComponent(seg.replace(/\+/g,' '));
  // common separators: &  or - or _ or .
  s = s.replace(/%26/g,' & '); // just in case
  s = s.replace(/[\-_.]+/g, ' ');

  // if contains ampersand symbol, ensure spaced
  s = s.replace(/&/g, ' & ');
  // collapse multiple spaces
  s = s.replace(/\s+/g,' ').trim();

  // Capitalize each word
  s = s.split(' ').map(w=>{
    if (!w) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
  return s;
}

// ------------- Parse path like /novi&rahmat/Fahri or /novi-rahmat/Fahri -------------
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);

  const guestName = params.get("nama") || params.get("to"); 
  const coupleName = params.get("couple");

  // Ambil elemen di HTML
  const coverGuest = document.getElementById('cover-guest');
  const coverCouple = document.getElementById('cover-couple');

  // Set nama tamu
  if (guestName) {
    coverGuest.textContent = "Kepada Yth. " + decodeURIComponent(guestName);
  } else {
    coverGuest.textContent = "Tamu Undangan";
  }

  // Set nama pengantin kalau ada
  if (coupleName) {
    coverCouple.textContent = decodeURIComponent(coupleName);
    document.title = coupleName + " - Undangan";
  }
});

  // fallback: also check query param ?nama=Guest atau ?to=Guest
const params = new URLSearchParams(window.location.search);
if (!guestSeg && (params.get('nama') || params.get('to'))) {
  guestSeg = params.get('nama') || params.get('to');
}
if (!coupleSeg && params.get('couple')) {
  coupleSeg = params.get('couple');
}

  return { couple: beautifySegment(coupleSeg), guest: beautifySegment(guestSeg) };
}

// ------------- On load: fill cover text -------------
document.addEventListener('DOMContentLoaded', function() {
  const names = parsePathNames();

  const coverGuest = document.getElementById('cover-guest');
  const coverCouple = document.getElementById('cover-couple');

  if (names.guest && names.guest.length > 0) {
    coverGuest.textContent = names.guest;
  } else {
    coverGuest.textContent = 'Tamu Undangan';
  }

  if (names.couple && names.couple.length > 0) {
    coverCouple.textContent = names.couple;
    document.title = names.couple + ' - Undangan';
  } else {
    coverCouple.textContent = 'Fahri & Eka';
  }

  // Open button functionality
  const openBtn = document.getElementById('openBtn');
  const cover = document.getElementById('cover');
  const content = document.getElementById('content');

  openBtn.addEventListener('click', function() {
    cover.style.display = 'none';
    content.classList.remove('hidden');
    content.setAttribute('aria-hidden','false');
    // focus top of content for accessibility
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // try auto play music (if you add audio), many browsers block autoplay with sound.
    // If you add background audio, try to play muted or ask user to unmute.
  });

  // also allow open via Enter key when focused
  openBtn.addEventListener('keyup', function(e){ if(e.key === 'Enter') openBtn.click(); });
});
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🔇 Musik Off";
  } else {
    music.play();
    musicBtn.textContent = "🔊 Musik On";
  }
  isPlaying = !isPlaying;
});



