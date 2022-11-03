const clients = [];
const register = document.getElementById("register");
const operations = document.querySelector(".card-operation");

let operationRow = 0;

register.addEventListener("click", createRegisterClients);

function createRegisterClients() {
  if (operationRow == 0) {
    const form = constructForm("formRegister", "registerClient(event)");
    // form.setAttribute("onsubmit", "registerClient(event)");

    const titleRegisterForm = createLabel("Cadastro de cliente:");

    const fullnameLabel = createLabel("Nome Completo: ", "fullName");
    const fullnameInput = createInput("fullName", "fullName");

    const cpfLabel = createLabel("CPF:", "cpf");
    const cpfInput = createInput("cpf", "cpf");
    cpfInput.setAttribute("minlength", "11");

    const phoneLabel = createLabel("Celular:", "phone");
    const phoneInput = createInput("phone", "phone", "tel");
    phoneInput.setAttribute("minlength", "10");
    const passwordLabel = createLabel("Senha", "password");
    const passwordInput = createInput("password", "password", "password");

    const confirmPasswordLabel = createLabel("Confirmar senha", "confirmPassword");
    const confirmPasswordInput = createInput("confirmPassword", "confirmPassword", "password");

    const registerBtn = document.createElement("button");
    registerBtn.id = "registerBtn";
    registerBtn.type = "submit";
    registerBtn.innerText = "Cadastrar";

    form.append(
      titleRegisterForm,
      fullnameLabel,
      fullnameInput,
      cpfLabel,
      cpfInput,
      phoneLabel,
      phoneInput,
      passwordLabel,
      passwordInput,
      confirmPasswordLabel,
      confirmPasswordInput,
      registerBtn
    );

    operations.appendChild(form);

    operationRow++;
  }
}

function registerClient(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullName");
  const cpf = document.getElementById("cpf");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem!");
  } else {
    const account = gerarConta();
    const balance = 0;
    const client = { fullname: fullname.value, cpf: cpf.value, phone: phone.value, password: password.value, account, balance };

    clients.push(client);
    alert("Conta " + account + " criada com sucesso!");
    fullname.value = "";
    cpf.value = "";
    phone.value = "";
    password.value = "";
    confirmPassword.value = "";
  }
}

function gerarConta() {
  if (clients.length < 1) {
    return Math.floor(1000 + Math.random() * 90000);
  } else {
    let numeroRepetido = false;
    let numeroaleatorio;
    do {
      numeroRepetido = false;
      numeroaleatorio = Math.floor(Math.random() * 10);
      clients.forEach((element) => {
        if (element.account == numeroaleatorio) {
          numeroRepetido = true;
        }
      });
    } while (numeroRepetido == true);
    return numeroaleatorio;
  }
}

function constructForm(id, fun) {
  const form = document.createElement("form");
  form.id = id;
  form.className = "ativo";
  form.setAttribute("onsubmit", fun);
  return form;
}

function createLabel(text, labelFor) {
  const label = document.createElement("label");
  label.innerText = text;
  label.htmlFor = labelFor;
  return label;
}

function createInput(id, name, type = "text") {
  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type;
  input.setAttribute("required", "true");
  if (input.type == "number") {
    input.setAttribute("min", "1");
  }
  return input;
}
