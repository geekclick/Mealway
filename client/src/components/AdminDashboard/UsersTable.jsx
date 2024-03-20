import { Link } from "react-router-dom";

const brandData = [
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
  {
    name: "Anuj Jaykrushna Ghom",
    visitors: "anujghom27@gmail.com",
    revenues: "+918788062498",
    sales: "590",
    conversion: "Edit/Delete",
  },
];

const UsersTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center">
        <h4 className=" mb-6 text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
        <Link
          to="#"
          className="inline-flex items-center justify-center rounded-md border dark:border-white dark:text-white border-black mb-6 py-2.5 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Full Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone Number
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Not Defined
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-sm text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black text-sm dark:text-white">
                {brand.visitors}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-meta-3 text-sm">{brand.revenues}</p>
            </div>

            <div className="hidden items-center p-2.5 sm:flex xl:p-5">
              <p className="text-black text-sm dark:text-white">
                {brand.sales}
              </p>
            </div>

            <div className="hidden items-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5 text-sm">{brand.conversion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
