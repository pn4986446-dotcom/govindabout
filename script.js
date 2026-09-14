/* =========================================================
   THE COMPASS INSIDE THE BOOK
   Interactive Storybook JavaScript
   Author: Govind Sharma
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------------------------------------------------------
     ELEMENTS
  --------------------------------------------------------- */

  const loader = document.getElementById("loader");
  const header = document.querySelector("header");
  const menuButton = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");

  const modal = document.getElementById("chapterModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalLink = document.getElementById("modalLink");
  const modalClose = document.querySelector(".modal-close");

  const randomButtons = document.querySelectorAll(
    "[data-random-chapter], .random-chapter"
  );

  /* ---------------------------------------------------------
     LOADING SCREEN
  --------------------------------------------------------- */

  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hidden");

        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 900);
    });
  }

  /* ---------------------------------------------------------
     HEADER SCROLL EFFECT
  --------------------------------------------------------- */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* ---------------------------------------------------------
     MOBILE NAVIGATION
  --------------------------------------------------------- */

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuButton.classList.toggle("active", isOpen);

      if (isOpen) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    });

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---------------------------------------------------------
     SMOOTH SCROLL
  --------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  /* ---------------------------------------------------------
     BACK TO TOP
  --------------------------------------------------------- */

  const updateBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    "section, .chapter-card, .chapter-content, .author-card, " +
    ".dedication-card, .contents-card, .story-intro, .final-card"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* ---------------------------------------------------------
     CHAPTER DATA
  --------------------------------------------------------- */

  const chapters = [
    {
      number: 1,
      title: "The Old Book",
      text:
        "Aarav discovers a mysterious ancient book hidden in his grandfather's old study. Inside it is a golden compass that seems to know something about the future.",
      id: "chapter-1"
    },
    {
      number: 2,
      title: "A Page From Tomorrow",
      text:
        "The compass leads Aarav and Kabir toward a strange message from tomorrow. Their search reveals a hidden entrance inside the library.",
      id: "chapter-2"
    },
    {
      number: 3,
      title: "The Door Inside the Book",
      text:
        "A magical doorway opens within the pages. Aarav and Kabir step through it and discover a world that should exist only inside a story.",
      id: "chapter-3"
    },
    {
      number: 4,
      title: "Welcome to the Kingdom",
      text:
        "The friends arrive in Evermere, a magical kingdom whose future is beginning to disappear. They meet King Orion and learn about the missing crown.",
      id: "chapter-4"
    },
    {
      number: 5,
      title: "The King Without a Crown",
      text:
        "A mysterious talking fox named Finn joins the journey. A hidden clue points toward the northern forest and the person who once controlled Evermere's stories.",
      id: "chapter-5"
    },
    {
      number: 6,
      title: "The Future Has Changed",
      text:
        "Aarav discovers that the future shown by the compass is changing. The friends realize that the future may not be fixed after all.",
      id: "chapter-6"
    },
    {
      number: 7,
      title: "The Forbidden Chapter",
      text:
        "A secret chapter reveals the truth about Malric, the former Royal Storyteller, and his dangerous plan to control the future of Evermere.",
      id: "chapter-7"
    },
    {
      number: 8,
      title: "The Person Behind the Mystery",
      text:
        "Malric explains why he changed the story. Aarav must decide whether controlling the future is really the same as saving it.",
      id: "chapter-8"
    },
    {
      number: 9,
      title: "The Final Direction",
      text:
        "The race for the magical crown begins. When the golden compass breaks, Aarav learns the most important lesson of his adventure.",
      id: "chapter-9"
    },
    {
      number: 10,
      title: "The Choice",
      text:
        "Aarav faces two possible futures: one safe but controlled, and another uncertain but free. He must make the final choice.",
      id: "chapter-10"
    },
    {
      number: 11,
      title: "The Kingdom's New Story",
      text:
        "Evermere begins a new chapter. Its people receive blank pages and discover that everyone can help shape the kingdom's future.",
      id: "chapter-11"
    },
    {
      number: 12,
      title: "The Last Page",
      text:
        "Aarav returns home, but the adventure may not truly be over. A mysterious golden symbol appears again, hinting at another story waiting to begin.",
      id: "chapter-12"
    }
  ];

  /* ---------------------------------------------------------
     CHAPTER MODAL
  --------------------------------------------------------- */

  const openChapterModal = (chapter) => {
    if (!modal) return;

    if (modalTitle) {
      modalTitle.textContent =
        `Chapter ${chapter.number}: ${chapter.title}`;
    }

    if (modalText) {
      modalText.textContent = chapter.text;
    }

    if (modalLink) {
      modalLink.href = `#${chapter.id}`;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    if (modalClose) {
      setTimeout(() => modalClose.focus(), 50);
    }
  };

  const closeChapterModal = () => {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  };

  /* ---------------------------------------------------------
     RANDOM CHAPTER BUTTON
  --------------------------------------------------------- */

  const showRandomChapter = () => {
    const randomIndex = Math.floor(
      Math.random() * chapters.length
    );

    openChapterModal(chapters[randomIndex]);
  };

  randomButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showRandomChapter();
    });
  });

  /* ---------------------------------------------------------
     CHAPTER OPEN BUTTONS
  --------------------------------------------------------- */

  document.querySelectorAll("[data-chapter]").forEach((button) => {
    button.addEventListener("click", () => {
      const chapterNumber = Number(
        button.getAttribute("data-chapter")
      );

      const chapter = chapters.find(
        (item) => item.number === chapterNumber
      );

      if (chapter) {
        openChapterModal(chapter);
      }
    });
  });

  /* ---------------------------------------------------------
     MODAL CONTROLS
  --------------------------------------------------------- */

  if (modalClose) {
    modalClose.addEventListener("click", closeChapterModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeChapterModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeChapterModal();

      if (
        mainNav &&
        mainNav.classList.contains("open")
      ) {
        mainNav.classList.remove("open");

        if (menuButton) {
          menuButton.classList.remove("active");
          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        document.body.classList.remove("menu-open");
      }
    }
  });

  /* ---------------------------------------------------------
     MODAL LINK
  --------------------------------------------------------- */

  if (modalLink) {
    modalLink.addEventListener("click", () => {
      closeChapterModal();
    });
  }

  /* ---------------------------------------------------------
     ACTIVE NAVIGATION
  --------------------------------------------------------- */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    "#mainNav a[href^='#']"
  );

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (
              link.getAttribute("href") === `#${id}`
            ) {
              link.classList.add("active");
            }
          });
        });
      },
      {
        threshold: 0.35
      }
    );

    sections.forEach((section) => {
      navObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------
     HERO PARALLAX EFFECT
  --------------------------------------------------------- */

  const hero = document.querySelector(".hero");
  const heroArt = document.querySelector(".hero-art");

  if (
    hero &&
    heroArt &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {
          const movement = scrollPosition * 0.08;

          heroArt.style.transform =
            `translateY(${movement}px)`;
        }
      },
      {
        passive: true
      }
    );
  }

  /* ---------------------------------------------------------
     MAGICAL CURSOR EFFECT
  --------------------------------------------------------- */

  const createSpark = (x, y) => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    const spark = document.createElement("span");

    spark.className = "magic-spark";

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    document.body.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 700);
  };

  let sparkCounter = 0;

  document.addEventListener("pointermove", (event) => {
    sparkCounter++;

    if (sparkCounter % 8 !== 0) return;

    createSpark(
      event.clientX,
      event.clientY
    );
  });

  /* ---------------------------------------------------------
     BUTTON RIPPLE EFFECT
  --------------------------------------------------------- */

  document
    .querySelectorAll(".btn, button")
    .forEach((button) => {
      button.addEventListener("click", function (event) {
        const ripple = document.createElement("span");

        ripple.className = "button-ripple";

        const rect =
          this.getBoundingClientRect();

        const size = Math.max(
          rect.width,
          rect.height
        );

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        ripple.style.left =
          `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
          `${event.clientY - rect.top - size / 2}px`;

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

  /* ---------------------------------------------------------
     CURRENT YEAR
  --------------------------------------------------------- */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent =
      new Date().getFullYear();
  });

  /* ---------------------------------------------------------
     IMAGE ERROR HANDLING
  --------------------------------------------------------- */

  document
    .querySelectorAll("img")
    .forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("image-error");

        console.warn(
          "Image could not be loaded:",
          image.src
        );
      });
    });

  /* ---------------------------------------------------------
     ACCESSIBILITY
  --------------------------------------------------------- */

  if (modal) {
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
  }

  if (menuButton) {
    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  /* ---------------------------------------------------------
     CONSOLE MESSAGE
  --------------------------------------------------------- */

  console.log(
    "%c📖 The Compass Inside the Book",
    "font-size: 18px; font-weight: bold;"
  );

  console.log(
    "%cWritten by Govind Sharma",
    "font-size: 14px;"
  );

  console.log(
    "%c✨ The future is yours to write.",
    "font-size: 13px;"
  );
});