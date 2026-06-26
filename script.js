  // Scroll reveal
  const fadeEls = document.querySelectorAll('.fade-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => io.observe(el));

  // Mobile nav
  function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('open');
  }

  // Active nav highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(l => {
      l.style.color = '';
      if (l.getAttribute('href') === '#' + current) l.style.color = 'var(--text)';
    });
  });

  // Subtle orb parallax
  document.addEventListener('mousemove', (e) => {
    const orb = document.querySelector('.orb-wrap');
    if (!orb) return;
    const mx = (e.clientX / window.innerWidth - 0.5) * 12;
    const my = (e.clientY / window.innerHeight - 0.5) * 12;
    orb.style.transform = `translate(${mx}px, ${my}px)`;
  });
  const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Vérifier reCAPTCHA
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
        alert("Please verify that you are not a robot");
        return;
    }

    emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        this
    )
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
        grecaptcha.reset(); // reset captcha
    })
    .catch((error) => {
        console.log(error);
        alert("Error sending message");
    });
});