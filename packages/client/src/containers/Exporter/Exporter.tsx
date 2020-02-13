import React from "react";
import { CSVLink } from "react-csv";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {useFetchResults} from "../../hooks/useFetchResults";


const headers = [
  { label: "User", key: "uuid" },
  { label: "Round", key: "roundId" },
  { label: "Attempt", key: "attempt" },
  { label: "Played At", key: "playedAt" },
  { label: "Total Round Time (ms)", key: "roundTime" },
  { label: "Goby Id", key: "gobyId" },
  { label: "Found", key: "found" },
  { label: "X", key: "x" },
  { label: "Y", key: "y" },
  { label: "Catch Time (ms)", key: "time" },
  { label: "Distance to Goby1", key: "distanceToGoby1" },
  { label: "Distance to Goby2", key: "distanceToGoby2" },
  { label: "Distance to Goby3", key: "distanceToGoby3" },
  { label: "Distance to Goby4", key: "distanceToGoby4" },
  { label: "misses", key: "misses" },
];

export const Exporter = () => {
  const results = useFetchResults();

  console.log('results', results)

  const data = results?.flatMap(result => {
    return result.catchTimes.map(({gobyId, catchTime}) => ({
      uuid: result.uuid,
      roundId: result.roundId,
      attempt: result.attempt,
      // @ts-ignore
      playedAt: result.createdAt,
      roundTime: result.totalTime,
      gobyId: gobyId,
      found: String(catchTime !== null),
      x: catchTime?.position.x ?? (result.gaveUp ? 'Gave Up' : 'NA'),
      y: catchTime?.position.y ?? (result.gaveUp ? 'Gave Up' : 'NA'),
      time: catchTime?.time ?? (result.gaveUp ? 'Gave Up' : 'NA'),  
      distanceToGoby1: catchTime?.distanceToGoby1 ?? (result.gaveUp ? 'Gave Up' : 'NA'),
      distanceToGoby2: catchTime?.distanceToGoby2 ?? (result.gaveUp ? 'Gave Up' : 'NA'),
      distanceToGoby3: catchTime?.distanceToGoby3 ?? (result.gaveUp ? 'Gave Up' : 'NA'),
      distanceToGoby4: catchTime?.distanceToGoby4 ?? (result.gaveUp ? 'Gave Up' : 'NA'),
      misses: result.misses.find(miss => miss.gobyId === gobyId)?.missedClicks.length ?? 0,
    }))
  }) ?? [];

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`results-${Date.now()}.csv`}
    >
      <CircleButton>
        Export CSV
      </CircleButton>
    </CSVLink>
  )
};
