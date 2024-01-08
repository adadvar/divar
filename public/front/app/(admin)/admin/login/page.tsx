const LoginPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                action=""
                className="bg-bgSoft p-12 rounded-lg w-[500px] h-[500px] flex flex-col justify-center items-center gap-7"
            >
                <h1 className="text-5xl">Login</h1>
                <input
                    type="text"
                    placeholder="username"
                    className="w-full p-5 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                />
                <input
                    type="password"
                    placeholder="password"
                    className="w-full p-5 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                />
                <button className="w-full p-5 text-text border-none rounded-md bg-teal-500 ">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
