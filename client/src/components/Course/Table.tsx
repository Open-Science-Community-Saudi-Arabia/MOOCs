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
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  approveACourse,
  archiveACourse,
  makeCoursePending,
  toggleAvailablity,
  toggleCourseEditing,
} from "../../utils/api/courses";
dayjs.extend(advancedFormat);
dayjs().format();
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import {
  MdOutlineUnarchive,
  MdPendingActions,
  MdViewInAr,
} from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { FaRegFileArchive } from "react-icons/fa";
import { MdOutlineEditOff } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { Trans, t } from "@lingui/macro";
import "./style.scss";

type Props = {
  locale: string;
  courses: Courses[];
  handleSelectedCourse: (course: Courses) => void;
  getAvailableCourses: () => void;
};

export default function Table({
  locale,
  courses,
  getAvailableCourses,
  handleSelectedCourse,
}: Props) {
  const [courseAction, setCourseAction] = useState<Courses | any>({});
  const [isLoadingAction, setLoadingAction] = useState(false);
  const columnHelper = createColumnHelper<Courses>();

  const approveCourse = async () => {
    setLoadingAction(true);
    try {
      let res = await approveACourse(courseAction._id);
      setLoadingAction(false);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setLoadingAction(false);
      toast.error(t`Request failed`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      getAvailableCourses();
    }
  };

  const archiveCourse = async () => {
    setLoadingAction(true);
    try {
      let res = await archiveACourse(courseAction._id);
      setLoadingAction(false);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setLoadingAction(false);
      toast.error(t`Request failed`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      getAvailableCourses();
    }
  };

  const toggleAvailablityHandler = async () => {
    setLoadingAction(true);
    try {
      let res = await toggleAvailablity(courseAction._id);
      setLoadingAction(false);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setLoadingAction(false);
      toast.error(t`Request failed`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      getAvailableCourses();
    }
  };

  const toggleCourseEditingHandler = async () => {
    setLoadingAction(true);
    try {
      let res = await toggleCourseEditing(courseAction._id);
      setLoadingAction(false);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setLoadingAction(false);
      toast.error(t`Request failed`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      getAvailableCourses();
    }
  };

  const revokeApproval = async () => {
    setLoadingAction(true);
    try {
      let res = await makeCoursePending(courseAction._id);
      setLoadingAction(false);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setLoadingAction(false);
      toast.error(t`Request failed`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      getAvailableCourses();
    }
  };
  const columns = [
    columnHelper.accessor("preview_image", {
      cell: (info) => (
        <img
          className="w-10 h-10 border-[1px] border-gray rounded-full"
          src={info.getValue()}
        />
      ),
      header: () => (
        <span>
          <Trans>Cover</Trans>
        </span>
      ),
    }),

    columnHelper.accessor(`${locale === "en" ? "title" : "title_tr"}`, {
      cell: (info) => <p className="w-48 m-auto">{info.getValue()}</p>,
      header: () => (
        <span>
          <Trans>Title</Trans>
        </span>
      ),
    }),
    columnHelper.accessor("createdBy", {
      cell: (info) => (
        <p className="w-36">
          {info.getValue().firstname} {info.getValue().lastname}
        </p>
      ),
      header: () => (
        <span>
          <Trans>Contributor's name</Trans>
        </span>
      ),
    }),
    columnHelper.accessor(
      `${locale === "en" ? "createdBy.role" : "createdBy.role_tr"}`,
      {
        cell: (info) => <p className="w-20 m-auto">{info.getValue()}</p>,
        header: () => (
          <span>
            <Trans>Role</Trans>
          </span>
        ),
      }
    ),
    columnHelper.accessor(`createdBy.email`, {
      cell: (info) => <p className="w-48 m-auto">{info.getValue()}</p>,
      header: () => (
        <span>
          <Trans>Email</Trans>
        </span>
      ),
    }),
    columnHelper.accessor(`updatedAt`, {
      cell: (info) => dayjs(info.getValue()).format("Do MMMM, YYYY"),
      header: () => (
        <span>
          <Trans>Last Updated</Trans>
        </span>
      ),
    }),
    columnHelper.accessor(
      (row) => `${locale === "en" ? row.status : row.status_tr}`,
      {
        id: t`status`,
        cell: (info) => (
          <div
            className={`${
              info.getValue() === t`Pending`
                ? "bg-error"
                : info.getValue() === t`Draft`
                ? "bg-gray-dark"
                : info.getValue() === t`Archived`
                ? "bg-gray-dark"
                : "bg-success"
            } font-semibold text-white rounded-full py-1.5 px-2 text-center text-xs ml-auto`}
          >
            {info.getValue()}
          </div>
        ),
      }
    ),
    columnHelper.accessor("author", {
      cell: (info) => (
        <div className="flex justify-center w-full relative">
          <button
            onClick={() =>
              setCourseAction(
                courseAction._id === info.row.original._id
                  ? {}
                  : info.row.original
              )
            }
            type="button"
            className={`${
              courseAction._id === info.row.original._id && "bg-gray"
            } hover:bg-gray p-1.5 text-dark-gray`}
          >
            {isLoadingAction && courseAction._id === info.row.original._id ? (
              <Spinner width="20px" height="20px" color="#fff" />
            ) : (
              <BsThreeDotsVertical />
            )}
          </button>
          {courseAction._id === info.row.original._id && (
            <div className="z-10 shadow shadow-xl w-40 border-dark-gray top-2 absolute bg-white border border-y-[1px] border-gray rounded-md table_actions">
              <button
                onClick={() => handleSelectedCourse(info.row.original)}
                className="font-medium py-2.5 px-3 text-xs hover:bg-gray/70 border-b-[1px] border-gray text-left block text-gray-dark rounded-none w-full"
              >
                <span className="flex items-center gap-x-2">
                  <MdViewInAr size={14} />
                  <Trans> View course</Trans>
                </span>
              </button>
              <button
                onClick={() => archiveCourse()}
                className="font-medium py-2.5 px-3 w-full text-left border border-b-[1px] text-gray-dark border-gray border-x-0 rounded-none hover:bg-gray/70 text-xs block"
              >
                {info.row.original.status === "Archived" ? (
                  <span className="flex items-center gap-x-2">
                    {" "}
                    <MdOutlineUnarchive size={14} />
                    <Trans> Un-archive</Trans>
                  </span>
                ) : (
                  <span className="flex items-center gap-x-2">
                    {" "}
                    <FaRegFileArchive size={14} /> <Trans>Archive course</Trans>
                  </span>
                )}
              </button>
              {info.row.original.status === "Pending" ? (
                <button
                  onClick={() => approveCourse()}
                  className="font-medium py-2.5 px-3 border-x-0 text-left border border-b-[1px] border-t-0 border-x-0 border-gray w-full hover:bg-gray/70 text-gray-dark rounded-none text-xs block"
                >
                  <span className="flex items-center gap-x-2">
                    <FcAcceptDatabase size={14} />
                    <Trans> Approve course</Trans>
                  </span>
                </button>
              ) : info.row.original.status === "Approved" ? (
                <>
                  <button
                    onClick={() => revokeApproval()}
                    className="font-medium py-2.5 px-3 text-left border-b-[1px] border-gray w-full hover:bg-gray text-gray-dark rounded-none text-xs block"
                  >
                    <span className="flex items-center gap-x-2">
                      <MdPendingActions size={14} />
                      <Trans> Revoke approval</Trans>
                    </span>
                  </button>

                  <button
                    onClick={() => toggleAvailablityHandler()}
                    className="font-medium py-2.5 px-3 text-left w-full hover:bg-gray rounded-none border border-b-[1px] border-x-0 border-gray text-gray-dark text-xs block"
                  >
                    {info.row.original.isAvailable ? (
                      <span className="flex items-center gap-x-2">
                        <CgUnavailable size={14} />
                        <Trans> Make unavailable</Trans>
                      </span>
                    ) : (
                      <span className="flex items-center gap-x-2">
                        <MdOutlineAccessTime size={14} />
                        <Trans> Make available</Trans>
                      </span>
                    )}
                  </button>
                </>
              ) : (
                ""
              )}
              <button
                onClick={() => toggleCourseEditingHandler()}
                className="font-medium py-2.5 px-3 w-full text-left border-gray text-gray-dark border-x-0 rounded-none hover:bg-gray/70 text-xs block"
              >
                {info.row.original.enableEditing ? (
                  <span className="flex items-center gap-x-2">
                    <MdOutlineEditOff size={14} />
                    <Trans> Disable editing</Trans>
                  </span>
                ) : (
                  <span className="flex items-center gap-x-2">
                    {" "}
                    <CiEdit size={14} />
                    <Trans> Enable editing</Trans>
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      ),
      header: () => (
        <span>
          <Trans>Actions</Trans>
        </span>
      ),
    }),
  ];

  const [data, _setData] = React.useState(() => [...courses]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-md h-[80vh] border-gray overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-3 text-sm py-4 text-center font-semibold"
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
              className={`${
                i % 2 ? " bg-[#f6fafd]" : "bg-primary/10"
              } border border-x-0 border-gray cursor-pointer hover:bg-primary/40`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="px-3 text-center text-sm py-3 w-auto"
                  key={cell.id}
                >
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
