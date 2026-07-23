// ...existing code...
    document.addEventListener('DOMContentLoaded', function() {
      const nav = document.getElementById('mainNav');
      // Navbar link click: update selected state
        const links = Array.from(nav.querySelectorAll('.nav-link:not(.disabled)'));
        links.forEach(link => {
          link.addEventListener('click', function(e) {
            // Scroll to section smoothly
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
              const section = document.querySelector(href);
              if (section) {
                e.preventDefault();
                window.scrollTo({
                  top: section.offsetTop - nav.offsetHeight,
                  behavior: 'smooth'
                });
              }
            }
            links.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
          });
        });

        // Scrollspy: highlight link for section in view
        const sections = links
          .map(link => link.getAttribute('href'))
          .filter(href => href && href.startsWith('#'))
          .map(href => document.querySelector(href))
          .filter(Boolean);

        function onScrollSpy() {
          const scrollPos = window.scrollY + nav.offsetHeight + 10;
          let currentSection = sections[0];
          for (let section of sections) {
            if (section.offsetTop <= scrollPos) {
              currentSection = section;
            }
          }
          links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentSection && href === '#' + currentSection.id) {
              link.classList.add('selected');
            } else {
              link.classList.remove('selected');
            }
          });
        }
        window.addEventListener('scroll', onScrollSpy);
        onScrollSpy();

      // Navbar background changes on scroll
      function updateNavBg() {
        if (window.scrollY > 0) {
          nav.classList.add('bg-gray');
          nav.classList.remove('bg-black');
        } else {
          nav.classList.remove('bg-gray');
          nav.classList.add('bg-black');
        }
      }
      updateNavBg();
      window.addEventListener('scroll', updateNavBg);

      // Rotating computer text effect for 'I am' section
      const texts = ['web developer', 'student', 'ethical hacker'];
      let idx = 0;
      const el = document.getElementById('changing-text');
      let charIdx = 0;
      let typing = true;
      function typeText() {
        if (typing) {
          if (charIdx < texts[idx].length) {
            el.textContent = texts[idx].slice(0, charIdx + 1);
            charIdx++;
            setTimeout(typeText, 36);
          } else {
            typing = false;
            setTimeout(typeText, 700);
          }
        } else {
          if (charIdx > 0) {
            el.textContent = texts[idx].slice(0, charIdx - 1);
            charIdx--;
            setTimeout(typeText, 30);
          } else {
            typing = true;
            idx = (idx + 1) % texts.length;
            setTimeout(typeText, 200);
          }
        }
      }
  typeText();
      
        // Animate profile-img movement
        const img = document.querySelector('.profile-img');
        if (img) {
          let directions = [
            { x: '5mm', y: '0mm' },    // right
            { x: '-3mm', y: '0mm' },   // left
            { x: '0mm', y: '-5mm' },   // top
            { x: '0mm', y: '3mm' }     // bottom
          ];
          let i = 0;
          function animate() {
            img.style.transition = 'transform 0.9s';
            img.style.transform = `translate(${directions[i].x}, ${directions[i].y})`;
            i = (i + 1) % directions.length;
            setTimeout(animate, 900);
          }
          animate();
        }

        // Contact form submit behavior for email delivery via Formspree
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
          contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const status = document.getElementById('formStatus');
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const formSubject = document.getElementById('formSubject');

            if (formSubject && subject) {
              formSubject.value = subject;
            }

            if (!name || !email || !subject || !message) {
              if (status) {
                status.textContent = 'Please fill in name, email, subject, and message.';
                status.className = 'form-status status-warning';
              }
              return;
            }

            if (status) {
              status.textContent = 'Sending your message...';
              status.className = 'form-status status-info';
            }

            try {
              const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                  'Accept': 'application/json'
                }
              });

              if (response.ok) {
                if (status) {
                  status.textContent = 'Message sent! You will receive it through email after the form service is configured.';
                  status.className = 'form-status status-success';
                }
                contactForm.reset();
              } else {
                throw new Error('Form submission failed.');
              }
            } catch (error) {
              if (status) {
                status.textContent = 'Could not send message yet. Please check your internet connection and Formspree endpoint settings.';
                status.className = 'form-status status-warning';
              }
            }
          });
        }

});