import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useInterval } from "react-use";
import {
	HideMonsterNames,
	useCampaignSubscription,
} from "../../../graphql/client-types";
import { parseDate, formatTimeDuration } from "../../../utils";

export default function Initiative() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	const { hideMonsterNames, round, turn, turnStart } = useMemo(
		() =>
			data?.campaign?.activeEncounter ?? {
				hideMonsterNames: HideMonsterNames.Always,
				round: 0,
				turn: 0,
				turnStart: null,
			},
		[data]
	);

	const combatants = useMemo(() => {
		return (
			data?.campaign?.activeEncounter?.combatants.sort(
				(a, b) => a.turnOrder - b.turnOrder
			) ?? []
		);
	}, [data]);

	const [turnDuration, setTurnDuration] = useState<string | null>(null);
	const [overTime, setOverTime] = useState<boolean>(false);
	useInterval(() => {
		if ((round > 0 || turn > 0) && turnStart) {
			const currentTime = new Date();
			const startTime = parseDate(turnStart);
			setTurnDuration(
				formatTimeDuration(currentTime, parseDate(turnStart), [
					"minutes",
					"seconds",
				])
			);
			setOverTime(currentTime.getTime() - startTime.getTime() > 60 * 1000);
		} else if (turnDuration) {
			setTurnDuration(null);
			setOverTime(false);
		}
	}, 1000);

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
					<Box
						className={overTime ? "blink" : undefined}
						sx={{
							color: overTime ? "error.main" : "text.secondary",
							display: "inline-flex",
						}}
					>
						{turnDuration && `(${turnDuration})`}
					</Box>
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
							{combatant.turnOrder === turn && (
								<Image src="/d20.png" alt="d20" height={32} width={32} />
							)}
						</Box>
						<Box
							sx={{
								fontWeight: combatant.turnOrder === turn ? "bold" : undefined,
								textDecoration:
									combatant.turnOrder === turn ? "underline" : undefined,
							}}
						>
							{(function () {
								switch (hideMonsterNames) {
									case HideMonsterNames.Always:
										if (!combatant.public) return "???";
									case HideMonsterNames.UntilTurn:
										if (
											!combatant.public &&
											turn < combatant.turnOrder &&
											round <= 1
										)
											return "???";
									default:
										return combatant.name;
								}
							})()}
						</Box>
					</Box>
				))}
			</Box>
		</>
	);
}
