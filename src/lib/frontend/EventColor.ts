export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "early bird":
      return "bg-blue-100 text-blue-800";
    case "in progress":
      return "bg-yellow-100 text-yellow-800";
    case "complete":
      return "bg-gray-100 text-gray-800";
    case "registration open":
      return "bg-green-100 text-green-800";
    case "registration closed":
      return "bg-red-100 text-red-800";
    case "registration closing":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
