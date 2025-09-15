// Utility: rapikan nama dari URL
function beautifySegment(seg) {
  if (!seg) return '';
  let s = decodeURIComponent(seg.replace(/\+/g,' '));
  s = s.replace(/[\-_.]+/g, ' ');
  s = s.replace(/&/g, ' & ');
  s = s.replace(/\s+/g,' ').trim();
  s = s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return s;
}

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);

  const guestName = beautifySegment(params.get("nama") || params.get("to"));
  const coupleName = beautifySegment(params.get("couple"));

  const coverGuest = document.getElementById('cover-guest');
  const coverCouple = document.getElementById('cover-couple');

  // Nama tamu
  if (guestName) {
    coverGuest.textContent = "Kepada Yth. " + guestName;
  } else {
    coverGuest.textContent = "Tamu Undangan";
  }

  // Nama pasangan
  if (coupleName) {
    coverCouple.textContent = coupleName;
    document.title = nama + " - Undangan";
  } else {
    coverCouple.textContent = "Fahri & Eka";
  }

  // Tombol buka undangan
  const openBtn = document.getElementById('openBtn');
  const cover = document.getElementById('cover');
  const content = document.getElementById('content');

  openBtn.addEventListener('click', function() {
    cover.style.display = 'none';
    content.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  openBtn.addEventListener('keyup', function(e){ if(e.key === 'Enter') openBtn.click(); });

  // Musik
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
});

