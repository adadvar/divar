interface Props {
    text: string;
}

const CategoryButton = ({ text }: Props) => {
    return (
        <button className="btn btn-ghost text-gray-500 hover:text-gray-800">
            <div
                tabIndex={0}
                className="collapse collapse-arrow items-center"
            >
                <div className="collapse-title font-bold ">
                    {text}
                </div>
                <div className="collapse-content">
                    <p>
                        زیردسته بندی
                    </p>
                </div>
            </div>
        </button>
    );
};

export default CategoryButton;
