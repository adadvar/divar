interface Props {
    direction: string;
    style: string;
}

const Divider = ({ direction, style }: Props) => {
    return (
        <>
            {direction === "vertical" ? (
                <div className={`w-px h-full my-auto self-stretch bg-gray-300 ${style}`}></div>
            ) : (
                <div className={`h-px w-full mx-auto self-stretch bg-gray-300 ${style}`}></div>
            )}
        </>
    );
};

export default Divider;
