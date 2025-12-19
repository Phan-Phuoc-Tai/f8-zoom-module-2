const validation = {
  sanitizeText(str) {
    return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },

  email(str) {
    const emailRegex = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/; //Biểu thức kiểm tra validateEmail đầy đủ hơn

    if (this.sanitizeText(str).trim() === "") {
      return { type: false, message: "Vui lòng nhập Email!" };
    }

    if (!emailRegex.test(this.sanitizeText(str))) {
      return {
        type: false,
        message: `Email không hợp lệ! Xin vui lòng thử lại!`,
      };
    }
    return { type: true };
  },

  password(str, isRegister = true) {
    const minLength = 8;

    if (this.sanitizeText(str).trim() === "") {
      return {
        type: false,
        message: "Vui lòng nhập mật khẩu!",
      };
    }

    if (isRegister) {
      if (this.sanitizeText(str).length < minLength) {
        return {
          type: false,
          message: `Mật khẩu có ít nhất ${minLength} ký tự`,
        };
      }

      if (
        !/[a-z]/.test(this.sanitizeText(str)) ||
        !/[A-Z]/.test(this.sanitizeText(str)) ||
        !/[0-9]/.test(this.sanitizeText(str))
      ) {
        return {
          type: false,
          message: `Mật khẩu phải có ít nhất 1 ký tự in hoa, in thường và số!`,
        };
      }
    }
    return { type: true };
  },

  username(str) {
    if (this.sanitizeText(str).trim() === "") {
      return { type: false, message: "Vui lòng nhập tên hiển thị!" };
    }
    return { type: true };
  },

  passwordConformation(str, password) {
    if (this.sanitizeText(str).trim() === "") {
      return { type: false, message: "Vui lòng nhập xác nhận mật khẩu!" };
    }

    if (this.sanitizeText(str).trim() !== password.trim()) {
      return {
        type: false,
        message: "Xác nhận mật khẩu không trùng khớp. Xin vui lòng nhập lại!",
      };
    }
    return { type: true };
  },
};

export default validation;
