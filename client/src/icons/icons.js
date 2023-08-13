import { Icon, createIcon } from "@chakra-ui/react";

export const LogoutIcon = createIcon({
  displayName: "LogoutIcon",
  viewBox: "0 0 24 24",
  path: (
    <>
      <path
        d="M7 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2V4z"
        fill="currentColor"
      />
      <path d="M20 12l-5-5v3H9v4h6v3l5-5z" fill="currentColor" />
    </>
  ),
});

export const SettingsIcon = createIcon({
  displayName: "SettingsIcon",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M12 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0 2c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0 6c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"
    />
  ),
});

export const ProfileIcon = createIcon({
  displayName: "ProfileIcon",
  viewBox: "0 0 24 24",
  path: (
    <>
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        fill="currentColor"
        d="M2 20c0-2.5 2-4.5 4.5-4.5h11c2.5 0 4.5 2 4.5 4.5v1H2v-1z"
      />
    </>
  ),
});

export const BlockIcon = createIcon({
  displayName: "BlockIcon",
  viewBox: "0 0 24 24",
  path: (
    <>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" />
    </>
  ),
});

export const SendIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.002 21L23 12L2.002 2.99999L2 10L17 12L2 14V21Z"
      fill="currentColor"
    />
  </svg>
);
