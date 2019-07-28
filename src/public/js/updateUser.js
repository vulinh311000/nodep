let userAvatar = null;
let userInfo = {};
function updateUserInfo() {
    $("#input-change-avatar").on("change",function() {
        const fileData = $(this).prop("files")[0];
        const math = ["image/png","image/jpg","image/jpeg"];
        const limit = 1048576; //  byte = 1MB

        if($.inArray(fileData.type,math) === -1) {
            alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg,jpeg & png.",'error',5);
            $(this).val(null);
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("Ảnh upload tối da cho phép là 1MB.",'error',5);
            $(this).val(null);
            return false;
        }

        if(typeof (FileReader) != 'undefined') {
            const imagePreview = $("#image-edit-profile");
            imagePreview.empty();

            const fileReader = new FileReader();
            fileReader.onload = function (element) {
                $("<img>",{
                    src:element.target.result,
                    class:"avatar img-circle",
                    id:"user-modal-avatar",
                    alt:"avatar"
                }).appendTo(imagePreview);
            };
            imagePreview.show();
            fileReader.readAsDataURL(fileData);
            let formData = new FormData();
            formData.append("avatar",fileData);
            userAvatar = formData;
        } else {
            alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader",'error',5);
        }
    });
    $("#input-change-username").on("change",function() {

    });
}

$(document).ready(function() {
    updateUserInfo();
    $("#input-btn-update-user").on("click",function() {
        $.ajax({
            url:"/user/update-avatar",
            type:"put",
            cache:false,
            contentType:false,
            processData:false,
            data:userAvatar,
            success: function(result) {
                console.log(result);
                $(".user-modal-alert-success span").text(result.message);
                $(".user-modal-alert-success").css("display","block");
                $("#navbar-avatar").attr("src",result.imgSrc);
            },
            error:function(error) {
                console.log(error);
                $(".user-modal-alert-error span").text(error.responseText);
                $(".user-modal-alert-error").css("display","block");
            }
        });
    });
});