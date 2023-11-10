import { getElement } from './utils.js'

const signUpBtn = getElement('.header__sign-up');
const modal = getElement('.modal-signUp');
const closeModal = getElement('.modal__close');
const modalContainer = getElement('.modal-container');
const form = getElement('#register-form');

// open and close modal
signUpBtn.addEventListener('click', () => {
    modal.classList.add('open-modal');
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('open-modal');
})

modal.addEventListener('click', () => {modal.classList.remove('open-modal')})
modalContainer.addEventListener('click', (e) => {e.stopPropagation()})

// validate

function Validator(form) {
    const _this = this; 
    let formRules = {};

    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    const validatorRules = {
        required: function(value) {
            return value ? undefined : 'Please enter this field';
        },
        email: function(value) {
            const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            return regex.test(value) ? undefined : 'Please enter your email!';
        },
        min: function(min) {
            return function (value) {
                return value.length >= min ? undefined : `Please enter at least ${min} characters long`;
            }
        }
    }

    if(form) {
        const inputs = [ ...form.querySelectorAll('[name][rules]')];
        inputs.forEach((input) => {
            const rules = [ ...input.getAttribute('rules').split('|')];
            rules.forEach((rule) => {
                let ruleInfo;
                let isRuleHasValue = rule.includes(':');
                if(isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                let ruleFunc = validatorRules[rule];
                if(isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            })
            // listen event to validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        })
    }

    //function clear error message
    function handleClearError(e) {
        let formGroup = getParent(e.target, '.form__group');
        if(formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');

            let formMessage = formGroup.querySelector('.form__message');
            if(formMessage) {
                formMessage.innerText = '';
            }
        }
    }

    function handleValidate(e) {
        let rules = formRules[e.target.name];
        var errorMessage;

        for(var rule of rules) {
            errorMessage = rule(e.target.value);
            if(errorMessage) break;
        }
        if(errorMessage) {
            let formGroup = getParent(e.target, '.form__group');
            if(formGroup) {
                var formMessage = formGroup.querySelector('.form__message');
                if(formMessage) {
                    formGroup.classList.add('invalid');
                    formMessage.innerText = errorMessage;
                }
            }
        }
        return !errorMessage
    }

    //handle submit form
    form.onsubmit = function(e) {
        e.preventDefault();

        const inputs = [ ...form.querySelectorAll('[name][rules]')];
        let isValid = true;
        for (var input of inputs) {
            if(!handleValidate({ target: input})) {
                isValid = false;
            }
        }
        if (isValid) {
            if(typeof _this.onSubmit === 'function') {
                let enableInputs = [ ...form.querySelectorAll('[name]:not([disabled])')];

                let formValue = enableInputs.reduce((values, input) => {
                    switch (input.type) {
                        case 'radio': 
                            values[input.name] = form.querySelector('input[name"' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if(!input.matches(':checked')) {
                                values[input.name] = [];
                                return values;
                            }
                            if(!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;       
                }, {});
                _this.onSubmit(formValue);
            }
        }
    }
}

var valueForm = new Validator(form);
// get data 
valueForm.onSubmit = function(formdata) {
    alert('Your information was saved!');
    console.log(formdata);
}