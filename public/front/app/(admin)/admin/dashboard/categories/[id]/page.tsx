import { getForm } from "@/app/lib/data";
import FormBuilder from "@/app/ui/admin/dashboard/formBuilder/formBuilder";

const SingleCategoryPage = async ({ params }: { params: { id: string } }) => {
    const form = await getForm(params.id);
    return (
        <div className="w-full h-full bg-bgSoft p-5 rounded-lg mt-5">
            <FormBuilder slug={params.id} form={form} />
        </div>
    );
};

export default SingleCategoryPage;
