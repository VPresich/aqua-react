import { createSlice } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../helpers/api";
import {
  signIn,
  signOut,
  signUp,
  fetchCurrentUser,
  updateUser,
  sendResetEmail,
  validateResetToken,
  resetPassword,
  fetchOAuthUrl,
  googleLogin,
  getUsersCount,
} from "./userOps";

const initialState = {
  user: {
    userId: null,
    name: null,
    email: null,
    avatar: null,
    gender: null,
    weight: null,
    sportTime: null,
    waterNorm: null,
    createdAt: null,
    updatedAt: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  isResendVerify: false,
  error: null,
  usersCount: null,
  oAuthUrl: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      setAuthHeader(action.payload.accessToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user.userId = action.payload.user._id;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An unknown error.";
        }
      })

      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        state.user = { ...action.payload.data.user };
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during sign ip.";
        }
      })

      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during sign out.";
        }
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...action.payload.user };
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during fetching user";
        }
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...action.payload.user };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during update.";
        }
      })

      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during reset user email.";
        }
      })
      .addCase(validateResetToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateResetToken.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during refresh token.";
        }
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during the user password reset.";
        }
      })

      .addCase(fetchOAuthUrl.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchOAuthUrl.fulfilled, (state, action) => {
        state.oAuthUrl = action.payload.data.url;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchOAuthUrl.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred in get OAuthUrl.";
        }
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred in google login.";
        }
      })

      .addCase(getUsersCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log();
        state.usersCount = action.payload.data.usersCount;
      })
      .addCase(getUsersCount.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred in users counting.";
        }
      });
  },
});

export const { refreshToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
