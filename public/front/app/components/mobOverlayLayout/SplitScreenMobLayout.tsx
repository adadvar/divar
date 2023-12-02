const SplitScreenMobLayout = ({
    children,
}: {
    children: Array<React.ReactNode>;
}) => {
    const [top, center, bottom] = children;
    return (
        <>
            {top}
            {center}
            {bottom}
        </>
    );
};
