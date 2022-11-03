const clients = [];
const register = document.getElementById("register");
const deposit = document.getElementById("deposit");
const withdrawal = document.getElementById("withdrawal");
const checkBalance = document.getElementById("checkBalance");
const operations = document.querySelector(".card-operation");
let operationRow = 0;
let operationType = "";

register.addEventListener("click", createRegisterClients);
deposit.addEventListener("click", createDeposit);
withdrawal.addEventListener("click", createWithdrawal);
checkBalance.addEventListener("click", createCheckBalance);

function createRegisterClients() {
  removeOperacaoAnterior();
  if (operationRow == 0) {
    const form = constructForm("formRegister", "registerClient(event)");

    const titleRegisterForm = createLabel("Cadastro de cliente:");

    const fullnameLabel = createLabel("Nome Completo: ", "fullName");
    const fullnameInput = createInput("fullName", "fullName");

    const cpfLabel = createLabel("CPF:", "cpf");
    const cpfInput = createInput("cpf", "cpf");
    cpfInput.setAttribute("minlength", "11");

    const phoneLabel = createLabel("Celular:", "phone");
    const phoneInput = createInput("phone", "phone", "tel");

    phoneInput.setAttribute("minlength", "11");

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
    operationType = form.getAttribute("id");
    operationRow++;
  }
}
function createWithdrawal() {
  removeOperacaoAnterior();
  if (operationRow == 0) {
    const form = constructForm("formWithdrawal", "withdrawalValue(event)");

    const saqueLabel = createLabel("Saque: ");

    const valueWithdrawalLabel = createLabel("Valor do saque:", "valueWithdrawal");
    const valueWithdrawalInput = createInput("valueWithdrawal", "valueWithdrawal", "number");
    valueWithdrawalInput.setAttribute("min", "1");

    const accountLabel = createLabel("Conta do Saque:", "account");
    const accountInput = createInput("account", "account", "number");

    const passwordLabel = createLabel("Senha:", "password");
    const passwordInput = createInput("password", "password", "password");

    const drawaltBtn = document.createElement("button");
    drawaltBtn.id = "withdrawalBtn";
    drawaltBtn.type = "submit";
    drawaltBtn.innerText = "Sacar";

    form.append(saqueLabel, valueWithdrawalLabel, valueWithdrawalInput, accountLabel, accountInput, passwordLabel, passwordInput, drawaltBtn);
    operations.appendChild(form);
    operationType = form.getAttribute("id");
    operationRow++;
  }
}
function createDeposit() {
  removeOperacaoAnterior();
  if (operationRow == 0) {
    const form = constructForm("formDeposit", "depositValue(event)");
    const depositLabel = createLabel("Depósito");

    const valueDepositLabel = createLabel("Valor do depósito:", "valueDeposit");
    const valueDepositInput = createInput("valueDeposit", "valueDeposit", "number");
    valueDepositInput.setAttribute("min", "1");

    const accountLabel = createLabel("Conta do depósito:", "account");
    const accountInput = createInput("account", "account", "number");

    const depositBtn = document.createElement("button");
    depositBtn.id = "depositBtn";
    depositBtn.type = "submit";
    depositBtn.innerText = "Depositar";

    form.append(depositLabel, valueDepositLabel, valueDepositInput, accountLabel, accountInput, depositBtn);
    operations.append(form);
    operationType = form.getAttribute("id");
    operationRow++;
  }
}
function createCheckBalance() {
  removeOperacaoAnterior();
  if (operationRow == 0) {
    const form = constructForm("formCheckBalance", "checkBalanceAccount(event)");

    const consultarSaldoLabel = createLabel("Consultar Saldo: ");

    const accountLabel = createLabel("Conta: ", "account");
    const accountInput = createInput("account", "account", "number");

    const checkBalanceBtn = document.createElement("button");
    checkBalanceBtn.id = "checkBalanceBtn";
    checkBalanceBtn.type = "submit";
    checkBalanceBtn.innerText = "Consultar";

    form.append(consultarSaldoLabel, accountLabel, accountInput, checkBalanceBtn);
    operations.appendChild(form);
    operationType = form.getAttribute("id");
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
function withdrawalValue(event) {
  event.preventDefault();

  const valueWithdrawal = document.getElementById("valueWithdrawal");
  const account = document.getElementById("account");
  const password = document.getElementById("password");

  const confirmAccount = verificaConta(account.value);
  const confirmPassword = verificaSenha(password.value);

  if (confirmAccount && confirmPassword) {
    const accountIndex = retornaIndexAccount(account.value);
    let accountSelect = clients[accountIndex];
    if (accountSelect.balance >= parseFloat(valueWithdrawal.value)) {
      accountSelect.balance -= parseFloat(valueWithdrawal.value);
      alert(`Saque efetuado com sucesso!\nSaldo da conta: ${accountSelect.balance} `);
      valueWithdrawal.value = "";
      account.value = "";
      password.value = "";
    } else {
      alert(`Não foi possível realizar o saque\nSaldo da conta: ${accountSelect.balance}`);
    }
  } else {
    alert("Senha ou conta incorreta!");
  }
}
function depositValue(event) {
  event.preventDefault();

  const valueDeposit = document.getElementById("valueDeposit");
  const account = document.getElementById("account");

  const confirmAccount = verificaConta(account.value);
  if (confirmAccount) {
    const accountIndex = retornaIndexAccount(account.value);
    clients[accountIndex].balance += parseFloat(valueDeposit.value);
    alert(`Depósito de ${valueDeposit.value} realizado com sucesso\nSaldo atual: ${clients[accountIndex].balance}`);
    valueDeposit.value = "";
    account.value = "";
  } else {
    alert("Conta não encontrada!");
  }
}
function checkBalanceAccount(event) {
  event.preventDefault();

  const account = document.getElementById("account");

  const contaVerificada = verificaConta(account.value);

  if (contaVerificada) {
    const accountIndex = retornaIndexAccount(account.value);
    const accountSelect = clients[accountIndex];
    alert("Saldo atual: " + accountSelect.balance);
    account.value = "";
  } else {
    alert("Conta não encontrada!");
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
      numeroaleatorio = Math.floor(1000 + Math.random() * 90000);
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
function removeOperacaoAnterior() {
  if (operationType !== "") {
    const elementoParaRemover = document.querySelector("#" + operationType);
    elementoParaRemover.remove();
    operationRow--;
    operationType = "";
  }
}
function verificaConta(conta) {
  return clients.reduce((acumulador, item) => {
    if (conta == item.account) {
      acumulador += "true";
      return acumulador;
    }
  }, "");
}
function verificaSenha(conta) {
  return clients.reduce((acumulador, item) => {
    if (conta == item.password) {
      acumulador += "true";
      return acumulador;
    }
  }, "");
}
function retornaIndexAccount(conta) {
  return clients.reduce((valor, item, arr) => {
    if (conta == item.account) {
      return arr;
    }
  }, "");
}
