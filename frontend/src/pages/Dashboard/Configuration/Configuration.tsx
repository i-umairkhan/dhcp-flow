// ----- imports -----
// ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";

// external libraries
import axios from "axios";

// hooks
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

// ----- Configuration component -----
const Configuration = () => {
  // hooks
  const [namespace, setNamespace] = useState("");
  const [label, setLabel] = useState("");
  const [kubeConfig, setKubeConfig] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    // handler functions
    const getConfigOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/configOptions");
        setNamespace(response.data.namespace);
        setLabel(response.data.label);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast({
            description:
              error.response?.data?.message ||
              "Error fetching configuration data.",
            variant: "destructive",
          });
          console.error(error.response);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    const getKubeConfig = async () => {
      try {
        const response = await axios.get("http://localhost:8080/kubeConfig");
        setKubeConfig(response.data.kubeConfig);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast({
            description: "No kubeconfig file found on server.",
            action: <ToastAction altText="Upload">Upload</ToastAction>,
          });
          console.error(error.response);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    getConfigOptions();
    getKubeConfig();
  }, [kubeConfig, toast]);

  // handler functions
  const updateConfigOption = async () => {
    try {
      const response = await axios.post("http://localhost:8080/configOptions", {
        namespace,
        label,
      });
      setNamespace(response.data.namespace);
      setLabel(response.data.label);
      toast({
        title: "Updated",
        description: "Configuration has been updated successfully.",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        toast({
          title: "Error",
          description: "Error updating configuration data.",
        });
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const uploadKubeConfig = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files && e.target.files.length > 0) {
        formData.append("kubeConfig", e.target.files[0]);
      }
      setKubeConfig("TEMP");
      await axios.post("http://localhost:8080/kubeConfig", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Uploaded",
        description: "Kubeconfig has been uploaded successfully.",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: "Error updating kubeconfig.",
        });
        console.error(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const deleteKubeConfig = async () => {
    try {
      await axios.delete("http://localhost:8080/kubeConfig");
      setKubeConfig("");
      toast({
        title: "Deleted",
        description: "Kubeconfig has been deleted successfully.",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: "Error deleting kubeconfig.",
          variant: "destructive",
        });
        console.error(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-5 p-10 w-screen h-screen">
      <Breadcrumb>
        <BreadcrumbList className="flex space-x-2 text-gray-400">
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>Configuration</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Toaster />
      <div>
        <p className="font-bold text-xl">Configuration</p>
        <p className="text-gray-500">
          Manage your application configuration and settings.
        </p>
      </div>
      <Separator />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateConfigOption();
        }}
        className="flex flex-col space-y-5 w-1/2"
      >
        <div className="flex flex-col space-y-2">
          <Label className="font-semibold">Namespace</Label>
          <Input
            placeholder="default"
            required={true}
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
          />
          <p className="text-gray-500 text-sm">
            This is the namespace will be used throuhout the application.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="font-semibold">Label</Label>
          <Input
            placeholder="app=kea"
            required={true}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <p className="text-gray-500 text-sm">
            This label will be used throuhout the application.
          </p>
        </div>
        <Button className="w-36" variant="default" type="submit">
          Update
        </Button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col space-y-5 w-1/2"
      >
        <div className="flex flex-col space-y-2">
          <Label className="font-semibold">Kubeconfig</Label>
          {!kubeConfig && <Input type="file" onChange={uploadKubeConfig} />}
          <p className="text-gray-500 text-sm">
            Uploaded kubeconfig file will be used to access cluster.
          </p>
          {kubeConfig && (
            <Button
              className="w-48"
              variant="destructive"
              onClick={deleteKubeConfig}
            >
              Delete Uploaded Kubeconfig
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Configuration;
