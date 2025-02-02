type PedingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<PedingGoalsResponse> {
  const response = await fetch('http://localhost:3333/pendingGoals')
  const data = await response.json()

  return data.pendingGoals
}
