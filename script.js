/* ======= Menú =======*/
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ======= ContactForm =======*/
((d) => {
  const $form = d.querySelector(".contact-form");
  const $loader = d.querySelector(".contact-form-loader");
  const $response = d.querySelector(".contact-form-response");

  function validarForm() {
    const $inputs = d.querySelectorAll(".contact-form [pattern]");

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      $form.insertAdjacentElement("afterbegin", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [pattern]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
        if (!pattern) {
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });
  }

  d.addEventListener("submit", async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      body: new FormData(e.target),
    };

    $loader.classList.remove("none");

    try {
      let res = await fetch(
        "https://formsubmit.co/ajax/angeleduardoch11@gmail.com",
        options
      );

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      location.hash = "#gracias";
      $form.reset();
    } catch (err) {
      console.log(err);
      let message =
        err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
      $response.querySelector(
        "h3"
      ).innerHTML = `Error ${err.status}: ${message}`;
    } finally {
      $loader.classList.add("none");
      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    }
  });

  d.addEventListener("DOMContentLoaded", validarForm);
})(document);

/* ======= Animación Carrusel =======*/
((d) => {
  const $testimonios = d.getElementById("testimonios"),
    $slides = d.querySelector(".carousel .slides");

  const cb = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $slides.classList.add("active");
      } else {
        $slides.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(cb, {
    threshold: [0.5, 0.75],
  });

  observer.observe($testimonios);

  d.addEventListener("click", (e) => {
    if (e.target.matches(".slides-nav label"))
      $slides.classList.remove("active");
  });
})(document);
