import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";

interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: "admin" | "buyer" | "other";
}

export function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.id ?? 0,
    email: user?.email ?? "",
    name: user?.username ?? "",
    role: "buyer",
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  if (!user) {
    return <div>User not found</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing(false);
    setShowSuccess(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              src={
                "data:image/jpeg;base64,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"
              }
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Box>
              <Typography variant="h4">{profile.name}</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{ mt: 1 }}
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </Button>
            </Box>
          </Box>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={editedProfile.role}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile(profile);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{profile.email}</Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserProfilePage;
