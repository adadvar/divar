import { listAdminAnswers } from "@/app/lib/data";
import { ReactNode } from "react";
import {
    ElementsType,
    FormElementInstance,
} from "@/app/ui/admin/dashboard/formBuilder/formElements";
import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";

type Row = { [key: string]: string } & { createdAt: Date };

const SingleAnswerPage = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: any;
}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const slug = params.id;
    const result = await listAdminAnswers({ slug, page });
    const formElements = result.form.content as FormElementInstance[];
    const columns: {
        id: string;
        label: string;
        required: boolean;
        type: ElementsType;
    }[] = [];
    formElements.forEach((element) => {
        switch (element.type) {
            case "TextField":
            case "NumberField":
            case "TextAreaField":
            case "DateField":
            case "SelectField":
            case "CheckboxField":
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label,
                    required: element.extraAttributes?.required,
                    type: element.type,
                });
                break;
            default:
                break;
        }
    });
    const rows: Row[] = [];
    result.answers.data.forEach((ans: any) => {
        const content = ans.content;
        rows.push({
            ...content,
            createdAt: ans.created_at,
        });
    });
    const count = result.answers.total;
    const per_page = result.answers.per_page;
    const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const image_url = BASE_URL + "categories/";

    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a category..." />
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <td
                                key={column.id}
                                className="p-3 text-center uppercase"
                            >
                                {column.label}
                            </td>
                        ))}
                        <td className="p-3 text-right uppercase">Created at</td>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="hover:bg-bg">
                            {columns.map((column) => (
                                <RowCell
                                    key={column.id}
                                    type={column.type}
                                    value={row[column.id]}
                                />
                            ))}
                            <td className="p-6 text-right">
                                {row.createdAt.toString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination per_page={per_page} count={count} />
        </div>
    );
};

export default SingleAnswerPage;

function RowCell({ type, value }: { type: ElementsType; value: string }) {
    let node: ReactNode = value;

    switch (type) {
        // case "DateField":
        //     if (!value) break;
        //     const date = new Date(value);
        //     node = <p>{date}</p>;
        //     break;
        case "CheckboxField":
            const checked = value === "true";
            node = <input type="checkbox" checked={checked} disabled />;
            break;
    }

    return <td className="p-6 text-center">{node}</td>;
}
