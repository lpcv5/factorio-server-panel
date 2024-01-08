"use client";
import {
  Button,
  Input,
  Spacer,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";
import React, { useState } from "react";
import SpinnerSvg from "@/components/spinnersvg";
import { animals } from "./data";
import { trpc } from "@/app/_trpc/client";

interface DownItem {
  id: number;
  label: string;
  value: string;
}

export default function ServerPage() {
  const [versionid, setVersionId] = useState<Selection>(new Set([]));
  const [savesid, setSavesId] = useState<Selection>(new Set([]));
  const [startstatus, setStartstatus] = useState(false);
  const [downlist, setDownlist] = useState<DownItem[]>([
    { id: 0, label: "加载中", value: "加载中" },
  ]);
  const getTodos = trpc.getTodos.useQuery();
  async function getData() {
    if (downlist.length !== 1) return;
    setDownlist(getTodos.data || [{ id: 0, label: "获取失败", value: "获取失败" }]);
  }

  return (
    <>
      <div className="px-40">
        <label>
          状态：<span>{startstatus ? "已启动 🟢" : "未启动 🔴"}</span>
        </label>
        <Spacer y={2} />
        <label>
          游戏版本：<span>{versionid}</span>
        </label>
      </div>
      <Spacer y={8} />
      <div className="flex px-40 gap-2">
        <Select
          label="游戏版本"
          placeholder="请选择后下载"
          isRequired
          className=""
          selectedKeys={versionid}
          onClick={getData}
          onSelectionChange={setVersionId}
        >
          {downlist.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
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
        <Select
          label="存档"
          variant="bordered"
          placeholder="选择一个存档以启动"
          className="col-span-3"
          onSelectionChange={setSavesId}
        >
          {animals.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Spacer y={8} />
    </>
  );
}
