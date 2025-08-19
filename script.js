// Jika halaman direfresh, hapus status buka (agar kembali ke cover)
window.addEventListener("beforeunload", function () {
  sessionStorage.removeItem("undanganDibuka");
});

document.addEventListener("DOMContentLoaded", function () {
  // Jika belum dibuka, tampilkan halaman cover (default)
  const sudahBuka = sessionStorage.getItem("undanganDibuka");
  if (!sudahBuka) {
    // Jangan apa-apa, tetap di halaman cover
    document.getElementById("cover").classList.remove("hidden");
  }
});

function bukaUndangan() {
  const cover = document.getElementById("cover");

  // Tambahkan animasi fade-out jika ada
  cover.classList.add("fade-out");

  // Setelah animasi selesai (sesuaikan durasi dengan CSS), sembunyikan sepenuhnya
  setTimeout(() => {
    cover.classList.add("hidden");
    cover.style.display = "none"; // <- ini penting agar benar-benar tersembunyi

    // Hapus kunci scroll agar bisa scroll ke section lain
    document.body.classList.remove("lock-scroll");

    // Tampilkan semua section tersembunyi
    document.querySelectorAll("section.hidden").forEach(section => {
      section.classList.remove("hidden");
      section.classList.add("visible");
    });

    // Tampilkan bottom navbar
    const bottomNav = document.getElementById("bottomNav");
    if (bottomNav) {
      bottomNav.classList.remove("hidden");
      bottomNav.classList.add("visible");
    }

    // Scroll ke section utama
    document.getElementById("cover-section").scrollIntoView({ behavior: "smooth" });

    // Play audio
    const audio = document.getElementById("backsound");
    if (audio && audio.paused) {
      audio.play().catch(() => {
        console.log("Audio belum bisa diputar otomatis.");
      });
    }

    // Refresh animasi AOS
    if (typeof AOS !== 'undefined') AOS.refresh();

    // Tandai undangan sudah dibuka di session
    sessionStorage.setItem("undanganDibuka", "true");
  }, 600); // durasi fade-out animasi dalam milidetik (jika ada)
}



// Scroll ke section via tombol navbar
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Masukkan nama tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get('to');
if (namaTamu) {
  const elemenNama = document.getElementById("namaTamu");
  if (elemenNama) {
    elemenNama.textContent = decodeURIComponent(namaTamu).replace(/\+/g, ' ');
  }
}

// Form RSVP
const rsvpForm = document.getElementById("rsvp-form");
if (rsvpForm) {
  rsvpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = this.nama.value;
    const kehadiran = this.kehadiran.value;
    const pesan = this.pesan.value;
    alert(`Terima kasih ${nama}, konfirmasi Anda: ${kehadiran}.\nPesan: ${pesan}`);
    this.reset();
  });
}

// Auto fullscreen saat pertama klik
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement && elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }, { once: true });
});

// Countdown Akad
const akadDate = new Date(2030, 11, 31, 9, 0, 0).getTime(); // 31 Desember 2030
const countdownAkad = () => {
  const now = new Date().getTime();
  const distance = akadDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "<p>Acara telah berlangsung</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
};

setInterval(countdownAkad, 1000);

// Inisialisasi AOS
if (typeof AOS !== 'undefined') {
  AOS.init({
    once: false,
    duration: 800,
    delay: 100,
  });
}
//LOCK SCROLL COVER//
document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0); // Pastikan scroll di atas
  // Cegah scroll saat masih di cover
  document.body.classList.add("lock-scroll");

  // Jika undangan belum dibuka, biarkan di halaman cover
  const sudahBuka = sessionStorage.getItem("undanganDibuka");
  if (!sudahBuka) {
    document.getElementById("cover").classList.remove("hidden");
  }
});


