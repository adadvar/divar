interface ReqularListProps<T> {
    items: T[];
    resourceName: string;
    ItemComponent: React.ComponentType<
        { [resourceName: string]: T } & { key: React.Key }
    >;
}

const ReqularList = <T,>({
    items,
    resourceName,
    ItemComponent,
}: ReqularListProps<T>) => {
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

export default ReqularList;
