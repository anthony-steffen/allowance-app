
export const dailyReward = (approved) => {
   // Calcula o total de penalidades
   const totalDailyPenalties = approved
   .flatMap(record => record.penalties.map(penalty => penalty.value))
   .reduce((acc, value) => acc + value, 0);
 
   // Calcula o total de recompensas
   const totalDailyRewards = approved.reduce((acc, record) => acc + record.dailyReward, 0);
 
   // Calcula a recompensa diária
   const dailyReward = totalDailyRewards - totalDailyPenalties;

    return dailyReward.toFixed(2);
}