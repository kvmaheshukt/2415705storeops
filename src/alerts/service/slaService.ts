import { slaRepo } from "../repository/slaRepo";
import { eventBus } from "../../shared/eventBus";
import { AppError } from "../../shared/errors";

export async function checkSlaBreaches(now: Date, gracePeriodHours: number = 24) {
  const breaches: any[] = [];

  const activities = await slaRepo.listActivities();
  for (const activity of activities) {
    try {
      if (["HIGH", "CRITICAL"].includes(activity.priority)) {
        if (activity.dueDate && new Date(activity.dueDate) < now && activity.status !== "DONE") {
          // Fire SLA_BREACH event
          const breachEvent = {
            type: "SLA_BREACH",
            payload: {
              activityId: activity.id,
              priority: activity.priority,
              dueDate: activity.dueDate,
              assignedTo: activity.assignedTo || "DepartmentLead"
            },
            timestamp: now.toISOString()
          };
          eventBus.publish(breachEvent);
          breaches.push(breachEvent);

          // Track breach in repo
          await slaRepo.addBreach(activity.id, now);

          // Escalation check
          const breachTime = new Date(activity.dueDate);
          const graceLimit = new Date(breachTime.getTime() + gracePeriodHours * 60 * 60 * 1000);
          if (now > graceLimit) {
            const escalationEvent = {
              type: "SLA_ESCALATION",
              payload: {
                activityId: activity.id,
                escalatedTo: "STORE_MANAGER"
              },
              timestamp: now.toISOString()
            };
            eventBus.publish(escalationEvent);
            breaches.push(escalationEvent);

            await slaRepo.addEscalation(activity.id, now);
          }
        }
      }
    } catch (err: any) {
      throw new AppError("SLA_ERROR", err.message, 500);
    }
  }

  return breaches;
}
