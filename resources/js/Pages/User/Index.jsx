import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams = null, success }) {
  // if !queryParams, return empty object
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.index"), queryParams);
  };

  // Press 'Enter' key, it continues, otherwise the function exits
  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure want to delete the user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            User
          </h2>

          <Link
            href={route("user.create")}
            className="inline-flex items-center gap-2 rounded-lg
          bg-gradient-to-r from-emerald-500 to-emerald-600
          px-4 py-2 text-sm font-semibold text-white
          shadow-sm hover:from-emerald-600 hover:to-emerald-700
          focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
          transition"
          >
            + Add User
          </Link>
        </div>
      }
    >
      <Head title="User" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="mb-4 rounded bg-emerald-500 px-4 py-2 text-white">
              {success}
            </div>
          )}

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-gray-700 dark:bg-gray-700 text-gray-400 border-b-2 border-gray-500">
                    {/* HEADER ROW */}
                    <tr className="whitespace-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>

                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Email
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Created At
                      </TableHeading>

                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                    </thead>

                    {/* FILTER ROW */}
                    <thead className="text-xs uppercase bg-gray-700 dark:bg-gray-700 text-gray-400 border-b-2 border-gray-500">
                    <tr>
                      <th className="px-3 py-2"></th>

                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="User Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>

                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.email}
                          placeholder="User Email"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>

                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>

                  {/* ================= BODY ================= */}
                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b bg-white dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 py-2">{user.id}</td>

                        <td className="px-3 py-2 font-semibold text-gray-100 whitespace-nowrap">
                          {user.name}
                        </td>

                        <td className="px-3 py-2">{user.email}</td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {user.created_at}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={route("user.edit", user.id)}
                              className="inline-flex items-center rounded-lg
                            bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600
                            hover:bg-indigo-100 dark:bg-indigo-900/30
                            dark:text-indigo-400 dark:hover:bg-indigo-900/50
                            transition"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => deleteUser(user)}
                              className="inline-flex items-center rounded-lg
                            bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600
                            hover:bg-red-100 dark:bg-red-900/30
                            dark:text-red-400 dark:hover:bg-red-900/50
                            transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
