function decreaseNumberNotifContact(className) {
    let currentValue = +$(`.${className}`).find("em").text();
    currentValue -= 1;
    if (currentValue === 0) {
        $(`.${className}`).html("");
    } else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`);
    }
}

function removeRequestContact() {
    $(".contactList").on('click', '.user-remove-request-contact', function () {
        const uid = $(this).data('uid');
        $.ajax({
            url: '/contact/remove-request-contact',
            type:'delete',
            data: {uid},
            success: function (data) {
                $("#contactListSearch").find(`.user-add-new-contact[data-uid=${uid}]`).show();
                $("#contactListSearch").find(`.user-remove-request-contact[data-uid=${uid}]`).hide();
                decreaseNumberNotifContact("count-request-contact-sent");
                socket.emit('remove-request-contact',{contactId:uid});
            }
        });
    });
}

socket.on('response-remove-request-contact', function (user) {
    $(`.noti_content div[data-uid=${user.id}]`).remove();

    decreaseNumberNotifContact('count-request-contact-received');

    decrease('noti_counter');
    decrease('noti_contact_counter');
});