import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant.jsx";

export default function Dashboard({
  auth,
  myPendingTasks,
  totalPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl text-gray-800
                dark:text-gray-200 leading-tight"
        >
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Pending Tasks */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg text-gray-900 dark:text-gray-100 overflow-hidden">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Pending Tasks
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>

            {/* In Progress Tasks */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg text-gray-900 dark:text-gray-100 overflow-hidden">
              <h3 className="text-blue-500 text-2xl font-semibold">
                In Progress Tasks
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myProgressTasks}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>

            {/* Completed Tasks */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg text-gray-900 dark:text-gray-100 overflow-hidden">
              <h3 className="text-green-500 text-2xl font-semibold">
                Completed Tasks
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
          {/* Pending Tasks */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg text-gray-900 dark:text-gray-100 overflow-hidden mt-4">
            <h3 className="text-gray-200 text-xl font-semibold">
              My Active Tasks
            </h3>
            <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-700 dark-bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr>
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Project Name</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks.data.map((tasks) => (
                  <tr key={tasks.id}>
                    <td className="px-3 py-2">{tasks.id}</td>
                    <td className="px-3 py-2 text-white font-bold hover:undeline">
                      <Link href={route("project.show", tasks.project.id)}>
                        {tasks.project.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{tasks.name}</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-3 py-1 text-SM font-semibold text-white shadow-sm " +
                          TASK_STATUS_CLASS_MAP[tasks.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[tasks.status]}
                      </span>
                    </td>
                    <td className="px-3 py-2">{tasks.due_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
