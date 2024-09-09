import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
  const { records, removeRecord, resetRecords, addRecord } =
    useRecordsContext();
  const [newRecord, setNewRecord] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={openModal}>
        <Button
          variant="secondary"
          className="w-full md:max-w-[250px] rounded-full mt-4 md:mt-8 py-8 text-lg font-semibold"
          disabled={disabled}
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <span>Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-black">
        <DialogHeader className="mb-3">
          <DialogTitle className="mb-2">Filters</DialogTitle>

          <div className="flex flex-col gap-4 pb-4">
            <Input
              id="slug"
              placeholder="slug"
              className="col-span-3 rounded-full px-6 text-center"
              autoFocus
              value={newRecord}
              onChange={(e) => setNewRecord(e.target.value)}
            />
            <Button
              variant="secondary"
              className="py-3 px-6 text-xs rounded-full"
              onClick={() => {
                addRecord(newRecord);
                setNewRecord("");
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Add Custom TXT</span>
            </Button>
          </div>

          <div className="flex mb-4 flex-col border-t-2 pt-6">
            <div className="flex flex-start flex-wrap gap-2">
              {records &&
                records.map((record: string, key: number) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white dark:hover:bg-red-800 dark:hover:text-white"
                    onClick={() => removeRecord(record)}
                  >
                    <XIcon className="h-4 w-4 mr-1 " />
                    {record}
                  </Badge>
                ))}
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={() => closeModal()}>
          <DialogFooter>
            <Button
              variant="secondary"
              className="w-full rounded-full py-6 px-6 text-md font-semibold"
              onClick={() => resetRecords()}
            >
              <ListRestart className="h-4 w-4 mr-2" />
              <span>Reset</span>
            </Button>
            <Button
              variant="default"
              className="w-full rounded-full py-6 px-6 text-md font-semibold"
              type="submit"
              onClick={() => {
                closeModal();
              }}
            >
              <CheckCheckIcon className="h-5 w-5 mr-2" />
              <span>Apply</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <DialogOverlay onClick={closeModal} />
    </Dialog>
  );
}
