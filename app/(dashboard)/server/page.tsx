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
import { trpc } from "@/app/_trpc/client";

interface Game {
  id: number;
  version: string;
  save: string;
  gamepath: string;
}

export default function ServerPage() {
  const [version, setVersion] = React.useState<string>("");
  const [startstatus, setStartstatus] = useState(false);

  const [game, setGame] = useState<Game>({
    id: 0,
    version: "",
    save: "",
    gamepath: "",
  });

  const dataresult = trpc.getDownlists.useQuery();
  const setDownloadInfo = trpc.setGameConfig.useMutation();
  const gameConfigData = trpc.getGameConfig.useQuery({ version: version });

  let downlist = dataresult.data || [{ version: "加载中", downurl: "" }];

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (gameConfigData.data){
      setGame(gameConfigData.data);
    }

    setVersion(e.target.value);
  };

  function setDownload() {
    let aimIndex = downlist.findIndex((element) => element.version === version);
    setDownloadInfo.mutate({
      version: version,
      url: downlist[aimIndex].downurl,
    });
  }

  //function setSaves() {
  //  const version = Array.from(selectedversion)[0];
  //  let aimIndex = downlist.findIndex((element) => element.version === version);
  //  setDownloadInfo.mutate({
  //    version: downlist[aimIndex].version,
  //    url: downlist[aimIndex].downurl,
  //  });
  //}

  return (
    <>
      <div className="px-40">
        <label>
          状态：<span>{startstatus ? "已启动 🟢" : "未启动 🔴"}</span>
        </label>
        <Spacer y={2} />
        <label>
          游戏版本：<span>{version}</span>
        </label>
      </div>
      <Spacer y={8} />
      <div className="flex px-40 gap-2">
        <Select
          label="游戏版本"
          placeholder="请选择后下载"
          isRequired
          items={downlist}
          selectedKeys={[version]}
          onChange={handleVersionChange}
        >
          {(item) => <SelectItem key={item.version}>{item.version}</SelectItem>}
        </Select>
        <Button
          className="h-14"
          color="primary"
          onClick={setDownload}
          isDisabled={game.id > 0}
        >
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
        {/*<Select
          label="存档"
          variant="bordered"
          placeholder="选择一个存档以启动"
          className="col-span-3"
          onSelectionChange={setSelectedSaves}
        >
          {animals.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>*/}
      </div>
      <Spacer y={8} />
    </>
  );
}
