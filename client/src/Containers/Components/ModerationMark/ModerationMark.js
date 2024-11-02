import "./ModerationMark.css";
import { MaterialTable } from "../../Reusables/MaterialTable/MaterialTable.js";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetModerationMark } from "../../../Query/Hooks/useGetModerationMark.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { useAverageEntry } from "../../../Query/Hooks/useAverageEntry.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export const ModerationMark = () => {
  const navigate = useNavigate();
  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const [errorSnackBar, setErrorSnackBar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const { batch } = location.state || {};
  const averageEntryMutation = useAverageEntry();
  const { data, isLoading, isError } = useGetModerationMark({ batch });

  if (isLoading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading moderation data.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No moderation data available.</div>;
  }

  let columns = Object.keys(data.data[0])
    .filter((key) => key === "std_name" || key === "batch" || key === "average")
    .map((key) => {
      return {
        accessorKey: key,
        header: key,
        size: "fit-content",
        enableEditing: false,
        cellRenderer: (row) => {
          const fieldName = `rows[${row.index}].${key}`;
          return (
            <input
              type={key === "average" ? "number" : "text"}
              {...register(fieldName)}
              defaultValue={row.original[key] || ""}
              placeholder={`Enter ${key}`}
            />
          );
        },
      };
    });

  columns.unshift({
    accessorKey: "id",
    header: "id",
    size: "fit-content",
    enableEditing: false,
  });

  let rows = data.data.map((item, index) => {
    const { _id, ...rest } = item;
    return {
      id: index + 1,
      ...rest,
    };
  });

  const onSubmit = async (formData) => {
    const submittedData = formData.rows.map((row, index) => ({
      roll_no: rows[index].roll_no,
      guide_total_mark: rows[index].guide_total_mark,
      batch: rows[index].batch,
      average: row.average,
    }));
    await averageEntryMutation
      .mutateAsync(submittedData)
      .then(() => {
        setSuccessSnackBar(true);
        navigate("/admin/moderation");
      })
      .catch(() => setErrorSnackBar(true));
  };

  return (
    <div className="moderation">
      <Snackbar
        autoHideDuration={6000}
        open={successSnackBar}
        onClose={() => {
          setSuccessSnackBar(false);
        }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={() => {
            setSuccessSnackBar(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Data added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={6000}
        open={errorSnackBar}
        onClose={() => {
          setErrorSnackBar(false);
        }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={() => {
            setErrorSnackBar(false);
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Data couldn't be added, Please retry!
        </Alert>
      </Snackbar>
      <form className="moderationForm" onSubmit={handleSubmit(onSubmit)}>
        <MaterialTable
          columns={columns}
          rows={rows.map((row, index) => ({
            ...row,
            average: (
              <input
                type="number"
                {...register(`rows[${index}].average`, {
                  valueAsNumber: true,
                  required: { value: true },
                })}
                style={{
                  borderColor: errors.rows?.[index]?.average ? "red" : "",
                }}
                defaultValue={row.average}
                placeholder="Enter average"
              />
            ),
          }))}
        />
        <Button variant="contained" type="submit" className="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
