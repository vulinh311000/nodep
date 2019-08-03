function increaseNumberNotifContact(className) {
    let currentValue = +$(`.${className}`).find("em").text();
    currentValue += 1;
    if (currentValue === 0) {
        $(`.${className}`).html("");
    } else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`);
    }
}

function increase(className) {
    let currentValue = +$(`.${className}`).text();
    currentValue += 1;
    if (currentValue === 0) {
        $(`.${className}`).css('display','none').html("");
    } else {
        $(`.${className}`).css('display','block').html(currentValue);
    }
}

function decrease(className) {
    let currentValue = +$(`.${className}`).text();
    currentValue -= 1;
    if (currentValue === 0) {
        $(`.${className}`).css('display','none').html("");
    } else {
        $(`.${className}`).css('display','block').html(currentValue);
    }
}

function addContact() {
    $(".contactList").on('click', '.user-add-new-contact', function () {
        const uid = $(this).data('uid');
        $.post("/contact/add-new", {uid}, function (data) {
            if (data.success) {
                $("#contactListSearch").find(`.user-add-new-contact[data-uid=${uid}]`).hide();
                $("#contactListSearch").find(`.user-remove-request-contact[data-uid=${uid}]`).css('display', 'inline-block');
                increaseNumberNotifContact("count-request-contact-sent");
                socket.emit('add-new-contact', {contactId: uid});
            }
        });
    });
}

socket.on('response-add-new-contact', function (user) {
    const notif = `<span data-uid="${ user.id }">
    <img class="avatar-small" src="images/users/${user.avatar}" alt="">
    <strong>${user.username}</strong> đã gửi lời mời kết bạn!
    </span><br><br><br>`;

    $(".noti_content").prepend(notif);
    increaseNumberNotifContact('count-request-contact-received');

    increase('noti_counter');
    increase('noti_contact_counter');
});