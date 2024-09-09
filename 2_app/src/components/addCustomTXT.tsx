import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRecordsContext } from "@/contexts/useRecords";
import {
  CheckCheckIcon,
  ListRestart,
  Plus,
  SlidersHorizontal,
  XIcon,
} from "lucide-react";

export function AddCustomTXT({ disabled }: { disabled: boolean }) {
  const {
    records,
    removeRecord,
    resetRecords,
    addRecord,
    dnsServer,
    setDnsServer,
  } = useRecordsContext();
  const [newRecord, setNewRecord] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dnsServers = [
    { name: "Cloudflare (1.1.1.1) Default", value: "1.1.1.1" },
    { name: "Google (8.8.8.8)", value: "8.8.8.8" },
    { name: "OpenDNS (208.67.222.222)", value: "208.67.222.222" },
    { name: "Quad9 (9.9.9.9)", value: "9.9.9.9" },
    { name: "NextDNS (45.90.28.0)", value: "45.90.28.0" },
  ];

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full md:max-w-[250px] rounded-full mt-4 md:mt-8 py-8 text-lg font-semibold"
          disabled={disabled}
          onClick={openModal}
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <span>Filters</span>
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" />

      <DialogContent className="sm:max-w-[500px] p-8 rounded-lg shadow-lg bg-white dark:bg-gray-900 z-50 transform transition-all ease-in-out max-h-[90vh] overflow-y-auto absolute top-[50%]">
        <div className="space-y-6">
          <div className="mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Apply Filters
            </DialogTitle>
            <label
              htmlFor="dns-server"
              className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Lookup DNS Server:
            </label>
            <select
              id="dns-server"
              value={dnsServer}
              onChange={(e) => setDnsServer(e.target.value)}
              className="px-6 py-4 rounded-lg border-2 dark:bg-neutral-800/30 dark:border-neutral-700 text-lg w-full"
            >
              {dnsServers.map((server, index) => (
                <option key={index} value={server.value}>
                  {server.name}
                </option>
              ))}
            </select>
          </div>
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Active Filters:
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Add custom TXT records and apply the filters.
            </p>
            <div className="flex items-center space-x-3">
              <Input
                id="slug"
                placeholder="Enter custom TXT"
                className="flex-1 rounded-lg px-4 py-3 text-center border-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={newRecord}
                onChange={(e) => setNewRecord(e.target.value)}
              />
              <Button
                variant="secondary"
                className="rounded-full py-3 px-6"
                onClick={() => {
                  if (newRecord) {
                    addRecord(newRecord);
                    setNewRecord("");
                  }
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                <span>Add</span>
              </Button>
            </div>
          </div>

          {records.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                {records.map((record: string, key: number) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="px-4 py-2 text-sm hover:bg-red-500 hover:text-white dark:bg-gray-700 dark:hover:bg-red-600 dark:hover:text-white transition-all cursor-pointer"
                    onClick={() => removeRecord(record)}
                  >
                    <XIcon className="h-4 w-4 mr-1" />
                    {record}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-8 flex justify-between space-x-3">
          <Button
            variant="secondary"
            className="w-full rounded-full py-4 text-md font-semibold"
            onClick={resetRecords}
          >
            <ListRestart className="h-5 w-5 mr-2" />
            <span>Reset</span>
          </Button>
          <Button
            variant="default"
            className="w-full rounded-full py-4 text-md font-semibold"
            onClick={closeModal}
          >
            <CheckCheckIcon className="h-5 w-5 mr-2" />
            <span>Apply</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
