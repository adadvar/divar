import Image from "next/image";
import { MdPerson } from "react-icons/md";
const transactions = () => {
    return (
        <div className="bg-bgSoft p-5 rounded-lg">
            <h2 className="mb-5 font-extralight text-textSoft">
                Latest Transactions
            </h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-3">Name</td>
                        <td className="p-3">Status</td>
                        <td className="p-3">Date</td>
                        <td className="p-3">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3">
                            <div className="flex gap-3 items-center">
                                <MdPerson size={50} />
                                John Doe
                            </div>
                        </td>
                        <td className="p-3">
                            <span className="rounded p-1 text-sm text-white bg-[#f7cb7375]">
                                Pending
                            </span>
                        </td>
                        <td className="p-3">14.02.2024</td>
                        <td className="p-3">$3.200</td>
                    </tr>
                    <tr>
                        <td className="p-3">
                            <div className="flex gap-3 items-center">
                                <MdPerson size={50} />
                                John Doe
                            </div>
                        </td>
                        <td className="p-3">
                            <span className="rounded p-1 text-sm text-white bg-[#afd6ee75]">
                                Done
                            </span>
                        </td>
                        <td className="p-3">14.02.2024</td>
                        <td className="p-3">$3.200</td>
                    </tr>
                    <tr>
                        <td className="p-3">
                            <div className="flex gap-3 items-center">
                                <MdPerson size={50} />
                                John Doe
                            </div>
                        </td>
                        <td className="p-3">
                            <span className="rounded p-1 text-sm text-white bg-[#f7737375]">
                                Cancelled
                            </span>
                        </td>
                        <td className="p-3">14.02.2024</td>
                        <td className="p-3">$3.200</td>
                    </tr>
                    <tr>
                        <td className="p-3">
                            <div className="flex gap-3 items-center">
                                <MdPerson size={50} />
                                John Doe
                            </div>
                        </td>
                        <td className="p-3">
                            <span className="rounded p-1 text-sm text-white bg-[#f7cb7375]">
                                Pending
                            </span>
                        </td>
                        <td className="p-3">14.02.2024</td>
                        <td className="p-3">$3.200</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default transactions;
