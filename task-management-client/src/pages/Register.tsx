/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useThemeContext } from "../context/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "../services/authServices";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  });

  // ✅ Mutation for register API
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      registerService({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    onSuccess: () => {
      navigate(ROUTES.SIGN_IN);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 3,
          boxShadow: mode === "light" ? 3 : 6,
        }}
      >
        <CardContent>
          <Typography variant="h4" mb={2} textAlign="center">
            Create Account
          </Typography>

          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {(error as any)?.response?.data?.message || "Registration failed"}
            </Alert>
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Full Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isPending}
              startIcon={isPending ? <CircularProgress size={20} /> : null}
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </Button>

            <Typography variant="body2" textAlign="center" mt={1}>
              Already have an account?{" "}
              <Link component="button" onClick={() => navigate(ROUTES.SIGN_IN)}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
