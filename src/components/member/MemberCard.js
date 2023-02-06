import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const MemberCard = ({ userAttrObj }) => {
  return (
    <Box className="member-card">
      <Avatar src={userAttrObj.attachmentUrl} sx={{ width: 65, height: 65 }} />
      <Box className="member-card-info">
        <Box className="member-card-name-box">
          <Box>{userAttrObj.userName}</Box>
          <Box className="member-card-spaceName">
            {userAttrObj.userSpaceName}
          </Box>
        </Box>

        <Box className="member-card-entranveUniv">
          학번: {userAttrObj.userEntranveUniv}
        </Box>
        <Box className="member-card-activeYear-box">
          {userAttrObj.userActiveYear.map((activeYear) => (
            <Box key={activeYear} className="member-card-activeYear">
              {activeYear}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MemberCard;
