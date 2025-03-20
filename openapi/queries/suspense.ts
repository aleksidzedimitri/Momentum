// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CommentsService, DepartmentsService, EmployeesService, PrioritiesService, StatusesService, TasksService } from "../requests/services.gen";
import * as Common from "./common";
export const useStatusesServiceGetStatusesSuspense = <TData = Common.StatusesServiceGetStatusesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseStatusesServiceGetStatusesKeyFn({ accept }, queryKey), queryFn: () => StatusesService.getStatuses({ accept }) as TData, ...options });
export const usePrioritiesServiceGetPrioritiesSuspense = <TData = Common.PrioritiesServiceGetPrioritiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePrioritiesServiceGetPrioritiesKeyFn({ accept }, queryKey), queryFn: () => PrioritiesService.getPriorities({ accept }) as TData, ...options });
export const useDepartmentsServiceGetDepartmentsSuspense = <TData = Common.DepartmentsServiceGetDepartmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDepartmentsServiceGetDepartmentsKeyFn({ accept }, queryKey), queryFn: () => DepartmentsService.getDepartments({ accept }) as TData, ...options });
export const useEmployeesServiceGetEmployeesSuspense = <TData = Common.EmployeesServiceGetEmployeesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseEmployeesServiceGetEmployeesKeyFn({ accept }, queryKey), queryFn: () => EmployeesService.getEmployees({ accept }) as TData, ...options });
export const useCommentsServiceGetTasksByTaskCommentsSuspense = <TData = Common.CommentsServiceGetTasksByTaskCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept, task }: {
  accept: string;
  task: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCommentsServiceGetTasksByTaskCommentsKeyFn({ accept, task }, queryKey), queryFn: () => CommentsService.getTasksByTaskComments({ accept, task }) as TData, ...options });
export const useTasksServiceGetTasksSuspense = <TData = Common.TasksServiceGetTasksDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTasksServiceGetTasksKeyFn({ accept }, queryKey), queryFn: () => TasksService.getTasks({ accept }) as TData, ...options });
export const useTasksServiceGetTasksByIdSuspense = <TData = Common.TasksServiceGetTasksByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept, id }: {
  accept: string;
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTasksServiceGetTasksByIdKeyFn({ accept, id }, queryKey), queryFn: () => TasksService.getTasksById({ accept, id }) as TData, ...options });
