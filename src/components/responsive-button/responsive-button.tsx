import {
	Button,
	ButtonProps,
	IconButton,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { ReactNode } from "react";

interface ResponsiveButtonProps extends ButtonProps {
	icon: ReactNode;
	text: ReactNode;
}

export default function ResponsiveButton({
	icon,
	text,
	...props
}: ResponsiveButtonProps) {
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));

	return isMobileView ? (
		<IconButton {...props}>{icon}</IconButton>
	) : (
		<Button {...props}>{text}</Button>
	);
}
