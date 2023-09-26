interface Props {
    direction: string;
    style: string;
}

const Divider = ({ direction, style }: Props) => {
    return (
        <>
            {direction === "vertical" ? (
                <div
                    className={`w-px h-4/5 my-auto self-stretch bg-gray-300 ${style}`}
                ></div>
            ) : (
                <div
                    className={`h-px w-4/5 mx-auto self-stretch bg-gray-300 ${style}`}
                ></div>
            )}
        </>
    );
};

export default Divider;
