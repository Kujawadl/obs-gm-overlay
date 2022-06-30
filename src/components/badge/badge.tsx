import { Box } from "@mui/material";
import Image from "next/image";

interface BadgeProps {
  name: string;
  value: string | number;
  scale?: number;
}

export default function Badge({ name, value, scale = 0.8 }: BadgeProps) {
  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        textAlign: "center",
        height: 154,
        width: 132,
        transform: `scale(${scale * 100}%)`,
      }}
    >
      <Box
        component="div"
        sx={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
          position: "absolute",
        }}
      >
        <Image src="/badge.png" alt="background" layout="fill" />
      </Box>
      <Box
        component="div"
        sx={{
          paddingTop: 4,
          position: "relative",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        {value}
      </Box>
      <Box
        component="div"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 18,
        }}
      >
        {name}
      </Box>
    </Box>
  );
}
