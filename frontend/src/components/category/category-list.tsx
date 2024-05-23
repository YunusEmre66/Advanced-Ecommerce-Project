import { useGetCategoryQuery } from "@/services/category";

const CategoryList = () => {
  const { data: categories, isLoading, isSuccess } = useGetCategoryQuery("");

  const handleSave = (item: any) => {
    console.log(item);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              categories.list.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td><input type="text" value={item.title} onChange={(e: any) => {
                        categories.list[index].title = e.target.value
                        console.log(e.target.value)
                    }} /></td>
                    <td>{item.description}</td>
                    <th>
                      <button
                        onClick={() => handleSave(item)}
                        className="btn btn-ghost btn-xs"
                      >
                        save
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryList;
