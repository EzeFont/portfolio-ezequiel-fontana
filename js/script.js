const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const filterButtons = document.querySelectorAll(".filter-button[data-filter]");
const projectGrid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const projectDialog = document.querySelector("#project-admin-dialog");
const projectForm = document.querySelector("#project-form");
const projectAdminList = document.querySelector("#project-admin-list");
const projectFormNotice = document.querySelector("#project-form-notice");
const contactForm = document.querySelector("#contact-form");
const messageInput = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const formNotice = document.querySelector("#form-notice");
const currentYear = document.querySelector("#current-year");
let projects = [];
let selectedFilter = "todos";

const projectGalleries = {
  "Registro de balanza para yerbatera": [
    { src: "img/proyecto-yerbatera.png", alt: "Pantalla principal del sistema de registro de pesaje para yerbatera" },
    { src: "img/proyecto-yerbatera-recibo.png", alt: "Recibo de pesada de la yerbatera" }
  ],
  VitalHome: [
    { src: "img/proyecto-vitalhome.png", alt: "Pantalla principal de VitalHome" },
    { src: "img/proyecto-vitalhome-contactos.png", alt: "Pantalla de contactos de VitalHome" }
  ]
};

const projectLinks = {
  "Registro de balanza para yerbatera": "https://github.com/Lulo-specter/TP-Poo-Final",
  VitalHome: "https://github.com/AndresP573/VitalHome"
};

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

function categoriaProyecto(project) {
  return /android|mobile/i.test(project.tecnologias || "") ? "mobile" : "escritorio";
}

function safeUrl(value) {
  if (!value) return null;

  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function esImagenUrl(value) {
  if (!value) return false;
  try {
    return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(new URL(value, window.location.href).pathname);
  } catch {
    return false;
  }
}

function crearMiniatura(gallery, thumbnailGroup) {
  const thumbnail = document.createElement("button");
  thumbnail.className = "project-thumbnail";
  thumbnail.type = "button";
  thumbnail.dataset.imageSrc = gallery.src;
  thumbnail.dataset.imageAlt = gallery.alt;
  thumbnail.setAttribute("aria-label", `Ver imagen: ${gallery.alt}`);
  thumbnail.setAttribute("aria-pressed", "false");

  const image = document.createElement("img");
  image.src = gallery.src;
  image.alt = gallery.alt;
  thumbnail.append(image);
  thumbnailGroup.append(thumbnail);
}

function crearTarjeta(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = categoriaProyecto(project);
  card.dataset.projectId = project.id;

  const projectLink = safeUrl(projectLinks[project.nombre] || project.imagenUrl) || "#";
  const imageSource = esImagenUrl(project.imagenUrl) ? safeUrl(project.imagenUrl) : "img/perfil-simple.svg";
  const imageLink = document.createElement("a");
  imageLink.className = "project-image";
  imageLink.href = projectLink;
  imageLink.setAttribute("aria-label", `Ver proyecto ${project.nombre}`);
  if (projectLink !== "#") {
    imageLink.target = "_blank";
    imageLink.rel = "noopener noreferrer";
  }

  const mainImage = document.createElement("img");
  mainImage.className = "project-main-image";
  mainImage.src = imageSource || "img/perfil-simple.svg";
  mainImage.alt = project.nombre;
  imageLink.append(mainImage);

  const arrow = document.createElement("span");
  arrow.className = "image-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  imageLink.append(arrow);
  card.append(imageLink);

  const gallery = projectGalleries[project.nombre];
  if (gallery) {
    const thumbnailGroup = document.createElement("div");
    thumbnailGroup.className = "project-thumbnails";
    thumbnailGroup.setAttribute("role", "group");
    thumbnailGroup.setAttribute("aria-label", `Galería de ${project.nombre}`);
    gallery.forEach((image) => crearMiniatura(image, thumbnailGroup));
    const firstThumbnail = thumbnailGroup.querySelector(".project-thumbnail");
    firstThumbnail.classList.add("is-active");
    firstThumbnail.setAttribute("aria-pressed", "true");
    mainImage.src = gallery[0].src;
    mainImage.alt = gallery[0].alt;
    card.append(thumbnailGroup);
  }

  const category = categoriaProyecto(project);
  const meta = document.createElement("div");
  meta.className = "project-meta";
  const number = document.createElement("span");
  number.textContent = `${String(index + 1).padStart(2, "0")} / ${category.toUpperCase()}`;
  const year = document.createElement("span");
  const createdAt = new Date(project.fechaCreacion);
  year.textContent = Number.isNaN(createdAt.getTime()) ? "" : String(createdAt.getFullYear());
  meta.append(number, year);
  card.append(meta);

  const title = document.createElement("h3");
  title.textContent = project.nombre;
  card.append(title);

  const description = document.createElement("p");
  description.textContent = project.descripcion;
  card.append(description);

  const clarificationText = project.nombre === "Registro de balanza para yerbatera"
    ? "Trabajo práctico de la carrera."
    : project.nombre === "VitalHome" ? "Proyecto grupal." : "";
  if (clarificationText) {
    const clarification = document.createElement("p");
    clarification.className = "project-clarification";
    clarification.textContent = clarificationText;
    card.append(clarification);
  }

  const technologies = document.createElement("ul");
  technologies.className = "tag-list";
  technologies.setAttribute("aria-label", "Tecnologías utilizadas");
  (project.tecnologias || "").split(",").map((technology) => technology.trim()).filter(Boolean).forEach((technology) => {
    const tag = document.createElement("li");
    tag.textContent = technology;
    technologies.append(tag);
  });
  card.append(technologies);

  const codeLink = document.createElement("a");
  codeLink.className = "text-link";
  codeLink.href = projectLink;
  codeLink.textContent = "Ver proyecto ↗";
  card.append(codeLink);
  return card;
}

function aplicarFiltro() {
  let visibleProjects = 0;
  projectGrid.querySelectorAll(".project-card").forEach((card) => {
    const isVisible = selectedFilter === "todos" || card.dataset.category === selectedFilter;
    card.hidden = !isVisible;
    if (isVisible) visibleProjects += 1;
  });

  emptyState.hidden = visibleProjects > 0;
  if (visibleProjects === 0) {
    emptyState.textContent = selectedFilter === "todos"
      ? "No hay proyectos publicados todavía."
      : "No hay proyectos publicados en esta categoría.";
  }
}

function renderizarProyectos() {
  projectGrid.replaceChildren();
  projects.filter((project) => project.estado === "publicado").forEach((project, index) => {
    projectGrid.append(crearTarjeta(project, index));
  });
  aplicarFiltro();
}

function renderizarListaAdmin() {
  projectAdminList.replaceChildren();

  projects.forEach((project) => {
    const row = document.createElement("div");
    row.className = "project-admin-item";
    const summary = document.createElement("p");
    summary.textContent = `${project.nombre} — ${project.estado}`;

    const actions = document.createElement("div");
    actions.className = "project-admin-actions";
    const editButton = document.createElement("button");
    editButton.className = "filter-button";
    editButton.type = "button";
    editButton.dataset.action = "edit";
    editButton.dataset.projectId = project.id;
    editButton.textContent = "Editar";
    const deleteButton = document.createElement("button");
    deleteButton.className = "filter-button";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.projectId = project.id;
    deleteButton.textContent = "Eliminar";

    actions.append(editButton, deleteButton);
    row.append(summary, actions);
    projectAdminList.append(row);
  });
}

async function cargarProyectos() {
  try {
    const response = await fetch("/api/proyectos");
    if (!response.ok) throw new Error(`La API respondió con el código ${response.status}.`);
    projects = await response.json();
    renderizarProyectos();
    renderizarListaAdmin();
    return true;
  } catch (error) {
    console.error("No se pudieron cargar los proyectos:", error);
    emptyState.textContent = "No se pudieron cargar los proyectos. Revisá que el backend y SQL Server estén funcionando.";
    emptyState.hidden = false;
    return false;
  }
}

function prepararFormulario(project = null) {
  projectForm.reset();
  projectFormNotice.textContent = "";
  projectForm.elements.namedItem("id").value = project ? project.id : "";
  if (project) {
    projectForm.elements.namedItem("nombre").value = project.nombre;
    projectForm.elements.namedItem("descripcion").value = project.descripcion;
    projectForm.elements.namedItem("tecnologias").value = project.tecnologias || "";
    projectForm.elements.namedItem("imagenUrl").value = project.imagenUrl || "";
    projectForm.elements.namedItem("estado").value = project.estado;
  }
}

document.querySelector("#open-project-manager").addEventListener("click", () => {
  prepararFormulario();
  projectDialog.showModal();
});

document.querySelector("#close-project-manager").addEventListener("click", () => {
  projectDialog.close();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    aplicarFiltro();
  });
});

projectGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const thumbnail = target.closest(".project-thumbnail");
  if (!thumbnail) return;

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

projectAdminList.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest("button[data-action]");
  if (!button) return;

  const project = projects.find((item) => String(item.id) === button.dataset.projectId);
  if (!project) return;

  if (button.dataset.action === "edit") {
    prepararFormulario(project);
    projectDialog.querySelector("#project-name").focus();
    return;
  }

  if (button.dataset.action === "delete" && window.confirm(`¿Eliminar "${project.nombre}"?`)) {
    try {
      const response = await fetch(`/api/proyectos/${project.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "No se pudo eliminar el proyecto.");
      await cargarProyectos();
    } catch (error) {
      console.error("No se pudo eliminar el proyecto:", error);
      projectFormNotice.textContent = error.message;
    }
  }
});

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  projectFormNotice.textContent = "";
  const formData = new FormData(projectForm);
  const id = formData.get("id");
  const method = id ? "PUT" : "POST";
  const endpoint = id ? `/api/proyectos/${id}` : "/api/proyectos";
  const payload = {
    nombre: formData.get("nombre").trim(),
    descripcion: formData.get("descripcion").trim(),
    tecnologias: formData.get("tecnologias").trim() || null,
    imagenUrl: formData.get("imagenUrl").trim() || null,
    estado: formData.get("estado")
  };

  try {
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "No se pudo guardar el proyecto.");
    prepararFormulario();
    const refreshed = await cargarProyectos();
    if (!refreshed) {
      projectFormNotice.textContent = "El proyecto se guardó, pero no se pudo actualizar la lista.";
      return;
    }
    projectFormNotice.textContent = method === "POST" ? "Proyecto creado." : "Proyecto actualizado.";
  } catch (error) {
    console.error("No se pudo guardar el proyecto:", error);
    projectFormNotice.textContent = error.message;
  }
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
cargarProyectos();
