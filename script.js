document.addEventListener("DOMContentLoaded", () => {
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  function showNextImage() {
    carouselItems[currentIndex].classList.remove("active");
    carouselItems[currentIndex].style.animation = "slideLeft 1s forwards";
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add("active");
    carouselItems[currentIndex].style.animation = "none";
    carouselItems[currentIndex].offsetHeight; // Trigger reflow
    carouselItems[currentIndex].style.animation = null;

    setTimeout(() => {
      carouselItems.forEach((item, index) => {
        if (index !== currentIndex) {
          item.style.animation = "none";
        }
      });
    }, 400);
  }

  setInterval(showNextImage, 2000); // Change image every 2 seconds

  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  //TODO Modal logic
  const modal = document.getElementById("projeto-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeBtn = document.getElementsByClassName("close")[0];

  function openModal(url, title, description) {
    modalImage.src = url;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.display = "block";
  }

  const projetoItems = document.querySelectorAll(".projeto-item");
  projetoItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const [url, title, description] = projetos[index];
      openModal(url, title, description);
    });
  });
  function closeModal() {
    modal.style.display = "none";
  }

  closeBtn.onclick = closeModal;

  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Form submission logic
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Add your form submission logic here
      console.log("Form submitted");
    });
  }
});

// React Components for Projeto Items
("use strict");

const projetos = [
  [
    "https://images.unsplash.com/photo-1707840718162-134194b2b352?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Casa Vista Serena",
    "Uma residência moderna com amplas janelas que destacam a integração com a natureza ao redor, proporcionando uma vista relaxante e sofisticada.",
  ],
  [
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Villa Lumina",
    "Este projeto combina luz natural e design minimalista para criar um espaço elegante e funcional, perfeito para a vida contemporânea.",
  ],
  [
    "./images/background3.jpg",
    "Refúgio das Colinas",
    " Uma casa aconchegante com uma fachada rústica e charmosa, ideal para quem busca conforto e conexão com a natureza",
  ],
  [
    "https://plus.unsplash.com/premium_photo-1677344343928-577750752799?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvbWVzJTIwYXJxdWl0ZXR1cmF8ZW58MHx8MHx8fDA%3D",
    "Mansão Arquetipo",
    "Com uma estrutura arrojada e detalhes arquitetônicos impressionantes, esta residência é um marco de inovação e criatividade.",
  ],
  [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Residência Harmonia",
    "Um espaço que equilibra elementos clássicos e modernos, ideal para famílias que prezam por elegância e conforto.",
  ],
  [
    "https://images.unsplash.com/photo-1685098176312-f61787bd0adf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Casa Aurora",
    "Uma casa iluminada por design, que une funcionalidade e estética em um espaço perfeito para dias tranquilos e noites aconchegantes.",
  ],
];

function ProjetoItem(props) {
  return React.createElement(
    "div",
    { className: "projeto-item" },
    React.createElement("img", { src: props.url, alt: props.lead }, null),
    // React.createElement("h3", null, props.lead || "Lead padrão"),
    // React.createElement("p", null, props.descricao || "Texto padrão")
  );
}

function App({ projeto }) {
  return projeto.map((proj, index) =>
    React.createElement(ProjetoItem, {
      key: index,
      url: proj[0],
      lead: proj[1],
      descricao: proj[2],
    })
  );
}

ReactDOM.render(
  React.createElement(App, { projeto: projetos }),
  document.body.querySelector("#projeto-grid")
);

// React Component for Form
function Forms() {
  return React.createElement(
    "form",
    { className: "form" },
    React.createElement(
      "input",
      { type: "text", name: "name", placeholder: "Nome" },
      null
    ),
    React.createElement(
      "input",
      { type: "email", name: "email", placeholder: "Seu e-mail" },
      null
    ),
    React.createElement(
      "textarea",
      {
        name: "message",
        placeholder: "Mensagem",
        required: true,
        style: { resize: "none", width: "100%", height: "90px" },
      },
      null
    ),
    React.createElement("button", { type: "submit" }, "Enviar")
  );
}

ReactDOM.render(
  React.createElement(Forms),
  document.body.querySelector("#formContainer")
);
