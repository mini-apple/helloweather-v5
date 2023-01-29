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

function TableCloudiness() {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dataSet = [
    [10, 8, 6, 4, 2, null, null, null, null, null, null],
    [8, 10, 8, 6, 4, 2, null, null, null, null, null],
    [6, 8, 10, 8, 6, 4, 2, null, null, null, null],
    [4, 6, 8, 10, 8, 6, 4, 2, null, null, null],
    [2, 4, 6, 8, 10, 8, 6, 4, 2, null, null],
    [null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null],
    [null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2],
    [null, null, null, 2, 4, 6, 8, 10, 8, 6, 4],
    [null, null, null, null, 2, 4, 6, 8, 10, 8, 6],
    [null, null, null, null, null, 2, 4, 6, 8, 10, 8],
    [null, null, null, null, null, null, 2, 4, 6, 8, 10],
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
            {cols.map((col) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {col}
                </TableCell>
                <TableCell align="center">{dataSet[col][0]}</TableCell>
                <TableCell align="center">{dataSet[col][1]}</TableCell>
                <TableCell align="center">{dataSet[col][2]}</TableCell>
                <TableCell align="center">{dataSet[col][3]}</TableCell>
                <TableCell align="center">{dataSet[col][4]}</TableCell>
                <TableCell align="center">{dataSet[col][5]}</TableCell>
                <TableCell align="center">{dataSet[col][6]}</TableCell>
                <TableCell align="center">{dataSet[col][7]}</TableCell>
                <TableCell align="center">{dataSet[col][8]}</TableCell>
                <TableCell align="center">{dataSet[col][9]}</TableCell>
                <TableCell align="center">{dataSet[col][10]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box className="criteria-modal">
          <TableContainer>
            <Table>
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
                {cols.map((col) => (
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {col}
                    </TableCell>
                    <TableCell align="center">{dataSet[col][0]}</TableCell>
                    <TableCell align="center">{dataSet[col][1]}</TableCell>
                    <TableCell align="center">{dataSet[col][2]}</TableCell>
                    <TableCell align="center">{dataSet[col][3]}</TableCell>
                    <TableCell align="center">{dataSet[col][4]}</TableCell>
                    <TableCell align="center">{dataSet[col][5]}</TableCell>
                    <TableCell align="center">{dataSet[col][6]}</TableCell>
                    <TableCell align="center">{dataSet[col][7]}</TableCell>
                    <TableCell align="center">{dataSet[col][8]}</TableCell>
                    <TableCell align="center">{dataSet[col][9]}</TableCell>
                    <TableCell align="center">{dataSet[col][10]}</TableCell>
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

export default TableCloudiness;
