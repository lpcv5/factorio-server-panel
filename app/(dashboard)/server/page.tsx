"use client";
import {
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Spacer,
} from "@nextui-org/react";
import React, { useState } from "react";
import { animals } from "./data";

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
          onSelectionChange={(item) => setValue(item)}
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
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
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
          onSelectionChange={(item) => setValue(item)}
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
