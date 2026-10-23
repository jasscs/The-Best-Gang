"use strict";

/* ============================================================
   SHARE BUTTON
   Uses the native share sheet when available, then falls back
   to copying the invitation link for the group chat.
   ============================================================ */
const CUSTOM_BACKGROUNDS = [
  "assets/cats-bg.png",
  "assets/cats-bg.jpg",
  "assets/cats-bg.jpeg",
  "assets/cats-bg.webp"
];

const shareButton = document.querySelector("#share-btn");
const shareNote = document.querySelector("#share-note");
const celebrationLayer = document.querySelector("#celebration-layer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let shareNoteTimer = 0;
let sharing = false;

/* ============================================================
   BACKGROUND
   Prefer a custom tiled image if one of the files above exists;
   otherwise the inline SVG cat pattern in index.html stays visible.
   ============================================================ */
function loadCustomBackground() {
  let index = 0;

  function tryNext() {
    if (index >= CUSTOM_BACKGROUNDS.length) {
      return;
    }

    const src = CUSTOM_BACKGROUNDS[index];
    index += 1;

    const probe = new Image();
    probe.onload = () => {
      document.body.style.setProperty("--custom-cat-bg", `url("${src}")`);
      document.body.classList.add("has-custom-bg");
    };
    probe.onerror = tryNext;
    probe.src = src;
  }

  tryNext();
}

/* ============================================================
   SHARE / COPY LINK
   ============================================================ */
function setShareNote(message, duration = 3200) {
  window.clearTimeout(shareNoteTimer);
  shareNote.textContent = message;

  if (duration > 0) {
    shareNoteTimer = window.setTimeout(() => {
      shareNote.textContent = "";
    }, duration);
  }
}

async function copyLink(link) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch (error) {
      /* Fall through to the older clipboard method. */
    }
  }

  const helper = document.createElement("textarea");
  helper.value = link;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  helper.style.pointerEvents = "none";
  document.body.appendChild(helper);
  helper.focus();
  helper.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  helper.remove();
  return copied;
}

function playHeartConfetti(count) {
  if (reduceMotion.matches) {
    return;
  }

  const hearts = ["💖", "💕", "💗", "🩷", "🐾", "✨"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");
    heart.className = "celebration-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.setProperty("--x", `${4 + Math.random() * 92}%`);
    heart.style.setProperty("--size", `${15 + Math.random() * 17}px`);
    heart.style.setProperty("--duration", `${2.4 + Math.random() * 1.8}s`);
    heart.style.setProperty("--delay", `${Math.random() * 0.45}s`);
    heart.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    heart.style.setProperty("--spin", `${-220 + Math.random() * 440}deg`);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
    fragment.appendChild(heart);
  }

  celebrationLayer.appendChild(fragment);
}

async function shareInvite() {
  if (sharing) {
    return;
  }

  sharing = true;
  const shareData = {
    title: document.title,
    text: "Bonding na ulit! Tara na, mga bes! 🐱💕",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareNote("Salamat sa pag-share! 💕");
        playHeartConfetti(20);
        return;
      } catch (error) {
        if (error && error.name === "AbortError") {
          return;
        }
        /* If sharing is unavailable, fall back to copying the link. */
      }
    }

    const copied = await copyLink(shareData.url);
    setShareNote(
      copied
        ? "Link copied! I-paste mo na sa GC. 💕"
        : "Kopyahin mo na lang ang link sa address bar. 🐱"
    );

    if (copied) {
      playHeartConfetti(16);
    }
  } finally {
    sharing = false;
  }
}

/* ============================================================
   INIT
   ============================================================ */
shareButton.addEventListener("click", shareInvite);
loadCustomBackground();
