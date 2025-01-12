const init = async () => {

  //
  function toggleEditMode() {
    const inputs = document.querySelectorAll('input, textarea');
    const isEditable = inputs[0].disabled;

    // Переключаем состояние полей
    inputs.forEach((input) => {
      input.disabled = !isEditable;
    });

    // Обновляем текст кнопки
    const editButton = document.querySelector('.button--edit');
    editButton.innerHTML = isEditable
      ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path d="M48 96l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-245.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l245.5 0c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8L320 184c0 13.3-10.7 24-24 24l-192 0c-13.3 0-24-10.7-24-24L80 80 64 80c-8.8 0-16 7.2-16 16zm80-16l0 80 144 0 0-80L128 80zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" fill="#7F7F7F"/></svg> Сохранить'
      : `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M10.7618 1.08709C10.9327 0.916163 11.1356 0.780578 11.359 0.688073C11.5823 0.595569 11.8217 0.547958 12.0634 0.547958C12.3051 0.547958 12.5445 0.595569 12.7678 0.688073C12.9911 0.780578 13.194 0.916163 13.365 1.08709C13.5359 1.25801 13.6715 1.46093 13.764 1.68426C13.8565 1.90758 13.9041 2.14694 13.9041 2.38866C13.9041 2.63039 13.8565 2.86974 13.764 3.09307C13.6715 3.31639 13.5359 3.51931 13.365 3.69024L4.57933 12.4759L1 13.452L1.97618 9.87271L10.7618 1.08709Z" stroke="#7F7F7F" stroke-width="0.976181" stroke-linecap="round" stroke-linejoin="round"/>
     </svg> Редактировать`;

    if (!isEditable) {
      alert('Данные сохранены!'); // Для примера
    }
  }

  window.toggleEditMode = toggleEditMode;

  //

  // Burger Menu Open //
  let registrBtn = document.getElementById("registrBtn");
  let registrMethod = document.querySelector(".registration__method");

  if (registrBtn && registrMethod) {
    registrBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      registrMethod.classList.toggle("active");
    });

    document.addEventListener("click", event => {
      if (!registrMethod.contains(event.target) && event.target !== registrBtn) {
        registrMethod.classList.remove("active");
      }
    });
  }
  // Burger Menu Open //

  // Fixed Header //
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");

  if (header && main) {
    const headerH = header.offsetHeight; // Получаем высоту хедера
    const checkScroll = (scrollOffset) => {
      if (scrollOffset >= headerH) {
        header.classList.add("fixed");
        main.style.paddingTop = `${headerH}px`; // Устанавливаем верхний отступ
      } else {
        header.classList.remove("fixed");
        main.style.paddingTop = `0`; // Убираем верхний отступ
      }
    };

    let scrollOffset = window.scrollY; // Начальное значение прокрутки
    checkScroll(scrollOffset);

    window.addEventListener("scroll", () => {
      scrollOffset = window.scrollY;
      checkScroll(scrollOffset);
    });
  }
  // Fixed Header //

  //news tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.authorization__block').forEach(block => {
        block.classList.toggle('active', block.dataset.category === category);
      });
    });
  });
  //news tabs

  //modal
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");
  const modalLinks = document.querySelectorAll('a[href^="#"]');
  const body = document.body;

  // Функция для открытия модального окна
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      body.classList.add("lock"); // Блокируем прокрутку
    }
  }

  // Функция для закрытия модального окна
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("active");
      body.classList.remove("lock"); // Снимаем блокировку прокрутки
    }
  }

  // Закрытие модальных окон при клике на крестик
  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      closeModal(modal);
    });
  });

  // Закрытие модального окна при клике вне его содержимого
  window.addEventListener("click", function (e) {
    modals.forEach(modal => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Обработчик кликов по ссылкам
  modalLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Предотвратить стандартное поведение (прокрутку к якорю)
      const modalId = this.getAttribute("href").substring(1); // Получаем ID из ссылки
      openModal(modalId);
    });
  });

  //modal

  
  // validation
  const inputs = document.querySelectorAll('input, select, textarea');

  // Добавляем обработчики событий для каждого элемента
  inputs.forEach((element) => {
    const eventType = element.type === "checkbox" || element.tagName === "SELECT" || element.type === "radio" ? "change" : "input";
    element.addEventListener(eventType, (event) => validateInput(event.target));
  });

  function validateInput(element) {


    let isValid = true;
    const error = element.nextElementSibling;

    if (!error) {
      console.warn(`Не найден элемент для отображения ошибок для ${element.id}`);
      return;
    }

    // Email validation
    if (element.type === 'email') {
      if (!element.value || !/^[a-z0-9\.-]+@[a-z0-9_\.-]+\.[a-z]{2,}$/.test(element.value)) {
        isValid = false;
        element.classList.add('error');
        error.textContent = 'Введите корректный e-mail';
      } else {
        element.classList.remove('error');
        element.classList.add('verified');
        error.textContent = '';
      }
    }

    // Phone validation
    if (element.type === 'tel') {
      if (!element.value || !/^\+?[0-9]{10,15}$/.test(element.value)) {
        isValid = false;
        element.classList.add('error');
        error.textContent = 'Введите корректный номер телефона';
      } else {
        element.classList.remove('error');
        element.classList.add('verified');
        error.textContent = '';
      }
    }

    // Password validation
    if (element.type === 'password') {
      if (!element.value || element.value.length < 6) {
        isValid = false;
        element.classList.add('error');
        error.textContent = 'Пожалуйста, заполните поле';
      } else {
        element.classList.remove('error');
        element.classList.add('verified');
        error.textContent = '';
      }
    }

    // Validate confirm password only if password is valid
    const password = document.querySelector('[data-validate="password"]');
    const confirmPassword = document.querySelector('[data-validate="confirm-password"]');
    const errorConfirm = confirmPassword.nextElementSibling;
    if (confirmPassword && confirmPassword.value !== password.value) {
      isValid = false;
      confirmPassword.classList.add('error');
      errorConfirm.textContent = 'Пароли не совпадают';
    } else {
      confirmPassword.classList.remove('error');
      confirmPassword.classList.remove('verified');
      errorConfirm.textContent = '';
    }

    // Text input validation
    if (element.type === 'text') {
      if (element.value.length < 2 || !/^[A-Za-zА-Яа-я ]+$/.test(element.value)) {
        isValid = false;
        element.classList.add('error');
        error.textContent = 'Пожалуйста, заполните поле';
      } else {
        element.classList.remove('error');
        element.classList.add('verified');
        error.textContent = '';
      }
    }

    // Select validation
    if (element.tagName === 'SELECT') {
      if (!element.value) {
        isValid = false;
        element.classList.add('error');
        error.textContent = 'Пожалуйста, выберите значение';
      } else {
        element.classList.remove('error');
        element.classList.add('verified');
        error.textContent = '';
      }
    }
  }
  // validation

  // select
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("UL");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("LI");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
  // select
};


//
async function generatePDF() {
  const { jsPDF } = window.jspdf;

  const element = document.getElementById('primary');
  const canvas = await html2canvas(element);

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgWidth = 190; // Ширина изображения в PDF (в мм)
  const pageHeight = 297; // Высота страницы PDF (в мм)
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  pdf.save('page.pdf'); // Сохранение файла
}
//

window.onload = init;

