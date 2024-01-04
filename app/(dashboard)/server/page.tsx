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

async function getData() {
  const res = await fetch("https://www.factorio.com/download/archive/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  console.log(res.json());
}

export default function ServerPage() {
  const [value, setValue] = useState("");
  const [startstatus, setStartstatus] = useState(false);

  return (
    <div className="w-[800px] shadow-2xl mt-3 pt-3 rounded-xl h-max bg-slate-200">
      <div className="px-40">
        <p>
          状态：<span>{startstatus ? "已启动 🟢" : "未启动 🔴"}</span>
        </p>
        <Spacer y={2} />
        <p>
          游戏版本：<span>{value}</span>
        </p>
      </div>
      <Spacer y={8} />
      <div className="flex px-40 gap-2">
        <Autocomplete
          label="游戏版本"
          variant="bordered"
          placeholder="请选择后下载"
          defaultItems={animals}
          selectedKey={value}
          className=""
          onClick={getData}
          onSelectionChange={(item: any) => setValue(item)}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
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
          selectedKey={value}
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
