import React from "react";
import { CSVLink } from "react-csv";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {useFetchResults} from "../../hooks/useFetchResults";


const headers = [
  { label: "User", key: "uuid" },
  { label: "Round", key: "roundId" },
  { label: "Attempt", key: "attempt" },
  { label: "Played At", key: "playedAt" },
  { label: "Goby Id", key: "gobyId" },
  { label: "Found", key: "found" },
  { label: "X", key: "x" },
  { label: "Y", key: "y" },
  { label: "Time (ms)", key: "time" },
  { label: "Nearest Undiscovered Goby", key: "nearestNeighbor" },
  { label: "Nearest Undiscovered Goby Position", key: "nearestNeighborPosition" },
  { label: "Nearest Undiscovered Goby Distance", key: "nearestNeighborDistance" },
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
      gobyId: gobyId,
      found: catchTime !== null,
      x: catchTime?.position.x ?? 'NA',
      y: catchTime?.position.y ?? 'NA',
      time: catchTime?.time ?? 'NA',
      nearestNeighbor: catchTime?.nearestNeighbor ?? 'NA',
      nearestNeighborPosition: catchTime?.nearestNeighborPosition ?? 'NA',
      nearestNeighborDistance: catchTime?.nearestNeighborDistance ?? 'NA',
    }))
  }) ?? [];

  return (
    <CSVLink data={data} headers={headers}>
      <CircleButton>
        Export CSV
      </CircleButton>
    </CSVLink>
  )
};
