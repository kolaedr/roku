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
        {
            "title": "Matrix 4",
            "img": "./images/user.png"
        },
        {
            "title": "Matrix 5",
            "img": "./images/user.png"
        },
        {
            "title": "Matrix 6",
            "img": "./images/user.png"
        }
    ]
};

//render users list
function LoadUserAccounts(data, id = 0) {
    let list = '';
    data.forEach((element, index) => {
        let hasFocus = (index == 0 && id == 0) || id == index;
        list += `<div class="item${hasFocus ? ' focus' : ''} " data-id=${index}>
                    <img src="${element.img}" alt="" class="user-image">
                    <span class="title">${element.title}</span>
                </div>`;
    });
    if (list) {
        document.querySelector('.items').innerHTML = list;
    }else{
        document.querySelector('.items').innerHTML = 'No users';
    }
    
    // document.querySelector('.items').scrollTo(0, 0);
    if (data.length!=0) {
        scroll();
    }
    
}

LoadUserAccounts(data.accounts);

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
var index_adding = 0;

function leftPress() {

    if (!document.querySelector('.account-list').classList.contains('hidden')) {
        if (document.querySelector('span[data-action=newUser]').classList.contains('focus')) {
            for (const iterator of document.querySelectorAll('.item')) {
                if (iterator.dataset.id === index) {
                    iterator.classList.add('focus');
                }
            }
            document.querySelector('span[data-action=newUser]').classList.remove('focus');
        }
    }

    if (!document.querySelector('.account-add').classList.contains('hidden')) {
        for (const iterator of document.querySelectorAll('.item')) {
            if (iterator.classList.contains('focus')) {
                if (iterator.previousElementSibling) {
                    data.accounts.splice(iterator.dataset.id, 1);
                    LoadUserAccounts(data.accounts, iterator.dataset.id - 1);
                    return;
                } else if (iterator.nextElementSibling) {
                    data.accounts.splice(iterator.dataset.id, 1);
                    LoadUserAccounts(data.accounts);
                    return;
                } else {
                    data.accounts.splice(iterator.dataset.id, 1);
                    LoadUserAccounts(data.accounts);
                    document.querySelector('span[data-action=newUser]').classList.add('focus');
                    return;
                }

            }
        }
    }

    if (document.querySelectorAll('.account-add span')[1].classList.contains('focus')) {
        document.querySelectorAll('.account-add span')[1].classList.remove('focus');
        document.querySelectorAll('.account-add span')[0].classList.add('focus');
        index_adding = 0;
    }

}

function rightPress() {
    for (const iterator of document.querySelectorAll('.item')) {
        if (iterator.classList.contains('focus')) {
            index = iterator.dataset.id;
        }
        iterator.classList.remove('focus');
    }
    if (!document.querySelector('.account-list').classList.contains('hidden')) {
        document.querySelector('.add-block .btn').classList.add('focus');
    }

    if (document.querySelectorAll('.account-add span')[0].classList.contains('focus')) {
        document.querySelectorAll('.account-add span')[0].classList.remove('focus');
        document.querySelectorAll('.account-add span')[1].classList.add('focus');
        index_adding = -1;
    }
}

function upPress() {
    if (!document.querySelectorAll('.item')) {
        document.querySelector('.add-block span').classList.add('focus');
    }

    if (!document.querySelector('.add-block span').classList.contains('focus')) {
        for (const iterator of document.querySelectorAll('.item')) {
            if (iterator.classList.contains('focus')) {
                iterator.classList.remove('focus');
                if (iterator.previousElementSibling) {
                    iterator.previousElementSibling.classList.add('focus');
                    scroll('down');
                    return;
                } else {
                    iterator.classList.add('focus');
                    scroll('down');
                    return;
                }
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
    if (!document.querySelector('.add-block span').classList.contains('focus')) {
        for (const iterator of document.querySelectorAll('.item')) {
            if (iterator.classList.contains('focus')) {
                iterator.classList.remove('focus');
                if (iterator.nextElementSibling) {
                    iterator.nextElementSibling.classList.add('focus');
                    scroll('up');
                    return;
                } else {
                    iterator.classList.add('focus');
                    scroll('up');
                    return;
                }
            }
        }
    }

    if (index_adding != -1) {
        document.querySelectorAll('.account-add span')[0].classList.add('focus');
        document.querySelectorAll('.account-add span')[1].classList.remove('focus');
        document.querySelector('.account-add input').blur();
        index_adding = 0;
    } else {
        document.querySelectorAll('.account-add span')[1].classList.add('focus');
        document.querySelectorAll('.account-add span')[0].classList.remove('focus');
        document.querySelector('.account-add input').blur();

    }


}

function enterPress() {
    for (const iterator of document.querySelectorAll('span[data-action]')) {
        if (iterator.classList.contains('focus')) {
            let actions = iterator.dataset.action;
            if (actions) {
                this[actions]();
                return;
            }
        }
    }
}

function newUser() {
    clear();
    document.querySelector('.account-add input').focus();
}

function addUser() {
    if (document.querySelector('.account-add input').value) {
        let newUser = {
            "title": document.querySelector('.account-add input').value,
            "img": "./images/user.png"
        };
        data.accounts.push(newUser);
        clear();
        LoadUserAccounts(data.accounts);
    } else {
        alert('Put name');
        document.querySelector('span[data-action=addUser]').classList.remove('focus');
        document.querySelector('.account-add input').focus();
    }


}

function cancel() {
    clear();
    LoadUserAccounts(data.accounts);
    index_adding = 0;
}

function clear() {
    for (const iterator of document.querySelectorAll('span[data-action]')) {
        iterator.classList.remove('focus');
    }
    for (const iterator of document.querySelectorAll('.item')) {
        iterator.classList.remove('focus');
    }
    for (const iterator of document.querySelectorAll('main>section')) {
        iterator.classList.toggle('hidden');
    }
    document.querySelector('.account-add input').value = '';
}

function scroll(direction) {
    let itemsTop = document.querySelector('.items').getBoundingClientRect().y;
    let itemHeight = document.querySelectorAll('.item')[0].getBoundingClientRect().height;
    let itemTop, item;
    for (const iterator of document.querySelectorAll('.item')) {
        if (iterator.classList.contains('focus')) {
            itemTop = iterator.getBoundingClientRect().y;
            item = iterator.offsetTop;
        }
    }
    switch (direction) {
        case "up":
            document.querySelector('.items').scrollTo({
                top: item-itemsTop-itemHeight,
                left: 0,
                behavior: 'smooth'
            });
            break;
        case "down":
            document.querySelector('.items').scrollTo({
                top: item-itemsTop-itemHeight,
                left: 0,
                behavior: 'smooth'
            });
            break;
        default:
            document.querySelector('.items').scrollTo({
                top: item-itemsTop-itemHeight,
                left: 0,
                behavior: 'smooth'
            });
            break;
    }
}
