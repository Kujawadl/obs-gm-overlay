import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { CampaignFragment, PlayerFragment } from "../../graphql/client-types";
import { useCooldown } from "../../utils";

interface BadgeProps {
	player: PlayerFragment;
	campaign: CampaignFragment;
	scale?: number;
}

export default function Badge({ player, campaign, scale = 0.8 }: BadgeProps) {
	const { cooldownTimeRemaining, percentComplete } = useCooldown({
		player,
		campaign,
	});

	const name =
		player.isGM || !player.characterName
			? player.playerName
			: player.characterName;
	const value = player.inspiration;
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
					filter: cooldownTimeRemaining > 0 ? "grayscale(100%)" : undefined,
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
				{cooldownTimeRemaining > 0 ? (
					<CircularProgress variant="determinate" value={percentComplete} />
				) : (
					value
				)}
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
					color: cooldownTimeRemaining > 0 ? "text.secondary" : "text.primary",
				}}
			>
				{name}
			</Box>
		</Box>
	);
}
