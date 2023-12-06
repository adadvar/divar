interface RegularListProps<T> {
    items: T[];
    resourceName: string;
    ItemComponent: React.ComponentType<
        { [resourceName: string]: T } & { key: React.Key }
    >;
}

const RegularList = <T,>({
    items,
    resourceName,
    ItemComponent,
}: RegularListProps<T>) => {
    return (
        <>
            {items &&
                items.map((item, index) => {
                    return (
                        <ItemComponent
                            key={index}
                            {...({ [resourceName]: item } as any)}
                        />
                    );
                })}
        </>
    );
};

export default RegularList;
