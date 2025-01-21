let currentTabIndex = 0;
const tabIds = ['visao', 'abordagem', 'equipe', 'sustentabilidade', 'portfolio', 'convite'];
let intervalId;


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

  const form = document.getElementById("formContainer");



  

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


  const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(index) {
        const tabId = tabIds[index];
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        const selectedTab = document.getElementById(tabId);
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);

        if (selectedTab && selectedButton) {
            selectedTab.classList.add('active');
            selectedButton.classList.add('active');
        }
        currentTabIndex = index;
    }

    function rotateTab() {
        currentTabIndex = (currentTabIndex + 1) % tabIds.length;
        showTab(currentTabIndex);
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
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
  const datetimeElement = document.getElementById('datetime');
  datetimeElement.textContent = now.toLocaleString();
}

setInterval(updateDateTime, 1000);
updateDateTime();




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
    { className: "projeto-item", onClick: () => openModal(props.url, props.lead, props.descricao) },
    [
      React.createElement("img", { src: props.url, alt: props.lead, key: `img-${props.lead}` }, null),
      React.createElement(
        "div",
        { key: `div-${props.lead}` },
        React.createElement("h2", { className: "projeto-item-title" }, props.lead) // Não usa mais props.key
      )
    ]
  );
}

function App({ projeto }) {
  return projeto.map((proj, index) =>
    React.createElement(ProjetoItem, {
      key: `projeto-${index}`, // Key para React
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
      name: '',
      reason: '', 
      email: '',
      phone: '',
      message: '',
      errors: {}
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

    if (!name) errors.name = 'Nome é obrigatório';
    if (!reason) errors.reason = 'Motivo de Contacto é obrigatório';
    if (!email) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'E-mail inválido';
    }
    if (!phone) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!/^\d{10,15}$/.test(phone)) {
      errors.phone = 'Telefone inválido (apenas números com 10 a 15 dígitos são aceitos)';
    }
    if (!message) errors.message = 'Mensagem é obrigatória';

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
        'Erros encontrados no formulário:\n' +
        Object.values(errors).join('\n')
      );
    } else {
      submitButton.innerHTML = '<span class="loading"></span> Enviando...';
      submitButton.disabled = true;

      setTimeout(() => {
        const { name, reason, email, phone, message } = this.state;
        const formData = { name, reason, email, phone, message };
        localStorage.setItem('contactForm', JSON.stringify(formData));
        submitButton.innerHTML = "Enviado com sucesso!";
        submitButton.style.backgroundColor = "#4CAF50";

        setTimeout(() => {
          submitButton.innerHTML = "Enviar Mensagem";
          submitButton.disabled = false;
          submitButton.style.backgroundColor = "";
          this.setState({
            name: '',
            reason: '',
            email: '',
            phone: '',
            message: '',
            errors: {}
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
        React.createElement("input", { type: "text", name: "name", placeholder: "Nome", value: this.state.name, onChange: this.handleChange }),
        errors.name && React.createElement("span", { className: "error" }, errors.name)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("input", { type: "text", name: "reason", placeholder: "Motivo de Contacto", value: this.state.reason, onChange: this.handleChange }),
        errors.reason && React.createElement("span", { className: "error" }, errors.reason)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("input", { type: "email", name: "email", placeholder: "Seu e-mail", value: this.state.email, onChange: this.handleChange }),
        errors.email && React.createElement("span", { className: "error" }, errors.email)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("input", { type: "tel", name: "phone", placeholder: "Telefone", value: this.state.phone, onChange: this.handleChange }),
        errors.phone && React.createElement("span", { className: "error" }, errors.phone)
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
        errors.message && React.createElement("span", { className: "error" }, errors.message)
      ),
      React.createElement("button", { type: "submit" }, "Enviar")
    );
  }
}

ReactDOM.render(
  React.createElement(Forms),
  document.body.querySelector("#formContainer")
);
