import { Home as HomeIcon } from "@mui/icons-material";
import {
	AppBar,
	Box,
	Breadcrumbs,
	Link as MUILink,
	Toolbar,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import {
	useCampaignNameQuery,
	useEncounterNameQuery,
} from "@graphql/client-types";

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
	const theme = useTheme();
	const { campaignId, encounterId } = useParams();
	const location = useLocation();
	const isSmallView = useMediaQuery(theme.breakpoints.down("md"));

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
	}, [refetchCampaignData, location.pathname]);

	const routes = useMemo(() => {
		const pathname = location.pathname.replace(/\/$/, "");
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
			case `/${campaignId}/edit`:
				routes.push({
					title: campaignData?.campaign?.name,
				});
				break;
			case `/${campaignId}/encounter`:
				routes.push({
					href: `/${campaignId}/edit`,
					title: campaignData?.campaign?.name,
				});
				routes.push({
					title: "Encounters",
				});
				break;
			case `/${campaignId}/encounter/run`:
			case `/${campaignId}/encounter/${encounterId}/edit`:
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
	}, [campaignId, campaignData, encounterId, encounterData, location.pathname]);

	return !location.pathname.includes("overlay") ? (
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
									<Link key={href} to={href}>
										<MUILink component="span" underline="hover" color="text.">
											<Typography noWrap>{title}</Typography>
										</MUILink>
									</Link>
								) : (
									<Typography key={href || "active"} noWrap>
										{title}
									</Typography>
								),
							)}
						</Breadcrumbs>
					</Toolbar>
				</Container>
			</StyledAppBar>
		</Box>
	) : null;
}
