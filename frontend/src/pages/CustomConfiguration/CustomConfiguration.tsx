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
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vim";

// configMap
const CustomConfiguration = () => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // function to fetch subnets from the backend
    const getSubnets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/configMap");
        setConfig(response.data["kea-dhcp4.conf"]);
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

  const postConfigMap = async () => {
    try {
      const response = await axios.post("http://localhost:8080/configMap", {
        "kea-dhcp4.conf": config,
      });
      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
              Custom Configuration
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <p className="font-bold text-xl">Custom Configuration</p>
          <p className="text-gray-500">
            Edit current configuration or write from scrath.
          </p>
        </div>
        <Separator />
        <AceEditor
          width="auto"
          height="100vh"
          value={config}
          mode="json"
          theme="dracula"
          editorProps={{ $blockScrolling: true }}
          fontSize={16}
          showPrintMargin
          showGutter
          highlightActiveLine
          onChange={(e) => setConfig(e)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
        <button onClick={postConfigMap}>Submit</button>
      </div>
    </>
  );
};

export default CustomConfiguration;
