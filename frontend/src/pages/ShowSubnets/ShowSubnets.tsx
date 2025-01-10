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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// hooks imports
import { useEffect, useState } from "react";
// external libraries imports
import { Toaster, toast } from "sonner";
import { Slash, Pencil } from "lucide-react";
import axios from "axios";
// types imports
import { Subnet } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// showsubnet component
const ShowShubnet = () => {
  const [open, setOpen] = useState(false);
  // state to store the subnets
  const [subnets, setSubnets] = useState<Subnet[] | null>(null);
  const [editSubnet, setEditSubnet] = useState<Subnet | null>(null);
  useEffect(() => {
    // function to fetch subnets from the backend
    const getSubnets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/subnets");
        setSubnets(response.data.subnets);
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

  const pushConfig = async () => {
    try {
      await axios.get("http://localhost:8080/deploy");
      toast.success("Push Configuration");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("Failed to push config");
    }
  };

  const addSubnet = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const subnetValue = (document.getElementById("subnet") as HTMLInputElement)
      .value;
    const poolStartValue = (
      document.getElementById("pool-start") as HTMLInputElement
    ).value;
    const poolEndValue = (
      document.getElementById("pool-end") as HTMLInputElement
    ).value;
    const routerValue = (document.getElementById("router") as HTMLInputElement)
      .value;
    const dnsValue = (document.getElementById("dns") as HTMLInputElement).value;

    try {
      const response = await axios.put("http://localhost:8080/subnets", {
        id: editSubnet?.id,
        subnet: subnetValue,
        pools: [
          {
            pool: `${poolStartValue} - ${poolEndValue}`,
          },
        ],
        "option-data": [
          {
            name: "router",
            data: routerValue,
          },
          {
            name: "dns",
            data: dnsValue,
          },
        ],
      });
      setSubnets(response.data.subnets);
      (document.getElementById("subnet") as HTMLInputElement).value = "";
      (document.getElementById("pool-start") as HTMLInputElement).value = "";
      (document.getElementById("pool-end") as HTMLInputElement).value = "";
      (document.getElementById("router") as HTMLInputElement).value = "";
      (document.getElementById("dns") as HTMLInputElement).value = "";
      toast.success("Subnet added successfully");
      setOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("Failed to add subnet");
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
                <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-gray-800 text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-b divide-y divide-gray-200">
              {subnets?.map((subnet) => (
                <TableRow
                  key={subnet.subnet}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                    {subnet.subnet}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                    {subnet.pools[0].pool.split(" - ")[0]}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                    {subnet.pools[0].pool.split(" - ")[1]}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                    {subnet["option-data"][0].data}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                    {subnet["option-data"][1].data}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${
                    subnet.status.toLowerCase() === "running"
                      ? "bg-green-100 text-green-800"
                      : subnet.status.toLowerCase() === "local"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                    >
                      {subnet.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center gap-3 px-6 py-4">
                    <DialogTrigger>
                      <Pencil
                        className="w-auto h-4 text-slate-500 hover:text-slate-900 cursor-pointer"
                        onClick={() => setEditSubnet(subnet)}
                      />
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button type="submit" className="w-44" onClick={pushConfig}>
            Push Configuration
          </Button>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Subnet Values</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Edited subnet values will not be pushed directly to K8s.
          </DialogDescription>
          <Separator />
          <form className="flex flex-col space-y-5" onSubmit={addSubnet}>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Subnet CIDR</Label>
              <Input
                placeholder="11.0.0.0/9"
                required={true}
                id="subnet"
                defaultValue={editSubnet?.subnet}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Pool Start</Label>
              <Input
                placeholder="11.0.0.2"
                required={true}
                id="pool-start"
                defaultValue={editSubnet?.pools[0]?.pool.split(" - ")[0]}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Pool End</Label>
              <Input
                placeholder="11.127.255.254"
                required={true}
                id="pool-end"
                defaultValue={editSubnet?.pools[0]?.pool.split(" - ")[1]}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Router IP</Label>
              <Input
                placeholder="11.0.0.1"
                required={true}
                id="router"
                defaultValue={editSubnet?.["option-data"][0]?.data}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">DNS</Label>
              <Input
                placeholder="10.1.6.2,10.254.153.200"
                required={true}
                id="dns"
                defaultValue={editSubnet?.["option-data"][1]?.data}
              />
              <p className="text-gray-500 text-sm">
                Add multiple DNS servers separated by comma.
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowShubnet;
