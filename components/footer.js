/* ===================================
   Footer — Trail de l'Estran
   Même footer sur toutes les pages
   =================================== */

function loadFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container footer-content">
      <div class="footer-columns">
        <div class="footer-left">
          <h2>Contact</h2>
          <p class="footer-intro">
            Une question sur les épreuves, l'inscription ou l'organisation ?
            N'hésite pas à nous contacter.
          </p>

          <div class="contact-blocks">
            <a href="https://maps.google.com/?q=10+Place+de+l'église+22710+Penvénan" target="_blank" rel="noopener" class="contact-block">
              <span class="contact-icon icon solid fa-home"></span>
              <div>
                <strong>Mairie</strong><br>
                10 Place de l'église<br>
                22710 Penvénan
              </div>
            </a>
            <a href="mailto:estran@estran.org" class="contact-block">
              <span class="contact-icon icon solid fa-envelope"></span>
              <div>
                <strong>Email</strong><br>
                estran@estran.org
              </div>
            </a>
          </div>

          <ul class="footer-socials">
            <li><a href="https://www.facebook.com/estran22?locale=fr_FR" class="icon brands fa-facebook-f" target="_blank" rel="noopener"><span class="sr-only">Facebook</span></a></li>
            <li><a href="https://www.instagram.com/traildelestran/" class="icon brands fa-instagram" target="_blank" rel="noopener"><span class="sr-only">Instagram</span></a></li>
          </ul>

          <p class="copyright">&copy; Trail de l'Estran · <a href="mentions-legales.html">Mentions légales</a></p>
        </div>

        <div class="footer-right">
          <form id="contact-form" method="POST" action="https://formspree.io/f/xrejggqy" class="contact-card">
            <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
            <div class="form-row">
              <input type="text" name="name" placeholder="Nom" required>
              <input type="email" name="email" placeholder="Email" required>
            </div>
            <input type="text" name="subject" placeholder="Objet">
            <textarea name="message" rows="5" placeholder="Ton message" required></textarea>
            <input type="hidden" name="_subject" value="Message depuis le site — Trail de l'Estran">
            <div class="form-actions">
              <button type="submit" class="button send-button">Envoyer</button>
            </div>
            <p id="form-status" class="form-status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", loadFooter);
