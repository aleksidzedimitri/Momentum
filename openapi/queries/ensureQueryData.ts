// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { CommentsService, DepartmentsService, EmployeesService, PrioritiesService, StatusesService, TasksService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseStatusesServiceGetStatusesData = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseStatusesServiceGetStatusesKeyFn({ accept }), queryFn: () => StatusesService.getStatuses({ accept }) });
export const ensureUsePrioritiesServiceGetPrioritiesData = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePrioritiesServiceGetPrioritiesKeyFn({ accept }), queryFn: () => PrioritiesService.getPriorities({ accept }) });
export const ensureUseDepartmentsServiceGetDepartmentsData = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDepartmentsServiceGetDepartmentsKeyFn({ accept }), queryFn: () => DepartmentsService.getDepartments({ accept }) });
export const ensureUseEmployeesServiceGetEmployeesData = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseEmployeesServiceGetEmployeesKeyFn({ accept }), queryFn: () => EmployeesService.getEmployees({ accept }) });
export const ensureUseCommentsServiceGetTasksByTaskCommentsData = (queryClient: QueryClient, { accept, task }: {
  accept: string;
  task: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseCommentsServiceGetTasksByTaskCommentsKeyFn({ accept, task }), queryFn: () => CommentsService.getTasksByTaskComments({ accept, task }) });
export const ensureUseTasksServiceGetTasksData = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseTasksServiceGetTasksKeyFn({ accept }), queryFn: () => TasksService.getTasks({ accept }) });
export const ensureUseTasksServiceGetTasksByIdData = (queryClient: QueryClient, { accept, id }: {
  accept: string;
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseTasksServiceGetTasksByIdKeyFn({ accept, id }), queryFn: () => TasksService.getTasksById({ accept, id }) });
