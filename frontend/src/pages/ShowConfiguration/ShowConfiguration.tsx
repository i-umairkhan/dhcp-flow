import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// configMap
const ShowConfiguration = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // function to fetch subnets from the backend
    const getSubnets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/configMap");
        setConfig(JSON.parse(response.data["kea-dhcp4.conf"]));
        console.log(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    getSubnets();
  }, []);

  return (
    <>
      <Toaster richColors position="top-right" expand={true} />
      <div className="flex flex-col gap-5 p-10 w-screen h-screen">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-base">
              Configuration
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="font-semibold text-base">
              Show Configuration
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <p className="font-bold text-xl">Current Configuration</p>
          <p className="text-gray-500">
            This is the current configuration running in Kea.
          </p>
        </div>
        <Separator />
        <div className="[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar]:w-2 overflow-auto">
          <pre className="bg-gray-900 shadow-lg p-6 font-medium text-base text-gray-100 overflow-x-auto">
            <code className="whitespace-pre">
              {JSON.stringify(config, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default ShowConfiguration;
