/* ============================================================
   Meesho Pickup Point Referral Program - Page Logic
   ------------------------------------------------------------
   Uses REFERRAL_DATA from referral-data.js, which is an array:
     [{ pickup_point_code: "SPP17", referral_link: "https://..." }, ...]
   No frameworks, no build tools. Plain JavaScript.
============================================================ */

/* ---- EDIT HERE: the WhatsApp share message. ----
   The [REFERRAL_LINK] placeholder is replaced automatically. */
var WHATSAPP_TEMPLATE =
  "Hello! Meesho Pickup Point Partner banne ka mauka hai. " +
  "No investment required. Agar aap interested hain, yeh form fill karein: [REFERRAL_LINK]";

// Keeps track of the link generated for the current code.
var currentReferralLink = "";

// Grab the elements we need once the page is ready.
document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("pickupCode");
  var generateBtn = document.getElementById("generateBtn");
  var whatsappBtn = document.getElementById("whatsappBtn");
  var copyBtn = document.getElementById("copyBtn");

  generateBtn.addEventListener("click", generateReferralLink);

  // Allow pressing Enter inside the input to generate the link.
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      generateReferralLink();
    }
  });

  whatsappBtn.addEventListener("click", shareOnWhatsApp);
  copyBtn.addEventListener("click", copyReferralLink);
});

/* ------------------------------------------------------------
   Look up the entered code and show the referral link.
------------------------------------------------------------ */
function generateReferralLink() {
  var input = document.getElementById("pickupCode");
  var errorBox = document.getElementById("errorBox");
  var resultBox = document.getElementById("resultBox");
  var referralLinkBox = document.getElementById("referralLinkBox");

  var code = input.value.trim().toUpperCase();

  // Reset previous state.
  hide(errorBox);
  hide(resultBox);
  currentReferralLink = "";

  // Empty input.
  if (!code) {
    showError("Please apna Pickup Point Code enter karein.");
    return;
  }

  // Safety check: data file loaded?
  if (typeof REFERRAL_DATA === "undefined") {
    showError("Referral data load nahi hua. Please referral-data.js check karein.");
    return;
  }

  // Find a matching code (case-insensitive).
  var match = REFERRAL_DATA.find(function (item) {
    return String(item.pickup_point_code).trim().toUpperCase() === code;
  });

  // Not found -> show the required error message.
  if (!match) {
    showError(
      "Pickup Point Code nahi mila. Please apna code check karein ya Area Manager se contact karein."
    );
    return;
  }

  // Found -> show the link and enable share/copy.
  currentReferralLink = match.referral_link;
  referralLinkBox.textContent = currentReferralLink;
  show(resultBox);
}

/* ------------------------------------------------------------
   Share the link on WhatsApp (works on mobile and desktop).
------------------------------------------------------------ */
function shareOnWhatsApp() {
  if (!currentReferralLink) return;

  var message = WHATSAPP_TEMPLATE.replace("[REFERRAL_LINK]", currentReferralLink);

  // https://wa.me works on both mobile (opens the app) and desktop
  // (opens WhatsApp Web / desktop app).
  var url = "https://wa.me/?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

/* ------------------------------------------------------------
   Copy the link to the clipboard, with a fallback for older
   browsers / non-secure (http) contexts.
------------------------------------------------------------ */
function copyReferralLink() {
  if (!currentReferralLink) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(currentReferralLink).then(
      function () {
        showToast("Referral link copied!");
      },
      function () {
        fallbackCopy(currentReferralLink);
      }
    );
  } else {
    fallbackCopy(currentReferralLink);
  }
}

// Fallback copy using a temporary textarea (older browsers / file://).
function fallbackCopy(text) {
  var temp = document.createElement("textarea");
  temp.value = text;
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.focus();
  temp.select();
  try {
    document.execCommand("copy");
    showToast("Referral link copied!");
  } catch (e) {
    showToast("Copy failed. Please select and copy manually.");
  }
  document.body.removeChild(temp);
}

/* ------------------------------------------------------------
   Small UI helpers
------------------------------------------------------------ */
function showError(message) {
  var errorBox = document.getElementById("errorBox");
  errorBox.textContent = message;
  show(errorBox);
}

function show(el) {
  el.hidden = false;
}

function hide(el) {
  el.hidden = true;
}

var toastTimer = null;
function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  // Force reflow so the transition runs, then show.
  void toast.offsetWidth;
  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () {
      toast.hidden = true;
    }, 250);
  }, 2200);
}
