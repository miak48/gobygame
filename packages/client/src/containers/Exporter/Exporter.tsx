import React from "react";
import { CSVLink } from "react-csv";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {useFetchResults} from "../../hooks/useFetchResults";


interface FileColumns {
  uuid: string;
  roundId: number,
  attempt: number,
  playedAt: string,
  gobyId: string,
}

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
];


export const Exporter = () => {
  const results = useFetchResults();

  console.log('results', results)

  const data: FileColumns[] = results?.flatMap(result => {


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
