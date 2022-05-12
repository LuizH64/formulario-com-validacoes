// Variáveis globais

let entries = [];

const INPUTS = {
    USERNAME: document.getElementById('username'),
    EMAIL: document.getElementById('email'),
    SENHA: document.getElementById('senha'),
    CONFIRMAR_SENHA: document.getElementById('confirmar-senha')
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


// Funções

function debounce(func) {
    let timer;
    return (...args) => {
        if (!timer) func.apply(this, args);

        clearTimeout(timer);
        timer = setTimeout(() => timer = undefined, 1000);
    };
}

const resetForm = () => {
    Object.values(INPUTS).forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('valid');
        input.parentElement.classList.remove('invalid');
    });

    document.getElementById('submit-button').disabled = true;
}

function submitHandler() {
    let form_is_valid = true;

    const new_entry = {
        username: INPUTS.USERNAME.value,
        email: INPUTS.EMAIL.value,
        senha: INPUTS.SENHA.value,
        confirmar_senha: INPUTS.CONFIRMAR_SENHA.value
    };

    if (entries.some(entry => (entry.username === new_entry.username || entry.email === new_entry.email))) {
        form_is_valid = false;
        alert('Nome ou email já cadastrados');
    }

    if (form_is_valid) {
        entries.push(new_entry);
        resetForm();
        alert(`${new_entry.username} foi cadastrado(a) com sucesso :)`);
        console.log(entries);
    }
}

const submitWithDebounce = debounce(submitHandler);

const invalidate = inputDOMElement => {
    inputDOMElement.parentElement.classList.remove('valid');
    inputDOMElement.parentElement.classList.add('invalid');
    document.getElementById('submit-button').disabled = true;
};

const validate = inputDOMElement => {
    inputDOMElement.parentElement.classList.remove('invalid');
    inputDOMElement.parentElement.classList.add('valid');


    const invalid_inputs = document.getElementsByClassName('valid');
    if (invalid_inputs.length === 4) document.getElementById('submit-button').disabled = false;
}

const validateName = () => {
    if (3 < INPUTS.USERNAME.value.length && INPUTS.USERNAME.value.length <= 25) validate(INPUTS.USERNAME);
    else invalidate(INPUTS.USERNAME)
};

const validadeEmail = () => {
    if (EMAIL_REGEX.test(INPUTS.EMAIL.value)) validate(INPUTS.EMAIL)
    else invalidate(INPUTS.EMAIL);
};

const validadePassword = () => {
    if (INPUTS.SENHA.value.length >= 8) {
        validate(INPUTS.SENHA);
        return true;
    } else invalidate(INPUTS.SENHA);
    return false;
};

const validadeConfirmPassword = () => {
    let confirmPasswordIsValid = true;

    if (!validadePassword()) {
        INPUTS.CONFIRMAR_SENHA.parentElement.setAttribute('error-message', 'Senha é fraca demais');
        confirmPasswordIsValid = false;
    } else INPUTS.CONFIRMAR_SENHA.parentElement.setAttribute('error-message', 'As senha não coincidem');

    if (INPUTS.CONFIRMAR_SENHA.value !== INPUTS.SENHA.value) confirmPasswordIsValid = false;

    if (confirmPasswordIsValid) validate(INPUTS.CONFIRMAR_SENHA);
    else invalidate(INPUTS.CONFIRMAR_SENHA);
};

const removeValidationClasses = event => {
    event.target.parentElement.classList.remove('valid');
    event.target.parentElement.classList.remove('invalid');
};