//Login user with google
const loginWithGoogle = async (params: object) => {
    const config = {
        method: "GET",
    };
    const response = await fetch(`/auth/google/callback${params}`, config);
    const data = await response.json();
    // let userMe;
    if (data) {
        // userMe = await me(data.access_token)
        localStorage.setItem("auth", JSON.stringify(data));
    }
    return data;
};

//Login user
const login = async (params: object) => {
    const config = {
        method: "POST",
        body: JSON.stringify(params),
    };

    const response = await fetch("/login", config);
    const data = await response.json();
    // let userMe;
    if (data) {
        // userMe = await me(data.access_token)
        localStorage.setItem("auth", JSON.stringify(data));
    }
    return data;
};

//Logout user
const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("me");
};

//Register user
const register = async (params: object) => {
    const config = {
        method: "POST",
        body: JSON.stringify(params),
    };
    const response = await fetch("/register", config);
    const data = await response.json();

    return data;
};

//Register user
const registerVerify = async (params: object) => {
    const config = {
        method: "POST",
        body: JSON.stringify(params),
    };
    const response = await fetch("/register-verify", config);
    const data = await response.json();

    return data;
};

//Resend verification user
const resendVerificationCode = async (params: object) => {
    const config = {
        method: "POST",
        body: JSON.stringify(params),
    };
    const response = await fetch("/resend-verification-code", config);
    const data = await response.json();

    return data;
};

//Change email user
const changeEmail = async (params: object, token: string) => {
    const config = {
        body: JSON.stringify(params),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch("/change-email", config);
    const data = await response.json();

    return data;
};

//Change password user
const changePassword = async (params: object, token: string) => {
    const config = {
        body: JSON.stringify(params),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch("/change-password", config);
    const data = await response.json();

    return data;
};

//Change email submit user
const changeEmailSubmit = async (params: object, token: string) => {
    const config = {
        body: JSON.stringify(params),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch("/change-email-submit", config);
    const data = await response.json();

    if (data) {
        const meSt = JSON.parse(localStorage.getItem("me") || "{}");
        const newStorage = { ...meSt, email: data.email };
        localStorage.setItem("me", JSON.stringify(newStorage));
    }
    return data;
};

//get user
const me = async (token: string) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch("/user/me", config);
    const data = await response.json();

    if (data) {
        localStorage.setItem("me", JSON.stringify(data));
    }
    return data;
};

const authService = {
    loginWithGoogle,
    login,
    logout,
    register,
    registerVerify,
    resendVerificationCode,
    changeEmail,
    changePassword,
    changeEmailSubmit,
    me,
};

export default authService;
