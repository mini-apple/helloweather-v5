import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Modal from "@mui/material/Modal";

function TableWindDirection() {
  const rows = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const cols = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const dataSet = [
    [10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8],
    [8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6],
    [6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4],
    [4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2],
    [2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null],
    [null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null],
    [null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null],
    [null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null],
    [null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null],
    [null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null],
    [null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null],
    [null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2],
    [2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4],
    [4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6],
    [6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8],
    [8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10],
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className="criteria-fullscreen">
        <IconButton size="small" color="primary" onClick={handleOpen}>
          <OpenInFullIcon />
        </IconButton>
      </Box>

      <TableContainer className="criteria-table" component={Paper}>
        <Table stickyHeader>
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
                <TableCell align="center">{dataSet[i][9]}</TableCell>
                <TableCell align="center">{dataSet[i][10]}</TableCell>
                <TableCell align="center">{dataSet[i][11]}</TableCell>
                <TableCell align="center">{dataSet[i][12]}</TableCell>
                <TableCell align="center">{dataSet[i][13]}</TableCell>
                <TableCell align="center">{dataSet[i][14]}</TableCell>
                <TableCell align="center">{dataSet[i][15]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box className="criteria-modal">
          <TableContainer>
            <Table size="small">
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
                    <TableCell align="center">{dataSet[i][9]}</TableCell>
                    <TableCell align="center">{dataSet[i][10]}</TableCell>
                    <TableCell align="center">{dataSet[i][11]}</TableCell>
                    <TableCell align="center">{dataSet[i][12]}</TableCell>
                    <TableCell align="center">{dataSet[i][13]}</TableCell>
                    <TableCell align="center">{dataSet[i][14]}</TableCell>
                    <TableCell align="center">{dataSet[i][15]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}

export default TableWindDirection;
