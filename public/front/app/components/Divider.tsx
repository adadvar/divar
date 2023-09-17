interface Props {
    direction: string;
}

const Divider = ({ direction }: Props) => {
    return (
        <>
            {direction === "vertical" ? (
                <div className="inline-block w-px h-8 my-auto mx-5 self-stretch bg-gray-300"></div>
            ) : (
                <div className="inline-block h-px w-8 mx-auto my-5 self-stretch bg-gray-300"></div>
            )}
        </>
    );
};

export default Divider;
