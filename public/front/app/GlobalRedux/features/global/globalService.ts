const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

//get home data

const getHomeData = async (params: any) => {
    const config = {
        method: "GET",
    };
    const response = await fetch(`${BASE_URL}/home-data?page=${params.page}`, config);
    const data = await response.json();

    return data;
};

const globalService = {
    getHomeData,
};

export default globalService;
