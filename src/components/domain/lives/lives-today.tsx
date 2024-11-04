import LivesCard from "./lives-card";
import { api } from "~/trpc/server";

// interface Life {
//   id: string;
//   header: string;
//   icon: string;
//   feastType:
//     | typeof OF_CHRIST_AND_THEOTOKOS
//     | typeof GREAT_SAINTS_DAY
//     | typeof SAINT_WITH_GREAT_DOXOLOGY
//     | typeof SAINT_WITH_SERVICE
//     | typeof SIMPLE_COMMEMORATION;
// }

export default async function LivesToday() {
  const allLivesToday = await api.saint.dailySaints.query();

  return (
    <>
      {allLivesToday.map((life, id) => {
        return (
          <LivesCard
            header={life.name}
            icon={"/images/saints/St-Silouan-Athonite.jpg"}
            key={life.id}
            openState={id === 0 ? true : false}
            {...life}
          />
        );
      })}
    </>
  );
}
