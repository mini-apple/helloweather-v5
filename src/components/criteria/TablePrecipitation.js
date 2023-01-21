import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TablePrecipitation() {
  const rows = [
    "없음(X)",
    "0.0≤~<5",
    "5≤~10",
    "10≤~<20",
    "20≤~<30",
    "30≤~<50",
    "50≤~<80",
    "80≤~<120",
    "120mm 이상",
  ];
  const cols = [
    "없음(X)",
    "0.0≤~<5",
    "5≤~10",
    "10≤~<20",
    "20≤~<30",
    "30≤~<50",
    "50≤~<80",
    "80≤~<120",
    "120mm 이상",
  ];

  const index = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const dataSet = [
    [10, 7, 4, 1, null, null, null, null, null],
    [7, 10, 7, 4, 1, null, null, null, null],
    [4, 7, 10, 7, 4, 1, null, null, null],
    [1, 4, 7, 10, 7, 4, 1, null, null],
    [null, 1, 4, 7, 10, 7, 4, 1, null],
    [null, null, 1, 4, 7, 10, 7, 4, 1],
    [null, null, null, 1, 4, 7, 10, 7, 4],
    [null, null, null, null, 1, 4, 7, 10, 7],
    [null, null, null, null, null, 1, 4, 7, 10],
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {rows.map((row) => (
              <TableCell key={row} align="center">
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {index.map((i) => (
            <TableRow>
              <TableCell component="th" scope="row" align="center">
                {cols[i]}
              </TableCell>
              <TableCell align="center">{dataSet[i][0]}</TableCell>
              <TableCell align="center">{dataSet[i][1]}</TableCell>
              <TableCell align="center">{dataSet[i][2]}</TableCell>
              <TableCell align="center">{dataSet[i][3]}</TableCell>
              <TableCell align="center">{dataSet[i][4]}</TableCell>
              <TableCell align="center">{dataSet[i][5]}</TableCell>
              <TableCell align="center">{dataSet[i][6]}</TableCell>
              <TableCell align="center">{dataSet[i][7]}</TableCell>
              <TableCell align="center">{dataSet[i][8]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablePrecipitation;
