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

let itemList;
let isActivItem = 0;
let isActivButton = true;
let newUserButton = document.querySelector('span[data-action=newUser]');
let addUserButton = document.querySelector('span[data-action=addUser]');
let cancelButton = document.querySelector('span[data-action=cancel]');
let buttonList = document.querySelectorAll('span[data-action]');
let screenList = document.querySelectorAll('main>section');
let screenOne = document.querySelector('.account-list');
let screenTwo = document.querySelector('.account-add');
let items = document.querySelector('.items');
let addNewAccountInput = document.querySelector('.account-add input');

//render accounts list
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
        items.innerHTML = list;
        itemList = document.querySelectorAll('.item');
    } else {
        items.innerHTML = '<h4>No accounts</h4>';
    }
    if (data.length != 0) {
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




function leftPress() {
    //screen 1
    if (!screenOne.classList.contains('hidden')) {
        if (newUserButton.classList.contains('focus')) {
            for (const iterator of itemList) {
                if (iterator.dataset.id === isActivItem) {
                    iterator.classList.add('focus');
                }
            }
            newUserButton.classList.remove('focus');
        } else {
            for (const iterator of itemList) {
                if (iterator.classList.contains('focus')) {
                    if (iterator.dataset.id > 0) {
                        data.accounts.splice(iterator.dataset.id, 1);
                        LoadUserAccounts(data.accounts, iterator.dataset.id - 1);
                        return;
                    } else {
                        data.accounts.splice(iterator.dataset.id, 1);
                        LoadUserAccounts(data.accounts);
                        if (data.accounts.length === 0) {
                            newUserButton.classList.add('focus');
                        }
                        return;
                    }
                }
            }
        }

    }
    //screen 2
    if (!screenTwo.classList.contains('hidden')) {
        if (cancelButton.classList.contains('focus')) {
            cancelButton.classList.remove('focus');
            addUserButton.classList.add('focus');
            isActivButton = true;
        }
    }



}

function rightPress() {
    //screen 1
    if (!screenOne.classList.contains('hidden')) {
        for (const iterator of itemList) {
            if (iterator.classList.contains('focus')) {
                isActivItem = iterator.dataset.id;
            }
            iterator.classList.remove('focus');
        }
        newUserButton.classList.add('focus');
    }
    //screen 2
    if (!screenTwo.classList.contains('hidden')) {
        if (addUserButton.classList.contains('focus')) {
            addUserButton.classList.remove('focus');
            cancelButton.classList.add('focus');
            isActivButton = false;
        }
    }

}

function upPress() {
    //screen 1
    if (!screenOne.classList.contains('hidden')) {
        if (!newUserButton.classList.contains('focus')) {
            for (const iterator of itemList) {
                if (iterator.classList.contains('focus') && iterator.previousElementSibling) {
                    iterator.classList.remove('focus');
                    iterator.previousElementSibling.classList.add('focus');
                    scroll();
                    return;
                }
            }
        }
    }
    //screen 2
    if (!screenTwo.classList.contains('hidden')) {
        if (addUserButton.classList.contains('focus')) {
            addUserButton.classList.remove('focus');
        }

        if (cancelButton.classList.contains('focus')) {
            cancelButton.classList.remove('focus');
        }

        addNewAccountInput.focus();
    }


}

function downPress() {
    //screen 1
    if (!screenOne.classList.contains('hidden')) {
        if (!newUserButton.classList.contains('focus')) {
            for (const iterator of itemList) {
                if (iterator.classList.contains('focus') && iterator.nextElementSibling) {
                    iterator.classList.remove('focus');
                    iterator.nextElementSibling.classList.add('focus');
                    scroll();
                    return;
                }
            }
        }
    }
    //screen 2
    if (!screenTwo.classList.contains('hidden')) {
        if (isActivButton) {
            addUserButton.classList.add('focus');
            cancelButton.classList.remove('focus');
            isActivButton = true;
        } else {
            cancelButton.classList.add('focus');
            addUserButton.classList.remove('focus');
        }

        addNewAccountInput.blur();
    }
}

function enterPress() {
    for (const iterator of buttonList) {
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
    addNewAccountInput.focus();
}

function addUser() {
    if (addNewAccountInput.value) {
        let newUser = {
            "title": addNewAccountInput.value,
            "img": "./images/user.png"
        };
        data.accounts.push(newUser);
        clear();
        LoadUserAccounts(data.accounts);
    } else {
        alert('Enter name');
        addUserButton.classList.remove('focus');
        addNewAccountInput.focus();
    }
}

function cancel() {
    clear();
    LoadUserAccounts(data.accounts);
    isActivButton = true;
}

function clear() {
    for (const iterator of buttonList) {
        iterator.classList.remove('focus');
    }
    for (const iterator of itemList) {
        iterator.classList.remove('focus');
    }
    for (const iterator of screenList) {
        iterator.classList.toggle('hidden');
    }
    addNewAccountInput.value = '';
}

function scroll() {
    let itemsTop = items.getBoundingClientRect().y;
    let itemHeight = itemList[0].getBoundingClientRect().height;
    let item;
    for (const iterator of itemList) {
        if (iterator.classList.contains('focus')) {
            item = iterator.offsetTop;
        }
    }

    items.scrollTo({
        top: item - itemsTop - itemHeight,
        left: 0,
        behavior: 'smooth'
    });
}
