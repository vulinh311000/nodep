export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com",
    gender_incorrect: "Phá vừa thôi =)))",
    password_incorrect: "Mật khảu phải bla bla bla",
    password_min_incorrect: "Mật khẩu phải nhiều hơn 8 ký tự !",
    password_confirmation_incorrect: "Mật khẩu xác nhận không giống !"
};

export const transErrors = {
    account_in_use: "Email này đã được sử dụng."
};

export const transSuccess = {
    account_active:'Kích hoạt tài khoản thành công'
}

export const transMail = {
    subject: 'Xác nhận kích hoạt tài khoản.',
    template: ({linkVerify, email, username, password}) => {
        return `
            <h2>Xác nhận kích hoạt tài khoản: ${username}</h2>
            <ul>
                <li>Username : ${username}</li>
                <li>Email : ${email}</li>
                <li>Password : ${password}</li>
            </ul>
            <h3>Vui lòng click bên dưới để xác nhận kích hoạt</h3>
            <h3><a href="${linkVerify}" target="_blank">${linkVerify}</a></h3>
            <h4>Vũ Lĩnh</h4>
        `;
    },
    send_failed: "Có lỗi trong quá trình gửi email"
};