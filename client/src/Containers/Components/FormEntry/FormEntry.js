import { useForm } from "react-hook-form";
import "./FormEntry.css";
import Button from "@mui/material/Button";
import readXlsxFile from "read-excel-file";
import { useFormEntryDetails } from "../../../Query/Hooks/useFormEntry";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export const FormEntry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formEntry = useFormEntryDetails();
  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  const transformData = (array) => {
    const headers = array[0];
    const rows = array.slice(1);

    return rows.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index]; // Assign header as key and row item as value
      });
      return obj;
    });
  };

  function findMaxMinDiff(a, b, c) {
    const max = Math.max(a, b, c);
    const min = Math.min(a, b, c);
    const difference = max - min;

    return difference;
  }

  const mergeObjects = (obj1, obj2, obj3) => {
    return obj1.map((item1) => {
      const matchingItem = obj2.find(
        (item2) =>
          item2.roll_no === item1.roll_no && item2.std_name === item1.std_name
      );

      if (matchingItem) {
        const difference = findMaxMinDiff(
          parseFloat(matchingItem.PMC1_mark),
          parseFloat(matchingItem.PMC2_mark),
          parseFloat(matchingItem.PMC3_mark)
        );

        const total_pmc = obj3.pmc_total_mark * 0.1;
        const moderation = difference > total_pmc;

        return { ...item1, ...matchingItem, ...obj3, moderation };
      }

      return item1;
    });
  };

  const onSubmit = async (data) => {
    let otherDetails = {
      semester: parseFloat(data.semester),
      guide_total_mark: parseFloat(data.guidemark),
      pmc_total_mark: parseFloat(data.pmcmark),
      batch: data.batch,
    };
    let detailsObject = {};
    let marksObject = {};
    const detailsFile = data.detailsexcel[0];
    const marksFile = data.marksexcel[0];
    if (detailsFile && detailsFile.name) {
      try {
        const rows = await readXlsxFile(detailsFile);
        detailsObject = transformData(rows);
      } catch (error) {
        console.error("Error reading the Excel file:", error);
      }
    } else {
      console.error("Details File not found or invalid format.");
    }
    if (marksFile && marksFile.name) {
      try {
        const rows = await readXlsxFile(marksFile);
        marksObject = transformData(rows);
      } catch (error) {
        console.error("Error reading the Excel file:", error);
      }
    } else {
      console.error("Marks File not found or invalid format.");
    }
    const object = mergeObjects(detailsObject, marksObject, otherDetails);
    formEntry
      .mutateAsync(object)
      .then(() => {
        setSuccessSnackBar(true);
      })
      .catch(() => setErrorSnackBar(true));
  };

  return (
    <form className="loggerForm" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="mainForm">
        <div className="loggerFormRow">
          <div className="label">Semester</div>
          <div className="inputBox">
            <input
              type="number"
              {...register("semester", {
                required: { value: true },
                valueAsNumber: true,
              })}
              placeholder="Enter Semester"
              style={{
                borderColor: errors.semester ? "red" : "",
              }}
            />
          </div>
        </div>
        <div className="loggerFormRow">
          <div className="label">Batch</div>
          <div className="inputBox">
            <input
              {...register("batch", {
                required: { value: true },
              })}
              placeholder="Enter Batch"
              style={{
                borderColor: errors.batch ? "red" : "",
              }}
            />
          </div>
        </div>
        <div className="loggerFormRow">
          <div className="label">Guide mark</div>
          <div className="inputBox">
            <input
              type="number"
              {...register("guidemark", {
                required: { value: true },
                valueAsNumber: true,
              })}
              placeholder="Enter Guide Mark"
              style={{
                borderColor: errors.guidemark ? "red" : "",
              }}
            />
          </div>
        </div>
        <div className="loggerFormRow">
          <div className="label">PMC mark</div>
          <div className="inputBox">
            <input
              type="number"
              {...register("pmcmark", {
                required: { value: true },
                valueAsNumber: true,
              })}
              style={{
                borderColor: errors.pmcmark ? "red" : "",
              }}
              placeholder="Enter PMC Mark"
            />
          </div>
        </div>
        <div className="loggerFormRow">
          <div className="label">Upload marks excel</div>
          <div className="inputBox">
            <input
              type="file"
              accept=".xlsx, .xls"
              {...register("marksexcel", {
                required: { value: true },
              })}
              style={{
                borderColor: errors.marksexcel ? "red" : "",
                width: "177px",
              }}
            />
          </div>
        </div>
        <div className="loggerFormRow">
          <div className="label">Upload project details excel</div>
          <div className="inputBox">
            <input
              type="file"
              accept=".xlsx, .xls"
              {...register("detailsexcel", {
                required: { value: true },
              })}
              style={{
                borderColor: errors.detailsexcel ? "red" : "",
                width: "177px",
              }}
            />
          </div>
        </div>
      </div>
      <Button variant="contained" className="submitButton" type="submit">
        Submit
      </Button>
    </form>
  );
};
