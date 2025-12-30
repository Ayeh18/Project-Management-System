import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, success, tasks, queryParams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2
            className="font-semibold text-xl text-gray-800
                dark:text-gray-200 leading-tight"
          >
            Task
          </h2>
          <Link
            href={route("task.create")}
            className="inline-flex items-center gap-2 rounded-lg
             bg-gradient-to-r from-emerald-500 to-emerald-600
             px-4 py-2 text-sm font-semibold text-white
             shadow-sm hover:from-emerald-600 hover:to-emerald-700
             focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
             transition"
          >
            + Add Task
          </Link>
        </div>
      }
    >
      <Head title="Task" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
