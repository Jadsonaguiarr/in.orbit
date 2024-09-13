import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

import dayjs from "dayjs";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const result = await db.insert(goals).values([
    { title: "Acordar cedo", desiredWeeklyFrequency: 6 },
    { title: "Me exercitar", desiredWeeklyFrequency: 5 },
    { title: "ler", desiredWeeklyFrequency: 3 },
  ]).returning()

  const startOFWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOFWeek.toDate() },
    { goalId: result[1].id, createdAt: startOFWeek.add(1, 'day').toDate() }
  ])
}

seed().finally(() => {
  client.end();
});
