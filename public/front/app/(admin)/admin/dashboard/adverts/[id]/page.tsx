import { showAdminAdvert } from "@/app/lib/data";
import Slider from "@/app/ui/Slider";
import { cookies } from "next/headers";
import { MdPerson } from "react-icons/md";

const SigleAdvertPage = async ({ params }: { params: { id: number } }) => {
    let cookie: any = cookies().get("token");
    const token = cookie && JSON.parse(cookie.value);
    const { id } = params;
    const advert = await showAdminAdvert({
        slug_url: id,
    });
    const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const image_url = BASE_URL + "adverts/" + advert.user_id + "/";
    return (
        <div className="flex gap-12 mt-5">
            <div className="w-1/3 bg-bgSoft p-5 rounded-lg font-bold text-textSoft h-max">
                <div className="flex items-center justify-center w-full h-72 relative rounded-lg overflow-hidden mb-5 mx-auto">
                    {advert.images.length > 0 ? (
                        <Slider image_url={image_url} images={advert.images} />
                    ) : (
                        <MdPerson size={50} />
                    )}
                </div>
            </div>
            <div className="w-2/3 bg-bgSoft p-5 rounded-lg">
                <form action={"updateadvert"} className="flex flex-col">
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="hidden"
                        name="id"
                        value={advert.id}
                    />
                    <label className="text-xs">Title</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="title"
                        placeholder={advert.title}
                    />
                    <label className="text-xs">User</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="user"
                        placeholder={advert.user.name}
                    />
                    <label className="text-xs">City</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="city"
                        placeholder={advert.city.name}
                    />
                    <label className="text-xs">Price</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="number"
                        name="price"
                        placeholder={advert.price}
                    />
                    <label className="text-xs">State</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="state"
                        id="state"
                        defaultValue={advert.state}
                    >
                        <option value="pending">pending</option>
                        <option value="accepted">accepted</option>
                        <option value="blocked">blocked</option>
                    </select>
                    <label className="text-xs">info</label>
                    <textarea
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="info"
                        placeholder={advert.info}
                    />
                    <button className="w-full p-5 text-text border-none rounded-md bg-teal-500 mt-5">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SigleAdvertPage;
