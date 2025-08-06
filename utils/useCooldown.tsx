import { useEffect, useState } from "react";
import { useInterval } from "react-use";
import { addMinutes, differenceInSeconds, formatDuration } from "date-fns";
import { parseDate } from "./formatDate";
import type { PlayerFragment, CampaignFragment } from "@graphql/client-types";

interface UseCooldownProps {
	player?: PlayerFragment;
	campaign?: CampaignFragment;
}

interface UseCooldownResult {
	cooldownTimeRemaining: number;
	percentComplete: number;
	formattedDuration: string;
}

function calculateCooldown({ player, campaign }: UseCooldownProps): number {
	if (
		!player ||
		!campaign ||
		(!campaign.gmInspiration && player.isGM) ||
		campaign.cooldownType === "none"
	) {
		return 0;
	}
	const lastInspirationUsed = parseDate(
		campaign.cooldownType === "player"
			? player.lastInspirationUsed
			: campaign.lastInspirationUsed,
	);
	const cooldownExpiration = addMinutes(
		lastInspirationUsed,
		campaign.cooldownTime,
	);
	const onCooldown = cooldownExpiration > new Date();
	const timeRemaining = onCooldown
		? differenceInSeconds(cooldownExpiration, new Date())
		: 0;
	return timeRemaining;
}

export function useCooldown({
	player,
	campaign,
}: UseCooldownProps): UseCooldownResult {
	const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(
		calculateCooldown({ player, campaign }),
	);

	useEffect(() => {
		setCooldownTimeRemaining(calculateCooldown({ player, campaign }));
	}, [player, campaign]);

	useInterval(
		() => {
			setCooldownTimeRemaining(calculateCooldown({ player, campaign }));
		},
		!campaign || campaign.cooldownType !== "none" ? 1000 : null,
	);

	return {
		cooldownTimeRemaining,
		percentComplete: Math.round(
			(cooldownTimeRemaining / ((campaign?.cooldownTime ?? 0) * 60)) * 100,
		),
		formattedDuration: formatDuration(
			{
				hours: Math.trunc(cooldownTimeRemaining / 60 / 60),
				minutes: Math.trunc((cooldownTimeRemaining / 60) % 60),
				seconds: Math.trunc(cooldownTimeRemaining % 60),
			},
			{ format: ["hours", "minutes", "seconds"] },
		),
	};
}
