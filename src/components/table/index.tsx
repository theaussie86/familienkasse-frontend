import TablePagination from "./pagination";

function WeissteinerTable() {
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "John Doe",
      title: "Software Engineer",
      email: "john.doe@example.com",
      role: "Member",
    },
    {
      name: "Jane Smith",
      title: "Product Manager",
      email: "jane.smith@example.com",
      role: "Member",
    },
    {
      name: "Michael Johnson",
      title: "UI Designer",
      email: "michael.johnson@example.com",
      role: "Member",
    },
    {
      name: "Emily Davis",
      title: "QA Engineer",
      email: "emily.davis@example.com",
      role: "Member",
    },
    {
      name: "David Wilson",
      title: "Backend Developer",
      email: "david.wilson@example.com",
      role: "Member",
    },
    {
      name: "Sarah Thompson",
      title: "Data Analyst",
      email: "sarah.thompson@example.com",
      role: "Member",
    },
    {
      name: "Robert Brown",
      title: "Project Manager",
      email: "robert.brown@example.com",
      role: "Member",
    },
  ];
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Role
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {people.map((person) => (
            <tr key={person.email}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {person.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {person.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {person.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {person.role}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit<span className="sr-only">, {person.name}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination />
    </div>
  );
}

export default WeissteinerTable;
