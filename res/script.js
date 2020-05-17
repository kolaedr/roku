data = {
    "accounts": [
        {
            "title": "Matrix 1",
            "img": "./images/user.png"
        },
        {
            "title": "Matrix 2",
            "img": "./images/user.png"
        },
        {
            "title": "Matrix 3",
            "img": "./images/user.png"
        },
    ]
};

function userAccount(data, id = 0) {
    console.log('id :>> ', id);
    let list = '';
    data.forEach((element, index) => {
        list += `<div class="item ${index == 0 && id == 0 ? 'focus' : ''} ${id == index ? 'focus' : ''}" data-id=${index}>
                <img src="${element.img}" alt="" class="user-image">
                <span class="title">${element.title}</span>
            </div>`;
    });

    document.querySelector('.items').innerHTML = list;
}

userAccount(data.accounts);

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            leftPress();
            break;
        case "ArrowRight":
            rightPress();
            break;
        case "ArrowUp":
            upPress();
            break;
        case "ArrowDown":
            downPress();
            break;
        case "Enter":
            enterPress();
            break;
    }
});

var index = 0;

function leftPress() {
    if (document.querySelector('.add-block .btn').classList.contains('focus')) {
        for (const iterator of document.querySelectorAll('.item')) {
            if (iterator.dataset.id === index) {
                iterator.classList.add('focus');
            }
        }
        document.querySelector('.add-block .btn').classList.remove('focus');
    } else {
        for (const iterator of document.querySelectorAll('.item')) {
            if (iterator.classList.contains('focus')) {

                if (iterator.previousElementSibling) {
                    // iterator.previousElementSibling.classList.add('focus');
                    // iterator.remove();

                    // delete data.accounts[iterator.dataset.id];
                    data.accounts.splice(iterator.dataset.id, 1);
                    if (data.accounts.length==1) {
                        userAccount(data.accounts);
                        return;
                    }
                    userAccount(data.accounts, iterator.dataset.id - 1);

                    return;
                } else if (iterator.nextElementSibling) {
                    // iterator.nextElementSibling.classList.add('focus');
                    // iterator.remove();

                    // delete data.accounts[iterator.dataset.id];
                    data.accounts.splice(iterator.dataset.id, 1);
                    userAccount(data.accounts);

                    return;
                } else {
                    // iterator.remove();
                    // delete data.accounts[iterator.dataset.id];
                    data.accounts.splice(iterator.dataset.id, 1);
                    userAccount(data.accounts);
                    document.querySelector('.add-block .btn').classList.add('focus');
                    return;
                }

            }
        }
    }

    if (document.querySelectorAll('.account-add span')[1].classList.contains('focus')) {
        document.querySelectorAll('.account-add span')[1].classList.remove('focus');
        document.querySelectorAll('.account-add span')[0].classList.add('focus');
        index = 0;
    }

}

function rightPress() {
    for (const iterator of document.querySelectorAll('.item')) {
        if (iterator.classList.contains('focus')) {
            index = iterator.dataset.id;
        }
        iterator.classList.remove('focus');
    }
    document.querySelector('.add-block .btn').classList.add('focus');

    if (document.querySelectorAll('.account-add span')[0].classList.contains('focus')) {
        document.querySelectorAll('.account-add span')[0].classList.remove('focus');
        document.querySelectorAll('.account-add span')[1].classList.add('focus');
        index = -1;
    }
}

function upPress() {
    if (!document.querySelectorAll('.item')) {
        document.querySelector('.add-block span').classList.add('focus');
    }

    for (const iterator of document.querySelectorAll('.item')) {
        if (iterator.classList.contains('focus')) {
            iterator.classList.remove('focus');
            if (iterator.previousElementSibling) {
                iterator.previousElementSibling.classList.add('focus');
                return;
            } else {
                iterator.classList.add('focus');
                return;
            }
        }
    }

    if (document.querySelectorAll('.account-add span')[0].classList.contains('focus')) {
        document.querySelectorAll('.account-add span')[0].classList.remove('focus');
        document.querySelector('.account-add input').focus();
    }
    if (document.querySelectorAll('.account-add span')[1].classList.contains('focus')) {
        document.querySelectorAll('.account-add span')[1].classList.remove('focus');
        document.querySelector('.account-add input').focus();
    }

}

function downPress() {
    for (const iterator of document.querySelectorAll('.item')) {
        if (iterator.classList.contains('focus')) {
            iterator.classList.remove('focus');
            if (iterator.nextElementSibling) {
                iterator.nextElementSibling.classList.add('focus');
                return;
            } else {
                iterator.classList.add('focus');
                return;
            }
        }
    }

    if (index != -1) {
        document.querySelectorAll('.account-add span')[0].classList.add('focus');
        // document.querySelectorAll('.account-add span')[1].classList.remove('focus');
        document.querySelector('.account-add input').blur();
        index = 0;
    } else {
        document.querySelectorAll('.account-add span')[1].classList.add('focus');
        document.querySelectorAll('.account-add span')[0].classList.remove('focus');
        document.querySelector('.account-add input').blur();
        
    }
    
    
}

function enterPress(){
    if (document.querySelector('.add-block span').classList.contains('focus')) {
        document.querySelector('.add-block span').classList.remove('focus');
        
        for (const iterator of document.querySelectorAll('main>section')) {
            iterator.classList.toggle('hidden');
        }
        document.querySelector('.account-add input').focus();
    }

    for (const iterator of document.querySelectorAll('.account-add span')) {
        if (iterator.classList.contains('focus')) {
            console.log('object :>> ', iterator.dataset.action);
            let actions = iterator.dataset.action;
            if (actions) {
                this[actions](actions);
            }
            
        }
    }
    
}

function addUser(x){
    alert(x);
    userAccount(data.accounts);
}

function cancel(x){
    alert(x);
    userAccount(data.accounts);
}