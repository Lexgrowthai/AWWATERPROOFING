(function () {
  var modalHTML = `
<div id="contact-modal-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;align-items:center;justify-content:center;">
  <div style="background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:40px 36px;width:100%;max-width:520px;margin:20px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
    <button onclick="closeContactModal()" style="position:absolute;top:14px;right:18px;background:none;border:none;color:#aaa;font-size:24px;cursor:pointer;line-height:1;">&times;</button>
    <div id="contact-modal-body">
      <h2 style="color:#fff;margin:0 0 6px;font-size:22px;">Get a Free Quote</h2>
      <p style="color:#aaa;margin:0 0 24px;font-size:14px;">Fill out the form below and we'll get back to you within one business day.</p>
      <form id="contact-modal-form">
        <div style="margin-bottom:16px;">
          <label style="display:block;color:#ccc;font-size:13px;margin-bottom:6px;">Your Name *</label>
          <input type="text" name="name" required placeholder="John Smith" style="width:100%;padding:11px 14px;background:#111;border:1px solid #444;border-radius:6px;color:#fff;font-size:15px;box-sizing:border-box;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;color:#ccc;font-size:13px;margin-bottom:6px;">Phone Number</label>
          <input type="tel" name="phone" placeholder="(613) 555-0100" style="width:100%;padding:11px 14px;background:#111;border:1px solid #444;border-radius:6px;color:#fff;font-size:15px;box-sizing:border-box;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;color:#ccc;font-size:13px;margin-bottom:6px;">Email Address *</label>
          <input type="email" name="email" required placeholder="you@example.com" style="width:100%;padding:11px 14px;background:#111;border:1px solid #444;border-radius:6px;color:#fff;font-size:15px;box-sizing:border-box;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;color:#ccc;font-size:13px;margin-bottom:6px;">City / Location</label>
          <input type="text" name="city" placeholder="e.g. Napanee, Kingston, Belleville" style="width:100%;padding:11px 14px;background:#111;border:1px solid #444;border-radius:6px;color:#fff;font-size:15px;box-sizing:border-box;">
        </div>
        <div style="margin-bottom:24px;">
          <label style="display:block;color:#ccc;font-size:13px;margin-bottom:6px;">Describe Your Issue *</label>
          <textarea name="message" required rows="4" placeholder="Tell us what's happening — wet basement, foundation crack, water seeping in, etc." style="width:100%;padding:11px 14px;background:#111;border:1px solid #444;border-radius:6px;color:#fff;font-size:15px;box-sizing:border-box;resize:vertical;"></textarea>
        </div>
        <div id="contact-modal-error" style="display:none;color:#f66;font-size:13px;margin-bottom:12px;"></div>
        <button type="submit" id="contact-modal-submit" style="width:100%;padding:14px;background:#e8a020;border:none;border-radius:6px;color:#000;font-size:16px;font-weight:700;cursor:pointer;letter-spacing:0.5px;">Send Message</button>
      </form>
    </div>
    <div id="contact-modal-success" style="display:none;text-align:center;padding:20px 0;">
      <div style="font-size:52px;margin-bottom:16px;">✅</div>
      <h2 style="color:#fff;margin:0 0 12px;font-size:22px;">Message Sent!</h2>
      <p style="color:#aaa;font-size:15px;line-height:1.7;margin-bottom:28px;">Thank you! We'll get back to you within one business day.</p>
      <a href="tel:5192785002" style="display:inline-block;padding:12px 28px;background:#e8a020;color:#000;font-weight:700;border-radius:6px;text-decoration:none;font-size:15px;">Or Call (519) 278-5002</a>
    </div>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var overlay = document.getElementById('contact-modal-overlay');

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeContactModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeContactModal();
  });

  document.getElementById('contact-modal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = this;
    var btn = document.getElementById('contact-modal-submit');
    var errEl = document.getElementById('contact-modal-error');
    var data = new FormData(form);
    data.append('_subject', 'New Website Enquiry – AW Waterproofing Solutions');
    data.append('_captcha', 'false');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    errEl.style.display = 'none';
    fetch('https://formsubmit.co/ajax/awwaterproofingsolutions@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(function (res) { return res.json(); })
    .then(function (res) {
      if (res.success === 'true' || res.success === true) {
        document.getElementById('contact-modal-body').style.display = 'none';
        document.getElementById('contact-modal-success').style.display = 'block';
      } else {
        throw new Error('Submission failed');
      }
    })
    .catch(function () {
      errEl.textContent = 'Something went wrong. Please call us at (519) 278-5002.';
      errEl.style.display = 'block';
      btn.textContent = 'Send Message';
      btn.disabled = false;
    });
  });
}());

function openContactModal() {
  var overlay = document.getElementById('contact-modal-overlay');
  var body = document.getElementById('contact-modal-body');
  var success = document.getElementById('contact-modal-success');
  var form = document.getElementById('contact-modal-form');
  body.style.display = 'block';
  success.style.display = 'none';
  form.reset();
  var btn = document.getElementById('contact-modal-submit');
  btn.textContent = 'Send Message';
  btn.disabled = false;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  var overlay = document.getElementById('contact-modal-overlay');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}
