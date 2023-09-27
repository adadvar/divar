import Divider from "@/app/components/Divider";
import SearchItem from "./AdvertSearchItem";

const SearchItems = () => {
    return (
        <div className="flex flex-col bg-white">
            <SearchItem />
            <Divider direction="horizontal" style="p-0 m-0" />
            <SearchItem />
            <Divider direction="horizontal" style="p-0 m-0" />
            <SearchItem />
        </div>
    );
};

export default SearchItems;