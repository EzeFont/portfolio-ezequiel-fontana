const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.querySelector("#empty-state");
const projectThumbnails = document.querySelectorAll(".project-thumbnail");
const contactForm = document.querySelector("#contact-form");
const messageInput = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const formNotice = document.querySelector("#form-notice");
const currentYear = document.querySelector("#current-year");

// El menú móvil se cierra al elegir una sección y conserva su estado accesible.
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

// Cada botón muestra solo las tarjetas de su categoría.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const isVisible = selectedFilter === "todos" || card.dataset.category === selectedFilter;
      card.hidden = !isVisible;
      if (isVisible) visibleProjects += 1;
    });

    emptyState.hidden = visibleProjects > 0;
  });
});

projectThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const card = thumbnail.closest(".project-card");
    const mainImage = card.querySelector(".project-main-image");

    mainImage.src = thumbnail.dataset.imageSrc;
    mainImage.alt = thumbnail.dataset.imageAlt;

    card.querySelectorAll(".project-thumbnail").forEach((cardThumbnail) => {
      const isActive = cardThumbnail === thumbnail;
      cardThumbnail.classList.toggle("is-active", isActive);
      cardThumbnail.setAttribute("aria-pressed", String(isActive));
    });
  });
});

messageInput.addEventListener("input", () => {
  characterCount.textContent = `${messageInput.value.length} / 300`;
});

// Los errores se crean en el DOM y quedan asociados a su campo con aria-describedby.
function setFieldError(field, message) {
  const errorId = `${field.id}-error`;
  let errorElement = document.querySelector(`#${errorId}`);

  if (!errorElement) {
    errorElement = document.createElement("small");
    errorElement.id = errorId;
    errorElement.classList.add("field-error");
    field.insertAdjacentElement("afterend", errorElement);
    const describedBy = new Set((field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
    describedBy.add(errorId);
    field.setAttribute("aria-describedby", [...describedBy].join(" "));
  }

  errorElement.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const message = contactForm.elements.message;
  let isValid = true;

  if (name.value.trim().length < 2) {
    setFieldError(name, "Escribí tu nombre (al menos 2 caracteres).");
    isValid = false;
  } else {
    setFieldError(name, "");
  }

  if (!email.validity.valid || email.value.trim() === "") {
    setFieldError(email, "Ingresá una dirección de email válida.");
    isValid = false;
  } else {
    setFieldError(email, "");
  }

  if (message.value.trim().length < 10) {
    setFieldError(message, "El mensaje debe tener al menos 10 caracteres.");
    isValid = false;
  } else {
    setFieldError(message, "");
  }

  if (isValid) {
    const confirmation = document.createElement("span");
    confirmation.textContent = "¡Gracias! Tu mensaje está listo. Esta demostración no lo envía a un servidor.";
    formNotice.replaceChildren(confirmation);
    formNotice.classList.add("is-success");
    formNotice.hidden = false;
    contactForm.reset();
    characterCount.textContent = "0 / 300";
  } else {
    formNotice.textContent = "Revisá los campos señalados antes de continuar.";
    formNotice.classList.remove("is-success");
    formNotice.hidden = false;
  }
});

currentYear.textContent = new Date().getFullYear();
