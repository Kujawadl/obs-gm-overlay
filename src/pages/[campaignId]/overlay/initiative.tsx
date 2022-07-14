import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useInitiativeSubscription } from "../../../graphql/client-types";

export default function Initiative() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data } = useInitiativeSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	const { round, initiativeCount } = useMemo(
		() => data?.campaign?.initiative ?? { round: 0, initiativeCount: 0 },
		[data]
	);

	const combatants = useMemo(() => {
		return (
			data?.campaign?.initiative.combatants.sort(
				(a, b) => b.initiative - a.initiative
			) ?? []
		);
	}, [data]);

	return (
		<>
			<Head>
				<title>{`${
					data?.campaign?.name ?? "Campaign"
				} Initiative | OBS GM Overlay`}</title>
			</Head>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around",
				}}
			>
				<Typography variant="h5" sx={{ marginLeft: 4 }}>
					Round {round}
				</Typography>
				{combatants.map((combatant, i) => (
					<Box
						key={`combatant_${i}_${combatant}`}
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							height: 32,
						}}
					>
						<Box sx={{ width: 32, display: "inline-block" }}>
							{combatant.initiative === initiativeCount && (
								<Image src="/d20.png" alt="d20" height={32} width={32} />
							)}
						</Box>
						<Box
							sx={{
								fontWeight:
									combatant.initiative === initiativeCount ? "bold" : undefined,
								textDecoration:
									combatant.initiative === initiativeCount
										? "underline"
										: undefined,
							}}
						>
							{combatant.name}
						</Box>
					</Box>
				))}
			</Box>
		</>
	);
}
