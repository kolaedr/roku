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
        },
    ]
};

function userAccount(data, id = 0) {
    console.log('id :>> ', id);

    let list = '';
    data.forEach((element, index) => {
        list += `<div class="item ${index == 0 && id == 0 ? 'focus' : id == index && id != -1 ? 'focus' : ''} " data-id=${index}>
                <img src="${element.img}" alt="" class="user-image">
                <span class="title">${element.title}</span>
            </div>`;
    });
    document.querySelector('.items').innerHTML = list;
    document.querySelector('.items').scrollTo(0, 0);
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
var index_adding = 0;

function leftPress() {
    if (document.querySelector('.add-block .btn').classList.contains('focus') && !document.querySelector('.account-list').classList.contains('hidden')) {
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
                    data.accounts.splice(iterator.dataset.id, 1);
                    if (data.accounts.length == 1) {
                        userAccount(data.accounts);
                        return;
                    }
                    userAccount(data.accounts, iterator.dataset.id - 1);

                    return;
                } else if (iterator.nextElementSibling) {
                    data.accounts.splice(iterator.dataset.id, 1);
                    userAccount(data.accounts);

                    return;
                } else {
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
        userAccount(data.accounts);
    } else {
        alert('Put name');
        document.querySelector('span[data-action=addUser]').classList.remove('focus');
        document.querySelector('.account-add input').focus();
    }


}

function cancel() {
    clear();
    userAccount(data.accounts);
}

function clear() {
    for (const iterator of document.querySelectorAll('span[data-action]')) {
        iterator.classList.remove('focus');
    }
    for (const iterator of document.querySelectorAll('.item')) {
        iterator.classList.remove('focus');
    }
    // index = 0;
    for (const iterator of document.querySelectorAll('main>section')) {
        iterator.classList.toggle('hidden');
    }
    document.querySelector('.account-add input').value = '';
}

function scroll(direction) {
    // .getBoundingClientRect()

    let itemsTop = document.querySelector('.items').getBoundingClientRect().y;
    let itemsHeight = document.querySelector('.items').getBoundingClientRect().height;
    let itemHeight = document.querySelectorAll('.item')[0].getBoundingClientRect().height;
    // let item = document.querySelectorAll('.item')[0];
    let itemTop, item;
    for (const iterator of document.querySelectorAll('.item')) {
        if (iterator.classList.contains('focus')) {
            itemTop = iterator.getBoundingClientRect().y;
            item = iterator.offsetTop;
        }
    }
    switch (direction) {
        case "up":
            // console.log('itemsTop u:>> ', itemsTop);
            // console.log('itemHeight u:>> ', itemHeight);
            // console.log('item u:>> ', item);
            // if (item > itemsTop+itemHeight) {
            document.querySelector('.items').scrollTo({
                top: item-itemsTop-itemHeight,
                left: 0,
                behavior: 'smooth'
            });
            // }

            break;
        case "down":
            // console.log('itemsTop d:>> ', itemsTop);
            // console.log('itemHeight d:>> ', itemHeight);
            // console.log('item d:>> ', item);
            // if (item < itemsTop+itemHeight) {
                document.querySelector('.items').scrollTo({
                    top: item-itemsTop-itemHeight,
                    left: 0,
                    behavior: 'smooth'
                })
            // }
            break;
    }
}
