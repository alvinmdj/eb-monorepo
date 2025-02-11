import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserData } from "@/store/actions";
import type { AppDispatch, RootState } from "@/store/store";

export function UserInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.user);
  return (
    <Box my={2} sx={{ border: "1px solid #ccc", padding: 2 }}>
      <Typography variant="h6" mb={2}>
        User Information
      </Typography>

      <Button
        onClick={() => dispatch(fetchUserData())}
        disabled={loading}
        variant="contained"
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Fetch User Data"}
      </Button>

      {data && (
        <Box mt={2}>
          <Typography>Email: {data.email || "-"}</Typography>
          <Typography>Name: {data.name || "-"}</Typography>
          <Typography>Hobby: {data.hobby || "-"}</Typography>
        </Box>
      )}
    </Box>
  );
}
