// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { CommentsService, DepartmentsService, EmployeesService, PrioritiesService, StatusesService, TasksService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseStatusesServiceGetStatuses = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseStatusesServiceGetStatusesKeyFn({ accept }), queryFn: () => StatusesService.getStatuses({ accept }) });
export const prefetchUsePrioritiesServiceGetPriorities = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePrioritiesServiceGetPrioritiesKeyFn({ accept }), queryFn: () => PrioritiesService.getPriorities({ accept }) });
export const prefetchUseDepartmentsServiceGetDepartments = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDepartmentsServiceGetDepartmentsKeyFn({ accept }), queryFn: () => DepartmentsService.getDepartments({ accept }) });
export const prefetchUseEmployeesServiceGetEmployees = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseEmployeesServiceGetEmployeesKeyFn({ accept }), queryFn: () => EmployeesService.getEmployees({ accept }) });
export const prefetchUseCommentsServiceGetTasksByTaskComments = (queryClient: QueryClient, { accept, task }: {
  accept: string;
  task: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCommentsServiceGetTasksByTaskCommentsKeyFn({ accept, task }), queryFn: () => CommentsService.getTasksByTaskComments({ accept, task }) });
export const prefetchUseTasksServiceGetTasks = (queryClient: QueryClient, { accept }: {
  accept: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseTasksServiceGetTasksKeyFn({ accept }), queryFn: () => TasksService.getTasks({ accept }) });
export const prefetchUseTasksServiceGetTasksById = (queryClient: QueryClient, { accept, id }: {
  accept: string;
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseTasksServiceGetTasksByIdKeyFn({ accept, id }), queryFn: () => TasksService.getTasksById({ accept, id }) });
