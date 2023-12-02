const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;



//Register user
const me = async (params: object) => {
    const config = {
        method: "POST",
        body: JSON.stringify(params),
    };
    const response = await fetch(`${BASE_URL}/register`, config);
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
    const response = await fetch(`${BASE_URL}/change-email`, config);
    const data = await response.json();

    return data;
};


//get user
const getHomeData = async () => {
    const config = {
        method: "GET",
    };
    const response = await fetch(`${BASE_URL}/home-data`, config);
    const data = await response.json();

    return data;
};

const globalService = {
    getHomeData,
    changeEmail,
    me,
};

export default globalService;
