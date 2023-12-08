interface RegularListProps {
    items: object[];
    resourceName: string;
    ItemComponent: React.ComponentType<any>;
}

const RegularList = ({
    items,
    resourceName,
    ItemComponent,
}: RegularListProps) => {
    return (
        <>
            {items &&
                items.map((item: object, key: number) => {
                    return (
                        <ItemComponent
                            key={key}
                            {...{ [resourceName]: item }}
                        />
                    );
                })}
        </>
    );
};

export default RegularList;
