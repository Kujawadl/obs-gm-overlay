import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useInterval } from "react-use";
import { CampaignFragment, HideMonsterNames } from "../../graphql/client-types";
import { parseDate, formatTimeDuration } from "../../utils";

interface InitiativeListProps {
	campaign: CampaignFragment;
	style?: "editor" | "overlay";
	forceShowMonsterNames?: boolean;
}

export default function InitiativeList({
	campaign,
	style = "overlay",
	forceShowMonsterNames = false,
}: InitiativeListProps) {
	const { hideMonsterNames, round, turn, turnStart } = useMemo(
		() =>
			campaign?.activeEncounter ?? {
				hideMonsterNames: HideMonsterNames.Always,
				round: 0,
				turn: 0,
				turnStart: null,
			},
		[campaign],
	);

	const combatants = useMemo(() => {
		return (
			campaign?.activeEncounter?.combatants.sort(
				(a, b) => a.turnOrder - b.turnOrder,
			) ?? []
		);
	}, [campaign]);

	const [turnDuration, setTurnDuration] = useState<string | null>(null);
	const [overTime, setOverTime] = useState<boolean>(false);
	useInterval(() => {
		if ((round > 0 || turn > 0) && turnStart) {
			const currentTime = new Date();
			const startTime = parseDate(turnStart);
			const duration = formatTimeDuration(parseDate(turnStart), currentTime, [
				"minutes",
				"seconds",
			]);
			setTurnDuration(duration);
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
					campaign?.name ?? "Campaign"
				} Initiative | OBS GM Overlay`}</title>
			</Head>
			<Typography
				variant="h5"
				sx={
					style === "overlay"
						? {
								marginLeft: 2,
								marginRight: 2,
							}
						: {
								paddingTop: 2,
								paddingBottom: 2,
								paddingLeft: 4,
								paddingRight: 4,
								border: 0,
								borderStyle: "solid",
								borderTop: 2,
								borderTopColor: "primary.light",
								borderBottom: 1,
								borderBottomColor: "grey.400",
							}
				}
			>
				{round ? `Round ${round}` : "Combat Not Started"}
				<Box
					className={overTime ? "blink" : undefined}
					sx={{
						color: overTime ? "error.main" : "text.secondary",
						display: "inline-flex",
					}}
				>
					{turnDuration ? (
						`(${turnDuration})`
					) : (
						<Box sx={{ display: "inline-block", width: 62 }} />
					)}
				</Box>
			</Typography>
			{style === "overlay" && (
				<hr
					style={{
						width: "100%",
						padding: 0,
						border: "none",
						borderTop: "medium double #333",
						color: "#333",
					}}
				/>
			)}
			{combatants.map((combatant, i) => (
				<Box
					key={`combatant_${i}_${combatant}`}
					sx={
						style === "overlay"
							? {
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									height: 32,
								}
							: {
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									height: 32,
									marginTop: 2,
									paddingBottom: 2,
									border: 0,
									borderBottom: 1,
									borderStyle: "solid",
									borderColor: "grey.400",
								}
					}
				>
					<Box
						sx={{ width: 32, display: "inline-block", marginBottom: "-6px" }}
					>
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
						{forceShowMonsterNames
							? combatant.name
							: (function () {
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
		</>
	);
}
