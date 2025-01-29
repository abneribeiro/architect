let currentTabIndex = 0;
const tabIds = [
  "visao",
  "abordagem",
  "equipe",
  "sustentabilidade",
  "portfolio",
  "convite",
];
let intervalId;

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");
  const navLinkItems = document.querySelectorAll(".nav-links a");

  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });

  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburgerMenu.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });

  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  function showNextImage() {
    carouselItems[currentIndex].classList.remove("active");
    carouselItems[currentIndex].style.animation = "slideLeft 1s forwards";
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add("active");
    carouselItems[currentIndex].style.animation = "none";
    carouselItems[currentIndex].offsetHeight;
    carouselItems[currentIndex].style.animation = null;

    setTimeout(() => {
      carouselItems.forEach((item, index) => {
        if (index !== currentIndex) {
          item.style.animation = "none";
        }
      });
    }, 400);
  }

  setInterval(showNextImage, 2000);

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

  const fadeInElements = document.querySelectorAll(
    ".projetos, .sobre, .contato"
  );

  function checkFade() {
    fadeInElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", checkFade);
  checkFade();

  const projetoItems = document.querySelectorAll(".projeto-item");
  projetoItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const [url, title, description] = projetos[index];
      openModal(url, title, description);
    });
  });
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
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

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  function showTab(index) {
    const tabId = tabIds[index];
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    const selectedTab = document.getElementById(tabId);
    const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);

    if (selectedTab && selectedButton) {
      selectedTab.classList.add("active");
      selectedButton.classList.add("active");
    }
    currentTabIndex = index;
  }

  function rotateTab() {
    currentTabIndex = (currentTabIndex + 1) % tabIds.length;
    showTab(currentTabIndex);
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      showTab(index);
      clearInterval(intervalId);
      startRotation();
    });
  });

  function startRotation() {
    clearInterval(intervalId);
    intervalId = setInterval(rotateTab, 5000); // Muda a cada 5 segundos
  }

  startRotation();

  showTab(0);

  const dropdownLinks = document.querySelectorAll(".dropdown-content a");

  // Adiciona evento de clique aos links do dropdown
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita o comportamento padrão do link
      const targetId = this.getAttribute("href").substring(1); // Obtém o ID da tab
      const tabIndex = tabIds.indexOf(targetId); // Localiza o índice do ID na lista tabIds

      if (tabIndex !== -1) {
        showTab(tabIndex); // Exibe a tab correspondente
        clearInterval(intervalId); // Para a rotação automática
        startRotation(); // Reinicia a rotação automática
      }
    });
  });
});

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const projectsCompleted = document.getElementById("projects-completed");
const clientsSatisfied = document.getElementById("clients-satisfied");
const yearsExperience = document.getElementById("years-experience");

function checkCounters() {
  const countersTop = document
    .querySelector(".counters")
    .getBoundingClientRect().top;
  if (countersTop < window.innerHeight) {
    animateValue(projectsCompleted, 0, 150, 3000);
    animateValue(clientsSatisfied, 0, 200, 3000);
    animateValue(yearsExperience, 0, 15, 3000);
    window.removeEventListener("scroll", checkCounters);
  }
}

window.addEventListener("scroll", checkCounters);

const revealImages = () => {
  const images = document.querySelectorAll(".projeto-item img");
  images.forEach((img) => {
    const imgTop = img.getBoundingClientRect().top;
    if (imgTop < window.innerHeight - 100) {
      img.style.opacity = "1";
      img.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", revealImages);
revealImages();

function updateDateTime() {
  const now = new Date();
  const datetimeElement = document.getElementById("datetime");
  datetimeElement.textContent = now.toLocaleString();
}

setInterval(updateDateTime, 1000);
updateDateTime();

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
  document.body.style.overflow = "hidden";
}

("use strict");

const projetos = [
  [
    "images/photo3.webp",
    "Campo Tradicional",
    "Uma encantadora casa colonial com um design acolhedor e detalhes clássicos. Cercada por um jardim repleto de árvores maduras, a estrutura é destacada pelo telhado inclinado e molduras vermelhas que conferem personalidade ao espaço.",
  ],
  [
    "images/photo2.webp",
    "Transparência Moderna",
    "Esta casa moderna é marcada por suas amplas fachadas de vidro, permitindo a integração harmoniosa entre os ambientes internos e a paisagem externa. Iluminação arquitetônica valoriza o design minimalista e clean.",
  ],
  [
    "images/photo4.webp",
    "Elegância Industrial",
    "Um projeto moderno para ambientes corporativos, com divisórias de vidro e acabamentos industriais. Este espaço prioriza iluminação natural e funcionalidade, ideal para empresas inovadoras.",
  ],
  [
    "images/photo7.webp",
    "Refúgio Sustentável",
    "Construída com materiais ecológicos, esta casa contemporânea combina elegância e sustentabilidade. O design inteligente privilegia espaços abertos e uma integração perfeita com a natureza ao redor.",
  ],
  [
    "images/photo6.webp",
    "Retiro ao Ar Livre",
    " Uma casa ideal para momentos de lazer e socialização, com espaços abertos que se conectam a um amplo terraço de madeira. Ambientes iluminados e bem ventilados destacam o estilo praiano moderno.",
  ],
  [
    "images/photo1.webp",
    "Sofisticação Clássica",
    "Uma residência de estilo clássico com detalhes modernos, como janelas amplas e um acabamento impecável. O design acolhedor é complementado por um belo jardim frontal.",
  ],
];

function ProjetoItem(props) {
  return React.createElement(
    "div",
    {
      className: "projeto-item",
      onClick: () => openModal(props.url, props.lead, props.descricao),
    },
    [
      React.createElement(
        "img",
        { src: props.url, alt: props.lead, key: `img-${props.lead}` },
        null
      ),
      React.createElement(
        "div",
        { key: `div-${props.lead}` },
        React.createElement(
          "h2",
          { className: "projeto-item-title" },
          props.lead
        )
      ),
    ]
  );
}

function App({ projeto }) {
  return projeto.map((proj, index) =>
    React.createElement(ProjetoItem, {
      key: `projeto-${index}`,
      id: `projeto-${index}`,
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
class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      reason: "",
      email: "",
      phone: "",
      message: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  validateForm() {
    const { name, reason, email, phone, message } = this.state;
    const errors = {};

    if (!name) errors.name = "Nome é obrigatório";
    if (!reason) errors.reason = "Motivo de Contacto é obrigatório";
    if (!email) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "E-mail inválido";
    }
    if (!phone) {
      errors.phone = "Telefone é obrigatório";
    } else if (!/^\+351\d{9}$/.test(phone) && !/^\d{9}$/.test(phone)) {
      errors.phone =
        "Número de telefone inválido. O número deve ter 9 dígitos (com ou sem +351).";
    }
      
    if (!message) errors.message = "Mensagem é obrigatória";

    this.setState({ errors });
    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = this.validateForm();

    const submitButton = document.querySelector('button[type="submit"]');

    if (Object.keys(errors).length > 0) {
      // Exibir os erros no alerta
      alert(
        "Erros encontrados no formulário:\n" + Object.values(errors).join("\n")
      );
    } else {
      submitButton.innerHTML = '<span class="loading"></span> Enviando...';
      submitButton.disabled = true;

      setTimeout(() => {
        const { name, reason, email, phone, message } = this.state;
        const formData = { name, reason, email, phone, message };
        localStorage.setItem("contactForm", JSON.stringify(formData));
        submitButton.innerHTML = "Enviado com sucesso!";
        submitButton.style.backgroundColor = "#4CAF50";

        setTimeout(() => {
          submitButton.innerHTML = "Enviar Mensagem";
          submitButton.disabled = false;
          submitButton.style.backgroundColor = "";
          this.setState({
            name: "",
            reason: "",
            email: "",
            phone: "",
            message: "",
            errors: {},
          });
        }, 3000);
      }, 2000);
    }
  }

  render() {
    const { errors } = this.state;
    return React.createElement(
      "form",
      { className: "form", onSubmit: this.handleSubmit },
      React.createElement(
        "div",
        null,
        React.createElement("input", {
          type: "text",
          name: "name",
          placeholder: "Nome",
          value: this.state.name,
          onChange: this.handleChange,
        }),
        errors.name &&
          React.createElement("span", { className: "error" }, errors.name)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("input", {
          type: "text",
          name: "reason",
          placeholder: "Motivo de Contacto",
          value: this.state.reason,
          onChange: this.handleChange,
        }),
        errors.reason &&
          React.createElement("span", { className: "error" }, errors.reason)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("input", {
          type: "email",
          name: "email",
          placeholder: "Seu e-mail",
          value: this.state.email,
          onChange: this.handleChange,
        }),
        errors.email &&
          React.createElement("span", { className: "error" }, errors.email)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("input", {
          type: "tel",
          name: "phone",
          placeholder: "Telefone",
          value: this.state.phone,
          onChange: this.handleChange,
        }),
        errors.phone &&
          React.createElement("span", { className: "error" }, errors.phone)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("textarea", {
          name: "message",
          placeholder: "Mensagem",
          required: true,
          style: { resize: "none", width: "100%", height: "90px" },
          value: this.state.message,
          onChange: this.handleChange,
        }),
        errors.message &&
          React.createElement("span", { className: "error" }, errors.message)
      ),
      React.createElement("button", { type: "submit" }, "Enviar")
    );
  }
}

ReactDOM.render(
  React.createElement(Forms),
  document.body.querySelector("#formContainer")
);
