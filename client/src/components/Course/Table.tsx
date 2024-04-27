import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Courses } from "../../types";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);
dayjs().format();

type Props = {
  courses: Courses[];
  handleSelectedCourse: (course: Courses) => void;
};

export default function Table({ courses, handleSelectedCourse }: Props) {
  const columnHelper = createColumnHelper<Courses>();

  const columns = [
    columnHelper.accessor("preview_image", {
      cell: (info) => (
        <img className="w-10 h-10 rounded-full" src={info.getValue()} />
      ),
      header: () => <span>Cover</span>,
    }),

    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
    }),
    columnHelper.accessor("createdBy", {
      cell: (info) => (
        <p>
          {info.getValue().firstname} {info.getValue().lastname}
        </p>
      ),
      header: () => <span>Createdby</span>,
    }),
    columnHelper.accessor("createdBy.role", {
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <span>Role</span>,
    }),
    columnHelper.accessor(`createdAt`, {
      cell: (info) => dayjs(info.getValue()).format("Do MMMM, YYYY"),
      header: () => <span>Created Date</span>,
    }),

    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => (
        <div
          className={`${
            info.getValue() === "Pending"
              ? "bg-error"
              : info.getValue() === "Draft"
              ? "bg-gray-dark"
              : "bg-success"
          } font-semibold text-white rounded-full py-1 text-center text-xs ml-auto`}
        >
          {info.getValue()}
        </div>
      ),
      header: () => <span>Status</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const [data, _setData] = React.useState(() => [...courses]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-md border-gray">
      <table className="w-full bg-[#f6fafd]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-3 py-4 text-left font-semibold"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              onClick={() => handleSelectedCourse(data[i])}
              className={`${
                i % 2 && "bg-primary/10"
              } border border-x-0 border-gray  cursor-pointer hover:bg-primary/50`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="px-3 py-3" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
