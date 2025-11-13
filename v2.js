/* ========== GALAXY CANVAS (BLUE STARS) - compatible iOS/Android/Desktop ========== */
    (function(){
      const canvas = document.getElementById('galaxy-bg');
      const ctx = canvas.getContext('2d');
      let W = window.innerWidth, H = window.innerHeight;
      const stars = [];
      function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
      window.addEventListener('resize', resize, {passive:true});
      resize();

      // create stars
      const STAR_COUNT = Math.max(120, Math.floor((W*H)/8000)); // scale with screen
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          tw: Math.random() * Math.PI * 2
        });
      }

      function draw() {
        ctx.clearRect(0,0,W,H);
        // subtle deep-blue gradient behind stars
        const g = ctx.createLinearGradient(0,0,0,H);
        g.addColorStop(0,'#00142a');
        g.addColorStop(1,'#000814');
        ctx.fillStyle = g;
        ctx.fillRect(0,0,W,H);

        for (let s of stars) {
          s.x += s.vx;
          s.y += s.vy;
          s.tw += 0.02;
          // wrap
          if (s.x < 0) s.x = W;
          if (s.x > W) s.x = 0;
          if (s.y < 0) s.y = H;
          if (s.y > H) s.y = 0;

          const alpha = 0.5 + Math.sin(s.tw) * 0.5;
          ctx.beginPath();
          ctx.fillStyle = 'rgba(180,220,255,' + alpha.toFixed(2) + ')';
          ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
          ctx.fill();
        }
        requestAnimationFrame(draw);
      }
      draw();
    })();
// Fungsi untuk update tanggal dan jam digital
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const dateStr = now.toLocaleDateString('id-ID', options);
    const timeStr = now.toLocaleTimeString('id-ID');
    document.getElementById('date').textContent = dateStr;
    document.getElementById('time').textContent = timeStr;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
  
  // Promo slider: Auto dan kontrol manual dengan perhitungan lebar dinamis
  let promoIndex = 0;
  const promoContainer = document.querySelector('.promo-container');
  const promoImages = document.querySelectorAll('.promo-container img');
  const totalPromos = promoImages.length;
  
  function slidePromo() {
    const slideWidth = document.querySelector('.promo-slider').clientWidth;
    promoContainer.style.transform = `translateX(-${promoIndex * slideWidth}px)`;
  }
  
  let promoAutoSlideInterval = setInterval(() => {
    promoIndex = (promoIndex + 1) % totalPromos;
    slidePromo();
  }, 3000);
  
  function promoNext() {
    clearInterval(promoAutoSlideInterval);
    promoIndex = (promoIndex + 1) % totalPromos;
    slidePromo();
    resetPromoAutoSlide();
  }
  
  function promoPrev() {
    clearInterval(promoAutoSlideInterval);
    promoIndex = (promoIndex - 1 + totalPromos) % totalPromos;
    slidePromo();
    resetPromoAutoSlide();
  }
  
  function resetPromoAutoSlide() {
    promoAutoSlideInterval = setInterval(() => {
      promoIndex = (promoIndex + 1) % totalPromos;
      slidePromo();
    }, 3000);
  }
  
  // Fungsi Kuis
  function startQuiz() {
    const name = document.getElementById('quizName').value.trim();
    const wa = document.getElementById('quizWA').value.trim();
    if (!name || !wa) {
      alert("Silakan masukkan nama dan WhatsApp Anda terlebih dahulu.");
      return;
    }
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
  }
  
  function submitQuiz() {
    let score = 0;
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('quizResult');
    const formData = new FormData(form);
    const answerKey = {
      q1: "Ober Tumanggor, S.Kom",
      q2: "Semua Benar",
      q3: "Mobil",
      q4: "Pembayaran secara cicilan",
      q5: "New Pajero Sport"
    };
    for (let [question, answer] of formData.entries()) {
      if (answerKey[question] === answer) {
        score++;
      }
    }
    if (score >= 4) {
      resultDiv.textContent = "Selamat jawaban kamu benar ya! Kamu mendapatkan voucher untuk beli mobil senilai Rp500.000.";
      const name = document.getElementById('quizName').value.trim();
      const waUser = document.getElementById('quizWA').value.trim();
      const q1 = document.querySelector('input[name="q1"]:checked')?.value || "";
      const q2 = document.querySelector('input[name="q2"]:checked')?.value || "";
      const q3 = document.querySelector('input[name="q3"]:checked')?.value || "";
      const q4 = document.querySelector('input[name="q4"]:checked')?.value || "";
      const q5 = document.querySelector('input[name="q5"]:checked')?.value || "";
      let message = "Hasil Kuis Marketing Mobil:\n";
      message += "Nama: " + name + "\n";
      message += "WhatsApp: " + waUser + "\n";
      message += "Jawaban:\n";
      message += "1. " + q1 + "\n";
      message += "2. " + q2 + "\n";
      message += "3. " + q3 + "\n";
      message += "4. " + q4 + "\n";
      message += "5. " + q5 + "\n";
      message += "Skor: " + score + "\n";
      const encodedMessage = encodeURIComponent(message);
      const waUrl = "https://wa.me/6282393310575?text=" + encodedMessage;
      setTimeout(() =>{ 
         window.location.href = waUrl;
    }, 1000);
      }
     else {
      resultDiv.textContent = "Maaf, jawabanmu kurang tepat. Coba lagi!";
    }
     // setelah dikirim, kembalikan tampilan ke awal
  setTimeout(() => {
    document.getElementById('quizForm').reset();
    document.getElementById('quizStart').style.display = 'block';
    document.getElementById('quizContent').style.display = 'none';
    resultDiv.textContent = "";
  }, 1500);
}
  
  
  // Fungsi untuk form Tanya Marketing (dropdown)
  function submitContactForm(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const produk = document.getElementById('produk').value;
    const pembayaran = document.getElementById('pembayaran').value;
    const lokasi = document.getElementById('lokasi').value.trim();
    let message = "Halo, saya ingin bertanya mengenai produk mobil:\n";
    message += "Nama: " + nama + "\n";
    message += "Produk: " + produk + "\n";
    message += "Pembayaran: " + pembayaran + "\n";
    message += "Lokasi: " + lokasi;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = "https://wa.me/6282393310575?text=" + encodedMessage;
    window.open(waUrl, "_blank");
    document.getElementById('contactForm').reset();
  }
  
  // Fungsi untuk menghubungi marketing dari tombol produk
  function hubungiSelanjutnya(productName, productPrice, productSeats) {
    let message = "Halo, saya tertarik dengan produk " + productName +
                  " dengan harga " + productPrice +
                  " dan kursi " + productSeats + ".";
    const encodedMessage = encodeURIComponent(message);
    const waUrl = "https://wa.me/6282393310575?text=" + encodedMessage;
    window.open(waUrl, "_blank");
  }
  
  // Fungsi untuk promo: ketika foto promo diklik, pesan otomatis dikirim ke WhatsApp marketing
  function hubungiPromo() {
    let message = "Halo, saya tertarik dengan promo yang ditampilkan.";
    const encodedMessage = encodeURIComponent(message);
    const waUrl = "https://wa.me/6282393310575?text=" + encodedMessage;
    window.open(waUrl, "_blank");
  }
// Event listener untuk memastikan hanya satu video slider yang bisa diputar
    const videoElements = document.querySelectorAll(".video-card video");
    videoElements.forEach(video => {
      video.addEventListener("play", function() {
        videoElements.forEach(v => {
          if (v !== video) {
            v.pause();
          }
        });
      });
    });
  
  // Fungsi slider untuk Video Slider Section (horizontal scroll)
  function videoNext() {
    const container = document.querySelector('.video-slider-container');
    container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
  }
  
  function videoPrev() {
    const container = document.querySelector('.video-slider-container');
    container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
  }
 // === Geser Profil Marketing (Drag + Anti Scroll + Simpan Posisi Otomatis) ===
const profil = document.getElementById('profil');
let offsetX = 0, offsetY = 0, isDragging = false;

// === Fungsi untuk Simpan dan Ambil Posisi dari LocalStorage ===
function saveProfilPosition(x, y) {
  localStorage.setItem('profilPosition', JSON.stringify({ x, y }));
}

function loadProfilPosition() {
  const saved = localStorage.getItem('profilPosition');
  if (saved) {
    const { x, y } = JSON.parse(saved);
    profil.style.left = `${x}px`;
    profil.style.top = `${y}px`;
    profil.style.bottom = 'auto';
    profil.style.right = 'auto';
  }
}

// === Jalankan saat halaman pertama kali dibuka ===
window.addEventListener('load', loadProfilPosition);

// === EVENT MOUSE ===
profil.addEventListener('mousedown', (e) => {
  isDragging = true;
  profil.classList.add('dragging');
  offsetX = e.clientX - profil.getBoundingClientRect().left;
  offsetY = e.clientY - profil.getBoundingClientRect().top;
  document.body.style.userSelect = "none";
  document.body.style.overflow = "hidden";
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  profil.style.left = `${x}px`;
  profil.style.top = `${y}px`;
  profil.style.bottom = 'auto';
  profil.style.right = 'auto';
});

document.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  profil.classList.remove('dragging');
  document.body.style.userSelect = "";
  document.body.style.overflow = "";
  // Simpan posisi terakhir
  saveProfilPosition(profil.offsetLeft, profil.offsetTop);
});

// === EVENT TOUCH (HP/iOS/Android) ===
profil.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  isDragging = true;
  profil.classList.add('dragging');
  offsetX = touch.clientX - profil.getBoundingClientRect().left;
  offsetY = touch.clientY - profil.getBoundingClientRect().top;
  document.body.style.overflow = "hidden";
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const x = touch.clientX - offsetX;
  const y = touch.clientY - offsetY;
  profil.style.left = `${x}px`;
  profil.style.top = `${y}px`;
  profil.style.bottom = 'auto';
  profil.style.right = 'auto';
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  profil.classList.remove('dragging');
  document.body.style.overflow = "";
  // Simpan posisi terakhir juga untuk HP
  saveProfilPosition(profil.offsetLeft, profil.offsetTop);
});

// === Carousel Serah Terima 3D 5-Card View ===
let serahIndex = 0;
const serahCards = document.querySelectorAll('.carousel-item');
let serahTimer;

function updateSerahCarousel() {
  serahCards.forEach((card, i) => {
    card.className = 'carousel-item'; // reset class
    const diff = (i - serahIndex + serahCards.length) % serahCards.length;

    if (diff === 0) card.classList.add('active');
    else if (diff === 1) card.classList.add('right1');
    else if (diff === 2) card.classList.add('right2');
    else if (diff === serahCards.length - 1) card.classList.add('left1');
    else if (diff === serahCards.length - 2) card.classList.add('left2');
  });
}

function nextSerahTerima() {
  serahIndex = (serahIndex + 1) % serahCards.length;
  updateSerahCarousel();
}

function prevSerahTerima() {
  serahIndex = (serahIndex - 1 + serahCards.length) % serahCards.length;
  updateSerahCarousel();
}

function startSerahAuto() {
  clearInterval(serahTimer);
  serahTimer = setInterval(nextSerahTerima, 3000);
}

// === Swipe (Sentuhan HP) ===
let startX = 0, isSwiping = false;
const serahTrack = document.querySelector('.carousel-track');

if (serahTrack) {
  serahTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    clearInterval(serahTimer);
  }, { passive: true });

  serahTrack.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSerahTerima() : prevSerahTerima();
      isSwiping = false;
      startSerahAuto();
    }
  }, { passive: true });

  serahTrack.addEventListener('touchend', () => isSwiping = false);
}

window.addEventListener('load', () => {
  updateSerahCarousel();
  startSerahAuto();
});
// === COUNTER LOKAL PENGUNJUNG WEBSITE ===
(function(){
  const counterElement = document.getElementById('visitorCount');
  if (!counterElement) return;

  // Ambil jumlah pengunjung dari localStorage
  let count = localStorage.getItem('visitorCount');
  if (!count) count = 0;
  count = parseInt(count) + 1;

  // Simpan kembali ke localStorage
  localStorage.setItem('visitorCount', count);

  // Tampilkan ke layar
  counterElement.textContent = count.toLocaleString('id-ID');
})();
