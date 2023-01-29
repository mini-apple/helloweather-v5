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

function TableTemperature() {
  const rows = [
    "1.0°C 이하",
    "1.0°C<~≤2.0°C",
    "2.0°C<~≤3.0°C",
    "3.0°C<~≤4.0°C",
    "4.0°C<~≤5.0°C",
    "5.0°C 초과",
  ];

  const dataSet = [10, 8, 6, 4, 2, 0];

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
              <TableCell align="center"></TableCell>
              {rows.map((row) => (
                <TableCell key={row} align="center">
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="center">
                점수
              </TableCell>
              <TableCell align="center">{dataSet[0]}</TableCell>
              <TableCell align="center">{dataSet[1]}</TableCell>
              <TableCell align="center">{dataSet[2]}</TableCell>
              <TableCell align="center">{dataSet[3]}</TableCell>
              <TableCell align="center">{dataSet[4]}</TableCell>
              <TableCell align="center">{dataSet[5]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box className="criteria-modal">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  {rows.map((row) => (
                    <TableCell key={row} align="center">
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    점수
                  </TableCell>
                  <TableCell align="center">{dataSet[0]}</TableCell>
                  <TableCell align="center">{dataSet[1]}</TableCell>
                  <TableCell align="center">{dataSet[2]}</TableCell>
                  <TableCell align="center">{dataSet[3]}</TableCell>
                  <TableCell align="center">{dataSet[4]}</TableCell>
                  <TableCell align="center">{dataSet[5]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}

export default TableTemperature;
