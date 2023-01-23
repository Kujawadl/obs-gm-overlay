import { useMemo, useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Container } from "@mui/system";
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	Link as MUILink,
	Menu,
	MenuItem,
	Breadcrumbs,
	useMediaQuery,
	Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { AccountCircle, Home as HomeIcon } from "@mui/icons-material";
import {
	useCampaignNameQuery,
	useEncounterNameQuery,
} from "../../graphql/client-types";

// TODO: Better handling of mobile styles
const StyledAppBar = styled(AppBar)(({ theme }) => ({
	// flexWrap: "nowrap",
	"& .MuiBreadcrumbs-separator, & .MuiBreadcrumbs-li, & a, & a:hover, & a:visited, & a:active":
		{
			color: theme.palette.primary.contrastText,
			textDecoration: "none",
			fontWeight: "normal",
		},
}));

export default function Header() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const theme = useTheme();
	const isSmallView = useMediaQuery(theme.breakpoints.down("md"));
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const { campaignId, encounterId } = router.query;

	const { data: campaignData, refetch: refetchCampaignData } =
		useCampaignNameQuery({
			variables: {
				campaignId: campaignId as string,
			},
			skip: !campaignId,
		});
	const { data: encounterData } = useEncounterNameQuery({
		variables: {
			campaignId: campaignId as string,
			encounterId: encounterId as string,
		},
		skip: !(campaignId && encounterId),
	});

	useEffect(() => {
		refetchCampaignData();
	}, [refetchCampaignData, router.pathname]);

	const routes = useMemo(() => {
		const pathname = router.pathname.replace(/\/$/, "");
		const routes: { href?: string; title: React.ReactNode }[] = [
			{
				href: "/",
				title: (
					<>
						<HomeIcon sx={{ mr: 0.25, mb: -0.25 }} fontSize="inherit" />
						Campaigns
					</>
				),
			},
		];

		switch (pathname) {
			case "/[campaignId]/edit":
				routes.push({
					title: campaignData?.campaign?.name,
				});
				break;
			case "/[campaignId]/encounter":
				routes.push({
					href: `/${campaignId}/edit`,
					title: campaignData?.campaign?.name,
				});
				routes.push({
					title: "Encounters",
				});
				break;
			case "/[campaignId]/encounter/run":
			case "/[campaignId]/encounter/[encounterId]/edit":
				routes.push({
					href: `/${campaignId}/edit`,
					title: campaignData?.campaign?.name,
				});
				routes.push({
					href: `/${campaignId}/encounter`,
					title: "Encounters",
				});
				routes.push({
					title: pathname.endsWith("run")
						? campaignData?.campaign?.activeEncounter?.name
						: encounterData?.campaign?.encounter?.name,
				});
				break;
		}

		return routes;
	}, [campaignId, campaignData, encounterData, router.pathname]);

	return !router.pathname.includes("overlay") ? (
		<Box sx={{ flexGrow: 1, pb: 4 }}>
			<StyledAppBar position="static">
				<Container maxWidth="lg">
					<Toolbar sx={{ ml: -4, mr: -4 }}>
						<Breadcrumbs
							aria-label="breadcrumb"
							sx={{ flexGrow: 1 }}
							maxItems={isSmallView ? 1 : undefined}
						>
							{routes.map(({ href, title }) =>
								href ? (
									<Link key={href} href={href}>
										<MUILink component="span" underline="hover" color="text.">
											<Typography noWrap>{title}</Typography>
										</MUILink>
									</Link>
								) : (
									<Typography key={href || "active"} noWrap>
										{title}
									</Typography>
								)
							)}
						</Breadcrumbs>
						{status === "unauthenticated" ? (
							<Button color="inherit" onClick={() => signIn()}>
								Login
							</Button>
						) : (
							<>
								<Button
									aria-label="current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpen}
									color="inherit"
								>
									<AccountCircle sx={{ mr: 0.5 }} />
									{session?.user?.name && (
										<div>Hi, {session.user.name.split(" ")[0]}!</div>
									)}
								</Button>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									keepMounted
									open={!!anchorEl}
									onClose={handleClose}
								>
									<MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
								</Menu>
							</>
						)}
					</Toolbar>
				</Container>
			</StyledAppBar>
		</Box>
	) : null;
}
