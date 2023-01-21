import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableWindSpeed() {
  const rows = [
    "0.5m/s 미만",
    "0.5≤~<5",
    "5≤~<10",
    "10≤~<15",
    "15≤~<20",
    "20m/s 이상",
  ];
  const cols = [
    "0.5m/s 미만",
    "0.5≤~<5",
    "5≤~<10",
    "10≤~<15",
    "15≤~<20",
    "20m/s 이상",
  ];

  const index = [0, 1, 2, 3, 4, 5];

  const dataSet = [
    [10, 7, 4, 1, null, null],
    [7, 10, 7, 4, 1, null],
    [4, 7, 10, 7, 4, 1],
    [1, 4, 7, 10, 7, 4],
    [null, 1, 4, 7, 10, 7],
    [null, null, 1, 4, 7, 10],
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableWindSpeed;
