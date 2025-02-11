import Link from "next/link";
import { Box, Button, CircularProgress } from "@mui/material";
import { signOut } from "firebase/auth";

import { useAuthCheck } from "@/lib/hooks";
import { auth } from "@/lib/firebase";

export function AuthButton() {
  const { user, loading } = useAuthCheck();

  function handleLogout() {
    signOut(auth);
  }

  return (
    <Box sx={{ width: "100%" }} mb={2}>
      {loading ? (
        <Button variant="contained" disabled fullWidth>
          <CircularProgress size={24} />
        </Button>
      ) : user ? (
        <Button variant="contained" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      ) : (
        <Button
          href="/login"
          variant="contained"
          LinkComponent={Link}
          fullWidth
        >
          Login
        </Button>
      )}
    </Box>
  );
}
