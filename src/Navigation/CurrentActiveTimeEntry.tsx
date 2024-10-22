import { useEffect, useState } from "react";
import {
  fetchRunningTimeEntry,
  TimeEntry,
} from "../Harvest/TimeEntry/fetchRunningTimeEntry.ts";
import { stopTimer } from "../Harvest/TimeEntry/stopTimer.ts";
import { createAuthenticatedHarvestClient } from "../Harvest/harvestClient.ts";
const authenticatedHarvestClient = createAuthenticatedHarvestClient();

export const CurrentActiveTimeEntry = () => {
  const [timeEntry, setTimeEntry] = useState<TimeEntry | null>(null);

  useEffect(() => {
    fetchRunningTimeEntry(authenticatedHarvestClient).then(setTimeEntry);
  }, []);

  if (!timeEntry) {
    return <div className="h-8"></div>;
  }

  return (
    <div className="bg-green-700 text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center h-10 m-3">
      <span className="mr-1.5 text-lg animate-pulse">⏱️</span>
      <div>
        <div className="text-[12px] leading-tight">{timeEntry.task.name}</div>
        <div className="text-[10px] leading-tight text-gray-200">
          {timeEntry.project.name} - {timeEntry.client.name}
        </div>
      </div>
      <button
        className="ml-2 opacity-50 hover:opacity-100 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        title="Stop timer"
        onClick={() => {
          if (!timeEntry) {
            return;
          }

          stopTimer(authenticatedHarvestClient, {
            timeEntryId: timeEntry.id,
          }).then(() => {
            setTimeEntry(null);
          });
        }}
      >
        ■
      </button>
    </div>
  );
};
