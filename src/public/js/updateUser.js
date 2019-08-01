let userAvatar = null;
let userInfo = {};

function updateUserInfo() {
    $("#input-change-avatar").on("change", function () {
        const fileData = $(this).prop("files")[0];
        const math = ["image/png", "image/jpg", "image/jpeg"];
        const limit = 1048576; //  byte = 1MB

        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg,jpeg & png.", 'error', 5);
            $(this).val(null);
            return false;
        }
        if (fileData.size > limit) {
            alertify.notify("Ảnh upload tối da cho phép là 1MB.", 'error', 5);
            $(this).val(null);
            return false;
        }

        if (typeof (FileReader) != 'undefined') {
            const imagePreview = $("#image-edit-profile");
            imagePreview.empty();

            const fileReader = new FileReader();
            fileReader.onload = function (element) {
                $("<img>", {
                    src: element.target.result,
                    class: "avatar img-circle",
                    id: "user-modal-avatar",
                    alt: "avatar"
                }).appendTo(imagePreview);
            };
            imagePreview.show();
            fileReader.readAsDataURL(fileData);
            let formData = new FormData();
            formData.append("avatar", fileData);
            userAvatar = formData;
        } else {
            alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader", 'error', 5);
        }
    });
    $("#input-change-username").on("change", function () {

    });
}

function callUpdateUserAvatar() {
    $.ajax({
        url: "/user/update-avatar",
        type: "put",
        cache: false,
        contentType: false,
        processData: false,
        data: userAvatar,
        success: function (result) {
            console.log(result);
            $(".user-modal-alert-success span").text(result.message);
            $(".user-modal-alert-success").css("display", "block");
            $("#navbar-avatar").attr("src", result.imgSrc);
        },
        error: function (error) {
            console.log(error);
            $(".user-modal-alert-error span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
        }
    });
}

function callUpdateUserInfo() {
    $.ajax({
        url: "/user/update-info",
        type: "put",
        data: {
            username: $("#input-change-username").val(),
            gender: $("input[type='radio']:checked").val(),
            address: $("#input-change-address").val(),
            phone: $("#input-change-phone").val()
        },
        success: function (result) {
            console.log(result);
            $(".user-modal-alert-success span").text(result.message);
            $(".user-modal-alert-success").css("display", "block");
        },
        error: function (error) {
            console.log(error);
            $(".user-modal-alert-error span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
        }
    });
}

function updatePassword(currentPassword, newPassword) {
    $.ajax({
        url: "/user/update-password",
        type: "put",
        data: {
            currentPassword,
            newPassword
        },
        success: function (result) {
            console.log(result);
            $(".user-modal-password-alert-success span").text(result.message);
            $(".user-modal-password-alert-success").css("display", "block");
        },
        error: function (error) {
            console.log(error);
            $(".user-modal-password-alert-error span").text(error.responseText);
            $(".user-modal-password-alert-error").css("display", "block");
        }
    });
}

function searchUser() {
    let search = $("#searchInput").val();

    if (search) {
        $.ajax({
            url: "/user/search",
            type: "post",
            data: {
                search
            },
            success: function (result) {
                $("#contactListSearch").empty();
                result.forEach(user => {
                    $("#contactListSearch").append(`
                        <li class="_contactList" data-uid="${user._id}">
                        <div class="contactPanel">
                        <div class="user-avatar">
                        <img src="images/users/${user.avatar}" alt="">
                        </div>
                        <div class="user-name">
                        <p>${user.username}</p>
                        </div>
                        <br>
                        <div class="user-address">
                        <span>&nbsp ${(user.address == null) ? '<span style="color:gray">Không có địa chỉ</span>' : user.address}</span>
                        </div>
                        <div class="user-add-new-contact" data-uid="${user._id}">
                        Thêm vào danh sách liên lạc
                        </div>
                        <div class="user-remove-request-contact action-danger" data-uid="${user._id}">
                        Hủy yêu cầu
                        </div>
                        </div>
                        </li>`);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        alertify.error("chua nhap gi` kia`");
    }
}

$(document).ready(function () {
    updateUserInfo();
    $("#input-btn-update-user").on("click", function () {
        if ($('#input-change-avatar').get(0).files.length !== 0) {
            callUpdateUserAvatar();
        }
        callUpdateUserInfo();
    });

    $("#searchInput").keypress(function (e) {
        if (e.which == '13') {
            searchUser();
        }
    });

    $("#searchBtn").click(function () {
        searchUser();
    });

    $("#input-btn-update-user-password").on("click", function () {
        const currentPass = $("#input-change-current-password").val();
        const newPass = $("#input-change-new-password").val();
        const newConfirmPass = $("#input-change-confirm-password").val();

        console.log(currentPass || newPass || newConfirmPass);
        if (!currentPass || !newPass || !newConfirmPass) {
            alertify.error("Nhập cho đầy đủ vào !");
        } else {
            if (newPass === newConfirmPass) {
                updatePassword(currentPass, newPass);
            } else {
                alertify.error("Ngu vua");
            }
        }
    });
});