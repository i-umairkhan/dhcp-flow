// components imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
// hooks imports
import { useEffect, useState } from "react";
// external libraries imports
import { Toaster, toast } from "sonner";
import { Slash } from "lucide-react";
import axios from "axios";
// types imports
import { KeaDhcp4ConfigType } from "@/types";

// showsubnet component
const ShowShubnet = () => {
  // state to store the kea-dhcp4.conf file
  const [keaDhcp4Conf, setKeaDhcp4Conf] = useState<KeaDhcp4ConfigType | null>(
    null,
  );
  useEffect(() => {
    // function to fetch subnets from the backend
    const getSubnets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/configMap");
        setKeaDhcp4Conf(JSON.parse(response.data["kea-dhcp4.conf"]));
        toast.success("Subnets fetched successfully");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error("Unexpected error:", error);
        }
        toast.error("Failed to fetch subnets");
      }
    };
    getSubnets();
  }, []);

  return (
    <>
      <Toaster richColors position="top-right" expand={true} />
      <div className="flex flex-col gap-5 p-10 w-screen">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-base">
              Subnets
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="font-semibold text-base">
              Show Subnets
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <p className="font-bold text-xl">Configured Subnets</p>
          <p className="text-gray-500">Subnets that are configured in Kea.</p>
        </div>
        <Separator />
        <Table className="bg-gray-30 w-2/3 overflow-hidden">
          <TableHeader className="bg-gray-100 border-b">
            <TableRow>
              <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                Subnet
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                Pool Start
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                Pool End
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                Router
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                DNS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b divide-y divide-gray-200">
            {keaDhcp4Conf?.Dhcp4?.subnet4?.map((subnet) => (
              <TableRow
                key={subnet.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                  {subnet.subnet}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 text-sm">
                  {subnet.pools[0].pool.trim().split("-")[0]}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 text-sm">
                  {subnet.pools[0].pool.trim().split("-")[1]}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 text-sm">
                  {subnet["option-data"][0].data}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 text-sm">
                  {subnet["option-data"][1].data}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ShowShubnet;
