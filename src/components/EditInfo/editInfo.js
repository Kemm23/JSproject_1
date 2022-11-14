function Validator(formSelector) {
    var _this = this
    var formElement = document.querySelector(formSelector)
    var formRules = {}
    const users = JSON.parse(localStorage.getItem("users")) || []
//     const users = [
//     {firstname: "Pham", lastname: "Hoang", username: "Kem", password: "123", login: false, isEditing: false},
//     {firstname: "Viet", lastname: "Anh", username: "Yasuo", password: "123", login: false, isEditing: false},
//     {firstname: "Tuan", lastname: "Anh", username: "Yone", password: "123", login: false, isEditing: false},
//     {firstname: "Hong", lastname: "Nhi", username: "Cat", password: "123", login: true},
//     {firstname: "Van", lastname: "Anh", username: "Stranger", password: "123", login: false, isEditing: true},
//     {firstname: "Bich", lastname: "Phuong", username: "Idol", password: "123", login: false, isEditing: false},
//     {firstname: "Le", lastname: "Hai", username: "Owner", password: "123", login: false, isEditing: false},
// ]
    const editUser = users.filter(user => {
        return user.isEditing
    })
    /*Quy ước tạo rules:
    -Nếu có lỗi thì return message lỗi 
    -Nếu không có lỗi thì return undefined
    */
    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }
    function handleValidate(event) {
        let inputElement = event.target
        let parentElement = getParent(inputElement, '.form-group')
        let errorElement = parentElement.querySelector('.form-message')
        let errorMessage
        for(var rule of formRules[event.target.name]) {
            if(rule(event.target.value)) {
                errorMessage = rule(event.target.value)
                break
            }
        }
        if(errorMessage) {
            parentElement.classList.add('invalid')
            errorElement.innerText = errorMessage
        } else {
            parentElement.classList.remove('invalid')
            errorElement.innerText = ""
        }
        return Boolean(errorMessage)
    }

    function getDataUserEdit() {
        let enableInput = formElement.querySelectorAll('[name]:not(meta)')
        Array.from(enableInput).map((input, index) => {
            input.value = editUser[0][Object.keys(editUser[0])[index]]
        })
    }

    function handleEditUser() {
        let enableInput = formElement.querySelectorAll('[name]:not(meta)')
        Array.from(enableInput).map((input, index) => {
            editUser[0][Object.keys(editUser[0])[index]] = input.value 
        })
        const newUser = users.map(user => {
            if(user.isEditing) {
                return {...editUser[0], isEditing: false}
            } 
            return user
        })
        localStorage.setItem("users", JSON.stringify(newUser))
        return true
    }

    var validatorRules = {
        required(value) {
            return value ? undefined : 'Vui long nhap truong nay'
        },
        checked(value) {
            return !users.some(user => user.username === value) || editUser[0].username === value ? undefined : 'Da ton tai username'
        }
    } 
    
    if(formElement) {
        getDataUserEdit()
        var inputs = formElement.querySelectorAll('[name][rules]')
        for(var input of inputs) {
            input.getAttribute('rules').replace(/\s/gi, '').split('|').forEach(inputRule => {
                var isRuleArray = inputRule
                if(inputRule.includes(':')) {
                    inputRule = inputRule.split(':')
                    isRuleArray =  inputRule[0] 
                    validatorRules[isRuleArray] = validatorRules[isRuleArray](inputRule[1])
                }
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(validatorRules[isRuleArray])
                } else {
                    formRules[input.name] = [validatorRules[isRuleArray]]
                }
            })
            input.onblur = handleValidate;
            input.oninput = handleValidate;
        } 
        formElement.onsubmit = function(event) {
            event.preventDefault()
            let isValid = true
            for(var input of inputs) { 
                if(handleValidate({
                    target: input
                })) {
                    isValid = false
                }
            }
            if(isValid) {
                if(typeof _this.onsubmit  === 'function') {
                    if (handleEditUser()) {
                        _this.onsubmit()
                    } 
                } else {
                    formElement.submit()
                }
            }
        }
    }
}