import { useCallback, useMemo } from "react";
import { Button } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useSaveCampaignMutation } from "../../graphql/client-types";
import EncounterSubList from "./encounter-sublist";

import type { CampaignFragment } from "../../graphql/client-types";
import type { EncounterRowProps } from "./encounter-row";

interface EncounterListProps {
	campaign: CampaignFragment;
	encounters?: EncounterRowProps["encounter"][];
	refetch: () => void;
}

export default function EncounterList({
	campaign,
	encounters,
	refetch,
}: EncounterListProps) {
	const [saveCampaign] = useSaveCampaignMutation();

	const activeEncounter = useMemo(
		() =>
			encounters?.find(
				(encounter) => encounter.id === campaign.activeEncounter?.id,
			),
		[encounters, campaign],
	);
	const inProgressEncounters = useMemo(
		() =>
			encounters?.filter(
				(encounter) =>
					encounter.round > 0 && encounter.id !== campaign.activeEncounter?.id,
			),
		[encounters, campaign],
	);
	const plannedEncounters = useMemo(
		() =>
			encounters?.filter(
				(encounter) =>
					!encounter.round && encounter.id !== campaign.activeEncounter?.id,
			),
		[encounters, campaign],
	);

	const onClearActive = useCallback(() => {
		if (campaign) {
			saveCampaign({
				variables: {
					id: campaign.id,
					input: {
						name: campaign.name,
						activeEncounter: null,
					},
				},
			});
		}
	}, [saveCampaign, campaign]);

	return (
		<>
			{activeEncounter ? (
				<>
					<EncounterSubList
						listName="Active Encounter"
						noEncountersMessage="No Active Encounter"
						campaign={campaign}
						encounters={[activeEncounter]}
						refetch={refetch}
					/>
					<Button disabled={!campaign?.activeEncounter} onClick={onClearActive}>
						<ClearIcon />
						Clear Active Encounter
					</Button>
				</>
			) : null}
			<EncounterSubList
				listName="In Progress Encounters"
				noEncountersMessage="No In Progress Encounters"
				campaign={campaign}
				encounters={inProgressEncounters}
				refetch={refetch}
			/>
			<EncounterSubList
				listName="Planned Encounters"
				noEncountersMessage="No Planned Encounters"
				campaign={campaign}
				encounters={plannedEncounters}
				refetch={refetch}
			/>
		</>
	);
}
