"use client";
import {
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Spacer,
} from "@nextui-org/react";
import React, { useState } from "react";
import SpinnerSvg from "@/components/spinnersvg";
import { animals } from "./data";

interface DownItem {
  id: number;
  label: string;
  value: string
}

export default function ServerPage() {
  const [label, setValue] = useState("");
  const [startstatus, setStartstatus] = useState(false);
  const [downlist, setDownlist] = useState<DownItem[]>([]);

  async function getData() {
    if(downlist.length !== 0) return
    const res = await fetch("api/server/download/");
  
    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    const data = await res.json();
    setDownlist(data['comments']);
    console.log(downlist);
  }

  return (
    <div className="w-[800px] shadow-2xl mt-3 pt-3 rounded-xl h-max bg-slate-200">
      <div className="px-40">
        <label>
          状态：<span>{startstatus ? "已启动 🟢" : "未启动 🔴"}</span>
        </label>
        <Spacer y={2} />
        <label>
          游戏版本：<span>{label}</span>
        </label>
      </div>
      <Spacer y={8} />
      <div className="flex px-40 gap-2">
        <Autocomplete
          label="游戏版本"
          variant="bordered"
          placeholder="请选择后下载"
          defaultItems={downlist}
          className=""
          onClick={getData}
          onSelectionChange={(item: any) => setValue(item)}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Button className="h-14" color="primary">
          下载
        </Button>
      </div>
      <Spacer y={8} />
      <div className="grid grid-cols-4 grid-rows-2 gap-2 px-40">
        <Input className="col-span-2" defaultValue="0.0.0.0" />
        <Input className="col-span-1" defaultValue="31672" />
        <Button
          className="h-[120px] row-span-2"
          isLoading={startstatus}
          color="secondary"
          spinner={<SpinnerSvg />}
          onClick={() => setStartstatus(true)}
        >
          启动中
        </Button>
        <Autocomplete
          label="存档"
          variant="bordered"
          placeholder="选择一个存档以启动"
          defaultItems={animals}
          className="col-span-3"
          onSelectionChange={(item: any) => setValue(item)}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Spacer y={8} />
    </div>
  );
}
