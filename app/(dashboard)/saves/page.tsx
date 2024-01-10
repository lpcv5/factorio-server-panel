"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { columns, users } from "./data";
import { DeleteIcon } from "./DeleteIcon";
import { DownloadIcon } from "./DownloadIcon";

export default function SavesPage() {
  const renderCell = React.useCallback((columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <div>asd</div>;
      case "time":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              asdf
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="secondary" content="下载存档">
              <span className="text-lg text-secondary cursor-pointer active:opacity-50">
                <DownloadIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="删除存档">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <div>asdff</div>;
    }
  }, []);

  return (
    <Table aria-label="存档列表">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
