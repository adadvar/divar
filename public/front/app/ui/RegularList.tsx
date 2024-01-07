interface RegularListProps {
    items: object[];
    resourceName: string;
    ItemComponent: React.ComponentType<any>;
    itemProps?: object;
}

const RegularList = ({
    items,
    resourceName,
    ItemComponent,
    itemProps = {},
}: RegularListProps) => {
    return (
        <>
            {items &&
                items.map((item: object, key: number) => {
                    return (
                        <ItemComponent
                            key={key}
                            {...{ [resourceName]: item }}
                            {...itemProps}
                        />
                    );
                })}
        </>
    );
};

export default RegularList;
