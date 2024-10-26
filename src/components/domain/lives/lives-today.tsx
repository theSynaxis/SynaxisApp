import { faker } from "@faker-js/faker";
import LivesCard from "./lives-card";
import {
  GREAT_SAINTS_DAY,
  OF_CHRIST_AND_THEOTOKOS,
  SAINT_WITH_GREAT_DOXOLOGY,
  SAINT_WITH_SERVICE,
  SIMPLE_COMMEMORATION,
} from "~/lib/constants";
import { api } from "~/trpc/server";

interface Life {
  id: string;
  header: string;
  icon: string;
  feastType:
    | typeof OF_CHRIST_AND_THEOTOKOS
    | typeof GREAT_SAINTS_DAY
    | typeof SAINT_WITH_GREAT_DOXOLOGY
    | typeof SAINT_WITH_SERVICE
    | typeof SIMPLE_COMMEMORATION;
}

export default async function LivesToday() {
  const allLivesToday = await api.saint.dailySaints.query();
  // const allLivesToday: Life[] = [
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Exaltation of the Cross",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: OF_CHRIST_AND_THEOTOKOS,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Synaxis of All Saints of Alaska",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: GREAT_SAINTS_DAY,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Martyr Peter the Aleut",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SAINT_WITH_GREAT_DOXOLOGY,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Martyr Juvenal of Alaska",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SAINT_WITH_SERVICE,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Protomartyr and Equal of the Apostles Thekla",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable Nίkander Wonderworker of Pskov",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Monastic Martyr Galacteon of Vologda",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable Copres of Palestine",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable Abramius, Abbot of Mirozh, Pskov",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Saint Vladislav of Serbia",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable Dorothy of Kashin",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable Silouan of Mount Athos",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "“Mirozh” Icon of the Mother of God",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Icon of the Mother of God “of the Myrtle Tree”",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable Simon of Serbia",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Venerable David of Serbia",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  //   {
  //     id: faker.string.nanoid(),
  //     header: "Holy King Stephen of Serbia",
  //     icon: "/images/saints/St-Silouan-Athonite.jpg",
  //     feastType: SIMPLE_COMMEMORATION,
  //   },
  // ];

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
