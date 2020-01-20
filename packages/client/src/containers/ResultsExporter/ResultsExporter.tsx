import React from "react";
import { CSVLink } from "react-csv";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {useFetchResults} from "../../hooks/useFetchResults";


interface FileColumns {
  uuid: string;
  roundId: number,
  playedAt: string,
  gobyId: string,
}

const headers = [
  { label: "User", key: "uuid" },
  { label: "Round", key: "roundId" },
  { label: "Played At", key: "playedAt" },
  { label: "Goby Id", key: "gobyId" },
];


export const ResultsExporter = () => {
  const results = useFetchResults();

  console.log('results', results)

  const data: FileColumns[] = results?.flatMap(result => {


    return result.catchTimes.map(catchTime => ({
      uuid: result.uuid,
      roundId: result.roundId,
      // @ts-ignore
      playedAt: result.createdAt,
      gobyId: catchTime.gobyId,
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
