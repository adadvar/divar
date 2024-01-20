import FormBuilder from "@/app/ui/admin/dashboard/formBuilder/formBuilder";

const SingleCategoryPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="w-full h-full bg-bgSoft p-5 rounded-lg mt-5">
            <FormBuilder slug={params.id.toString()} />
        </div>
    );
};

export default SingleCategoryPage;
