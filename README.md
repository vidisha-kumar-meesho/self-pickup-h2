# Meesho Pickup Point Referral Landing Page

A simple, mobile-first landing page for the **Meesho Pickup Point Referral Program**.
Existing Pickup Point partners can refer a good shopkeeper, generate their referral
link, and share it on WhatsApp. If the referred store activates successfully, the
referrer can earn a ₹200 bonus.

Built with **plain HTML, CSS, and JavaScript** — no React, no Node.js, no backend,
no build tools, no paid services. Perfect for free hosting on GitHub Pages.

---

## Files

| File               | What it does                                              |
|--------------------|-----------------------------------------------------------|
| `index.html`       | Page structure and all content sections                   |
| `styles.css`       | All styling (colors, layout, responsive design)           |
| `referral-data.js` | The data: maps each Pickup Point Code to its referral link |
| `script.js`        | Page logic: generate link, copy, share on WhatsApp        |
| `README.md`        | This file                                                 |

> Optional: put a logo image at `assets/meesho-logo.png` (see below).

---

## 1. How to edit Pickup Point codes and referral links

Open **`referral-data.js`**. It contains one big list called `REFERRAL_DATA`.
Each shopkeeper/partner is one line:

```js
const REFERRAL_DATA = [
  { pickup_point_code: "SPP17", referral_link: "https://forms.gle/your-link-1" },
  { pickup_point_code: "SP100", referral_link: "https://forms.gle/your-link-2" },
];
```

- **Add a partner:** copy any line and change both values. Keep the trailing comma.
- **Change a link:** edit only the `referral_link` part for that code.
- **Remove a partner:** delete that whole line.
- Codes are matched **case-insensitively** (`SPP17` and `spp17` both work).

Each referral link should be a **pre-filled Google Form link** (or any URL you want
to share). Tip for Google Forms: open your form → **Send** → link icon, or use
**"Get pre-filled link"** to bake the partner's code into the form.

> Note: the example in the original brief used a plain object (`{ "PP001": "..." }`).
> This project uses an **array of objects** instead, because the real data was
> auto-generated from the Excel master sheet in that format. It works the same way —
> just follow the structure shown above.

---

## 2. How to edit the priority pincodes

Open **`index.html`** and find the section marked:

```html
<!-- 6. PINCODE / PRIORITY AREA SECTION -->
```

Inside `<div class="chips" id="pincodeChips">` you'll see one `<span>` per pincode:

```html
<span class="chip">440002</span>
<span class="chip">440032</span>
```

- **Add a pincode:** copy a line and change the number.
- **Remove a pincode:** delete that line.

---

## 3. How to change the WhatsApp message

Open **`script.js`** and edit `WHATSAPP_TEMPLATE` near the top:

```js
var WHATSAPP_TEMPLATE =
  "Hello! Meesho Pickup Point Partner banne ka mauka hai. " +
  "No investment required. Agar aap interested hain, yeh form fill karein: [REFERRAL_LINK]";
```

Keep the `[REFERRAL_LINK]` placeholder — it is replaced automatically with the
partner's generated link when they tap **Share on WhatsApp**.

---

## 4. How to change colors

Open **`styles.css`**. At the very top, the `:root` block holds all colors:

```css
:root {
  --purple: #5b259f;
  --pink:   #f43397;
  --yellow: #ffd233;
  ...
}
```

Change a value and the whole page updates.

---

## 5. (Optional) Add the Meesho logo image

By default the header shows a text logo (`meesho`). To use an image instead:

1. Create an `assets` folder and add your file as `assets/meesho-logo.png`.
2. In `index.html`, find the header and replace the text logo line:

   ```html
   <span class="logo-text">meesho</span>
   ```

   with:

   ```html
   <img src="assets/meesho-logo.png" alt="Meesho" class="logo-img" />
   ```

---

## 6. How to test locally

No server or build step needed:

1. Open the project folder.
2. Double-click **`index.html`** — it opens in your browser.
3. Try a code from `referral-data.js` (e.g. `SPP17`) in the generator and test
   **Generate**, **Copy**, and **Share on WhatsApp**.

> Copy-to-clipboard has a built-in fallback, so it works even when opening the file
> directly (`file://`). On desktop, "Share on WhatsApp" opens WhatsApp Web; on mobile
> it opens the WhatsApp app.

---

## 7. How to host on GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `pickup-referral`).
2. Upload all files (`index.html`, `styles.css`, `referral-data.js`, `script.js`,
   `README.md`, and the `assets/` folder if you added one) to the repo root.
   - Either drag-and-drop on github.com, or use git:
     ```bash
     git init
     git add .
     git commit -m "Pickup Point referral landing page"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait ~1 minute. Your page will be live at:
   `https://<your-username>.github.io/<your-repo>/`

To update later: edit the files, commit, and push again — Pages redeploys
automatically.

---

## Page sections

1. **Hero** — headline, subheadline, primary CTA
2. **What is this program?** — short explanation
3. **Who can you refer?** — checklist cards
4. **How it works** — 3 steps
5. **Eligibility clause** — highlighted bonus condition
6. **Priority areas** — editable pincode chips
7. **Referral link generator** — enter code → get link → copy / share on WhatsApp
